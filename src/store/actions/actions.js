import CFG from '../../config'
import MUTATION_TYPES from '../mutation-types/mutation-types'
import axios from 'axios'
import router from '../../router/index'
import jwtDecoder from 'jwt-decode'

export default {
  restoreUserCredentialsIfLogged ({dispatch, commit}) {
    let rawToken = localStorage.getItem('token')
    if (rawToken) {
      commit(MUTATION_TYPES.SET_TOKEN, rawToken)
      commit(MUTATION_TYPES.SET_LOGGED)
      const authDecodedToken = jwtDecoder(rawToken)
      commit(MUTATION_TYPES.SET_USERNAME, authDecodedToken.sub)
      commit(MUTATION_TYPES.SET_USER_TYPE, authDecodedToken.ut)
    }
  },
  login ({dispatch, commit}, credentail) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    axios.post(`${CFG.API_LOGIN_BASE_URL}/login`, credentail)
      .then(response => {
        const rawToken = response.headers.authorization
        localStorage.setItem('token', rawToken)
        commit(MUTATION_TYPES.SET_TOKEN, rawToken)
        commit(MUTATION_TYPES.SET_LOGGED)
        const authDecodedToken = jwtDecoder(rawToken)
        commit(MUTATION_TYPES.SET_USERNAME, authDecodedToken.sub)
        commit(MUTATION_TYPES.SET_USER_TYPE, authDecodedToken.ut)
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        dispatch('setMessage', 'Zostałeś zalogowany')
        router.push({path: '/'})
      })
      .catch(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        dispatch('setLoginError')
      })
  },
  logout ({dispatch, commit}) {
    localStorage.removeItem('token')
    commit(MUTATION_TYPES.UNSET_LOGGED)
    commit(MUTATION_TYPES.SET_TOKEN, null)
    commit(MUTATION_TYPES.SET_USERNAME, null)
    commit(MUTATION_TYPES.SET_USER_TYPE, null)
    dispatch('setMessage', 'Zostałeś wylogowany')
    router.push({path: '/'})
  },
  signUp ({dispatch, commit}, registrationData) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    axios.post(`${CFG.API_BASE_URL}/users/sign-up`, registrationData)
      .then(function (response) {
        if (response.status === 200) {
          commit(MUTATION_TYPES.SET_REGISTERED)
          commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        }
      })
      .catch(function (error) {
        if (error.response && error.response.data.status === 3) {
          dispatch('setSignUpServerError')
        }
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
  },
  getNews ({dispatch, commit}, settings) {
    axios.get(`${CFG.API_BASE_URL}/getNews?page=${settings.page}&size=${settings.size}&sort=dateTime,DESC`)
      .then(function (response) {
        if (response.status === 200) {
          commit(MUTATION_TYPES.LOAD_NEWS, response.data.content)
          commit(MUTATION_TYPES.TOTAL_NEWS_PAGES, response.data.totalPages)
          commit(MUTATION_TYPES.SET_NEWS_LOADED)
        }
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
  },
  addNews ({dispatch, commit}, newsData) {
    commit(MUTATION_TYPES.SET_LOADING_SPINNER)
    axios.post(`${CFG.API_BASE_URL}/auth/addNews`, newsData)
      .then(function (response) {
        dispatch('setMessage', 'News Dodany')
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
        router.push({path: '/'}) // TODO zmienić na panel administracyjny
      })
      .catch(function () {
        commit(MUTATION_TYPES.UNSET_LOADING_SPINNER)
      })
  },
  loadNews ({commit}, data) {
    commit(MUTATION_TYPES.LOAD_NEWS, data)
  },
  setNewsLoaded ({commit}) {
    commit(MUTATION_TYPES.SET_NEWS_LOADED)
  },
  unSetNewsLoaded ({commit}) {
    commit(MUTATION_TYPES.UNSET_NEWS_LOADED)
  },
  setSignUpServerError ({commit}) {
    commit(MUTATION_TYPES.SET_SIGNUP_SERVER_ERROR)
  },
  unsetSignUpServerError ({commit}) {
    commit(MUTATION_TYPES.UNSET_SIGNUP_SERVER_ERROR)
  }
}
