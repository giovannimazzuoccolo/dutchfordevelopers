<template>
  <SharedContainer>
    <UIBlogWrapper>
      <UIBanner v-if="isUserAuthenticated"
        >You need to login to view this section</UIBanner
      >
      <UITitle orange="Enter in" blue="Dutch for Developers" center />

      <section
        class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto"
      >
        <button
          class="py-2 bg-github text-white rounded-lg font-bold border-2 px-20 md:px-28"
          @click="auth(AuthProviders.GITHUB)"
        >
          <span class="flex gap-2 items-center">
            <Icon name="fa6-brands:github" class="h-8 w-8" />
            Continue with Github</span
          >
        </button>
        <button
          class="py-2 bg-linkedin text-white rounded-lg font-bold border-2 px-20 md:px-28"
          @click="auth(AuthProviders.LINKEDIN)"
        >
          <span class="flex gap-2 items-center">
            <Icon name="fa6-brands:linkedin" class="h-8 w-8" />
            Continue with Linkedin
          </span>
        </button>
      </section>
    </UIBlogWrapper>
  </SharedContainer>
</template>
<script setup lang="ts">
import { type ComputedRef } from "vue";
import { useUsers } from "~/store/users";

const AuthProviders = {
  GITHUB: "github",
  LINKEDIN: "linkedin",
} as const;

useHead({
  title: "Enter in Dutch for Developers - Dutch for Developers",
});

const route = useRoute();
const user = useUsers();

const isUserAuthenticated: ComputedRef<boolean> = computed(() => {
  return route.query.hasOwnProperty("reason");
});

const auth = (auth: string) => {
  return user.authSSO(auth);
};

</script>
