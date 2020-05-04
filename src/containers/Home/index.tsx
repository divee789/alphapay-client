import React from 'react';

import styles from '../../components/Theme';
import ScrollToTop from '../../components/ScrollToTop';
import NavBar from '../../components/NavBar/newBar';
// import Header from './components/Header';
import Section1 from './components/Section1/index';
import Process from './components/Process';
import Leadership from './components/Staff';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './index.scss';
const Home: React.FC = () => {
  return (
    <>
      <main className="main-container" style={styles()}>
        <ScrollToTop />
        <NavBar />
        <Section1 />
        <Process />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
