/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import image1 from './../../../../assets/images/undraw2.svg';
import spend from '../../../../assets/images/transfer_money.svg';

import verification from '../../../../assets/images/undraw3.svg';

import './index.scss';

const Section = () => {
  return (
    <>
      <section className="section2">
        <div className="header">
          <h1>Payments made easy.</h1>
          <p>What can you do with alphapay?</p>
        </div>
        <div className="sectionA">
          <div className="info">
            <h2>Send money from your phone with ease.</h2>
            <p>
              Send money to anyone anywhere on their phone number. You can also send money to any bank account in
              Nigeria.All you need to do is press <strong>SEND</strong> and that is it.Your payment will be processed
              faster than a text message.
            </p>
          </div>
          <div className="info_image">
            <img src={image1} alt="Payments made easy" />
          </div>
        </div>
        <div className="sectionA">
          <div className="info_image">
            <img src={verification} alt="Payments made easy" />
          </div>
          <div className="info">
            <h2>Receive money from an alpha with zero charges</h2>
            <p>
              Receive, request and accept payments from any alpha anywhere in the world.All you need is your mobile
              phone.
            </p>
          </div>
        </div>
        <div className="sectionA">
          <div className="info">
            <h2>Spend your money without any hassles</h2>
            <p>
              Pay for your electricity, airtime, and cable TV subscriptions with ease.You can also pay for your shopping
              expenses with alpha merchants.
            </p>
          </div>
          <div className="info_image" style={{ marginLeft: 80 }}>
            <img src={spend} alt="Payments made easy" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section;
