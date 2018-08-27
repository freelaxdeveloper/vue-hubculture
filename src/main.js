import Vue from 'vue'
import App from './App.vue'
import { EventBus } from './event-bus.js'

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


var token = localStorage.getItem('user-token')

EventBus.$on('user-token', token => {
  localStorage.setItem('user-token', token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
});

EventBus.$on('user-logout', () => {
  localStorage.clear()
  delete axios.defaults.headers.common['Authorization']
});


axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
axios.defaults.headers.common['Private-Key'] = 'private_5d265de1d9204f6235830ce2'
axios.defaults.headers.common['Public-Key'] = 'public_153222247f4cbe2511208120a'

var router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    // {path: '/logout', component: Logout, beforeEnter: ifAuthenticated},
    {path: '/logout', component: Logout},
    {path: '/news/:page?', component: News, name: 'news'},
    {path: '/market', component: Market, name: 'market'},
    {path: '/users', component: UserSearch, name: 'user-search'},
    {path: '/user/info/:id', component: UserInfo, name: 'user-info'},
    {path: '/post/:id', name: 'post', component: Post, props: true },
  ]
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
