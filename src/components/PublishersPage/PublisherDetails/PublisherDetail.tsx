'use client'
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';

const PublisherDetail = ({ book, handleAddToCart }) => {
  // console.log('bookkkkk',book);
  return (
    <div className="ml-4 w-11/12 md:w-full  ">
      <div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Book Image */}
        <a href={`/books/${book.id}`} className="flex justify-center">
          <img
            className="object-cover watermark w-full"
            style={{ height: "300px", width: "100%" }}
            src={book?.image}
            alt={book?.alt_text}
          />
        </a>

        {/* Card Body */}
        <div className="flex flex-col flex-grow p-6">
          <h5 className="text-base  text-black mb-3">
            <Link href={`/books/${book.id}`}>{book?.english_title}</Link>
          </h5>

          {/* Price Display */}
          {(book?.discount_price === 0 || book?.discount_price === null) ? (
            <p className="text-start text-gray-800">{book?.regular_price} টাকা</p>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-start text-gray-500 line-through">{book?.regular_price} টাকা</p>
              <p className="text-start text-red-500">{book?.discount_price} টাকা</p>
            </div>
          )}
        </div>

        {/* Stock Information */}
        {(book?.units_stock <= 10 && book?.units_stock >= 1) && (
          <div className="text-center mb-2">
            <strong className="text-blue-500">
              *** Last {book?.units_stock} pcs in stock! ***
            </strong>
          </div>
        )}

        {/* Card Footer */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* Read More Button */}
          <button className="w-full rounded bg-[#fac309] py-2 my-2 hover:bg-[#f48c0c]">
            <Link className="text-white text-sm font-medium" href={`/books/${book.id}`}>
              Read more
            </Link>
          </button>

          {/* Add to Cart Button */}
          {book?.units_stock !== 0 ? (
           <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(book)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
          ) : (
            <button className="w-full rounded bg-gray-500 py-2 cursor-not-allowed" disabled>
              <span className="text-white text-sm font-medium">Stock out!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PublisherDetail;
