import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';
import dayjs from 'dayjs';

import { Wallet } from '../../store/types';
import * as actionTypes from '../../store/actions/actionTypes';
import { get_client_wallet, new_notifications } from '../../store/actions/wallet';
import { getUser } from '../../store/actions/auth';
import { logout } from '../../store/actions';
import API from '../../services/api-services';

import Overview from './Routes/Overview';
import Cards from './Routes/Cards';
import Transactions from './Routes/Transactions';
import Utilities from './Routes/Utilities';
import Setting from './Routes/Setting';
import Loading from '../../components/Loading';
import SideBar from './components/SideBar';
import NotificationBar from './components/Notifications';
import Backdrop from '../../components/Modal/Backdrop';
import constants from '../../utils/constants';

import Logo from '../../assets/images/alp.png';
import Notify from '../../assets/images/dashboard/bxs-bell.png';
import not from '../../assets/images/notification.svg';
import im_logo from '../../assets/images/dashboard/home.png';
import card_logo from '../../assets/images/dashboard/card.png';
import transact_logo from '../../assets/images/dashboard/transactions.png';
import settings from '../../assets/images/dashboard/set.png';
import utils_logo from '../../assets/images/dashboard/utitlity.png';
import hamburger from '../../assets/images/menu.png';

import './index.scss';

//Wallet reducer
function success(wallet: Wallet) {
  return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
}

const Request = new API();

const Dashboard = (props: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { processing, notifications } = useSelector((state: any) => state.wallet);
  const { mode } = useSelector((state: any) => state.ui);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    const check = async (): Promise<boolean> => {
      try {
        await dispatch(getUser());
        await dispatch(get_client_wallet());
        await dispatch(new_notifications());
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
      socket.on(`${user.id}-transfer`, (data: any) => {
        const check = async (): Promise<void> => {
          await dispatch(success(data.data.wallet));
          const apiObj = {
            amount: data.data.amount,
            beneficiary: user.phone_number,
            sender: data.data.sender,
            date: dayjs(data.data.date).format('YYYY-MM-DD'),
            identifier: data.data.identifier,
          };
          await Request.makeNotifications(apiObj);
          await dispatch(new_notifications());
        };
        check();
      });
    }

    // return () => socket.disconnect();
  }, [user, dispatch]);

  let { path, url } = useRouteMatch();

  const logOutHandler = async (e): Promise<void> => {
    e.preventDefault();
    await dispatch(logout(user.email));
    props.history.push('/');
  };

  const deleteNotification = async (id): Promise<void> => {
    await Request.deleteNotification(id);
    await dispatch(new_notifications());
  };

  const styles = {
    background: mode === 'dark' ? constants.darkMode : '#f8f8f8',
    color: mode === 'dark' ? '#00C9B6' : '#000',
  };

  const linkStyle = {
    color: mode === 'dark' ? '#00C9B6' : '',
  };

  if (processing) {
    return <Loading />;
  }

  return (
    <>
      <section className="dashboard_main" style={styles}>
        <SideBar isActive={sidebarOpen} onClose={() => setSideBarOpen(false)} url={url} logOutHandler={logOutHandler} />
        <Backdrop show={sidebarOpen} clicked={() => setSideBarOpen(false)} />
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
              props.history.push('/');
            }}
          >
            <img src={Logo} alt="logo_image" />
          </div>
          <div className="sidenav">
            <div className="sidenav_menu">
              <div className="sidenav-list">
                <NavLink to={`${url}/overview`} style={linkStyle}>
                  <img src={im_logo} alt="" />
                  <span> Overview</span>
                </NavLink>
                <NavLink to={`${url}/cards`} style={linkStyle}>
                  <img src={card_logo} alt="" />
                  <span>Cards</span>
                </NavLink>
                <NavLink to={`${url}/transactions`} style={linkStyle}>
                  <img src={transact_logo} alt="" />
                  <span>Transactions</span>
                </NavLink>
                <NavLink to={`${url}/utilities`} style={linkStyle}>
                  <img src={utils_logo} alt="" />
                  <span>Utilities</span>
                </NavLink>
                <NavLink to={`${url}/settings`} style={linkStyle}>
                  <img src={settings} alt="" />
                  <span>Settings</span>
                </NavLink>
                <a href="#" onClick={logOutHandler} style={linkStyle}>
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="dashboard_nav">
            <div
              onClick={() => {
                setSideBarOpen(true);
              }}
              className="open_sidenav"
            >
              <img src={hamburger} className="bell" alt="menu" />
            </div>

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
                <div className="user_info">
                  <span>{user && `${user.first_name} ${user.last_name}`}</span>
                  <span className="mobile_phone">{user && user.phone_number}</span>
                </div>
                <img
                  src={
                    user
                      ? user.profile_image
                        ? user.profile_image
                        : 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
                      : 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
                  }
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
    </>
  );
};

export default withRouter(Dashboard);
