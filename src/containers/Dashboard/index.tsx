/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import openSocket from 'socket.io-client';

import { Wallet } from '../../store/types';
import * as actionTypes from '../../store/actions/actionTypes';
import { getUserWallet, getNotifications } from '../../store/actions/wallet';
import { getUser } from '../../store/actions/auth';
import { logOut } from '../../store/actions';
import API from '../../services/api-services';

import Overview from './Routes/Overview';
import Cards from './Routes/Cards';
import Transactions from './Routes/Transactions';
import Utilities from './Routes/Utilities';
import Setting from './Routes/Setting';
import TabMenu from './components/SideBar';
import NotificationBar from './components/Notifications';
import Backdrop from '../../components/Modal/Backdrop';
import constants from '../../utils/constants';

import Logo from '../../assets/images/alp.png';
import Notify from '../../assets/images/dashboard/bxs-bell.png';
import not from '../../assets/images/notification.svg';
import imLogo from '../../assets/images/dashboard/home.png';
import cardLogo from '../../assets/images/dashboard/card.png';
import transactLogo from '../../assets/images/dashboard/transactions.png';
import settings from '../../assets/images/dashboard/set.png';
import './index.scss';

//Wallet reducer
function success(wallet: Wallet) {
  return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
}

const Request = new API();

const Dashboard = () => {
  const history = useHistory();
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: { auth }) => state.auth);
  const { notifications } = useSelector((state: { wallet }) => state.wallet);
  const { mode } = useSelector((state: any) => state.ui);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    const check = async (): Promise<boolean> => {
      try {
        dispatch(getUser());
        dispatch(getUserWallet());
        dispatch(getNotifications());
        const res = await Request.getBanks();
        if (res.banks) {
          setBanks(res.banks);
        }
        return true;
      } catch (error) {
        return false;
      }
    };
    check();
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
          dispatch(success(data.data.wallet));
          dispatch(getNotifications());
        };
        check();
      });
    }

    // return () => socket.disconnect();
  }, [user, dispatch]);

  const { path, url } = useRouteMatch();

  const logOutHandler = async (e) => {
    e.preventDefault();
    dispatch(logOut(user.email));
    history.push('/');
  };

  const deleteNotification = async (id): Promise<void> => {
    await Request.deleteNotification(id);
    dispatch(getNotifications());
  };

  const styles = {
    background: mode === 'dark' ? constants.darkMode : '#f8f8f8',
    color: mode === 'dark' ? '#00C9B6' : '#000',
  };

  const linkStyle = {
    color: mode === 'dark' ? '#00C9B6' : '',
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>alphapay | Dashboard</title>
      </Helmet>
      <section className="dashboard_main" style={styles}>
        <Backdrop show={sidebarOpen || notificationOpen} clicked={() => setSideBarOpen(false)} />
        <NotificationBar
          isActive={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          remove={deleteNotification}
        />

        <div
          className="menu"
          style={{
            background: mode === 'dark' ? constants.darkMode : 'white',
          }}
        >
          <div
            className="logo"
            onClick={() => {
              history.push('/');
            }}
          >
            <img src={Logo} alt="logo_image" />
          </div>
          <div className="sidenav">
            <div className="sidenav_menu">
              <div className="sidenav-list">
                <NavLink to={`${url}/overview`} style={linkStyle}>
                  <img src={imLogo} alt="" />
                  <span> Overview</span>
                </NavLink>
                <NavLink to={`${url}/cards`} style={linkStyle}>
                  <img src={cardLogo} alt="" />
                  <span>Payments</span>
                </NavLink>
                <NavLink to={`${url}/transactions`} style={linkStyle}>
                  <img src={transactLogo} alt="" />
                  <span>Transactions</span>
                </NavLink>
                {/* <NavLink to={`${url}/utilities`} style={linkStyle}>
                  <img src={utilsLogo} alt="" />
                  <span>Utilities</span>
                </NavLink> */}
                <NavLink to={`${url}/settings`} style={linkStyle}>
                  <img src={settings} alt="" />
                  <span>Settings</span>
                </NavLink>
                <p className="custom_link" onClick={logOutHandler} style={linkStyle}>
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="dashboard_nav">
            <div className="notifications">
              <img
                src={notifications && notifications.length > 0 ? not : Notify}
                onClick={() => {
                  setNotificationOpen(true);
                }}
                className="bell"
                alt="notifications"
              />
            </div>

            <div className="profile_details">
              <div className="user">
                <img
                  src={user?.profile_image || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'}
                  alt="profile_image"
                  className="img"
                />
              </div>
            </div>
          </div>
          <section>
            <div className="container">
              <div className="scroll">
                <Switch>
                  <Route path={`${path}/overview`} render={() => <Overview data={banks} />} />
                  <Route path={`${path}/cards`} component={Cards} />
                  <Route path={`${path}/transactions`} component={Transactions} />
                  <Route path={`${path}/utilities`} component={Utilities} />
                  <Route path={`${path}/settings`} component={Setting} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
          </section>
        </div>
      </section>
      <TabMenu url={url} logOutHandler={logOutHandler} />
    </>
  );
};

export default Dashboard;
