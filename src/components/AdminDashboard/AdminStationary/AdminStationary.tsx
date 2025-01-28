'use client'
import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import { useForm } from 'react-hook-form';
// import { url } from '@/app/page';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
// import {url} from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useStationary from '@/Hooks/useStationary';
import Pagination from '@/components/Shared/Pagination/Pagination';


export default function AdminStationary({  stationaryCategory}) {
  const [stationaries, pageCount, handlePageClick, offset, displayItems ]=useStationary();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const {register: searchRegister, handleSubmit: handleSearch} = useForm();
  const [title, setTitle] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const [result, setResults] = useState(0);
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [offerType, setOfferType] = useState('');
     const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }

  //Stationaries add function
  const onSubmit = data => {
    if (!stationaryCategory?.id) {
      console.error('Category ID is undefined');
      // stationaryCategory.id = 1;  
      return ; // Exit early if category is not set
    }

    const formData = new FormData();

    // Validate percentage
    if (data.percentage < 0 || data.percentage > 100) {
      console.error('Invalid percentage value');
      return; // Exit early if percentage is invalid
    }

    // Calculate discount price
    if (data.percentage) {
      const percentage_value = data.regular_price * (data.percentage / 100);
      data.discount_price = Math.round(data.regular_price - percentage_value);
      data.flat_discount = 0;
    }

    // Append data to FormData
    formData.append('english_title', data.english_title);
    formData.append('bangla_title', data.bangla_title);
    formData.append('category', stationaryCategory.id);
    formData.append('description', data.description);
    formData.append('type', 'stationary');
    formData.append('model', data.model);
    formData.append('brand', data.brand);
    formData.append('offer_type', data.offer_type);
    formData.append('percentage', data.percentage);
    formData.append('flat_discount', data.flat_discount);
    formData.append('purchase_from', data.purchase_from);
    formData.append('purchase_price', data.purchase_price);
    formData.append('regular_price', data.regular_price);
    formData.append('discount_price', data.discount_price);
    formData.append('units_stock', data.units_stock);
    formData.append('is_active', 'true');
    formData.append('image', selectedImage);
    formData.append('alt_text', data.alt_text);

    // Log the FormData entries
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    fetch(`${url}/create-stationary/`, {
      method: "POST",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then(getData => {
      setShowAlert(true); 
      setTimeout(() => setShowAlert(false), 3000); 
      reset();
     window!==undefined && window.location.reload();
    })
    .catch(err => {
      if (err instanceof Response) {
        err.json()
          .then(text => {
            console.error('Error details:', text);
            if (text?.error) {
              setshowfailedAlert(true);
              setTimeout(() => setshowfailedAlert(false), 3000);
            }
          })
          .catch(() => {
            setshowfailedAlert(true);
            setTimeout(() => setshowfailedAlert(false), 3000);
          });
      } else {
        console.error('Unexpected error:', err);
        setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
      }
    });
  }

  // Stationaries delete function
  // const handleDelete =async (id) =>{
  //   // const confirm = window.confirm('Are you sure to delete Stationaries?');
  //   // if(confirm){
  //   try {
  //     fetch(`${url}/api/product/${id}/`, {
  //     method:'DELETE'
  //     })
  //     //  alert('Stationaries deleted!');
  //     setShowWishlistAlert(true);
  //     setTimeout(() => setShowWishlistAlert(false), 3000); 
  //     window.location.reload();
  //   } catch (error) {
  //     setshowfailedAlert(true);
  //     setTimeout(() => setshowfailedAlert(false), 3000);
  //   }   
  // }

  const handleDelete = async(id) =>{
    try {
      const response = await fetch(`${url}/api/product/${id}/`, {
        method:'DELETE'
      })
      if (response.ok) {
        // alert('Category deleted!');
        setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
       window!==undefined && window.location.reload();
      } else {
        // alert('Failed to delete category');
        setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
      }
    } catch (error) {
      // console.error('Delete error:', error);
      setshowfailedAlert(true);
      setTimeout(() => setshowfailedAlert(false), 3000);
    }
  }

  // searching function
  const onSearch = data =>{

    setTitle(data.title);
    if(data.title===''){
      setSearchProducts([]);
      setResults(0);
    }
    else{
      // fetch(`${url}/all-product/stationary/?search=${data.title}`)
      fetch(`${url}/product-search-filter/?type=stationary&q=${data.title}`)
        .then(res => res.json())
        .then(result => {
          if(result.length===0){
            setResults(1);
          }
          else{
            setResults(2);
            setSearchProducts(result);
          }
      });
    }  
  }

  return (
    <>
     <div className="flex m-0 ">
  <SideBar />
  <div className="w-11/12 mx-auto">
    <AdminNavbar />
    <h3 className="text-center pt-3 text-lg font-semibold">Stationaries</h3>
    <hr className="my-3 border-gray-300 " />
  

          {/* search product */}


          <div className="w-1/2 mx-auto mb-3">
  <form className="container mx-auto" onSubmit={handleSearch(onSearch)}>
    <div className="flex items-center mb-3">
      <div className="flex  items-center border border-green-500 rounded-full p-2 bg-white flex-grow mr-2">
        <i className="fa fa-search p-1 text-gray-500"/>
        <input
          {...searchRegister('title')}
          type="text"
          className="p-1 text-sm outline-none w-3/4"
          placeholder="Search product by title"
        />
      </div>
      <button
        type="submit"
        className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold "
      >
        Search
      </button>
    </div>
  </form>
</div>



          {/* show search result */}
          {title === '' ? (
  <></>
) : (
  <>
    {result === 0 ? (
      <></>
    ) : (
      <>
        {result === 1 ? (
          <div className="container p-4 mb-4 bg-white border rounded-lg">
            <p className="font-semibold text-sm text-gray-700 p-2">Sorry, No result found!</p>
          </div>
        ) : (
          <>
            <div className="container p-4 border rounded-lg shadow-lg mb-5 bg-white overflow-x-auto">
              <h4 className="text-center text-lg font-bold text-gray-800 mb-2">Searching List</h4>
              <hr className="w-1/4 mx-auto border-gray-300 mb-4" />
              <table className="min-w-full text-left table-auto border border-gray-300">
                <thead className="bg-green-100 text-green-700">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">English Title</th>
                    <th className="p-2">Bangla Title</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Regular Price</th>
                    <th className="p-2">Discount Price</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Sold</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="p-2">{product?.id}</td>
                      <td className="p-2">{product?.english_title}</td>
                      <td className="p-2">{product?.bangla_title}</td>
                      <td className="p-2">
                        <img src={product?.image} height="50" width="50" alt={product?.alt_text} className="rounded" />
                      </td>
                      <td className="p-2">{product?.regular_price}</td>
                      <td className="p-2">{product?.discount_price}</td>
                      <td className="p-2">{product?.units_stock}</td>
                      <td className="p-2">{product?.units_sold}</td>
                      <td className="p-2 flex space-x-2">
                        <Link 
                          href={`/update-stationary/${product.id}`} 
                          className="inline-flex items-center justify-center bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button 
                        type='button'
                        onClick={() => handleDelete(product?.id)} className="bg-red-500 p-2 rounded text-white">
                          <FiTrash2 size={16} className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    )}
  </>
)}





          {/* add a new product */}
          <div className="container mx-auto w-3/4 p-3 border-0 rounded shadow mb-3 bg-white">
  <h4 className="text-center pb-3">Add a new Product</h4>
  <form className="container grid gap-4" onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>*English Title:</label>
      <input
        {...register("english_title", { required: true })}
        type="text"
        placeholder="Enter English title"
        className="p-2 border border-green-600 rounded"
      />
      {errors.english_title?.type === 'required' && (
        <p role="alert" className="text-red-500 text-sm col-span-full">Product English title is required*</p>
      )}
      <label htmlFor=''>*Bangla Title:</label>
      <input
        {...register("bangla_title")}
        type="text"
        placeholder="Enter Bangla title"
        className="p-2 border border-green-600 rounded"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>Description:</label>
      <textarea
        {...register("description")}
        placeholder="Description"
        className="p-2 border border-green-600 rounded md:col-span-3"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>*Upload image:</label>
      <input
        {...register("image", { required: true })}
        type="file"
        className="p-2 border border-green-600 rounded"
        accept="image/*"
        onChange={(event) => setSelectedImage(event.target.files[0])}
      />
      {errors.image?.type === 'required' && (
        <p role="alert" className="text-red-500 text-sm col-span-full">Product image is required*</p>
      )}
      <label htmlFor=''>Alt-text:</label>
      <input
        {...register("alt_text")}
        type="text"
        placeholder="Alternate text"
        className="p-2 border border-green-600 rounded"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>Model:</label>
      <input
        {...register("model")}
        type="text"
        placeholder="Model"
        className="p-2 border border-green-600 rounded"
      />
      <label htmlFor=''>Brand:</label>
      <input
        {...register("brand")}
        type="text"
        placeholder="Brand"
        className="p-2 border border-green-600 rounded"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>Purchase from:</label>
      <textarea
        {...register("purchase_from")}
        placeholder="Purchase from"
        className="p-2 border border-green-600 rounded md:col-span-3"
        rows={2}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>*Purchase price:</label>
      <input
        {...register("purchase_price", { required: true })}
        type="number"
        min="0"
        placeholder="Purchase price"
        className="p-2 border border-green-600 rounded"
      />
      {errors.purchase_price?.type === 'required' && (
        <p role="alert" className="text-red-500 text-sm col-span-full">Purchase Price is required*</p>
      )}
      <label htmlFor=''>*Regular price:</label>
      <input
        {...register("regular_price", { required: true })}
        type="number"
        min="0"
        placeholder="Regular price"
        className="p-2 border border-green-600 rounded"
      />
      {errors.regular_price?.type === 'required' && (
        <p role="alert" className="text-red-500 text-sm col-span-full">Regular Price is required*</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>Offer type:</label>
      <select
        className="p-2 border border-green-600 rounded"
        {...register("offer_type")}
        onChange={(e) => selectOfferType(e)}
      >
        <option value="">একটি অফার টাইপ নির্বাচন করুন</option>
        <option value="Percentage">Percentage</option>
        <option value="Flat Discount">Flat Discount</option>
      </select>
      {offerType === 'Percentage' && (
        <>
          <label htmlFor=''>*Percentage:</label>
          <input
            {...register("percentage")}
            type="number"
            min="0"
            placeholder="Percentage value"
            className="p-2 border border-green-600 rounded"
          />
        </>
      )}
      {offerType === 'Flat Discount' && (
        <>
          <label htmlFor=''>*Flat Discount:</label>
          <input
            {...register("flat_discount")}
            type="number"
            min="0"
            placeholder="Flat Discount value"
            className="p-2 border border-green-600 rounded"
          />
        </>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
      <label htmlFor=''>*Stock:</label>
      <input
        {...register("units_stock", { required: true })}
        type="number"
        min="0"
        placeholder="Stock in hand"
        className="p-2 border border-green-600 rounded"
      />
      {errors.units_stock?.type === 'required' && (
        <p role="alert" className="text-red-500 text-sm col-span-full">Units of Stock is required*</p>
      )}
    </div>
    <div className="container w-1/2 mx-auto my-3">
      <input
        type="submit"
        value="Submit"
        className="bg-green-600 text-white py-2 px-4 rounded w-3/4"
      />
    </div>
  </form>
</div>










          {/* view all products */}
          <div className="container mx-auto w-full mb-4">
  <h4 className="text-center text-lg font-semibold">Stationaries List</h4>
  <hr className="w-1/4 mx-auto my-2 border-t-2 border-gray-300" />
  <div className="bg-white overflow-x-auto">
    <table className="w-full mb-3 overflow-y-auto table-auto border-collapse">
      <thead className="bg-gray-100">
        <tr className="text-green-600">
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">English Title</th>
          <th className="px-4 py-2 border">Bangla Title</th>
          <th className="px-4 py-2 border">Image</th>
          <th className="px-4 py-2 border">Purchase Price</th>
          <th className="px-4 py-2 border">Regular Price</th>
          <th className="px-4 py-2 border">Discount Price</th>
          <th className="px-4 py-2 border">Stock</th>
          <th className="px-4 py-2 border">Sold</th>
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {displayItems?.map((product) => (
          <tr key={product?.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border text-center">{product?.id}</td>
            <td className="px-4 py-2 border">{product?.english_title}</td>
            <td className="px-4 py-2 border">{product?.bangla_title}</td>
            <td className="px-4 py-2 border text-center">
              <img
                src={product?.image}
                alt={product?.alt_text}
                className="h-12 w-12 object-cover"
              />
            </td>
            <td className="px-4 py-2 border text-center">{product?.purchase_price}</td>
            <td className="px-4 py-2 border text-center">{product?.regular_price}</td>
            <td className="px-4 py-2 border text-center">{product?.discount_price}</td>
            <td className="px-4 py-2 border text-center">{product?.units_stock}</td>
            <td className="px-4 py-2 border text-center">{product?.units_sold}</td>
            <td className="px-4 py-2 border text-center">
              <Link 
                href={`/update-stationary/${product.id}`} 
                
              >
                {/* <FiEdit  /> */}
                 <button 
                 type='button'
                 className="p-1 bg-blue-600 text-white rounded m-1">
                  <FiEdit  />
                </button>
              </Link>
              {/* <button
                onClick={() => handleDelete(product?.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
              >
                <FiTrash2 size={16} className="w-4 h-4" />
              </button> */}
              <AlertDialog>
  <AlertDialogTrigger asChild>
    <button
    type='button'
    className="p-1 bg-red-500 text-white rounded m-1">
      <FiTrash2  />
    </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the author.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(product?.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  <div className=" container w-3/4 mx-auto mt-5">
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                offset={offset}
              />
            </div>
</div>
</div>
         {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Category Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Category Deleted
          </AlertDescription>
        </Alert>
      )}

      {showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Category Can't be Deleted
          </AlertDescription>
        </Alert>
      )}


        {/* </div>
      </div> */}
    </>
  );
}
