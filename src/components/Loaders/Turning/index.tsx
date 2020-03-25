import React from "react";
import { useSelector } from 'react-redux'
import './index.scss'

const Turning = (props) => {

    const { mode } = useSelector((state: any) => state.ui)


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="lds-circle"><div style={{ backgroundColor: mode === 'dark' ? '#00C9B6' : '#011627' }}></div></div>
        </div>
    )

}

export default Turning