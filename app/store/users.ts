import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { ERROR_ROUTE } from "~/utils/navigation";
import type { Session } from "next-auth";

export interface UsersState {
  userInfo: Session | null;
  request: REQUEST_STATUS;
}

export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    userInfo: null,
    request: REQUEST_STATUS.IDLE,
  }),

  actions: {
    // Trigger SSO via nuxt-auth (server-side routes configured by @sidebase/nuxt-auth)
    async authSSO(provider: string) {
      const auth = useAuth();
      try {
        // signIn redirects to provider's login page
        await auth.signIn(provider);
      } catch (e) {
        console.warn(e);
        navigateTo(ERROR_ROUTE);
      }
    },

    // Populate user info from nuxt-auth state
    async autoAuth() {
      const auth = useAuth();

      if (auth.status?.value === "loading") {
        await auth.getSession?.();
      }

      const status = auth.status?.value;
      const session = auth.data?.value;

      this.userInfo = status === "authenticated" ? (session ?? null) : null;
    },

    async logout() {
      const auth = useAuth();
      try {
        await auth.signOut();
      } catch (e) {
        console.warn(e);
      }
      this.userInfo = null;
    },

    isLogged() {
      return !!this.userInfo;
    },
  },
});
