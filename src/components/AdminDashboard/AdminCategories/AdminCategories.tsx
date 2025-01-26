'use client'
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
// import { NavLink, useHistory } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
// import { FaPenToSquare } from 'react-icons/fa6';
// import { FaTrashAlt } from 'react-icons/fa';
// import {url} from '../../../App';
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
import useCategories from '@/Hooks/useCategories';
import Pagination from '@/components/Shared/Pagination/Pagination';

export default function AdminCategories() {
  const [categories,pageCount, handlePageClick, offset, displayData]=useCategories();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const {register: searchRegister, handleSubmit: handleSearch} = useForm();
  const [name, setName] = useState('');
  const [searchCategories, setSearchCategories] = useState([]);
  const [result, setResults] = useState(0);
  const history = useRouter();
   const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;


  // category add function
  const onSubmit = data => {

    fetch(`${url}/api/category/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((result) =>{
      if(result.status===400){
        alert(result.message);
        reset();
      }
      else{
        // alert("Category added Successfully!");
        setShowAlert(true); 
        setTimeout(() => setShowAlert(false), 3000); 
        reset();
        history.push('/admin-categories');
      }     
    });
  }

  // category delete function
  const handleDelete = async(name) =>{
    try {
      const response = await fetch(`${url}/api/category/${name}`, {
        method:'DELETE'
      })
      if (response.ok) {
        // alert('Category deleted!');
        setShowWishlistAlert(true);
        setTimeout(() => setShowWishlistAlert(false), 3000);
       window!==undefined && window.location.reload();
      } else {
        // alert('Failed to delete category');
        setshowfailedAlert(true);
        setTimeout(() => setshowfailedAlert(false), 3000);
      }
    } catch (error) {
      // console.error('Delete error:', error);
      setshowfailedAlert(true);
      setTimeout(() => setshowfailedAlert(false), 3000);
    }
  }

  // searching function
  const onSearch = data =>{
    console.log("kiree nam ki",data);

    setName(data.name);
    if(data.name===''){
      setSearchCategories([]);
      setResults(0);
    }
    else{
      fetch(`${url}/api/category/?search=${data.name}`)
      .then(res => res.json())
      .then(result => {
          if(result.length===0){
            setResults(1);
          }
          else{
            setResults(2);
            setSearchCategories(result.results);
          }
      });
    }  
  }

 
  return (
    <div className="flex m-0">
      <SideBar />
      <div className="w-11/12 mx-auto">
        <AdminNavbar />
        <h3 className="text-center pt-3">Categories</h3>
        <hr className="w-1/4 mx-auto" />
        
        {/* search category */}
        <div className="w-1/2 mx-auto mb-3">
          <form className="container mx-auto" onSubmit={handleSearch(onSearch)}>
            <div className="flex items-center mb-3">
              <div className="flex-grow border border-green-500 rounded-full p-2 bg-white flex items-center">
                <i className="fa fa-search text-center p-1"/>
                <input
                  {...searchRegister('name')}
                  type="text"
                  placeholder="Search category by Name"
                  className="text-sm p-1 w-3/4 outline-none"
                />
              </div>
              <button
                className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold  "
                type="submit"
                value="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* show search result */}
        {name === '' ? null : (
          result === 0 ? null : (
            result === 1 ? (
              <div className="container p-4 mb-4 bg-white border rounded-lg">
                <p className="font-bold p-2 text-sm text-gray-700">Sorry, No result found!</p>
              </div>
            ) : (
              <div className="container p-4 border rounded-lg  shadow mb-5 bg-white overflow-x-auto flex items-center flex-col">
                <h4 className="text-center font-bold heading mb-2 text-lg">Searching List</h4>
                <hr className="w-1/4 mx-auto mb-4 heading" />
                <table className="win-w-full mb-3 table table-auto table-bordered ">
                  <thead className="custom-search">
                    <tr className="heading">
                      <th className="p-2 mr-9 ">ID</th>
                      <th className="p-2 mr-9">Name</th>
                      <th className="p-2 mr-9">Parent ID</th>
                      <th className="p-2 mr-9">Total Children</th>
                      <th className="p-2 mr-9">Action</th>
                    </tr>
                  </thead>
                  <tbody className="custom-search">
                    {searchCategories.map((category) => (
                      <tr key={category.id}>
                        <td className='p-2 mr-9'>{category.id}</td>
                        <td className='p-2 mr-9'>{category.name}</td>
                        <td className='p-2 mr-9'>{category.parent}</td>
                        <td className='p-2 mr-9'>{category.children.length}</td>
                        <td className='p-2 mr-9'>
                          <Link
                            href={`/update-category/${category.id}`}
                            className="inline-flex items-center justify-center p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            <FiEdit size={16} className="w-4 h-4" />
                          </Link>
                          <button
                          type='button'
                            onClick={() => handleDelete(category?.name)}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )
        )}

        {/* add a new category */}
        <div className="p-3 rounded shadow mx-auto w-3/4 mb-3 bg-white">
          <h4 className="text-center">Add a new Category</h4>
          <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="ক্যাটাগরীর নাম লিখুন"
              className="p-3 m-3 w-full border border-green-500 rounded"
            />
            {errors.name?.type === 'required' && (
              <p role="alert" className="text-red-500">
                <small>ক্যাটাগরীর নাম্ অত্যাবশ্যকিয়*</small>
              </p>
            )}
            <br />
            <select
              className="p-3 m-3 w-full border border-green-500 rounded bg-white "
              {...register('parent')}
            >
              <option selected disabled value="">
                একটি প্যারেন্ট ক্যাটাগরী নির্বাচন করুন
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="submit"
              value="Submit"
              className="btn bg-green-500 text-white py-2 px-4 w-full border border-green-500 rounded m-3"
            />
          </form>
        </div>

        {/* view all categories */}
        <div className="mx-auto mb-4">
          <h4 className="text-center font-semibold text-xl">Category List</h4>
          <hr className="w-1/4 mx-auto my-3" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-green-600">ID</th>
                    <th className="px-6 py-3 text-green-600">Name</th>
                    <th className="px-6 py-3 text-green-600">Parent ID</th>
                    <th className="px-6 py-3 text-green-600">Total Children</th>
                    <th className="px-6 py-3 text-green-600">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData?.map((category) => (
                    <tr key={category?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{category?.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category?.parent}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category?.children?.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <Link
                          href={`/update-category/${category.id}`}
                          className="inline-flex items-center justify-center p-2 bg-blue-600 text-white rounded "
                        >
                          <FiEdit size={16} className="w-4 h-4" />
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                            type='button'
                            className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600">
                              <FiTrash2 size={16} className="w-4 h-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the category.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(category?.name)}>
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
  <div className=" container w-3/4 mx-auto mt-5">
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                offset={offset}
              />
            </div>



      </div>

      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Category Added
          </AlertDescription>
        </Alert>
      )}

      {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Category Deleted
          </AlertDescription>
        </Alert>
      )}

      {showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Category Can't be Deleted
          </AlertDescription>
        </Alert>
      )}
    </div>
    
  );
}
