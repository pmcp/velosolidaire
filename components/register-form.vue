<template>
  <form
    :name="title"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    {{ title }}
    <input type="hidden" name="form-name" :value="title" />
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