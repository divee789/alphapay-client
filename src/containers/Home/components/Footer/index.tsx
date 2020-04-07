import React from 'react';

import theme from '../../../../components/Theme';

import logo from '../../../../assets/images/alp.png';

import facebook from '../../../../assets/images/facebook.jpg';
import instagram from '../../../../assets/images/instagram.jpg';
import skype from '../../../../assets/images/skype.jpg';
import what from '../../../../assets/images/What.jpg';

import './index.scss';

const Footer: React.FC = () => (
  <section
    style={{
      ...theme(),
      zIndex: -99999,
      position: 'relative',
      paddingTop: '2rem',
      marginTop: '-5rem',
    }}
  >
    <section className="footer">
      <div className="footer_logo">
        <img src={logo} alt="Logo" className="logo_image" />
      </div>
      <section>
        <div>
          <h4>Contact Us</h4>
          <ul>
            <li>09018913201</li>
            <li>divee789@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4>Our Company</h4>
          <ul>
            <li>About</li>
            <li>Product</li>
            <li>Career</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4>Social Contacts</h4>
          <ul>
            <li>Facebook</li>
            <li>Linked In</li>
            <li>Youtube</li>
            <li>Skype</li>
          </ul>
        </div>
        <div>
          <h4>Address</h4>
          <ul>
            <li>13,Peace avenue</li>
            <li>The Bells,</li>
            <li>Ota,Ogun state,</li>
            <li>Nigeria</li>
          </ul>
        </div>
      </section>
      <div className="logo_container">
        <p>Follow us on</p>
        <div className="social_logos">
          <div>
            <img src={facebook} alt="facebook" />
          </div>
          <div>
            <img src={instagram} alt="instagram" />
          </div>
          <div>
            <img src={skype} alt="skype" />
          </div>
          <div>
            <img src={what} alt="what" />
          </div>
        </div>
      </div>
    </section>
  </section>
);

export default Footer;
