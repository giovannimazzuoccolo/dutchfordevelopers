import { useUsers } from "~/store/users";

export default defineNuxtRouteMiddleware(async () => {
  // Try to populate the user store on every route (if not already logged in)
  const users = useUsers();
  if (!users.userInfo) {
    await users.autoAuth();
  }
});
