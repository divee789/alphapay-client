/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { withRouter } from 'react-router-dom';
import TextLoop from 'react-text-loop';

import Button from '../../../../components/Button';

import payment from '../../../../assets/images/clack3.jpg';

import './index.scss';

const Section = (props: { history }) => {
  return (
    <>
      <section className="section1">
        <div className="info">
          <TextLoop fade={true} interval={5000}>
            <h1>
              <span>Empowering mobile</span> <span>wallets via your</span> <span>phone number</span>
            </h1>
            <h1>
              <span>Banking</span> <span>directly with your </span> <span>phone number</span>
            </h1>
            <h1>
              <span>Your wallet</span> <span> is invisible but accessible</span> <span>everywhere</span>
            </h1>
          </TextLoop>
          <p>Alphapay provides modern and reliable financial services to anyone with a phone number.</p>
          <Button
            colored
            className="btn"
            onClick={() => {
              props.history.push('/auth/signup');
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

export default withRouter(Section);
