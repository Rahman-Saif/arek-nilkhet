'use client'

import React, { useEffect, useState } from 'react';
// import { NavLink , Link} from 'react-router-dom';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb, getStoredCart, removeFromDb } from '../../../Utilities/LocalStorage';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import './cart.css';
import Link from 'next/link';
// import { Book } from '../../Books/BookDetail/BookDetail';
// import { Product } from '../../../Hooks/useLocalCart';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import useProducts from '@/Hooks/useProducts';

const Cart = () => {
  // console.log('Cart component rendering', products);
const [products]=useProducts();
  const [CartItem, setCartItem] = useLocalCart(products);
     const [showAlert, setShowAlert] = useState(false);
      const [showWishlistAlert, setShowWishlistAlert] = useState(false);
              const url = process.env.NEXT_PUBLIC_URL;

  //     // const [products]=useProducts();
      

  // if (!products || !Array.isArray(products)) {
  //   // console.log('No products available');
  //   return <div>No products available</div>;
  // }



  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = getStoredCart();
      console.log('Stored Cart:', storedCart); // Log the stored cart

      const updatedCart = [];

      for (const itemId in storedCart) {
        if (storedCart.hasOwnProperty(itemId)) {
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
            updatedCart.push({
              ...result,
              quantity: storedCart[itemId],
            });
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
      }

      console.log('Final Updated Cart:', updatedCart);
      setCartItem(updatedCart);
    };

    fetchCartItems();
  }, [products]);

  const user = JSON.parse(window!==undefined && window.localStorage.getItem('user') || '{}');

  const handleAddToCart = (product) => {
    console.log('7. Adding product to cart:', product);
    const existingProduct = CartItem.find(item => String(item.id) === String(product.id));
    
    let updatedCart;
    if (existingProduct) {
      updatedCart = CartItem.map(item =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...CartItem, { ...product, quantity: 1 }];
    }
    
    console.log('8. New cart state:', updatedCart);
    setCartItem(updatedCart);
    addToDb(String(product.id));  // Store ID as string
    
    // window.alert('Successfully added!');
    setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  };

  // handleRemove function
  const handleRemove = (id) => {
    let newCart=[];
    const previousProduct = (CartItem.filter((item)=> item.id !== id));
    let newProduct = (CartItem.filter((item)=> item.id === id));

    if(newProduct[0]?.quantity>1){
      newProduct[0].quantity = newProduct[0]?.quantity-1;
      newCart=[...previousProduct, ...newProduct];
    }
    else{
      newCart=[...previousProduct];
    }
    
    setCartItem(newCart);
    removeFromDb(id);
    // window.alert('Successfully removed!');
       setShowWishlistAlert(true);
      setTimeout(() => setShowWishlistAlert(false), 3000);
  };

  //counting total_price
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.quantity * (item?.discount_price || item.regular_price), 0
  );

  return (
    <>
      <Header></Header>
      <section className="cart-items w-11/12 mx-auto bg-white h-full ">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {CartItem?.length === 0 ? (
      <div className="mx-auto container">
        <h1 className="text-2xl font-bold text-center mb-5">আপনার কার্টে কোন আইটেম পাওয়া যায়নি !</h1>
      </div>
    ) : (
      <>
        <div className="col ">
          <div className="container mx-auto  w-full cart-items">
            <div className="border-0 rounded mb-4 bg-white w-full overflow-auto">
              <table className="mb-3 table-auto text-center max-w-screen-lg md:w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">ছবি</th>
                    <th className="p-2">প্রোডাক্ট</th>
                    <th className="p-2">মূল্য</th>
                    <th className="p-2">পরিমাণ</th>
                    <th className="p-2">মোট</th>
                    <th className="p-2">যুক্ত/ডিলিট</th>
                  </tr>
                </thead>
                <tbody>
                  {CartItem?.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-2">
                        <img src={item?.image} className="h-16 w-auto" alt="" />
                      </td>
                      <td className="p-2">
                        <Link href={`/${item.type}/${item.id}`}>{item?.english_title}</Link>
                      </td>
                      <td className="p-2">{item?.discount_price || item?.regular_price}</td>
                      <td className="p-2">{item?.quantity}</td>
                      <td className="p-2">
                        {item.discount_price
                          ? item.discount_price * item.quantity + " টাকা"
                          : item.regular_price * item.quantity + " টাকা"}
                      </td>
                      <td className="p-2 flex justify-center">
                        <button
                          className="border border-yellow-500 text-yellow-500 m-1 p-2 rounded"
                          onClick={() => handleAddToCart(item)}
                        >
                          {/* <i className="fa-solid fa-plus"></i> */}
                          <IoMdAdd />

                        </button>
                        <button
                          className="border border-gray-500 text-gray-500 m-1 p-2 rounded"
                          onClick={() => handleRemove(item.id)}
                        >
                          {/* <i className="fa-solid fa-minus"></i> */}
                          <IoMdRemove />

                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="w-full mx-auto border rounded">
            <div className="p-4">
              <h2 className="bg-[#103464] text-white text-center text-lg font-bold py-2 rounded">অর্ডার সামারী</h2>
              <div className="flex justify-between py-2">
                <p className="font-bold text-gray-700">প্রোডাক্টের মূল্য :</p>
                <p>{totalPrice ? `${totalPrice} টাকা` : "0.00 টাকা"}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-bold text-gray-700">পরিবহন চার্জ</p>
                <p>{totalPrice ? "60 টাকা" : "0.00 টাকা"}</p>
              </div>
            </div>
            <div className="flex justify-end items-center p-4">
              {user?.phone_number ? (
                <button className="px-4 py-2 bg-[#103464] text-white rounded">
                  <Link href="/checkout">চেকআউট করুন</Link>
                </button>
              ) : (
                <button className="px-4 py-2 bg-[#103464] text-white rounded">
                  <Link href="/login?from=/checkout">
                    চেকআউট করুন
                  </Link>
                  {/* <Link href={{ pathname: "/login", state: { from: "/checkout" } }}>
                    চেকআউট করুন
                  </Link> */}
                </button>
              )}
            </div>
          </div>
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
          <AlertDescription className="text-black">
            Successfully added !
          </AlertDescription>
        </Alert>
      )}

       {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully removed
          </AlertDescription>
        </Alert>
      )}



      <Footer></Footer>
    </>
  );
};

export default Cart;
