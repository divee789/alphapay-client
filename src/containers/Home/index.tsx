import React from 'react';
import { Helmet } from 'react-helmet';

import styles from '../../components/Theme';
import ScrollToTop from '../../components/ScrollToTop';
import Header from './components/Header';
import UseAlpha from './components/UsesOfAlpha';
import WhyAlpha from './components/WhyAlpha';
import Section3 from './components/Section3';
import Footer from './components/Footer';

import './index.scss';

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>alphapay | Home</title>
      </Helmet>
      <main className="main-container" style={styles()}>
        <ScrollToTop />
        <Header />
        <UseAlpha />
        <WhyAlpha />
        <Section3 />
      </main>
      <Footer />
    </>
  );
};

export default Home;
