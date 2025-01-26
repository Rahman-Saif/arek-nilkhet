

'use client'

// import { url } from '@/app/page';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
//import { Link, useHistory, useLocation} from 'react-router-dom';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import MegaMenu from '@/components/common/MegaMenu/MegaMenu';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { url } from '../../App';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function AdminLogin() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
          const url = process.env.NEXT_PUBLIC_URL;


  //location redirect
  const router = useRouter();
  const location = useRouter();
  const history = useRouter();
  const redirect_uri = location.state?.from || '/';
  
  //onSubmit function
  const onSubmit = data => {
    console.log(data);

    if(data.username === 'admin' && data.password === 'nilkhet'){
        console.log('admin login success');
        router.push('/admin');
        
    }

  }

  
  return (
    <>
    {/* <Header></Header>
    <MegaMenu></MegaMenu> */}
    <div className="container p-3 mb-5 mx-auto flex justify-center bg-gray-100 ">
  <div className="w-full lg:w-2/3 mt-3 mx-auto">
    <p className="text-center text-3xl font-bold mb-4 mx-1 mt-4 hover:text-orange-500">অ্যাডমিন সাইন ইন</p>
    <form className="w-3/4 mx-auto border rounded p-16 shadow " onSubmit={handleSubmit(onSubmit)}>
      
      {/* <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto items-center">
        <label className="lg:w-1/4 py-2">ফোন নাম্বার:</label>
        <input
          {...register("phone_number", {required: true})}
          type="text"
          pattern="[0-9]*"
          placeholder="ফোন নাম্বার লিখুন"
          className="p-2 w-full lg:w-3/4 border rounded text-base"
        />
        {errors.phone_number?.type === 'required' && (
          <p role="alert" className="text-red-500 text-sm mt-1">ফোন নাম্বার অত্যাবশ্যকিয়*</p>
        )}
      </div> */}
      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto items-center">
        <label className="lg:w-1/4 py-2">ব্যবহারকারীর নাম</label>
        <input
          {...register("username", {required: true})}
          type="text"
          placeholder="ব্যবহারকারীর নাম লিখুন"
          className="p-2 w-full lg:w-3/4 border rounded text-base"
        />
        {errors.phone_number?.type === 'required' && (
          <p role="alert" className="text-red-500 text-sm mt-1">ব্যবহারকারীর নাম অত্যাবশ্যকিয়*</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row mb-3 w-full mx-auto items-center">
        <label className="lg:w-1/4 py-2">পাসওয়ার্ড:</label>
        <input
          {...register("password", {required: true})}
          type="password"
          placeholder="পাসওয়ার্ড লিখুন"
          className="p-2 w-full lg:w-3/4 border rounded text-base"
        />
        {errors.password?.type === 'required' && (
          <p role="alert" className="text-red-500 text-sm mt-1">পাসওয়ার্ড অত্যাবশ্যকিয়*</p>
        )}
      </div>

      <div className="flex justify-center mx-4 mb-6 mt-5 mb-lg-4">
        <input
          type="submit"
          value="সাইন ইন"
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-900 cursor-pointer"
        />
      </div>

      {/* <p className="text-center text-base">
        <Link href="/forget-password" className="font-bold hover:text-blue-800">
          আপনার পাসওয়ার্ড ভুলে গেছেন?
        </Link>
      </p> */}
      {/* <p className="text-center text-base font-bold ">
        <span className='hover:text-orange-500'>
          আপনি কি এখানে নতুন?
        </span>
        
        <Link href="/register" >
        <span className=" hover:text-blue-900 ml-1 ">
          একাউন্ট তৈরি করতে ক্লিক করুন!
        </span>
          
        </Link>
      </p> */}
    </form>
  </div>
</div>
<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Close
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    <Footer></Footer>
    </>
  );
}

