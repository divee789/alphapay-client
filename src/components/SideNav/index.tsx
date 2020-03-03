import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

import Close from '../../assets/images/close.png'
import './index.scss'

const SideNav = ({ isActive, onClose }) => {
    const handleOnClose = () => {
        $('.sidenav_container').addClass('close-modal');
        setTimeout(() => {
            onClose();
        }, 500);
    }

    return isActive ? (
        <div className={`sidenav_container ${isActive ? 'open-modal' : ''}`}>
            <div className="sidenav_content">
                <ul className="menu_list">
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/careers'>Careers</NavLink>
                    </li>
                    <li>
                        <a href="#contact_form">Contact Us</a>
                    </li>
                </ul>
                <div className="close-btn" onClick={handleOnClose}>
                    <img src={Close} alt='close_icon' />
                </div>
            </div>
        </div>
    ) : null
}


export default SideNav