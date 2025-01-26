'use client'
import React from 'react';
import image from '../../assets/images/defaultImage.jpeg';
import Link from 'next/link'; // Make sure this is the only Link import
import Image from 'next/image';

const PublisherPage = ({ publisher }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-full border shadow-md rounded-lg overflow-hidden">
        {!publisher?.image ? (
          <img src={image} className="w-full object-cover" alt="publisher" />
        ) : (
          <img src={publisher.image} className="w-full object-cover" alt="publisher" />
        )}
        <div className="p-4 flex flex-col justify-between flex-1">
          <h5 className="text-yellow-500 text-lg font-semibold mb-4">
            <Link href={`/publishers/${publisher.name}`}>{publisher.id}</Link>
          </h5>
          <button className="bg-yellow-500 px-4 py-2 text-white rounded shadow hover:bg-yellow-600 transition">
            <Link href={`/publishers/${publisher.name}`} className="text-white">
              Read more
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublisherPage;
