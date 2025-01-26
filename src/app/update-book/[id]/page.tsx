'use client'
import UpdateBook from '@/components/AdminDashboard/AdminBooks/UpdateBook'
import useAllCategories from '@/Hooks/useAllCategories';
import useAuthors from '@/Hooks/useAuthors';
import useBooks from '@/Hooks/useBooks';
import usePublishers from '@/Hooks/usePublishers';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();
  const [authors] = useAuthors();
  const [publishers] = usePublishers();
    const [ categories] = useAllCategories();
     const params = useParams();
  const id = params.id;

  return (
    <div>
      <UpdateBook id={id} books={books} categories={categories} authors={authors} publishers={publishers}/>
    </div>
  )
}

export default page
