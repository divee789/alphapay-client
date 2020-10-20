/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import theme from '../../../../components/Theme';

import imLogo from '../../../../assets/images/dashboard/home.png';
import cardLogo from '../../../../assets/images/dashboard/card.png';
import transactLogo from '../../../../assets/images/dashboard/transactions.png';
import settings from '../../../../assets/images/dashboard/set.png';
import './index.scss';

const TabMenu = ({ url, logOutHandler }: { url: string; logOutHandler }) => {
  return (
    <div className={'tabmenu_container'} style={theme('white')}>
      <div className="tabmenu_content">
        <div className="tabmenu_list">
          <NavLink to={`${url}/overview`}>
            <img src={imLogo} alt="" />
            <span style={{ color: theme().color }}>Home</span>
          </NavLink>
          <NavLink to={`${url}/payment_requests`}>
            <img src={cardLogo} alt="" />
            <span style={{ color: theme().color }}>Payments</span>
          </NavLink>
          <NavLink to={`${url}/transactions`}>
            <img src={transactLogo} alt="" />
            <span style={{ color: theme().color }}>History</span>
          </NavLink>
          <NavLink to={`${url}/settings`}>
            <img src={settings} alt="" />
            <span style={{ color: theme().color }}>Account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
