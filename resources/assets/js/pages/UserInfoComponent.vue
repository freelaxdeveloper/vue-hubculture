<template>
  <b-container class="bv-example-row">

    <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>

    <b-row v-if="user">
      <b-col cols="12">
        <b-card border-variant="info"
          :header="`${user.name} (HubID #${user.id})`"
          align="left"
        >
        <b-row>
          <b-col cols="4">
            <img :src="user.picture.large" :alt="user.name">
          </b-col>
          <b-col cols="4">
            <b>Email:</b> {{ user.email }}
          </b-col>
        </b-row>
          <!-- <b-col cols="4">
            <b-card border-variant="info"
              header="Email"
              align="center"
            >
              <p class="card-text">ssss@mail.com</p>
            </b-card>
          </b-col>
        </b-card> -->
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: '',
      error: '',
    }
  },
  computed: {
    user_id: function () {
      return this.$route.params.id
    }
  },
  methods: {
    async fetchUser() {
      await axios.get('https://id.hubculture.com/user/' + this.user_id).then((response) => {
        this.user = response.data.data
      }).catch((error) => {
        this.error = error.response.data.errors[0]
      })
    }
  },
  created() {
    this.fetchUser()
  }
}
</script>
