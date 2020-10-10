/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import './index.scss';

const defaultStyleProps = {
  width: '0.6em',
  height: '0.6em',
  color: '#fff',
  overAllHeight: '2.5em',
};

const Dots = (props: { width?: number; height?: number; color?: string }) => (
  <>
    <div
      className="dots_loader"
      style={{
        width: `${props.width || defaultStyleProps.overAllHeight}`,
      }}
    >
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}`,
          height: `${props.height / 3 || defaultStyleProps.height}`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}`,
          height: `${props.height / 3 || defaultStyleProps.height}`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
      <div
        style={{
          width: `${props.width / 3 || defaultStyleProps.width}`,
          height: `${props.height / 3 || defaultStyleProps.height}`,
          backgroundColor: `${props.color || defaultStyleProps.color}`,
        }}
      ></div>
    </div>
  </>
);

export default Dots;
