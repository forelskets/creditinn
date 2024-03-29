import { Switch, Route } from 'react-router-dom';
import toastr from 'toastr';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import FrontMain from './frontPage/frontMain';
import AboutUs from './frontPage/aboutus';
import ApplyLoan from './user/ApplyLoan';
import terms from './frontPage/sections/terms';

import UserMain from './user/UserMain';
import formReg from './frontPage/sections/formreg';
import privacy from './frontPage/sections/privacy';
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
        <Route path="/privacy-policy" exact component={privacy} />
        <Route path="/terms-and-conditions" exact component={terms} />
        <Route path="/form" exact component={formReg} />
        <Route path="/support" exact component={Support} />
        <Route path="/about" exact component={AboutUs} />
        <Route path="/forgetPassword" exact component={ForgetPassword} />

        <Route path="/applyloan" component={ApplyLoan} />
        <Route path="/nav" component={UserMain} />
       
      </Switch>
    </div>
  );
}

export default App;
