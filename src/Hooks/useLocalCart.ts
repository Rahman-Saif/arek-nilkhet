'use client'

import { useState, useEffect } from 'react';
// import { Book } from '../components/Books/BookDetail/BookDetail';
import { getStoredCart } from '../Utilities/LocalStorage';

// export interface Product extends Book {
//   quantity: number;
// }

const useLocalCart = (initialProducts:any) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log('useLocalCart effect running');
    try {
      if (!Array.isArray(initialProducts)) {
        console.error('initialProducts is not an array:', initialProducts);
        return;
      }

      const storedCart = getStoredCart();
      console.log('Stored cart:', storedCart);
      console.log('Initial products:', initialProducts);

      // const updatedCart = initialProducts
      //   .filter(product => {
      //     console.log("Product ID:", product.id, "Type:", typeof product.id);
      //     console.log("StoredCart keys:", Object.keys(storedCart));
      //     return storedCart[String(product.id)] !== undefined;
      //   })
      //   .map(product => ({
      //     ...product,
      //     quantity: storedCart[String(product.id)]
      //   }));

        const updatedCart = initialProducts
        .filter(product => {
          const productIdString = String(product.id);
          const cartKeys = Object.keys(storedCart);
          return cartKeys.includes(productIdString);
        })
        .map(product => ({
          ...product,
          quantity: storedCart[String(product.id)]
        }));

      console.log('Updated cart:', updatedCart);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error in useLocalCart:', error);
    }
  }, [initialProducts]);

  return [cartItems, setCartItems] as const;
};

export default useLocalCart;
