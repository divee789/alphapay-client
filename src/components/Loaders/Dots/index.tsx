/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import './index.scss';

const defaultStyleProps = {
  width: '0.6',
  height: '0.6',
  color: '#fff',
  overAllWidth: '2.5',
};

const Dots = (props: { width?: number; height?: number; color?: string }) => (
  <>
    <div
      className="dots_loader"
      style={{
        width: `${props.width || defaultStyleProps.overAllWidth}em`,
      }}
    >
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}em`,
          height: `${props.height / 3 || defaultStyleProps.height}em`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}em`,
          height: `${props.height / 3 || defaultStyleProps.height}em`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}em`,
          height: `${props.height / 3 || defaultStyleProps.height}em`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
    </div>
  </>
);

export default Dots;
