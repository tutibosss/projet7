import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: null
  },
  mutations: {
    adminStatut(state, payload) {
      state.admin = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
