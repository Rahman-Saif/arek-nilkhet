'use client'
import React, { useEffect, useState } from 'react';
import './bcsBank.css';
import Link from 'next/link';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaPlus, FaRegHeart } from "react-icons/fa";
import { Book } from '@/components/Books/BookDetail/BookDetail';
import { IoBookSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";


const BCSBank = ({
 bcsBooks,
 handleAddToCart,
 handleAddToWishlist
}
: {
 bcsBooks: Book[];
 handleAddToCart: (book: Book) => void;
 handleAddToWishlist: (book: Book) => void;
}
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
      const books = Array.isArray(bcsBooks) ? bcsBooks : [];
//       const slideInterval=100000;
      

//       useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
//     }, slideInterval);

//     return () => clearInterval(interval); 
//   }, [books.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    };

  return (
    <>
      
      <section className="bcsbank  py-8">
            <div className="container mx-auto">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        {/* <i className="fas fa-book-open text-warning mr-2"></i> */}
                        <IoBookSharp size={30} color='#fac309' className='mr-2'/>
                        <h4 className="text-xl font-semibold">বিসিএস-ব্যাংক</h4>
                    </div>
                    <div>
                        <Link href={`/categories/বিসিএস-ব্যাংক`} className='flex items-center'>
                            <span className='text-black text-sm hover:underline'>সবগুলো দেখুন</span>
<IoMdArrowDropright />
                        </Link>
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {books.map((book) => (
                            <div key={book.id} className="border border-gray-200 mx-2 bg-white rounded-lg shadow-md w-1/3 md:max-w-[250px] md:min-w-[250px] max-h-[400px] min-h-[400px] flex-shrink-0">
                                <div className="relative">
                                    {book?.percentage !== 0 && (
                                        <span className="absolute top-2 left-2  text-white bg-[#fac309] text-xs font-bold px-1">{book?.percentage}% ছাড়</span>
                                    )}
                                    {book?.flat_discount !== 0 && (
                                        <span className="absolute top-2 left-16 text-white bg-[#fac309]  text-xs font-bold px-1">{book?.flat_discount} টাকা ছাড়</span>
                                    )}
                                    <Link href={`/books/${book.id}`}>
                                        <img
                                            className="w-full h-[200px] object-cover rounded-t-lg"
                                            src={book?.image}
                                            alt={book?.alt_text}
                                        />
                                    </Link>
                                    <div className="absolute top-2 right-2">
                                        <button
                                            id='wishlistbtn'
                                            className="p-2 bg-[#fac309] rounded-full text-white"
                                            onClick={() => handleAddToWishlist(book)}
                                        >
                                            <FaRegHeart />

                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <Link className="text-gray-800 font-medium" href={`/books/${book.id}`}>
                                        <span className="line-clamp-2">{book?.english_title.slice(0, 15)}...</span>
                                    </Link>
                                    <div className="mt-2">
                                        {book?.discount_price === 0 || book?.discount_price === null ? (
                                            <h6 className="text-lg font-medium text-gray-800">{book?.regular_price} টাকা</h6>
                                        ) : (
                                            <div className="flex">
                                                <h6 className="text-lg font-medium text-gray-800 line-through">{book?.regular_price} টাকা</h6>
                                                <h6 className="ml-2 text-lg font-medium text-red-500">{book?.discount_price} টাকা</h6>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='bg-white border-t border-gray-200 p-4'>
                                    {book?.units_stock !== 0 ? (
                                        <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(book)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
                                    ) : (
                                        <button className="btn w-full bg-gray-300 text-gray-600 rounded py-2" disabled>
                                            <span className='text-[#fac309]'>Stock out!</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Navigation Buttons */}
                    <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2   "
                        onClick={prevSlide}
                    >
                      <IoIosArrowDropleftCircle className=' text-blue-500 text-4xl'/>

                    </button>
                    <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 "
                        onClick={nextSlide}
                    >
                        <IoIosArrowDroprightCircle className=' text-blue-500 text-4xl'/>

                    </button>
                </div>
            </div>
        </section>



        
    </>
  );
};
export default BCSBank;
