<template>
  <div>
    <div class="pt-1 w-full mb-8">
      <div class="w-full flex justify-center">
        <app-navigation></app-navigation>
      </div>
      <!-- Locations-->
      <heading-two class="mb-4 mt-8">
        <translation :id="35" />
      </heading-two>
      <div class="w-full grid grid-cols-1 gap-8 md:grid-cols-2">
        <locations-list class="text-sm text-gray-500 md:sticky top-20 z-20" :horizontal="true" />
        <location-map class="h-40 md:h-full "></location-map>
      </div>
    </div>


    <div class="w-full grid grid-cols-1 gap-8 md:grid-cols-2 mt-12">
      <div>
        <div v-if="!location.active" class="mt-4 font-semibold">
          <translation :id="37" />
        </div>
        <heading-two class="mt-4">
          <translation :id="17" />
        </heading-two>
        <div>
          <div class="h-80 overflow-hidden" :class="{ 'h-auto': showContent }">
            <location-content :content="location" />
          </div>
          <div class="relative z-10 -top-20 w-full">
            <div
              class="h-10 relative readMoreGradient"
              :class="{ ' h-auto': showContent }"
            ></div>
            <div class="bg-gray-50 h-10">
              <button
                @click="showContent = !showContent"
                class="italic bg-white text-gray-500 rounded border border-gray-500 py-1 px-2 hover:bg-gray-200 mt-4"
              >
                <translation v-if="showContent" :id="34" />
                <translation v-else :id="33" />
              </button>
            </div>
            <div class="bg-gray-50 h-10"></div>
          </div>
        </div>
      </div>

    <div class="mt-4 w-full">
      <heading-two class="pb-4">
        <translation :id="18" />
      </heading-two>
      <div class="sticky top-20 mb-20">
        <div v-if="!location.active" class="w-full h-full bg-gray-50 absolute top-o left-0 z-30 opacity-80 flex justify-center items-center font-semibold">
          <translation :id="37" />
        </div>
        <booking-module :safetyPeriod="location.safetyPeriod || 0"/>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HeadingTwo from '~/components/heading-two'
import Translation from '~/components/translation'

export default {
  components: { Translation, HeadingTwo },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
      },
    ],
  },
  async asyncData({ $content, params, payload }) {
    //TODO: Fix differently
    if (payload) {
      return { location: payload }
    } else {
      const location = await $content('locations', params.location).fetch()
      return { location: location }
    }
  },
  data() {
    return {
      showContent: false,
    }
  },
  methods: {
    ...mapActions(['setLocation']),
  },
  mounted() {
    this.setLocation(this.location.idInSheet)
  },
}
</script>
