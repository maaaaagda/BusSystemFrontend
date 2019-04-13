<template>
  <div>
    <div class="container">
      <div class="row pt-1">
        <div class="col-5">
          <label for="lineName">Nazwa lini autobusowej</label>
        </div>
        <div class="col">
          <label for="lineDriveTime">Całkowity czas przejazdu</label>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <input type="text" class="form-control form-control-sm"
                 v-model="line.name" placeholder="Nazwa linii"
                 id="lineName" name="lineName"
                 v-validate="'required'">
        </div>
        <div class="col-5">
          <input type="number" class="form-control form-control-sm"
                 id="lineDriveTime" name="lineDriveTime"
                 v-model="line.driveTime"
                 placeholder="Czas przejazdu w minutach" min="1"
                 v-validate="'required|min_value:1'"
                 :class="{'is-invalid': errors.has('lineDriveTime')}"
                 data-vv-as="całkowity czas przejazdu w minutach">
          <transition enter-active-class="animated fadeIn">
            <span v-show="errors.has('lineDriveTime')"
                  class="invalid-feedback">{{ errors.first('lineDriveTime') }}</span>
          </transition>
        </div>
      </div>
      <div class="row pt-4">
        <div class="col-5">
          <label for="lineFromStop">Przystanek początkowy</label>
        </div>
        <div class="col-5">
          <label for="lineToStop">Przystanek końcowy</label>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <select class="form-control form-control-sm" v-model="line.busStopFromId"
                  id="lineFromStop" name="lineFromStop" v-validate="'required'">
            <option disabled value="">Wybierz przystanek początkowy</option>
            <option v-for="st in stops" v-bind:key="st.id" v-bind:value="st.id">
              {{st.city + ' - ' + st.name}}
            </option>
          </select>
        </div>
        <div class="col-5">
          <select class="form-control form-control-sm" v-model="line.busStopToId"
                  id="lineToStop" name="lineToStop" v-validate="'required'">
            <option disabled value="">Wybierz przystanek końcowy</option>
            <option v-for="st in stops" v-bind:key="st.id" v-bind:value="st.id">
              {{st.city + ' - ' + st.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="row pt-4">
        <div class="col-3"></div>
        <div class="col-4">
          <button @click="validateForm" class="btn btn-outline-success btn-block ">Dodaj linię</button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>

    <div class="h4 pt-4">Wszystkie linie</div>
    <table v-if="busLinesLoaded" class="table table-hover text-center" id="allbusLines">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nazwa</th>
        <th scope="col">Z</th>
        <th scope="col">Do</th>
        <th scope="col">Czas przejazdu</th>
        <th scope="col" colspan="3">Więcej</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="busLine in busLines" v-bind:key="busLine.id">
        <th scope="row">{{busLine.id}}</th>
        <td>{{busLine.name}}</td>
        <td>{{busLine.from.city}}</td>
        <td>{{busLine.to.city}}</td>
        <td>{{busLine.driveTime}}</td>
        <td>
          <router-link :to="{path: `/admin/buslines/${busLine.id}/route`, params: {lineId: busLine.id}}">
            <button class="btn btn-outline-success">
              Trasa
            </button>
          </router-link>
        </td>
        <td>
          <router-link :to="{path: `/admin/buslines/${busLine.id}/schedule`, params: {lineId: busLine.id}}">
            <button class="btn btn-outline-success">
              Rozkład
            </button>
          </router-link>
        </td>
        <td>
         <button class="btn btn-outline-danger" @click="ensureDeletingLine(busLine)">
            Usuń
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import API from '../../../api/endpoints'
import swal from 'sweetalert'

export default {
  name: 'lines',
  data () {
    return {
      busLinesLoaded: false,
      stops: [],
      line: {
        busStopFromId: 0,
        busStopToId: 0,
        driveTime: null,
        name: ''
      },
      busLines: []
    }
  },
  methods: {
    getStops () {
      axios.get(API.BUS_STOPS)
        .then((response) => {
          this.stops = response.data
        })
        .catch(function () {})
    },
    getLines () {
      axios.get(API.BUS_LINES)
        .then((response) => {
          this.busLinesLoaded = true
          this.busLines = response.data
        })
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.addLine(this.line)
          }
        })
    },
    resetInputs () {
      this.line = {
        busStopFromId: 0,
        busStopToId: 0,
        driveTime: null,
        name: ''
      }
      this.$validator.reset()
    },
    addLine (lineData) {
      this.$store.dispatch('addBusLine', lineData)
        .then(() => this.getLines())
    },
    deleteLine (id) {
      this.$store.dispatch('deleteBusLine', id)
        .then(() => this.getLines())
    },
    ensureDeletingLine (busline) {
      swal({
        text: `Czy na pewno chcesz usunąć trasę ${busline.name} z bazy?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteLine(busline.id).then(() => {
              swal('Usunięto', {
                icon: 'success'
              })
            })
          }
        })
    }
  },

  mounted () {
    this.getStops()
    this.getLines()
  }
}

</script>
