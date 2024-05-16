import React from 'react';
import { FaTooth } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";

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
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md  ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/dashboard'><MdDashboard/>Dashboard</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/patients'><IoPersonSharp/>Patients</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/doctors'><FaUserDoctor/>Doctors</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/specializations'><IoPersonSharp/>Specializations</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/appointments'><FaCalendarAlt/>Appointments</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/services'><RiServiceFill/>Services</NavLink>
        <NavLink className={({ isActive }) => 
                `flex items-center gap-2 transition-all hover:bg-blue-300 p-4 rounded-md ${
                    isActive ? 'text-blue-400 bg-blue-100' : 'text-white bg-gray-800'
                }`
            } to='/admin/medicines'><GiMedicines/>Medicines</NavLink>
    </div>
      </div>
    </div>}
    </>
  );
}