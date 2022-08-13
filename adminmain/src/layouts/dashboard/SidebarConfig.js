// component
import Iconify from '../../components/Iconify';
import jwt_decoder from 'jwt-decode';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const token = localStorage.getItem('adminLogin');

let admin = {};
if (token) {
  admin = jwt_decoder(token);
  console.log(admin, admin.admin.Type, 'adminconfig');
}
const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'services',
    path: '/dashboard/services',
    icon: getIcon('file-icons:service-fabric')
  },
  {
    title: 'Bank',
    path: '/dashboard/bank',
    icon: getIcon('bi:bank')
  },

  {
    title: 'Offer',
    path: '/dashboard/offers',
    icon: getIcon('bxs:offer')
  },
  {
    title: 'Application',
    path: '/dashboard/application',
    icon: getIcon('mdi:application-edit-outline')
  },

  {
    title: 'Refferals',
    path: '/dashboard/staff',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'Transaction',
    path: '/dashboard/transaction',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'UserBankDetails',
    path: '/dashboard/userBankDetails',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'WishList',
    path: '/dashboard/wishlist',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'Withdrawls',
    path: '/dashboard/withdrawls',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'UserEMI',
    path: '/dashboard/useremi',
    icon: getIcon('icon-park-outline:file-staff')
  },
  {
    title: 'Insurances',
    path: '/dashboard/insurances',
    icon: getIcon('ic:outline-token')
  },
  {
    title: 'Sub-Admin',
    path: '/dashboard/subAdmin',
    icon: getIcon('ic:outline-token')
  }
];

export default sidebarConfig;
