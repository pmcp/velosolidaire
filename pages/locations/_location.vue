<template>
  <div>

    <client-only>
      <div v-if="!user" class="w-full my-8  bg-pink-200 p-8 border-2 border-pink-500 rounded-lg">
        <div v-if="lang === 'fr'">
          <p>Vélo Solidaire met des flottes de vélos gratuitement à disposition des associations désireuses d’organiser des activités à vélo avec leur public.</p>
          <p><br>Pour y avoir accès, veuillez envoyer un email à <a class="underline" href="mailto:velosolidaire@cyclo.org">velosolidaire@cyclo.org</a>.</p>
        </div>
        <div v-else>
            <p>Vélo Solidaire stelt fietsen gratis te beschikking voor organisaties die activeiten met de fiets willen organiseren.</p>
            <p><br>Om toegang te krijgen tot het platform, kan je een e-mail sturen naar <a class="underline" href="mailto:velosolidaire@cyclo.org">velosolidaire@cyclo.org</a>.</p>
        </div>
      </div>
    </client-only>

    <!--  this is a copy from _page  -->
    <div v-if="bookingsPageContent.image">
      <div class="flex flex-col"
           :class="[(bookingsPageContent.layout === '1') ? '' : 'md:flex-row']">
        <div
          class="relative flex mr-4 bg-pink-500 justify-items-stretch items-stretch h-full "
          :class="[(bookingsPageContent.layout === '1') ? 'w-full h-128' : 'md:w-1/2']"
        >
          <img class="object-cover w-full" :src="bookingsPageContent.image" alt="" />
        </div>
        <div class="prose pb-20 ml-4 flex flex-col "
             :class="[(bookingsPageContent.layout ===  '1')? 'w-full' : 'md:w-1/2']">
          <page-content :content="bookingsPageContent"></page-content>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="prose text-base max-w-prose pt-10">
        <page-content :content="bookingsPageContent"></page-content>
      </div>
    </div>
    <!--  Till here  >-->



    <div class="h-full">
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
        <div v-if="isLoggedIn">

          <div v-if="canNOTbook" class="mt-4 font-semibold">
            <translation :id="37" />
          </div>
          <div>
            <div class="" >
              <location-content :content="location" />
            </div>
          </div>
        </div>

        <div class="mt-4 w-full" v-if="isLoggedIn">
          <heading-two class="pb-4">
            <translation :id="18" />
          </heading-two>
          <div class="sticky top-20 mb-20">

            <div v-if="canNOTbook" class="w-full h-full p-6 bg-gray-50 absolute top-o left-0 z-30 opacity-80 flex justify-center items-center font-semibold">
                <translation v-if="!user.locations.includes(location.idInSheet)" :id="39" />
                <translation v-else :id="37" />
            </div>
            <booking-module :safetyPeriod="location.safetyPeriod || 0"/>
          </div>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    // Get Location Data
    let location = null
    if (payload) {
      location = payload
    } else {
      let getLocation = await $content('locations', params.location).fetch()
      location = getLocation
    }
    const regex = /\.(.*)/gm;
    const lang = regex.exec(params.location)[1]
    let getBookingContent = await $content('pages', `bookings.${lang}`).fetch()
    return { location: location, bookingsPageContent: getBookingContent }
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
  computed: {
    lang() {
      return this.$store.state.lang
    },
    ...mapGetters({
      user: 'auth/user',
    }),
    canNOTbook() {
      return (!this.location.active || !this.user.locations.includes(this.location.idInSheet))
    },
    isLoggedIn() {
      if(this.user) {
        return true
      }
      return false
    }
  },
}
</script>