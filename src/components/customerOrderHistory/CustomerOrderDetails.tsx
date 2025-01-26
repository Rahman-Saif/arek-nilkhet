// import React from 'react'
import AdminNavbar from '../AdminDashboard/AdminNavbar/AdminNavbar';
import React, { useEffect, useState } from 'react'
import SideBar from '../AdminDashboard/SideBar/SideBar';
import Link from 'next/link';
// import { url } from '@/app/page';
import { FiX } from 'react-icons/fi';


const CustomerOrderDetails = ({id}) => {
      const [prevOrders, setprevOrders] = useState([]);
              const url = process.env.NEXT_PUBLIC_URL;

  

    useEffect(() => {
        fetch(`${url}/api/order/${id}/`)
       .then(res => res.json())
       .then(result => {
        console.log('result   of orderssss   ',result);
        setprevOrders(result);
        // const pageNumber = (Math.floor(result.length/20))+1;
        // setPageCount(pageNumber);
        // setDisplayItems(result.slice(offset, (offset+(20*1))));
     });
   }, []);
  return (
    <div className="max-w-5xl mx-auto my-6 p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-semibold text-center mb-3">Order Information</h3>
      <hr className="w-1/2 mx-auto mb-6 border-t border-gray-200" />
      <form className="max-w-4xl mx-auto" >



        <div className="grid grid-cols-4 gap-4 mb-6">
            <label className="self-center">Name:</label>
            <input
            //   {...register("english_title")}
              defaultValue={prevOrders?.name}
              type="text"
              readOnly
              placeholder="Enter book's english title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />

            <label className="self-center">Phone Number:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.phone_number}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Optional Phone Number:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.optional_phone_number}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Phone Email:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.email}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Delivery Address:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.delivery_address}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">District:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.district}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Delivery Option:</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.delivery_option}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Payment Option :</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.payment_option}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Total Price :</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.total}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Transaction ID :</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.transaction_id}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            <label className="self-center">Parcel Weight :</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.parcel_weight}
              type="text" 
              readOnly
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />    
            {/* <label className="self-center">Payment Option :</label>
            <input
            //   {...register("bangla_title")}
              defaultValue={prevOrders?.payment_option}
              type="text" 
              placeholder="Enter book's bangla title"
              className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />     */}
        </div>

        {/* <div className="grid grid-cols-4 gap-4 mb-6">     
          <label className="self-center">Optional Phone Number:</label>
          <select 
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500" 
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
        </div> */}

        {/* <div className="grid grid-cols-6 gap-4 mb-6">
          <label className="self-start">Description:</label>
          <textarea
            {...register("description")}
            defaultValue={details?.description}
            placeholder="description"
            className="col-span-5 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={10}
          />
        </div> */}



        
        {/* <div className="grid grid-cols-4 gap-4 mb-6">
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
        </div> */}

        {/* {details?.image && (
          <img 
            src={details?.image} 
            alt={details?.alt_text} 
            className="h-24 w-24 object-cover rounded p-2"
          />
        )} */}

        {/* <div className="grid grid-cols-4 gap-4 mb-6"> */}
          {/* <label className="self-center">Upload image:</label>
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
          /> */}

          {/* <label className="self-center">Alt-text:</label>
          <input
            {...register("alt_text")}
            defaultValue={details?.alt_text}
            type="text"
            placeholder="alternate text"
            className="p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div> */}




        
        {/* <div className="grid grid-cols-4 gap-4 mb-6">
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
        </div> */}

        {/* <div className="grid grid-cols-4 gap-4 mb-6">
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
        </div> */}





        
        {/* {details?.pdf && <img src={details?.image} alt={details?.alt_text} height="100px" width="100px" className="p-2"/>}
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        </div> */}

        {/* <div className="grid grid-cols-6 gap-4 mb-6">
          <label className="self-start">Purchase from:</label>
          <textarea
            {...register("purchase_from")}
            defaultValue={details?.purchase_from}
            placeholder="purchase from"
            className="col-span-5 p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            rows={4}
          />
        </div> */}




{/*         
        <div className="grid grid-cols-4 gap-4 mb-6">
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

        <div className="grid grid-cols-4 gap-4 mb-6">
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






        
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        </div> */}
      </form>
     
    </div>
  )
}

export default CustomerOrderDetails
