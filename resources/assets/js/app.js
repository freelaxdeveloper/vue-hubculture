window.Vue = require('./lib/vue.lib')
import { EventBus } from './event-bus.js';

import BootstrapVue from 'bootstrap-vue'
var VueRouter = require('vue-router')

Vue.use(VueRouter)
Vue.use(BootstrapVue);

var News = require('./pages/NewsComponent.vue')
var Post = require('./pages/PostComponent.vue')
var Home = require('./pages/HomeComponent.vue')
var Market = require('./pages/MarketComponent.vue')
var Login = require('./pages/LoginComponent.vue')
var Logout = require('./pages/LogoutComponent.vue')
var UserSearch = require('./pages/UserSearchComponent.vue')
var UserInfo = require('./pages/UserInfoComponent.vue')

Vue.component('nav-bar', require('./components/NavBarComponent.vue'))

import axios from 'axios'


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
axios.defaults.headers.common['Private-Key'] = '***'
axios.defaults.headers.common['Public-Key'] = '***'

// const ifAuthenticated = (to, from, next) => {
//   if (true) {
//     next()
//     return
//   }
//   next('/login')
// }
// const ifNotAuthenticated = (to, from, next) => {
//   if (!token) {
//     next()
//     return
//   }
//   next('/')
// }

var router = new VueRouter({
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
})