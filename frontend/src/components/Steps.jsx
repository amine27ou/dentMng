import React from 'react'

export default function Steps() {
  return (
    <div className='flex items-center flex-col justify-center mt-10'>
        <h3 className='text-blue-400 font-bold text-3xl'>Working Process</h3>
        <h1 className='text-gray-800 text-6xl mb-10'>How we work?</h1>
        <div className='flex gap-10'>
            <div className='flex flex-col p-5 shadow-md  w-[300px] border'>
                <span className='text-blue-400 font-bold text-4xl mb-4'>1</span>
                <h3 className='font-bold text-2xl'>Registration</h3>
                <p className='text-gray-500'>Patient can do registration from here with basic information.</p>
            </div>
            <div className='flex flex-col p-5 shadow-md  w-[300px] border'>
                <span className='text-blue-400 font-bold text-4xl mb-4'>2</span>
                <h3 className='font-bold text-2xl'>Make Appointment</h3>
                <p className='text-gray-500'>Patient can book an appointment with doctor from landing page or from his login panel.</p>
            </div>
            <div className='flex flex-col p-5 shadow-md  w-[300px] border'>
                <span className='text-blue-400 font-bold text-4xl mb-4'>3</span>
                <h3 className='font-bold text-2xl'>Take Treatment</h3>
                <p className='text-gray-500'>Doctors can interact with patients and do related treatment.</p>
            </div>

        </div>
    </div>
  )
}
