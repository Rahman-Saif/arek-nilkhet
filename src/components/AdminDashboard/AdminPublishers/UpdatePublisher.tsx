'use client'
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { NavLink, useHistory } from 'react-router-dom';
// import {url} from '../../../App';
import { FiX } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


export default function UpdatePublisher({publishers,id}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage,setSelectedImage ] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  useEffect(() => {
    const matchPublisher = publishers.find((publisher) => publisher.id == id);
    setDetails(matchPublisher);
  }, [id, publishers]);


  // publisher updated function
  const onSubmit = data => {
    let formData = new FormData();
    if(selectedImage!==null){
      formData.append('image', selectedImage);
    }
    if(!data.name){
      data.name = details?.name;
    }
    if(!data.description){
      data.description = details?.description;
    }
    if(!data.alt_text){
      if(!details?.alt_text){
        data.alt_text = data.name;
      }
      else{
        data.alt_text = details?.alt_text;
      }
    }
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('alt_text', data.alt_text);

    fetch(`${url}/api/publisher/${id}/`, {
      method: "PUT",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      else return res.json();
    })
    .then(getData => {
      // alert("Publisher updated Successfully!");
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
      reset();
        setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-publishers');
}, 3000); 
      // history.push('/admin-publishers');
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

  return (
    <div className="max-w-2xl mx-auto my-3 p-6 bg-gray-50 rounded-lg shadow">
      <h3 className="text-2xl font-semibold text-center mb-3">Update Publisher Information</h3>
      <hr className="w-1/2 mx-auto mb-6 border-t border-gray-200" />
      
      <form className="max-w-xl mx-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          defaultValue={details?.name}
          placeholder="Publisher name"
          className="w-full p-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        <input
          {...register("description")}
          defaultValue={details?.description}
          placeholder="Description"
          className="w-full p-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        {details?.image && (
          <img 
            src={details?.image} 
            alt={details?.alt_text} 
            className="h-24 w-24 object-cover rounded p-1 border border-gray-200"
          />
        )}

        <input
          {...register("image")}
          type="file"
          id="choose-file"
          placeholder="Upload an Publisher image"
          className="w-full p-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500
                   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                   file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                   hover:file:bg-green-100"
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />

        <input
          {...register("alt_text")}
          defaultValue={details?.alt_text}
          placeholder="Alt-Text"
          className="w-full p-3 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Update
          </button>
          <Link 
            href='/admin-publishers' 
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cancel <FiX className="w-4 h-4" />
          </Link>
        </div>
      </form>
      {showAlert && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Publisher updated Successfully!</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
