import CustomerPanel from '@/pages/users/customer/CustomerPanel'
import AccountInfo from '@/pages/users/AccountInfo'

export default {
  CUSTOMERPANEL: {
    path: '/customer',
    name: 'CustomerPanel',
    component: CustomerPanel,
    children: [
      {
        path: 'info',
        component: AccountInfo
      }
    ]
  }
}
