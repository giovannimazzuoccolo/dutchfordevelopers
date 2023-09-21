import {REQUEST_STATUS} from '~/enums/serverRequests'
import {defineStore} from "pinia";
import {ERROR_ROUTE} from "~/utils/navigation";
import {supabase} from "~/services/supabase";

export interface UsersState {
    userInfo: object | null //TODO: define object
    request: REQUEST_STATUS
}


const client = supabase;
export const useUsers = defineStore('users', {
    state: (): UsersState => ({
        userInfo: null,
        request: REQUEST_STATUS.IDLE
    }),

    actions: {
        async authSSO(domain: string) {
            const {data, error} = await client.auth.signInWithSSO(
                {
                    domain: domain
                },
            )
            if (!error) {
                this.userInfo = data;
            } else {
                console.warn(error)
                navigateTo(ERROR_ROUTE)
            }
        },

        async autoAuth() {
            const userInfo = await client.auth.getUser();

            if (userInfo) {
                this.userInfo = userInfo;
                return true;
            } else {
                return false;
            }
        },

        async logout() {
            const val = await client.auth.signOut();
            //TODO: manage error
        }
    }

})