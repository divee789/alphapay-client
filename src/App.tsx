/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { RootState } from './store';
import { history } from './utils';
import Landing from './containers/Home';
import NotFound from './containers/404';
import Loading from './components/Loading';
import VerifyEmail from './containers/Auth/verifyEmail';
import PasswordReset from './containers/Auth/ForgotPassword';
import PasswordConfirmation from './containers/Auth/ForgotPassword/PasswordReset';

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
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const routes = (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/auth/login" render={() => (isAuth ? <Redirect to="/dashboard/overview" /> : <Login />)} />
        <Route path="/auth/signup" render={() => (isAuth ? <Redirect to="/dashboard/overview" /> : <Signup />)} />
        <Route path="/auth/2fa" render={() => (isAuth ? <Redirect to="/dashboard/overview" /> : <TwoFa />)} />
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontWeight: 100,
          },
        }}
      />
      <Suspense fallback={<Loading />}>{routes}</Suspense>
    </>
  );
};

export default App;
