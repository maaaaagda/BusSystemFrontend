import AdminPanel from '@/pages/users/admin/AdminPanel'
import Bus from '@/components/admin/panel/Bus'
import BusLine from '@/components/admin/panel/BusLine'
import BusStop from '@/components/admin/panel/BusStop'
import Driver from '@/components/admin/panel/Driver'
import Route from '@/components/admin/panel/Route'
import BusRide from '@/components/admin/panel/BusRide'
import AllBusLines from '@/components/admin/panel/AllBusLines'
import Schedule from '@/components/admin/panel/LineSchedule'
import BusRides from '@/components/admin/panel/BusRides'
import GenerateRides from '@/components/admin/panel/GenerateRides'
import GenerateRidesList from '@/components/admin/panel/GenerateRidesList'
import GenerateRidesBySchedule from '@/components/admin/panel/GenerateRidesBySchedule'
import Ride from '@/components/admin/panel/Ride'

export default {
  ADMINPANEL: {
    path: '/admin',
    component: AdminPanel,
    children: [
      {
        path: 'buses',
        component: Bus
      },
      {
        path: 'buslines',
        component: BusLine,
        children: [
          {
            path: '',
            component: AllBusLines
          },
          {
            path: ':id/route',
            component: Route
          },
          {
            path: ':id/schedule',
            component: Schedule
          }
        ]
      },
      {
        path: 'busstops',
        component: BusStop
      },
      {
        path: 'drivers',
        component: Driver
      },
      {
        path: 'busrides',
        component: BusRide,
        children: [
          {
            path: '',
            component: BusRides
          },
          {
            path: ':id',
            name: 'Ride',
            component: Ride,
            props: true
          }
        ]
      },
      {
        path: 'generate-rides',
        component: GenerateRides,
        children: [
          {
            path: '',
            component: GenerateRidesList
          },
          {
            path: ':id/generate',
            component: GenerateRidesBySchedule,
            props: true
          }
        ]
      }
    ]
  }
}
