<template>
  <UIBanner v-if="bannerMessage">{{ bannerMessage }}</UIBanner>
</template>

<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";

const route = useRoute();

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  Signin: "Sign-in failed. Please try again.",
  OAuthSignin: "Could not start OAuth sign-in. Please try again.",
  OAuthCallback:
    "OAuth callback failed. Please try again or use a different provider.",
  OAuthCreateAccount:
    "Could not create your OAuth account. Please contact support if this continues.",
  EmailCreateAccount:
    "Could not create your email account. Please try again later.",
  Callback:
    "Authentication callback failed. Please retry sign-in from the login page.",
  OAuthAccountNotLinked:
    "This email is already linked to a different provider. Sign in with the originally used provider.",
  EmailSignin: "Email sign-in failed. Please verify your link and try again.",
  CredentialsSignin: "Invalid credentials. Please check your details and retry.",
  SessionRequired: "You need to sign in to access that page.",
  AccessDenied: "Access denied. You do not have permission to sign in.",
  Verification: "Your sign-in link is invalid or has expired. Request a new one.",
  Configuration:
    "Authentication is temporarily unavailable due to a configuration issue.",
  Default: "We could not sign you in due to an unexpected authentication error.",
};

const AUTH_REASON_MESSAGES: Record<string, string> = {
  SessionRequired: "You need to sign in to view this section.",
};

const normalizeQueryValue = (
  value?: LocationQueryValue | LocationQueryValue[]
): string | undefined => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    const firstValue = value[0];
    return typeof firstValue === "string" ? firstValue : undefined;
  }

  return typeof value === "string" ? value : undefined;
};

const bannerMessage = computed(() => {
  const errorCode = normalizeQueryValue(route.query.error);
  const reasonCode = normalizeQueryValue(route.query.reason);

  if (errorCode) {
    return (
      AUTH_ERROR_MESSAGES[errorCode] ??
      `Authentication error (${errorCode}). Please try again.`
    );
  }

  if (reasonCode) {
    return (
      AUTH_REASON_MESSAGES[reasonCode] ??
      "You need to sign in to continue."
    );
  }

  return "";
});
</script>