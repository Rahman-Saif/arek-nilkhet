'use client'
import React, {useState} from 'react';
import Link from 'next/link';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import SideBar from '../SideBar/SideBar';
// import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../adminpage.css';
// import { useRouter } from 'next/router';
// import {url} from '../../../App';
import { useRouter } from 'next/navigation';
// import {url} from '../../../App';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import useAllOrders from '@/Hooks/useAllOrders';
import Pagination from '@/components/Shared/Pagination/Pagination';



export default function AdminOrders() {
  const [orders,pageCount,handlePageClick,offset,displayData]=useAllOrders();
  const history = useRouter();
  const [search_input, setSearchInput] = useState('');
  const [searchOrders, setSearchOrders] = useState([]);
  const [result, setResults] = useState(0);
  const {register, handleSubmit} = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [showFileUploadAlert, setShowFileUploadAlert] = useState(false);
    const [showFailedFileUploadAlert, setShowFailedFileUploadAlert] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
           const url = process.env.NEXT_PUBLIC_URL;



  // order delivered function
  const handleDelivered = (id, order) =>{
    order.status = "Delivered";

    fetch(`${url}/api/order/${id}/`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then((res)=> res.json())
    .then((result) => {
      // alert('Status Updateed successfully');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
      history.push('/admin-orders');
     window!==undefined && window.location.reload();
    });
  }

  // order returned function
  const handleReturned = (id, order) =>{
    order.status = "Returned";

    fetch(`${url}/api/order/${id}/`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then((res)=> res.json())
    .then((result) => {
      // alert('Status Updateed successfully');
        setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
      history.push('/admin-orders');
     window!==undefined && window.location.reload();
    });
  }

  // order canceled function
  const handleCancelled = (id, order) =>{
    order.status = "Cancelled";

    fetch(`${url}/api/order/${id}/`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then((res)=> res.json())
    .then((result) => {
        
      const message = `Nilkhet Boi Ghor, Dear ${order.name}, Your Order id ${order.id} is cancelled. Hope we will get you soon . Thank You. www.nilkhetboighor.com`

      //third-party url for order placed
      fetch(`https://24bulksms.com/24bulksms/api/otp-api-sms-send?sender_id=377&api_key=175655169427363520230131091716pmcvWfz5GV&mobile_no=${order.phone_number}&message=${message}&user_email=nilkhetboighor.2020@gmail.com`)
      .then((res)=>res.json())

      // alert('Status Updateed successfully');
        setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
      history.push('/admin-orders');
     window!==undefined && window.location.reload();
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, "bulk_order.xlsx");

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow" as RequestRedirect
    };

    fetch(`${url}/create-bulk-order/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text().then((result) => {
            console.log(result);

            // alert('File uploaded successfully!');
            setShowFileUploadAlert(true);
            setTimeout(() => setShowFileUploadAlert(false), 3000); 
              window!==undefined && window.location.reload(); // Refresh the page

          });
        } 
          return response.text().then((error) => {
            console.error('Error:', error);
            // alert('Failed to upload file.');
            setShowFailedFileUploadAlert(true);
            setTimeout(() => setShowFailedFileUploadAlert(false), 3000); 
          });
        
      })
      .catch((error) => {
        console.error('Error:', error);
        // alert('Failed to upload file.');
        setShowFailedFileUploadAlert(true);
        setTimeout(() => setShowFailedFileUploadAlert(false), 3000); 
      });
  };

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
          <h3 className="text-2xl font-semibold text-center pt-3">Orders</h3>
          <hr className="w-1/4 mx-auto my-4 border-t border-gray-200" />



          {/* search order */}
          <div className="w-1/2 mx-auto mb-3">
            <form className="container mx-auto" onSubmit={handleSubmit(onSearch)}>
              <div className="flex items-center  mb-3">
                <div className="flex-grow flex items-center border border-green-500 rounded-full p-2 bg-white">
                    <i className="fa fa-search text-green-500 p-1"/>

                  <input
                    {...register("search_input")}
                    type="text"
                    className=" p-1 text-sm outline-none"
                    placeholder="Search Order by Customer Phone Number or Name"
                  />
                </div>
                <button 
                  type="submit" 
                  className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded bg-white font-semibold  "
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
                                <td className="px-6 py-4 whitespace-nowrap space-x-1">
                                  {order?.status === 'Pending' && (
                                    <>
                                      <button 
                                      type='button'
                                        onClick={() => handleDelivered(order?.id, order)}
                                        className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50"
                                      >
                                        Delivered
                                      </button>
                                      <button 
                                      type='button'
                                        onClick={() => handleReturned(order?.id, order)}
                                        className="px-2 py-1 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
                                      >
                                        Returned
                                      </button>
                                      <button 
                                      type='button'
                                        onClick={() => handleCancelled(order?.id, order)}
                                        className="px-2 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50"
                                      >
                                        Cancelled
                                      </button>
                                    </>
                                  )}
                                  {(order?.status === 'Delivered' || order.status === 'Returned' || order.status === 'Cancelled') && (
                                    <>
                                      <button type='button' disabled className="px-2 py-1 text-sm bg-green-500 text-white rounded opacity-50">Delivered</button>
                                      <button type='button' disabled className="px-2 py-1 text-sm bg-yellow-500 text-white rounded opacity-50">Returned</button>
                                      <button type='button' disabled className="px-2 py-1 text-sm bg-red-500 text-white rounded opacity-50">Cancelled</button>
                                    </>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.is_placed?'Already Placed':
                        <Link href={`/get-areas?order_id=${order.id}`}
                              className="px-2 py-1 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
                            >
                              Place Order
                            </Link>}</td>
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
            <h4 className="text-xl font-semibold text-center mb-3">Orders List</h4>
            <hr className="w-1/4 mx-auto  border-t border-gray-200" />
              <div className='flex justify-center items-center gap-4 mb-4 '>
            <h1 className="text-xl font-bold mb-4">Upload an Excel File</h1>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="mb-4 w-[200px] mt-2 "
            />
            <button
            type='button'
              onClick={handleFileUpload}
              className="px-2 py-2  border border-green-500 rounded bg-white text-green-500 font-semibold hover:bg-green-50 transition-colors"
            >
              Upload
            </button>
          </div>
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Customer Name</th>
                    <th scope="col" className="px-6 py-3">Phone No.</th>
                    <th scope="col" className="px-6 py-3">Total Bill</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Update</th>
                    <th scope="col" className="px-6 py-3">Delivery Status</th>

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
                      <td className="px-6 py-4 whitespace-nowrap space-x-1">
                        {order?.status === 'Pending' && (
                          <>
                            <button 
                            type='button'
                              onClick={() => handleDelivered(order?.id, order)}
                              className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50"
                            >
                              Delivered
                            </button>
                            <button 
                             type='button'
                              onClick={() => handleReturned(order?.id, order)}
                              className="px-2 py-1 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
                            >
                              Returned
                            </button>
                            <button 
                             type='button'
                              onClick={() => handleCancelled(order?.id, order)}
                              className="px-2 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50"
                            >
                              Cancelled
                            </button>
                          </>
                        )}
                        {(order?.status === 'Delivered' || order.status === 'Returned' || order.status === 'Cancelled') && (
                          <>
                            <button  type='button' disabled className="px-2 py-1 text-sm bg-green-500 text-white rounded opacity-50">Delivered</button>
                            <button  type='button' disabled className="px-2 py-1 text-sm bg-yellow-500 text-white rounded opacity-50">Returned</button>
                            <button  type='button' disabled className="px-2 py-1 text-sm bg-red-500 text-white rounded opacity-50">Cancelled</button>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.is_placed?'Already Placed':
                        <Link href={`/get-areas?order_id=${order.id}`}
                              className="px-2 py-1 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
                            >
                              Place Order
                            </Link>}</td>

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
      {showFileUploadAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            File uploaded successfully
          </AlertDescription>
        </Alert>
      )}
      {showFailedFileUploadAlert && (
        <Alert className="fixed bottom-4 right-4 w-96 bg-[#fac309] opacity-70 border border-green-300 rounded-lg p-4 shadow-lg">
          <Terminal className="h-4 w-4 text-white" />
          <AlertDescription className="text-white">
            Failed to upload file
          </AlertDescription>
        </Alert>
      )}
  </>
);

}
