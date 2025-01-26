'use client'
import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import '../adminpage.css';
import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';
// import {url} from '../../../App';
import useAllAdmin from '../../../Hooks/useAllAdmin';
import useAllUsers from '../../../Hooks/useAllUsers';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function MakeAdmin({admins}) {
  const [users] = useAllUsers();
  // const [ admins] = useAllAdmin();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const history = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;


  const onSubmit = data => {
    let phone;

    if(data?.phone_number){
      phone = users.find(user => user?.phone_number === data?.phone_number);

      //if phone_number is already exist then show alert messeage
      if(phone?.phone_number){
        alert("Phone Number is already exist!");
        reset();
      }
      else{
        //post method for make-admin
        fetch(`${url}/makeAdmin/`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((result) =>{
          console.log(result);
          if(result.status===400){
            // alert(result.message);
             setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
            reset();
          }
          else{
            // alert("Admin created Successfully!");
            setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000); 


            reset();
            history.push('/make-admin');
          }     
        });
      }      
    }
  }

  return (
    <>
      <div className="adminpage m-0 bg-gray-100">
  <SideBar />
  <div className="adminpage-container">
    <AdminNavbar />
    <h3 className="text-2xl font-semibold pt-3">Admin</h3>
    <hr className="my-2" />

    <div className="border-0 rounded shadow mb-3 bg-white p-6">
      <h4 className="text-center text-xl font-semibold">Create a new Admin</h4>
      <hr className="w-1/4 mx-auto mb-4" />

      <form className="w-3/4 mx-auto border-0 shadow rounded p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row mb-3 w-full items-center">
          <label className="lg:w-1/4 py-2">ফোন নাম্বার:</label>
          <input
            {...register("phone_number", { required: true })}
            type="text"
            pattern="[0-9]*"
            placeholder="ফোন নাম্বার লিখুন"
            className="p-2 w-full lg:w-3/4 border border-green-500 rounded"
          />
          {errors.phone_number?.type === 'required' && (
            <p role="alert" className="text-red-500 text-sm mt-1">ফোন নাম্বার অত্যাবশ্যকিয়*</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row mb-3 w-full items-center">
          <label className="lg:w-1/4 py-2">পাসওয়ার্ড:</label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="পাসওয়ার্ড লিখুন"
            className="p-2 w-full lg:w-3/4 border border-green-500 rounded"
          />
          {errors.password?.type === 'required' && (
            <p role="alert" className="text-red-500 text-sm mt-1">পাসওয়ার্ড অত্যাবশ্যকিয়*</p>
          )}
        </div>

        <div className="flex justify-center mx-4 mb-3">
          <input
            type="submit"
            value="Submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          />
        </div>
      </form>
    </div>

    <div className="w-3/4 mx-auto p-2 border-0 rounded shadow mb-4 bg-white overflow-auto">
      <h4 className="text-xl font-semibold">Admin List</h4>
      <hr className="my-2" />
      <table className="table-auto w-full text-center">
        <thead>
          <tr className="text-green-500">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin) => (
            <tr key={admin?.id}>
              <td className="p-2 border-b">{admin?.id}</td>
              <td className="p-2 border-b">{admin?.name}</td>
              <td className="p-2 border-b">{admin?.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

 {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Admin Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Admin Can't be Added
          </AlertDescription>
        </Alert>
      )} 
    </>
  );
}
