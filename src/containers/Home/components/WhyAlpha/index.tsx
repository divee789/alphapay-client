import React from 'react';

import img1 from '../../../../assets/images/auth.jpg';
import img2 from '../../../../assets/images/security.jpg';

import './index.scss';

const WhyAlpha = () => {
  return (
    <section className="why_alpha_section">
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
          <img src={img2} alt="" className="alpha_fees_img_2" />
        </div>
      </div>
    </section>
  );
};

export default WhyAlpha;
