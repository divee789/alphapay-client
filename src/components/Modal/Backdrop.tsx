import React from "react"

const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 99,
    left: 0,
    top: 0,
    background: 'rgba(0,0,0,0.6'
}

const Backdrop = (props) => (
    props.show ? <div style={style} onClick={props.clicked}></div> : null
)


export default Backdrop