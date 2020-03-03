import React from 'react';

import './index.scss'

import uniben_logo from '../../assets/images/images.png'


const Loading: React.FC = () => {

    return (
        <>
            <div className='loading_container'>
                <img src={uniben_logo} alt="uniben_logo" />
            </div>
        </>
    )
}


export default Loading