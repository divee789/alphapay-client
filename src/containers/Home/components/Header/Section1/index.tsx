/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import Button from '../../../../../components/Button';

import './index.scss';

const Section = () => {
  const history = useHistory();
  return (
    <>
      <section className="section1">
        <div className="info">
          <Fade bottom>
            <h1>
              Send <span>cash</span> to anyone <span>anywhere</span> via your <span>email</span> or{' '}
              <span>phone number</span>
            </h1>
          </Fade>
          <Fade bottom>
            <p>A way to truly go cashless and have a digital wallet.</p>
          </Fade>
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
          <img src="https://c.stocksy.com/a/Vxy100/z9/472657.jpg" alt="payment" />
        </div>
      </section>
    </>
  );
};

export default Section;
