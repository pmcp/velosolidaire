<template>
  <div>
    <form name="test" netlify>
      <p>
        <label>Name <input type="text" name="name" /></label>
      </p>
      <p>
        <label>Email <input type="email" name="email" /></label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
    <form
      name="name_of_my_form"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="name_of_my_form" />
      <FormulateForm
        v-model="values"
        :schema="schema"
        :action="`/registered.${lang}`"
      />
      <button class=" bg-pink-100
                border-2
                text-pink-500
                border-pink-500
                hover:bg-pink-500 hover:text-pink-100
                rounded
                p-2
                my-4"
              type="submit"><translation :id="38" /></button>
    </form>
  </div>
</template>

<script>
export default {
  props : {
    form : {
      type : Array,
      required : true
    },
    title : {
      type : String
    }
  },
  computed : {
    lang() {
      return this.$store.state.lang
    },
    schema () {
      return this.form.map((field) => {
        console.log(field)
        const fieldToSend = {
          type: field.type,
          name: field.name,
          label: field.label,
          validation: 'required'
        }
        if(field.type === 'email') fieldToSend.validation = 'required|email'
        return fieldToSend

      }, {});
    }
  },
  data () {
    return {
      values: {},
      // schema: [
      //   {
      //     type: 'password',
      //     name: 'password',
      //     label: 'Enter a new password',
      //     validation: 'required'
      //   },
      //   {
      //     type: 'password',
      //     name: 'password_confirm',
      //     label: 'Confirm your password',
      //     validation: '^required|confirm:password',
      //     validationName: 'Password confirmation'
      //   },
      //   {
      //     type: 'submit',
      //     label: 'Change password'
      //   }
      // ]
    }
  }
}
</script>