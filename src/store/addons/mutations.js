import MUTATION_TYPES from './mutation-types'

export default {
  [MUTATION_TYPES.SET_LOADING_SPINNER] (state) {
    state.showLoader = true
  },
  [MUTATION_TYPES.UNSET_LOADING_SPINNER] (state) {
    state.showLoader = false
  },
  [MUTATION_TYPES.SHOW_MESSAGE] (state, message) {
    state.message = message
  },
  [MUTATION_TYPES.SET_MESSAGE_TYPE] (state, type) {
    state.messageType = type
  },
  [MUTATION_TYPES.CLEAR_MESSAGE] (state) {
    state.message = null
  }
}
