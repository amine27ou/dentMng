import React from 'react'
import team1 from '../assets/team1.jpg'
import team2 from '../assets/team2.jpg'
import team3 from '../assets/team3.jpg'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className='flex  items-center justify-between '>
        <div className='grid grid-cols-2 gap-3'>
            <div className="card p-3 shadow-sm w-[200px] h-[200px] rounded-md">
              <img src={team1} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className="card p-3 shadow-sm w-[200px] h-[200px] rounded-md">
              <img src={team2} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className="card p-3 shadow-sm w-[200px] h-[200px] rounded-md">
              <img src={team3} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className="card p-3 flex items-center justify-center flex-col shadow-md w-[200px] h-[200px] rounded-md">
              <h1 className='text-blue-400 text-6xl font-bold'>20</h1>
              <p className=''>Years experience</p>
            </div>
        </div>
        <div className='w-1/2'>
          <h1 className='text-blue-400 font-bold text-2xl'>About Us</h1>
          <h3 className='font-bold text-6xl'>Book your clinic appointment with an ease</h3>
          <p className='text-gray-500 py-3'>A feature rich and comprehensive medical appointment scheduling software solution to deliver fast and reliable appointment booking experience to patients.</p>
          <div className='flex gap-3 mb-10'>
            <p className='font-bold'>Emergency Help </p><span className='text-blue-400'>&#8226;</span>
            <p className='font-bold'>Qualified Doctors </p><span className='text-blue-400'>&#8226;</span>
            <p className='font-bold'>Best Professionals </p><span className='text-blue-400'>&#8226;</span>
            <p className='font-bold'>Medical Treatment</p>
          </div>
          <Link to='/' className='bg-blue-400 text-white p-4 rounded-md hover:bg-transparent hover:text-blue-400 hover:border-blue-400 hover:border transition-all border border-blue-400'>Contact Us</Link>
        </div>
    </div>
  )
}
