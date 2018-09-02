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
            <b-col col lg="4">
              <img :src="user.picture.large" :alt="user.name">
            </b-col>
            <b-col col lg="4">
              <b>Email:</b> {{ user.email }}
            </b-col>
          </b-row>
        </b-card>
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
    fetchUser() {
      axios.get('/user/' + this.user_id).then((response) => {
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
