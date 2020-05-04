import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowScrollPosition from '@rehooks/window-scroll-position';

import theme from '../Theme';

import Logo from '../../assets/images/alp.png';
import Hamburger from '../../assets/images/menu.png';

import SideNav from '../SideNav';
import Button from '../Button';

import './newBar.scss';

const Navbar = (props: any) => {
  const { isAuth } = useSelector((state: any) => state.auth);
  const [change, setChange] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changePosition = 150;

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
    background: change ? background : 'transparent',
  };

  const link = isAuth ? '/dashboard/overview' : '/auth/login';
  const text = isAuth ? 'MY DASHBOARD' : 'LOG IN';

  return (
    <>
      <nav className="nav" style={navStyle}>
        <div
          className="logo"
          onClick={() => {
            props.history.push('/');
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
          <div className="auth">
            <NavLink to="/auth/signup">
              <Button className="btn sign">CREATE ACCOUNT</Button>
            </NavLink>
          </div>
          <div className="auth">
            <NavLink to={link}>
              <Button colored className="btn">
                {text}
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="hamburger" onClick={() => setIsActive(!isActive)}>
          <img src={Hamburger} alt="menu_icon" />
        </div>
      </nav>
      <SideNav isActive={isActive} onClose={() => setIsActive(!isActive)} isAuth={isAuth} />
    </>
  );
};

export default withRouter(Navbar);
