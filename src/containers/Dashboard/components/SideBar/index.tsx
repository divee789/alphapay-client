import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import im_logo from '../../../../assets/images/dashboard/home.png';
import card_logo from '../../../../assets/images/dashboard/card.png';
import transact_logo from '../../../../assets/images/dashboard/transactions.png';
import settings from '../../../../assets/images/dashboard/set.png';
import utils_logo from '../../../../assets/images/dashboard/utitlity.png';
import Close from '../../../../assets/images/close.png';
import './index.scss';

const SideNav = ({ isActive, onClose, url, logOutHandler }) => {
  const handleOnClose = () => {
    $('.sidebar_container').addClass('close-modal');
    $('.sidebar_container').removeClass('open-modal');
    setTimeout(() => {
      onClose();
    }, 500);
  };
  return isActive ? (
    <div className={`sidebar_container ${isActive ? 'open-modal' : ''}`}>
      <div className="sidebar_content">
        <div className="sidenav-list">
          <NavLink to={`${url}/overview`}>
            <img src={im_logo} alt="" />
            Overview
          </NavLink>
          <NavLink to={`${url}/cards`}>
            <img src={card_logo} alt="" />
            Cards
          </NavLink>
          <NavLink to={`${url}/transactions`}>
            <img src={transact_logo} alt="" />
            Transactions
          </NavLink>
          <NavLink to={`${url}/utilities`}>
            <img src={utils_logo} alt="" />
            Utilities
          </NavLink>
          <NavLink to={`${url}/settings`}>
            <img src={settings} alt="" />
            Settings
          </NavLink>
          <a href="#" onClick={logOutHandler}>
            Log Out
          </a>
        </div>
        <div className="close-btn" onClick={handleOnClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </div>
  ) : null;
};

export default SideNav;
