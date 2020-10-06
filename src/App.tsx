/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadReCaptcha } from 'react-recaptcha-google';
import SwitchC from 'react-switch';

import { history } from './utils';
import { switchMode } from './store/actions';

import Landing from './containers/Home';
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
  const { isAuth } = useSelector((state: { auth }) => state.auth);
  const { mode, checked } = useSelector((state: { ui }) => state.ui);

  useEffect(() => {
    loadReCaptcha();
  }, []);

  const toggleTheme = async () => {
    if (mode === 'light') {
      localStorage.setItem('mode', 'dark');
      dispatch(switchMode('dark'));
    } else {
      localStorage.setItem('mode', 'light');
      dispatch(switchMode('light'));
    }
  };

  const routes = (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/careers" component={Careers} />
        <Route path="/auth/login" render={() => (isAuth ? <Redirect to="/dashboard/home" /> : <Login />)} />
        <Route path="/auth/signup" render={() => (isAuth ? <Redirect to="/dashboard/home" /> : <Signup />)} />
        <Route path="/auth/2fa" render={() => (isAuth ? <Redirect to="/dashboard/home" /> : <TwoFa />)} />
        <Route path="/auth/verify_email" component={VerifyEmail} />
        <Route path="/auth/password_reset_request" component={PasswordReset} />
        <Route path="/auth/password_reset/:token" component={PasswordConfirmation} />
        <Route path={'/dashboard'} render={() => (isAuth ? <Dashboard /> : <Redirect to="/auth/login" />)} />
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
          uncheckedIcon={<img style={{ width: '100%', height: '100%' }} src={Moon} alt="dark mode" />}
          checkedIcon={<img style={{ width: '100%', height: '100%' }} src={Sun} alt="light mode" />}
        />
      </div>
    </>
  );
};

export default App;
