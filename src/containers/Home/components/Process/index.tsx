import React from 'react';

import Button from '../../../../components/Button';

import image1 from '../../../../assets/images/image2.jpg';
import image4 from '../../../../assets/images/request-funds.png';

import './index.scss';
const Process = () => {
  return (
    <>
      <div className="section_container">
        <section className="process">
          <div>
            <h1>The Process</h1>
            <h2>About Our Work</h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates temporibus alias cumque
              animi quod sunt officiis vitae dolorem deleniti consequatur quo voluptate culpa odit. Illo fuga distinctio
              cupiditate dolorem!
            </p>
            <p>
              quo voluptate culpa odit. Illo fuga distinctio cupiditate dolore quo voluptate culpa odit. Illo fuga
              distinctio cupiditate dolorem!
            </p>

            <Button colored>Know More</Button>
          </div>
          <div>
            <img src={image1} alt="work_process" />
          </div>
        </section>
        <section className="process process_odd">
          <div>
            <img src={image4} alt="always_help" />
          </div>
          <div>
            <h1>We are here to</h1>
            <h2>always help you</h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates temporibus alias cumque
              animi quod sunt officiis vitae dolorem deleniti consequatur quo voluptate culpa odit. Illo fuga distinctio
              cupiditate dolorem!
            </p>
            <p>
              quo voluptate culpa odit. Illo fuga distinctio cupiditate dolore quo voluptate culpa odit. Illo fuga
              distinctio cupiditate dolorem!
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Process;
