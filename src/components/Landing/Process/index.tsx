import React from 'react';
import { useSelector } from 'react-redux';


import Button from '../../Button'


import image1 from '../../../assets/images/image2.jpg'
import image4 from '../../../assets/images/image4.jpg'
import Background from '../../../assets/images/contact_bg.jpg'

import './index.scss'
const Process = () => {
    const { mode } = useSelector((state: any) => state.ui)

    const styles = {
        backgroundImage: mode === 'light' ? `url(${Background})` : 'unset'
    }

    return (

        <>
            <div className='section_container' style={styles}>
                <section className='process'>
                    <div>
                        <h1>The Process</h1>
                        <h2>About Our Work</h2>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates temporibus alias cumque animi quod sunt officiis vitae dolorem deleniti consequatur quo voluptate culpa odit. Illo fuga distinctio cupiditate dolorem!
                </p>
                        <p>quo voluptate culpa odit. Illo fuga distinctio cupiditate dolore quo voluptate culpa odit. Illo fuga distinctio cupiditate dolorem!</p>

                        <Button colored>Know More</Button>
                    </div>
                    <div>
                        <img src={image1} alt="work_process" />
                    </div>
                </section>
                <section className='process process_odd'>
                    <div>
                        <img src={image4} alt="always_help" />
                    </div>
                    <div>
                        <h1>We are here to</h1>
                        <h2>always help you</h2>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates temporibus alias cumque animi quod sunt officiis vitae dolorem deleniti consequatur quo voluptate culpa odit. Illo fuga distinctio cupiditate dolorem!
                </p>
                        <p>quo voluptate culpa odit. Illo fuga distinctio cupiditate dolore quo voluptate culpa odit. Illo fuga distinctio cupiditate dolorem!</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Process