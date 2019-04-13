<template>
  <div class="google-map" id="map">
  </div>
</template>

<script>
import CFG from '../../api/config'
import '../../../static/js/gmap3.min'
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyBL0B3DQeGfDD6kyjtlbNbeRJEHNt_9giA'
GoogleMapsLoader.LANGUAGE = 'pl'
GoogleMapsLoader.REGION = 'PL'

export default {
  data () {
    return {
      mapPoints: []
    }
  },
  methods: {
    mapDTOToMapPoints: function (dto) {
      return {
        latLng: [dto.latitude, dto.longitude],
        data: `<h5>${dto.city}</h5><b>${dto.name}</b><br />${dto.address == null ? '' : dto.address}`
      }
    },
    fetchPointsAndThenRenderMap () {
      this.$http.get(`${CFG.API_BASE_URL}/bus-stops`)
        .then((response) => {
          this.mapPoints = response.data.map(this.mapDTOToMapPoints)
        }).then(() => this.renderMap())
    },
    renderMap () {
      let self = this
      GoogleMapsLoader.load(function (google) {
        $('#map').gmap3({
          map: {
            options: {
              center: [50.260378, 21.853473],
              zoom: 10,
              mapTypeId: 'custom_style',
              mapTypeControlOptions: {
                mapTypeIds: [
                  'custom_style',
                  google.maps.MapTypeId.ROADMAP]
              },
              panControl: false,
              zoomControl: false
            }
          },
          marker: {
            values: self.mapPoints,
            options: {
              icon: new google.maps.MarkerImage('/static/images/map-marker.png', new google.maps.Size(48, 48, 'px', 'px'))
            },
            events: {
              click: function (marker, event, context) {
                let map = $(this).gmap3('get')
                let infowindow = $(this).gmap3({get: {name: 'infowindow'}})
                if (infowindow) {
                  infowindow.open(map, marker)
                  infowindow.setContent(context.data)
                } else {
                  $(this).gmap3({
                    infowindow: {
                      anchor: marker,
                      options: {content: context.data}
                    }
                  })
                }
              }
            }
          },
          styledmaptype: {
            id: 'custom_style',
            options: {
              name: 'Janusz Pol'
            },
            styles: [
              {
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#ffffff'
                  }
                ]
              },
              {
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#616161'
                  }
                ]
              },
              {
                'elementType': 'labels.text.stroke',
                'stylers': [
                  {
                    'color': '#f5f5f5'
                  }
                ]
              },
              {
                'featureType': 'administrative.country',
                'elementType': 'geometry.stroke',
                'stylers': [
                  {
                    'color': '#45c225'
                  },
                  {
                    'weight': 1.5
                  }
                ]
              },
              {
                'featureType': 'administrative.land_parcel',
                'elementType': 'labels',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'administrative.land_parcel',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#bdbdbd'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#eeeeee'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#757575'
                  }
                ]
              },
              {
                'featureType': 'poi.business',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#e5e5e5'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'poi.school',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'on'
                  }
                ]
              },
              {
                'featureType': 'road.arterial',
                'elementType': 'geometry.fill',
                'stylers': [
                  {
                    'color': '#d5d5d5'
                  },
                  {
                    'weight': 1
                  }
                ]
              },
              {
                'featureType': 'road.arterial',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#9e9e9e'
                  }
                ]
              },
              {
                'featureType': 'road.highway',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#a8a8a8'
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'stylers': [
                  {
                    'color': '#d2d2d2'
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'elementType': 'geometry.fill',
                'stylers': [
                  {
                    'color': '#d5d5d5'
                  },
                  {
                    'weight': 1
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'elementType': 'labels',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#9e9e9e'
                  },
                  {
                    'visibility': 'on'
                  }
                ]
              },
              {
                'featureType': 'transit.line',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#dadada'
                  }
                ]
              },
              {
                'featureType': 'transit.station.airport',
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'on'
                  }
                ]
              },
              {
                'featureType': 'transit.station.airport',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'on'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#c9c9c9'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'geometry.fill',
                'stylers': [
                  {
                    'color': '#aae0ff'
                  },
                  {
                    'visibility': 'on'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'labels.text',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              }
            ]
          }
        })
      })
    }
  },
  mounted: function () {
    this.fetchPointsAndThenRenderMap()
  }
}
</script>

<style scoped>
.google-map {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  background: #dedede;
}
</style>
