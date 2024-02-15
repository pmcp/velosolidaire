<template xmlns="http://www.w3.org/1999/html">
<div class="w-full flex flex-row justify-center gap-8">
  <div v-for="(logo, key) in logos" :key="`logo-${key}`" class="h-40 w-40 flex justify-center items-center">
    <a v-if="logo.link.length > 0" :href="logo.link" target="_blank">
      <img class="object-cover w-full" :src="logo.image" :alt="logo.name"/>
    </a>
    <img v-else class="object-cover w-full h-full" :src="logo.image" :alt="logo.name" />
  </div>

</div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    logos: []
  }
}
</script>