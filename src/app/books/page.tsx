'use client'
// import Books from '@/components/Books/Book/Books'
import useBooks from '@/Hooks/useBooks';
import useAuthors from '@/Hooks/useAuthors';
import usePublishers from '@/Hooks/usePublishers';

import React from 'react'
import dynamic from 'next/dynamic';

const Books = dynamic(() => import('@/components/Books/Book/Books'), { ssr: false });


const page = () => {
      const [ books, pageCount, handlePageClick, offset, displayBooks] = useBooks();
      const [authors] = useAuthors();
      const [publishers] = usePublishers();

  return (
    <div>
        <Books books={books} pageCount={pageCount} handlePageClick={handlePageClick} offset={offset} displayBooks={displayBooks} authors={authors} publishers={publishers}></Books>

    </div>
  )
}

export default page
