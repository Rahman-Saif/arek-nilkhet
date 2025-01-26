'use client'
import UpdateCategory from '@/components/AdminDashboard/AdminCategories/UpdateCategory'
import useAllCategories from '@/Hooks/useAllCategories';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const [ categories] = useAllCategories();
      const params = useParams();
      const id = params.id;

  return (
    <div>
      <UpdateCategory categories={categories} id={id} />
    </div>
  )
}

export default page
