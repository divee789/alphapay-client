import React from 'react';

import styles from '../../components/Theme';
import ScrollToTop from '../../components/ScrollToTop';
import NavBar from '../../components/NavBar/newBar';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
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
        <Section2 />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
