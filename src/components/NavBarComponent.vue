<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">HubCulture</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#/" :class="{active: routeCurrent.path == '/'}">Home </b-nav-item>
          <b-nav-item href="#/news" :class="{active: routeCurrent.name == 'news'}">News</b-nav-item>
          <b-nav-item href="#/market" :class="{active: routeCurrent.path == '/market'}">Market</b-nav-item>
          <b-nav-item href="#/users" :class="{active: routeCurrent.path == '/users'}">Users</b-nav-item>
          <b-nav-item href="#/menu" :class="{active: routeCurrent.path == '/menu'}">Menu</b-nav-item>
          <b-nav-item href="#/chart" :class="{active: routeCurrent.path == '/chart'}">Chart</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right v-if="user">
            <template slot="button-content">
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item href="#/logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-else>
            <template slot="button-content">
              <em>Гость</em>
            </template>
            <b-dropdown-item href="#/login">Login</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>
<style scoped>
  .active{
    background-color: rgba(24, 138, 156, 0.44);
  }
</style>

<script>

export default {
  data() {
    return {
      routeCurrent: this.$router.currentRoute
    }
  },
  watch: {
    '$route': 'setCurentRoute'
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    setCurentRoute() {
      this.routeCurrent = this.$router.currentRoute
    }
  },
}
</script>
