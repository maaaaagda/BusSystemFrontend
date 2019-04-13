<template>
  <div>
    <h3 class='mb-3'>Przejazdy</h3>
    <div class="row mb-3" v-if="busLinesLoaded">
      <div class="col-3">
        <label class="m-0">Aktywne?</label>
        <select id="active" class="custom-select custom-select-sm" v-model="active">
          <option selected v-bind:value="'active'">Tak</option>
          <option v-bind:value="'inactive'">Nie</option>
          <option v-bind:value="''">Aktywne i nieaktywne</option>
        </select>
      </div>
      <div class="col-3">
        <label class="m-0">Linie</label>
        <select id="line" class="custom-select custom-select-sm" v-model.number="lineId">
          <option v-bind:value="''">Wszystkie</option>
          <option v-for="line in busLines" v-bind:key="line.id" v-bind:value="line.id">{{line.name}}</option>
        </select>
      </div>
      <div class="col-3">
        <label class="m-0">Pozycji na stronie</label>
        <select id="resultsOnPage" class="custom-select custom-select-sm" v-model="resultsOnPage">
         <option v-for="nr in [5, 10, 20, 50, 100]" v-bind:key="nr" v-bind:value="nr">{{nr}}</option>
        </select>
      </div>
      <div class="col-3">
        <label class="m-0">Przedział czasowy</label>
        <select id="timePeriod" class="custom-select custom-select-sm" v-model="timePeriod">
          <option v-bind:value="''">Wszystkie</option>
          <option v-bind:value="'week'">Tydzień</option>
          <option v-bind:value="'month'">Miesiąc</option>
        </select>
      </div>
    </div>
    <div>
      <table class='table table-hover text-center' id='rides'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Linia</th>
            <th scope='col'>Wyjazd </th>
            <th scope='col'>Przyjazd</th>
            <th scope='col'>Kierowca</th>
            <th scope='col'>Bus</th>
            <th scope='col'>Akt.</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody v-if='timetablesLoaded && timetables.content.length != 0'>
          <tr v-for='ride in timetables.content' v-bind:key='ride.id'>
            <th scope='row'>{{ride.id}}</th>
            <td>{{ride.busLine.name}}</td>
            <td>{{formatIsoTime(ride.startDateTime)[0]}}
              <br/> {{formatIsoTime(ride.startDateTime)[1]}}
            </td>
            <td>{{formatIsoTime(ride.endDateTime)[0]}}
              <br/> {{formatIsoTime(ride.endDateTime)[1]}}
            </td>
            <td>{{handleEmptyDriverData(ride.primaryDriver)}}</td>
            <td>{{handleEmptyBusData(ride.bus)}}</td>
            <td><input type="checkbox" disabled :checked="ride.active"/></td>
            <td><router-link :to="{name: 'Ride', params: {id: ride.id, ride: ride}}"><button class="btn btn-outline-success btn-sm">Więcej</button></router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if='timetablesLoaded && timetables.content.length === 0'
         class="d-flex justify-content-center m-4">
      Brak pasujących wyników
    </div>
    <div class="mt-5 d-flex">
      <pagination-panel
                        :results-on-page="resultsOnPage"
                        :time-period="timePeriod"
                        :active="active"
                        :lineId="lineId"
                        v-on:update-timetables="getAllTimetables($event)"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../../api/endpoints'
import moment from 'moment'
import PaginationPanel from './PaginationPanel'
import swal from 'sweetalert'

export default {
  components: {
    PaginationPanel
  },
  data () {
    return {
      timetables: [],
      active: '',
      timePeriod: 'month',
      lineId: '',
      resultsOnPage: 5,
      timetablesLoaded: false,
      busLines: [],
      busLinesLoaded: false
    }
  },
  methods: {
    getAllTimetables (response) {
      this.timetables = response
      this.timetablesLoaded = true
    },
    getBusLines () {
      return axios.get(api.BUS_LINES)
        .then((response) => {
          this.busLinesLoaded = true
          this.busLines = response.data
        })
        .catch(() => swal('Oops', 'Coś poszło nie tak... Nie można załadować danych', 'error'))
    },
    formatIsoTime (time) {
      let readableDate = moment(time, moment.ISO_8601).format('DD-MM-YYYY')
      let readableTime = moment(time, moment.ISO_8601).format('HH:mm')
      return [readableDate, readableTime]
    },
    handleEmptyBusData (bus) {
      if (bus == null || bus === '') {
        return 'Brak danych'
      } else {
        return bus.registrationNumber
      }
    },
    handleEmptyDriverData (driver) {
      if (driver == null || driver === '') {
        return 'Brak danych'
      } else {
        return driver.name + ' ' + driver.surname
      }
    }
  },
  mounted () {
    this.getBusLines()
  }
}
</script>
