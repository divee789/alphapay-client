import React from 'react';

const Backdrop = (props: { show: boolean; clicked: any }) => {
  const style1: React.CSSProperties = {
    width: props.show ? '100%' : 0,
    height: props.show ? '100%' : 0,
    position: 'fixed',
    zIndex: 5,
    left: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.7)',
  };

  return props.show ? <div style={style1} onClick={props.clicked}></div> : null;
};

export default Backdrop;
