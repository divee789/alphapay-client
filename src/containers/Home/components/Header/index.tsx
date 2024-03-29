import React from 'react';
import Navbar from '../../../../components/NavBar';
import HeaderSection from './Section1';
import './index.scss';

const Header = (): JSX.Element => {
  return (
    <header>
      <Navbar />
      <HeaderSection />
    </header>
  );
};

export default Header;
