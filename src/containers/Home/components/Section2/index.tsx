/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useSelector } from 'react-redux';

import image1 from './../../../../assets/images/undraw2.svg';
import image2 from '../../../../assets/images/support-team.svg';
import spend from '../../../../assets/images/transfer_money.svg';
import image3 from '../../../../assets/images/security.svg';
import image4 from '../../../../assets/images/task.svg';
import image5 from '../../../../assets/images/undraw1.svg';

import verification from '../../../../assets/images/undraw3.svg';

import './index.scss';

const Section = () => {
  const { mode } = useSelector((state: { ui }) => state.ui);

  const style = {
    backgroundColor: '#242729',
  };

  const divStyle = mode === 'dark' ? { background: '' } : { background: 'white' };
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

        <div className="other" style={mode === 'dark' ? style : null}>
          <div>
            <img src={image2} alt="customer_support" />
            <h3>Customer Support</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
          <div>
            <img src={image3} alt="secure_payments" />
            <h3>Secure Payments</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
          <div>
            <img src={image4} alt="secure_payments" />

            <h3>Instant Notifications</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
        </div>

        <div className="other2" style={mode === 'dark' ? style : null}>
          <div className="suggest">
            <div style={divStyle} className="content_bg">
              <h1>Have a suggestion ?</h1>
              <p>
                We live in an ever evolving world, and we strive to be flexible enough to evolve with it. Have a
                suggestion on how we can make our services better , contact us at alphapay@gmail.com.
              </p>
            </div>
          </div>
          <div className="suggest_image">
            <img src={image5} alt="work" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Section;
