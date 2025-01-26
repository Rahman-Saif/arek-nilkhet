'use client'
import React from 'react';
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { NavLink, useHistory } from 'react-router-dom';
import useCategoryByID from '../../../Hooks/CallByID/useCategoryByID';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function UpdateCategory({categories,id}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
          const url = process.env.NEXT_PUBLIC_URL;

  const history = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);

  useEffect(() => {
    const matchCategory = categories.find((category) => category.id == id);
    setDetails(matchCategory);
  }, [id, categories]);
  
  const [singleCategory] = useCategoryByID(details?.parent)

  // category updated function
  const onSubmit = data => {
      fetch(`${url}/category/${details.name}/`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((result) =>{
        if(result.status==400){
          // alert(result.message);
          setShowWishlistAlert(true);
          setTimeout(() => setShowWishlistAlert(false), 3000); 
          reset();
        }
        else{
          // alert("Category updated Successfully!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000); 
          // reset();
            setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-categories');
}, 3000); 
          // history.push('/admin-categories');
        }     
      });
  }

  return (
    <div className="container mx-auto w-3/4 mt-5 p-3 rounded shadow bg-gray-100">
  <h3 className="text-center text-xl font-bold">Update category Information</h3>
  <hr className="w-1/2 mx-auto border-t-2 border-gray-300" />
  <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <input
      {...register("name", { required: true })}
      defaultValue={details?.name}
      placeholder="category name"
      className="p-3 m-3 w-full border border-green-500 rounded"
    />
    {errors.name?.type === 'required' && (
      <p role="alert" className="text-red-500">
        <small>ক্যাটাগরীর নাম্ অত্যাবশ্যকিয়*</small>
      </p>
    )}
    <br />
    <select className="p-3 m-3 w-full border border-green-500 rounded bg-white" {...register("parent")}>
      {singleCategory?.name && (
        <option defaultValue={singleCategory?.name}>{singleCategory.name}</option>
      )}
      <option disabled>একটি প্যারেন্ট ক্যাটাগরী নির্বাচন করুন</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
    <div className="flex w-1/2 mx-auto">
      <input
        type="submit"
        value="Update"
        className="btn bg-green-500 text-white w-1/2 border border-green-500 rounded m-3 hover:bg-green-600 focus:outline-none"
      />
      <Link
        href="/admin-categories"
        className="text-white p-2 bg-red-500 w-1/2 border border-red-500 rounded m-3 flex items-center justify-center hover:bg-red-600 focus:outline-none"
      >
        Cancel <i className="fa-solid fa-close ml-2"></i>
      </Link>
    </div>
  </form>
  {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Category Updated successfully
          </AlertDescription>
        </Alert>
      )}
      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Category Can't be Updated
          </AlertDescription>
        </Alert>
      )}
</div>

  );
}
