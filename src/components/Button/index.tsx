import React from 'react';

import './index.scss'


const Button = props => {

    let style;

    if (props.colored) {
        style = {
            backgroundImage: 'linear-gradient(to right, #1400FF -150%, #FC199B 130%)',
            color: 'white'
        }
    }

    else {
        style = {
            backgroundColor: 'white',
            borderColor: '#9D60EB',
            borderWidth: '1px'
        }
    }

    return (
        <>
            <button className={'button ' + props.className} style={style} onClick={props.onClick} disabled={props.disabled} type={props.type}> {props.children} </button>
        </>
    )
}

export default Button