<template>
  <div>
    <SharedContainer>
      <div class="my-2">
        <template v-if="user.isLogged()">
          <h2 class="font-bold text-sm dark:text-white">
            Hallo {{ userInfo?.user.user_metadata.name ?? 'daar (Hello there)' }}
          </h2>
          <p class="text-sm dark:text-white">
            You can start a new lesson, play a game, or read the blog!
          </p>
        </template>
        <template v-else>
	
		<UIBanner>	<NuxtLink to="/login">Sign up or login to keep track of your courses, game scores and more! <strong class="text-bold">it is free!</strong></NuxtLink></UIBanner
          >
        </template>
      </div>
    </SharedContainer>
    <DashboardTabs :selectedTab="tabSelection" :changeTab="changeTab"/>
    <CoursesList v-if="tabSelection === TAB_SELECTION.LEARN"/>
    <GamesList v-if="tabSelection === TAB_SELECTION.PLAY"/>
    <ReadList v-if="tabSelection === TAB_SELECTION.READ"/>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import DashboardTabs from './DashboardTabs.vue'
import {TAB_SELECTION} from "~/enums/tabSelection";
import { useUsers } from '~/store/users';
import { storeToRefs } from 'pinia';

const tabSelection = ref<TAB_SELECTION>(TAB_SELECTION.LEARN)
const user = useUsers();

const { userInfo } = storeToRefs(user)

function changeTab(value: TAB_SELECTION): void {
  tabSelection.value = value
}
</script>
