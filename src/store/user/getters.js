export default {
  getUserId: state => state.userId,
  isLogged: state => state.logged,
  getToken: state => state.token,
  getUserName: state => state.username,
  getRegisteredFlag: state => state.registeredFlag,
  getLoginError: state => state.loginError,
  getSignUpServerError: state => state.signUpServerError,
  getUserType: state => state.userType
}
