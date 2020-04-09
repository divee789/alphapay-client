import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useWindowScrollPosition from '@rehooks/window-scroll-position';
import SideNav from '../SideNav';
import theme from '../Theme';

import Logo from '../../assets/images/alp.png';
import Hamburger from '../../assets/images/menu.png';

import Button from '../Button';

import './newBar.scss';
const Navbar = (props: any) => {
  const { isAuth } = useSelector((state: any) => state.auth);
  const [change, setChange] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changePosition = 985;

  const position = useWindowScrollPosition();

  if (position.y > changePosition && !change) {
    setChange(true);
  }

  if (position.y <= changePosition && change) {
    setChange(false);
  }

  const style: React.CSSProperties = {
    backgroundColor: 'white',
    boxShadow: change ? '0px 2px 13px -4px rgba(0,0,0,0.15)' : 'unset',
    transition: '100ms ease',
    position: change ? 'fixed' : 'relative',
    zIndex: 99,
    right: 0,
    left: 0,
    top: 0,
  };
  const navStyle: React.CSSProperties = {
    marginBottom: change ? '0' : '0',
    marginTop: change ? 0 : '30px',
    transition: 'all 0.5s',
    paddingTop: change ? 0 : '30px',
    backgroundColor: 'unset',
  };

  const link = isAuth ? '/dashboard/overview' : '/auth/login';
  const text = isAuth ? 'My Dashboard' : 'Log In';

  return (
    <>
      <div className="nav_container" style={{ ...style, ...theme() }}>
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
            <div className="nav_item">
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
            </div>
            <div className="auth">
              <Button colored>
                <NavLink to={link}>{text}</NavLink>
              </Button>
            </div>
          </div>
          <div className="hamburger" onClick={() => setIsActive(!isActive)}>
            <img src={Hamburger} alt="menu_icon" />
          </div>
        </nav>
        <SideNav isActive={isActive} onClose={() => setIsActive(!isActive)} />
      </div>
    </>
  );
};

export default withRouter(Navbar);
