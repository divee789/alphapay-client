import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../../components/Theme';
import ScrollToTop from '../../components/ScrollToTop';
import Header from './Components/Header';
import UseAlpha from './Components/UsesOfAlpha';
import WhyAlpha from './Components/WhyAlpha';
import Section3 from './Components/Section3';
import Footer from './Components/Footer';

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
