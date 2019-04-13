import axios from 'axios'
import API from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  generateTimetables ({commit}, timeTableData) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.post(API.GENERATED_BUS_RIDES, timeTableData)
      .then(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function (error) {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
