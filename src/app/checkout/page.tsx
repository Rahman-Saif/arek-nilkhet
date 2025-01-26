'use client'
// import Checkout from '@/components/Checkout/Checkout'
import useProducts from '@/Hooks/useProducts';
import React from 'react'
import dynamic from 'next/dynamic';

const Checkout = dynamic(() => import('@/components/Checkout/Checkout'), { ssr: false });


const page = () => {
  const [ products ]= useProducts();
  return (
    <div>
        <Checkout products={products}/>
    </div>
  )
}

export default page
