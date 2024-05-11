import React from 'react'
import { Link } from 'react-router-dom'
import header from '../assets/header.png'
export default function Header() {
  return (
    <div className='flex items-center justify-center gap-10  mt-10'>
        <div>
            <h2 className='text-blue-400 text-2xl font-bold'>Custom Doctor Appointment Booking Software</h2>
            <h1 className='text-6xl font-bold mb-10'>A white label patient appointment bookings system.</h1>
            <Link to='/' className='bg-blue-400 text-white p-4 rounded-md hover:bg-transparent hover:text-blue-400 hover:border-blue-400 hover:border transition-all border border-blue-400'>Sign Up</Link>
        </div>
        <div>
            <img src={header} className='w-[800px]'  />
        </div>
    </div>
  )
}
