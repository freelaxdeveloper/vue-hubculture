<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../event-bus.js';

export default {
  methods: {
    logout() {
      EventBus.$emit('user-logout')
      this.$router.go(-1)
    }
  },
  created() {
    this.logout()
  }
}
</script>
