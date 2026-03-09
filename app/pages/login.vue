<template>
  <SharedContainer>
    <UIBlogWrapper>
      <AuthErrorBanner />
      <UITitle orange="Enter in" blue="Dutch for Developers" center />

      <section
        class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto"
      >
        <SsoButton
          label="Continue with Google"
          icon="fa6-brands:google"
          color-class="bg-white text-black border-black/15"
          @click="auth(AuthProviders.GOOGLE)"
        />
        <SsoButton
          label="Continue with Github"
          icon="fa6-brands:github"
          color-class="bg-github text-white border-white/15"
          @click="auth(AuthProviders.GITHUB)"
        />
        <SsoButton
          label="Continue with Linkedin"
          icon="fa6-brands:linkedin"
          color-class="bg-linkedin text-white border-white/15"
          @click="auth(AuthProviders.LINKEDIN)"
        />
      </section>
    </UIBlogWrapper>
  </SharedContainer>
</template>
<script setup lang="ts">
import { useUsers } from "~/store/users";

const AuthProviders = {
  GOOGLE: "google",
  GITHUB: "github",
  LINKEDIN: "linkedin",
} as const;


useHead({
  title: "Enter in Dutch for Developers - Dutch for Developers",
});

definePageMeta({
  middleware: "auth-redirect",
});

const route = useRoute();
const user = useUsers();

const auth = (auth: string) => {
  return user.authSSO(auth);
};

</script>
