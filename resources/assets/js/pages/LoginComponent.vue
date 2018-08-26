<template>
  <div>
    <b-container class="bv-example-row">
      <b-form inline @submit.prevent="onSubmit">
        <label class="sr-only" for="inlineFormInputName2">Name</label>
        <b-input type="email" v-model="form.email" class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Email"></b-input>
        <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input type="password" v-model="form.password" id="inlineFormInputGroupUsername2" placeholder="Password"></b-input>
        </b-input-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../event-bus.js';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async onSubmit() {
      var options = {
          email: this.form.email,
          password: this.form.password,
      }
      await axios.post('https://id.hubculture.com/auth', options).then((response) => {

        var token = response.data.data.token
        EventBus.$emit('user-token', token)

        axios.get('https://id.hubculture.com/user', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
          localStorage.setItem('user-data', JSON.stringify(response.data.data))
          EventBus.$emit('user-data', JSON.stringify(response.data.data));
          this.form = {email: '', password: ''}
          this.$router.go(-1)
        }).catch((error) => {
          // console.log('auth error, remove the token')
        })

        // this.$router.push('/')

      }).catch(function (error) {

      })
    }
  },
  mounted() {

  }
}
</script>
