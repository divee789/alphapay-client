import React from 'react';

import card1 from '../../../../assets/images/why_start.jpg';
import card2 from '../../../../assets/images/why_middle.jpg';
import card3 from '../../../../assets/images/why_end.jpg';

import './index.scss';

const UsesOfAlpha = () => {
  return (
    <>
      <section className="use_alpha_section">
        <h1>Designed & built to make your payments easier</h1>
        <div className="use_card_section">
          <div className="use_card a">
            <img src={card1} alt="" />
            <h3>Send Money From Your Phone With Ease</h3>
            <p>Send money to an alpha or to any Nigerian bank account with speed and ease.</p>
          </div>
          <div className="use_card b">
            <img src={card2} alt="" />
            <h3>Receive Money Via Funding or Transfer</h3>
            <p>Receive money from an alpha with instant credit. Fund your wallet from any Nigerian bank.</p>
          </div>
          <div className="use_card c">
            <img src={card3} alt="" />
            <h3>Request For Money</h3>
            <p>Send a payment request to an alpha, all you need is the alpha phone number or email</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UsesOfAlpha;

// box-shadow: 0px 18px 52.8537px rgba(215, 228, 249, 0.5);
