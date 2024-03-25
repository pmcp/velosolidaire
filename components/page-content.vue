<template>
  <div>
  <heading-one v-if="content.title !== 'Home'">
    {{ content.intro }}
  </heading-one>
  <div class="prose prose-indigo prose-lg text-gray-500 mx-auto w-full ">
    <div v-for="(element, key) in content.elements" :key="`el${key}`">
      <div v-if="element.type === 'text'" class="prose lg:prose-md" v-html="$md.render(element.markdown)"></div>
      <logos v-if="element.type === 'logos'" :logos="element.logo"/>

      <div v-if="element.type === 'buttons'" class="flex flex-row flex-wrap w-full gap-2 my-4">
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
</template>
<script>
export default {
  props: {
    content: {
      type: Object
    },
  },
}
</script>