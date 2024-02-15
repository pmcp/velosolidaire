<template>
  <div>
    <div v-show="!user">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/user',
    })
  }
}
</script>
