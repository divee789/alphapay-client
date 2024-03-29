import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styles from '../components/Theme';

const NotFound = () => {
  return (
    <>
      <main className="main-container" style={styles()}>
        <NavBar />

        <section className="solution_header">
          <h1>The Page You Want</h1>
          <p className="h2">Does Not Exist</p>
          <p className="solution_text">
            This might be due to any number of factors such as relocation of the page,or the page could have been
            brought down for maintenance or security reasons, or it may be that this page simply put never existed in
            the fabric of time.
          </p>
          <div className="get-started">
            <Link to="/">Return to Homepage</Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
