import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function Contact() {
  return (
    <div className=" pt-10">
      <div className='flex items-center justify-center flex-col my-20'>
        <h3 className='text-6xl font-bold'>Contact Us</h3>
        <h3 className='text-blue-400 font-bold text-2xl'>Home / Contact Us</h3>
      </div>
      <hr />
      <div className='bg-gray-100 p-5'>
      <form className='flex flex-col gap-5 max-w-md mx-auto '>
        {/* 1st row */}
        <div className='grid grid-cols-2 gap-5'>
          <input type='text' className='border p-3 outline-blue-400 rounded-lg' placeholder='Name' name='name' />
          <input type='email' className='border p-3 outline-blue-400 rounded-lg' placeholder='Email' name='email' />
        </div>
        {/* 2nd row */}
        <div className='grid grid-cols-2 gap-5'>
          <input type='text' className='border p-3 outline-blue-400 rounded-lg' placeholder='Phone' name='phone' />
          <input type='text' className='border p-3 outline-blue-400 rounded-lg' placeholder='Subject' name='subject' />
        </div>
        {/* 3rd row */}
        <textarea className='border p-3 outline-blue-400 rounded-lg h-40 resize-none' name='message' placeholder='Message'></textarea>
        {/* Submit button */}
        <button type='submit' className='bg-blue-400 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-300'>Submit</button>
      </form>
      </div>
      {/* 2nd section */}
      <div className='flex items-center justify-center gap-5 my-20'>
        <div className='p-4 shadow-lg border rounded-br-3xl w-1/4 h-[200px]'> 
          <FaPhoneAlt className='text-blue-400 text-4xl bg-gray-200 p-2 rounded-md' />
          <h4 className='font-medium text-2xl my-3'>Contact Number</h4>
          <p className='text-gray-400'>+212 6643732</p>
        </div>
        <div className='p-4 shadow-lg border rounded-br-3xl w-1/4 h-[200px]'> 
          <MdEmail className='text-blue-400 text-4xl bg-gray-200 p-2 rounded-md' />
          <h4 className='font-medium text-2xl my-3'>Email Address</h4>
          <p className='text-gray-400'>example@example.com</p>
        </div>
        <div className='p-4 shadow-lg border rounded-br-3xl w-1/4 h-[200px]'> 
          <FaLocationDot className='text-blue-400 text-4xl bg-gray-200 p-2 rounded-md' />
          <h4 className='font-medium text-2xl my-3'>Address</h4>
          <p className='text-gray-400'>C-303, Atlanta Shopping Mall, Nr. Sudama Chowk, Mota Varachha, Surat, Gujarat, India.</p>
        </div>
      </div>
    </div>
  )
}
