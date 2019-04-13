<template>
  <div>
    <div class="h4 pb-4">Wybierz linię aby wygenerować przejazdy</div>
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
          <router-link :to="{path: `/admin/generate-rides/${busLine.id}/generate`, params: {lineId: busLine.id}}">
            <button class="btn btn-outline-success">
              Generuj przejazdy
            </button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import API from '../../../api/endpoints'
export default {
  data () {
    return {
      busLinesLoaded: false,
      busLines: []
    }
  },
  methods: {
    getLines () {
      axios.get(API.BUS_LINES)
        .then((response) => {
          this.busLinesLoaded = true
          this.busLines = response.data
        })
    }
  },
  mounted () {
    this.getLines()
  }
}
</script>
