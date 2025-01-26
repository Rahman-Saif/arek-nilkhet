'use client';

import React from 'react';
import image from '../../assets/images/defaultImage.jpeg';
import Link from 'next/link';

const AuthorPage = ({ author }) => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col h-full border shadow-md rounded-lg overflow-hidden">
        {/* Author image */}
        {!author?.image ? (
          <img
            src={image}
            className="w-full h-52 object-cover"
            alt="Author"
          />
        ) : (
          <img
            src={author.image}
            className="w-full h-52 object-cover"
            alt="Author"
          />
        )}

        {/* Author details */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <h5 className="text-yellow-500 text-lg font-semibold">
            <Link href={`/authors/${author.name}`}>{author.name}</Link>
          </h5>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 shadow text-white rounded mt-4 transition duration-200">
            <Link className="text-white" href={`/authors/${author.name}`}>
              Read more
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
