'use client'
import React from 'react';
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
import useCategoryByID from '../../../Hooks/CallByID/useCategoryByID';
import useAuthorByID from '../../../Hooks/CallByID/useAuthorByID';
import usePublisherByID from '../../../Hooks/CallByID/usePublisherByID';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { FiX } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";



export default function UpdateBook({id, books, categories, authors, publishers}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [ selectedPDF,setSelectedPDF ] = useState(null);
  const [offerType, setOfferType] = useState('');
    const [showAlert, setShowAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;

  
  useEffect(() => {
    const matchBook = books.find((book) => book.id == id);
    setDetails(matchBook);
    setOfferType(matchBook?.offer_type);
  }, [id, books]);

  const [singleCategory] = useCategoryByID(details?.category);
  const [author] = useAuthorByID(details?.author);
  const [publisher] = usePublisherByID(details?.publisher);

  //offer_type select
  const selectOfferType = (e) =>{
    setOfferType(e.target.value);
  }

  //books updated function
  const onSubmit = data => {

    let formData = new FormData();
    
    if(!data.purchase_price){
      data.purchase_price=details?.purchase_price;
    }
    if(!data.regular_price){
      data.regular_price=details?.regular_price;
    }
    if(!data.discount_price){
      data.discount_price=details?.discount_price;
    }
    if(!data.percentage){
      data.percentage=details?.percentage;
    }
    if(!data.flat_discount){
      data.flat_discount=details?.flat_discount;
    }
    if(offerType==='' || offerType==='null'){
      data.offer_type='';
      data.discount_price=0;
      data.percentage = 0;
      data.flat_discount = 0;
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
    if(data.units_sold===''){
      data.units_sold=0;
    }
    if(selectedPDF!==null){
      formData.append('pdf', selectedPDF);
    }
    if(data.description===''){
      data.description = '';
    }
    if(data.total_page){
      formData.append('total_page', data.total_page);
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
    if(!data.author){
      data.author = details?.author;
    }
    if(!data.publisher){
      data.publisher = details?.publisher;
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
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('type', 'books');
    formData.append('author', data.author);
    formData.append('publisher', data.publisher);
    formData.append('isbn', data.isbn);
    formData.append('edition', data.edition);
    formData.append('language', data.language);
    formData.append('country', data.country);
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
    
    fetch(`${url}/api/product/${id}/`, {
      method: "PUT",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      else return res.json();
    })
    .then(getData => {
      // alert("Book updated Successfully!");
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
      // reset();
        setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-books');
}, 3000); 
      // history.push('/admin-books');
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
    <div className="max-w-5xl mx-auto my-6 p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-semibold text-center mb-3">Update Book Information</h3>
      <hr className="w-1/2 mx-auto mb-6 border-t border-gray-200" />
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>



        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <label className="self-center">Book English Title:</label>
            <input
              {...register("english_title")}
              defaultValue={details?.english_title}
              type="text"
              placeholder="Enter book's english title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />

            <label className="self-center">Book Bangla Title:</label>
            <input
              {...register("bangla_title")}
              defaultValue={details?.bangla_title}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">     
          <label className="self-center">Category:</label>
          <select 
            className="col-span-3 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
            {...register("category")}
          >
              <option value={details?.category} key={details?.category}>
                {singleCategory.name}
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-start">Description:</label>
          <textarea
            {...register("description")}
            defaultValue={details?.description}
            placeholder="description"
            className="col-span-3 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={10}
          />
        </div>



        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Author:</label>
          <select 
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
            {...register("author")}
          >
            <option value={details?.author} key={details?.author}>{author.name}</option>
            {authors.map((author) => (
              <option value={author.id} key={author.id}>{author.name}</option>
            ))}
          </select>
                
          <label className="self-center">Publisher:</label>
          <select 
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
            {...register("publisher")}
          >
            <option value={details?.publisher} key={details?.publisher}>{publisher.name}</option>
            {publishers.map((publisher) => (
              <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
            ))}
          </select>   
        </div>

        {details?.image && (
          <img 
            src={details?.image} 
            alt={details?.alt_text} 
            className="h-24 w-24 object-cover rounded p-2"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Upload image:</label>
          <input
            {...register("image")}
            type="file"
            id="choose-file"
            placeholder="Upload an Book image"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500
                     file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                     file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                     hover:file:bg-green-100"
            accept="image/*"
            onChange={(event) => {setSelectedImage(event.target.files[0])}}
          />

          <label className="self-center">Alt-text:</label>
          <input
            {...register("alt_text")}
            defaultValue={details?.alt_text}
            type="text"
            placeholder="alternate text"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>




        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">ISBN:</label>
          <input
            {...register("isbn")}
            defaultValue={details?.isbn}
            type="text"
            placeholder="isbn no."
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <label className="self-center">Edition:</label>
          <input
            {...register("edition")}
            defaultValue={details?.edition}
            type="text"
            placeholder="edition"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Language:</label>
          <input
            {...register("language")}
            defaultValue={details?.language}
            type="text"
            placeholder="language"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <label className="self-center">Country:</label>
          <input
            {...register("country")}
            defaultValue={details?.country}
            type="text"
            placeholder="country"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>





        
        {details?.pdf && <img src={details?.image} alt={details?.alt_text} height="100px" width="100px" className="p-2"/>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Total page:</label>
          <input
            {...register("total_page")}
            defaultValue={details?.total_page}
            type="number"
            min="0"
            placeholder="total_page"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <label className="self-center">PDF:</label>
          <input
            {...register("pdf")}
            type="file"
            id="choose-file"
            placeholder="Upload an Book PDF"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500
                     file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                     file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                     hover:file:bg-green-100"
            accept=".pdf"
            onChange={(event) => {setSelectedPDF(event.target.files[0])}}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-start">Purchase from:</label>
          <textarea
            {...register("purchase_from")}
            defaultValue={details?.purchase_from}
            placeholder="purchase from"
            className="col-span-3 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={4}
          />
        </div>




        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Offer type:</label>
          {details?.offer_type !== '' && (
            <>
              <select 
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
                {...register("offer_type")} 
                onChange={(e) => selectOfferType(e)}
              >
                {details?.offer_type && <option value={details?.offer_type}>{details?.offer_type}</option>}
                <option value="null">একটি অফার টাইপ নির্বাচন করুন</option>
                <option value="Percentage">Percentage</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>

              {offerType === 'Percentage' && (
                <>
                  <label className="self-center">Percentage:</label>
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
                  <label className="self-center">Flat Discount:</label>
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
          )}

          {details?.offer_type === '' && (
            <>
              <select 
                className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
                {...register("offer_type")} 
                onChange={(e) => selectOfferType(e)}
              >
                <option value="null">একটি অফার টাইপ নির্বাচন করুন</option>
                <option value="Percentage">Percentage</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>

              {offerType === 'Percentage' && (
                <>
                  <label className="self-center">Percentage:</label>
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
                  <label className="self-center">Flat Discount:</label>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Purchase price:</label>
          <input
            {...register("purchase_price")}
            defaultValue={details?.purchase_price}
            type="number"
            min="0"
            placeholder="purchase price"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <label className="self-center">Regular price:</label>
          <input
            {...register("regular_price")}
            defaultValue={details?.regular_price}
            type="number"
            min="0"
            placeholder="regular price"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>






        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className="self-center">Stock:</label>
          <input
            {...register("units_stock")}
            defaultValue={details?.units_stock}
            type="number"
            min="0"
            placeholder="stock in hand"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          
          <label className="self-center">Sold:</label>
          <input
            {...register("units_sold")}
            defaultValue={details?.units_sold}
            type="number"
            min="0"
            placeholder="sold quantity"
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
            href="/admin-books" 
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cancel <FiX className="w-4 h-4" />
          </Link>
        </div>
      </form>
      {showAlert && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Book updated Successfully!</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

