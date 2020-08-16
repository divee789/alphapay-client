/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import theme from '../../../../components/Theme';

import imLogo from '../../../../assets/images/dashboard/home.png';
import cardLogo from '../../../../assets/images/dashboard/card.png';
import transactLogo from '../../../../assets/images/dashboard/transactions.png';
import settings from '../../../../assets/images/dashboard/set.png';
import utilsLogo from '../../../../assets/images/dashboard/utitlity.png';
import Close from '../../../../assets/images/close.png';
import './index.scss';

const SideNav = ({
  isActive,
  onClose,
  url,
  logOutHandler,
}: {
  isActive: boolean;
  onClose;
  url: string;
  logOutHandler;
}) => {
  return (
    <div className={`sidebar_container ${isActive ? 'open-modal' : 'close-modal'}`} style={theme('white')}>
      <div className="sidebar_content">
        <div className="sidenav-list">
          <NavLink to={`${url}/overview`}>
            <img src={imLogo} alt="" />
            <span style={{ color: theme().color }}>Overview</span>
          </NavLink>
          <NavLink to={`${url}/cards`}>
            <img src={cardLogo} alt="" />
            <span style={{ color: theme().color }}>Cards</span>
          </NavLink>
          <NavLink to={`${url}/transactions`}>
            <img src={transactLogo} alt="" />
            <span style={{ color: theme().color }}>Transactions</span>
          </NavLink>
          <NavLink to={`${url}/utilities`}>
            <img src={utilsLogo} alt="" />
            <span style={{ color: theme().color }}>Utilities</span>
          </NavLink>
          <NavLink to={`${url}/settings`}>
            <img src={settings} alt="" />
            <span style={{ color: theme().color }}>Settings</span>
          </NavLink>
          <a href="#" onClick={logOutHandler} style={{ color: theme().color }}>
            Log Out
          </a>
        </div>
        <div className="close-btn" onClick={onClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
