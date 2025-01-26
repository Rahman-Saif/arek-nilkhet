// import AdminBanner from '@/components/AdminDashboard/AdminBanner/AdminBanner'
import React from 'react'
import dynamic from 'next/dynamic';

const AdminBanner = dynamic(() => import('@/components/AdminDashboard/AdminBanner/AdminBanner'), { ssr: false });


const page = () => {
  return (
    <div>
       <AdminBanner/>
    </div>
  )
}

export default page
