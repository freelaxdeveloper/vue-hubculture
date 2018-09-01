export default {
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