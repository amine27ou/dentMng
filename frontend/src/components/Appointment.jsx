import React from 'react'
import appointmentIcon from '../assets/appointment.png'

export default function Appointment() {
  return (
    <div className='grad-background rounded-md flex px-10'>
        <div>
            <img src={appointmentIcon} />
        </div>
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-white text-3xl mb-4'>Book An Appointment</h3>
            <form className='flex justify-center flex-col items-center gap-3'>
                <div className='flex gap-4'>
                    <input type='text' className='form-control w-1/2'  placeholder='First Name' required/>
                    <input type='text' className='form-control w-1/2'  placeholder='Last Name' required/>
                </div>
                <div className='flex gap-4 w-full'>
                    <input type='email' className='form-control w-full'  placeholder='Email' required/>
                </div>
                <div className='flex gap-4 w-full'>
                    <select className='form-control w-1/2' required>
                        <option>Select Doctor</option>
                    </select>
                    <input type='date' className='form-control w-1/2'  placeholder='Select Date' required/>
                </div>
                <button type='submit' className='bg-white rounded-3xl p-3 text-blue-300'>Appointment Now</button>
            </form>
        </div>
    </div>
  )
}
