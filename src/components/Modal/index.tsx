import React from 'react'

import Backdrop from './Backdrop'

import './index.scss'


const Modal = props => {
    let attachedClasses = ['modal', 'close', props.className]
    if (props.open) {
        attachedClasses = ['modal', 'open', props.className]
    }
    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <Backdrop show={props.open} clicked={props.closed} />
                <div className={attachedClasses.join(' ')}>{props.children}</div>
            </div>
        </>
    )
}


export default Modal