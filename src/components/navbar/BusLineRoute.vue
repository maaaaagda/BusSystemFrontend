<template>
  <div class=" d-flex justify-content-center ">
    <div class="container mx-5">
      <div class="row mt-4" v-if="busLineLoaded">
        <div class="col-9 mb-3">
          <h5>Linia nr {{busLine.name}} {{busLine.from.city}} <i class="fas fa-long-arrow-alt-right"></i> {{busLine.to.city}} </h5>
        </div>
        <div class="col-3">
          <router-link to="/bus-lines">
            <button type="button" class="btn btn-outline-success btn-sm">
              Pokaż wszystkie linie
            </button>
          </router-link>
        </div>
      </div>
      <div v-if="busStopsLoaded" class="row container mr-0 pr-0" v-for="busStop in busStopsInRoute" v-bind:key="busStop.id">
        <div class="col-9 row">
          <div class="busStop mr-2"/>
          <p class=" align-self-center mb-0">
            {{busStop.busStop.city}}, {{busStop.busStop.name}}
          </p>
        </div>
        <div class="col-3 ml-auto">
          <p class="mb-0 text-center">
            Czas: {{busStop.driveTime}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../api/endpoints'
export default {
  data () {
    return {
      lineId: null,
      busLine: {},
      busStopsInRoute: [],
      busLineLoaded: false,
      busStopsLoaded: false
    }
  },
  methods: {
    getBusLine (id) {
      axios.get(`${api.BUS_LINES}/${id}`)
        .then((response) => {
          this.busLine = response.data
          this.busLineLoaded = true
        })
    },
    getBusStopsInRoute (id) {
      this.$store.dispatch('setLoadingSpinner')
      axios.get(`${api.BUS_LINES}/${id}/all-routes`)
        .then((response) => {
          this.$store.dispatch('unsetLoadingSpinner')
          this.busStopsInRoute = response.data
          this.busStopsLoaded = true
        })
    }
  },
  created () {
    this.lineId = this.$route.params.id
  },
  mounted () {
    this.getBusLine(this.lineId)
    this.getBusStopsInRoute(this.lineId)
  }
}
</script>

<style>
  .busStop {
    background-image: url('../../../static/images/busStopIcon.png');
    background-repeat: no-repeat;
    background-size: 25px 100%;
    min-height: 50px;
    width: 25px;
  }
</style>
