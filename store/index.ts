import Vuex from 'vuex'
import { createLogger } from 'vuex'
import user, { UserState } from './modules/user'
import login, { LoginState } from './modules/login'
import Vue from 'vue'


Vue.use(Vuex)

export interface GlobalStore {
    login: LoginState
    user: UserState
}

const debug = process.env.NODE_ENV !== 'production'



export default () =>
    new Vuex.Store({
        modules: {
            user,
            login,
        },
        strict: debug,
        plugins: debug ? [createLogger()] : [],
    })
