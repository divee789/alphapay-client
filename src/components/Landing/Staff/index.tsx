import React from 'react';

import Pic from '../../../assets/images/young.jpg'

import './index.scss'
const Staff = props => (
    <>
        <div className="staff_section_container">
            <section className='staff_section'>
                <h1>Our Core Values</h1>
                <div className='card_container'>
                    <div className="card">
                        <img src={Pic} alt="profile_pic" />
                        <h2>Quick <span>Response</span></h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi voluptatum dolor unde? Ullam quam, saepe aperiam.</p>
                    </div>
                    <div className="card">
                        <img src={Pic} alt="profile_pic" />
                        <h2>Great <span>Communication</span></h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi voluptatum dolor unde? Ullam quam, saepe aperiam</p>
                    </div>
                    <div className="card">
                        <img src={Pic} alt="profile_pic" />
                        <h2>Customer <span>Satisfaction</span></h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi voluptatum dolor unde? Ullam quam, saepe aperiam</p>
                    </div>
                </div>
                {/* <div className='paginate'>
                    <span style={{ marginRight: '40px' }}>&laquo;</span>
                    <span >&raquo;</span>
                </div> */}
            </section>
        </div>
    </>
)


export default Staff
