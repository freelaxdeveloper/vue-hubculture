<template>
  <div>
    <b-container class="bv-example-row">

      <div class="alert alert-danger" v-show="errors.length">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
      </div>
      <b-list-group>
        <b-row>
          <b-col cols="12" sm="6" md="4" v-for="(market, index) in markets" :key="index" class="margin">
            <b-list-group-item>
              {{ market.currency }}: {{ market.rate }}
            </b-list-group-item>
          </b-col>
        </b-row>
      </b-list-group>
    </b-container>
  </div>
</template>
<style>
  .margin {
    margin-top: 3px;
  }
  .btn {
    margin: 5px;
  }
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      errors: [],
      markets: Object,
      attemptsRewriteToken: 5,
    }
  },
  methods: {
    fetchMarket() {
      axios.get('https://id.hubculture.com/markets').then((response) => {

        this.markets = response.data.data

      }).catch((error) => {
        this.errors = Object.values(error.response.data)
        
        // if (401 == error.response.status && this.attemptsRewriteToken > 0) {
        //   axios.put('https://id.hubculture.com/token').then((response) => {
        //     console.log('token refresh', response.data)
        //     // EventBus.$emit('user-token', response.data.data.token)
        //     this.errors = []
        //     this.fetchMarket()
        //     --this.attemptsRewriteToken
        //   })
        // }
      })
    }
  },
  created() {
    this.fetchMarket();
    console.log(this.$router.currentRoute)
  }
}
</script>
