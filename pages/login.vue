<template>
  <SharedContainer>
    <UIBlogWrapper>
      <UIBanner v-if="isUserAuthenticated">You need to login to view this section</UIBanner>
      <UITitle orange="Enter in" blue="Dutch for Developers" center/>

      <section class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto">
        <button
            class="py-2 bg-github text-white rounded-lg font-bold border-2 px-20 md:px-28"
            @click="auth(AuthProviders.GITHUB)"
        >
                    <span class="flex gap-2 items-center">
                        <font-awesome-icon icon="fa-brands fa-github" class="fill-current p-1 h-8"/>
                        Continue with Github</span
                    >
        </button>
        <button
            class="py-2 bg-linkedin text-white rounded-lg font-bold border-2 px-20 md:px-28"
            @click="auth(AuthProviders.LINKEDIN)"
        >
                    <span class="flex gap-2 items-center">
                        <font-awesome-icon icon="fa-brands fa-linkedin" name="brands/linkedin"
                                           class="fill-current p-1 h-8"/>
                        Continue with Linkedin
                    </span>
        </button>
      </section>
    </UIBlogWrapper>
  </SharedContainer>
</template>
<script setup lang="ts">

import Vue, {ComputedRef} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUsers} from "~/store/users";

const AuthProviders = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin'
} as const

const route = useRoute();
const user = useUsers();

const isUserAuthenticated: ComputedRef<boolean> = computed(() => {
  return route.query.hasOwnProperty('reason')
})

const auth = (auth: string) => {
  return user.authSSO(auth);
}


//
// export default Vue.extend({
//   name: 'Login',
//
//   data() {
//     return {
//       unauth: false,
//     }
//   },
//   methods: {
//     setUnauth(value: boolean): void {
//       this.unauth = value
//     },
//   },
//   created() {
//     const {query} = this.$route.params
//     if (query && query.hasOwnProperty('reason')) {
//       this.setUnauth(true)
//     } else {
//       this.setUnauth(false)
//     }
//   },
// })
</script>
