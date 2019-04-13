<template>
  <transition name="fade">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"
            :class="{disabled: prevPage < 1}">
          <span class="page-link" @click="reloadNews(prevPage)">Poprzedni</span>
        </li>
        <li v-if="prevPrevPage >= 1"
            class="page-item"
            @click="reloadNews(prevPrevPage)">
          <span class="page-link">{{prevPrevPage}}</span>
        </li>
        <li v-if="prevPage >= 1"
            class="page-item"
            @click="reloadNews(prevPage)">
          <span class="page-link">{{prevPage}}</span>
        </li>
        <li class="page-item active"
            @click="reloadNews(actualPage)">
          <span class="page-link">{{actualPage}}</span>
        </li>
        <li v-if="nextPage <= totalNrOfPages"
            class="page-item"
            @click="reloadNews(nextPage)">
          <span class="page-link">{{nextPage}}</span>
        </li>
        <li v-if="nextNextPage <= totalNrOfPages"
            class="page-item"
            @click="reloadNews(nextNextPage)">
          <span class="page-link">{{nextNextPage}}</span>
        </li>
        <li v-if="nextNextNextPage <= totalNrOfPages"
            class="page-item"
            @click="reloadNews(nextNextNextPage)">
          <span class="page-link">{{nextNextNextPage}}</span>
        </li>
        <li class="page-item" :class="{disabled: nextPage > totalNrOfPages}">
          <span class="page-link" @click="reloadNews(nextPage)">Następny</span>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import axios from 'axios'
import api from '../../../api/endpoints'
export default {
  props: ['resultsOnPage', 'timePeriod', 'active', 'lineId'],
  data () {
    return {
      actualPage: 1,
      totalNrOfPages: ''
    }
  },
  watch: {
    resultsOnPage: function () {
      this.reloadNews(1)
    },
    timePeriod: function () {
      this.reloadNews(1)
    },
    active: function () {
      this.reloadNews(1)
    },
    lineId: function () {
      this.reloadNews(1)
    }
  },
  mounted () {
    this.reloadNews(this.actualPage)
  },
  computed: {
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
    nextNextNextPage: function () {
      return this.actualPage + 3
    }
  },
  methods: {
    reloadNews: function (pageNumber) {
      this.actualPage = pageNumber
      let extraSettingsActive = ''
      let extraSettingsPeriod = ''
      let extraSettingLine = ''
      if (this.active !== '') {
        extraSettingsActive = '&type=' + this.active
      }
      if (this.timePeriod !== '') {
        extraSettingsPeriod = '&period=' + this.timePeriod
      }
      if (this.lineId !== '') {
        extraSettingLine = '&lineId=' + this.lineId
      }
      axios.get(`${api.BUS_RIDES}?page=${pageNumber - 1}&size=${this.resultsOnPage}${extraSettingsActive}${extraSettingsPeriod}${extraSettingLine}`)
        .then((response) => {
          this.totalNrOfPages = response.data.totalPages
          this.$emit('update-timetables', response.data)
        })
    }
  }
}
</script>
