import React from 'react';

import img1 from '../../../../assets/images/auth.jpg';
import circleBg from '../../../../assets/images/circle_do.svg';
import circleBg2 from '../../../../assets/images/circle_doA.svg';
// import img2 from '../../../../assets/images/security.jpg';

import './index.scss';

const WhyAlpha = () => {
  return (
    <section className="why_alpha_section">
      <img src={circleBg} alt="" className="animate_circle" />
      <img src={circleBg2} alt="" className="animate_circle_2" />
      <div className="why_alpha_fees">
        <div className="why_alpha_img">
          <img src={img1} alt="" className="alpha_fees_img_1" />
        </div>
        <div className="why_alpha_fees_text">
          <h2>No Hidden Fees</h2>
          <h2>We Promote Transparency</h2>
          <p>
            We only charge fees for funding your wallet or checking out your wallet, anything else such as transfers,
            payment requests, are absolutely free of charge.We only charge fees for funding your wallet or checking out
            your wallet, anything else such as transfers, payment requests, are absolutely free of charge.
          </p>
        </div>
      </div>

      <div className="why_alpha_security">
        <div className="why_alpha_security_text">
          <h2>Optimal Security</h2>
          <h2>Both for web and native platforms</h2>
          <p>
            We verify our users before activating their accounts. Every transaction carried out on our platform and also
            users personal details is kept private and highly confidential. Data is securely transferred to and from the
            website via SSL and we encrypt all personal information collected using the highest encryption standard
          </p>
        </div>
        <div className="why_alpha_img">
          <img
            src="https://images.idgesg.net/images/article/2017/07/mobile_security_data_protection_shield_thinkstock_655331192-100729678-large.jpg"
            alt=""
            className="alpha_fees_img_2"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyAlpha;
