import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import Services from './pages/Services';
import Bank from './pages/Bank';
import Offer from './pages/Offer';
import Staff from './pages/Staff';
import Application from './pages/Application';
import Token from './pages/Token';
import Transaction from './pages/Transaction';
import UserBankDetails from './pages/UserBankDetails';
import Wishlist from './pages/Wishlist';
import Withdrawls from './pages/Withdrawls';
import Useremi from './pages/Useremi';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'services', element: <Services /> },
        { path: 'bank', element: <Bank /> },
        { path: 'offers', element: <Offer /> },
        { path: 'application', element: <Application /> },
        { path: 'staff', element: <Staff /> },
        { path: 'transaction', element: <Transaction /> },
        { path: 'userBankDetails', element: <UserBankDetails /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'withdrawls', element: <Withdrawls /> },
        { path: 'useremi', element: <Useremi /> },
        { path: 'token', element: <Token /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '/', element: <Navigate to="/dashboard" /> }
      ]
    }
  ]);
}
