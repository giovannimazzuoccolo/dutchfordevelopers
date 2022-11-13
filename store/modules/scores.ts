import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { REQUEST_STATUS } from '~/enums';
import { supabase } from '~/supabase/init'

export type Score = {
    id: String,
    game: String,
    score: String,
    user: String
}

export type Scores = Score[];

export interface ScoreState {
    scores: Scores;
    request: REQUEST_STATUS;
}

export const state: ScoreState = {
    scores: [],
    request: REQUEST_STATUS.IDLE
}

const getters: GetterTree<any, any> = {
    scores: (state) => state.scores,
    request: (state) => state.request
}

const mutations: MutationTree<ScoreState> = {
    REQUEST_STARTED: (state) => {
        return state.request = REQUEST_STATUS.LOADING
    },
    REQUEST_ERROR: (state) => {
        return state.request = REQUEST_STATUS.ERROR
    },
    REQUEST_SUCCESS: (state) => {
        return state.request = REQUEST_STATUS.SUCCESS 
    },
    ADD_DATA: (state, scores) => {
        return state.scores = scores
    }
}

const actions: ActionTree<any, any> = {
    async getScore() {
        this.commit('scores/REQUEST_STARTED');
        const { data, error } = await supabase.from("scores").select();
        if (!error) {
            this.commit('courses/REQUEST_SUCCESS');
            this.commit('courses/ADD_DATA', data);
        } else {
            this.commit('courses/REQUEST_ERROR');
        }
    },
    async getScoreByUserId() {
        const userInfo = supabase.auth.user()
        const { data, error} = await supabase.from("scores").select()
    },

    async saveScore({ commit }, data) {
        const {game, score } = data;
        this.commit('scores/ADD_DATA', commit);
        const userInfo = supabase.auth.user()
        if(userInfo) {
            const { error } = await supabase.from("scores").insert( { game, score, user_id: userInfo.id  } );
            if (!error) {
                this.commit('courses/REQUEST_SUCCESS');
            } else {
                this.commit('courses/REQUEST_ERROR');
            }

        } else {
            console.error('No user defined');
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