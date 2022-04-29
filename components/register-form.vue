<template>
  <div>
      <FormulateForm
        v-model="values"
        :schema="schema"
        @submit="submitHandler()"
        :name="title"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      />
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
      fields.push({
        "type": "submit",
        "label": this.$store.state.translations[38][this.$store.state.lang]
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
    submitHandler () {
      const encoded = this.encode({
        "form-name": this.title,
        ...this.values,
      })
      console.log(encoded)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      })
        .then(() => {
          this.$emit('sendForm')
        })
    .catch((error) => alert(error));
    }
  }
}
</script>