import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className='flex items-center justify-center'>
        <AiOutlineLoading3Quarters className='animate-spin text-6xl text-white m-10' />
    </div>
  )
}
