<template>
  <div class="container py-5 " v-on:keyup.enter="validateForm" v-on:click="hideError">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12 mx-auto">
            <div class="card border-secondary">
              <div class="card-header">
                <h3 class="mb-0 my-2">Rejestracja</h3>
              </div>
              <transition name="fade">
                <div v-if="getSignUpServerError"
                     class="row card-body pb-0">
                  <div class="col-md-12">
                    <div id="errorMessageAlert1" class="alert alert-danger mb-0" role="alert">
                      Nazwa użytkownika, bądź email jest zajęty!
                    </div>
                  </div>
                </div>
              </transition>
              <div class="form" role="form">
                <div class="row card-body pb-0">
                  <div class="form-group col-md-6">
                    <label for="inputName">Imię <span class="required">*</span></label>
                    <input type="text" class="form-control" id="inputName" placeholder="Jan"
                           name="inputName"
                           v-validate="'required'"
                           :class="{'is-invalid': errors.has('inputName')}"
                           v-model="registerDTO.name"
                           data-vv-as="imię">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputName')"
                            class="invalid-feedback">{{ errors.first('inputName') }}</span>
                    </transition>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputSurname">Nazwisko <span class="required">*</span></label>
                    <input type="text" class="form-control" id="inputSurname" placeholder="Kowalski"
                           name="inputSurname"
                           v-validate="'required'"
                           :class="{'is-invalid': errors.has('inputSurname')}"
                           v-model="registerDTO.surname"
                           data-vv-as="nazwisko">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputSurname')"
                            class="invalid-feedback">{{ errors.first('inputSurname') }}</span>
                    </transition>
                  </div>
                </div>
                <div class="row card-body pb-0">
                  <div class="form-group col-md-6">
                    <label for="inputUsername">Nazwa użytkownika <span class="required">*</span></label>
                    <input type="text" class="form-control" id="inputUsername" placeholder="janko"
                           name="inputUsername"
                           v-validate="'required'"
                           :class="{'is-invalid': errors.has('inputUsername')}"
                           v-model="registerDTO.username"
                           data-vv-as="nazwę użytkownika"
                         data-container="body"
                         data-toggle="popover"
                         data-placement="bottom"
                         data-content="Nazwa użytkownika jest zajęta."
                         data-trigger="manual">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputUsername')"
                            class="invalid-feedback">{{ errors.first('inputUsername') }}</span>
                    </transition>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputEmail">Email <span class="required">*</span></label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="janko@walski.pl"
                           name="inputEmail"
                           v-validate="'required|email'"
                           :class="{'is-invalid': errors.has('inputEmail')}"
                           v-model="registerDTO.email"
                           data-vv-as="email"
                         data-container="body"
                         data-toggle="popover"
                         data-placement="bottom"
                         data-content="Email jest zajęty"
                         data-trigger="manual">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputEmail')"
                            class="invalid-feedback">{{ errors.first('inputEmail') }}</span>
                    </transition>
                  </div>
                </div>
                <div class="row card-body pb-0">
                  <div class="form-group col-md-6">
                    <label for="inputPassword">Hasło <span class="required">*</span></label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="*********"
                           name="inputPassword"
                           v-validate="'required'"
                           :class="{'is-invalid': errors.has('inputPassword')}"
                           v-model="registerDTO.password"
                           data-vv-as="hasło">
                    <transition enter-active-class="animated fadeIn">
                    <span v-show="errors.has('inputPassword')"
                          class="invalid-feedback">{{ errors.first('inputPassword') }}</span>
                    </transition>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputVerifyPassword">Powtórz hasło <span class="required">*</span></label>
                    <input type="password" class="form-control" id="inputVerifyPassword" placeholder="*********"
                           name="inputVerifyPassword"
                           v-validate="'required|confirmed:inputPassword'"
                           :class="{'is-invalid': errors.has('inputVerifyPassword')}"
                           data-vv-as="hasło ponownie">
                    <transition enter-active-class="animated fadeIn">
                      <span v-show="errors.has('inputVerifyPassword')"
                            class="invalid-feedback">{{ errors.first('inputVerifyPassword') }}</span>
                    </transition>
                  </div>
                </div>
                <div class="row card-body pb-0">
                  <div class="form-group col-md-6">
                    <label for="inputPhone">Numer telefonu</label>
                    <input type="text" class="form-control" id="inputPhone"
                           v-model="registerDTO.phone">
                  </div>
                </div>
              </div>
              <div class="row card-body">
                <div class="col-md-12">
                  <div class="text-center">
                    <button @click="validateForm" class="btn btn-success btn-lg">Rejestruj</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../api/endpoints'
import {mapGetters} from 'vuex'
import '../../../static/js/donetyping'

export default {
  data () {
    return {
      registerDTO: {
        username: '',
        name: '',
        surname: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getSignUpServerError'])
  },
  methods: {
    validateForm () {
      this.hideError()
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.register(this.registerDTO)
          }
        })
    },
    register (data) {
      this.$store.dispatch('signUp', data)
    },
    hideError () {
      this.$store.dispatch('unsetSignUpServerError')
    },
    checkUserNamePopUp: function () {
      this.$http.get(`${API.USERNAMES}?username=${this.registerDTO.username}`)
        .then(() => {
          $('#inputUsername').popover('show')
        })
        .catch((err) => {
          if (err.response.status === 404) {
            $('#inputUsername').popover('dispose')
          }
        })
    },
    checkEmailPopUp: function () {
      this.$http.get(`${API.EMAILS}?email=${this.registerDTO.email}`)
        .then((response) => {
          $('#inputEmail').popover('show')
        })
        .catch((err) => {
          if (err.response.status === 404) {
            $('#inputEmail').popover('dispose')
          }
        })
    }
  },
  mounted () {
    let self = this
    $('#inputUsername').donetyping(function () {
      self.checkUserNamePopUp()
    }, 1500)
    $('#inputEmail').donetyping(function () {
      self.checkEmailPopUp()
    }, 1500)
  },
  beforeDestroy () {
    this.$store.dispatch('unsetSignUpServerError')
    $('#inputUsername').popover('dispose')
    $('#inputEmail').popover('dispose')
  }
}
</script>

<style scoped>
  .required {
    color: red;
  }
</style>

<style>
  .popover {
    border: 1px solid rgba(255, 0, 0, 0.6) !important;
  }
  .popover-body {
    color: red !important;
  }
</style>
