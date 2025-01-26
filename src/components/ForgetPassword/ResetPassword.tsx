'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
// import { useHistory} from 'react-router-dom';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import MegaMenu from '../common/MegaMenu/MegaMenu';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
// import { url } from '../../App';

export default function ResetPassword() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
          const url = process.env.NEXT_PUBLIC_URL;

  
  //location redirect
  const history = useRouter();
  const redirect_uri = '/';

  const onSubmit = data => {

    let token = window!==undefined  && window.localStorage.getItem('token');

    fetch(`${url}/reset-password/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer"+" "+token
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((result) =>{
        if(result.status===401){
          alert(result.errors);
        }
        else{
          reset();
          history.push(redirect_uri);
        }
    });
  }

  
  return (
    <>
    <Header></Header>
    <MegaMenu></MegaMenu>
    <div className="container mx-auto p-3 mb-5 bg-gray-100">
  <div className="mt-3 mx-auto lg:w-8/12">
    <p className="text-center text-4xl font-bold mb-4 mt-4 hover:text-yellow-400">পাসওয়ার্ড পরিবর্তন</p>
    <form className="mx-auto w-3/4 border rounded p-4 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
        <label className="lg:w-3/12 py-2">পাসওয়ার্ড:</label>
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="পাসওয়ার্ড লিখুন"
          className="p-2 lg:w-9/12 border border-yellow-500 rounded text-sm"
        />
        {errors.password?.type === 'required' && (
          <p role="alert" className="text-red-500">
            <small>পাসওয়ার্ড অত্যাবশ্যকিয়*</small>
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto">
        <label className="lg:w-3/12 py-2">কনফার্ম পাসওয়ার্ড:</label>
        <input
          {...register("password2", { required: true })}
          type="password"
          placeholder="কনফার্ম পাসওয়ার্ড লিখুন"
          className="p-2 lg:w-9/12 border border-yellow-500 rounded text-sm"
        />
        {errors.password2?.type === 'required' && (
          <p role="alert" className="text-red-500">
            <small>কনফার্ম পাসওয়ার্ড অত্যাবশ্যকিয়*</small>
          </p>
        )}
      </div>
      <div className="flex justify-center mb-3 lg:mb-4">
        <input
          type="submit"
          value="সাইন ইন"
          className="bg-yellow-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-yellow-600 transition"
        />
      </div>
    </form>
  </div>
</div>

    <Footer></Footer>
    </>
  );
}
