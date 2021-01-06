/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import cx from 'classnames';
import Dots from '../Loaders/Dots';

import './index.scss';

interface PropsInterface {
  dashboard?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: object;
  loading?: boolean;
}

const Button = (props: PropsInterface): JSX.Element => {
  return (
    <>
      <button
        className={cx(props.className, {
          button: true,
          btn_dashboard: props.dashboard,
          btn_colored: !props.dashboard,
        })}
        style={props.style}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
      >
        {props.loading ? <Dots /> : props.children}
      </button>
    </>
  );
};

export default Button;
