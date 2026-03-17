import type { Pinia } from "pinia";
import { useUsers } from "~/store/users";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  const usersStore = useUsers(pinia);
  return usersStore.autoAuth();
});
