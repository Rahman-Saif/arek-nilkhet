'use client'
import Link from 'next/link';
import React from 'react';
import { IoMdArrowDropright, IoMdPerson } from "react-icons/io";


const Authors = ({authors}) => {
 const authorsList = Array.isArray(authors) ? authors : [];
  // console.log(authors);

  return (
    <>
      <section className="authors  py-8">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        {/* <i className="fas fa-user text-yellow-500 text-2xl"></i> */}
        <IoMdPerson size={30} color='#fac309' className='mr-2'/>
        <h4 className="text-center text-lg font-semibold ml-2">লেখক</h4>
      </div>
      <div className="flex items-center">
        <Link href="/authors" className='flex items-center'>
          <span className="text-black text-sm hover:underline">সবগুলো দেখুন</span>
          <IoMdArrowDropright />
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {authorsList?.map((author) => {
    return (
      <div key={author?.id} className="flex flex-col   h-full  ">
        <div className="bg-white shadow-md rounded-md overflow-hidden flex-grow h-48 flex items-center justify-center">
          <a href={`/authors/${author?.name}`} className="h-full w-full flex items-center justify-center">
            <img
              className="authors mx-auto rounded object-cover h-full w-full"
              src={author?.image }
              alt={author?.alt_text || "Default image"}
            />
          </a>
        </div>
        <div className="bg-white border-t border-gray-200 p-2 text-center">
          <Link href={`/authors/${author?.name}`}>
            <span className="text-gray-800 font-medium hover:text-blue-500">
              {author?.name}
            </span>
          </Link>
        </div>
      </div>
    );
  })}
</div>
  </div>
</section> 

    </>
  );
};

export default Authors;
