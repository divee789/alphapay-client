import React from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const Button = (props: any) => {
  const { mode } = useSelector((state: any) => state.ui);

  let style: any;

  style = {
    backgroundColor: 'white',
    borderColor: '#9D60EB',
    borderWidth: '1px',
  };

  if (props.dashboard) {
    style = {
      backgroundColor: 'rgba(71, 212, 82, 0.303)',
      color: mode === 'dark' ? 'white' : '#0a2e65',
      fontWeight: '800',
      fontFamily: 'Sailec',
    };
  }

  if (props.colored) {
    style = {
      backgroundImage: 'linear-gradient(to right, #1400FF -150%, #FC199B 130%)',
      color: 'white',
    };
  }

  return (
    <>
      <button
        className={'button ' + props.className}
        style={{ ...style, ...props.style }}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
      >
        {' '}
        {props.children}{' '}
      </button>
    </>
  );
};

export default Button;
