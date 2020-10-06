/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../../../../components/Button';

import payment from '../../../../../assets/images/pos.jpg';

import './index.scss';

const Section = () => {
  const history = useHistory();
  return (
    <>
      <section className="section1">
        <div className="info">
          <h1>
            Send <span>cash</span> to anyone <span>anywhere</span> via your <span>email</span> or{' '}
            <span>phone number</span>
          </h1>
          <p>A way to truly go cashless and have a digital wallet.</p>
          <Button
            colored
            className="btn"
            onClick={() => {
              history.push('/auth/signup');
            }}
          >
            {' '}
            GET STARTED{' '}
          </Button>
        </div>
        <div className="image_container">
          <img src={payment} alt="payment" />
        </div>
      </section>
    </>
  );
};

export default Section;
