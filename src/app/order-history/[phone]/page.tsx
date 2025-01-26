'use client'
import AdminOrders from '@/components/AdminDashboard/AdminOrders/AdminOrders'
import CustomerOrderHistory from '@/components/customerOrderHistory/CustomerOrderHistory';
import useCustomerOrderHistory from '@/Hooks/useCustomerOrderHistory';
import { useParams } from 'next/navigation';
// import useAllOrders from '@/Hooks/useAllOrders';
import React from 'react'

const page = () => {
      const [orders] = useCustomerOrderHistory();
      const params = useParams();
      const phone_number = params.phone;

  return (
    <div>
       <CustomerOrderHistory phone={phone_number}/>
    </div>
  )
}

export default page
