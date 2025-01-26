'use client'
import React from 'react'
// import { NavLink } from 'react-router-dom'
import img from '../../components/assets/images/404.jpeg'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-5 mb-5 vh-90">
        <img src={img} alt="notfound" className="img-fluid  border-0 rounded-2 shadow-lg mx-auto d-block w-50" />
        <div className='d-flex justify-content-center align-items-center'><Link href="/" className="mt-4 btn btn-outline-danger text-white fs-5 fw-bold text-decoration-none">Back to Nilkhet-Boighor</Link></div>
    </div>
  )
}
