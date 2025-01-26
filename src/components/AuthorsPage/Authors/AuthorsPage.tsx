'use client';
import React from 'react';
import AuthorPage from './AuthorPage';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import useAuthors from '../../../Hooks/useAuthors';
import Pagination from '../../Shared/Pagination/Pagination';

export default function AuthorsPage({ CartItem }) {
  const [authors, pageCount, handlePageClick, offset, displayData] = useAuthors();
  console.log("Authors Data:", displayData);

  return (
    <>
      <Header CartItem={CartItem} />
      <MegaMenu />

      <div className="container mx-auto my-3 mb-5 ">
        <h4 className="text-center font-bold text-xl">আমাদের লেখক</h4>
        <hr className="bg-green-500 w-1/4 mx-auto my-2" />

        {/* Display loading or empty state */}
        {authors?.length === 0 && <div className="h-screen flex items-center justify-center text-gray-500">Loading authors...</div>}

        {/* Display authors if available */}
        {authors?.length !== 0 && (
          <>
            {Array.isArray(displayData) && displayData.length > 0 ? (
              <div className="min-h-[700px] max-h-[2000px] w-11/12 mx-auto">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 container mx-auto">
                  {displayData.map((author) => (
                    <AuthorPage key={author?.id} author={author} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">No authors available.</p>
            )}

            {/* Pagination */}
            <div className=" container w-3/4 mx-auto mt-5">
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                offset={offset}
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
