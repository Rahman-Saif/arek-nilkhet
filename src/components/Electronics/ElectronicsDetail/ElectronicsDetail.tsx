'use client'
import React, {useEffect,useState} from 'react';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
// import {useParams} from 'react-router';
import useCategoryByID from '../../../Hooks/CallByID/useCategoryByID';
import useLocalCart from '../../../Hooks/useLocalCart';
import { addToDb, addToWishlist } from '../../../Utilities/LocalStorage';
import useLocalWishlist from '../../../Hooks/useLocalWishlist';
import useElectronics from '../../../Hooks/useElectronics';
// import { url } from '../../../App';
// import { Tab, Tabs } from 'react-bootstrap';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


export default function ElectronicsDetail({id, addToCart}) {
    const [activeTab, setActiveTab] = useState('specification');

    const [ electronics ] = useElectronics();
    const [details, setDetails]= useState([]);
            const url = process.env.NEXT_PUBLIC_URL;

  
    // collecting product details
    useEffect(() => {
        fetch(`${url}/api/product/${id}/`)
        .then(res => res.json())
        .then(result => {
            setDetails(result)
        });
    }, [id]);

    const [singleCategory] = useCategoryByID(details?.category);
    const [CartItem, setCartItem]= useLocalCart(details);
    const [WishlistItem, setWishlistItem] = useLocalWishlist(electronics);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);


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
      <div className="w-11/12 mt-5 mb-5  mx-auto">
  {/* product info */}
  <div className="w-11/12 mx-auto p-4 border-0 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="lg:col-span-1 text-center pt-3">
      <img
        className="image-watermark mx-auto"
        src={details?.image}
        alt={details?.alt_text}
        style={{ width: "70%", height: "85%" }}
      />
    </div>
    <div className="pt-3 lg:col-span-2 w-11/12">
      <h3 className='text-lg font-bold'>{details?.english_title}</h3>
      <div className="flex items-center space-x-2 mt-2">
        {(details?.discount_price === 0 || details?.discount_price === null) ? (
          <h6 className=" text-gray-800 font-bold">{details?.regular_price} টাকা</h6>
        ) : (
          <div className="flex items-center space-x-2">
            <div>
              <h6 className="text-start text-gray-800 line-through font-bold">{details?.regular_price} টাকা</h6>
            </div>
            <div>
              <h6 className="text-start text-red-600 font-bold">{details?.discount_price} টাকা</h6>
            </div>
          </div>
        )}
        {details?.pdf && (
          <button className="text-sm btn-outline-success rounded-full py-1 px-3 mx-3">
            Click to read
          </button>
        )}
      </div>
      {(details?.units_stock <= 10 && details?.units_stock >= 1) && (
        <div>
          <strong className="text-blue-500">*** Last {details?.units_stock} pcs in stock! ***</strong>
        </div>
      )}
      <div className="my-2">
        {details?.units_stock !== 0 ? (
          <button
            className="px-3 py-1 bg-green-500 text-white rounded mx-1 my-1"
            onClick={() => handleAddToCart(details)}
          >
            Add to cart <i className="fa fa-shopping-bag"></i>
          </button>
        ) : (
          <button className="px-3 py-1 bg-gray-500 text-white rounded mx-1 my-1 disabled">
            Stock out!
          </button>
        )}
        <button
          id="wishlistbtn"
          className="px-3 py-1 btn-outline-success rounded mx-1 my-1"
          onClick={() => handleAddToWishlist(details)}
        >
          Add to wishlist <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  </div>

  {/* product specification & description */}
  <div className="mt-5">
      {/* Tab navigation */}
      <div className="flex border-b">
        <button
          className={`py-2 px-4 text-lg font-semibold ${activeTab === 'specification' ? 'border-b-2 border-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('specification')}
        >
          Specification
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${activeTab === 'description' ? 'border-b-2 border-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'specification' && (
        <div id="specification" className="mt-4">
          <table className="w-full mt-4 table-auto">
            <tbody>
              <tr>
                <td className="font-bold text-start">English Title</td>
                <td>{details?.english_title}</td>
              </tr>
              <tr>
                <td className="font-bold text-start">Bangla Title</td>
                <td>{details?.bangla_title}</td>
              </tr>
              <tr>
                <td className="font-bold text-start">Category</td>
                <td>{details?.category_name}</td>
              </tr>
              <tr>
                <td className="font-bold text-start">Brand</td>
                <td>{details?.brand}</td>
              </tr>
              <tr>
                <td className="font-bold text-start">Model</td>
                <td>{details?.model}</td>
              </tr>
              <tr>
                <td className="font-bold text-start">Warranty</td>
                <td>{details?.warranty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'description' && (
        <div id="description" className="mt-4 p-2">
          <p className="text-secondary font-bold">{details?.description}</p>
        </div>
      )}
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
