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


export default function UpdateElectronics({electronics,id}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [offerType, setOfferType] = useState('');
          const url = process.env.NEXT_PUBLIC_URL;

  
  useEffect(() => {
    const matchProduct = electronics.find((product) => product.id == id);
    setDetails(matchProduct);
    setOfferType(matchProduct?.offer_type);
  }, [id, electronics]);

  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }

  //electronics updated function
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
    if(offerType==='null' || offerType===''){
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
    if(!data.category){
      data.category = details?.category;
    }
    if(!data.model){
      data.model = details?.model;
    }
    if(!data.brand){
      data.brand = details?.brand;
    }
    if(!data.warranty){
      data.warranty = details?.warranty;
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
    formData.append('category', details?.category );
    formData.append('description', data.description);
    formData.append('type', 'electronics');
    formData.append('model', data.model);
    formData.append('brand', data.brand);
    formData.append('warranty', data.warranty);
    formData.append('offer_type', data.offer_type);
    formData.append('percentage', data.percentage);
    formData.append('flat_discount', data.flat_discount);
    formData.append('purchase_from', data.purchase_from);
    formData.append('purchase_price', data.purchase_price);
    formData.append('regular_price', data.regular_price);
    formData.append('discount_price', data.discount_price);
    formData.append('units_stock', data.units_stock);
    formData.append('units_sold', data.units_sold);
    formData.append('is_active', 'true');
    formData.append('alt_text', data.alt_text);

    // Log the FormData contents
    console.log("FormData as object:", Object.fromEntries(formData.entries()));
    
    fetch(`${url}/api/product/${id}/`, {
      method: "PUT",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      else return res.json();
    })
    .then(getData => {
      alert("Product updated Successfully!");
      reset();
        setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-electronics');
}, 3000); 
      // history.push('/admin-electronics');
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
      <hr className="w-1/2 mx-auto mb-6" />
      <form className="max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>



        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            <label className="py-2">English Title:</label>
            <input
              {...register("english_title")}
              defaultValue={details?.english_title}
              type="text"
              placeholder="Enter electronics english title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <label className="py-2">Bangla Title:</label>
            <input
              {...register("bangla_title")}
              defaultValue={details?.bangla_title}
              type="text"
              placeholder="Enter electronics bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            <label className="py-2 md:col-span-1">Description:</label>
            <textarea
              {...register("description")}
              defaultValue={details?.description}
              placeholder="description"
              className="p-2 md:col-span-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              rows={10}
            />
        </div>

        {details?.image && (
          <img 
            src={details?.image} 
            alt={details?.alt_text} 
            className="h-24 w-24 object-cover rounded p-2"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            <label className="py-2">Upload image:</label>
            <input
                {...register("image")}
                type="file"
                id="choose-file"
                placeholder="Upload an image"
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                accept="image/*"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
            />
            <label className="py-2">Alt-text:</label>
            <input
                {...register("alt_text")}
                defaultValue={details?.alt_text}
                type="text"
                placeholder="alternate text"
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
        </div>










        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2 md:col-span-1">Purchase from:</label>
          <textarea
            {...register("purchase_from")}
            defaultValue={details?.purchase_from}
            placeholder="purchase from"
            className="p-2 md:col-span-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2">Offer type:</label>
          {details?.offer_type !== '' ? (
            <>
              <select 
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                {...register("offer_type")}
                onChange={(e) => selectOfferType(e)}
              >
                {details?.offer_type && (
                  <option value={details?.offer_type}>{details?.offer_type}</option>
                )}
                <option value="null">একটি অফার টাইপ নির্বাচন করুন</option>
                <option value="Percentage">Percentage</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>

              {offerType === 'Percentage' && (
                <>
                  <label className="py-2">Percentage:</label>
                  <input
                    {...register("percentage")}
                    type="number"
                    defaultValue={details?.percentage}
                    min="0"
                    placeholder="Percentage value"
                    className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </>
              )}

              {offerType === 'Flat Discount' && (
                <>
                  <label className="py-2">Flat Discount:</label>
                  <input
                    {...register("flat_discount")}
                    type="number"
                    min="0"
                    defaultValue={details?.flat_discount}
                    placeholder="Flat Discount value"
                    className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </>
              )}
            </>
          ) : (
            <>
              <select 
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                {...register("offer_type")}
                onChange={(e) => selectOfferType(e)}
              >
                <option value="null">একটি অফার টাইপ নির্বাচন করুন</option>
                <option value="Percentage">Percentage</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>

              {offerType === 'Percentage' && (
                <>
                  <label className="py-2">Percentage:</label>
                  <input
                    {...register("percentage")}
                    type="number"
                    min="0"
                    placeholder="Percentage value"
                    className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </>
              )}

              {offerType === 'Flat Discount' && (
                <>
                  <label className="py-2">Flat Discount:</label>
                  <input
                    {...register("flat_discount")}
                    type="number"
                    min="0"
                    placeholder="Flat Discount value"
                    className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </>
              )}
            </>
          )}
        </div>





        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2">Purchase price:</label>
          <input
            {...register("purchase_price")}
            defaultValue={details?.purchase_price}
            type="number"
            min="0"
            placeholder="purchase price"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <label className="py-2">Regular price:</label>
          <input
            {...register("regular_price")}
            defaultValue={details?.regular_price}
            type="number"
            min="0"
            placeholder="regular price"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2">Stock:</label>
          <input
            {...register("units_stock")}
            defaultValue={details?.units_stock}
            type="number"
            min="0"
            placeholder="stock in hand"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <label className="py-2">Sold:</label>
          <input
            {...register("units_sold")}
            defaultValue={details?.units_sold}
            type="number"
            min="0"
            placeholder="sold quantity"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2">Model:</label>
          <input
            {...register("model")}
            defaultValue={details?.model}
            type="text"
            placeholder="model"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <label className="py-2">Brand:</label>
          <input
            {...register("brand")}
            defaultValue={details?.brand}
            type="text"
            placeholder="brand"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <label className="py-2">Warranty:</label>
          <input
            {...register("warranty")}
            defaultValue={details?.warranty}
            type="text"
            placeholder="warranty"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-center gap-4 w-1/2 mx-auto">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Update
          </button>
          <Link 
            href='/admin-electronics' 
            className="flex-1 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-center"
          >
            Cancel <FiX className="inline ml-1" />
          </Link>
        </div>


        
      </form>
    </div>
  );
}
