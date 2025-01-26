"use client";
interface BookComponentProps {
  book: Book;
  handleAddToCart: HandleAddToCart;
}

const Bookdata = {
  id: Number,
  discount: Number,
  cover: String,
  name: String,
  price: Number,
};

import { z } from "zod";

// Define the book schema
const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  publishedDate: z.string().optional(),
  genre: z.string().optional(),
  pages: z.number().optional(),
});

// Type inference for TypeScript
type Book = z.infer<typeof BookSchema>;
const validateBook = (bookData: unknown) => {
  try {
    const validatedBook = BookSchema.parse(bookData); // Validates and returns the book object
    console.log("Validated Book:", validatedBook);
    return validatedBook; // Return validated book
  } catch (e) {
    console.error("Validation Error:", e.errors);
    return null; // Handle error as needed
  }
};

const validatedBook = validateBook(Bookdata);

type HandleAddToCart = (book: Book) => void;

import Link from "next/link";
// import { url } from '@/app/page';
import React from "react";
import { FaPlus } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';

const Book = ({ book, handleAddToCart }: BookComponentProps) => {
  return (
    <div className=" w-11/12  md:w-full h-[450px]">
      <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        <a href={`/books/${book.id}`} className="h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={book?.image}
            alt={book?.alt_text}
          />
        </a>
        
        <div className="flex-grow p-4">
          <h5 className="text-base font-medium text-black mb-2">
            <Link href={`/books/${book.id}`}>{book?.english_title}</Link>
          </h5>
          
          {book?.discount_price === 0 || book?.discount_price === null ? (
            <p className="text-gray-800">
              {book?.regular_price} টাকা
            </p>
          ) : (
            <div className="flex gap-4">
              <p className="text-gray-800 line-through">
                {book?.regular_price} টাকা
              </p>
              <p className="text-red-600">
                {book?.discount_price} টাকা
              </p>
            </div>
          )}
        </div>

        {book?.units_stock <= 10 && book?.units_stock >= 1 && (
          <div className="text-center px-4">
            <strong className="text-blue-600">
              *** Last {book?.units_stock}pcs in stock! ***
            </strong>
          </div>
        )}

        <div className="p-4 space-y-2">
          <button className="w-full rounded bg-[#fac309] hover:bg-[#fc8c0c] text-white py-2">
            <Link href={`/books/${book.id}`} className=" text-base">
              Read more
            </Link>
          </button>
          
          {book?.units_stock !== 0 ? (
            <button className="btn w-full bg-indigo-900 text-white rounded py-2 flex items-center justify-center" onClick={() => handleAddToCart(book)}>
                                            <span className='text-white font-semibold'>Add to cart </span>
                                            <FaPlus className='ml-2'/>
                                        </button>
          ) : (
            <button
              className="w-full rounded bg-gray-400 text-gray-700 py-2 cursor-not-allowed"
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
export default Book;
