import React from 'react';
import TextLoop from 'react-text-loop';

import Button from '../../../../components/Button';

import payment from '../../../../assets/images/clack3.jpg';
import appstore from '../../../../assets/images/appstore.svg';
import playstore from '../../../../assets/images/playstore.svg';

import './index.scss';

const Section = (): JSX.Element => {
  return (
    <>
      <section className="section1">
        <div className="info">
          <TextLoop fade={true} interval={5000}>
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
          <p>
            Alphapay provides modern and reliable financial services to anyone with a phone number. With Alphapay, you
            can make payments, receive payments and secure your payments with your phone number.
          </p>
          <Button colored className="btn">
            {' '}
            GET STARTED{' '}
          </Button>
          <div className="store">
            <img src={playstore} alt="playstore download" />
            <img src={appstore} alt="appstore download" />
          </div>
        </div>
        <div className="image_container">
          <img src={payment} alt="payment" />
        </div>
      </section>
    </>
  );
};

export default Section;
