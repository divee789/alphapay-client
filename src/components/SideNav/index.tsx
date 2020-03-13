import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { useSelector } from 'react-redux';
import Button from '../Button'



import Close from '../../assets/images/close.png'
import './index.scss'

const SideNav = ({ isActive, onClose }) => {
    const { isAuth } = useSelector((state: any) => state.auth)

    const handleOnClose = () => {
        $('.sidenav_container').addClass('close-modal');
        setTimeout(() => {
            onClose();
        }, 500);
    }
    let link
    let text
    if (isAuth) {
        link = '/dashboard/overview'
        text = 'My Dashboard'
    } else {
        link = '/auth/login'
        text = 'Log In'
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

                <div className='auth'>
                    <Button colored>
                        <NavLink to={link}>{text}</NavLink>
                    </Button>
                </div>
                <div className="close-btn" onClick={handleOnClose}>
                    <img src={Close} alt='close_icon' />
                </div>
            </div>
        </div>
    ) : null
}


export default SideNav