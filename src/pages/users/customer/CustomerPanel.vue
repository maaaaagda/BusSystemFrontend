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
      {name: 'Moje bilety', urlLink: '/customer'},
      {name: 'Moje dane', urlLink: '/customer/info'}
    ]
    var panelName = 'CustomerPanel'
    return {items, panelName}
  }
}
</script>
