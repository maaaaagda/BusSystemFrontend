<template>
  <div>
    <div class="row">
      <router-link to="/admin/buslines">
        <p class="go-back">
          Pokaż wszystkie linie
        </p>
      </router-link>
    </div>
    <div class="row mt-4 mb-3" v-if="busLineLoaded">
      <h5>Kursy linii nr {{busLine.name}} {{busLine.from.city}} <i class="fas fa-long-arrow-alt-right"></i> {{busLine.to.city}} </h5>
    </div>
    <div class="row date-picker-width mb-4">
      <div class="col my-2">
        <label for="startDate"><i class="fas fa-calendar-alt"></i> Wybierz termin</label>
        <div id="startDate">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="datePeriod"
            type="datetimerange"
            range-separator="-" start-placeholder="Początek" end-placeholder="Koniec">
          </el-date-picker>
        </div>
      </div>
      <div class="col my-2 d-flex align-items-end">
        <button type="button"
                :disabled="generateButtonDisabled"
                class="btn btn-outline-success"
                id="buttonGenerate"
                @click="ensureGenerating">
          Generuj
        </button>
      </div>
    </div>
    <div v-if="busLineSchedulesLoaded">
      <div class="row">
        <table class="table table-hover text-center" id="allbusLineSchedules">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kod (dni kursów)</th>
            <th scope="col">Aktywny?</th>
            <th scope="col">Cena przejazdu</th>
            <th scope="col">Godz. rozp. kursu</th>
            <th scope="col">Dodaj</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="schedule in busLineSchedules" v-bind:key="schedule.id">
            <th scope="row">{{schedule.id}}</th>
            <td>{{schedule.code}}</td>
            <td v-if="schedule.enabled">Tak</td>
            <td v-else>Nie</td>
            <td> {{schedule.driveNettoPrice}} zł</td>
            <td>{{schedule.startHour}}</td>
            <td><input type="checkbox" :disabled="!schedule.enabled" v-bind:value="schedule.id" v-model="schedulesIds"/></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../../../api/endpoints'
import swal from 'sweetalert'

export default {
  data () {
    return {
      milisecondsInADay: 86400000,
      pickerOptions: {
        disabledDate: (date) => {
          return date.getTime() + this.milisecondsInADay < Date.now()
        }
      },
      lineId: null,
      busLine: null,
      busLineLoaded: false,
      busLineSchedules: [],
      busLineSchedulesLoaded: false,
      datePeriod: null,
      schedulesIds: [],
      generateButtonDisabled: true
    }
  },
  watch: {
    datePeriod: function (val) {
      this.generateButtonDisabled = !(val !== null && this.schedulesIds.length !== 0)
    },
    schedulesIds: function (val) {
      this.generateButtonDisabled = !(val.length !== 0 && this.datePeriod !== null)
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
    getLineSchedules (id) {
      axios.get(`${api.BUS_LINES}/${id}/schedules`)
        .then((response) => {
          this.busLineSchedules = response.data
          this.busLineSchedulesLoaded = true
        })
    },
    ensureGenerating () {
      let generateData = {
        busLine: this.lineId,
        startDateTime: this.toLocalISOTime(this.datePeriod[0]),
        endDateTime: this.toLocalISOTime(this.datePeriod[1]),
        schedulesIds: this.schedulesIds
      }
      swal({
        text: `Czy na pewno chcesz wygenerować te kursy?`,
        icon: 'warning',
        buttons: true
      })
        .then((willSave) => {
          if (willSave) {
            this.$store.dispatch('generateTimetables', generateData)
              .then(() => {
                swal('Wygenerowano wybrane przejazdy!', {
                  icon: 'success'
                })
                this.getLineSchedules(this.lineId)
              })
              .catch(() => {
                swal('Oops', 'Coś poszło nie tak...', 'error')
              })
          }
        })
    },
    toLocalISOTime (time) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000
      return (new Date(time - tzoffset)).toISOString().slice(0, -1)
    },
    showHumanReadableTime (time) {
      let date = new Date(time)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  created () {
    this.lineId = this.$route.params.id
  },
  mounted () {
    this.getBusLine(this.lineId)
    this.getLineSchedules(this.lineId)
  }
}
</script>

<style scoped>
  .go-back {
    color: green;
    text-decoration: underline;
  }
  #buttonGenerate {
    height: 40px;
  }
</style>
