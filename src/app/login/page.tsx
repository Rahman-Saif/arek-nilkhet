// import Login from '@/components/Login/Login'
import React from 'react'
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/Login/Login'), { ssr: false });


const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default page
