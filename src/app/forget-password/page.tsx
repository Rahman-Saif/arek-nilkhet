// import ForgetPassword from '@/components/ForgetPassword/ForgetPassword'
import React from 'react'
import dynamic from 'next/dynamic';

const ForgetPassword = dynamic(() => import('@/components/ForgetPassword/ForgetPassword'), { ssr: false });

const page = () => {
  return (
    <div>
      <ForgetPassword/>
    </div>
  )
}

export default page
