<template>
  <div>
      <FormulateForm
        v-model="values"
        :schema="schema"
        @submit="submitHandler(e)"
        name="name_of_my_form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      />
<!--      <button class=" bg-pink-100-->
<!--                border-2-->
<!--                text-pink-500-->
<!--                border-pink-500-->
<!--                hover:bg-pink-500 hover:text-pink-100-->
<!--                rounded-->
<!--                p-2-->
<!--                my-4"-->
<!--              type="submit"><translation :id="38" /></button>-->
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
          name: field.label,
          label: field.label,
          validation: 'required'
        }
        if(field.type === 'email') fieldToSend.validation = 'required|email'
        return fieldToSend
      }, {});
      console.log(fields)
      fields.push({
        "type": "submit",
        "label": "Send"
      })
      return fields

    }
  },
  data () {
    return {
      values: {}
    }
  },
  methods : {
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    submitHandler (e) {
      console.log(e)
      console.log('clicked')
      console.log(this.values)
      const encoded = this.encode({
        "form-name": 'name_of_my_form',
        ...this.values,
      })
      console.log(encoded)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      })
        .then(() => {
          console.log('Send')
        })
    .catch((error) => alert(error));
    }
  }
}
</script>