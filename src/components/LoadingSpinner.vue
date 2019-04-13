<template>
  <div class="overlay" v-show="showLoader">
    <div class="loading-spinner">
      <div class="dot dotOne"></div>
      <div class="dot dotTwo"></div>
      <div class="dot dotThree"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showLoader']
}
</script>
