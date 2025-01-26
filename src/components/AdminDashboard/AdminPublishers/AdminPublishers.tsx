'use react'
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
// import { useHistory } from 'react-router-dom';
// import {url} from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
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
import usePublishers from '@/Hooks/usePublishers';
import Pagination from '@/components/Shared/Pagination/Pagination';


export default function AdminPublishers() {
  const [publishers,pageCount, handlePageClick, offset, displayData]=usePublishers();
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const {register: searchRegister, handleSubmit: handleSearch} = useForm();
  const [ selectedImage,setSelectedImage ] = useState(null);
  const [name, setName] = useState('');
  const [searchPublishers, setSearchPublishers] = useState([]);
  const [result, setResults] = useState(0);
  const history = useRouter();
      const [showAlert, setShowAlert] = useState(false);
    const [showWishlistAlert, setShowWishlistAlert] = useState(false);
    const [showfailedAlert, setshowfailedAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;



  //Publisher add function
  const onSubmit = data => {
     const formData = new FormData();
     if(selectedImage){
      formData.append('image', selectedImage);
     }
     formData.append('name', data.name);
     formData.append('description', data.description);
     formData.append('alt_text', data.alt_text);
       
     fetch(`${url}/create-publisher/`, {
       method: "POST",
       body: formData,
     })
     .then(res => {
       if (!res.ok) throw res;
        return res.json();
     })
     .then(getData => {
      //  alert("Publisher added Successfully!");
      setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 

       reset();
      window!==undefined && window.location.reload();
      //  history.push('/admin-publishers');  
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

  // publisher delete function
  // const handleDelete = id =>{
  //   const confirm = window.confirm('Are you sure to delete publisher?');
  //   if(confirm){
  //       fetch(`${url}/api/publisher/${id}/`, {
  //          method:'DELETE'
  //       })
  //       alert('Publisher deleted!');
  //       window.location.reload();
  //   }
  // }

   const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/publisher/${id}/`, {
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

  // searching function
  const onSearch = data =>{

    setName(data.name);
    if(data.name===''){
      setSearchPublishers([]);
      setResults(0);
    }
    else{
    fetch(`${url}/api/publisher/?search=${data.name}`)
      .then(res => res.json())
      .then(result => {
        if(result.length===0){
          setResults(1);
        }
        else{
          setResults(2);
          setSearchPublishers(result.results);
        }
      });
    }  
  }

  return (
    <>
      <div className=" flex m-0">
        <SideBar />
        <div className="w-11/12 mx-auto">
          <AdminNavbar />
          <h3 className="text-2xl font-semibold text-gray-800 pt-3 text-center">Publishers</h3>
          <hr className="w-1/4 my-4 border-t border-gray-300" />
          {/* search publisher */}



          <div className="w-1/2 mx-auto mb-3">
            <form className="container mx-auto" onSubmit={handleSearch(onSearch)}>
              <div className="flex items-center  mb-3">
                <div className="flex-grow flex items-center border border-green-500 rounded-full p-2 bg-white">
                             <i className="fa fa-search text-green-500 p-1"/>

                  <input
                    {...searchRegister('name')}
                    type="text"
                    className=" p-1 w-3/4 text-sm focus:outline-none"
                    placeholder="Search Publisher by Name"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-3 py-1 ml-2 border border-green-500 rounded bg-white text-green-500 font-semibold hover:bg-green-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>  

          
                  
          {/* show search result */}
          {name===''?
            <></>
            :
            <>
              {result===0 ?
                <></>
                :
                <>
                {result===1?
                  <div className='container p-2 mb-4 bg-white table-responsive border rounded search-div '>
                    <p className='fw-bold custom-h4 p-2 fs-6'>Sorry, No result found!</p>
                  </div>
                  :
                  <>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mb-5">
                      <h4 className="text-xl font-semibold text-center mb-3">Searching List</h4>
                      <hr className="w-1/4 mx-auto mb-4 border-t border-gray-200" />
                      <div className="max-h-[500px] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3">ID</th>
                              <th scope="col" className="px-6 py-3">Name</th>
                              <th scope="col" className="px-6 py-3">Image</th>
                              <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {searchPublishers.map((publisher) => (
                              <tr key={publisher.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{publisher.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{publisher.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <img
                                    src={publisher.image}
                                    className="h-12 w-12 object-cover rounded"
                                    alt={publisher.alt_text}
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                  <Link 
                                    href={`/update-publisher/${publisher.id}`} 
                                    className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                  >
                                    <FiEdit size={16} />
                                  </Link>
                                  <button
                                  type='button'
                                    onClick={() => handleDelete(publisher?.id)}
                                    className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                  >
                                    <RiDeleteBin5Fill size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                }
                </>
              }
            </>
          }
          {/* add publisher */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h4 className="text-xl font-semibold text-center mb-4">Add a new Publisher</h4>
            <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-4 gap-6 mb-4">
                <label htmlFor='' className="self-center text-right">*Name:</label>
                <div className="col-span-1">
                  <input
                    {...register("name", {required: true})}
                    type="text"
                    placeholder="Enter Publisher's name"
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  {errors.name?.type === 'required' && 
                    <p role="alert" className="text-red-500 text-sm mt-1">প্রকাশকের নাম অত্যাবশ্যকিয়*</p>
                  }
                </div>
                <label htmlFor='' className="self-center text-right">Description:</label>
                <div className="col-span-1">
                  <input
                    {...register("description")}
                    type="text"
                    placeholder="Enter description"
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-4">
                <label htmlFor='' className="self-center text-right">Image:</label>
                <div className="col-span-1">
                  <input
                    {...register("image")}
                    type="file"
                    id="choose-file"
                    placeholder="Upload an Publisher image"
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500
                             file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                             file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                             hover:file:bg-green-100"
                    accept="image/*"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                </div>
                <label htmlFor='' className="self-center text-right">Alt-Text:</label>
                <div className="col-span-1">
                  <input
                    {...register("alt_text")}
                    type="text"
                    placeholder="Alternate text"
                    className="w-full p-2 border border-green-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-3/4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>



          
          {/* view publisher list */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mb-4">
            <h4 className="text-xl font-semibold text-center mb-3">Publisher List</h4>
            <hr className="w-1/4 mx-auto mb-4 border-t border-gray-200" />
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Image</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.map((publisher) => (
                    <tr key={publisher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{publisher.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{publisher.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={publisher.image}
                          className="h-12 w-12 object-cover rounded"
                          alt={publisher.alt_text}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <Link 
                          href={`/update-publisher/${publisher.id}`} 
                          className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <FiEdit size={16} />
                        </Link>
                        {/* <button
                          onClick={() => handleDelete(publisher?.id)}
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
      <AlertDialogAction onClick={() => handleDelete(publisher?.id)}>
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
          {/* <AlertTitle className="font-bold text-white">Success!</AlertTitle> */}
          <img src="/images/favicon/book-logo.png" alt="logo" className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Publisher Added
          </AlertDescription>
        </Alert>
      )}

          {showWishlistAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Successfully Publisher Deleted
          </AlertDescription>
        </Alert>
      )} 

{showfailedAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-blue-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-black" />
          <AlertDescription className="text-black">
            Publisher Can't be Deleted
          </AlertDescription>
        </Alert>
      )}  








      </div>
      
    </>
  );
}

