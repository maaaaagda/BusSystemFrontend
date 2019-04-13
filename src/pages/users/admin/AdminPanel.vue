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
      {name: 'Kierowcy', urlLink: '/admin/drivers'},
      {name: 'Przystanki', urlLink: '/admin/busstops'},
      {name: 'Pojazdy', urlLink: '/admin/buses'},
      {name: 'Linie autobusowe', urlLink: '/admin/buslines'},
      {name: 'Wyświetl przejazdy', urlLink: '/admin/busrides'},
      {name: 'Generuj przejazdy', urlLink: '/admin/generate-rides'}
    ]
    var panelName = 'AdministrationPanel'
    return {items, panelName}
  }
}
</script>
