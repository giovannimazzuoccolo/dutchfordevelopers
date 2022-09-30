import { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface LoginState {
    isDialogOpen: boolean
    loginDetails: object | null //TODO: define object
}

const state: LoginState = {
    isDialogOpen: false,
    loginDetails: null,
}

const getters: GetterTree<any, any> = {
    loginDetails: (state) => state.loginDetails,
    isDialogOpen: (state) => state.isDialogOpen,
}

const actions: ActionTree<any, any> = {
    openLoginDialog() {
        this.commit('login/LOGIN_DIALOG_CHANGE_STATE')
    },
}

const mutations: MutationTree<LoginState> = {
    LOGIN_DIALOG_CHANGE_STATE: (state) =>
        (state.isDialogOpen = !state.isDialogOpen),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
