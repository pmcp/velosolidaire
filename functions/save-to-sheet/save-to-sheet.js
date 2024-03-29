if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}

const sheetAPI = require('../google-spreadsheet/google-spreadsheet')
const { emailFn } = require('../send-mail/send-mail')
const { format, add, sub, isEqual } = require('date-fns')

exports.handler = async function (event, context) {
  const data = JSON.parse(event.body)

  const settings = data.settings
  const moments = settings.moments
  const sheet = await sheetAPI.getSheet(data.sheet)

  // change date to readable format
  const updatedBookings = data.bookings.map((b) => {
    // Make date readable in Google Sheet
    const date = format(new Date(b.date), 'yyyy/MM/dd')
    // Convert Moment to reaadable moment
    const momentReadable = moments[b.moment].name.fr
    const time = moments[b.moment].descr.fr
    const created = format(new Date(), 'yyyy/MM/dd, HH:mm')
    const confirmationSend = false
    const confirmationDate = format(new Date(), 'yyyy/MM/dd')

    const reminderDate = sub(new Date(b.date), { days: 2 })
    // TODO: If booking date (b.date) === day after today, don't set reminder -> Set reminderSend as true
    let reminderSend = false
    const reminderDateReadable = format(new Date(reminderDate), 'yyyy/MM/dd')
    const retourMailDate = add(new Date(b.date), { days: 1 })
    const retourMailSend = false
    const retourDateReadable = format(new Date(retourMailDate), 'yyyy/MM/dd')
    if (isEqual(reminderDate, new Date())) reminderSend = true
    return { ...b, date, momentReadable, time, created, confirmationSend, confirmationDate, reminderSend, reminderDate: reminderDateReadable, retourMailDate: retourDateReadable, retourMailSend}
  })
  const addedRows = await sheetAPI.addRows(sheet, updatedBookings)
  // Check for mails to be send
  // First get the rows again
  const rows = await sheetAPI.getRows(sheet)
  // Filter out the one where confirmation hasn't been send
  const rowsNotConfirmed = rows.filter((r) => r.confirmationSend == 'FALSE')

  const unresolved = rowsNotConfirmed.map(async (b) => {
    try {
      await emailFn.sendEmail(emailFn.getContent(b, 'confirmation'))
      // TODO: Change this to webhook flow of mailgun
      console.log('gonna update Row')
      const updatedRow = { ...b, confirmationSend: true }
      await sheetAPI.updateRow(sheet, updatedRow)
    } catch (error) {
      console.error('there was an error', error)
      const updatedRow = { ...b, confirmationSend: 'error' }
      process.exit(1)
    }
    return
  })

  await Promise.all(unresolved)

  return {
    statusCode: 200,
    body: JSON.stringify('done'),
  }
}
