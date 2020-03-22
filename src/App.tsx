import React, { Suspense, useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { history } from './utils'
import { logout, switch_mode } from './store/actions';
import Request from './services/api-services';
import { Storage } from './services/storage-services';
import decode from 'jwt-decode'
import Landing from './containers/Home'
import Blog from './containers/Blog'
import Careers from './containers/Careers'
import NotFound from './containers/404'
import Loading from './components/Loading'
import VerifyEmail from './containers/Auth/verifyEmail'
import PasswordReset from './containers/Auth/ForgotPassword'
import PasswordConfirmation from './containers/Auth/ForgotPassword/PasswordReset'
import './App.scss'



const Signup = React.lazy(() => {
  return import('./containers/Auth/Signup');
});

const Login = React.lazy(() => {
  return import('./containers/Auth/Login');
});
const Dashboard = React.lazy(() => {
  return import('./containers/Dashboard');
});

const api = new Request(process.env.BASE_URL);


const App = (props: any) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: any) => state.auth);
  const [theme, setTheme] = useState(true)


  useEffect(() => {

    const token = Storage.checkAuthentication();
    if (token) {
      const decoded: any = decode(token);
      const refreshToken = Storage.getItem('refreshToken');
      const refreshThreshold = Math.floor((Date.now() + 120000) / 1000);
      if (refreshToken && decoded.exp < refreshThreshold) {
        const check = async () => {
          try {
            const ref = await api.refresh(refreshToken);
            if (ref.status === 401) {
              dispatch(logout(user.email));
            }
          } catch (error) {
            // if refresh token has expired, dispatch LOGOUT THINGS
            dispatch(logout());
            throw error;
          }
        };
        check();
      } else {
        const check2 = async () => {
          //Log out user when he closes the browser or browser tab
          if (sessionStorage.getItem('logged') !== 'success') {
            await dispatch(logout())
          }
          // log out user if access_token is expired
          let isLoggedIn = api.isloggedIn()
          if (!isLoggedIn) {
            console.log(isAuth)
            await dispatch(logout())
          }
        }
        check2()
      }

    } else {
      dispatch(logout())
    }

  }, [dispatch, isAuth])

  const toggleTheme = () => {
    setTheme(!theme)
    if (theme) {
      dispatch(switch_mode('dark'))
    } else {
      dispatch(switch_mode('light'))
    }
  }
  console.log('auth status', isAuth)

  let routes = (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path='/blog' component={Blog} />
        <Route path='/careers' component={Careers} />
        <Route path="/auth/login" render={props => (isAuth ? <Redirect to="/dashboard/home" /> : <Login />)} />
        <Route path="/auth/signup" render={props => (isAuth ? <Redirect to="/dashboard/home" /> : <Signup />)} />
        <Route path='/auth/verify_email' component={VerifyEmail} />
        <Route path='/auth/password_reset_request' component={PasswordReset} />
        <Route path='/auth/password_reset/:token' component={PasswordConfirmation} />
        <Route path={`/dashboard`} render={props => (isAuth ? <Dashboard /> : <Redirect to="/auth/login" />)} />
        <Route path="/404" component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );

  return (
    <>
      <Suspense fallback={<Loading />}>{routes}</Suspense>
      <button onClick={toggleTheme} className='toggle_button'>Toggle theme</button>
    </>

  );
};

export default App;

