import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: state => state.user,
}

export const mutations: MutationTree<RootState> = {
  UPDATE_USER: (state, newName: string) => (state.user = newName),
}

export const actions: ActionTree<RootState, RootState> = {
  async authenticate({ commit }) {
    console.log(commit);
    commit('UPDATE_USER', 'gio')
  },
}