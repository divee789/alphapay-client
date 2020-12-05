/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import openSocket from 'socket.io-client';

import {
  logOut,
  getUserTransactions,
  getUser,
  getUserWallet,
  getNotifications,
  getPaymentRequests,
  updateWallet,
} from '../../store/actions';
import API from '../../services/api-services';

import Overview from './Routes/Overview';
import Cards from './Routes/Cards';
import Transactions from './Routes/Transactions';
import Utilities from './Routes/Utilities';
import Setting from './Routes/Setting';
import PaymentRequest from './Routes/PaymentRequest';

import TabMenu from './components/SideBar';
import NotificationBar from './components/Notifications';
import Backdrop from '../../components/Modal/Backdrop';

import Logo from '../../assets/images/alp.png';
import imLogo from '../../assets/images/dashboard/home.png';
import cardLogo from '../../assets/images/dashboard/card.png';
import settings from '../../assets/images/dashboard/set.png';
import './index.scss';

const Request = new API();

const Dashboard = () => {
  const history = useHistory();
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: { auth }) => state.auth);

  useEffect(() => {
    const script = document.createElement('script');
    const alternateScript = document.createElement('script');
    script.src = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js';
    alternateScript.src = 'https://checkout.flutterwave.com/v3.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(alternateScript);

    const bootstrap = async (): Promise<boolean> => {
      try {
        dispatch(getUser());
        dispatch(getUserWallet());
        dispatch(getUserTransactions());
        dispatch(getNotifications());
        dispatch(getPaymentRequests());
        const res = await Request.getBanks();
        if (res.banks) {
          setBanks(res.banks);
        }
        return true;
      } catch (error) {
        return false;
      }
    };
    bootstrap();
  }, [dispatch]);

  useEffect(() => {
    const APIBaseURL =
      process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_STAGING
        : process.env.REACT_APP_SERVER_URL;

    const socket = openSocket(APIBaseURL);

    if (user) {
      socket.on(`${user.id}-transfer`, (data) => {
        const check = async (): Promise<void> => {
          dispatch(updateWallet(data.data.wallet));
          dispatch(getUserTransactions());
        };
        check();
      });
    }

    // return () => socket.disconnect();
  }, [user, dispatch]);

  const { path, url } = useRouteMatch();

  const renderGreeting = () => {
    const currentDate = new Date();
    const hrs = currentDate.getHours();

    if (hrs < 12) return '🌄 Good Morning';
    else if (hrs >= 12 && hrs <= 17) return '🌞 Good Afternoon';
    else if (hrs >= 17 && hrs <= 24) return '🌙 Good Evening';

    return '🌻 Good Day';
  };

  const logOutHandler = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    history.push('/');
  };

  const deleteNotification = async (id): Promise<void> => {
    await Request.deleteNotification(id);
    dispatch(getNotifications());
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>alphapay | Dashboard</title>
      </Helmet>
      <section className="dashboard_main">
        <Backdrop show={sidebarOpen || notificationOpen} clicked={() => setSideBarOpen(false)} />
        <NotificationBar
          isActive={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          remove={deleteNotification}
        />

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
            <div className="sidenav-list">
              <NavLink to={`${url}/overview`}>
                <img src={imLogo} alt="" />
                <span> Overview</span>
              </NavLink>
              <NavLink to={`${url}/payment_requests`}>
                <img src={cardLogo} alt="" />
                <span>Payments</span>
              </NavLink>
            </div>
            <div className="dashboard_nav_profile">
              <img
                src={user?.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
                alt="profile_image"
              />
              <div className="dropdown_content">
                <p>
                  {user?.first_name} {user?.last_name}
                </p>
                <hr />
                <div className="navcard_actions">
                  <NavLink to={`${url}/settings`}>
                    <img src={settings} alt="" />
                    <span>My Profile</span>
                  </NavLink>
                  <p onClick={(e) => logOutHandler(e)}>
                    <img src="https://img.freepik.com/free-icon/logout_318-10026.jpg?size=338&ext=jpg" alt="logout" />
                    Log Out
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="dashboard_content">
            <aside>
              <section>
                <h1>
                  {renderGreeting()}, {user?.username}!
                </h1>
              </section>
            </aside>
            <main>
              <Switch>
                <Route path={`${path}/overview`} render={() => <Overview data={banks} />} />
                <Route path={`${path}/cards`} component={Cards} />
                <Route path={`${path}/transactions`} component={Transactions} />
                <Route path={`${path}/utilities`} component={Utilities} />
                <Route path={`${path}/settings`} component={Setting} />
                <Route path={`${path}/payment_requests`} component={PaymentRequest} />
                <Redirect to="/" />
              </Switch>
            </main>
          </section>
        </div>
      </section>
      <TabMenu url={url} logOutHandler={logOutHandler} />
    </>
  );
};

export default Dashboard;
