import axios from 'axios'
import API from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  createNewBusStop ({commit}, busStop) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.post(API.BUS_STOPS, busStop)
      .then(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
  },
  deleteBusStopById ({commit}, id) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.delete(`${API.BUS_STOPS}/${id}`)
      .then(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function (error) {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
