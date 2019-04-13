import axios from 'axios'
import api from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  deleteBusStopFromRoute ({commit}, data) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.delete(`${api.BUS_LINES}/${data.lineId}/routes/${data.busStopId}`)
      .then((response) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  },
  addBusStopToRoute ({commit}, data) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.post(`${api.BUS_LINES}/${data.id}/routes`, data.busStop)
      .then((response) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
