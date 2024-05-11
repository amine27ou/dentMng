import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/dashboard/Navbar'
import { useAuthContext } from '../../context/AuthContext'
import Toast from '../../components/Toast'

export default function DashboardLayout() {
  const [isOpen,setIsOpen] = useState(true)
  const {user,getUser,message} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      getUser()
    } else if(user === null){
      localStorage.removeItem('token')
      navigate('/login');
    }
    
  }, []);
  return (
    <div className='flex'>
         <Toast/>
        <Sidebar isOpen={isOpen} />
        <div className='flex flex-col w-full'>
          <Navbar isOpen={isOpen} Open={setIsOpen} />
          <Outlet/>
        </div>
    </div>
  )
}