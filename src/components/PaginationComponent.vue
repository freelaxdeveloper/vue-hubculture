<template>
  <div class="pagination">
    <div class="pagination__left"><router-link v-if="hasPrev()" :to="{ name: 'news', params: {page: prevPage} }">Следующая</router-link></div>
    <div class="pagination__mid">
      <ul>
        <li v-if="hasFirst()"><router-link :to="{ name: 'news', params: {page: 1} }">1</router-link></li>
        <li v-if="hasFirst()">...</li>
        <li v-for="(page, index) in pages" :key="index">
          <router-link :class="{ current: current == page }" :to="{ name: 'news', params: {page: page} }">
            {{ page }}
          </router-link>
        </li>
        <li v-if="hasLast()">...</li>
        <li v-if="hasLast()"><router-link :to="{ name: 'news', params: {page: totalPages} }">{{ totalPages }}</router-link></li>
      </ul>
    </div>
    <div class="pagination__right"><router-link v-if="hasNext()" :to="{ name: 'news', params: {page: nextPage} }">Следующая</router-link></div>
  </div>
</template>

<script>

export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }, 
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2
    }
  },
  computed: {
    pages: function () {
      var pages = []

      for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },
    rangeStart: function () {
      var start = this.current - this.pageRange

      return (start > 0) ? start : 1
    },
    rangeEnd: function () {
      var end = this.current + this.pageRange

      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages: function () {
      return Math.ceil(this.total/this.perPage)
    },
    nextPage: function() {
      return this.current + 1
    },
    prevPage: function () {
      return this.current - 1
    }
  },
  mounted() {
    // console.log('page mounted', this.current)
  },
  methods: {
    hasFirst: function () {
      return this.rangeStart !== 1
    },
    hasLast: function () {
      return this.rangeEnd < this.totalPages
    },
    hasPrev: function () {
      return this.current > 1
    },
    hasNext: function () {
      return this.current < this.totalPages
    },
  }  
}
</script>
