<template>
  <transition name="fade">

  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: prevPage < 1}">
        <router-link @click.native="reloadNews(prevPage)"
          class="page-link" :to="'/news/' + prevPage">Previous</router-link>
      </li>
      <li v-if="prevPrevPage >= 1" class="page-item">
        <router-link @click.native="reloadNews(prevPrevPage)"
                     class="page-link" :to="'/news/' + prevPrevPage">{{prevPrevPage}}</router-link>
      </li>
      <li v-if="prevPage >= 1" class="page-item">
        <router-link @click.native="reloadNews(prevPage)"
          class="page-link" :to="'/news/' + prevPage">{{prevPage}}</router-link>
      </li>
      <li class="page-item active">
        <router-link @click.native="reloadNews(actualPage)"
                     class="page-link" :to="'/news/' + actualPage">{{actualPage}}</router-link>
      </li>
      <li v-if="nextPage <= getTotalNewsPages" class="page-item">
        <router-link @click.native="reloadNews(nextPage)"
          class="page-link" :to="'/news/' + nextPage">{{nextPage}}</router-link>
      </li>
      <li v-if="nextNextPage <= getTotalNewsPages" class="page-item">
        <router-link @click.native="reloadNews(nextNextPage)"
          class="page-link" :to="'/news/' + nextNextPage">{{nextNextPage}}</router-link>
      </li>
      <li v-if="NNNPage <= getTotalNewsPages" class="page-item">
        <router-link @click.native="reloadNews(NNNPage)"
          class="page-link" :to="'/news/' + NNNPage">{{NNNPage}}</router-link>
      </li>
      <li class="page-item" :class="{disabled: nextPage > getTotalNewsPages}">
        <router-link @click.native="reloadNews(nextPage)"
          class="page-link" :to="'/news/' + nextPage">Next</router-link>
      </li>
    </ul>
  </nav>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      actualPage: 1
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.actualPage = parseInt(this.$route.params.id)
    } else {
      this.actualPage = 1
    }
  },
  computed: {
    ...mapGetters(['getTotalNewsPages']),
    prevPrevPage: function () {
      return this.actualPage - 2
    },
    prevPage: function () {
      return this.actualPage - 1
    },
    nextPage: function () {
      return this.actualPage + 1
    },
    nextNextPage: function () {
      return this.actualPage + 2
    },
    NNNPage: function () {
      return this.actualPage + 3
    }
  },
  methods: {
    reloadNews: function (pageNumber) {
      this.$store.dispatch('unSetNewsLoaded')
      this.$store.dispatch('getNews', { page: pageNumber - 1, size: 3 })
      this.actualPage = pageNumber
    }
  }
}
</script>
