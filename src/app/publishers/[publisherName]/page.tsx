'use client'
import PublisherDetails from '@/components/PublishersPage/PublisherDetails/PublisherDetails'
import React from 'react'
import useLocalCart from '@/Hooks/useLocalCart';
import useProducts from '@/Hooks/useProducts';
import { addToDb } from '@/Utilities/LocalStorage';
import { useParams } from 'next/navigation';
const page = () => {
const params = useParams();
const publisherNameParam = Array.isArray(params.publisherName) ? params.publisherName[0] : params.publisherName;
const publisherName = decodeURIComponent(publisherNameParam);

const [products] = useProducts();

const [CartItem, setCartItem] = useLocalCart(products);

const addToCart = (product) => {
  const newCart = [...CartItem, product];
  setCartItem(newCart);
  addToDb(product.id);
};
return (
  <div>
    <PublisherDetails publisherName={publisherName} />
  </div>
)
}

export default page
