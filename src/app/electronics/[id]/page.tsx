'use client'
import AdminElectronics from '@/components/AdminDashboard/AdminElectronics/AdminElectronics'
import UpdateElectronics from '@/components/AdminDashboard/AdminElectronics/UpdateElectronics'
import ElectronicsDetail from '@/components/Electronics/ElectronicsDetail/ElectronicsDetail'
import useLocalCart from '@/Hooks/useLocalCart'
import useProducts from '@/Hooks/useProducts'
import { addToDb } from '@/Utilities/LocalStorage'
import { useParams } from 'next/navigation'
import React from 'react'


const page = () => {
    const [ products ]= useProducts();

    const [CartItem, setCartItem] = useLocalCart(products);

    const params = useParams();
    const id = params.id;

    const addToCart = (product) => {
    const newCart = [...CartItem, product];
    setCartItem(newCart);
    addToDb(product.id);
  };

  return (
    <div>
      <ElectronicsDetail id={id}  addToCart={addToCart}/>
    </div>
  )
}

export default page
