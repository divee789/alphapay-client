/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import image2 from '../../../../assets/images/support-team.svg';
import image3 from '../../../../assets/images/security.svg';
import image4 from '../../../../assets/images/task.svg';

import './index.scss';

const Section = () => {
  return (
    <section className="parent_section">
      {/* <h1 style={{ textAlign: 'center' }}>Why alphapay ?</h1> */}
      <section className="section_other">
        <div>
          <img src={image2} alt="customer_support" />
          <h3>Customer Support</h3>
          <p>
            We are available 7 days a week, 24 hours a day.Our agents have ben trained to attend to all scenarios
            without any prejudice or bias
          </p>
        </div>
        <div className="secure_payments_container">
          <img src={image3} alt="secure_payments" />
          <h3>Secure Payments</h3>
          <p>
            We are available 7 days a week, 24 hours a day.Our agents have ben trained to attend to all scenarios
            without any prejudice or bias
          </p>
        </div>
        <div>
          <img src={image4} alt="secure_payments" />

          <h3>Instant Notifications</h3>
          <p>
            We are available 7 days a week, 24 hours a day.Our agents have ben trained to attend to all scenarios
            without any prejudice or bias
          </p>
        </div>
      </section>
      <div className="content_bg">
        <h1>Have a suggestion ?</h1>
        <p>
          We live in an ever evolving world, and we strive to be flexible enough to evolve with it. Have a suggestion on
          how we can make our services better , contact us at alphapay@gmail.com.
        </p>
      </div>
    </section>
  );
};

export default Section;
