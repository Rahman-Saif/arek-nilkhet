'use client'

// import { url } from '@/app/page';
import React, {useEffect,useState} from 'react';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import useAuthorByID from '../../../Hooks/CallByID/useAuthorByID';
import usePublisherByID from '../../../Hooks/CallByID/usePublisherByID';
import useCategoryByID from '../../../Hooks/CallByID/useCategoryByID';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb, addToWishlist } from '../../../Utilities/LocalStorage';
import useLocalWishlist from '../../../Hooks/useLocalWishlist';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from '../../ui/alert-dialog';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
  

export default function BookDetail({id, books }) {
  const [activeTab, setActiveTab] = useState('specification');
  const [details, setDetails] = useState<BookDetails>({} as BookDetails);
  const [dialogOpen, setDialogOpen] = useState(false);
          const url = process.env.NEXT_PUBLIC_URL;



  useEffect(() => {
    
    fetch(`${url}/api/product/${id}`)
   .then(res => res.json())
   .then(result => {
    console.log("resulttttt",result);
     setDetails(result);
   });
  }, [id]);

  const [author] = useAuthorByID(details.author);
  const [publisher] = usePublisherByID(details.publisher);
  const [singleCategory] = useCategoryByID(details.category);
  const [CartItem, setCartItem]= useLocalCart(details);
  const [WishlistItem, setWishlistItem] = useLocalWishlist(books);
  const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);


  const handleAddToCart=(details:BookDetails)=>{
      let newCart: BookDetails[] = [];

if (Array.isArray(CartItem)) {   
    newCart=[...CartItem, details];
      setCartItem(newCart);

}else{
    setCartItem([details]);
}
   
    addToDb(details.id);
    // console.log('carttt er jinisshhh!!',newCart);
       setShowAlert(true); // Show alert when an item is added
    setTimeout(() => setShowAlert(false), 3000); 
  }
  
  // handleAddedToWishlist function
  const handleAddToWishlist = (details:BookDetails) => {
    const existingWishlist = WishlistItem.find(
      (product:BookDetails) => product.id == details.id
    );
    if (!existingWishlist) {
      const newWishlist = [...WishlistItem, details];
      setWishlistItem(newWishlist);
      addToWishlist(details.id);

      setShowWishlistAlert(true);
      setTimeout(() => setShowWishlistAlert(false), 3000);
    } else {
      // alert("Already in wishlist!");
      setShowWishlistAlert(true);
      setTimeout(() => setShowWishlistAlert(false), 3000);
    }
  };

  return (
    <>
      <Header ></Header>
      <div className="w-11/12 mx-auto mt-5 mb-5 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-11/12 border-0 rounded shadow p-4 ">
        <div className="lg:col-span-1  text-center pt-3">
          <img
            className="image-watermark mx-auto"
            src={details?.image}
            alt={details?.alt_text}
            style={{ width: '70%', height: '85%' }}
          />
          {details?.pdf && (
            <a
              target="_blank"
              rel="noreferrer"
              href={details?.pdf}
              className="bg-green-500 text-white text-sm rounded m-3 p-2 px-4 inline-block"
              title={details?.english_title}
            >
              একটু পড়ে দেখুন
            </a>
          )}
        </div>
        <div className="lg:col-span-2 pt-3 w-11/12">
          <h3 className="text-lg font-bold">{details?.english_title}</h3>
          <div className="flex items-center space-x-4">
            {details?.discount_price === 0 || details?.discount_price === null ? (
              <h6 className="text-lg font-bold text-gray-800">
                {details?.regular_price} টাকা
              </h6>
            ) : (
              <div className="flex space-x-4">
                <h6 className="line-through text-lg font-bold text-gray-800">
                  {details?.regular_price} টাকা
                </h6>
                <h6 className="text-lg font-bold text-red-500">
                  {details?.discount_price} টাকা
                </h6>
              </div>
            )}
          </div>
          {details?.units_stock !== undefined && details.units_stock <= 10 && details.units_stock >= 1 && (
            <div className="mt-2">
              <strong className="text-blue-500">
                *** Last {details.units_stock} pcs in stock! ***
              </strong>
            </div>
          )}
          <div className="my-2 flex items-start md:items-center flex-col md:flex-row gap-3">
            {details?.units_stock !== 0 ? (
              <button
                className="bg-[#157347] text-white px-3 py-1 text-lg rounded mx-1 flex items-center flex-row justify-center "
                onClick={() => handleAddToCart(details)}
              >
                Add to cart <MdOutlineShoppingBag className='ml-2'/>
              </button>
            ) : (
              <button className="bg-gray-400 text-white px-3 py-1 rounded mx-1 cursor-not-allowed">
                Stock out!
              </button>
            )}
            <button
              id="wishlistbtn"
              className="border border-[#157347] text-[#157347] px-3 py-1 text-lg flex items-center flex-row justify-center rounded mx-1 hover:bg-[#157347] hover:text-white"
              onClick={() => handleAddToWishlist(details)}
            >
              Add to wishlist <FaRegHeart className='ml-2'/>

            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex border-b border-gray-300">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'specification'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('specification')}
          >
            Specification
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'description'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'specification' && (
            <table className="table-auto w-full border border-gray-300">
              <tbody>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">English Title</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.english_title}</td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Bangla Title</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.bangla_title}</td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Category</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={`/category/${singleCategory.name}`}>{details?.category_name}</a>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Author</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={`/authors/${author.name}`}>{details?.author_name}</a>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Publisher</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={`/publishers/${publisher.name}`}>{details?.publisher_name}</a>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Edition</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.edition}</td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">ISBN</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.isbn}</td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Total Page</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.total_page}</td>
                </tr>
                <tr>
                  <td className="font-bold text-left border border-gray-300 px-4 py-2">Language</td>
                  <td className="border border-gray-300 px-4 py-2">{details?.language}</td>
                </tr>
              </tbody>
            </table>
          )}
          {activeTab === 'description' && (
            <div className="container mt-3 p-2">
              <p className="text-gray-600 font-bold">{details?.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
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
            Successfully added to the wishlist!
          </AlertDescription>
        </Alert>
      )}

    <Footer></Footer>
    </>
  );
}
