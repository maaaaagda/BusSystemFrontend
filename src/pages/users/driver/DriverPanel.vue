<template>
  <panel :items="items" :panelName="panelName"></panel>
</template>

<script>
import panel from '@/components/UserPanel'

export default {
  components: {
    panel
  },
  data: function () {
    var items = [
      {name: 'Moje dane', urlLink: '/driver'},
      {name: 'Moje kursy', urlLink: '/driver'}
    ]
    var panelName = 'DriverPanel'
    return {items, panelName}
  }
}
</script>
