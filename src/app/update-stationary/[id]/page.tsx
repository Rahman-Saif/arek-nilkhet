'use client'
import UpdateStationary from '@/components/AdminDashboard/AdminStationary/UpdateStationary'
import useStationary from '@/Hooks/useStationary';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const [stationaries] = useStationary();
      const params = useParams();
  const id = params.id;

  return (
    <div>
       <UpdateStationary id={id} stationaries={stationaries} />
    </div>
  )
}

export default page
