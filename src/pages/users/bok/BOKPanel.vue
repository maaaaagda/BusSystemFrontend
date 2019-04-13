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
      {name: 'Rezerwuj bilet', urlLink: '/bok'},
      {name: 'Aktualności', urlLink: '/bok'},
      {name: 'Zarządzaj kursami', urlLink: '/bok'}
    ]
    var panelName = 'BokPanel'
    return {items, panelName}
  }
}
</script>
