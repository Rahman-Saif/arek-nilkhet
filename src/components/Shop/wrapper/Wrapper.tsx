import React from 'react';
import './style.css';

const Wrapper = () => {
  const data = [
    {
      cover: <i className="fa-solid fa-truck-fast"></i>,
      title: 'Cash on Delivery',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fa-solid fa-id-card"></i>,
      title: 'Online Payment',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fa-solid fa-shield"></i>,
      title: 'Secure Shopping ',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fa-solid fa-headset"></i>,
      title: '24/7 Support ',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
  ];
  return (
    <>
      <section className="backgroud wrapper-class p-4 mb-2">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 ">
          {data.map((val, index) => {
            return (
              <div className="col text-center" key={index}>
                <div className="card h-100  p-2  ">
                  <i className="wrapper-icon border border-1 bg-light  mx-auto  p-2 rounded-circle fs-2  ">
                    {val.cover}
                  </i>
                  <div className="card-body">
                    <h5 className="card-title">{val.title}</h5>
                    <p className="card-text">{val.decs}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section> */}
    </>
  );
};

export default Wrapper;
