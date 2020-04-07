import React from 'react';
import TextLoop from 'react-text-loop';

import back from '../../../../assets/images/back.png';

import './index.scss';

const Header = (props: any) => {
  return (
    <>
      <section className="solution_header">
        <h1>Creating Simple Solutions</h1>
        <p className="h2">For Complex Payments</p>
        <p className="solution_text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti asperiores quae reiciendis blanditiis
          laborum, enim voluptas
        </p>

        <TextLoop mask={true} springConfig={{ stiffness: 200, damping: 10 }}>
          <span>No Hidden Fees</span>
          <span>Faster Payments</span>
          <span>Completely and absolutely free</span>
        </TextLoop>
        <div className="get-started">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Enter your email" />
            </div>
            <button>Get Started</button>
          </form>
        </div>
      </section>
      <img src={back} className="header_image" alt="header_image" />
    </>
  );
};

export default Header;
