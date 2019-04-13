import CFG from '../../api/config'
import API from '../../api/endpoints'
import jwtDecoder from 'jwt-decode'
import router from '../../router'
import axios from 'axios'
import MUTATION_TYPES from './mutation-types'

export default {
  restoreUserCredentialsIfLogged ({dispatch, commit}) {
    let rawToken = localStorage.getItem('token')
    if (rawToken) {
      commit(MUTATION_TYPES.SET_TOKEN, rawToken)
      commit(MUTATION_TYPES.SET_LOGGED)
      const authDecodedToken = jwtDecoder(rawToken)
      commit(MUTATION_TYPES.SET_USERNAME, authDecodedToken.sub)
      commit(MUTATION_TYPES.SET_USER_TYPE, authDecodedToken.ut)
      commit(MUTATION_TYPES.SET_USER_ID, authDecodedToken.id)
    }
  },
  login ({dispatch, commit}, credentail) {
    dispatch('setLoadingSpinner')
    axios.post(`${CFG.API_LOGIN_BASE_URL}${API.LOGIN}`, credentail)
      .then(response => {
        const rawToken = response.headers.authorization
        localStorage.setItem('token', rawToken)
        commit(MUTATION_TYPES.SET_TOKEN, rawToken)
        commit(MUTATION_TYPES.SET_LOGGED)
        const authDecodedToken = jwtDecoder(rawToken)
        commit(MUTATION_TYPES.SET_USERNAME, authDecodedToken.sub)
        commit(MUTATION_TYPES.SET_USER_TYPE, authDecodedToken.ut)
        commit(MUTATION_TYPES.SET_USER_ID, authDecodedToken.id)
        dispatch('unsetLoadingSpinner')
        dispatch('setMessage', {text: 'Zostałeś zalogowany', type: 'alert-success'})
        router.push({path: '/'})
      })
      .catch(function (error) {
        dispatch('unsetLoadingSpinner')
        if (error.response.status === 404) {
          dispatch('setLoginError', 'Błędny login lub hasło!')
        } else {
          dispatch('setLoginError', 'Aktywuj konto!')
        }
      })
  },
  logout ({dispatch, commit}) {
    localStorage.removeItem('token')
    commit(MUTATION_TYPES.UNSET_LOGGED)
    commit(MUTATION_TYPES.SET_TOKEN, null)
    commit(MUTATION_TYPES.SET_USERNAME, null)
    commit(MUTATION_TYPES.SET_USER_TYPE, null)
    dispatch('setMessage', {text: 'Zostałeś wylogowany', type: 'alert-success'})
    router.push({path: '/'})
  },
  signUp ({dispatch, commit}, registrationData) {
    dispatch('setLoadingSpinner')
    axios.post(API.USERS, registrationData)
      .then(function (response) {
        commit(MUTATION_TYPES.SET_REGISTERED)
        dispatch('unsetLoadingSpinner')
      })
      .catch(function () {
        dispatch('setSignUpServerError')
        dispatch('unsetLoadingSpinner')
      })
  },
  unsetRegisteredFlag ({commit}) {
    commit(MUTATION_TYPES.UNSET_REGISTERED)
  },
  setSignUpServerError ({commit}) {
    commit(MUTATION_TYPES.SET_SIGNUP_SERVER_ERROR)
  },
  unsetSignUpServerError ({commit}) {
    commit(MUTATION_TYPES.UNSET_SIGNUP_SERVER_ERROR)
  },
  setLoginError ({commit}, message) {
    commit(MUTATION_TYPES.SET_LOGIN_ERROR, message)
  },
  unsetLoginError ({commit}) {
    commit(MUTATION_TYPES.UNSET_LOGIN_ERROR)
  }
}
