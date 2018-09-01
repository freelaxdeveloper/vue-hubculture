export default {
  addCurrency({ commit }, currency) {
    commit('addCurrency', currency)
  },
  setNews ({ commit }, news) {
    commit('setNews', news)
  },
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  logout({ commit }) {
    commit('logout')
  },
}