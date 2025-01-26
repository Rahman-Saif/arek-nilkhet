'use client'
// import Wishlist from '@/components/common/Wishlist/Wishlist'
import useProducts from '@/Hooks/useProducts';
import React from 'react'
import dynamic from 'next/dynamic';

const Wishlist = dynamic(() => import('@/components/common/Wishlist/Wishlist'), { ssr: false });

const page = () => {
    const [ products ]= useProducts();

  return (
    <div>
      <Wishlist allProducts={products} />
    </div>
  )
}

export default page
