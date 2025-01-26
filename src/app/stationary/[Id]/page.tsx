'use client'
import StationaryDetail from '@/components/Stationary/StationaryDetail/StationaryDetail'
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import { addToDb } from '@/Utilities/LocalStorage';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const [ products ]= useProducts();
     const [CartItem, setCartItem] = useLocalCart(products);
     const params = useParams();
         const id = params.Id;

  const addToCart = (product) => {
    const newCart = [...CartItem, product];
    setCartItem(newCart);
    addToDb(product.id);
  };
  return (
    <div>
        <StationaryDetail id={id} ></StationaryDetail>

    </div>
  )
}

export default page
