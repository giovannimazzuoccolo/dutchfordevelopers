import { useUsers } from "~/store/users";

export default defineNuxtPlugin(() => {
  const { autoAuth } = useUsers();

  autoAuth();
});
