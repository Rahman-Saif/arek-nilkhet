'use client'
// import { url } from '@/app/page';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import useLogos from '../../../Hooks/useLogos';
// import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
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


export default function AdminLogo() {
  const [ logos] = useLogos();
  const history = useRouter();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [ selectedImage,setSelectedImage ] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



 // logo add function
  const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('alt_text', data.alt_text);
      
    fetch(`${url}/create-logo/`, {
      method: "POST",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
       return res.json();
    })
    .then(getData => {
      // alert("Logo added Successfully!");
      setShowAlert(true);
       setTimeout(() => setShowAlert(false), 3000); 
      reset();
      history.push('/admin-logo');  
    })
    .catch(err => {
      err.json().then(text => {
        if (text?.error) {
          console.log(text?.error);
          return;
        }
    })
        console.log(err.statusText);
    });
  }

  // logo delete function
  // const handleDelete = id =>{
  //   // const confirm = window.confirm('Are you sure to delete logo?');
  //   if(confirm){
  //       fetch(`${url}/api/logo/${id}`, {
  //          method:'DELETE'
  //       })
  //       alert('Logo deleted!');
  //       window.location.reload();
  //   }
  // }

   const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/logo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
       window!==undefined && window.location.reload();
      } else {
        // alert('Failed to delete author');
        setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      // alert('Error deleting author');
      setshowfailedAlert(true);
      setTimeout(() => setshowfailedAlert(false), 3000);
    }
  }

  return (
    <>
      <div className=" flex m-0">
        <SideBar />
        <div className="w-11/12 mx-auto">
          <AdminNavbar />
          <h3 className="text-2xl font-semibold text-gray-800 pt-3 text-center">Logos</h3>
          <hr className="w-1/4 my-4 border-t border-gray-300" />
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h4 className="text-xl font-semibold text-center mb-3">Add a new Logo</h4>
            <hr className="w-1/4 mx-auto mb-6 border-t border-gray-200" />
            
            <form className="max-w-2xl mx-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor=''className="block text-sm text-gray-700">*Logo Image:</label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  id="choose-file"
                  placeholder="Upload a logo"
                  className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500
                           file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                           file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                           hover:file:bg-green-100"
                  accept="image/*"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                {errors.image?.type === 'required' && (
                  <p role="alert" className="text-red-500 text-xs">
                    Logo image required*
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor='' className="block text-sm text-gray-700">Alt-Text:</label>
                <input
                  {...register("alt_text")}
                  type="text"
                  placeholder="Alternate text"
                  className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-semibold"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <h4 className="text-xl font-semibold p-4">Logo List</h4>
            <hr className="border-t border-gray-200" />
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-green-700">ID</th>
                    <th className="px-6 py-3 text-green-700">Logo</th>
                    <th className="px-6 py-3 text-green-700">URL</th>
                    <th className="px-6 py-3 text-green-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logos.map((logo) => (
                    <tr key={logo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{logo.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={logo.image} className="h-12 w-12 object-cover rounded" alt={logo.alt_text} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{logo.alt_text}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <button
                          onClick={() => handleDelete(logo?.id)}
                          className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <RiDeleteBin5Fill size={16} />
                        </button> */}
                           <AlertDialog>
  <AlertDialogTrigger asChild>
    <button
    type='button'
    className="p-1 bg-red-500 text-white rounded m-1">
      <RiDeleteBin5Fill />
    </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the author.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(logo?.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Logo Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully Logo Deleted
          </AlertDescription>
        </Alert>
      )} 

{showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Logo Can't be Deleted
          </AlertDescription>
        </Alert>
      )}  

    </>
  );
}
