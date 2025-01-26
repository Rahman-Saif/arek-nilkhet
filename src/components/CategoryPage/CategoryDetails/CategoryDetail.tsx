'use client'

import Link from 'next/link';
import React from 'react';
// import { NavLink } from 'react-router-dom';

const CategoryDetail = ({ book, handleAddToCart }) => {
  return (
    <div className="col">
      <div className="h-full bg-white shadow-md rounded-lg overflow-hidden">
        <a href={`/books/${book.id}`}>
          <img className="w-full h-48 object-cover" src={book?.image} alt={book?.alt_text} />
        </a>
        <div className="p-4">
          <h5 className="text-lg font-bold text-yellow-500">
            <Link href={`/books/${book.id}`}>{book?.english_title}</Link>
          </h5>
          {(book?.discount_price === 0 || book?.discount_price === null) ? (
            <p className="text-base text-gray-800">{book?.regular_price} টাকা</p>
          ) : (
            <div className="flex items-center">
              <div className="mr-2">
                <p className="text-base text-gray-800 line-through">{book?.regular_price} টাকা</p>
              </div>
              <div className="ml-2">
                <p className="text-base text-red-600">{book?.discount_price} টাকা</p>
              </div>
            </div>
          )}
        </div>
        {(book?.units_stock <= 10 && book?.units_stock >= 1) && (
          <div className="text-center">
            <strong className="text-blue-600">*** Last {book?.units_stock}pcs in stock! ***</strong>
          </div>
        )}
        <div className="p-4 bg-white border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded mb-2">
            <Link className="text-white" href={`/books/${book.id}`}>
              Read more
            </Link>
          </button>
          {book?.units_stock !== 0 ? (
            <button className="w-full bg-green-500 text-white py-2 rounded" onClick={() => handleAddToCart(book)}>
              <span>Add to cart <i className="fa fa-plus"></i></span>
            </button>
          ) : (
            <button className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed" disabled>
              <span>Stock out!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryDetail;
