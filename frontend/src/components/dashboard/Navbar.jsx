import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

export default function Navbar({isOpen,Open}) {
    const {user,logout}  = useAuthContext()
    const [profileOpened,setProfileOpen] = useState(false)
    
  return ( 
    <div className='shadow-md p-4 bg-slate-900 flex items-center justify-between w-full'>
        <GiHamburgerMenu className='text-white' onClick={()=>Open(!isOpen)} />
        <div onClick={()=>{setProfileOpen(!profileOpened)}} className='relative flex items-center justify-center gap-2'>
            <img src={`http://127.0.0.1:8000/storage/${user.image}`}
                className='rounded-full w-10 h-10'
            />
            <p className='font-bold text-white'>{user?.name || user.first_name}</p>

            {profileOpened && 
            <div className='position absolute top-10 w-40 right-1 bg-slate-900  rounded-sm text-white'>
                <Link to='/profile' className='flex gap-2 items-center p-4 hover:bg-slate-600 cursor-pointer'><CgProfile /> Profile</Link>
                <span onClick={logout} className='flex gap-2 items-center p-4 hover:bg-slate-600 cursor-pointer'><MdLogout /> Sign Out</span>
            </div>
            }
        </div>
    </div>

  )
}
