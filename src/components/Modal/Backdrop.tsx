import React from "react";

const Backdrop = (props: any) => {
  const style1: React.CSSProperties = {
    width: props.show ? "100%" : 0,
    height: props.show ? "100%" : 0,
    position: "fixed",
    zIndex: 99,
    left: 0,
    top: 0,
    background: "rgba(71, 212, 82, 0.1)"
  };

  return props.show ? <div style={style1} onClick={props.clicked}></div> : null;
};

export default Backdrop;
