'use client'
import UpdateElectronics from '@/components/AdminDashboard/AdminElectronics/UpdateElectronics'
import useElectronics from '@/Hooks/useElectronics';
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {
      const [ electronics] = useElectronics();
      const params = useParams();
      const id = params.id;

  return (
    <div>
      <UpdateElectronics electronics={electronics} id={id}/>
    </div>
  )
}

export default page
