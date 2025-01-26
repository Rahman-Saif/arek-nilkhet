'use client'
import React, {useEffect,useState} from 'react';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
// import {useParams} from 'react-router';
import useCategoryByID from '../../../Hooks/CallByID/useCategoryByID';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb, addToWishlist } from '../../../Utilities/LocalStorage';
import useLocalWishlist from '../../../Hooks/useLocalWishlist';
import useStationary from '../../../Hooks/useStationary';
// import { url } from '../../../App';
// import { Tab, Tabs } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function StationaryDetail({id}) {
    const [activeTab, setActiveTab] = useState('specification');
            const url = process.env.NEXT_PUBLIC_URL;


    const [stationaries ] = useStationary();
    // const {productID} = useRouter();
    const [details, setDetails]= useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
  
    // collecting product details
    useEffect(() => {
        fetch(`${url}/api/product/${id}/`)
        .then(res => res.json())
        .then(result => {
          console.log("stationary er chup",result);
          setDetails(result);
        });
    }, [id]);

    const [singleCategory] = useCategoryByID(details?.category);
    const [CartItem, setCartItem]= useLocalCart(details);
    const [WishlistItem, setWishlistItem] = useLocalWishlist(stationaries);


    // handleAddToCart function
    const handleAddToCart=(details)=>{
        const newCart=[...CartItem, details];
        setCartItem(newCart);
        addToDb(id);
        // alert('Product addded successfully!');
        setShowAlert(true); // Show alert when an item is added
        setTimeout(() => setShowAlert(false), 3000); 
    }
    
    // handleAddedToWishlist function
    const handleAddToWishlist = (details) => {
        const existingWishlist = WishlistItem.find(
        (product) => product.id == details.id
        );
        if (!existingWishlist) {
            const newWishlist = [...WishlistItem, details];
            setWishlistItem(newWishlist);
            addToWishlist(id);
            // alert('Successfully added!');
            setShowWishlistAlert(true);
            setTimeout(() => setShowWishlistAlert(false), 3000);
        }
        else{
            // alert('Already in wishlist!');
            setShowWishlistAlert(true);
            setTimeout(() => setShowWishlistAlert(false), 3000);
        }
    };

  return (
    <>
      <Header ></Header>
     <div className="w-11/12 mx-auto mt-5 mb-5">
  <div className="w-11/12 mx-auto border rounded-lg  p-4 grid grid-cols-1 md:grid-cols-3 shadow gap-4">
    <div className="pt-3 text-center lg:col-span-1">
      <img
        className="image-watermark mx-auto"
        src={details?.image}
        alt={details?.alt_text}
        style={{ width: "70%", height: "85%" }}
      />
    </div>
    <div className="pt-3 lg:col-span-2 w-11/12">
      <h3 className="text-lg font-bold">{details?.english_title}</h3>
      <div className="flex items-center space-x-4 mt-2">
        {details?.discount_price === 0 || details?.discount_price === null ? (
          <h6 className="text-dark text-lg font-bold">{details?.regular_price} টাকা</h6>
        ) : (
          <div className="flex items-center space-x-2">
            <h6 className="text-gray-500 line-through font-bold">
              {details?.regular_price} টাকা
            </h6>
            <h6 className="text-red-500 font-bold">{details?.discount_price} টাকা</h6>
          </div>
        )}
        {details?.pdf && (
          <button className="text-sm border border-green-500 text-green-500 rounded-full py-1 px-3 mx-3">
            Click to read
          </button>
        )}
      </div>
      {details?.units_stock <= 10 && details?.units_stock >= 1 && (
        <div className="mt-2">
          <strong className="text-blue-500">
            *** Last {details?.units_stock} pcs in stock! ***
          </strong>
        </div>
      )}
      <div className="my-4 flex flex-wrap space-x-2">
        {details?.units_stock !== 0 ? (
          <button
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleAddToCart(details)}
          >
            Add to cart <i className="fa fa-shopping-bag"></i>
          </button>
        ) : (
          <button className="px-3 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
            Stock out!
          </button>
        )}
        <button
          id="wishlistbtn"
          className="px-3 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
          onClick={() => handleAddToWishlist(details)}
        >
          Add to wishlist <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  </div>

  {/* Product specification & description */}
  <div className="mt-8">
    {/* Tabs Header */}
    <div className="flex  border-b">
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === "specification" ? "border-b-2 border-gray-500" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("specification")}
      >
        Specification
      </button>
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === "description" ? "border-b-2 border-gray-500" : "text-gray-500"
        }`}
        onClick={() => setActiveTab("description")}
      >
        Description
      </button>
    </div>

    {/* Tab Content */}
    <div className="mt-4">
      {activeTab === "specification" && (
        <div>
          <table className="table-auto w-full border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="font-bold text-left p-2">English Title</td>
                <td className="text-black p-2">{details?.english_title}</td>
              </tr>
              <tr className="border-b">
                <td className="font-bold text-left p-2">Bangla Title</td>
                <td className="text-black p-2">{details?.bangla_title}</td>
              </tr>
              <tr className="border-b">
                <td className="font-bold text-left p-2">Category</td>
                <td className="p-2">{details?.category_name}</td>
              </tr>
              <tr className="border-b">
                <td className="font-bold text-left p-2">Brand</td>
                <td className="p-2">{details?.brand}</td>
              </tr>
              <tr>
                <td className="font-bold text-left p-2">Model</td>
                <td className="p-2">{details?.model}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "description" && (
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-gray-700 font-bold">{details?.description}</p>
        </div>
      )}
    </div>
  </div>
</div>

{showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
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
