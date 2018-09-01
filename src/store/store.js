import Vue from 'vue'
import Vuex from 'vuex'
import { mutations, KEY_TOKEN, KEY_USER } from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    news: {},
    user: JSON.parse(localStorage.getItem(KEY_USER)) || null,
    token: localStorage.getItem(KEY_TOKEN) || null,
    currencies: [],
  },
  actions,
  getters,
  mutations,
})