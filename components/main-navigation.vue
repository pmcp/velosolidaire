<template>
  <div class="flex flex-row justify-between">
    <!-- TODO: Problems with hydration, so made it client only. Makes no sense. -->

<!--    <pre>{{ navigation }}</pre>-->
<!--    <pre>{{ allPages }}</pre>-->
    <!-- HINT: If you put a v-if on a nuxt-link, it breaks hydration, so I'm using display none (class 'hidden') -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">

      <div v-for="(p, key) in navigation" :key="`navPages-${key}`" class="flex">
        <nuxt-link v-if="p.page === 'bookings'" :to="`/locations/abattoirs.${lang}`">
          <div
            class="underline mr-5"
            :class="[
            $route.path == `/${p.page}.${lang}` ? 'text-pink-500  hover:text-pink-900' : 'text-gray-600 hover:text-gray-900',
          ]"
          >
            {{ p[`label${lang}`] }}
          </div>
        </nuxt-link>
        <nuxt-link v-else :to="`/${p.page}.${lang}`">
        <div
          class="underline mr-5"
          :class="[
            $route.path == `/${p.page}.${lang}` ? 'text-pink-500  hover:text-pink-900' : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          {{ p[`label${lang}`] }}
        </div>
        </nuxt-link>
      </div>
    </div>

    <div class=" flex flex-col md:flex-row justify-between md:justify-center">
      <user />
      <language-toggle class="ml-5" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    return {
      navigation: null
    }
  },

  async mounted() {
    // this.allPages = await this.$content('pages').only(['title', 'slug', 'navTitle']).fetch()
    const nav = await this.$content('site/navigation').fetch()
    this.navigation = nav.navigation

  },
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
