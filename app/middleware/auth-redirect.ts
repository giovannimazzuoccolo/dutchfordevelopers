export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth();

  if (auth.status?.value === "authenticated") {
    return navigateTo("/dashboard?tab=learn");
  }
});
