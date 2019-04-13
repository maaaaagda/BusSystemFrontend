import API from '../../api/endpoints'
import ADDONS_MUTATION_TYPES from '../addons/mutation-types'
import axios from 'axios'

export default {
  addBusLine ({dispatch, commit}, lineData) {
    commit(ADDONS_MUTATION_TYPES.SET_LOADING_SPINNER)
    const addLine = axios.post(API.BUS_LINES, lineData)
      .then(function (response) {
        commit(ADDONS_MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function () {
        commit(ADDONS_MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
    return addLine
  },
  deleteBusLine ({dispatch, commit}, lineID) {
    commit(ADDONS_MUTATION_TYPES.SET_LOADING_SPINNER)
    const delLine = axios.delete(`${API.BUS_LINES}/${lineID}`)
      .then(function (response) {
        commit(ADDONS_MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
      .catch(function () {
        commit(ADDONS_MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
    return delLine
  }
}
