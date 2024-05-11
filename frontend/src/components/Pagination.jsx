import React from 'react'

export default function Pagination({handleNext,handlePrev,data}) {
  return (
    <div className='flex justify-center'>
        {data.prev_page_url &&  <button onClick={()=>handleNext(data.prev_page_url)} className='bg-slate-700 text-blue-400 p-2 rounded-md m-1'>Previous</button>}
        {data.next_page_url && <button onClick={()=>handleNext(data.next_page_url)} className='bg-slate-700 text-blue-400 p-2 rounded-md m-1'>Next</button>}
    </div>
  )
}
