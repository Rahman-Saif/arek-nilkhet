// import AdminLogo from '@/components/AdminDashboard/AdminLogo/AdminLogo'
import React from 'react'

import dynamic from 'next/dynamic';

const AdminLogo = dynamic(() => import('@/components/AdminDashboard/AdminLogo/AdminLogo'), { ssr: false });


const page = () => {
  return (
    <div>
      <AdminLogo></AdminLogo>
    </div>
  )
}

export default page
