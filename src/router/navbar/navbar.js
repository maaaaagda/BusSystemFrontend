import Home from '@/pages/home/Home'
import Buyticket from '@/pages/navbar/BuyTicket'
import Busstops from '@/pages/navbar/BusStops'
import Timetables from '@/pages/navbar/Timetables'
import Registration from '@/pages/navbar/Registration'
import Login from '@/pages/navbar/Login'
import Tickets from '@/pages/navbar/Tickets'
import BusLines from '@/pages/navbar/BusLines'
import AllBusLines from '@/components/navbar/AllBusLines'
import BusLineRoute from '@/components/navbar/BusLineRoute'

export default {
  HOME: {
    path: '/',
    name: 'Home',
    component: Home
  },
  BUYTICKET: {
    path: '/buy-ticket',
    name: 'Buyticket',
    component: Buyticket
  },
  BUSSTOPS: {
    path: '/bus-stops',
    name: 'Busstop',
    component: Busstops
  },
  TIMETABLES: {
    path: '/time-tables',
    name: 'Timetables',
    component: Timetables
  },
  REGISTER: {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  LOGIN: {
    path: '/login',
    name: 'Login',
    component: Login
  },
  TICKETS: {
    path: '/user/tickets',
    name: 'Tickets',
    component: Tickets
  },
  BUSLINES: {
    path: '/bus-lines',
    name: 'Bus Lines',
    component: BusLines,
    children: [
      {
        path: '',
        component: AllBusLines
      },
      {
        path: ':id',
        component: BusLineRoute
      }
    ]
  }
}
