/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
// import openSocket from 'socket.io-client';
import {
  logOut,
  getUserTransactions,
  getUser,
  getUserWallet,
  getPaymentRequests,
  // updateWallet,
  getBeneficiaries,
  getBanks,
} from '../../store/actions';
import { RootState } from '../../store';
import Overview from './Routes/Overview';
import Cards from './Routes/Cards';
import Setting from './Routes/Setting';
import Payments from './Routes/Payments';
import TabMenu from './components/TabMenu';
import Loading from '../../components/Loading';
import Logo from '../../assets/images/alp.png';
import './index.scss';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const script = document.createElement('script');
    const alternateScript = document.createElement('script');
    script.src = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js';
    alternateScript.src = 'https://checkout.flutterwave.com/v3.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    const bootstrap = async (): Promise<void> => {
      try {
        setLoading(true);
        await dispatch(getUser());
        await dispatch(getUserWallet());
        await dispatch(getUserTransactions());
        await dispatch(getBeneficiaries());
        await dispatch(getPaymentRequests());
        await dispatch(getBanks());
        setLoading(false);
      } catch (error) {
        console.log('BOOTSTRAP ERROR', error);
        toast.error('There has been an error loading your data, please try again');
        setLoading(false);
      }
    };
    bootstrap();
  }, [dispatch]);

  // useEffect(() => {
  //   const APIBaseURL =
  //     process.env.REACT_APP_NODE_ENV === 'development'
  //       ? process.env.REACT_APP_STAGING
  //       : process.env.REACT_APP_SERVER_URL;

  //   const socket = openSocket(APIBaseURL);

  //   if (user) {
  //     socket.on(`${user.id}-transfer`, (data) => {
  //       const check = async (): Promise<void> => {
  //         dispatch(updateWallet(data.data.wallet));
  //         dispatch(getUserTransactions());
  //       };
  //       check();
  //     });
  //   }

  //   // return () => socket.disconnect();
  // }, [user, dispatch]);

  const { path, url } = useRouteMatch();

  const renderGreeting = () => {
    const currentDate = new Date();
    const hrs = currentDate.getHours();
    if (hrs < 12) return '🌻 Good Morning';
    else if (hrs >= 12 && hrs <= 17) return '🌞 Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) return '🌙 Good Evening';
    return '🌻 Good Day';
  };

  const logOutHandler = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    history.push('/');
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>alphapay | Dashboard</title>
      </Helmet>
      <section className="dashboard_main">
        <div className="main">
          <div className="dashboard_nav">
            <div
              className="logo"
              onClick={() => {
                history.push('/');
              }}
            >
              <img src={Logo} alt="logo_image" />
            </div>
            <div className="nav-list">
              <NavLink to={`${url}/overview`}>
                <span> Overview</span>
              </NavLink>
              <NavLink to={`${url}/payments`}>
                <span>Payments</span>
              </NavLink>
              <NavLink to={`${url}/cards`}>
                <span>Cards</span>
              </NavLink>
              <NavLink to={`${url}/messages`}>
                <span>Messages</span>
              </NavLink>
            </div>
            <div className="dashboard_nav_profile">
              <NavLink to={`${url}/settings`}>
                <img
                  src={user?.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
                  alt="profile_image"
                />
              </NavLink>
            </div>
          </div>
          <section className="dashboard_content">
            <h1>
              {renderGreeting()}, {user?.username}!
            </h1>
            <main>
              <Switch>
                <Route path={`${path}/overview`} component={Overview} />
                <Route path={`${path}/cards`} component={Cards} />
                <Route path={`${path}/settings`} component={Setting} />
                <Route path={`${path}/payments`} component={Payments} />
                <Route path={`${path}/messages`} component={Cards} />
                <Redirect to="/" />
              </Switch>
            </main>
          </section>
        </div>
      </section>
      <footer style={{ marginTop: '5rem' }}>
        <p style={{ textAlign: 'center' }}>All rights reserved. Property of @alphapay and co.</p>
      </footer>
      <TabMenu url={url} logOutHandler={logOutHandler} />
    </>
  );
};

export default Dashboard;
