import axios from 'axios'
import api from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  updateRide ({commit}, data) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.patch(`${api.BUS_RIDES}/${data.rideId}`, data.rideData)
      .then(() => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
