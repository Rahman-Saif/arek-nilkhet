'use client'
// import AuthorsPage from '@/components/AuthorsPage/Authors/AuthorsPage'
import useAuthors from '@/Hooks/useAuthors';
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import { useParams } from 'next/navigation';

import React from 'react'
import dynamic from 'next/dynamic';

const AuthorsPage = dynamic(() => import('@/components/AuthorsPage/Authors/AuthorsPage'), { ssr: false });


const page = () => {
    const [authors] = useAuthors();
    const  [products] = useProducts();
      const [CartItem, setCartItem] = useLocalCart(products);

        

  return (
    <div>
        <AuthorsPage  CartItem={CartItem} ></AuthorsPage>

    </div>
  )
}

export default page
