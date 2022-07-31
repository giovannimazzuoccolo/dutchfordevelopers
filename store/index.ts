
import Vuex from 'vuex'
import { createLogger } from 'vuex'
import user from './modules/user'
import Vue from 'vue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default () =>  new Vuex.Store({
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})