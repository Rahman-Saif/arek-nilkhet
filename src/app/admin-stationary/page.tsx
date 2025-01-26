'use client'
// import AdminStationary from '@/components/AdminDashboard/AdminStationary/AdminStationary'
import useStationary from '@/Hooks/useStationary';
import useStationaryCategory from '@/Hooks/useStationaryCategory';
import React from 'react'

import dynamic from 'next/dynamic';

const AdminStationary = dynamic(() => import('@/components/AdminDashboard/AdminStationary/AdminStationary'), { ssr: false });


const page = () => {
      const [stationaries] = useStationary();
  const [ stationaryCategory ] = useStationaryCategory();

  return (
    <div>
      <AdminStationary  stationaryCategory={stationaryCategory}/>
    </div>
  )
}

export default page
