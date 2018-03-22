export default {
  isLogged: state => state.logged,
  getMessage: state => state.message,
  getRegisteredFlag: state => state.registeredFlag,
  getLoginError: state => state.loginError,
  getLoadingSpinner: state => state.showLoader,
  news: state => state.news,
  newsLoaded: state => state.newsLoaded
}
