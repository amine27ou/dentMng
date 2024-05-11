import React from 'react'
import { Link } from 'react-router-dom'
import { LiaTeethOpenSolid } from "react-icons/lia";

export default function ServicesPage() {
  return (
    <div>
        <div className='flex items-center justify-center flex-col p-5 my-20'>
            <h3 className='text-6xl font-bold'>Services</h3>
            <p className='text-blue-400 font-bold text-2xl'>Home / Services</p>
        </div>
        <hr/>
        {/* card */}
        <div className='bg-gray-100 p-10 grid grid-cols-4 gap-10'>
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        {/* card */}
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        {/* card */}
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        {/* card */}
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        {/* card */}
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
       
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        {/* card */}
            <div className='bg-white p-5 w-[250px] shadow-md border flex items-center justify-center flex-col rounded-br-3xl'>
                <LiaTeethOpenSolid className='text-6xl ' />
                <h3 className='text-blue-400 text-xlx'>Partha Saha</h3>
                <p className='my-2'>Medical Genetics</p>
                <Link to='/' className='bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700'>Book An Appointment</Link>
            </div>
        </div>
</div>
  )
}
