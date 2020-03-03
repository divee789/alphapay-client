import React from 'react';

import back from '../../../assets/images/back.png'

import './index.scss'

const Header = props => {
    return (
        <>
            <section className='solution_header'>
                <h1>Creating Simple Solutions</h1>
                <p className='h2'>For Complex Payments</p>
                <p className='solution_text'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti asperiores quae reiciendis blanditiis laborum, enim voluptas
                </p>
                <div className="get-started">
                    <form>
                        <div className="form-group" >
                            <input type="text" placeholder="Enter your email" />
                        </div>
                        <button>Get Started</button>
                    </form>
                </div>
            </section>
            <img src={back} className='header_image' />
        </>
    )
}

export default Header
