import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from './users/admin/admin-panel'
import CustomerPanel from './users/customer/customer-panel'
import DriverPanel from './users/driver/driver-panel'
import BOKPanel from './users/bok/bok-panel'
import Navbar from './navbar/navbar'
import Pagination from './home/pagination'
import Map from './map'
import ConnectionSearchResult from './connectionSearchResults/connectionSearchResults'
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
    Navbar.BUSLINES,
    AdminPanel.ADMINPANEL,
    CustomerPanel.CUSTOMERPANEL,
    DriverPanel.DRIVERPANEL,
    BOKPanel.BOKPANEL,
    Pagination.GO,
    Map.MAP,
    ConnectionSearchResult.CONNECTION_SEARCH_RESULT
  ]
})
