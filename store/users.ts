import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { ERROR_ROUTE } from "~/utils/navigation";
import { Provider, Session, SupabaseClient } from "@supabase/supabase-js";

export interface UsersState {
  userInfo: Session | null; //TODO: define object
  request: REQUEST_STATUS;
}

function supabaseClient() {
  const { $supabase } = useNuxtApp();
  return $supabase as SupabaseClient;
}

export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    userInfo: null,
    request: REQUEST_STATUS.IDLE,
  }),

  actions: {
    async authSSO(provider: Provider) {
      const client = supabaseClient();
      const { error } = await client.auth.signInWithOAuth({
        provider: provider,
      });
      if (error) {
        console.warn(error);
        navigateTo(ERROR_ROUTE);
      }
    },

    async autoAuth() {
      const client = supabaseClient();
      const { data } = await client.auth.getSession();
      if (data.session === null) {
        this.userInfo = null;
      } else {
        this.userInfo = data.session;
      }
    },

    async logout() {
      const client = supabaseClient();

      const val = await client.auth.signOut();
      this.userInfo = null;
      return val;
      //TODO: manage error
    },

    isLogged() {
      return this.userInfo !== null;
    },
  },
});
