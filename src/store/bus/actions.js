import axios from 'axios'
import api from '../../api/endpoints'
import MUTATION_TYPES from '../addons/mutation-types'

export default {
  registerBus ({commit}, bus) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.post(api.BUSES, bus)
      .then((response) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  },
  deleteBus ({commit}, id) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    return axios.delete(api.BUSES + '/' + id)
      .then((response) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        return Promise.reject(error)
      })
  }
}
