'use client'
import AdminOrders from '@/components/AdminDashboard/AdminOrders/AdminOrders'
import CustomerOrderHistory from '@/components/customerOrderHistory/CustomerOrderHistory';
import useCustomerOrderHistory from '@/Hooks/useCustomerOrderHistory';
// import useAllOrders from '@/Hooks/useAllOrders';
import React from 'react'

const page = () => {
      const [orders] = useCustomerOrderHistory();

  return (
    <div>
       {/* <CustomerOrderHistory orders={orders} /> */}
    </div>
  )
}

export default page
