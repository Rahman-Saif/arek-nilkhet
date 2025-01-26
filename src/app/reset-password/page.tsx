// import ResetPassword from '@/components/ForgetPassword/ResetPassword'
import React from 'react'
import dynamic from 'next/dynamic';

const ResetPassword = dynamic(() => import('@/components/ForgetPassword/ResetPassword'), { ssr: false });


const page = () => {
  return (
    <div>
      <ResetPassword></ResetPassword>
    </div>
  )
}

export default page
