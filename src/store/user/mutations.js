import MUTATION_TYPES from './mutation-types'

export default {
  [MUTATION_TYPES.SET_TOKEN] (state, token) {
    state.token = token
  },
  [MUTATION_TYPES.SET_LOGGED] (state) {
    state.logged = true
  },
  [MUTATION_TYPES.UNSET_LOGGED] (state) {
    state.logged = false
  },
  [MUTATION_TYPES.SET_USERNAME] (state, username) {
    state.username = username
  },
  [MUTATION_TYPES.SET_USER_TYPE] (state, userType) {
    state.userType = userType
  },
  [MUTATION_TYPES.SET_REGISTERED] (state) {
    state.registeredFlag = true
  },
  [MUTATION_TYPES.UNSET_REGISTERED] (state) {
    state.registeredFlag = false
  },
  [MUTATION_TYPES.SET_LOGIN_ERROR] (state, message) {
    state.loginError = message
  },
  [MUTATION_TYPES.UNSET_LOGIN_ERROR] (state) {
    state.loginError = false
  },
  [MUTATION_TYPES.SET_SIGNUP_SERVER_ERROR] (state) {
    state.signUpServerError = true
  },
  [MUTATION_TYPES.UNSET_SIGNUP_SERVER_ERROR] (state) {
    state.signUpServerError = false
  },
  [MUTATION_TYPES.SET_USER_TYPE] (state, userType) {
    state.userType = userType
  },
  [MUTATION_TYPES.SET_USER_ID] (state, id) {
    state.userId = id
  }
}
