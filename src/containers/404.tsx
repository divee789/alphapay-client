import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './404.scss';

const NotFound = (): JSX.Element => {
  return (
    <>
      <main className="not-found-container">
        <section className="solution_header">
          <h1>The Page You Want Does Not Exist</h1>
          <p className="solution_text">
            This might be due to any number of factors such as relocation of the page,or the page could have been
            brought down for maintenance or security reasons, or it may be that this page simply put, never existed in
            the fabric of time.
          </p>
          <Link to="/">
            <Button>Return To Homepage</Button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default NotFound;
