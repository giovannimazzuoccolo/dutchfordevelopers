
import Vuex from 'vuex'
import { createLogger } from 'vuex'
import user from './modules/user'
import login from './modules/login'
import Vue from 'vue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default () => new Vuex.Store({
  modules: {
    user,
    login
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})