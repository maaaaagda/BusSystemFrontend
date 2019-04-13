<template>
  <div class=" d-flex justify-content-center ">
    <div class="container mx-5">
      <div class="mt-4 mb-4">
        <h5 class="mb-5">Wybierz linię, aby zobaczyć więcej</h5>
        <div v-if="busLineLoaded" class="container d-flex justify-content-around flex-wrap" id="allBusLines">
          <p v-for="busLine in busLines" v-bind:key="busLine.id">
            <bus-line-info :busLine="busLine"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API from '../../api/endpoints'
import busLineInfo from './BusLineInfoBox'
export default {
  components: {
    busLineInfo
  },
  data () {
    return {
      busLineLoaded: false,
      busLines: []
    }
  },
  methods: {
    getLines () {
      this.$store.dispatch('setLoadingSpinner')
      axios.get(API.BUS_LINES)
        .then((response) => {
          this.$store.dispatch('unsetLoadingSpinner')
          this.busLineLoaded = true
          this.busLines = response.data
        })
    }
  },
  mounted () {
    this.getLines()
  }
}
</script>
