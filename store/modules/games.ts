import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { REQUEST_STATUS } from '~/enums';
import { supabase } from '~/supabase/init'

export type Game = {
    id: String,
    name: String,
    description: String,
    image: String
}

export type Games = Game[];

export interface GamesState {
    games: Games;
    request: REQUEST_STATUS;
}

export const state: GamesState = {
    games: [],
    request: REQUEST_STATUS.IDLE
}

const getters: GetterTree<any, any> = {
    games: (state) => state.games,
    request: (state) => state.request
}

const mutations: MutationTree<GamesState> = {
    REQUEST_STARTED: (state) => {
        return state.request = REQUEST_STATUS.LOADING
    },
    REQUEST_ERROR: (state) => {
        return state.request = REQUEST_STATUS.ERROR
    },
    REQUEST_SUCCESS: (state) => {
        return state.request = REQUEST_STATUS.SUCCESS 
    },
    ADD_DATA: (state, games) => {
        return state.games = games
    }
}

const actions: ActionTree<any, any> = {
    async getGames() {
        this.commit('games/REQUEST_STARTED');
        const { data, error } = await supabase.from("games").select();
        if (!error) {
            this.commit('games/REQUEST_SUCCESS');
            this.commit('games/ADD_DATA', data);
        } else {
            this.commit('games/REQUEST_ERROR');
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
