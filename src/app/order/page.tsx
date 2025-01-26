'use client'
// import Order from '@/components/Order/Order'
import React from 'react'
import dynamic from 'next/dynamic';

const Order = dynamic(() => import('@/components/Order/Order'), { ssr: false });

const page = () => {
  return (
    <div>
      <Order></Order>
    </div>
  )
}

export default page
