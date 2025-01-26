'use client'
// import AdminElectronics from '@/components/AdminDashboard/AdminElectronics/AdminElectronics'
import useElectronicCategory from '@/Hooks/useElectronicCategory';
import useElectronics from '@/Hooks/useElectronics';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminElectronics = dynamic(() => import('@/components/AdminDashboard/AdminElectronics/AdminElectronics'), { ssr: false });


const page = () => {
      const [ electronics] = useElectronics();
  const [electronicCategory]  = useElectronicCategory();

  return (
    <div>
      <AdminElectronics  electronicCategory={electronicCategory} />
    </div>
  )
}

export default page
