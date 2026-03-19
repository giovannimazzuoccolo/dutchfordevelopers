<template>
  <div
      class="rounded-md bg-white shadow-sm  ring-opacity-5 focus:outline-none p-3 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600 flex flex-col"
      role="link"
  >
    <h3 class="text-xl text-main-orange my-2" @click="navigate">
      {{ title }}
    </h3>
    <div class="gap-2 w-full break-words">
      <template v-for="word in getWords()">
        <Translatable :word="word"/>
        <!--<p class="dark:text-white">{{ contentSnippet }}</p>-->
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import Translatable from './Translatable.vue'

const props = defineProps<{
  title: string
  link: string
  description: string
}>()

const getWords = () => {
  return props.description.split(' ')
}

function navigate() {
  location.href = props.link
}

</script>
