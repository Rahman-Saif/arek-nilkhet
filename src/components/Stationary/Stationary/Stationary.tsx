'use client'
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';

const Stationary = ({ product, handleAddToCart }) => {
  return (
    <div className="w-full h-[450px] px-2 mb-4">
  <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
    <a href={`/stationary/${product.id}`} className="overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={product?.image}
        alt={product?.alt_text}
      />
    </a>
    <div className="p-4 flex-1 flex flex-col">
      <h5 className="text-base text-black  mb-2">
        <Link href={`/stationary/${product.id}`}>{product?.english_title}</Link>
      </h5>
      {product?.discount_price === 0 || product?.discount_price === null ? (
        <p className="text-gray-800">{product?.regular_price} টাকা</p>
      ) : (
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 line-through">
            {product?.regular_price} টাকা
          </p>
          <p className="text-red-500">{product?.discount_price} টাকা</p>
        </div>
      )}
    </div>
    {product?.units_stock <= 10 && product?.units_stock >= 1 && (
      <div className="text-center text-blue-500 font-semibold mb-2">
        *** Last {product?.units_stock}pcs in stock! ***
      </div>
    )}
    <div className="p-4 bg-white border-t flex flex-col space-y-2">
      <button className="w-full bg-[#fac309] hover:bg-[#fc8c0c] text-white text-base py-2 rounded">
        <Link href={`/stationary/${product.id}`} className="text-base">
          Read more
        </Link>
      </button>
      {product?.units_stock !== 0 ? (
        <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(product)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
      ) : (
        <button
          className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
          disabled
        >
          <span className="text-sm">Stock out!</span>
        </button>
      )}
    </div>
  </div>
</div>


  );
};
export default Stationary;
