'use client'
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import {url} from '../../../App';
import { FiX } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function UpdateStationary({stationaries,id}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [offerType, setOfferType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;


  
  useEffect(() => {
    const matchProduct = stationaries.find((product) => product.id == id);
    setDetails(matchProduct);
    setOfferType(matchProduct?.offer_type);
  }, [id, stationaries]);

  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }

  //stationaries updated function
  const onSubmit = data => {

    let formData = new FormData();

    if(!data.purchase_price){
      data.purchase_price=details?.purchase_price;
    }
    if(!data.regular_price){
      data.regular_price=details?.regular_price;
    }
    if(details?.discount_price!==0){
      data.discount_price=details?.discount_price;
    }
    if(offerType==='Percentage'){
      data.offer_type = offerType;
      let percentage_value = data.regular_price*(data.percentage/100);
      data.discount_price = parseInt(data.regular_price-percentage_value);
      data.flat_discount = 0;
    }
    if(offerType==='Flat Discount'){
      data.offer_type = offerType;
      data.discount_price = parseInt(data.regular_price-data.flat_discount);
      data.percentage = 0;
    }
    if(offerType==='' || offerType==='null'){
      data.offer_type='';
      data.discount_price=0;
      data.percentage = 0;
      data.flat_discount = 0;
    }
    if(data.description===''){
      data.description = '';
    }
    if(!data.english_title){
      data.english_title = details?.english_title;
    }
    if(!data.bangla_title){
      data.bangla_title = details?.bangla_title;
    }
    if(!data.model){
      data.model = details?.model;
    }
    if(!data.brand){
      data.brand = details?.brand;
    }
    if(data.units_sold===''){
      data.units_sold=0;
    }
    if(selectedImage!==null){
      formData.append('image', selectedImage);
    }
    if(!data.alt_text){
      if(!details?.alt_text){
        data.alt_text = data.english_title;
      }
      else{
        data.alt_text = details?.alt_text;
      }
    }
    formData.append('english_title', data.english_title);
    formData.append('bangla_title', data.bangla_title);
    formData.append('category', details?.category);
    formData.append('description', data.description);
    formData.append('type', 'stationary');
    formData.append('model', data.model);
    formData.append('brand', data.brand);
    formData.append('offer_type', data.offer_type);
    formData.append('percentage', data.percentage);
    formData.append('purchase_from', data.purchase_from);
    formData.append('purchase_price', data.purchase_price);
    formData.append('flat_discount', data.flat_discount);
    formData.append('regular_price', data.regular_price);
    formData.append('discount_price', data.discount_price);
    formData.append('units_stock', data.units_stock);
    formData.append('units_sold', data.units_sold);
    formData.append('is_active', 'true');
    formData.append('alt_text', data.alt_text);
    
    fetch(`${url}/api/product/${id}/`, {
      method: "PUT",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      else return res.json();
    })
    .then(getData => {
      // alert("Product updated Successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      reset();
        setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-stationary');
}, 3000); 
      // history.push('/admin-stationary');
    })
    .catch(err => {
      err.json().then(text => {
        if (text?.error) {
          console.log(text?.error);
          return;
        }
    })
      console.log(err.statusText);
    });
    
  }

  return (
    <div className="max-w-4xl mx-auto my-5 p-6 bg-gray-50 rounded-lg shadow">
      <h3 className="text-2xl font-semibold text-center mb-3">Update Product Information</h3>
      <hr className="w-1/2 mx-auto mb-6 border-t border-gray-200" />
      <form className="max-w-3xl mx-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>



        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="self-center text-right">English Title:</label>
          <div className="col-span-3">
            <input
              {...register("english_title")}
              defaultValue={details?.english_title}
              type="text"
              placeholder="Enter english title"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="self-center text-right">Bangla Title:</label>
          <div className="col-span-3">
            <input
              {...register("bangla_title")}
              defaultValue={details?.bangla_title}
              type="text"
              placeholder="Enter bangla title"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="self-center text-right">Description:</label>
          <div className="col-span-3">
            <textarea
              {...register("description")}
              defaultValue={details?.description}
              placeholder="description"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              rows={10}
            />
          </div>
        </div>




        
        {details?.image && <img src={details?.image} alt={details?.alt_text} height="100px" width="100px" className="p-2"/>}
        <div className="grid grid-cols-4 gap-6 mb-4 ">
            <label className="">Upload image:</label>
            <div className="col-span-3">
              <input
                {...register("image")}
                type="file"
                id="choose-file"
                placeholder="Upload an image"
                className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                accept="image/*"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-4 ">
            <label className=" ">Alt-text:</label>
            <div className="col-span-3">
              <input
                {...register("alt_text")}
                defaultValue={details?.alt_text}
                type="text"
                placeholder="alternate text"
                className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-4 ">
            <label className=" ">Model:</label>
            <div className="col-span-3">
              <input
                {...register("model")}
                defaultValue={details?.model}
                type="text"
                placeholder="model"
                className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-4 ">
            <label className=" ">Brand:</label>
            <div className="col-span-3">
              <input
                {...register("brand")}
                defaultValue={details?.brand}
                type="text"
                placeholder="brand"
                className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
        </div>



        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Purchase from:</label>
          <div className="col-span-3">
            <textarea
              {...register("purchase_from")}
              defaultValue={details?.purchase_from}
              placeholder="purchase from"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Offer type:</label>
          <div className="col-span-3">
            {details?.offer_type !== '' && (
              <>
                <select 
                  className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white" 
                  {...register("offer_type")}  
                  onChange={(e)=>selectOfferType(e)}
                >
                  {details?.offer_type && <option value={details?.offer_type}>{details?.offer_type}</option>}
                  <option value='null'>একটি অফার টাইপ নির্বাচন করুন</option>
                  <option value='Percentage'>Percentage</option>
                  <option value='Flat Discount'>Flat Discount</option>
                </select>

                {offerType === 'Percentage' && (
                  <div className="grid grid-cols-4 gap-6 mt-4">
                    <label className="">Percentage:</label>
                    <div className="col-span-3">
                      <input
                        {...register("percentage")}
                        type="number"
                        defaultValue={details?.percentage}
                        min="0"
                        placeholder="Percentage value"
                        className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {offerType === 'Flat Discount' && (
                  <div className="grid grid-cols-4 gap-6 mt-4">
                    <label className="">Flat Discount:</label>
                    <div className="col-span-3">
                      <input
                        {...register("flat_discount")}
                        type="number"
                        min="0"
                        defaultValue={details?.flat_discount}
                        placeholder="Flat Discount value"
                        className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {details?.offer_type === '' && (
              <>
                <select 
                  className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white" 
                  {...register("offer_type")}  
                  onChange={(e)=>selectOfferType(e)}
                >
                  <option value='null'>একটি অফার টাইপ নির্বাচন করুন</option>
                  <option value='Percentage'>Percentage</option>
                  <option value='Flat Discount'>Flat Discount</option>
                </select>

                {offerType === 'Percentage' && (
                  <div className="grid grid-cols-4 gap-6 mt-4">
                    <label className="">Percentage:</label>
                    <div className="col-span-3">
                      <input
                        {...register("percentage")}
                        type="number"
                        min="0"
                        placeholder="Percentage value"
                        className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {offerType === 'Flat Discount' && (
                  <div className="grid grid-cols-4 gap-6 mt-4">
                    <label className="">Flat Discount:</label>
                    <div className="col-span-3">
                      <input
                        {...register("flat_discount")}
                        type="number"
                        min="0"
                        placeholder="Flat Discount value"
                        className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>




        

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Purchase price:</label>
          <div className="col-span-3">
            <input
              {...register("purchase_price")}
              defaultValue={details?.purchase_price}
              type="number"
              min="0"
              placeholder="purchase price"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Regular price:</label>
          <div className="col-span-3">
            <input
              {...register("regular_price")}
              defaultValue={details?.regular_price}
              type="number"
              min="0"
              placeholder="regular price"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Stock:</label>
          <div className="col-span-3">
            <input
              {...register("units_stock")}
              defaultValue={details?.units_stock}
              type="number"
              min="0"
              placeholder="stock in hand"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-4">
          <label className="">Sold:</label>
          <div className="col-span-3">
            <input
              {...register("units_sold")}
              defaultValue={details?.units_sold}
              type="number"
              min="0"
              placeholder="sold quantity"
              className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="flex justify-center gap-4 w-1/2 mx-auto">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Update
          </button>
          <Link 
            href='/admin-stationary' 
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cancel <FiX className="w-4 h-4" />
          </Link>
        </div>


        
      </form>
       {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Stationary Updated
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
