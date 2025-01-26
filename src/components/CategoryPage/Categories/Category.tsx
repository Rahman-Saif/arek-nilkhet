'use client'

import Link from 'next/link';
import React from 'react';
// import { NavLink } from 'react-router-dom';

const Category = ({category}) => {
    return (
    <div className="flex flex-col h-full">
  <div className="bg-white border-0 shadow-lg h-full flex flex-col items-center p-4">
    <i className="fa-solid fa-book-open text-4xl p-2 text-custom-color"></i>
    <div className="text-center mt-4">
      <h5 className="text-yellow-500 text-lg font-semibold">
        <Link href={`/category/${category.name}`}>{category?.name}</Link>
      </h5>
      <button className="bg-yellow-500 px-2 py-1 shadow text-white rounded mt-3">
        <Link href={`/category/${category.name}`}>View All Books</Link>
      </button>
    </div>
  </div>
</div>

    );
}

export default Category;