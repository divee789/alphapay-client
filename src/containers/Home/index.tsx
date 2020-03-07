import React from 'react';

import ScrollToTop from '../../components/ScrollToTop'
import NavBar from '../../components/NavBar/newBar'
import Header from '../../components/Landing/Header'
import Process from '../../components/Landing/Process'
import Leadership from '../../components/Landing/Staff'
import Contact from '../../components/Landing/Contact'
import Footer from '../../components/Landing/Footer'

import './index.scss'
const Home = props => {
    return (
        <>
            <main className='main-container'>
                <ScrollToTop />
                <NavBar />
                <Header />
                <Process />
                <Leadership />
                <Contact />
            </main>
            <Footer />
        </>
    )
}

export default Home