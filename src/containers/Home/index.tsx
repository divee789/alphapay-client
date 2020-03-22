import React from 'react';

import styles from '../../components/Theme'
import ScrollToTop from '../../components/ScrollToTop'
import NavBar from '../../components/NavBar/newBar'
import Header from '../../components/Landing/Header'
import Process from '../../components/Landing/Process'
import Leadership from '../../components/Landing/Staff'
import Contact from '../../components/Landing/Contact'
import Footer from '../../components/Landing/Footer'

import './index.scss'
const Home: React.FC = () => {

    // const { mode } = useSelector((state: any) => state.ui)

    // const styles = {
    //     backgroundColor: mode === 'dark' ? '#011627' : '#fff'
    // }

    return (
        <>
            <main className='main-container' style={styles()}>
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