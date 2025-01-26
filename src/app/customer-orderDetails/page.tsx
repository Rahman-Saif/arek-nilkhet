'use client'
import AdminGetAreas from '@/components/AdminDashboard/AdminGetArea/AdminGetAreas';
import AdminOrders from '@/components/AdminDashboard/AdminOrders/AdminOrders'
import CustomerOrderDetails from '@/components/customerOrderHistory/CustomerOrderDetails';
import useGetAreas from '@/Hooks/useGetAreas';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {
      // const [areas] = useGetAreas([]);

      const search_params = useSearchParams();
      const id = search_params.get('id'); 

      if(!id){
        return <div className='flex justify-center items-center h-screen'>
          <h1>Order ID not found</h1>
        </div>
      }

  return (
    <div>
       <CustomerOrderDetails id={id} />
    </div>
  )
}

export default page
