'use client'
// import AdminOrders from '@/components/AdminDashboard/AdminOrders/AdminOrders'
import useAllOrders from '@/Hooks/useAllOrders';
import React from 'react'

import dynamic from 'next/dynamic';

const AdminOrders = dynamic(() => import('@/components/AdminDashboard/AdminOrders/AdminOrders'), { ssr: false });


const page = () => {
      const [orders] = useAllOrders();

  return (
    <div>
       <AdminOrders  />
    </div>
  )
}

export default page
