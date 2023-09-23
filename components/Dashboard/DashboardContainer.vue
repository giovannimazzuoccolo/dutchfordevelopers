<template>
  <div>
    <Container>
      <div class="my-2">
        <template v-if="isUserAuthenticated">
          <h2 class="font-bold text-sm dark:text-white">
            Hallo getuser
          </h2>
          <p class="text-sm dark:text-white">
            You can start a new lesson, play a game, or read the blog!
          </p>
        </template>
        <template v-else>
          <UIBanner
          >Login to view all the sections, track your learning and your best scores
            with the games, <strong class="text-bold">it is free!</strong></UIBanner
          >
        </template>
      </div>
    </Container>
    <DashboardTabs :selectedTab="tabSelection" :changeTab="changeTab"/>
    <CoursesList v-if="tabSelection === TAB_SELECTION.LEARN"/>
    <GamesList v-if="tabSelection === TAB_SELECTION.PLAY"/>
    <ReadList v-if="tabSelection === TAB_SELECTION.READ"/>
  </div>
</template>
<script setup lang="ts">
import {ref, ComputedRef} from 'vue'
import DashboardTabs from './DashboardTabs.vue'
import {useUsers} from "~/store/users";
import {TAB_SELECTION} from "~/enums/tabSelection";


const route = useRoute();
const user = useUsers();
const tabSelection = ref<TAB_SELECTION>(TAB_SELECTION.LEARN)


const isUserAuthenticated: ComputedRef<boolean> = computed(() => {
  return route.query.hasOwnProperty('reason')
})

function changeTab(value: TAB_SELECTION): void {
  tabSelection.value = value
}
</script>
