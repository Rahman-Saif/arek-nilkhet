'use client'
import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
import '../adminpage.css';
import { useForm } from 'react-hook-form';
//  import { useHistory } from 'react-router-dom';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
// import { useRouter } from 'next/router';
// import { url } from '../../../App';
import { RiDeleteBin5Fill } from "react-icons/ri";
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
import useAuthors from '@/Hooks/useAuthors';
import Pagination from '@/components/Shared/Pagination/Pagination';


export default function AdminAuthors() {
    const [authors, pageCount, handlePageClick, offset, displayData] = useAuthors();
  
  // console.log("ami to lekhoks",authors);
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const {register: searchRegister, handleSubmit: handleSearch} = useForm();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [name, setName] = useState('');
  const [searchAuthors, setSearchAuthors] = useState([]);
  const [result, setResults] = useState(0);
  const history = useRouter();
      const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  //Author add function
  const onSubmit = data => {
     const formData = new FormData();
     if(selectedImage){
      formData.append('image', selectedImage);
     }
     formData.append('name', data.name);
     formData.append('description', data.description);
     formData.append('alt_text', data.alt_text);
       
     fetch(`${url}/create-author/`, {
       method: "POST",
       body: formData,
     })
     .then(res => {
       if (!res.ok) throw res;
       return res.json();
     })
     .then(getData => {
      //  alert("Author added Successfully!");
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
       reset();
      typeof window!==undefined && window.location.reload();
      //  history.push('/admin-authors');  
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


  // author delete function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/author/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
       typeof window!==undefined && window.location.reload();
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

  // searching function
  const onSearch = async (data) => {
    setName(data.name);
    if (data.name === '') {
      setSearchAuthors([]);
      setResults(0);
      return;
    }

    try {
      const response = await fetch(`${url}/api/author/?search=${data.name}`);
        // const response = await fetch(`${url}/product-search-filter/?q=${data.name}`);

      const result = await response.json();
      console.log("Search results:", result);
      
      if (result.length === 0) {
        setResults(1);
        setSearchAuthors([]);
      } else {
        setResults(2);
        setSearchAuthors(result.results);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults(1);
      setSearchAuthors([]);
    }
  }

  return (
    <>
      <div className="flex m-0 ">
  <SideBar/>
  <div className="w-11/12 mx-auto">
    <AdminNavbar/>
    <div className="text-center ">
        <h3 className="pt-3 text-xl font-semibold text-center">Authors</h3>
    <hr className="my-3 border-gray-300 " />
    </div>


    {/* search author */}
    <div className="w-1/2 mx-auto mb-3">
      <form className="mx-auto" onSubmit={handleSearch(onSearch)}>
        <div className="flex items-center mb-3">
          <div className="flex-grow border border-green-500 rounded-full p-2 bg-white flex items-center">
            <i className="fa fa-search text-center p-1"/>
            <input
              {...searchRegister('name')}
              type="text"
              className="text-sm p-1 w-3/4 focus:outline-none"
              placeholder="Search Author by Name"
            />
          </div>
          <button
            className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold "
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>

    {/* show search result */}
    {name === '' ? (
      <></>
    ) : (
      <>
        {result === 0 ? (
          <></>
        ) : (
          <>
            {result === 1 ? (
              <div className="p-2 mb-4 bg-white border rounded text-center">
                <p className="font-bold text-sm">Sorry, No result found!</p>
              </div>
            ) : (
              <div className="p-4 bg-white rounded shadow mb-5">
                <h4 className="text-center font-semibold text-gray-600">Searching List</h4>
                <hr className="w-1/4 mx-auto my-3 border-gray-600" />
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-green-500">
                      <th className="p-2 border-b">ID</th>
                      <th className="p-2 border-b">Name</th>
                      <th className="p-2 border-b">Image</th>
                      <th className="p-2 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchAuthors.map((author) => (
                      <tr key={author.id} className="hover:bg-gray-50 ">
                        <td className="p-2 border-b">{author.id}</td>
                        <td className="p-2 border-b">{author.name}</td>
                        <td className="p-2 border-b">
                          <img
                            src={author?.image}
                            height="50"
                            width="50"
                            alt={author?.alt_text}
                          />
                        </td>
                        <td className="p-2 border-b flex gap-2">
                          <Link 
                            href={`/update-author/${author.id}`} 
                            className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            <FaEdit size={16} className="w-4 h-4" />
                          </Link>
                          <button
                          type="button"
                            onClick={() => handleDelete(author?.id)}
                            className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            <RiDeleteBin5Fill size={16} className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </>
    )}

    {/* add author */}
    <div className="p-4 bg-white rounded shadow mb-3 w-3/4 mx-auto">
  <h4 className="text-center font-semibold">Add a new Author</h4>
  <hr className="w-1/4 mx-auto my-3 border-gray-300" />
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Grid for Name and Description */}
    <div className="grid grid-cols-4 gap-4 mb-3">
      {/* Name */}
      <label htmlFor="authorName" className="self-center text-right col-span-1">*Name:</label>
      <div className="col-span-1">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter author's name"
          className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {errors.name?.type === 'required' && (
          <p role="alert" className="text-red-500 text-sm mt-1">
            লেখকের নাম অত্যাবশ্যকিয়*
          </p>
        )}
      </div>

      {/* Description */}
      <label htmlFor="description" className="self-center text-right col-span-1">Description:</label>
      <div className="col-span-1">
        <input
          id="description"
          {...register("description")}
          type="text"
          placeholder="Enter description"
          className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
    </div>

    {/* Grid for Image and Alt-Text */}
    <div className="grid grid-cols-4 gap-4 mb-3">
      {/* Image */}
      <label htmlFor="image" className="self-center text-right col-span-1">Image:</label>
      <div className="col-span-1">
        <input
          id="image"
          {...register("image")}
          type="file"
          className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          accept="image/*"
          onChange={(event) => setSelectedImage(event.target.files[0])}
        />
      </div>

      {/* Alt-Text */}
      <label htmlFor="altText" className="self-center text-right col-span-1">Alt-Text:</label>
      <div className="col-span-1">
        <input
          id="altText"
          {...register("alt_text")}
          type="text"
          placeholder="Alternate text"
          className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="grid grid-cols-4 mt-6">
      <div className="col-span-4 text-center">
        <input
          type="submit"
          value="Submit"
          className="px-6 md:px-40 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors"
        />
      </div>
    </div>
  </form>
</div>


    {/* show author list */}
    <div className="p-4 bg-white rounded shadow mb-4">
      <h4 className="text-xl font-semibold text-center">Author List</h4>
      <hr className="my-3 border-gray-300" />
      <div className="max-h-[500px] overflow-y-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="bg-gray-100 text-green-500">
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Image</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayData.map((author) => (
              <tr key={author.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{author.id}</td>
                <td className="p-2 border-b">{author.name}</td>
                <td className="p-2 border-b">
                  <img
                    src={author.image}
                    height="50"
                    width="50"
                    alt={author.alt_text}
                  />
                </td>
                <td className="p-2 border-b flex gap-2">
                  <Link 
                    href={`/update-author/${author.id}`} 
                    className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <FaEdit size={16} className="w-4 h-4" />
                  </Link>
                  {/* <button
                    onClick={() => handleDelete(author?.id)}
                    className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  > */}
                    {/* <RiDeleteBin5Fill size={16} className="w-4 h-4" /> */}
                    <AlertDialog>
  <AlertDialogTrigger asChild>
    <button type='button' className="p-1 bg-red-500 text-white rounded m-1">
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
      <AlertDialogAction onClick={() => handleDelete(author.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
                  {/* </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

             <div className="container w-3/4 mx-auto mt-5">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} />
      </div>

  </div>
</div>

 {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Author Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Successfully Author Deleted
          </AlertDescription>
        </Alert>
      )} 

{showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Author Can't be Deleted
          </AlertDescription>
        </Alert>
      )}  

    </>
  );
}

