// import Registration from '@/components/Registration/Registration'
import React from 'react'
import dynamic from 'next/dynamic';

const Registration = dynamic(() => import('@/components/Registration/Registration'), { ssr: false });


const page = () => {
  return (
    <div>
        <Registration></Registration>
    </div>
  )
}

export default page
