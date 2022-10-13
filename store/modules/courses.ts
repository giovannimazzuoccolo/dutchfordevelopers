import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { REQUEST_STATUS } from '~/enums';
import { supabase } from '~/supabase/init'

export type Course = {
    id: String,
    title: String,
    description: String,
    image: String
}

export type Courses = Course[];

export interface CoursesState {
    courses: Courses;
    request: REQUEST_STATUS;
}

export const state: CoursesState = {
    courses: [],
    request: REQUEST_STATUS.IDLE
}

const getters: GetterTree<any, any> = {
    courses: (state) => state.courses
}

const mutations: MutationTree<CoursesState> = {
    REQUEST_STARTED: (state) => {
        return state.request = REQUEST_STATUS.LOADING
    },
    REQUEST_ERROR: (state) => {
        return state.request = REQUEST_STATUS.ERROR
    },
    REQUEST_SUCCESS: (_, courses) => {
        return { courses, request: REQUEST_STATUS.SUCCESS }
    }
}

const actions: ActionTree<any, any> = {
    async getCourses() {
        this.commit('courses/REQUEST_STARTED');
        const { data, error } = await supabase.from("courses").select("*");
        if (!error) {
            this.commit('courses/REQUEST_SUCCESS', data);
        } else {
            this.commit('courses/REQUEST_ERROR');
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