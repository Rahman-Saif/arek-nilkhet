'use client'
// import AdminUnconfirmedOrders from '@/components/AdminDashboard/AdminUnconfirmedOrders/AdminUnconfirmedOrders'
import useAllUnconfirmedOrders from '@/Hooks/useAllunconfirmedOrders';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminUnconfirmedOrders = dynamic(() => import('@/components/AdminDashboard/AdminUnconfirmedOrders/AdminUnconfirmedOrders'), { ssr: false });


const page = () => {
      const [unconfirmedOrders] = useAllUnconfirmedOrders();

  return (
    <div>
       <AdminUnconfirmedOrders  />
    </div>
  )
}

export default page
