'use client'
// import AdminCategories from '@/components/AdminDashboard/AdminCategories/AdminCategories'
import useAllCategories from '@/Hooks/useAllCategories';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminCategories = dynamic(() => import('@/components/AdminDashboard/AdminCategories/AdminCategories'), { ssr: false });


const page = () => {
      const [ categories] = useAllCategories();

  return (
    <div>
       <AdminCategories  />
    </div>
  )
}

export default page
