<template>
  <div class="mb-20">
    <card position="bottom" class="w-full h-full" open open-text="Close" close-text="Open" open-class="" close-class="">
      <template v-slot:opened>
        <div v-if="bookings.length > 0">
          <ul class="divide-y divide-gray-200">
            <li v-for="(b, key) in bookings" :key="`${key}-bookings`" class="w-full">
              <booking-item :item="{data: b, key}" v-on:remove="removeFromBookingDb(b.rowId)"/>
            </li>
          </ul>
        </div>
        <div class="py-5 w-full text-center text-gray-500 font-medium italic  mb-4 mt-8" v-else>
          <translation :id="3" />
        </div>

      </template>
    </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    bookings: {
      type: Array,
      default: [],
    },
  },
  computed: {
    moments() {
      return this.$store.getters.moments
    },
    lang() {
      return this.$store.state.lang
    },
    date() {
      return this.$store.getters.date
    },
  },
  methods: {
    ...mapActions(['removeFromBookingDb']),
  },
}
</script>
