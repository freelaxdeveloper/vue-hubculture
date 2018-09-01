<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>

    <div v-if="!loaded" class="loaded">Loading...</div>

    <pagination 
      :current="currentPage" 
      :total="totalNews"
      :per-page="perPage"
    ></pagination>

    <section class="grid">
      
        <div class="grid__item card" v-for="(newsone, index) in news" :key="index">
        <div class="card__head">
          {{ newsone.title }}
        </div>
        <div class="card__body">
          <router-link :to="{ name: 'post', params: {id: newsone.id, news: newsone, page: currentPage} }">
            <img :src="newsone.thumb.full" :alt="newsone.title" :title="newsone.title">
          </router-link>
        </div>
        <div class="card__footer media">
          <img :src="newsone.user.picture.large" alt="" class="media__obj">
          <div class="media__body">
              <a href="#">{{ newsone.user.name }}</a>
            </div>
        </div>
      </div>
    </section>
    <pagination 
      :current="currentPage" 
      :total="totalNews"
      :per-page="perPage"
    ></pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import lodash from 'lodash'

Vue.component('pagination', require('../components/PaginationComponent.vue').default);

export default {
  data() {
    return {
      photos: [],
      news: [],
      totalPhotos: 0,
      totalNews: 0,
      perPage: 9,
      currentPage: 1,
      loaded: false,
    }
  },
  computed: {
    items: function () {
      return [{
        text: 'Home',
        href: '/#/'
      }, {
        text: 'News (page ' + this.currentPage + ')',
        active: true
      }]
    },
  },
  watch: {
    '$route': 'fetchNews'
  },
  methods: {
    fetchNews(page) {
      this.loaded = false
      page = this.$route.params.page ? parseInt(this.$route.params.page) : 1
      var options = {
        params: {
          offset: (page !== 1) ? page * this.perPage - this.perPage : page,
          limit: this.perPage
        }
      }

      axios.get('/articles/group/0/news', options).then((response) => {

        // this.news = lodash._.shuffle(response.data.data.items)
        this.news = response.data.data.items
        this.totalNews = parseInt(response.data.data.total)
        this.currentPage = page
        this.loaded = true

      }).then(function (error) {

      })
    },
  },
  mounted() {
    // console.log('current page ', this.$route)
  },
  created: function() {
    this.fetchNews(this.currentPage)
  }  
}
</script>
