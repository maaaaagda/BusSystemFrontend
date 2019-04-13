import axios from 'axios'
import API from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  addSchedule ({commit}, data) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.post(API.BUS_LINES + '/' + data.busLineId + API.SCHEDULES, data.schedule)
      .then(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function (error) {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  },
  removeSchedule ({commit}, data) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.delete(API.BUS_LINES + '/' + data.busLineId + API.SCHEDULES + '/' + data.scheduleId)
      .then(() => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
