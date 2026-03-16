<template>
  <div>
    <SharedContainer>
      <div class="my-2">
        <template v-if="user.isLogged()">
          <h2 class="font-bold dark:text-white">
            Hallo {{ userInfo?.user?.name ?? 'gebruiker' }}!
          </h2>
          <p class="dark:text-white">
            You can start a new lesson, play a game, or read the blog!
          </p>
        </template>
        <template v-else>
          <UIBanner>
            <NuxtLink to="/login"
              >Sign up or login to keep track of your courses, game scores and more!
              <strong class="text-bold">it is free!</strong></NuxtLink
            >
          </UIBanner>
        </template>
      </div>
    </SharedContainer>

    <DashboardTabs :basePath="basePath" />

    <slot />
  </div>
</template>
<script setup lang="ts">
import DashboardTabs from "./DashboardTabs.vue";
import { useUsers } from "~/store/users";
import { storeToRefs } from "pinia";

const props = defineProps<{
  basePath?: string;
}>();

const basePath = props.basePath ?? "/dashboard";

const user = useUsers();
const { userInfo } = storeToRefs(user);
</script>
