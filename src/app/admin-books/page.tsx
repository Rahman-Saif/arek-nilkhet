'use client'
// import AdminBooks from '@/components/AdminDashboard/AdminBooks/AdminBooks'
import useAuthors from '@/Hooks/useAuthors';
import useBooks from '@/Hooks/useBooks';
import usePublishers from '@/Hooks/usePublishers';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminBooks = dynamic(() => import('@/components/AdminDashboard/AdminBooks/AdminBooks'), { ssr: false });


const page = () => {
      const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();
  const [authors] = useAuthors();
  const [publishers] = usePublishers();

  return (
    <div>
      <AdminBooks  authors={authors} publishers={publishers}></AdminBooks>
    </div>
  )
}

export default page
