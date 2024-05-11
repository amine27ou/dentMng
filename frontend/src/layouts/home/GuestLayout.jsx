import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTooth } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Toast from '../../components/Toast';
import { useAuthContext } from '../../context/AuthContext';

export default function GuestLayout() {
    const {user} = useAuthContext()
  return (
    <>
    <Toast/>
    <div className='flex items-center px-20 py-5 justify-between gap-20 border-b-2'>
        <div>
            <Link to='/'>
                <FaTooth className='text-blue-400 text-4xl' />
            </Link>
        </div>
        <div className='navlinks flex items-center justify-between gap-20 w-full'>
            <div className="nav flex gap-4">
                <Link className='hover:text-blue-400 transition-all' to='/'>Home</Link>
                <Link className='hover:text-blue-400 transition-all' to='/medical-doctors'>Our Team</Link>
                <Link className='hover:text-blue-400 transition-all' to='/medical-services'>Services</Link>
                <Link className='hover:text-blue-400 transition-all' to='/medical-about-us'>About Us</Link>
                <Link className='hover:text-blue-400 transition-all' to='/medical-contact'>Contact Us</Link>
            </div>
            <div className='flex gap-4'>
                {user ? <Link to='/admin/dashboard' className='border-blue-400 bg-transparent text-blue-400 border p-2 rounded-md'>Dashboard</Link> : <Link to='/login' className='border-blue-400 bg-transparent text-blue-400 border p-2 rounded-md'>Login</Link>}
                <Link to='/register' className='bg-blue-400 text-white p-2 rounded-md hover:bg-transparent hover:text-blue-400 hover:border-blue-400 hover:border border border-blue-400'>Book An Appointment </Link>
            </div>
        </div>
    </div>
    <Outlet/>
    <div className='grad-background p-10 text-white flex items-center justify-between'>
        <div className='flex flex-col justify-center items-center'>
            <FaTooth className='text-white text-6xl' />
            <p className='text-white font-bold text-2xl'>DentArc</p>
        </div>
        <div>
            <h3 className='text-3xl mb-4 text-blue'>Contact Us</h3>
            <p className='flex items-center gap-3 text-xl '><FaPhone className='bg-blue-600 w-8 h-8 p-2 rounded-sm mb-2' /> +212 5478449</p>
            <p className='flex items-center gap-3 text-xl '><MdEmail className='bg-blue-600 w-8 h-8 p-2 rounded-sm' /> email@example.com</p>
        </div>
        <div>
            <h3 className='text-3xl mb-4'>Quick Links</h3>
            <div className='flex flex-col'>
            <Link to='/' className='hover:text-blue-600 transition-all'>About Us</Link>
            <Link to='/' className='hover:text-blue-600 transition-all'>Contact Us</Link>
            <Link to='/' className='hover:text-blue-600 transition-all'>FAQs</Link>
            <Link to='/' className='hover:text-blue-600 transition-all'>Terms & Conditions</Link>
            <Link to='/' className='hover:text-blue-600 transition-all'>Privacy Policy</Link>
            </div>
        </div>
        <div>
            <h3 className='text-3xl mb-4'>Subcribe</h3>
            <div className='flex '>
                <input type='email' placeholder='Enter Your Email' className='form-control w-full' />
                <button><IoMdSend className='bg-blue-600 text-white p-2 w-10 h-10 rounded-md' /></button>
            </div>
        </div>
    </div>
    </>
  )
}
