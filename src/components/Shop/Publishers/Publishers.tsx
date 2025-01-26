'use client'
import React from 'react';
import './style.css';
import defaultImage from '../../assets/images/defaultImage.jpeg';
import Link from 'next/link';
import { IoMdArrowDropright, IoMdPerson } from "react-icons/io";

const Publishers = ({publishers}) => {

  const Publishers = publishers.slice(0,6);

  return (
    <>
      <section className="publishers  py-8">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        {/* <i className="fas fa-user text-yellow-500 text-2xl"></i> */}
        <IoMdPerson size={30} color='#fac309' className='mr-2'/>
        <h4 className="text-center text-lg font-semibold ml-2">প্রকাশক</h4>
      </div>
      <div className="flex items-center">
        <Link href="/publishers" className='flex items-center'>
          <span className="text-black text-sm hover:underline">সবগুলো দেখুন</span>
          <IoMdArrowDropright />
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {Publishers?.map((publisher) => (
    <div key={publisher?.id} className="flex flex-col items-center h-full">
      <div className="bg-white shadow-md rounded-md overflow-hidden flex-grow h-56 w-full flex items-center justify-center">
        <a href={`/publishers/${publisher?.name}`} className="h-full w-full flex items-center justify-center">
          <img
            className="publishers mx-auto rounded object-cover h-full w-full"
            src={publisher?.image || defaultImage}
            alt={publisher?.alt_text || "Default image"}
          />
        </a>
      </div>
      <div className="bg-white border-t border-gray-200 p-2 text-center w-full">
        <Link href={`/publishers/${publisher?.name}`}>
          <span className="text-gray-800 font-medium hover:text-blue-500">
            {publisher?.name}
          </span>
        </Link>
      </div>
    </div>
  ))}
</div>



  </div>
</section>

    </>
  );
};

export default Publishers;
