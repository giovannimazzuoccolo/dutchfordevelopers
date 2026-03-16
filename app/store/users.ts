import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { ERROR_ROUTE } from "~/utils/navigation";
import type { Session } from "next-auth";

interface UserSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
    accessToken?: string;
    idToken?: string;
  };
}

export interface UsersState {
  userInfo: UserSession | null;
  request: REQUEST_STATUS;
}

export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    userInfo: useAuth().data?.value as UserSession | null,
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
      const session = auth.data?.value as UserSession | null;

      // Ensure we always have an id on the client session (set by next-auth callbacks)
      this.userInfo =
        status === "authenticated" && session?.user ? session : null;
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
