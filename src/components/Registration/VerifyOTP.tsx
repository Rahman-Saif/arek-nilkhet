'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
// import {useHistory} from 'react-router-dom';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import MegaMenu from '../common/MegaMenu/MegaMenu';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
// import { url } from '../../App';

export default function VerifyOTP() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
          const url = process.env.NEXT_PUBLIC_URL;


  //location redirect
  const history = useRouter();
  const redirect_uri = '/login';


  const onSubmit = data => {
    fetch(`${url}/verify_otp/`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) =>{
              if(result.status==400){
                alert(result.message);
              }
              else{
              alert("OTP matched Successfully!");
              }
              reset();
              history.push(redirect_uri);
        });
  }

  
  return (
    <>
    <Header/>
    <MegaMenu/>
    <div className="container mx-auto p-3 mb-5 bg-gray-100">
  <div className="mt-3 mx-auto lg:w-8/12 mb-2">
    <p className="text-center text-3xl font-bold mb-4 mt-4">একাউন্ট যাচাই করুন</p>
    <form className="mx-auto w-3/4 border-0 shadow-lg rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
        <label className="lg:w-3/12 py-2">ফোন নাম্বার:</label>
        <input
          {...register("phone_number", { required: true })}
          type="text"
          pattern="[0-9]*"
          placeholder="ফোন নাম্বার লিখুন"
          className="p-2 lg:w-9/12 border border-yellow-500 rounded text-sm"
        />
        {errors.phone_number?.type === 'required' && (
          <p role="alert" className="text-red-500">
            <small>ফোন নাম্বার অত্যাবশ্যকিয়*</small>
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
        <label className="lg:w-3/12 py-2">ও.টি.পি:</label>
        <input
          {...register("otp", { required: true })}
          type="text"
          placeholder="ও.টি.পি লিখুন"
          className="p-2 lg:w-9/12 border border-yellow-500 rounded"
        />
        {errors.otp?.type === 'required' && (
          <p role="alert" className="text-red-500">
            <small>ও.টি.পি অত্যাবশ্যকিয়*</small>
          </p>
        )}
      </div>
      <div className="flex justify-center mb-3 lg:mb-4">
        <input
          type="submit"
          value="পরবর্তী"
          className="bg-yellow-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-yellow-600 transition"
        />
      </div>
    </form>
  </div>
</div>

    <Footer/>
    </>
  );
}
