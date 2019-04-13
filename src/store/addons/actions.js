import MUTATION_TYPES from './mutation-types'

export default {
  setMessage ({commit}, {text, type}) {
    commit(MUTATION_TYPES.SHOW_MESSAGE, text)
    commit(MUTATION_TYPES.SET_MESSAGE_TYPE, type)
  },
  clearMessage ({commit}) {
    commit(MUTATION_TYPES.CLEAR_MESSAGE)
    commit(MUTATION_TYPES.SET_MESSAGE_TYPE, '')
  },
  setLoadingSpinner ({commit}) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
  },
  unsetLoadingSpinner ({commit}) {
    commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
  }
}
