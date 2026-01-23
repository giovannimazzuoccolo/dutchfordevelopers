<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-2">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        role="tab navigation"
      >
        <li class="nav-item mr-2" role="presentation">
          <a
            href="#"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            id="tabs-learn-tab"
            @click="changeTab(TAB_SELECTION.LEARN)"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.LEARN,
            }"
            role="tab"
            >Learn</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            href="#"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            @click="changeTab(TAB_SELECTION.PLAY)"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.PLAY,
            }"
            id="tabs-play-tab"
            role="tab"
            >Play</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            href="#"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            @click="changeTab(TAB_SELECTION.READ)"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.READ,
            }"
            id="tabs-profile-tab"
            role="tab"
            >Read</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type PropType } from "vue";

import { TAB_SELECTION } from "~/enums/tabSelection";

// const props = defineProps({
//   selectedTab: TAB_SELECTION,
//   changeTab: {
//     type: Function as PropType<(value: TAB_SELECTION) => void>,
//     required: true,
//   }
// })

const props = defineProps({
  selectedTab: String,
  changeTab: {
    type: Function as PropType<(value: TAB_SELECTION) => void>,
    required: true,
  },
});
</script>
