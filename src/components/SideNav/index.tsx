import React from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import Button from "../Button";

import Close from "../../assets/images/close.png";
import "./index.scss";

const SideNav = ({ isActive, onClose }: any) => {
  const { isAuth } = useSelector((state: any) => state.auth);

  const handleOnClose = () => {
    $(".sidenav_container").addClass("close-side_nav");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const link = isAuth ? "/dashboard/overview" : "/auth/login";
  const text = isAuth ? "My Dashboard" : "Log In";

  return isActive ? (
    <div className={`sidenav_container ${isActive ? "open-side_nav" : ""}`}>
      <div className="sidenav_content">
        <ul className="menu_list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>

          <li>
            <NavLink to="/careers">Careers</NavLink>
          </li>
          <li>
            <a href="#contact_form">Contact Us</a>
          </li>
          <div className="auth">
            <Button colored>
              <NavLink to={link}>{text}</NavLink>
            </Button>
          </div>
        </ul>

        <div className="close-btn" onClick={handleOnClose}>
          <img src={Close} alt="close_icon" />
        </div>
      </div>
    </div>
  ) : null;
};

export default SideNav;
