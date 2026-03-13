import type { Pinia } from "pinia";
import { useUsers } from "~/store/users";

export default defineNuxtPlugin((nuxtApp) => {
  // const pinia = nuxtApp.$pinia;
  // const usersStore = useUsers(pinia as Pinia);
  // return usersStore.autoAuth();
});
