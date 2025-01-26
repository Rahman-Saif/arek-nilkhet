'use client'
import React from 'react'
// import PublishersPage from '@/components/PublishersPage/Publishers/PublishersPage'
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import usePublishers from '@/Hooks/usePublishers';
import dynamic from 'next/dynamic';

const PublishersPage = dynamic(() => import('@/components/PublishersPage/Publishers/PublishersPage'), { ssr: false });

const page = () => {
  const  [products] = useProducts();

    const [CartItem, setCartItem] = useLocalCart(products);
  const [publishers] = usePublishers();
  return (
    <div>
            <PublishersPage CartItem={CartItem} />

    </div>
  )
}

export default page
