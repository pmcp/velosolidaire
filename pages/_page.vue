<template>
  <main class="relative bg-gray-50">
    <div v-if="content.title === 'Home'" class="flex w-full">
      <div class="w-full pt-10 flex flex-col md:flex-row gap-8">
        <div class="w-full h-auto" style="position:relative;padding-top:56.25%;" >
          <iframe class="w-full h-auto"
                  src="https://iframe.mediadelivery.net/embed/350779/0ef64869-4ad6-484b-93e8-cfa8c80dc163?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style="border:0;position:absolute;top:0;height:100%;width:100%;"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowfullscreen="true"
          >
          </iframe>
        </div>
        <div class="w-full">
          <page-content :content="content"></page-content>
        </div>
      </div>
    </div>
    <div v-else>


      <div v-if="content.image">
        <div class="flex flex-col"
         :class="[(content.layout === '1') ? '' : 'md:flex-row']">
          <div
            class="relative flex mr-4 bg-pink-500 justify-items-stretch items-stretch h-full sticky top-20"
            :class="[(content.layout === '1') ? 'w-full h-128' : 'md:w-1/2']"
          >
            <img class="object-cover w-full" :src="content.image" alt="" />
          </div>
          <div class="prose pb-20 ml-4 flex flex-col "
            :class="[(content.layout ===  '1')? 'w-full' : 'md:w-1/2']">
            <page-content :content="content"></page-content>


          </div>
        </div>
      </div>
      <div v-else>
        <div class="prose text-base max-w-prose pt-10">
          <page-content :content="content"></page-content>
        </div>
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
      return { content: payload }
    } else {
      const page = await $content('pages', params.page).fetch()
      return { content: page }
    }
  },
}
</script>
