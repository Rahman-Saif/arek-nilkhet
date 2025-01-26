'use client'
// import Stationaries from '@/components/Stationary/Stationary/Stationaries'
import useStationary from '@/Hooks/useStationary';
import useStationaryCategory from '@/Hooks/useStationaryCategory';
import React from 'react'
import dynamic from 'next/dynamic';

const Stationaries = dynamic(() => import('@/components/Stationary/Stationary/Stationaries'), { ssr: false });


const page = () => {
      const [stationaries] = useStationary();
  const [ stationaryCategory ] = useStationaryCategory();
  return (
    <div>
    <Stationaries ></Stationaries>

    </div>
  )
}

export default page
