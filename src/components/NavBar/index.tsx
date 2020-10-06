/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowScrollPosition from '@rehooks/window-scroll-position';

import theme from '../Theme';

import Logo from '../../assets/images/alp.png';
import Hamburger from '../../assets/images/menu.png';

import SideNav from '../SideNav';
import Button from '../Button';

import './index.scss';

const Navbar = () => {
  const history = useHistory();
  const { isAuth } = useSelector((state: { auth }) => state.auth);
  const [change, setChange] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changePosition = 550;

  const background = theme('#f3f8ff').background;

  const position = useWindowScrollPosition();

  if (position.y > changePosition && !change) {
    setChange(true);
  }

  if (position.y <= changePosition && change) {
    setChange(false);
  }

  const navStyle: React.CSSProperties = {
    transition: 'all 0.5s',
    boxShadow: change ? '0px 2px 13px -4px rgba(0,0,0,0.15)' : 'unset',
    backgroundColor: change ? '#fff' : background,
    position: 'fixed',
    zIndex: 999,
    top: 0,
    right: 0,
    left: 0,
  };

  return (
    <>
      <nav className="nav" style={navStyle}>
        <div className="nav_content">
          <div
            className="nav_logo"
            onClick={() => {
              history.push('/');
              return;
            }}
          >
            <img src={Logo} alt="alphapay_logo" />
          </div>

          <div className="nav_item_links">
            <div className="nav_item">
              <NavLink exact to="/about">
                About
              </NavLink>
            </div>
            <div className="nav_item">
              <NavLink to="/blog">Blog</NavLink>
            </div>
            <div className="nav_item">
              <NavLink to="/careers">Careers</NavLink>
            </div>
            <div className="nav_item">
              <a href="#contact_form">Contact Us</a>
            </div>
          </div>

          <div className="nav_items">
            {!isAuth && (
              <div className="nav_item">
                <NavLink to="/auth/signup">Sign Up</NavLink>
              </div>
            )}
            <div className="auth">
              <NavLink to={isAuth ? '/dashboard/overview' : '/auth/login'}>
                <Button colored className="btn">
                  {isAuth ? 'MY DASHBOARD' : 'LOG IN'}
                </Button>
              </NavLink>
            </div>
          </div>
          <div className="hamburger" onClick={(): void => setIsActive(!isActive)}>
            <img src={Hamburger} alt="menu_icon" />
          </div>
        </div>
      </nav>
      <SideNav isActive={isActive} onClose={(): void => setIsActive(!isActive)} isAuth={isAuth} />
    </>
  );
};

export default Navbar;
