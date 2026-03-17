import { REDIRECT_AFTER_LOGIN } from "~/utils/navigation";

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth();
  if (auth.status?.value === "loading") {
    await auth.getSession?.();
  }
  if (auth.status?.value === "authenticated") {
    return navigateTo(REDIRECT_AFTER_LOGIN);
  }
});
