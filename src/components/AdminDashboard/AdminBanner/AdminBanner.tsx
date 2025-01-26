'use client'
import React, {useState} from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import '../adminpage.css';
import useBanners from '../../../Hooks/useBanners';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
// import { useHistory } from 'react-router-dom';
// import {url} from '../../../App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
// import { Author } from 'next/dist/lib/metadata/types/metadata-types';
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

export default function AdminBanner() {
  const [ banners] = useBanners();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
   const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  //Banner add function
   const onSubmit = data => {
     const formData = new FormData();
     formData.append('image', selectedImage);
     formData.append('alt_text', data.alt_text);
       
     fetch(`${url}/create-banner/`, {
       method: "POST",
       body: formData,
     })
     .then(res => {
       if (!res.ok) throw res;
        return res.json();
     })
     .then(getData => {
      //  alert("Banner added Successfully!");
       setShowAlert(true);
       setTimeout(() => setShowAlert(false), 3000); 
       reset();
      window!==undefined && window.location.reload();
      //  history.push('/admin-banner');  
     })
     .catch(err => {
       if (err.json) {
         err.json().then(text => {
           if (text?.error) {
             console.log(text?.error);
           }
         });
       } else {
         console.log('Error:', err);
       }
     });
   }

  // Banner delete function
//   const handleDelete = id =>{
//     const confirm = window.confirm('Are you sure to delete banner?');
//     if(confirm){
//         fetch(`${url}/api/banner/${id}`, {
//            method:'DELETE'
//         })
//         alert('Category deleted!');
//         window.location.reload();
//     }
// }

const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/banner/${id}`, {
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
      <div className="adminpage m-0 bg-gray-100">
  <SideBar/>
  <div className="adminpage-container">
    <AdminNavbar/>
    <h3 className="update-title pt-3 text-xl ">Banners</h3>
    <hr className="w-full border-t border-gray-300 my-4" />
    <div className="border-0 rounded shadow mb-3 bg-white p-6">
      <h4 className="text-center text-2xl font-semibold">Add a new Banner</h4>
      <hr className="w-1/4 mx-auto mb-4" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center space-y-2">
          <label htmlFor="bannerImage" className="text-gray-800 font-semibold">*Banner Image:</label>
          <input
            {...register("image", { required: true })}
            type="file"
            id="choose-file"
            placeholder="Upload a banner"
            className="p-3 m-2 w-1/2 border border-green-500 rounded"
            data-max-file-size="2M"
            name="upload"
            accept="image/*"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
          {errors.image?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs italic">
              Banner image required*
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 mt-4">
          <label htmlFor='alt_text' className="text-gray-800  font-semibold">Alt-Text:</label>
          <input
            {...register("alt_text")}
            type="text"
            placeholder="Alternate text"
            className="p-3 m-2 lg:ml-14 w-1/2 border border-green-500 rounded"
          />
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <label htmlFor='url' className="text-gray-800 text-sm font-semibold">URL:</label>
          <input
            {...register("url")}
            type="text"
            placeholder="URL"
            className="p-3 m-2 w-full border border-green-500 rounded"
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Submit"
            className="bg-green-500 text-white w-full p-3 rounded font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
    <div className="container p-2 border-0 rounded shadow mb-4 bg-white overflow-auto">
      <h4 className="update-title">Banner List</h4>
      <hr className="w-full border-t border-gray-300 my-4" />
      <table className="table-auto w-full text-left border border-gray-300">
        <thead className="bg-green-100 text-green-700">
          <tr>
            <th scope="col" className="px-4 py-2">ID</th>
            <th scope="col" className="px-4 py-2">Banner</th>
            <th scope="col" className="px-4 py-2">URL</th>
            <th scope="col" className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(banners) && banners.map((banner) => (
            <tr key={banner.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{banner.id}</td>
              <td className="px-4 py-2">
                <img src={banner.image} height="50" width="100" alt={banner.alt_text} />
              </td>
              <td className="px-4 py-2">{banner.url}</td>
              <td className="px-4 py-2">
                {/* <button
                  onClick={() => handleDelete(banner?.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <i className="far fa-trash-alt"></i>
                </button> */}
                   <AlertDialog>
  <AlertDialogTrigger asChild>
    <button type="button" className="p-1 bg-red-500 text-white rounded m-1">
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
      <AlertDialogAction onClick={() => handleDelete(banner?.id)}>
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

{showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Banner Added
          </AlertDescription>
        </Alert>
      )}

{showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully Banner Deleted
          </AlertDescription>
        </Alert>
      )}  

{showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Banner Can't be Deleted
          </AlertDescription>
        </Alert>
      )}  

    </>
  );
}
