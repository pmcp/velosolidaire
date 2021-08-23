if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set')
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error('no GOOGLE_PRIVATE_KEY env var set')
if (!process.env.GOOGLE_SHEET)
   throw new Error('no GOOGLE_SHEET env var set')


const sheetAPI = require('../google-spreadsheet/google-spreadsheet')

exports.handler = async function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;
  const { user } = data;
	// Check role in google sheet
	const sheet = await sheetAPI.getSheet('users')
    const rows = await sheetAPI.getRows(sheet)
	
	// filter out this user
	const filteredUsers = rows.filter(r => r.email === user.email)
	
	let role = ''
	// If user exists, add roles
	if(filteredUsers.length == 1) {
		role = filteredUsers[0].role
		
			
		  const responseBody = {
			app_metadata: {
			  // TODO: maybe not hardcoded?
			  roles: role,
			},
			user_metadata: {
			  ...user.user_metadata, // append current user metadata
			}
		  };
		  callback(null, {
			statusCode: 200,
			body: JSON.stringify(responseBody)
		  });
	} else {
			
	// TODO: for now I'm just returning a 403 error code, as Netlify doesn't have a flow in place for error messages
	// https://github.com/netlify/netlify-identity-widget/issues/173
		  callback(null, {
			statusCode: 403,
			body: 'not in list'
		  });
	}
	
	// If user doesn't exist, add this user to the spreadsheet with role "visitor"
	
	
	
	
	



	};
	