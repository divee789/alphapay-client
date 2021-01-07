/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import imLogo from '../../../../assets/images/dashboard/home.png';
import cardLogo from '../../../../assets/images/dashboard/card.png';
import settings from '../../../../assets/images/dashboard/set.png';
import './index.scss';

const TabMenu = ({ url, logOutHandler }: { url: string; logOutHandler }) => {
  return (
    <div className={'tabmenu_container'}>
      <div className="tabmenu_content">
        <div className="tabmenu_list">
          <NavLink to={`${url}/overview`}>
            <img src={imLogo} alt="" />
            <span>Home</span>
          </NavLink>
          <NavLink to={`${url}/payments`}>
            <img src={cardLogo} alt="" />
            <span>Payments</span>
          </NavLink>
          <NavLink to={`${url}/settings`}>
            <img src={settings} alt="" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
