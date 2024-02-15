<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center" :class="{ hidden: !user }">
      <nuxt-link
        :to="`/locations/abattoirs.${lang}`"
        class="text-gray-600 hover:text-gray-900 mr-5 underline px-1 py-1 md:py-2 md:px-2 rounded"
        :class="[$route.path.includes('/locations/') ? 'border-2 border-pink-500' : '']"
      >
        <translation :id="14" class="" />
      </nuxt-link>

      <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
      <nuxt-link
        :to="`/bookings.${lang}`"
        class="text-gray-600 hover:text-gray-900 mr-5 underline px-1 py-1 md:py-2 md:px-2 rounded"
        :class="[$route.path == `/bookings.${lang}` ? 'border-2 border-pink-500' : '']"
      >
        <translation :id="7" /> ({{ userBookings }})
      </nuxt-link>
      <user />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  computed: {
    lang() {
      return this.$store.state.lang
    },
    userBookings() {
      if (this.$store.getters.userBookings) return this.$store.getters.userBookings.length
    },
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>
