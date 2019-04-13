<template>
  <div>
    <div class="container">
      <div class="mt-4 mb-4">
        <carousel-panel></carousel-panel>
        <connections-searcher-panel class="p-0 my-3"></connections-searcher-panel>
        <home-content></home-content>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselPanel from '@/components/home/CarouselPanel'
import BuyTicket from '@/components/home/BuyTicketPanel'
import HomeContent from '@/components/home/HomeContent'
import ConnectionsSearcherPanel from '../../components/home/ConnectionsSearcherPanel'

export default {
  methods: {
    playCarousel: function () {
      $('.carousel').carousel({
        interval: 8000,
        cycle: true
      })
    }
  },
  mounted () {
    this.playCarousel()
  },
  components: {
    CarouselPanel: CarouselPanel,
    ConnectionsSearcherPanel: ConnectionsSearcherPanel,
    buyTicketComponent: BuyTicket,
    homeContent: HomeContent
  }
}

</script>
