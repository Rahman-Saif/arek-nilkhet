// import Categories from '@/components/CategoryPage/Categories/Categories'
import React from 'react'
import dynamic from 'next/dynamic';

const Categories = dynamic(() => import('@/components/CategoryPage/Categories/Categories'), { ssr: false });


const page = () => {
  return (
    <div>
      <Categories></Categories>
    </div>
  )
}

export default page
