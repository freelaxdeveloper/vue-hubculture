import axios from 'axios'

export const STORAGE_KEY = 'todos-vuejs'

export const mutations = {
  setNews(state, news) {
    state.news = news
  },
  setToken(state, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    localStorage.setItem('user-token', token)
    state.token = token
  },
  setUser(state, user) {
    console.log('setUser', user);
    localStorage.setItem('user-data', JSON.stringify(user))
    state.user = user
  },
  logout(state) {
    delete axios.defaults.headers.common['Authorization']
    localStorage.clear()
    state.user = null
    state.token = null
  },
}