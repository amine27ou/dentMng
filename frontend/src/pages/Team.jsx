import React from 'react'
import { Link } from 'react-router-dom'

export default function Team() {
  return (
    <div>
        <div className='flex items-center justify-center flex-col my-20'>
            <h3 className='text-6xl font-bold'>Our Team</h3>
            <p className='text-blue-400 font-bold text-2xl'>Home /Our Team</p>
        </div>
        <hr/>
        <div className='bg-gray-100 p-10 grid grid-cols-4 gap-10'>
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
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md  hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        </div>
    </div>
  )
}
