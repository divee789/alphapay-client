import React from 'react';
import { NavLink } from 'react-router-dom';

import theme from '../Theme';
import Button from '../Button';

import Close from '../../assets/images/close.png';
import './index.scss';

const SideNav = ({ isActive, onClose, isAuth }: { isActive: boolean; onClose: any; isAuth: boolean }): JSX.Element => {
  return (
    <div
      className={`sidenav_container ${isActive ? 'open-side_nav' : 'close-side_nav'}`}
      style={theme('rgb(255, 255, 255)')}
    >
      <div className="sidenav_content">
        <ul className="menu_list">
          <li>
            <a href="#contact_form">Contact Us</a>
          </li>
          {!isAuth && (
            <li>
              <NavLink to="/auth/signup">Sign Up</NavLink>
            </li>
          )}
          <div className="auth">
            <Button>
              <NavLink to={isAuth ? '/dashboard/overview' : '/auth/login'}>
                {isAuth ? 'My Dashboard' : 'LOG IN'}
              </NavLink>
            </Button>
          </div>
        </ul>

        <div className="close-btn" onClick={onClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
