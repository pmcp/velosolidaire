<template>
  <main class="relative bg-gray-50">
    <div v-if="content.image">
      <div class="flex flex-col md:flex-row">
        <div class="relative flex md:w-1/2 mr-4 bg-pink-500 justify-items-stretch items-stretch">
          <img class="object-cover" :src="content.image" alt="" />
        </div>
        <div class="pb-20 md:w-1/2 ml-4 mt-5 flex flex-col">
          <heading-one>
            {{ content.intro }}
          </heading-one>
          <div v-show="!user && content.title === 'Home'">
            <button
              @click.prevent="openLogin"
              class="
                bg-pink-100
                border-2
                text-pink-500
                border-pink-500
                hover:bg-pink-500 hover:text-pink-100
                rounded
                p-2
                my-4
              "
            >
              Log In
            </button>

            <nuxt-link
              :to="`/register.${lang}`"
              class="text-gray-600 hover:text-gray-900 mr-5 underline px-1 py-1 md:py-3 md:px-2 rounded"
              :class="[$route.path == `/register.${lang}` ? 'border-2 bosrder-pink-500' : '']"
            >
              <translation :id="37" />
            </nuxt-link>
          </div>

          <div class="my-4" v-show="user && content.title === 'Home'">
            <nuxt-link

              :to="`/locations/4saisons.${lang}`"
              class="
                bg-pink-100
                border-2
                text-pink-500
                border-pink-500
                hover:bg-pink-500 hover:text-pink-100
                rounded
                p-2
                w-auto

              "
            >
              <translation :id="14" class="" />
            </nuxt-link>
          </div>

          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto w-full">
            <nuxt-content class="prose lg:prose-xl" :document="content" />
          </div>



          <div v-if="content.title === 'Home'" class="mt-6 grid grid-cols-1 gap-0.5 md:grid-cols-4 lg:mt-8">
            <div class="col-span-1 flex justify-center py-2 px-2 bg-gray-50">
              <img class="max-h-12 object-contain" src="~/assets/logos/solidaire.jpg" alt="Vélo Solidaire">
            </div>
            <div class="col-span-1 flex justify-center py-2 px-2 bg-gray-50 ">
              <img class="max-h-12 object-contain" src="~/assets/logos/provelo.png" alt="Provelo">
            </div>
            <div class="col-span-1 flex justify-center py-2 px-2 bg-gray-50">
              <img class="max-h-12 object-contain" src="~/assets/logos/ateliers.png" alt="Ateliers ">
            </div>
            <div class="col-span-1 flex justify-center py-2 px-2 bg-gray-50">
              <img class="max-h-12 object-contain" src="~/assets/logos/bruxellesmobilite.png" alt="Bruxelles Mobilite">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="text-base max-w-prose pt-10">
        <h1
          class="
            py-5
            text-4xl
            tracking-tight
            font-extrabold
            text-gray-900
            sm:text-5xl
            md:text-6xl
            lg:text-5xl
            xl:text-6xl
            mb-10
          "
        >
          <span class="block xl:inline whitespace-pre">{{ content.title }}</span>
        </h1>
        <div v-if="$route.path == `/register.${lang}`"
          <register-form />
        </div>
        <nuxt-content :document="content" />

      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  // TODO: Check all heads
  computed: {
    lang() {
      return this.$store.state.lang
    },
    ...mapGetters({
      user: 'auth/user',
    })
  },
  methods: {
    ...mapActions({
      openLogin: 'auth/openLogin',
    }),
  },
  async asyncData({ $content, params, error, payload }) {
    if (payload) {
      return { content: payload }
    } else {
      const page = await $content('pages', params.page).fetch()
      return { content: page }
    }
  },
}
</script>
