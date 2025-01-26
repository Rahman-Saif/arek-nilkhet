'use client'
// import Cart from '@/components/common/Cart/Cart'
import useProducts from '@/Hooks/useProducts';
import React from 'react'
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('@/components/common/Cart/Cart'), { ssr: false });

  

const page = () => {
  // const [ products ]= useProducts();
  return (
    <div>
      <Cart />
    </div>
  )
}

export default page
