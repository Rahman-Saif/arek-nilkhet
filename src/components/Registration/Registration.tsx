"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
//import { NavLink, useHistory, useLocation} from 'react-router-dom';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import MegaMenu from '../common/MegaMenu/MegaMenu';
//import { url } from '../../App';
import useAllUsers from '../../Hooks/useAllUsers';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
// import { url } from '@/app/page';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function Registration() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
   const [showAlert, setShowAlert] = useState(false);
    // const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
  const router = useRouter();
  // const redirect_uri = router.pathname || '/';
  const redirect_uri =  '/';
          const url = process.env.NEXT_PUBLIC_URL;


  const onSubmit = (data: any) => {
    let phone;

    if(data?.phone_number) {
      //post method for register_user
      fetch(`${url}/register_user/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((result) => {
        if(result.status === 400) {
           setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
          // alert(result.message);
        } else {
          window!==undefined  && window.localStorage.setItem('token', result.token.access);
          window!==undefined  && window.localStorage.setItem('user', JSON.stringify((data)));
          // alert("Register Successfully!");
          setShowAlert(true); // Show alert when an item is added
          setTimeout(() => setShowAlert(false), 3000);
          reset();
          router.push(redirect_uri);
        }     
      });
    }
  };

  return (
    <>
      <Header/>
      <MegaMenu/>
      <div className="container mx-auto p-3 mb-5 grid grid-cols-1 lg:w-full bg-gray-100">
        <div className="mt-3 mx-auto mb-2">
          <p className="text-center text-4xl font-bold mb-4 mt-4 hover:text-orange-500">সাইন আপ করুন</p>
          <form className="mx-auto w-[600px] h-[300px] border-0 shadow-lg rounded p-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
              <label className="lg:w-3/12 py-2">নাম:</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="নাম লিখুন"
                className="p-1 lg:w-9/12 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name?.type === 'required' && (
                <p role="alert" className="text-red-500">
                  <small>নাম অত্যাবশ্যকিয়*</small>
                </p>
              )}
            </div>
            <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
              <label className="lg:w-3/12 py-2">ফোন নাম্বার:</label>
              <input
                {...register("phone_number", { required: true })}
                type="text"
                pattern="[0-9]*"
                placeholder="ফোন নাম্বার লিখুন"
                className="p-1 lg:w-9/12 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.phone_number?.type === 'required' && (
                <p role="alert" className="text-red-500">
                  <small>ফোন নাম্বার অত্যাবশ্যকিয়*</small>
                </p>
              )}
            </div>
            <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
              <label className="lg:w-3/12 py-2">পাসওয়ার্ড:</label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="পাসওয়ার্ড লিখুন"
                className="p-1 lg:w-9/12 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password?.type === 'required' && (
                <p role="alert" className="text-red-500">
                  <small>পাসওয়ার্ড অত্যাবশ্যকিয়*</small>
                </p>
              )}
            </div>
            <div className="flex justify-center mb-3 lg:mb-4">
              <input
                type="submit"
                value="পরবর্তী"
                className="bg-indigo-900 text-white rounded px-4 py-2 cursor-pointer hover:bg-indigo-800 transition"
              />
            </div>
            <p className="text-center text-base font-semibold text-blue-900">
              আপনার কি একাউন্ট আছে?{' '}
              const searchParams = useSearchParams();
              const from = searchParams.get('from') || '/';
              
              <Link
                href='/login'
                className=" font-bold "
              >
                সাইন ইন করুন
              </Link>
            </p>
          </form>
        </div>
      </div>
       {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Registration Done
          </AlertDescription>
        </Alert>
      )}

    {showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Registration Failed
          </AlertDescription>
        </Alert>
      )}  
      <Footer></Footer>
    </>
  );
}
