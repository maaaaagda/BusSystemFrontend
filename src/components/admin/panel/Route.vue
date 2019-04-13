<template>
  <div>
    <router-link to="/admin/buslines">
      <p class="go-back">
        Pokaż wszystkie linie
      </p>
    </router-link>
    <div class="row mt-4 ml-1">
      <h5>
        Dodaj przystanek do trasy tej linii
      </h5>
    </div>
    <div class="row mt-4">
      <div class="col-5">
        <label for="busStopInput">Przystanek </label>
        <select class="custom-select form-control form-control-sm" id="busStopInput"
                name="busStop"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('busStop')}"
                v-model="busStopToRoute.busStopId"
                data-vv-as="przystanek">
          <option v-for="busStop in allBusStops" v-bind:key="busStop.id" v-bind:value="busStop.id">
            {{busStop.city}}, {{busStop.name}}
          </option>
        </select>
        <span v-show="errors.has('busStop')"
              class="invalid-feedback">{{ errors.first('busStop') }}</span>
      </div>
      <div class="col-3 offset-1">
        <label for="sequenceInput">Pozycja na trasie </label>
        <input type="number" class="form-control form-control-sm" id="sequenceInput"
               name="sequenceInput"
               v-validate="'required|decimal'"
               min="0"
               :class="{'is-invalid': errors.has('sequenceInput')}"
               v-model.number="busStopToRoute.sequence"
               data-vv-as="pozycję na trasie">
        <span v-show="errors.has('sequenceInput')"
              class="invalid-feedback">{{ errors.first('sequenceInput') }}</span>
      </div>
      <div class="col-3">
        <label for="driveTimeInput">Czas przejazdu </label>
        <input type="number" min="0" class="form-control form-control-sm" id="driveTimeInput"
               name="driveTimeInput"
               v-validate="'required|decimal'"
               :class="{'is-invalid': errors.has('driveTimeInput')}"
               v-model.number="busStopToRoute.driveTime"
               data-vv-as="czas przejazdu">
        <span v-show="errors.has('driveTimeInput')"
              class="invalid-feedback">{{ errors.first('driveTimeInput') }}</span>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <button type="button" id="registerBusButton" class="btn btn-outline-success" @click="validateForm">
          Dodaj przystanek do trasy
        </button>
      </div>
    </div>
    <div class="row mt-4" v-if="busLineLoaded">
      <div class="mb-3">
        <h5>Linia nr {{busLine.name}} {{busLine.from.city}} <i class="fas fa-long-arrow-alt-right"></i> {{busLine.to.city}} </h5>
      </div>
    </div>
    <div v-if="busStopsLoaded" class="row container" v-for="busStop in busStopsInRoute" v-bind:key="busStop.id">
      <div class="busStop"/>
      <p class="col-7 align-self-center mb-0">
        {{busStop.busStop.city}}, {{busStop.busStop.name}}
      </p>
      <p class="col-2 align-self-center mb-0">
        Czas: {{busStop.driveTime}}
      </p>
      <button class="btn btn-outline-danger btn-sm col-2 align-self-center" @click="ensureDeletingBusStopFromRoute(busStop.id)">
        Usuń z trasy
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../../api/endpoints'
import codes from '../../../api/rest-error-codes'
import swal from 'sweetalert'

export default {
  data () {
    return {
      lineId: null,
      busStopsInRoute: [],
      busLine: {},
      busStopToRoute: {
        busStopId: '',
        sequence: '',
        driveTime: ''
      },
      allBusStops: [],
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
      axios.get(`${api.BUS_LINES}/${id}/routes`)
        .then((response) => {
          this.busStopsInRoute = response.data
          this.busStopsLoaded = true
        })
    },
    getAllLeftStops (id) {
      this.$http.get(`${api.BUS_LINES}/${id}/leftStops`)
        .then(res => { this.allBusStops = res.data })
    },
    addBusStopToRoute (busStop, id) {
      let data = {
        busStop: busStop,
        id: id
      }
      this.$store.dispatch('addBusStopToRoute', data)
        .then((response) => {
          swal('Dodano przystanek do trasy!', {icon: 'success'})
          this.resetInputs()
          this.getBusStopsInRoute(this.lineId)
          this.getAllLeftStops(this.lineId)
        })
        .catch((error) => {
          if (error.response.data.status === codes.INVALID_DRIVE_TIME) {
            swal('Oops', 'Nieprawidłowa wartość czasu przejazdu', 'error')
          } else if (error.response.data.status === codes.DRIVE_TIME_LESS_THAN_0) {
            swal('Oops', 'Wartość czasu przejazdu nie może być ujemna!', 'error')
          } else if (error.response.data.status === codes.ROUTE_SEQUENCE_GREATER_THAN_CAN_BE) {
            swal('Oops', 'Niewłaściwa wartość pozycji! ', 'error')
          } else if (error.response.data.status === codes.ROUTE_SEQUENCE_LESS_THAN_2) {
            swal('Oops', 'Wartość pozycji nie może być mniejsza od 2', 'error')
          } else {
            swal('Oops', 'Coś poszło nie tak...', 'error')
          }
        })
    },
    deleteBusStopFromRoute (busStopId, lineId) {
      let data = {
        busStopId: busStopId,
        lineId: lineId
      }
      this.$store.dispatch('deleteBusStopFromRoute', data)
        .then(res => {
          this.getBusStopsInRoute(lineId)
          swal('Usunięto', {
            icon: 'success'
          })
          this.getAllLeftStops(lineId)
        })
        .catch(() => {
          swal('Oops', 'Coś poszło nie tak...', 'error')
        })
    },
    ensureDeletingBusStopFromRoute (busStopId) {
      swal({
        text: `Czy na pewno chcesz usunąć przystanek o nr ${busStopId} z bazy?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteBusStopFromRoute(busStopId, this.lineId)
          }
        })
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.addBusStopToRoute(this.busStopToRoute, this.lineId)
          }
        })
    },
    resetInputs () {
      this.busStopToRoute = {
        busStopId: '',
        sequence: '',
        driveTime: ''
      }
      this.$validator.reset()
    }
  },
  created () {
    this.lineId = this.$route.params.id
  },
  mounted () {
    this.getBusLine(this.lineId)
    this.getBusStopsInRoute(this.lineId)
    this.getAllLeftStops(this.lineId)
  }
}
</script>
<style>
  .busStop {
    background-image: url('../../../../static/images/busStopIcon.png');
    background-repeat: no-repeat;
    background-size: 25px 100%;
    min-height: 50px;
    width: 25px;
  }
  .go-back {
    color: green;
    text-decoration: underline;
  }
</style>
