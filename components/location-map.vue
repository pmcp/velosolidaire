<template>
  <div class="h-40 rounded" id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  computed: {
    locations() {
      console.log('locations')
      return this.$store.getters.localisedLocations
    },
    activeLocationId() {
      console.log('activeLocationId')
      return this.$store.state.activeLocationId
    },
  },
  watch: {
    locations: function (val) {
      console.log('HHHERRRE', val)
      // // TODO: add all markers
      console.log('locat', this.locations)
      if (!this.locations) return
      const mapboxgl = require('mapbox-gl')

      console.log('HERE', this.activeLocationId)
      if (this.activeLocationId != null) {
        const activeLocationObject = this.locations[0]
        const coordinates = JSON.parse(activeLocationObject.location).coordinates

        const map = new mapboxgl.Map({
          accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJjbDJwMHhxdjgxbWgzM2NwazQydnlhbWVuIn0.EeF1nO2u3BmpdwsrHoGtUw',
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: coordinates,
          zoom: 13,
        })

        new mapboxgl.Marker()
          .setLngLat(coordinates)
          // .setPopup(loc.description)
          .addTo(map) // Initialized above
      } else {
        const coordinates = JSON.parse(this.locations[0].location).coordinates

        const map = new mapboxgl.Map({
          accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJjbDJwMHhxdjgxbWgzM2NwazQydnlhbWVuIn0.EeF1nO2u3BmpdwsrHoGtUw',
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: coordinates, // starting position as [lng, lat]
          zoom: 13,
        })

        for (let i = 0; i < this.locations.length; i++) {
          const loc = this.locations[i]
          if (loc) {
            const coordinates = JSON.parse(loc.location).coordinates
            new mapboxgl.Marker()
              .setLngLat(coordinates)
              // .setPopup(loc.description)
              .addTo(map) // Initialized above
          }
        }
      }
    },
    activeLocationId: function (val) {
      console.log('get', val)
      // TODO: add all markers
      console.log('locat', this.locations)
      if (!this.locations) return
      const mapboxgl = require('mapbox-gl')

      console.log('HERE', this.activeLocationId)
      if (this.activeLocationId != null) {
        const activeLocationObject = this.locations.filter((l) => l.idInSheet === this.activeLocationId)[0]
        const coordinates = JSON.parse(activeLocationObject.location).coordinates

        const map = new mapboxgl.Map({
          accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJjbDJwMHhxdjgxbWgzM2NwazQydnlhbWVuIn0.EeF1nO2u3BmpdwsrHoGtUw',
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: coordinates,
          zoom: 13,
        })

        new mapboxgl.Marker()
          .setLngLat(coordinates)
          // .setPopup(loc.description)
          .addTo(map) // Initialized above
      } else {
        const coordinates = JSON.parse(this.locations[0].location).coordinates

        const map = new mapboxgl.Map({
          accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJjbDJwMHhxdjgxbWgzM2NwazQydnlhbWVuIn0.EeF1nO2u3BmpdwsrHoGtUw',
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: coordinates, // starting position as [lng, lat]
          zoom: 13,
        })

        for (let i = 0; i < this.locations.length; i++) {
          const loc = this.locations[i]
          if (loc) {
            const coordinates = JSON.parse(loc.location).coordinates
            new mapboxgl.Marker()
              .setLngLat(coordinates)
              // .setPopup(loc.description)
              .addTo(map) // Initialized above
          }
        }
      }

    },
  },
  mounted() {

  },
}
</script>
