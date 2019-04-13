<template>
  <div>
    <h5>Dodaj nowy przystanek</h5>
    <div class="row mt-4">
      <div class="col-4">
        <label for="busStopName">Nazwa przystanku</label>
      </div>
      <div class="col-6">
        <input type="text" class="form-control form-control-sm" id="busStopName"
               name="busStopName"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('busStopName')}"
               v-model="busStop.name"
               data-vv-as="nazwę przystanku">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('busStopName')"
                class="invalid-feedback">{{ errors.first('busStopName') }}</span>
        </transition>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-4">
        <label for="busStopCity">Miasto</label>
      </div>
      <div class="col-6">
        <input type="text" class="form-control form-control-sm" id="busStopCity"
               name="busStopCity"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('busStopCity')}"
               v-model="busStop.city"
               data-vv-as="miasto">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('busStopCity')"
                class="invalid-feedback">{{ errors.first('busStopCity') }}</span>
        </transition>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-4">
        <label for="busStopLatitude">Szerokość geograficzna</label>
      </div>
      <div class="col-6">
        <input type="text" class="form-control form-control-sm" id="busStopLatitude"
               name="busStopLatitude"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('busStopLatitude')}"
               v-model="busStop.latitude"
               data-vv-as="szerokość geograficzną">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('busStopLatitude')"
                class="invalid-feedback">{{ errors.first('busStopLatitude') }}</span>
        </transition>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-4">
        <label for="busStopLongitude">Długość geograficzna</label>
      </div>
      <div class="col-6">
        <input type="text" class="form-control form-control-sm" id="busStopLongitude"
               name="busStopLongitude"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('busStopLongitude')}"
               v-model="busStop.longitude"
               data-vv-as="długość geograficzną">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('busStopLongitude')"
                class="invalid-feedback">{{ errors.first('busStopLongitude') }}</span>
        </transition>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-4">
        <label for="busStopAddress">Adres</label>
      </div>
      <div class="col-6">
        <input type="text" class="form-control form-control-sm" id="busStopAddress"
               name="busStopAddress"
               v-model="busStop.address"
               data-vv-as="adres">
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <button type="button" id="registerBusButton" class="btn btn-outline-success"
                @click="validateAndSend">Dodaj
          przystanek
        </button>
      </div>
    </div>
    <h5 class="mt-2">Wszystkie przystanki</h5>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Miasto</th>
        <th scope="col">Nazwa przystanku</th>
        <th scope="col">Adres</th>
        <th scope="col">Szerokość geo.</th>
        <th scope="col">Długość geo.</th>
        <th scope="col">Usuń</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="busStop in busStops" v-bind:key="busStop.id">
        <th scope="row">{{busStop.id}}</th>
        <td>{{busStop.city}}</td>
        <td>{{busStop.name}}</td>
        <td>{{busStop.address}}</td>
        <td>{{busStop.latitude}}</td>
        <td>{{busStop.longitude}}</td>
        <td>
          <button class="btn btn-outline-danger"
                  @click="ensureDeletingBusStop(busStopToString(busStop), busStop.id)">
            Usuń
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import API from '../../../api/endpoints'
import swal from 'sweetalert'

export default {
  data () {
    return {
      busStop: {
        city: '',
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      },
      busStops: []
    }
  },
  methods: {
    clearInput () {
      this.busStop = {
        city: '',
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      }
    },
    getBusStops () {
      this.$http.get(API.BUS_STOPS)
        .then(res => { this.busStops = res.data })
    },
    validateAndSend () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.addBusStop(this.busStop)
          }
        })
    },
    addBusStop (data) {
      this.$store.dispatch('createNewBusStop', data)
        .then(() => {
          this.getBusStops()
          swal('Dodano przystanek', {icon: 'success'})
          this.clearInput()
          this.$validator.reset()
        }, () => {
          swal('Wystąpił błąd', 'Skontaktuj się z administratorem', 'error')
        })
    },
    deleteBusStopById (id) {
      this.$store.dispatch('deleteBusStopById', id)
        .then(() => {
          swal('Usunięto przystanek', {icon: 'success'})
          this.getBusStops()
        }, (error) => {
          if (error.response.status === 409) {
            swal('Wystąpił błąd', 'Próbujesz usunąć przystanek który jest wykorzystywany', 'error')
          } else {
            swal('Wystąpił błąd', 'Skontaktuj się z administratorem', 'error')
          }
        })
    },
    busStopToString: (busStop) => {
      return busStop.city + ' ' + busStop.name + ' ' + busStop.address
    },
    ensureDeletingBusStop (busStop, id) {
      swal({
        title: 'Czy jesteś pewny?',
        text: 'Próbujesz usunąć przystanek: ' + busStop + '?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteBusStopById(id)
          } else {
            swal('Przystanek został zachowany')
          }
        })
    }
  },
  mounted () {
    this.getBusStops()
  }
}
</script>
