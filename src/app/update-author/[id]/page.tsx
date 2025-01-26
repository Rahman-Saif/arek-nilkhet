'use client'
import UpdateAuthor from '@/components/AdminDashboard/AdminAuthors/UpdateAuthor';
// import AdminAuthors from '@/components/AdminDashboard/AdminAuthors/AdminAuthors'
import useAuthors from '@/Hooks/useAuthors';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const [authors] = useAuthors();
      const params = useParams();
  const id = params.id;

  return (
    <div> 
      <UpdateAuthor authors={authors} id={id}/>
    </div>
  )
}

export default page
