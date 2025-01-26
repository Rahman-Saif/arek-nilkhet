// import AdminCustomers from '@/components/AdminDashboard/AdminCustomers/AdminCustomers'
import React from 'react'
import dynamic from 'next/dynamic';

const AdminCustomers = dynamic(() => import('@/components/AdminDashboard/AdminCustomers/AdminCustomers'), { ssr: false });


const page = () => {
  return (
    <div>
      <AdminCustomers></AdminCustomers>
    </div>
  )
}

export default page
