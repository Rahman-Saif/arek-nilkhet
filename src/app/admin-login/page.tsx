import React from 'react'
// import AdminLogin from '@/components/AdminDashboard/adminLogin/AdminLogin'

import dynamic from 'next/dynamic';

const AdminLogin = dynamic(() => import('@/components/AdminDashboard/adminLogin/AdminLogin'), { ssr: false });


const page = () => {
  return (
    <div>
      <AdminLogin />
    </div>
  )
}

export default page
