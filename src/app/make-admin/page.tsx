'use client'
// import MakeAdmin from '@/components/AdminDashboard/MakeAdmin/MakeAdmin'
import useAllAdmin from '@/Hooks/useAllAdmin';
import React from 'react'
import dynamic from 'next/dynamic';

const MakeAdmin = dynamic(() => import('@/components/AdminDashboard/MakeAdmin/MakeAdmin'), { ssr: false });


const page = () => {
      const [ admins] = useAllAdmin();

  return (
    <div>
      <MakeAdmin admins={admins}/>
    </div>
  )
}

export default page
