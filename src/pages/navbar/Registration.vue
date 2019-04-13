<template>
  <div>
    <transition enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutLeft"
                mode="out-in">
      <registration-form v-if="!getRegisteredFlag"></registration-form>
      <registration-congrats v-if="getRegisteredFlag"></registration-congrats>
    </transition>
  </div>
</template>

<script>
import RegistrationForm from '../../components/registration/RegistrationForm'
import RegistrationCongrats from '../../components/registration/RegistrationCongrats'
import {mapGetters} from 'vuex'
import 'animate.css/animate.min.css'
export default {
  data () {
    return {
      registered: false
    }
  },
  computed: {
    ...mapGetters(['getRegisteredFlag'])
  },
  components: {
    registrationForm: RegistrationForm,
    registrationCongrats: RegistrationCongrats
  }
}
</script>
