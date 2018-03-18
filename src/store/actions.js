import CFG from '../config'
import MUTATION_TYPES from './mutation-types'
import axios from 'axios'
import router from '../router'

export default {
  login ({dispatch, commit}, credentail) {
    axios.post(`${CFG.API_BASE_URL}/login`, credentail)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('token', response.headers.authorization)
          commit(MUTATION_TYPES.LOGIN)
          dispatch('setMessage', 'Zostałeś zalogowany')
          router.push({path: '/'})
        }
      })
      .catch(function () {
        dispatch('setLoginError')
      })
  },
  logout ({dispatch, commit}) {
    localStorage.removeItem('token')
    commit(MUTATION_TYPES.LOGOUT)
    dispatch('setMessage', 'Zostałeś wylogowany')
    router.push({path: '/'})
  },
  signUp ({dispatch, commit}, registrationData) {
    axios.post(`${CFG.API_BASE_URL}/users/sign-up`, registrationData)
      .then(function (response) {
        if (response.status === 200) {
          commit(MUTATION_TYPES.SET_REGISTERED)
        }
      })
      .catch(function (error) {
        console.log('Error: ', error)
      })
  },
  unsetRegisteredFlag ({commit}) {
    commit(MUTATION_TYPES.UNSET_REGISTERED)
  },
  setMessage ({commit}, message) {
    commit(MUTATION_TYPES.SHOW_MESSAGE, message)
  },
  clearMessage ({commit}) {
    commit(MUTATION_TYPES.CLEAR_MESSAGE)
  },
  setLoginError ({commit}) {
    commit(MUTATION_TYPES.SET_LOGIN_ERROR)
  },
  unsetLoginError ({commit}) {
    commit(MUTATION_TYPES.UNSET_LOGIN_ERROR)
  }
}
