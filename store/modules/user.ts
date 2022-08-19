import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { supabase } from '~/supabase/init'

interface UserState {
    isUserAuthenticated: boolean
    user: object | null //TODO: define object
}

const state: UserState = {
    isUserAuthenticated: false,
    user: null,
}

const getters: GetterTree<any, any> = {
    user: (state) => state.user,
    isUserAuthenticated: (state) =>
        state.isUserAuthenticated,
}

const actions: ActionTree<any, any> = {
    async authenticate({ commit }) {
        const userInfo = supabase.auth.user()
        console.log(userInfo)
        commit('UPDATE_USER', 'gio')
    },
    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error.message)
        } else {
            this.commit('IS_AUTHENTICATED')
            this.$router.replace('/logout')
        }
    },
    async autoAuthenticate() {
        const userInfo = supabase.auth.user()
        if (userInfo) {
            this.commit('UPDATE_USER', userInfo)
        } else {
            this.$router.replace('/login')
        }
    },
}

const mutations: MutationTree<UserState> = {
    IS_AUTHENTICATED: (state) =>
        (state.isUserAuthenticated =
            !state.isUserAuthenticated),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
