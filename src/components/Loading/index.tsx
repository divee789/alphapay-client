import React from 'react';

import theme from '../Theme';

import './index.scss';

import uniben_logo from '../../assets/images/images.png';

const Loading: React.FC = () => {
  return (
    <>
      <div className="loading_container" style={theme()}>
        <div>
          <img src={uniben_logo} alt="uniben_logo" />
        </div>
      </div>
    </>
  );
};

export default Loading;
