'use client'


import UpdatePublisher from '@/components/AdminDashboard/AdminPublishers/UpdatePublisher'
import usePublishers from '@/Hooks/usePublishers';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const [publishers] = usePublishers();
      const params = useParams();
      const id = params.id;

  return (
    <div>
      <UpdatePublisher publishers={publishers} id={id}/>
    </div>
  )
}

export default page
