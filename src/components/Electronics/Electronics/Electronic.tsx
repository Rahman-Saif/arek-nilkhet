'use client'
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';

const Electronic = ({ product, handleAddToCart }) => {
  return (
    <div className="w-full h-[450px] px-2 mb-4">
  <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
    <a href={`/electronics/${product.id}`} className="overflow-hidden">
      <img
        className="w-full h-52 object-cover"
        src={product?.image}
        alt={product?.alt_text}
      />
    </a>
    <div className="p-4 flex-1">
      <h5 className="text-black text-base  mb-2">
        <Link href={`/electronics/${product.id}`}>{product?.english_title}</Link>
      </h5>
      {product?.discount_price === 0 || product?.discount_price === null ? (
        <p className="text-gray-800">{product?.regular_price} টাকা</p>
      ) : (
        <div className="flex items-baseline space-x-2">
          <p className="text-gray-500 line-through">{product?.regular_price} টাকা</p>
          <p className="text-red-600">{product?.discount_price} টাকা</p>
        </div>
      )}
    </div>
    {product?.units_stock <= 10 && product?.units_stock >= 1 && (
      <div className="text-center mb-4">
        <strong className="text-blue-500">
          *** Last {product?.units_stock} pcs in stock! ***
        </strong>
      </div>
    )}
    <div className="p-4 border-t">
      <button className="w-full bg-[#fac309] hover:bg-[#fc8c0c] text-white py-2 rounded mb-2 text-base ">
        <Link href={`/electronics/${product.id}`}>Read more</Link>
      </button>
      {product?.units_stock !== 0 ? (
        <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(product)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
      ) : (
        <button
          className="w-full bg-gray-500 text-white py-2 rounded text-sm font-medium cursor-not-allowed"
          disabled
        >
          Stock out!
        </button>
      )}
    </div>
  </div>
</div>


  );
};
export default Electronic;
