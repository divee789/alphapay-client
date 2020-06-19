import React, { Suspense, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadReCaptcha } from 'react-recaptcha-google';
import SwitchC from 'react-switch';

import { history } from './utils';
import { switch_mode } from './store/actions';

import Landing from './containers/Home';
import Blog from './containers/Blog';
import Careers from './containers/Careers';
import NotFound from './containers/404';
import Loading from './components/Loading';
import VerifyEmail from './containers/Auth/verifyEmail';
import PasswordReset from './containers/Auth/ForgotPassword';
import PasswordConfirmation from './containers/Auth/ForgotPassword/PasswordReset';

import Moon from './assets/images/moon.png';
import Sun from './assets/images/idea.png';
import './App.scss';

const Signup = React.lazy(() => {
  return import('./containers/Auth/Signup');
});

const Login = React.lazy(() => {
  return import('./containers/Auth/Login');
});

const TwoFa = React.lazy(() => {
  return import('./containers/Auth/TwoFa');
});

const Dashboard = React.lazy(() => {
  return import('./containers/Dashboard');
});

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: any) => state.auth);
  const { mode, checked } = useSelector((state: any) => state.ui);

  useEffect(() => {
    loadReCaptcha();
  }, ['']);

  const toggleTheme = async () => {
    if (mode === 'light') {
      localStorage.setItem('mode', 'dark');
      dispatch(switch_mode('dark'));
    } else {
      localStorage.setItem('mode', 'light');
      dispatch(switch_mode('light'));
    }
  };

  let routes = (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/loading" component={Loading} />
        <Route path="/blog" component={Blog} />
        <Route path="/careers" component={Careers} />
        <Route path="/auth/login" render={(props) => (isAuth ? <Redirect to="/dashboard/home" /> : <Login />)} />
        <Route path="/auth/signup" render={(props) => (isAuth ? <Redirect to="/dashboard/home" /> : <Signup />)} />
        <Route path="/auth/2fa" render={(props) => (isAuth ? <Redirect to="/dashboard/home" /> : <TwoFa />)} />
        <Route path="/auth/verify_email" component={VerifyEmail} />
        <Route path="/auth/password_reset_request" component={PasswordReset} />
        <Route path="/auth/password_reset/:token" component={PasswordConfirmation} />
        <Route path={'/dashboard'} render={(props) => (isAuth ? <Dashboard /> : <Redirect to="/auth/login" />)} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );

  return (
    <>
      <Suspense fallback={<Loading />}>{routes}</Suspense>
      <div className="toggle_button">
        <SwitchC
          onChange={toggleTheme}
          checked={checked}
          uncheckedIcon={<img style={{ width: '100%', height: '100%' }} src={Moon} />}
          checkedIcon={<img style={{ width: '100%', height: '100%' }} src={Sun} />}
        />
      </div>
    </>
  );
};

export default App;
