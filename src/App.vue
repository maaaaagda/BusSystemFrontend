<template>
  <div id="app">
    <div class="component-height">
      <site-navbar></site-navbar>
      <site-messages
        :message="getMessage"
        :type="getMessageType"
        v-if="showGlobalMessage"></site-messages>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
    <hr />
    <site-footer></site-footer>
    <spinner-component :showLoader="getLoadingSpinner"></spinner-component>
  </div>
</template>

<script>
import Footer from './components/footer/SiteFooter'
import Navbar from './components/navbar/Navbar'
import SiteMessages from './components/home/SiteGlobalMessages'
import SpinnerComponent from './components/LoadingSpinner'
import {mapGetters} from 'vuex'
import '../static/css/spinner.css'

export default {
  name: 'App',
  components: {
    siteFooter: Footer,
    siteNavbar: Navbar,
    siteMessages: SiteMessages,
    spinnerComponent: SpinnerComponent
  },
  computed: {
    ...mapGetters(['getMessage', 'getMessageType', 'getLoadingSpinner']),
    showGlobalMessage: function () {
      return !!this.getMessage
    }
  },
  created () {
    this.$store.dispatch('restoreUserCredentialsIfLogged')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
.component-height {
  min-height: 73vh;
}
</style>
