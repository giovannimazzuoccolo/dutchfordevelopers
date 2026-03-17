<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-2">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        role="tab navigation"
      >
        <li class="nav-item mr-2" role="presentation">
          <NuxtLink
            :to="`${normalizedBasePath}/courses`"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.COURSES,
            }"
            id="tabs-courses-tab"
            role="tab"
          >
            Courses
          </NuxtLink>
        </li>
        <li class="nav-item" role="presentation">
          <NuxtLink
            :to="`${normalizedBasePath}/games`"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.GAMES,
            }"
            id="tabs-games-tab"
            role="tab"
          >
            Games
          </NuxtLink>
        </li>
        <li class="nav-item" role="presentation">
          <NuxtLink
            :to="`${normalizedBasePath}/read`"
            class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            :class="{
              'active border-main-orange text-main-orange':
                selectedTab === TAB_SELECTION.READ,
            }"
            id="tabs-read-tab"
            role="tab"
          >
            Read
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TAB_SELECTION } from "~/enums/tabSelection";

const props = defineProps<{
  basePath?: string;
}>();

const basePath = props.basePath ?? "/dashboard";
const normalizedBasePath = basePath.replace(/\/$/, "");

const route = useRoute();
const selectedTab = computed(() => {
  const current = route.path;
  if (current.startsWith(`${normalizedBasePath}/games`)) return TAB_SELECTION.GAMES;
  if (current.startsWith(`${normalizedBasePath}/read`)) return TAB_SELECTION.READ;
  // Default to courses for unknown or base paths.
  return TAB_SELECTION.COURSES;
});
</script>
