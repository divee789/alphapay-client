/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowScrollPosition from '@rehooks/window-scroll-position';

import theme from '../Theme';

import Logo from '../../assets/images/alp.png';
import Hamburger from '../../assets/images/menu.png';

import SideNav from '../SideNav';
import Button from '../Button';

import './index.scss';

const Navbar = (props: { history }) => {
  const { isAuth } = useSelector((state: { auth }) => state.auth);
  const [change, setChange] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changePosition = 750;

  const background = theme('white').background;

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
    backgroundColor: background,
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
            className="logo"
            onClick={() => {
              props.history.push('/');
              return;
            }}
          >
            <img src={Logo} alt="alphapay_logo" />
          </div>
          <div className="nav_items">
            {/* <div className="nav_item">
            <NavLink exact to="/">
              Home <span className="circle"></span>
            </NavLink>
          </div>
          <div className="nav_item">
            <NavLink to="/blog">
              Blog<span className="circle"></span>
            </NavLink>
          </div>
          <div className="nav_item">
            <NavLink to="/careers">
              Careers<span className="circle"></span>
            </NavLink>
          </div>
          <div className="nav_item">
            <a href="#contact_form">
              Contact Us<span className="circle"></span>
            </a>
          </div> */}
            {!isAuth && (
              <div className="nav_item">
                <NavLink to="/auth/signup">Sign Up</NavLink>
              </div>
            )}
            <div className="auth">
              <NavLink to={isAuth ? '/dashboard/overview' : '/auth/login'}>
                <Button colored className="btn">
                  {isAuth ? 'My Dashboard' : 'LOG IN'}
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

export default withRouter(Navbar);
