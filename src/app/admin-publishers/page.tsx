'use client'
// import AdminPublishers from '@/components/AdminDashboard/AdminPublishers/AdminPublishers';
import usePublishers from '@/Hooks/usePublishers';
// import AdminAuthors from '@/components/AdminDashboard/AdminAuthors/AdminAuthors'
import React from 'react'

import dynamic from 'next/dynamic';

const AdminPublishers = dynamic(() => import('@/components/AdminDashboard/AdminPublishers/AdminPublishers'), { ssr: false });


const page = () => {
      const [publishers] = usePublishers();

  return (
    <div> 
      <AdminPublishers  />
    </div>
  )
}

export default page
