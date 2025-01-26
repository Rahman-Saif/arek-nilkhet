'use client'
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import useLocalWishlist from '../../../Hooks/useLocalWishlist';
import { addToDb, removeFromWishlist, getStoredWishlist } from '../../../Utilities/LocalStorage';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import '../common.css';
import Link from 'next/link';
// import { Book } from '../../Books/BookDetail/BookDetail';
import { FaShoppingBag, FaTrash } from 'react-icons/fa';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

const Wishlist = ({ allProducts }) => {
  const [WishlistItem, setWishlistItem] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;


  useEffect(() => {
    const loadWishlistItems = async() => {
      // Debug logs
      console.log('1. All Products received:', allProducts);
      
      const storedWishlist = getStoredWishlist();
      console.log('2. Stored Wishlist:', storedWishlist);
      
       const wishlistProducts = [];

      for (const itemId in storedWishlist) {
        if (storedWishlist.hasOwnProperty(itemId)) {
          try {
            const response = await fetch(`${url}/api/product/${itemId}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error('Failed to fetch product details');
            }

            const result = await response.json();
            console.log("API Response:", result);

            // Assuming result contains the product details
            wishlistProducts.push({
              ...result,
              quantity: storedWishlist[itemId],
            });
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
      }
      // if (!allProducts || allProducts.length === 0) {
      //   console.log('3. No products available');
      //   return;
      // }

      // // Get all products that are in the wishlist
      // const wishlistProducts = allProducts.filter(product => {
      //   const productId = String(product.id);
      //   const isInWishlist = storedWishlist[productId] !== undefined;
      //   console.log(`4. Checking product ${productId}:`, isInWishlist);
      //   return isInWishlist;
      // });

      console.log('5. Found wishlist products:', wishlistProducts);
      setWishlistItem(wishlistProducts);
    };

    loadWishlistItems();
  }, [allProducts]);

  console.log('Current WishlistItem state:', WishlistItem);

  const handleAddToCart = (product) => {
    const newWishlist = WishlistItem.filter((item) => item.id !== product.id);
    setWishlistItem(newWishlist);
    addToDb(product.id);
    removeFromWishlist(product.id);
    // window.alert('Successfully added!');
     setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  };

  const handleRemoveWish = (id) => {
    const newWishlist = WishlistItem.filter((product) => product.id !== id);
    setWishlistItem(newWishlist);
    removeFromWishlist(id);
    // window.alert('Successfully removed!');
    setShowWishlistAlert(true); // Show alert when an item is removed
    setTimeout(() => setShowWishlistAlert(false), 3000); 
  };

  return (
    <>
      <Header />
      <section className="mt-5 mb-5">
  <div className="container p-2 w-full mx-auto border-0 rounded shadow mb-4 bg-white">
    {WishlistItem.length === 0 ? (
      <h1 className="text-center font-bold text-xl">
        আপনার উইশলিস্টে কোন আইটেম পাওয়া যায়নি !
      </h1>
    ) : (
      <>
        <h4 className="m-2 text-center font-bold text-lg">আপনার উইশলিস্ট</h4>
        <hr className="mx-auto w-1/4 border-t-2" />
        <div className="bg-white overflow-x-auto">
          <table className="mb-3 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 px-4 py-2">ছবি</th>
                <th className="border border-gray-300 px-4 py-2">প্রোডাক্ট</th>
                <th className="border border-gray-300 px-4 py-2">মূল্য</th>
                <th className="border border-gray-300 px-4 py-2">যুক্ত/ডিলিট</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {WishlistItem.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={item.image} className="h-16 w-auto mx-auto" alt="" />
                  </td>
                  {item?.type === 'book' && (
                    <td className="border border-gray-300 px-4 py-2">
                      <Link href={`/books/${item.id}`} className="text-blue-500 hover:underline">
                        {item.english_title}
                      </Link>
                    </td>
                  )}
                  {item?.type === 'electronics' && (
                    <td className="border border-gray-300 px-4 py-2">
                      <Link href={`/electronics/${item.id}`} className="text-blue-500 hover:underline">
                        {item.english_title}
                      </Link>
                    </td>
                  )}
                  {item?.type === 'stationary' && (
                    <td className="border border-gray-300 px-4 py-2">
                      <Link href={`/stationary/${item.id}`} className="text-blue-500 hover:underline">
                        {item.english_title}
                      </Link>
                    </td>
                  )}
                  {!['book', 'electronics', 'stationary'].includes(item?.type) && (
  <td className="border border-gray-300 px-4 py-2"/>
)}
                  {(item?.discount_price === 0 && item?.regular_price === 0) ? (
                    <td className="border border-gray-300 px-4 py-2"/>
                  ) : (
                    <>
                      {item?.discount_price !== 0 ? (
                        <td className="border border-gray-300 px-4 py-2">{item?.discount_price} টাকা</td>
                      ) : (
                        <td className="border border-gray-300 px-4 py-2">{item?.regular_price} টাকা</td>
                      )}
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                    type='button'
                      className="border border-green-500 text-green-500 px-2 py-1 rounded m-1 hover:bg-green-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingBag />
                    </button>
                    <button
                    type='button'
                      className="border border-red-500 text-red-500 px-2 py-1 rounded m-1 hover:bg-red-100"
                      onClick={() => handleRemoveWish(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
</section>
{showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully added to the cart!
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            removed from the wishlist!
          </AlertDescription>
        </Alert>
      )}


      <Footer/>
    </>
  );
};

export default Wishlist;
