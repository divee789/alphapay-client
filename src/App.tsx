import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/actions';
import Request from './services/api-services';
import { Storage } from './services/storage-services';
import decode from 'jwt-decode'
import Landing from './containers/Home'
import Blog from './containers/Blog'
import Careers from './containers/Careers'
import NotFound from './containers/404'
import Loading from './components/Loading'
import VerifyEmail from './components/verifyEmail'
import PasswordReset from './components/ForgotPassword'
import PasswordConfirmation from './components/ForgotPassword/PasswordReset'

import testRave from './components/payments/rave'
import testKorapay from './components/payments/korapay'

const api = new Request(process.env.BASE_URL);


const Signup = React.lazy(() => {
  return import('./containers/Auth/Signup');
});

const Login = React.lazy(() => {
  return import('./containers/Auth/Login');
});
const Dashboard = React.lazy(() => {
  return import('./containers/Dashboard');
});



const App = (props: any) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: any) => state.auth);


  useEffect(() => {
    // const check = async () => {
    //   //Log out user when he closes the browser or browser tab
    //   if (sessionStorage.getItem('logged') !== 'success') {
    //     await dispatch(logout())
    //   }
    //   // log out user if access_token is expired
    //   let isLoggedIn = api.isloggedIn()
    //   console.log('isLoggedIn', isLoggedIn)
    //   if (!isLoggedIn) {
    //     await dispatch(logout())
    //     console.log(isAuth)
    //   }
    // }
    // check()
    const token = Storage.checkAuthentication();
    if (token) {
      const decoded: any = decode(token);
      console.log(decoded);
      console.log(Date.now());
      const refreshToken = Storage.getItem('refreshToken');
      const refreshThreshold = Math.floor((Date.now() + 120000) / 1000);
      if (refreshToken && decoded.exp < refreshThreshold) {
        const check = async () => {
          try {
            const ref = await api.refresh(refreshToken);
            console.log(ref);
            if (ref.status === 401) {
              dispatch(logout(user.email));
            }
          } catch (error) {
            // if refresh token has expired, dispatch LOGOUT THINGS
            console.log('error', error);
            dispatch(logout(user.email));
            throw error;
          }
        };
        check();
      }
    }
  }, [dispatch])


  console.log('auth status', isAuth)

  let routes = (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path='/blog' component={Blog} />
      <Route path='/careers' component={Careers} />
      <Route path="/auth/login" render={props => (isAuth ? <Redirect to="/dashboard/home" /> : <Login />)} />
      <Route path="/auth/signup" render={props => (isAuth ? <Redirect to="/dashboard/home" /> : <Signup />)} />
      <Route path='/verify_email/:token' component={VerifyEmail} />
      <Route path='/password_reset_request' component={PasswordReset} />
      <Route path='/password_reset/:token' component={PasswordConfirmation} />
      <Route path={`/dashboard`} render={props => (isAuth ? <Dashboard /> : <Redirect to="/auth/login" />)} />
      <Route path={'/test/dashboard'} component={Dashboard} />
      <Route path="/404" component={testRave} />
      <Route path="/korapay" component={testKorapay} />
      <Redirect to='/404' />
    </Switch>
  );

  return (

    <Suspense fallback={<Loading />}>{routes}</Suspense>

  );
};

export default App;

