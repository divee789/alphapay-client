import React from 'react';

import theme from '../../components/Theme';
import ScrollToTop from '../../components/ScrollToTop';
import Navbar from '../../components/NavBar';
import Footer from '../Home/components/Footer';
import './index.scss';

import back from '../../assets/images/back.png';
import blogpic from '../../assets/images/code.jpg';

const blogs = [
  {
    id: 1,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 2,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 3,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 4,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 5,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 6,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 7,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 8,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
  {
    id: 9,
    title: 'A Sufficiently long blog title',
    author: 'Divine Olokor',
    date: '14 Feb,2020',
  },
];

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
}

const Home: React.FC = () => {
  return (
    <>
      <main className="main-container" style={theme()}>
        <ScrollToTop />
        <Navbar />
        <section className="blog_section" style={theme()}>
          <header style={theme(`url(${back})`)}>
            <h1>Blog</h1>
            <p>Democratizing Information</p>
          </header>
          <div className="blog_container">
            {blogs.map((blog: Blog) => (
              <div className="blog_card" key={blog.id}>
                <div className="img_container">
                  <img src={blogpic} alt={'blog_pic'} />
                </div>
                <div className="post">
                  <h3 className="title">{blog.title}</h3>
                  <p className="author">
                    By {blog.author} {blog.date}
                  </p>
                  <p className="details">View Details</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
