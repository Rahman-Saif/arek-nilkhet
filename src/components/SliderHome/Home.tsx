import React from 'react';
import Banners from '../Banner/Banners';
// import './Home.css';

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container-fluid relative">
          <Banners></Banners>
        </div>
      </section>
    </>
  );
};

export default Home;
