// import { url } from '@/app/page';
// import { Link } from 'lucide-react';
import AdminNavbar from '../AdminDashboard/AdminNavbar/AdminNavbar';
import React, { useEffect, useState } from 'react'
import SideBar from '../AdminDashboard/SideBar/SideBar';
import Link from 'next/link';

const CustomerOrderHistory = ({phone}) => {
     const [prevOrders, setprevOrders] = useState([]);
             const url = process.env.NEXT_PUBLIC_URL;

  

    useEffect(() => {
        fetch(`${url}/all-order/${phone}`)
       .then(res => res.json())
       .then(result => {
        console.log('result   of orderssss   ',result);
        setprevOrders(result);
        // const pageNumber = (Math.floor(result.length/20))+1;
        // setPageCount(pageNumber);
        // setDisplayItems(result.slice(offset, (offset+(20*1))));
     });
   }, []);
    console.log("ager sob orderrr",prevOrders);
  return (
   <>
        <div className="flex m-0">
        {/* <SideBar /> */}
        <div className="w-11/12 mx-auto">
          {/* <AdminNavbar /> */}
          <h3 className="text-2xl font-semibold text-center pt-3">User's Order History</h3>
          <hr className="w-1/4 mx-auto my-4 border-t border-gray-200" />
 <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mb-4">
            <h4 className="text-xl font-semibold text-center mb-3">Previous Orders List</h4>
            <hr className="w-1/4 mx-auto mb-4 border-t border-gray-200" />
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Phone No.</th>
                    <th scope="col" className="px-6 py-3">Total Amount</th>
                    <th scope="col" className="px-6 py-3">Order Date</th>
                    <th scope="col" className="px-6 py-3">Order Status</th>
                    <th scope="col" className="px-6 py-3">Transaction ID</th>
                    <th scope="col" className="px-6 py-3">Tracker ID</th>
                    <th scope="col" className="px-6 py-3">Details</th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prevOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800"> */}
                          {order.phone_number}
                        {/* </Link> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <Link href={`/order-invoice/${order.id}`} className="text-blue-600 hover:text-blue-800"> */}
                          {order.total}
                        {/* </Link> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.transaction_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.tracker_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <Link href={`/customer-orderDetails?order_id=${order.id}`}>
                          <a className="text-blue-600 hover:text-blue-800">
                            Details
                          </a>
                        </Link> */}
                        {/* shut up */}
                        { order.id && (
                        <>
                           <Link href={`/customer-orderDetails?id=${order.id}`}>
                            <button 
                              // onClick={() => <AdminGetAreas order={order} />}
                              
                              className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50"
                            >
                               
                                  See Details
                              
                            </button>
                              </Link>
                           
                          </>
                        )}
                         {/* {order?.id && (
                          <Link href={`/get-areas?order_id=${order.id}`}>
                            <a className="px-2 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50">
                              Place Order
                            </a>
                          </Link>
                        )} */}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">{order.tracker_id}</td> */}
                     
                     

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

  </>
  )
}

export default CustomerOrderHistory
