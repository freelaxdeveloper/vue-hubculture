import Vue from 'vue'
import Vuex from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    news: {},
    user: JSON.parse(localStorage.getItem('user-data')) || null,
    token: localStorage.getItem('user-token') || null,
  },
  actions,
  getters,
  mutations,
})