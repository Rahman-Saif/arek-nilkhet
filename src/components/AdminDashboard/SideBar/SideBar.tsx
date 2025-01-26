'use client'
// import { useRouter } from 'next/router';
// import './SideBar.css';
import React, { useState } from 'react';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { Link, useHistory } from 'react-router-dom';
// import {url} from '../../../App';
import { FiGrid, FiUsers, FiBook, FiHeadphones, FiPenTool, FiBookmark, FiList, 
         FiImage, FiUser, FiUserPlus, FiLogOut, FiX } from 'react-icons/fi';
 import { BsFillPeopleFill } from "react-icons/bs";


const SideBar = () => {
  const history = useRouter();

  const token =typeof window!==undefined  && window.localStorage.getItem('token');
  const user = JSON.parse(typeof window!==undefined && window && window.localStorage.getItem('user'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
          const url = process.env.NEXT_PUBLIC_URL;


// logout function
  const logout = async () => {
    console.log("logout function called");
    try {
      // Clear local storage
     typeof window!==undefined  && window.localStorage.removeItem('user');
     typeof window!==undefined  && window.localStorage.removeItem('token');

      // Make API call
      const response = await fetch(`${url}/logout/`, {
        method: "POST",
        headers: {
          "Authorization": "Token "+token
        },
      });

      // Check response status
      if (!response.ok) {
        console.error('Logout failed:', response.status);
        throw new Error('Logout failed');
      }

      console.log('Logout successful');
      history.push('/');
      
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error (maybe show an alert to user)
    }

    // Verify localStorage is cleared
    // console.log('User in storage:', window && window.localStorage.getItem('user'));
    // console.log('Token in storage:', window && window.localStorage.getItem('token'));
  }
 
  return (
    <div className=" min-h-screen min-w-[15vw] bg-[#161438] p-6">
  <div className="text-center text-[#f8f8f8] py-2">
    <p className="text-xl font-extrabold">Admin Panel</p>
    <hr className="border border-gray-200/20 my-2" />
  </div>
  <div className="pl-5 sm:pl-1">
    <ul className="list-none m-0 p-0">
      {/* SHOP Section */}
      <p className="text-xs font-bold text-gray-400 mt-3 mb-1 hidden sm:block">SHOP</p>
      <Link href="/" className="no-underline">
        <li className="flex flex-row items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiGrid className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7]  hidden md:block">Shop</span>
        </li>
      </Link>

      {/* MAIN Section */}
      <p className="text-xs font-bold text-gray-400 mt-3 mb-1 hidden sm:block">MAIN</p>
      <Link href="/admin" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiGrid className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] ml-[7%] hidden md:block">Dashboard</span>
        </li>
      </Link>

      {/* LISTS Section */}
      <p className="text-xs font-bold text-gray-400 mt-3 mb-1 hidden sm:block">LISTS</p>
      <Link href="/admin-customers" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiUsers className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] ml-3 hidden md:block">Customers</span>
        </li>
      </Link>
      <Link href="/admin-books" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiBook className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] ml-1 hidden md:block">Books</span>
        </li>
      </Link>
      <Link href="/admin-electronics" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiHeadphones className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] ml-1 hidden md:block">Electronics</span>
        </li>
      </Link>
      <Link href="/admin-stationary" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiPenTool className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] ml-1 hidden md:block">Stationary</span>
        </li>
      </Link>
      <Link href="/admin-categories" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiBookmark className="text-lg text-[#ccc3e7] mr-1" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Categories</span>
        </li>
      </Link>
      <Link href="/admin-orders" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiList className="text-lg text-[#ccc3e7] mr-1" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Orders</span>
        </li>
      </Link>
      <Link href="/parcel-delivery" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiList className="text-lg text-[#ccc3e7] mr-1" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Parcel Delivery</span>
        </li>
      </Link>
      <Link href="/admin-authors" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          {/* <FiList className="text-lg text-[#ccc3e7] mr-1" /> */}
          {/* <FiList /> */}
          <BsFillPeopleFill className="text-lg text-[#ccc3e7] mr-1" />

          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Authors</span>
        </li>
      </Link>
      <Link href="/admin-publishers" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiList className="text-lg text-[#ccc3e7] mr-1" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Publishers</span>
        </li>
      </Link>

      {/* USEFUL Section */}
      <p className="text-xs font-bold text-gray-400 mt-3 mb-1 hidden sm:block">USEFUL</p>
      <Link href="/admin-logo" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiImage className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Logo</span>
        </li>
      </Link>
      <Link href="/admin-banner" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiImage className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Banners</span>
        </li>
      </Link>

      {/* ADMIN Section */}
      <p className="text-xs font-bold text-gray-400 mt-3 mb-1 hidden sm:block">ADMIN</p>
      <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
        <button
          type="button"
          className="flex items-center w-full text-start outline-none bg-transparent p-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <FiUser className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Profile</span>
        </button>

        {/* Modal */}
        <dialog 
          className={`fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex items-center justify-center
                     ${isDialogOpen ? '' : 'hidden'}`}
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-bold">Admin Profile</h5>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsDialogOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <div className="py-4">
              <p>Phone No: {user?.phone_number}</p>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </li>

      {/* Make a new admin */}
      <Link href="/make-admin" className="no-underline">
        <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors">
          <FiUserPlus className="text-lg text-[#ccc3e7] mr-2" />
          <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block">Admin</span>
        </li>
      </Link>

      {/* Logout */}
      <li className="flex items-center p-2 cursor-pointer hover:bg-[#6e698a] hover:text-black transition-colors" onClick={()=>logout()}>
        <FiLogOut className="text-lg text-[#ccc3e7] mr-2" />
        <span className="text-[15px] font-semibold text-[#f7f7f7] hidden md:block" >
          Logout
        </span>
      </li>
    </ul>
  </div>
</div>

  );
};

export default SideBar;
