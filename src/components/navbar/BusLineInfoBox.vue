<template>
  <div class="inline">
    <router-link :to="{path: `/bus-lines/${busLine.id}`, params: {lineId: busLine.id}}">
      <button class="btn btn-outline-dark" v-on:mouseover="hover" v-on:mouseout="hoverOut">
        {{ busLine.name }}
      </button>
    </router-link>
    <div class="info-popover" v-if="showPopup" transition="fade" v-on:mouseover="hoverInfo" v-on:mouseout="hoverOutInfo">
      <p>Linia nr {{ busLine.name }}</p>
      <p>{{busLine.from.city}} <i class="fas fa-long-arrow-alt-right"></i> {{busLine.to.city}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['busLine'],
  data () {
    return {
      showPopup: false,
      timer: '',
      isInInfo: false
    }
  },

  methods: {
    hover: function () {
      let self = this
      this.timer = setTimeout(function () {
        self.showPopover()
      }, 600)
    },
    hoverOut: function () {
      let self = this
      clearTimeout(self.timer)
      this.timer = setTimeout(function () {
        if (!self.isInInfo) {
          self.closePopover()
        }
      }, 200)
    },
    hoverInfo: function () {
      this.isInInfo = true
    },
    hoverOutInfo: function () {
      this.isInInfo = false
      this.hoverOut()
    },
    showPopover: function () {
      this.showPopup = true
    },

    closePopover: function () {
      this.showPopup = false
    }
  }
}
</script>
<style scoped>
  a{
    color: #42b983;
  }
  p{
    font-size: 14px;
  }
  h3{
    margin: 5px 0;
  }
  .is-flex{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .inline{
    display: inline-block;
    position: relative;
  }
  .info-popover{
    position: absolute;
    width: 200px;
    background: #fff;
    border: 1px solid #42b983;
    border-radius: 5px;
    padding: 10px 20px;
    box-shadow: 0 6px 6px rgba(16, 16, 16, 0.04), 0 6px 6px rgba(0, 0, 0, 0.05);
    z-index:999;
  }

  button{
    background: #42b983;
    font-family: 'Montserrat', sans-serif;
    border: 1px solid #42b983;
    padding: 12px;
    font-size: 12px;
    color: #fff;
    outline: none;
    display: inline-block;
    text-align: center;
    padding: 6px 12px;
    border-radius: 3px;
    user-select: none;
    margin: 0 0 5px 0;
  }
  p {
    padding: 0;
    margin: 0;
  }
</style>
