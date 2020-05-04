import React from 'react';
import TextLoop from 'react-text-loop';

import payment from '../../../../assets/images/clack3.jpg';

import './index.scss';

const Section = () => {
  return (
    <>
      <section className="section1">
        <div className="info">
          <TextLoop mask={true} fade={true} interval={5000} springConfig={{ stiffness: 180, damping: 8 }}>
            <h1>
              <span>Empowering</span> <span> mobile wallets via your</span> <span>phone number</span>
            </h1>
            <h1>
              <span>Banking</span> <span>directly with your </span> <span>phone number</span>
            </h1>
            <h1>
              <span>Your wallet</span> <span> is invisible but follows you </span> <span>everywhere</span>
            </h1>
          </TextLoop>
        </div>
        <div className="image_container">
          <img src={payment} alt="payment" />
        </div>
      </section>
    </>
  );
};

export default Section;
