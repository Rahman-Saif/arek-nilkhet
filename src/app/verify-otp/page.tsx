// import VerifyOTP from '@/components/Registration/VerifyOTP'
import React from 'react'

import dynamic from 'next/dynamic';

const VerifyOTP = dynamic(() => import('@/components/Registration/VerifyOTP'), { ssr: false });


const page = () => {
  return (
    <div>
      <VerifyOTP/>
    </div>
  )
}

export default page
