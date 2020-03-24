import React from 'react'
import { useSelector } from 'react-redux'


import Backdrop from './Backdrop'

import './index.scss'


const Modal = (props: any) => {

    const { mode } = useSelector((state: any) => state.ui)

    const linkStyle = {
        background: mode === 'dark' ? '#011627' : ''
    }
    let attachedClasses = ['modal', 'default', props.className]
    if (props.open) {
        attachedClasses = ['modal', 'open', props.className]
    }
    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <Backdrop show={props.open} clicked={props.closed} />
                <div className={attachedClasses.join(' ')} style={linkStyle}>
                    <span className="close-modal" onClick={props.closed}>close</span>
                    {props.children}
                </div>
            </div>
        </>
    )
}


export default Modal