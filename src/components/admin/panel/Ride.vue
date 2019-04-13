<template>
  <div>
    <div class="row">
      <div class="col-8">
        <h4 class='mb-3'>Przejazd nr {{ride.id}}</h4>
      </div>
      <div class="col-4">
        <router-link to="/admin/busrides">
          <p class="go-back">
            Pokaż wszystkie przejazdy
          </p>
        </router-link>
      </div>
    </div>
    <div class="row w-100 my-3">
      <div class="col-12">
        <h5> Linia {{ride.busLine.name}} {{ride.busLine.from.city}} -> {{ride.busLine.to.city}} </h5>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-6">
        <p><b>Wyjazd:</b> {{formatIsoTime(ride.startDateTime)}}</p>
      </div>
      <div class="col-6">
        <p><b>Powrót:</b> {{formatIsoTime(ride.endDateTime)}}</p>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-6">
        <div class="form-group">
          <label for="primaryDriver">Kierowca podstawowy </label>
          <select id="primaryDriver" v-model.number="primaryDriver" :disabled="disabledOthers"
                  class="form-control form-control-sm">
            <option disabled value="">Wybierz kierowcę</option>
            <option v-for="driver in drivers" v-bind:key="driver.id" v-bind:value="driver.id">
              {{driver.name}} {{driver.surname}} {{driver.email}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="secondaryDriver">Kierowca zastępczy </label>
          <select id="secondaryDriver" v-model.number="secondaryDriver" :disabled="disabledOthers"
                  class="form-control form-control-sm">
            <option disabled value="">Wybierz kierowcę</option>
            <option v-if="driver.id !== primaryDriver" v-for="driver in drivers" v-bind:key="driver.id" v-bind:value="driver.id">
              {{driver.name}} {{driver.surname}} {{driver.email}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-6">
        <div class="form-group">
          <label for="bus">Autobus</label>
          <select id="bus" v-model.number="bus" :disabled="disabledOthers"
                  class="form-control form-control-sm">
            <option disabled value="">Wybierz autobus</option>
            <option v-for="bus in buses" v-bind:key="bus.id" v-bind:value="bus.id">
              {{bus.registrationNumber}} {{bus.brand}} {{bus.model}} miejsc: {{bus.seats}}
            </option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <div class="form-group">
          <label for="price">Cena w zł</label>
          <input type="number" min="0" class="form-control form-control-sm" id="price"
                 name="ridePrice" :disabled="disabledOthers"
                 v-validate="'decimal'"
                 :class="{'is-invalid': errors.has('ridePrice')}"
                 v-model.number="ridePrice"
                 data-vv-as="cenę przejazdu">
          <transition enter-active-class="animated fadeIn">
        <span v-show="errors.has('ridePrice')"
              class="invalid-feedback">{{ errors.first('ridePrice') }}</span>
          </transition>
        </div>
      </div>
      <div class="col-3 text-center">
        <div class="form-check">
          <label for="active">Aktywny?</label>
          <div>
            <input id="active" v-model="active" type="checkbox"
                   :disabled="activeCheckboxDisabled" /></div>
        </div>
      </div>
    </div>
    <div v-if="!disabledOthers" class="row d-flex justify-content-center">
      <button class="btn btn-outline-success" @click="validateForm">
        Zapisz nowe ustawienia
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import api from '../../../api/endpoints'
import swal from 'sweetalert'

export default {
  props: ['ride'],
  data () {
    return {
      primaryDriver: null,
      secondaryDriver: null,
      ridePrice: null,
      bus: null,
      active: false,
      drivers: [],
      buses: [],
      activeCheckboxDisabled: true,
      disabledOthers: true
    }
  },
  watch: {
    primaryDriver: function (val) {
      this.activeCheckboxDisabled = this.disabledOthers || !(val !== '' && this.secondaryDriver !== '' && this.bus !== '')
    },
    secondaryDriver: function (val) {
      this.activeCheckboxDisabled = this.disabledOthers || !(val !== '' && this.primaryDriver !== null && this.bus !== '')
    },
    bus: function (val) {
      this.activeCheckboxDisabled = this.disabledOthers || !(val !== '' && this.secondaryDriver !== null && this.primaryDriver !== '')
    }
  },
  computed: {
    rideData: function () {
      return {
        primaryDriver: this.primaryDriver === '' ? null : this.primaryDriver,
        secondaryDriver: this.secondaryDriver === '' ? null : this.secondaryDriver,
        driveNettoPrice: this.ridePrice,
        bus: this.bus === '' ? null : this.bus,
        active: this.active
      }
    }
  },
  methods: {
    getDrivers () {
      axios.get(`${api.USERS}?type=driver`)
        .then((response) => {
          this.drivers = response.data
        })
    },
    getBuses () {
      axios.get(api.BUSES)
        .then((response) => {
          this.buses = response.data
        })
    },
    formatIsoTime (time) {
      let readableDate = moment(time, moment.ISO_8601).format('DD-MM-YYYY')
      let readableTime = moment(time, moment.ISO_8601).format('HH:mm')
      return readableDate + ' ' + readableTime
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.ensureUpdatingRide()
          }
        })
    },
    ensureUpdatingRide () {
      swal({
        text: `Czy na pewno chcesz zaktualizować ten przejazd?`,
        icon: 'warning',
        buttons: true
      })
        .then((willSave) => {
          if (willSave) {
            this.$store.dispatch('updateRide', {rideData: this.rideData, rideId: this.ride.id})
              .then(() => {
                swal('Przejazd został zaktualizowany!', {
                  icon: 'success'
                })
                this.$router.push({path: '/admin/busrides'})
              })
              .catch(() => {
                swal('Oops', 'Coś poszło nie tak...', 'error')
              })
          }
        })
    },
    bindSelects () {
      this.primaryDriver = this.ride.primaryDriver == null ? '' : this.ride.primaryDriver.id
      this.secondaryDriver = this.ride.secondaryDriver == null ? '' : this.ride.secondaryDriver.id
      this.bus = this.ride.bus == null ? '' : this.ride.bus.id
      this.active = this.ride.active
      this.disabledOthers = this.ride.active
      this.ridePrice = this.ride.driveNettoPrice
    }
  },
  mounted () {
    this.getDrivers()
    this.getBuses()
    this.bindSelects()
  }
}
</script>

<style>
  .go-back {
    color: green;
    text-decoration: underline;
  }
</style>
