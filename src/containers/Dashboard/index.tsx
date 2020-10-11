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

import Logo from '../../assets/images/alp.png';
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
              <NavLink to={`${url}/cards`}>
                <img src={cardLogo} alt="" />
                <span>Payments</span>
              </NavLink>
              <NavLink to={`${url}/transactions`}>
                <img src={transactLogo} alt="" />
                <span>Transactions</span>
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
                  <p onClick={(e) => logOutHandler(e)}> Log Out </p>
                </div>
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
