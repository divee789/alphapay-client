import React from 'react';

import './index.scss';

interface PropsInterface {
  dashboard?: boolean;
  colored?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: object;
}

const Button = (props: PropsInterface): JSX.Element => {
  let style: any;

  style = {
    borderColor: '#47C072',
    borderWidth: '1px',
    backgroundColor: 'white',
  };

  if (props.dashboard) {
    style = {
      backgroundColor: '#0d60d8',
      fontFamily: 'Sailec',
      color: 'white',
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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
