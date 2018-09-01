<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.go(-1)
    }
  },
  created() {
    this.logout()
  }
}
</script>
