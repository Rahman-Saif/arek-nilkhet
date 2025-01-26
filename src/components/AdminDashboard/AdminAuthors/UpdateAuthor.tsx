'use client'
import React from 'react';
// import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { NavLink, useHistory } from 'react-router-dom';
// import { url } from '@/app/page';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { url } from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


export default function UpdateAuthor({authors,id}) {
  const [details, setDetails] = useState({});
  // const { id } = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const history = useRouter();
  const [ selectedImage, setSelectedImage ] = useState(null);
   const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;


  useEffect(() => {
    const matchAuthor = authors.find((author) => author.id == id);
    setDetails(matchAuthor);
  },[id, authors]);


  // author updated function
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
    
    fetch(`${url}/api/author/${id}/`, {
      method: "PUT",
      body: formData,
    })
    .then(res => {
      if (!res.ok) throw res;
      else return res.json();
    })
    .then(getData => {
      // alert("Author updated Successfully!");
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
      // reset();
      setTimeout(() => {
      // typeof window!==undefined && window.location.reload();
      history.push('/admin-authors');
}, 3000); 
      //  
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
    <div className="container  mx-auto mt-36 w-3/4 my-3 border-0 p-3 rounded shadow bg-gray-100">
  <h3 className="text-center text-2xl mb-4">Update Author Information</h3>
  <hr className="w-1/2 mx-auto" />
  <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <input
      {...register("name")}
      defaultValue={details?.name}
      placeholder="Author name"
      className="p-3 my-3 w-full border border-green-500 rounded"
    />
    <input
      {...register("description")}
      defaultValue={details?.description}
      placeholder="Description"
      className="p-3 my-3 w-full border border-green-500 rounded"
    />
    {details?.image && (
      <img
        src={details?.image}
        alt={details?.alt_text}
        height="100"
        width="100"
        className="p-3"
      />
    )}
    <input
      {...register("image")}
      type="file"
      id="choose-file"
      placeholder="Upload an Author image"
      className="p-3 my-3 w-full border border-green-500 rounded"
      data-max-file-size="2M"
      name="upload"
      accept="image/*"
      onChange={(event) => {
        setSelectedImage(event.target.files[0]);
      }}
    />
    <input
      {...register("alt_text")}
      defaultValue={details?.alt_text}
      placeholder="Alt-Text"
      className="p-3 my-3 w-full border border-green-500 rounded"
    />
    <div className="flex space-x-3">
      <input
        type="submit"
        value="Update"
        className="bg-green-500 text-white w-full border border-green-500 rounded py-3"
      />
      <Link
        href="/admin-authors"
        className="bg-red-500 text-white w-1/2 border border-red-500 rounded py-3 flex justify-center items-center"
      >
        Cancel <i className="fa-solid fa-close ml-2"></i>
      </Link>
    </div>
  </form>
  {showAlert && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Author updated Successfully!</AlertDescription>
        </Alert>
      )}
</div>

  );
}
