'use client'
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';

const AuthorDetail = ({ book, handleAddToCart }) => {
  return (
  <div className="w-11/12 md:w-full flex flex-col">
  <div className=" shadow-md rounded-lg h-full flex flex-col">
    <a href={`/books/${book.id}`}>
      <img
        className="object-cover w-full h-48 image-watermark"
        src={book?.image}
        alt={book?.alt_text}
      />
    </a>
    <div className="p-4 flex-1">
      <h5 className="text-base text-black">
        <Link href={`/books/${book.id}`}>{book?.english_title}</Link>
      </h5>
      {book?.discount_price === 0 || book?.discount_price === null ? (
        <p className="text-base text-gray-800 mt-2">{book?.regular_price} ৳</p>
      ) : (
        <div className="flex items-center mt-2">
          <p className="text-gray-800 line-through mr-2">{book?.regular_price} ৳</p>
          <p className="text-red-600">{book?.discount_price} ৳</p>
        </div>
      )}
    </div>
    {book?.units_stock <= 10 && book?.units_stock >= 1 && (
      <div className="text-center text-blue-500 font-medium">
        *** Last {book?.units_stock}pcs in stock! ***
      </div>
    )}
    <div className="p-4 bg-white border-t border-gray-200">
      <button className="w-full py-2 bg-[#fac309] text-white rounded-md mb-2 hover:bg-[#f48c0c]">
        <Link href={`/books/${book.id}`} className="text-white text-sm">
          Read more
        </Link>
      </button>
      {book?.units_stock !== 0 ? (
        <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(book)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
      ) : (
        <button className="w-full py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
          <span className="text-sm">Stock out!</span>
        </button>
      )}
    </div>
  </div>
</div>

  );
};
export default AuthorDetail;
