import React from 'react';
import { useSelector } from 'react-redux';

import image1 from './../../../../assets/images/cell1.jpg';
import image2 from '../../../../assets/images/support-team.svg';
import image3 from '../../../../assets/images/security.svg';
import image4 from '../../../../assets/images/task.svg';
import image5 from '../../../../assets/images/work4.jpg';

import './index.scss';

const Section = () => {
  const { mode } = useSelector((state: any) => state.ui);

  const style = {
    backgroundColor: '#242729',
  };

  return (
    <>
      <section className="section2">
        <div className="header">
          <h1>Payments made easy.</h1>
          <p>What can you do with alphapay?</p>
        </div>
        <div className="detail" style={mode == 'dark' ? style : null}>
          <div className="detail_1">
            <img src={image1} alt="Payments made easy" />
          </div>
          <div className="detail_2">
            <div>
              <h3>Send Money</h3>
              <p>
                Send money to anyone anywhere on their phone number. You can also send money to any bank account in
                Nigeria.All you need to do is press <strong>SEND</strong> and that is it.Your payment will be processed
                faster than a text message.
              </p>
            </div>
            <div>
              <h3>Receive Money</h3>
              <p>
                Receive and accept payments from anyone anywhere with their phone number.You can also accept payments
                from any bank in Nigeria.All you need is your mobile phone.
              </p>
            </div>
            <div>
              <h3>Spend Money</h3>
              <p>
                Pay for your electricity, airtime, and cable TV subscriptions with ease.You can also pay for your
                shopping expenses with merchants who have account with us.
              </p>
            </div>
          </div>
        </div>

        <div className="other">
          <div>
            <img src={image2} />
            <h3>Customer Support</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
          <div>
            <img src={image3} />
            <h3>Secure Payments</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
          <div>
            <img src={image4} />
            <h3>Instant Notifications</h3>
            <p>
              We possess world class customer care facilities.We are available for all your needs 7 days a week, 24
              hours a day.Our agents have ben trained to attend to all scenarios without any prejudice or bias
            </p>
          </div>
        </div>

        <div className="other2">
          <div className="suggest">
            <h1>Have a suggestion ?</h1>
            <p>
              We live in an ever evolving world, and we strive tobe fleible enough to evolve with it. Have a suggestion
              on how we can make our services better , contact us at alphapay@gmail.com.
            </p>
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
