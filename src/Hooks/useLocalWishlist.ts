'use client'
import { useState, useEffect } from 'react';
import { getStoredWishlist } from '../Utilities/LocalStorage';

const useLocalWishlist = (productItems) => {
  const [WishlistItem, setWishlistItem] = useState(productItems);
  
  useEffect(() => {
    // if (productItems.length) {
    if (productItems) {
      const savedWishlist = getStoredWishlist();
      const storedWishlist = [];
      for (const id in savedWishlist) {
        const addedProduct = productItems.find((product) => product.id == id);
        if (addedProduct) {
          const quantity = savedWishlist[id];
          addedProduct.quantity = quantity;
          storedWishlist.push(addedProduct);
        }
      }
      setWishlistItem(storedWishlist);
    }
  }, [productItems]);
  return [WishlistItem, setWishlistItem];
};

export default useLocalWishlist;
