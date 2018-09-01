import Vue from 'vue'
import App from './App.vue'
import { EventBus } from './event-bus.js'
import { store } from './store/store.js';

import sassStyles from './assets/sass/app.scss'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(BootstrapVue);
Vue.use(VueRouter)

Vue.component('nav-bar', require('./components/NavBarComponent.vue').default)

import News from './pages/NewsComponent'
import Post from './pages/PostComponent'
import Home from './pages/HomeComponent'
import Market from './pages/MarketComponent'
import Login from './pages/LoginComponent'
import Logout from './pages/LogoutComponent'
import UserSearch from './pages/UserSearchComponent'
import UserInfo from './pages/UserInfoComponent'


axios.defaults.headers.common['Private-Key'] = '***'
axios.defaults.headers.common['Public-Key'] = '***'

const ifAuthenticated = (to, from, next) => {
  if (store.state.token) {
    next()
    return
  }
  next('/login')
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.token) {
    next()
    return
  }
  next('/')
}

var router = new VueRouter({
  // mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/login', component: Login, beforeEnter: ifNotAuthenticated},
    // {path: '/logout', component: Logout, beforeEnter: ifAuthenticated},
    {path: '/logout', component: Logout},
    {path: '/news/:page?', component: News, name: 'news'},
    {path: '/market', component: Market, name: 'market', beforeEnter: ifAuthenticated},
    {path: '/users', component: UserSearch, name: 'user-search', beforeEnter: ifAuthenticated},
    {path: '/user/info/:id', component: UserInfo, name: 'user-info'},
    {path: '/post/:id', name: 'post', component: Post, props: true },
  ]
})

new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App),
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  created() {
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    }
  },
})
