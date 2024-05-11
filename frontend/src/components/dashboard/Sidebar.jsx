import React from 'react';
import { FaTooth } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Sidebar({isOpen}) {
  return (
    <>
    {isOpen && <div className='min-h-screen bg-slate-900  w-1/5 p-5'>
      <div className='min-h-screen  fixed'>
      <div className='flex items-center justify-center'>
        <FaTooth className='text-blue-400 text-4xl' />
        <h3 className='text-white text-3xl ml-2'>DentMng</h3>
      </div>
      <div className='mt-10 text-gray-300 flex flex-col gap-5'>
        <NavLink className={({isActive})=>isActive ? 'text-blue-400 text-1xl' : 'text-white text-1xl'} to='/admin/dashboard'>Dashboard</NavLink>
        <NavLink className={({isActive})=>isActive ? 'text-blue-400 text-1xl' : 'text-white text-1xl'} to='/admin/patients'>Patients</NavLink>
        <NavLink className={({isActive})=>isActive ? 'text-blue-400 text-1xl' : 'text-white text-1xl'} to='/admin/doctors'>Doctors</NavLink>
        <NavLink className={({isActive})=>isActive ? 'text-blue-400 text-1xl' : 'text-white text-1xl'} to='/admin/specializations'>Specializations</NavLink>
        <NavLink className={({isActive})=>isActive ? 'text-blue-400 text-1xl' : 'text-white text-1xl'} to='/admin/appointments'>Appointments</NavLink>
    </div>
      </div>
    </div>}
    </>
  );
}