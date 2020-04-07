import React from 'react';

import ScrollToTop from '../../components/ScrollToTop';
import Navbar from '../../components/NavBar/newBar';
import Button from '../../components/Button';
import Contact from '../Home/components/Contact';
import Footer from '../Home/components/Footer';
import { Player } from 'video-react';
import theme from '../../components/Theme';

import image1 from '../../assets/images/mart.jpg';
import image2 from '../../assets/images/work1.jpg';
import image3 from '../../assets/images/work2.jpg';
import image5 from '../../assets/images/work4.jpg';
import clock from '../../assets/images/clock.png';

import './index.scss';

const positions = [
  {
    id: 1,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
  {
    id: 2,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
  {
    id: 3,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
  {
    id: 4,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
  {
    id: 5,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
  {
    id: 6,
    title: 'React Developer',
    address: 'Lekki,Lagos',
    text:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt',
    time: '11 hours ago',
  },
];

interface Position {
  title: string;
  address: string;
  text: string;
  time: string;
}

const Careers = (props: any) => {
  return (
    <>
      <main className="main-container" style={theme()}>
        <ScrollToTop />
        <Navbar />
        <section className="careers_section">
          <header style={theme('url("../../assets/images/contact_bg.jpg")')}>
            <h1>Career</h1>
            <p>Talent oriented</p>
          </header>
          <div className="careers_info">
            <h2>
              Why <span>alphapay??</span>
            </h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa explicabo tenetur in aliquam, modi
              reprehenderit? Vitae fugit excepturi officiis repellat iusto nesciunt
            </p>
            <div className="video_container">
              <Player>
                <source src="/letter.webm" />
              </Player>
            </div>
          </div>
          <div className="life_info">
            <h2>
              <span>Life at</span> alphapay
            </h2>
            <div className="image_container1">
              <div className="imc_1">
                <img src={image1} alt="" />
              </div>
              <div className="imc_2">
                <img src={image2} alt="" />
                <img src={image3} alt="" />
              </div>
              <div className="imc_3">
                <img src={image5} alt="" />
              </div>
            </div>
            <div className="image_container1">
              <div className="imc_2">
                <img src={image2} alt="" />
                <img src={image3} alt="" />
              </div>
              <div className="imc_3">
                <img src={image5} alt="" />
              </div>
              <div className="imc_1">
                <img src={image1} alt="" />
              </div>
            </div>
          </div>

          <div className="available_positions">
            <h2>
              <span>Find your seat </span>at our table
            </h2>
            <div className="btn_positions">
              <Button className="bordered">All Together</Button>
              <Button className="bordered">Designer</Button>
              <Button className="bordered">Developer</Button>
              <Button className="bordered">Management</Button>
            </div>

            <div className="available_positions_container">
              {positions.map((item: Position) => (
                <div className="position_card">
                  <h3>{item.title}</h3>
                  <p className="address">{item.address}</p>
                  <hr />
                  <p className="details_info">{item.text}</p>
                  <p className="time">
                    <img src={clock} alt="clock" />
                    <span>{item.time}</span>
                  </p>
                  <Button className="bordered">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Careers;
