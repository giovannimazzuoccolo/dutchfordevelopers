import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { REQUEST_STATUS } from '~/enums'
import { supabase } from '~/supabase/init'

export type Game = {
    id: String
    name: String
    description: String
    fa_icon: String
}

export type Games = Game[]

export interface GamesState {
    games: Games
    request: REQUEST_STATUS
}

export const state: GamesState = {
    games: [],
    request: REQUEST_STATUS.IDLE,
}

const getters: GetterTree<any, any> = {
    games: (state) => state.games,
    request: (state) => state.request,
}

const mutations: MutationTree<GamesState> = {
    REQUEST_STARTED: (state) => {
        return (state.request = REQUEST_STATUS.LOADING)
    },
    REQUEST_ERROR: (state) => {
        return (state.request = REQUEST_STATUS.ERROR)
    },
    REQUEST_SUCCESS: (state) => {
        return (state.request = REQUEST_STATUS.SUCCESS)
    },
    ADD_DATA: (state, games) => {
        return (state.games = games)
    },
}

const actions: ActionTree<any, any> = {
    async getGames() {
        this.commit('games/REQUEST_STARTED')
        const { data, error } = await supabase.from('games').select()
        if (!error) {
            this.commit('games/REQUEST_SUCCESS')
            this.commit('games/ADD_DATA', data)
        } else {
            this.commit('games/REQUEST_ERROR')
        }
    },

    async getGamesWithScore() {
        this.commit('scores/REQUEST_STARTED')
        const userInfo = supabase.auth.user()
        if (userInfo) {
            this.commit('games/REQUEST_STARTED')
            const { data, error } = await supabase.from('games').select('*')
            if (!error) {
                const { data: scores, error: scoresErr } = await supabase
                    .from('scores')
                    .select('game,score')
                    .eq('user_id', userInfo.id)
                if (!scoresErr) {
                    this.commit('games/REQUEST_SUCCESS')
                    const gamesWithScore = data.map((d) => ({
                        ...d,
                        score: scores?.find((s) => s.game === d.route)?.score,
                    }))
                    this.commit('games/ADD_DATA', gamesWithScore)
                }
            } else {
                this.commit('games/REQUEST_ERROR')
            }
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
