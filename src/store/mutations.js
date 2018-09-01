import axios from 'axios'

export const KEY_TOKEN = 'user-token'
export const KEY_USER = 'user-data'

export const mutations = {
  addCurrency(state, currency) {
    state.currencies.push(currency)
  },
  setNews(state, news) {
    state.news = news
  },
  setToken(state, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    localStorage.setItem(KEY_TOKEN, token)
    state.token = token
  },
  setUser(state, user) {
    console.log('setUser', user);
    localStorage.setItem(KEY_USER, JSON.stringify(user))
    state.user = user
  },
  logout(state) {
    delete axios.defaults.headers.common['Authorization']
    localStorage.clear()
    state.user = null
    state.token = null
  },
}