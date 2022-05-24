import { Switch, Route } from 'react-router-dom';
import toastr from 'toastr';
import './assets/styles/toastr.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import FrontMain from './frontPage/frontMain';

import ApplyLoan from './user/ApplyLoan';
import AdminMain from './admin/AdminMain';
import AdminLogin from './admin/AdminLogin';

import UserMain from './user/UserMain';
import AdminServices from './admin/AdminServices';
import AdminApplication from './admin/AdminApplication';
import AdminDashBoard from './admin/AdminDashBoard';
import AdminBank from './admin/AdminBank';
import AdminOffer from './admin/AdminOffer';
import formReg from './frontPage/sections/formreg';
import privacy from './frontPage/sections/privacy';
import state1 from './user/state1';
import Support from './frontPage/support';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './frontPage/utiles/ForgetPassword/ForgetPassword.js';
toastr.options = {
  positionClass: 'toast-top-center',
};
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={FrontMain} />
        <Route path="/state1" exact component={state1} />
        <Route path="/privacy-policy" exact component={privacy} />
        <Route path="/form" exact component={formReg} />
        <Route path="/support" exact component={Support} />
        <Route path="/forgetPassword" exact component={ForgetPassword} />

        <Route path="/applyloan" component={ApplyLoan} />
        <Route path="/nav" component={UserMain} />
        <Route path="/admin" component={AdminMain} />
        <Route path="/adminLogin" component={AdminLogin} />
        <Route path="/adminOffer" component={AdminOffer} />
        <Route path="/adminServices" component={AdminServices} />
        <Route path="/bank" component={AdminBank} />
        <Route path="/adminDashboard" component={AdminDashBoard} />
        <Route path="/adminApplication" component={AdminApplication} />
        <Route path="/adminBank" component={AdminBank} />
       
      </Switch>
    </div>
  );
}

export default App;