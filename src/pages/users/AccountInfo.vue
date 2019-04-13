<template>
  <div>
    <h3 class="mb-0 mb-4">Twoje dane</h3>
    <div class="row m-2">
      <div class="col-4 p-0">Nazwa użytkownika:</div>
      <div class="col-6">
        <input type="text" id="firstInput" :disabled="!updateClicked" v-model="userData.username"
               class="form-control"/>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-4 p-0">Imię</div>
      <div class="col-6">
        <input type="text" :disabled="!updateClicked" v-model="userData.name"
               class="form-control"/>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-4 p-0">Nazwisko</div>
      <div class="col-6">
        <input type="text" :disabled="!updateClicked" v-model="userData.surname"
               class="form-control"/>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-4 p-0">Email</div>
      <div class="col-6">
        <input type="text" :disabled="!updateClicked" v-model="userData.email" class="form-control"/>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-4 p-0">Telefon</div>
      <div class="col-6">
        <input type="text" :disabled="!updateClicked" v-model="userData.phone"
               class="form-control"/>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-4 p-0">Zdjęcie profilowe</div>
      <div class="col-6">
        <!--v-model="userData.photo"-->
        <input type="file" :disabled="!updateClicked"
               class="form-control-file" id="photoFileInput">
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-10">
        <div class="text-right">
          <button id="updateOrSendButton" @click="updateOrSendData" class="btn btn-success mx-2">Edytuj dane</button>
          <router-link to="/">
            <button class="btn btn-outline-success mx-2">Wróć</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../api/endpoints'
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      userData: {
        id: null,
        name: '',
        surname: '',
        username: '',
        email: '',
        phone: '',
        photo: ''
      },
      updateClicked: false
    }
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  methods: {
    updateOrSendData: function () {
      if (this.updateClicked === false) {
        this.updateClicked = true
        $('#updateOrSendButton').text('Zapisz zmiany')
        $('input').addClass('input')
        Vue.nextTick(() => {
          this.putCursorAtEnd($('#firstInput'))
        })
      } else {
        this.$http.put(`${API.USERS}/${this.userData.id}`, this.userData)
          .then(() => {
            this.$store.dispatch('logout').then(() => {
              this.$store.dispatch('setMessage',
                {text: 'Dane zostały zaktualizowane, zaloguj się ponownie', type: 'alert-success'})
            })
          })
          .catch(() => {
            this.$store.dispatch('setMessage', {text: 'Wystąpił błąd', type: 'alert-danger'})
          })
      }
    },
    putCursorAtEnd (input) {
      input.focus()
      let tmpStr = input.val()
      input.val('')
      input.val(tmpStr)
    }
  },
  mounted () {
    this.$http.get(`${API.USERS}/${this.getUserId}`)
      .then((response) => {
        this.userData = response.data
      })
      .catch((err) => {
        console.log(err)
        this.$store.dispatch('setMessage', {text: 'Błąd ładowania danych', type: 'alert-danger'})
      })
  }
}

</script>

<style scoped>
  .input:focus {
    border-color: #12b31c;
    box-shadow: 0 0 10px #129f1c;
  }
</style>
