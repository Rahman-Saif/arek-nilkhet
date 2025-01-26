'use client'
import React from 'react';
// import { Link } from 'react-router-dom';
import './AdminNavbar.css';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

export default function AdminNavbar() {


  return (
    <>
   
    <nav className="bg-[#161438] w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          href="/admin" 
          className="text-[#F0F8FF] hover:text-[#6e698a] font-semibold transition-colors"
        >
          Dashboard
        </Link>
        <button
          className="p-2 rounded-md bg-transparent hover:bg-[#6e698a]/10 transition-colors"
          type="button"
          aria-label="Toggle navigation"
        >
          <FiMenu className="text-[#F0F8FF] text-xl" />
        </button>
      </div>
    </nav>



    </>
  )
}
