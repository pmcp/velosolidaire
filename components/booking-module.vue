<template>
  <card class="w-full border-2 rounded-md bg-pink-50 border-pink-500" open>
    <template v-slot:opened>

      <div class="px-5 pb-5">
        <div class="flex justify-between items-center mb-2">
          <button @click="legendeOpen = !legendeOpen" v-if="legendeOpen" class="z-10  mt-2 text-pink-500 italic text-sm bg-pink-200 underline px-2 py-2 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100"><translation :id="27" /></button>
          <button @click="legendeOpen = !legendeOpen" v-else class="z-10 mt-2 rounded text-pink-500 italic text-sm bg-pink-100 underline px-2 py-2 text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-pink-100"><translation :id="26" /></button>
        </div>
        <custom-transition>
          <card v-if="legendeOpen" class="w-full border-2 rounded-b-lg  bg-pink-50 border-pink-500 mb-5 -top-2 relative" open>
            <template v-slot:opened>
              <booking-legend class="p-5"/>
            </template>
          </card>
        </custom-transition>
        <div class="relative">
          <booking-calendar class="z-20" />
        </div>

        <booking-moments class="z-10" />
      </div>
    </template>
  </card>
</template>

<script>

export default {
  data() {
    return {
      legendeOpen: false
    }
  }
}
</script>
