import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { supabase } from '~/supabase/init'

export interface UserState {
    userInfo: object | null //TODO: define object
}

export const state: UserState = {
    userInfo: null,
}

const getters: GetterTree<any, any> = {
    userInfo: (state) => state.userInfo,
    isLogged: (state) => state.userInfo ? true : false
}

const actions: ActionTree<any, any> = {
    async githubAuth() {
        const { user, error } = await supabase.auth.signIn({
            provider: 'github',
        }, {
            scopes: ''
        })
        debugger;
        if (!error) {
            debugger;
            this.commit('user/UPDATE_USER', user);
        } else {
            console.warn(error);
            debugger;

            this.$router.replace('/error')
        }
    },

    async linkedinAuth() {
        const { user, error } =
            await supabase.auth.signIn(
                {
                    provider: 'linkedin',
                },
                {
                    scopes: '',
                }
            )
        if (!error) {
            this.commit('user/UPDATE_USER', user);
            this.$router.replace('/dashboard');
        } else {
            console.warn(error);
            this.$router.replace('/error')
        }
    },

    async authenticate({ commit }) {
        const userInfo = supabase.auth.user()
        commit('UPDATE_USER', userInfo)
    },
    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error.message)
        } else {
            this.commit('user/UPDATE_USER', null)
            this.$router.replace('/logout')
        }
    },
    async autoAuthenticate(): Promise<Boolean> {
        const userInfo = supabase.auth.user()

        if (userInfo) {
            this.commit('user/UPDATE_USER', userInfo)
            return true;
        } else {
            return false;
        }
    },
}

const mutations: MutationTree<UserState> = {
    UPDATE_USER: (state, user) => {
        return state.userInfo = user;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
