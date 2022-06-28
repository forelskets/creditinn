import { Navigate, useRoutes ,Route ,Routes , BrowserRouter} from 'react-router-dom';
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
import RouteLinks from './store/private/RouteLinks';
import PrivateRoute from './store/private/PrivateRoute';
import ProfileSetting from './pages/ProfileSetting';

// ----------------------------------------------------------------------

export default function Router() {

  return(
    <>
    
    <Routes>
    <Route path='/' element={<LogoOnlyLayout/>}>
          <Route index element={<RouteLinks><Login/></RouteLinks>}/>
          </Route>
        <Route path='/dashboard' element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
          <Route path='app' element={<PrivateRoute><DashboardApp /></PrivateRoute>}/>
          <Route path='user' element={<User/>}/>
          <Route path='services' element={<Services/>}/>
          <Route path='application' element={<Application/>}/>
          <Route path='bank' element={<Bank/>}/>
          <Route path='offers' element={<Offer/>}/>
          <Route path='staff' element={<Staff/>}/>
          <Route path='transaction' element={<Transaction/>}/>
          <Route path='userBankDetails' element={<UserBankDetails/>}/>
          <Route path='wishlist' element={<Wishlist/>}/>
          <Route path='withdrawls' element={<Withdrawls/>}/>
          <Route path='useremi' element={<Useremi/>}/>
          <Route path='token' element={<Token/>}/>
          <Route path='profileSetting/:id' element={<ProfileSetting/>}/>
          
        </Route>
        
        
    </Routes>
  
    </>
  )
  

}
