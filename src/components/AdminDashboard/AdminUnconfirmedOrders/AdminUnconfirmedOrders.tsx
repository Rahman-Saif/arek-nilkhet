

'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
// import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../adminpage.css';
// import { useRouter } from 'next/router';
// import { url } from '@/app/page';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import AdminGetAreas from '../AdminGetArea/AdminGetAreas';
import useAllUnconfirmedOrders from '@/Hooks/useAllunconfirmedOrders';
import Pagination from '@/components/Shared/Pagination/Pagination';


export default function AdminUnconfirmedOrders() {
   const [unconfirmedOrders, pageCount,handlePageClick,offset,displayData] = useAllUnconfirmedOrders();
  const history = useRouter();
  const [search_input, setSearchInput] = useState('');
  const [searchOrders, setSearchOrders] = useState([]);
  const [result, setResults] = useState(0);
  const {register, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
            const url = process.env.NEXT_PUBLIC_URL;

   



  // searching function
  const onSearch = data =>{

    setSearchInput(data.search_input);
    if(data.search_input===''){
      setSearchOrders([]);
      setResults(0);
    }
    else{
    fetch(`${url}/api/order/?search=${data.search_input}`)
      .then(res => res.json())
      .then(result => {
        if(result.length===0){
          setResults(1);
        }
        else{
          setResults(2);
          setSearchOrders(result.results);
        }
      });
    }  
  }

  return (
  <>
    <div className="flex m-0">
        <SideBar />
        <div className="w-11/12 mx-auto">
          <AdminNavbar />
          <h3 className="text-2xl font-semibold text-center pt-3">Parcel Delivery</h3>
          <hr className="w-1/4 mx-auto my-4 border-t border-gray-200" />



          {/* search order */}
          <div className="w-1/2 mx-auto mb-3">
            <form className="container mx-auto" onSubmit={handleSubmit(onSearch)}>
              <div className="flex items-center  mb-3">
                <div className="flex-grow flex items-center border border-green-500 rounded-full p-2 bg-white">
                    <i className="fa fa-search text-green-500 p-1"></i>

                  <input
                    {...register("search_input")}
                    type="text"
                    className=" p-1 text-sm focus:outline-none"
                    placeholder="Search Order by Customer Phone Number or Name"
                  />
                </div>
                <button 
                  type="submit" 
                  className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold   "
                >
                  Search
                </button>
              </div>
            </form>
          </div>



          
          {/* show search result */}
          {search_input===''?
            <></>
            :
            <>
              {result===0 ?
                <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm">
                  <p className="text-sm font-semibold text-gray-700">Sorry, No result found!</p>
                </div>
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
                              <th scope="col" className="px-6 py-3">Customer Name</th>
                              <th scope="col" className="px-6 py-3">Phone No.</th>
                              <th scope="col" className="px-6 py-3">Total Bill</th>
                              <th scope="col" className="px-6 py-3">Status</th>
                              <th scope="col" className="px-6 py-3">Is Placed</th>
                              <th scope="col" className="px-6 py-3">Update</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {searchOrders.map((order) => (
                              <tr key={order?.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{order?.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800">
                                    {order.name}
                                  </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800">
                                    {order.phone_number}
                                  </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{order?.total} টাকা</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order?.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order?.is_placed ? "Yes" : "No"}</td>
                                 <td className="px-6 py-4 whitespace-nowrap space-x-1">
                        {order?.is_placed === false && (
                          <>
                           <Link href={`/get-areas?order_id=${order.id}`}>
                            <button 
                              // onClick={() => <AdminGetAreas order={order} />}
                              
                              className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50"
                            >
                               
                                  Place Order
                              
                            </button>
                              </Link>
                           
                          </>
                        )}
                        {(order?.is_placed === true) && (
                          <>
                            <button disabled className="px-2 py-1 text-sm bg-green-500 text-white rounded opacity-50">Already Placed</button>
                            {/* <button disabled className="px-2 py-1 text-sm bg-yellow-500 text-white rounded opacity-50">Returned</button>
                            <button disabled className="px-2 py-1 text-sm bg-red-500 text-white rounded opacity-50">Cancelled</button> */}
                          </>
                        )}
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
          {/* view all order list */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mb-4">
            <h4 className="text-xl font-semibold text-center mb-3">Parcel Delivery List</h4>
            <hr className="w-1/4 mx-auto mb-4 border-t border-gray-200" />
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Customer Name</th>
                    <th scope="col" className="px-6 py-3">Phone No.</th>
                    <th scope="col" className="px-6 py-3">Total Bill</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Is Placed</th>
                    <th scope="col" className="px-6 py-3">Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800">
                          {order.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800">
                          {order.phone_number}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.total} টাকা</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.is_placed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {order.is_placed ? "Yes" : "No"}
                        </span>
                      </td>



                      <td className="px-6 py-4 whitespace-nowrap space-x-1">
                        {order?.is_placed === false && (
                          <>
                           <Link href={`/get-areas?order_id=${order.id}`}>
                            <button 
                              // onClick={() => <AdminGetAreas order={order} />}
                              
                              className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50"
                            >
                               
                                  Place Order
                              
                            </button>
                              </Link>
                           
                          </>
                        )}
                        {(order?.is_placed === true) && (
                          <>
                            <button disabled className="px-2 py-1 text-sm bg-green-500 text-white rounded opacity-50">Already Placed</button>
                            {/* <button disabled className="px-2 py-1 text-sm bg-yellow-500 text-white rounded opacity-50">Returned</button>
                            <button disabled className="px-2 py-1 text-sm bg-red-500 text-white rounded opacity-50">Cancelled</button> */}
                          </>
                        )}
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
      </div>
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Status Updated successfully
          </AlertDescription>
        </Alert>
      )}
  </>
);

}

