import React from 'react';
import TextLoop from 'react-text-loop';

import Button from '../../../../components/Button';

import payment from '../../../../assets/images/clack3.jpg';
import appstore from '../../../../assets/images/appstore.svg';
import playstore from '../../../../assets/images/playstore.svg';

import './index.scss';

const Section = () => {
  return (
    <>
      <section className="section1">
        <div className="info">
          <TextLoop fade={true} interval={5000}>
            <h1>
              <span>Empowering</span> <span> mobile wallets via your</span> <span>phone number</span>
            </h1>
            <h1>
              <span>Banking</span> <span>directly with your </span> <span>phone number</span>
            </h1>
            <h1>
              <span>Your wallet</span> <span> is invisible but follows you </span> <span>everywhere</span>
            </h1>
          </TextLoop>
          <p>
            Alphapay provides modern and reliable financial services to anyone with a phone number. With Alphapay, you
            can make payments, receive payments and secure your payments with your phone number.
          </p>
          <Button colored className="btn">
            {' '}
            GET STARTED{' '}
          </Button>
          <div className="store">
            <img src={playstore} alt="playstore download" />
            <img src={appstore} alt="appstore download" />
          </div>
        </div>
        <div className="image_container">
          <img src={payment} alt="payment" />
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={'#fff'}
          fill-opacity="1"
          d="M0,128L26.7,149.3C53.3,171,107,213,160,202.7C213.3,192,267,128,320,122.7C373.3,117,427,171,480,202.7C533.3,235,587,245,640,213.3C693.3,181,747,107,800,69.3C853.3,32,907,32,960,74.7C1013.3,117,1067,203,1120,213.3C1173.3,224,1227,160,1280,138.7C1333.3,117,1387,139,1413,149.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Section;
