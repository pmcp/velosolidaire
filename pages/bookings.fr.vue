<template>
  <main class="flex flex-col">
    <div class="w-full flex justify-center">

      <app-navigation></app-navigation>
    </div>
    <div v-if="user">
      <h1 class="text-xl py-5"><translation :id="7" /></h1>
      <client-only>
        <bookings-all :bookings="userBookings" />
      </client-only>
    </div>
    <div v-else>
      <div class="py-5 w-full text-gray-500 font-medium italic  mb-4 mt-8 flex gap-2 justify-center" >
        <translation :id="38" />
        <user />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// TODO: Importing vue here for the filter, don't know if this is good practice
import Vue from 'vue'
export default {
  computed: {
    userBookings() {
      if (this.$store.getters.userBookings) return Vue.filter('orderBy')(this.$store.getters.userBookings, 'date')
    },
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions(['getLocations', 'getTranslations', 'getBookings']),
  },
}
</script>


