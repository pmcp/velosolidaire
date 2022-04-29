<template>
  <div>
      <FormulateForm
        v-model="values"
        :schema="schema"
        :action="`/registered.${lang}`"
        name="name_of_my_form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
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
      const fields = this.form.map((field) => {
        const fieldToSend = {
          type: field.type,
          name: field.name,
          label: field.label,
          validation: 'required'
        }
        if(field.type === 'email') fieldToSend.validation = 'required|email'
        return fieldToSend
      }, {});
      console.log(fields)
      fields.push({
        "type": "submit",
        "label": "Order pizza"
      })
      return fields

    }
  },
  data () {
    return {
      values: {}
    }
  }
}
</script>