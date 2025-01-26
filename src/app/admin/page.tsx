'use client'
// import AdminPage from '@/components/AdminDashboard/AdminPage'
import useBooks from '@/Hooks/useBooks';
import React from 'react'
import dynamic from 'next/dynamic';

const AdminPage = dynamic(() => import('@/components/AdminDashboard/AdminPage'), { ssr: false });


const page = () => {
    const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();

  return (
    <div>
      <AdminPage books={books} />
    </div>
  )
}

export default page
