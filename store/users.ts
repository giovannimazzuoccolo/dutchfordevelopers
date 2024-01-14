import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { ERROR_ROUTE, REDIRECT_AFTER_LOGIN } from "~/utils/navigation";
import { supabase } from "~/services/supabase";
import { Provider } from "@supabase/supabase-js";

export interface UsersState {
  userInfo: object | null; //TODO: define object
  request: REQUEST_STATUS;
}

const client = supabase;
export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    userInfo: null,
    request: REQUEST_STATUS.IDLE,
  }),

  actions: {
    async authSSO(provider: Provider) {
      const { data, error } = await client.auth.signInWithOAuth({
        provider: provider,
      });
      if (!error) {
        this.userInfo = data;
        // connection successful, it will be redirect to the main page: TODO: move the redirect to dashboard.
      } else {
        console.warn(error);
        navigateTo(ERROR_ROUTE);
      }
    },

    async autoAuth() {
      const userInfo = await client.auth.getUser();

      if (userInfo) {
        this.userInfo = userInfo;
        navigateTo(REDIRECT_AFTER_LOGIN);
      } else {
        return false;
      }
    },

    async logout() {
      const val = await client.auth.signOut();
      this.userInfo = null;
      return val;
      //TODO: manage error
    },

    async isLogged() {
      const { data } = await supabase.auth.getSession();
      if (data.session === null) {
        this.userInfo = null;
        return false;
      } else {
        this.userInfo = data;
        return true;
      }
    },
  },
});
