import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pusher from 'pusher-js';
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import { Wallet } from '../../store/types';
import * as actionTypes from '../../store/actions/actionTypes';
import { get_client_wallet, new_notifications } from '../../store/actions/wallet';
import { getUser } from '../../store/actions/auth';
import { logout } from '../../store/actions';
import API from '../../services/api-services';

import Logo from '../../assets/images/alp.png';
import Notify from '../../assets/images/dashboard/bxs-bell.png';
import not from '../../assets/images/notification.svg';
import im_logo from '../../assets/images/dashboard/home.png';
import card_logo from '../../assets/images/dashboard/card.png';
import transact_logo from '../../assets/images/dashboard/transactions.png';
import settings from '../../assets/images/dashboard/set.png';
import utils_logo from '../../assets/images/dashboard/utitlity.png';
import hamburger from '../../assets/images/menu.png';

import Overview from './Routes/Overview';
import Cards from './Routes/Cards';
import Transactions from './Routes/Transactions';
import Utilities from './Routes/Utilities';
import Setting from './Routes/Setting';
import Loading from '../../components/Loading';
import SideBar from './components/SideBar';
import NotificationBar from './components/Notifications';

import './index.scss';

//Wallet reducer
function success(wallet: Wallet) {
  return { type: actionTypes.walletConstants.FETCH_WALLET_SUCCESS, wallet };
}

const Request = new API();

const Dashboard = (props: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { processing, notifications } = useSelector((state: any) => state.wallet);
  const { mode } = useSelector((state: any) => state.ui);

  const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true,
  });

  useEffect(() => {
    const check = async () => {
      try {
        await dispatch(get_client_wallet());
        await dispatch(getUser());
        return true;
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    };
    const notification = async () => {
      const re = await check();
      if (!re) return;
      const transfer_channel = pusher.subscribe('alphapay');
      if (user) {
        transfer_channel.bind(
          `${user._id}-transfer`,
          async (data) => {
            console.log('pusher working', data.notification_data);
            await dispatch(success(data.notification_data.wallet));
            delete data.notification_data.wallet;
            await Request.makeNotifications({ ...data.notification_data, beneficiary: user.phone_number });
            await dispatch(new_notifications());
          },
          this,
        );
      }

      await dispatch(new_notifications());
    };

    notification();
  }, [dispatch]);
  let { path, url } = useRouteMatch();

  const logOutHandler = async (e) => {
    e.preventDefault();
    await dispatch(logout(user.email));
    props.history.push('/');
  };

  const deleteNotification = async (id) => {
    await Request.deleteNotification(id);
    await dispatch(new_notifications());
  };

  const styles = {
    background: mode === 'dark' ? '#011627' : 'unset',
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
        <NotificationBar
          isActive={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          notifications={notifications}
          remove={deleteNotification}
        />

        <div className="menu">
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
            <div className="profile_details mobile">Account Number: {user && user.phone_number}</div>

            <div
              onClick={() => {
                setSideBarOpen(true);
              }}
              className="open_sidenav"
            >
              <img src={hamburger} className="bell" alt="menu" />
            </div>

            <div className="profile_details">
              <img
                src={notifications ? not : Notify}
                onClick={() => {
                  setNotificationOpen(true);
                }}
                className="bell"
                alt="notifications"
              />
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
              {user && user.first_name} {user && user.last_name}
            </div>
          </div>
          <section>
            <div className="container">
              <div className="scroll">
                <Switch>
                  <Route path={`${path}/overview`} component={Overview} />
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
