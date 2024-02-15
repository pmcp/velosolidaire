<template>
  <main class="relative bg-gray-50">

    <div v-if="content.image">

      <div class="flex flex-col"
       :class="[(content.layout === '1') ? '' : 'md:flex-row']">
        <div
          class="relative flex mr-4 bg-pink-500 justify-items-stretch items-stretch"
          :class="[(content.layout === '1') ? 'w-full h-128' : 'md:w-1/2']"
        >
          <img class="object-cover w-full" :src="content.image" alt="" />
        </div>
        <div class="prose pb-20 ml-4 flex flex-col "
          :class="[(content.layout ===  '1')? 'w-full' : 'md:w-1/2']">
          <heading-one v-if="content.title !== 'Home'">
            {{ content.intro }}
          </heading-one>
          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto w-full">
            <div v-for="(element, key) in content.elements" :key="`el${key}`">
              <div v-if="element.type === 'text'" class="prose lg:prose-md" v-html="$md.render(element.markdown)"></div>
              <logos v-if="element.type === 'logos'" :logos="element.logo"/>

              <div v-if="element.type === 'buttons'" class="flex flex-row flex-wrap w-full gap-2">
                <div v-for="(b, key) in element.button" :key="`button-${key}`">

                  <a v-if="b.download" :href="b.download" download class="group hover:bg-pink-700  px-1 pb-1 md:pb md:px-2 rounded border-2 border-pink-500" style="text-decoration: none !important">
                    <span class="prose text-gray-600 group-hover:text-gray-100">{{ b.label }}</span>
                  </a>

                  <a v-else :href="b.link" target="_blank" class="group hover:bg-pink-700 px-1 pb-1 md:pb md:px-2 rounded border-2 border-pink-500" style="text-decoration: none !important">
                    <span class="prose text-gray-600 group-hover:text-gray-100">{{ b.label }}</span>
                  </a>
                </div>


              </div>


            </div>
          </div>


        </div>
      </div>
    </div>
    <div v-else>
      <div class="prose text-base max-w-prose pt-10">

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

        <div v-for="(element, key) in content.elements" :key="`el${key}`">
          {{ element }}

          <div v-if="element.type === 'text'" class="prose lg:prose-md" v-html="$md.render(element.markdown)"></div>
          <logos v-if="element.type === 'logos'" :logos="element.logo"/>

          <div v-if="element.type === 'buttons'">
            {{ element }}

          </div>
        </div>

        <!--        <nuxt-content :document="content" />-->
<!--        <div v-if="content.formActive">-->
<!--          <register-form v-if="!formIsSend" @sendForm="sendForm" class="my-10" :form="content.form" :title="content.slug" />-->
<!--          <div v-else>-->
<!--            {{ content.formSend}}-->
<!--          </div>-->
<!--        </div>-->
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
    }
  },
  data  () {
    return {
      formIsSend: false,
    }
  },
  methods: {
    sendForm() {
      this.formIsSend = !this.formIsSend
    },
    ...mapActions({
      openLogin: 'auth/openLogin',
    }),
  },
  async asyncData({ $content, params, error, payload }) {
    if (payload) {
      console.log(payload)
      return { content: payload }
    } else {
      const page = await $content('pages', params.page).fetch()
      return { content: page }
    }
  },
}
</script>
