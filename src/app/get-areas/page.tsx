'use client'
import AdminGetAreas from '@/components/AdminDashboard/AdminGetArea/AdminGetAreas';
import AdminOrders from '@/components/AdminDashboard/AdminOrders/AdminOrders'
import useGetAreas from '@/Hooks/useGetAreas';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {
      // const [areas] = useGetAreas([]);

      const search_params = useSearchParams();
      const order_id = search_params.get('order_id'); 

      if(!order_id){
        return <div className='flex justify-center items-center h-screen'>
          <h1>Order ID not found</h1>
        </div>
      }

  return (
    <div>
       <AdminGetAreas order_id={order_id} />
    </div>
  )
}

export default page
