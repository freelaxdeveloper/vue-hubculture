<template>
  <b-container class="bv-example-row">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <div v-html="mutatedNews.content"></div>
  </b-container>
</template>

<script>
export default {
  props: [
    'news', 'id', 'page'
  ],
  data() {
    return {
      postId: {
        type: Number,
        default: 0
      },
      mutatedNews: {
        title: this.news ? this.news.title : '',
        content: this.news ? this.news.content : ''
      }
    }
  },
  computed: {
    breadcrumbs: function () {
      return [{
        text: 'Home',
        href: '#/'
      }, {
        text: 'News',
        href: '#/news/' + this.page
      }, {
        text: this.mutatedNews.title,
        active: true
      }]
    },
  },
  mounted() {
    document.title = this.mutatedNews.title
  },
  created() {
    this.postId = this.$route.params.id
  }
}
</script>
