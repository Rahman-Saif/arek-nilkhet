'use client'
// import Electronics from '@/components/Electronics/Electronics/Electronics'
import useElectronicCategory from '@/Hooks/useElectronicCategory';
import useElectronics from '@/Hooks/useElectronics';
import React from 'react'

import dynamic from 'next/dynamic';

const Electronics = dynamic(() => import('@/components/Electronics/Electronics/Electronics'), { ssr: false });


const page = () => {
    const [ electronics] = useElectronics();

  return (
    <div>
      <Electronics />
    </div>
  )
}

export default page
