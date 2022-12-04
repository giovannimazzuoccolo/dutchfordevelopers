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
    courses: (state) => state.courses,
    request: (state) => state.request
}

const mutations: MutationTree<CoursesState> = {
    REQUEST_STARTED: (state) => {
        return state.request = REQUEST_STATUS.LOADING
    },
    REQUEST_ERROR: (state) => {
        return state.request = REQUEST_STATUS.ERROR
    },
    REQUEST_SUCCESS: (state) => {
        return state.request = REQUEST_STATUS.SUCCESS 
    },
    ADD_DATA: (state, courses) => {
        return state.courses = courses
    }
}

const actions: ActionTree<any, any> = {
    async getCourses() {
        this.commit('courses/REQUEST_STARTED');
        const { data, error } = await supabase.from("courses").select();
        if (!error) {
            this.commit('courses/REQUEST_SUCCESS');
            this.commit('courses/ADD_DATA', data);
        } else {
            this.commit('courses/REQUEST_ERROR');
        }
    },

    async getCoursesForUser() {
            //TODO: something with join? or action in action?
    },

    async markCourseAsRead({commit}, data) {
        this.commit('courses/REQUEST_STARTED');
        const { courseId } = data;
        const userInfo = supabase.auth.user()
        if(userInfo) {
            const { error } = await supabase.from("courses_users").insert( { course_id: courseId, user_id: userInfo.id  } );
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
