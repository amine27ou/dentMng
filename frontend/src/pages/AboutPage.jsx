import React from 'react'
import AboutUs from '../components/AboutUs'
import { Link } from 'react-router-dom'
import Reviews from '../components/Reviews'

export default function AboutPage() {
  return (
    <div className='p-4'>
        <div className='flex items-center justify-center flex-col my-20 p-5'>
            <h3 className='text-6xl font-bold'>About Us</h3>
            <h3 className='text-blue-400 font-bold text-2xl'>Home / About Us</h3>
        </div>
        <hr/>
        <AboutUs/>
        <div className='flex items-center justify-center'>
        <div className='my-10 flex items-center justify-center gap-5 p-5 shadow-md border rounded-xl w-max'>
            <div>
                <h1 className='text-blue-400 text-4xl font-bold text-center'>10</h1>
                <p  className='font-bold text-4xl'>Specializations</p>
            </div>
                <div className="line w-[.1px] h-20 bg-gray-600"></div>
            <div>
                <h1 className='text-blue-400 text-4xl font-bold text-center'>20</h1>
                <p  className='font-bold text-4xl'>Services</p>
            </div>
                <div className="line w-[.1px] h-20 bg-gray-600"></div>
            <div>
                <h1 className='text-blue-400 text-4xl font-bold text-center'>19</h1>
                <p  className='font-bold text-4xl'>Doctors</p>
            </div>
                <div className="line w-[.1px] h-20 bg-gray-600"></div>
            <div>
                <h1 className='text-blue-400 text-4xl font-bold text-center'>5320</h1>
                <p  className='font-bold text-4xl'>Satisfied Patient </p>
            </div>
        </div>
        </div>
        {/* our doctor */}
        <div className='bg-gray-100 p-5'>
        <div className='flex items-center justify-center flex-col my-5 p-5 '>
            <h3 className='text-3xl font-bold'>Our Doctor</h3>
            <h3 className='text-blue-400 font-bold text-2xl'>Meet Best Doctors</h3>
        </div>
        <div className='flex items-center justify-center gap-10'>

        <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <img src='https://imgs.search.brave.com/X6jkh5g8H3qFDCcKBG659kFNBQbKJDgSBA9m2EOjQIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC13aGl0/ZS1tYW4taXNvbGF0/ZWRfNTM4NzYtNDAz/MDYuanBnP3NpemU9/NjI2JmV4dD1qcGc' className='w-20 rounded-full h-20 object-cover' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <img src='https://imgs.search.brave.com/X6jkh5g8H3qFDCcKBG659kFNBQbKJDgSBA9m2EOjQIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC13aGl0/ZS1tYW4taXNvbGF0/ZWRfNTM4NzYtNDAz/MDYuanBnP3NpemU9/NjI2JmV4dD1qcGc' className='w-20 rounded-full h-20 object-cover' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <img src='https://imgs.search.brave.com/X6jkh5g8H3qFDCcKBG659kFNBQbKJDgSBA9m2EOjQIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC13aGl0/ZS1tYW4taXNvbGF0/ZWRfNTM4NzYtNDAz/MDYuanBnP3NpemU9/NjI2JmV4dD1qcGc' className='w-20 rounded-full h-20 object-cover' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        </div>
        </div>
        <div className='flex items-center justify-center flex-col'>
        <div className='flex items-center justify-center flex-col mt-5 p-2 '>
            <h3 className='text-3xl text-blue-400 font-bold'>Testimonial</h3>
            <p className=' font-bold text-2xl'>See What Are The Patients Saying About us</p>
        </div>
        <Reviews/>
        </div>
    </div>
  )
}
