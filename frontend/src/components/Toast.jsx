import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function Toast() {
    const {message,setMessage} = useAuthContext()
    useEffect(() => {
        if (message.message) {
          const timer = setTimeout(() => {
            setMessage({});
          }, 6000);
    
          return () => clearTimeout(timer);
        }
      }, [message]);
  return (
    <>
    {message.message && <div className={`${message.type ==='success' ? 'bg-green-400 border border-green-600' :
'bg-red-400 border text-red-500 border-red-500' } fixed right-5 top-20 text-green-800 p-4 rounded-md`}>
        <p>{message.message}</p>
    </div>}
    </>
  )
}
