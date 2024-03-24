<template>
  <NuxtLink :to="props.route">
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
        role="link"
    >
      <div class="flex items-center w-full">
        <div class="p-6">
          <font-awesome-icon :icon="`icon=fa-solid fa-${icon}`" class="text-slate-400 w-8"/>
        </div>
        <div class="w-full">
          <h3 class="uppercase text-xl text-main-orange my-2">
            {{ name }}
          </h3>

          <p class="dark:text-white mb-2">{{ description }}</p>
          <p class="dark:text-white" v-if="score">
            Best score
            <span class="text-main-orange">{{ score }}</span>
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  name: String,
  description: String,
  route: {
    type: String,
    required: true
  },
  icon: String,
  score: {
    type: String,
    required: false,
  },
})

</script>
