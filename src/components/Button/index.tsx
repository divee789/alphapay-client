import React from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

interface propsInterface {
  dashboard?: boolean;
  colored?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: object;
}

const Button = (props: propsInterface) => {
  const { mode } = useSelector((state: any) => state.ui);

  let style: any;

  style = {
    borderColor: '#47C072',
    borderWidth: '1px',
    color: '#008080',
    backgroundColor: 'white',
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
      backgroundImage: '#47C072',
      color: 'white',
      borderWidth: 0,
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
