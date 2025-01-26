'use client'
import React, { useEffect, useState } from 'react';
import useUserOrder from '../../Hooks/useUserOrder';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import OrderItems from './OrderItems';
import './Order.css';

const Order = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window!==undefined  && window.localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const user = JSON.parse(localStorage.getItem('user'));
  const [orders] = useUserOrder(user?.phone_number);

  return (
    <>
      <Header></Header>
      <section className="mt-5 mb-5">
  <div className="container p-4 mx-auto mb-4 bg-white h-full shadow rounded">
    {orders?.length === 0 ? (
      <h1 className="text-center font-semibold text-2xl text-gray-800">
        আপনার কোন অর্ডার আইটেম পাওয়া যায়নি!
      </h1>
    ) : (
      <>
        <h4 className="m-2 text-center font-semibold text-lg text-gray-800">আপনার অর্ডার লিস্ট</h4>
        <hr className="mx-auto w-1/4 mb-4" />
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-1 mx-auto w-1/2">
          {orders?.map((order) => (
            <OrderItems key={order?.id} order={order} />
          ))}
        </div>
      </>
    )}
  </div>
</section>

      <Footer></Footer>
    </>
  );
};

export default Order;