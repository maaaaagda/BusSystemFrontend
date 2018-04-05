import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from './admin/admin-panel'
import CustomerPanel from './customer/customer-panel'
import BOKPanel from './bok/bok-panel'
import DriverPanel from './driver/driver-panel'
import Navbar from './navbar'
import Pagination from './pagination'
import Map from './map'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    Navbar.HOME,
    Navbar.BUYTICKET,
    Navbar.BUSSTOPS,
    Navbar.TIMETABLES,
    Navbar.LOGIN,
    Navbar.REGISTER,
    Navbar.TICKETS,
    AdminPanel.ADMINPANEL,
    AdminPanel.ADMINBUSLINES2,
    CustomerPanel.CUSTOMERPANEL,
    DriverPanel.DRIVERPANEL,
    BOKPanel.BOKPANEL,
    Pagination.GO,
    Navbar.ADMINISTRATIONPANEL,
    AdminPanel.ADDNEWS,
    Map.MAP
  ]
})
