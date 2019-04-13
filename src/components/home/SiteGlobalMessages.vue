<template>
  <transition name="fade">
    <div class="container">
      <div id="message" class="alert fade show" :class="type" role="alert"
           @click="closeMessage">
        {{ this.message }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message', 'type'],
  methods: {
    closeMessage () {
      this.$store.dispatch('clearMessage')
    }
  },
  mounted () {
    setTimeout(this.closeMessage, 3000)
  },
  beforeDestroy () {
    this.$store.dispatch('clearMessage')
  }
}
</script>
