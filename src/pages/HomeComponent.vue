<template>
  <div>
    <div class="marquee">
      <span class="parent">
        <span v-for="(market, index) in markets" :key="index" @click="pushMyMarket(market, index)">
          {{ market.currency }}: {{ market.rate }}
        </span>
      </span>
    </div>

    <b-container class="bv-example-row">
      <transition-group name="list" tag="div">
        <span v-for="(market, index) in currencies" :key="index" class="list-item">
          {{ market.currency }}: {{ market.rate }}
        </span>
      </transition-group>
    </b-container>

    <section class="grid">
      <div class="grid__item card" v-for="(newsone, index) in news" :key="index">
      <div class="card__head">
        {{ newsone.title }}
      </div>
      <div class="card__body">
        <router-link :to="{ name: 'post', params: {id: newsone.id, news: newsone, page: 1} }">
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

  </div>
</template>

<script>
import lodash from 'lodash'
import axios from 'axios'

export default {
  data() {
    return {
      errors: [],
      markets: [],
    }
  },
  computed: {
    news() {
      return this.$store.state.news
    },
    currencies() {
      return this.$store.state.currencies
    },
  },
  methods: {
    pushMyMarket(market, index) {
      if (this.currencies[index]) {
        return
      }
      this.$store.dispatch('addCurrency', market)
    },
    fetchMarket() {
      axios.get('/markets').then((response) => {

        this.markets = response.data.data

      }).catch((error) => {
        this.errors = Object.values(error.response.data)
      })
    },
    fetchNews() {
      var options = {
        params: {offset: 0, limit: 3}
      }
      axios.get('/articles/group/0/news', options).then((response) => {
        this.$store.dispatch('setNews', response.data.data.items)
      }).then(function (error) {

      })
    },
  },
  created() {
    this.fetchMarket();
    this.fetchNews();
  }
}
</script>


<style scoped>
  .marquee{
    width:100%;
    white-space:nowrap;
    overflow:hidden;
    margin-top: 2px;
  }
  
  .marquee .parent {
    color:#716c6c;
    font-size:16px;
    display:inline-block;
    padding-left:100%;
    -webkit-animation: marquee 70s infinite linear;
    animation: marquee 70s infinite linear;
  }
  .parent span {
    cursor: pointer;
    border: 1px solid #ddd;
    margin-right: 5px;
    padding: 3px;
  }
  
  @-webkit-keyframes marquee {
    0%{-webkit-transform: translate(0, 0);}
    100%{-webkit-transform: translate(-100%, 0);}
  }
  @keyframes marquee{
    0%{transform: translate(0, 0);}
    100%{transform: translate(-100%, 0)}
  }
  .list-item {
    display: block;
  }
 .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
