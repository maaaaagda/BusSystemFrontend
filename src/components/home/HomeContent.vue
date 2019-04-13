<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 px-2">
        <transition name="fade">
          <div  v-if="newsLoaded">
          <single-news-component v-for="item in news" v-bind:key="item.id"
            :title="item.title" :newsBody="item.body" :newsDateTime="item.dateTime"></single-news-component>
          </div>
        </transition>
        <pagination-component></pagination-component>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 px-2">
        <right-info-pane></right-info-pane>
      </div>
    </div>
  </div>
</template>

<script>
import SingleNewsComponent from './SingleNews'
import RightInfoPane from './HomeRightInfoPanel'
import {mapGetters} from 'vuex'
import PaginationComponent from './PaginationPanel'

export default {
  data () {
    return {
    }
  },
  components: {
    singleNewsComponent: SingleNewsComponent,
    rightInfoPane: RightInfoPane,
    paginationComponent: PaginationComponent
  },
  computed: {
    ...mapGetters(['news', 'newsLoaded']),
    actualPage: function () {
      if (this.$route.params.id) {
        return parseInt(this.$route.params.id)
      } else {
        return 1
      }
    }
  },
  created () {
    this.$store.dispatch('getNews', {page: 0, size: 3})
  }
}
</script>

<style scoped>
</style>
