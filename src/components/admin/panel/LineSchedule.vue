<template>
  <div>
    <div class="row">
      <router-link to="/admin/buslines">
        <p class="go-back">
          Pokaż wszystkie linie
        </p>
      </router-link>
    </div>
    <h5>Dodaj nowy harmonogram</h5>
    <div class="row mt-4">
      <div class="col-3">
        <label for="scheduleCode">Kod </label>
        <input type="text" class="form-control form-control-sm" id="scheduleCode"
               name="scheduleCode"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('scheduleCode')}"
               v-model="schedule.code"
               data-vv-as="kod">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('scheduleCode')"
                class="invalid-feedback">{{ errors.first('scheduleCode') }}</span>
        </transition>
      </div>
      <div class="col-3">
        <label>Godzina odjazdu </label>
        <el-time-picker class="form-control form-control-sm"
          id="scheduleStartHour"
          name="scheduleStartHour"
          v-validate="'required'"
          :class="{'is-invalid': errors.has('scheduleStartHour')}"
          size="small"
          value-format="HH:mm:s"
          v-model="schedule.startHour"
          data-vv-as="godzinę odjazdu"
          placeholder="Godzina odjazdu">
        </el-time-picker>

        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('scheduleStartHour')"
                class="invalid-feedback">{{ errors.first('scheduleStartHour') }}</span>
        </transition>
      </div>
      <div class="col-3">
        <label for="scheduleDriveNettoPrice">Cena netto za przejazd </label>
        <input type="text" class="form-control form-control-sm" id="scheduleDriveNettoPrice"
               name="scheduleDriveNettoPrice"
               v-validate="'required'"
               :class="{'is-invalid': errors.has('scheduleDriveNettoPrice')}"
               v-model="schedule.driveNettoPrice"
               data-vv-as="cenę netto">
        <transition enter-active-class="animated fadeIn">
          <span v-show="errors.has('scheduleDriveNettoPrice')"
                class="invalid-feedback">{{ errors.first('scheduleDriveNettoPrice') }}</span>
        </transition>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <button type="button" id="addSchedule" class="btn btn-outline-success"
                @click="validateForm">Dodaj rozkład</button>
      </div>
    </div>
    <div class="row mt-4 mb-3">
      <h5>Harmonogram dla linii nr {{busLine.name}} {{busLine.from.city}} <i class="fas fa-long-arrow-alt-right"></i> {{busLine.to.city}} </h5>
    </div>
    <div>
      <div class="row">
        <table class="table table-hover text-center" id="allbusLineSchedules">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kod (dni kursów)</th>
            <th scope="col">Aktywny?</th>
            <th scope="col">Cena przejazdu</th>
            <th scope="col">Godz. rozp. kursu</th>
            <th scope="col">Więcej</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="schedule in busLineSchedules" v-bind:key="schedule.id"
              v-bind:style="{color: schedule.enabled ? 'black' : '#a6a8ad'}">
            <th scope="row">{{schedule.id}}</th>
            <td>{{schedule.code}}</td>
            <td v-if="schedule.enabled">Tak</td>
            <td v-else>Nie</td>
            <td> {{schedule.driveNettoPrice}} zł</td>
            <td>{{schedule.startHour}}</td>
            <td>
              <button class="btn btn-outline-danger" @click="ensureDeletingSchedule(schedule.id)">Usuń</button>
              <button :disabled="schedule.enabled"
                      class="btn"
                      :class="{'btn-outline-success': !schedule.enabled}" @click="activateSchedule(schedule.id)">Aktywuj</button>
            </td>
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
      lineId: null,
      busLine: {
        name: null,
        from: { id: null },
        to: { id: null }
      },
      busLineSchedules: null,
      schedule: {
        code: null,
        startHour: null,
        driveNettoPrice: null
      }
    }
  },
  methods: {
    getBusLine (id) {
      axios.get(`${api.BUS_LINES}/${id}`)
        .then((response) => {
          this.busLine = response.data
        })
    },
    getLineSchedules (id) {
      axios.get(`${api.BUS_LINES}/${id}/schedules`)
        .then((response) => {
          this.busLineSchedules = response.data
        })
    },
    toLocalISOTime (time) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000
      return (new Date(time - tzoffset)).toISOString().slice(0, -1)
    },
    showHumanReadableTime (time) {
      let date = new Date(time)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.addSchedule(this.schedule, this.lineId)
          }
        })
    },
    addSchedule (schedule, lineId) {
      this.$store.dispatch('addSchedule', { schedule: schedule, busLineId: lineId })
        .then(() => {
          swal('Dodano harmonogram!', {
            icon: 'success'
          })
          this.getLineSchedules(this.lineId)
        })
        .catch(() => {
          swal('Oops', 'Coś poszło nie tak...', 'error')
        })
    },
    ensureDeletingSchedule (id) {
      swal({
        text: `Czy na pewno chcesz usunąć ten harmonogram?`,
        icon: 'warning',
        buttons: true
      })
        .then((willSave) => {
          if (willSave) {
            this.$store.dispatch('removeSchedule', {busLineId: this.lineId, scheduleId: id})
              .then(() => {
                swal('Usunięto harmonogram!', {
                  icon: 'success'
                })
                this.getLineSchedules(this.lineId)
              })
              .catch(() => {
                swal('Oops', 'Coś poszło nie tak...', 'error')
              })
          }
        })
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

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
    height: 32px;
  }
  .el-input--small .el-input__inner {
    height: 22px;
    border: none;
  }
</style>
