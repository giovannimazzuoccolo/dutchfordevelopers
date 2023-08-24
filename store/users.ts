import {REQUEST_STATUS} from '~/enums/serverRequests'
import {defineStore} from "pinia";
import {useSupabaseClient} from "#imports";
import {ERROR_ROUTE} from "~/utils/navigation";

export interface UsersState {
    userInfo: object | null //TODO: define object
    request: REQUEST_STATUS
}


const client = useSupabaseClient();

export const useUsers = defineStore('users', {
    state : ():UsersState => ({
        userInfo: null,
        request: REQUEST_STATUS.IDLE
    }),

    actions : {
        async authSSO(domain:string) {
            const { data, error } = await client.auth.signInWithSSO(
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

            if(userInfo) {
                this.userInfo = userInfo;
                return true;
            } else {
                return false;
            }
        }
    }

})