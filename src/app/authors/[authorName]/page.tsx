'use client'
import AuthorDetails from '@/components/AuthorsPage/AuthorDetails/AuthorDetails'
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import { addToDb } from '@/Utilities/LocalStorage';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const  [products] = useProducts();// not sure if it fits here
      const [CartItem, setCartItem] = useLocalCart(products);

      const params = useParams();
        // const authorName = decodeURIComponent(params.authorName);
              const authorNameParam = Array.isArray(params.authorName) ? params.authorName[0] : params.authorName;
      const authorName = decodeURIComponent(authorNameParam);

  const addToCart = (product) => {
  
    const newCart = [...CartItem, product];
    setCartItem(newCart);
    addToDb(product.id);
  };
  return (
    <div>
        <AuthorDetails authorName={authorName} ></AuthorDetails>

    </div>
  )
}

export default page
