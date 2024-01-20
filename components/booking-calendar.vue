<template>
  <!-- TODO: Disable when not logged in -->
  <div>
    <client-only>
      <v-date-picker
        :locale="lang"
        :value="activeDate"
        @input="setActiveDate($event)"
        :disabled-dates="disabledDates"
        is-expanded
        :attributes="calAttributes"
        :min-date="new Date()"
        color="gray"
        show-caps
        is-expanded
      />
    </client-only>
  </div>

</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    safetyPeriod: Number
  },
  computed: {
    activeDate(){
      return this.$store.state.activeDate
    },
    lang(){
      return this.$store.state.lang
    },
    disabledDates(){
      // const disabledDates = this.$store.getters.disabledDates
      // The first element in this.disabledDates are all the dates before today.
      // If this location has a safetyPeriod, we add to "today" the amount of days to use as safety

      if(!this.safetyPeriod) return this.$store.getters.disabledDates
      if(!this.$store.getters.disabledDates[0]) return this.$store.getters.disabledDates
      if(!this.$store.getters.disabledDates[0].end) return this.$store.getters.disabledDates

      let disabledDateWithSafetyPeriod = [...this.$store.getters.disabledDates]
      disabledDateWithSafetyPeriod[0].end = new Date(new Date().setDate(new Date().getDate() + this.safetyPeriod))
      return disabledDateWithSafetyPeriod


    },

    calAttributes(){
      return this.$store.getters.calAttributes
    },
  },
   methods: {
     ...mapActions({
       setActiveDate: 'setActiveDate',
     }),
  },

}
</script>
