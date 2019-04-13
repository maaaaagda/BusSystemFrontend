import Vuex from 'vuex'
import Vue from 'vue'
import user from './user/index'
import addOns from './addons/index'
import news from './news/index'
import bus from './bus/index'
import busline from './busline/index'
import busstops from './busstops/index'
import routes from './route/index'
import timetables from './timetables/index'
import ride from './ride/index'
import schedule from './schedule/index'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    news,
    bus,
    busline,
    busstops,
    routes,
    timetables,
    ride,
    addOns,
    schedule
  }
})
