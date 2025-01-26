'use client'
// import AdminAuthors from '@/components/AdminDashboard/AdminAuthors/AdminAuthors'
import useAuthors from '@/Hooks/useAuthors';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminAuthors = dynamic(() => import('@/components/AdminDashboard/AdminAuthors/AdminAuthors'), { ssr: false });


const page = () => {
      const [authors] = useAuthors();

  return (
    <div> 
      <AdminAuthors  />
    </div>
  )
}

export default page
