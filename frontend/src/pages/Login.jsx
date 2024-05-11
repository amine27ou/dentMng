import React, { useEffect, useState } from 'react';
import { FaTooth } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() { 
    const { login,errors,user,getUser } = useAuthContext();
    const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user) {
      getUser()
      navigate('/')
    } else if(!user){
      localStorage.removeItem('token')
      navigate('/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    login(formData).then(()=>{
        setLoading(false)
    })
    
};



  return (
    <div className='bg-gray-100 h-screen flex items-center justify-center flex-col'>
      <FaTooth className='text-blue-400 my-5 text-6xl' />
      <form className='bg-white shadow-md p-5 flex flex-col gap-5 rounded-lg w-1/3 my-5' onSubmit={handleSubmit}>
        <h1 className='text-center font-bold text-4xl'>Sign In</h1>
        <label htmlFor='email'>
          <p>Email:<span className='text-red-500'>*</span></p>
          <input
            className='w-full border p-2 rounded-md outline-blue-400'
            type='email'
            name='email'
            placeholder='Enter Email'
            id='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </label>
        <label htmlFor='password'>
          <div className='flex justify-between'>
            <p>Password:<span className='text-red-500'>*</span></p>
            <Link to='/forgot-password' className='text-blue-400'>Forgot your password?</Link>
          </div>
          <input
            className='w-full border p-2 rounded-md outline-blue-400'
            type='password'
            name='password'
            placeholder='Enter Password'
            id='password'
            value={formData.password}
            onChange={handleChange}
          />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
        </label>
        <label className='flex w-max items-center justify-start gap-5'>
          <input
            type='checkbox'
            className='h-4 w-4 text-blue-500'
            name='rememberMe'
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <p>Remember Me</p>
        </label>
        <button
          type='submit'
          className='bg-blue-400 flex justify-center text-white border-blue-400 p-2 rounded-md hover:bg-blue-500'>
          {loading ? <AiOutlineLoading3Quarters className='animate-spin text-2xl' /> : 'Login'}
        </button>
        <p>New Here?<Link to='/register' className='text-blue-400'>Create an account</Link> </p>
      </form>
      <p>All rights reserved © 2024 <Link className='text-blue-400' to='/'>Clinic Appointment Management</Link></p>
    </div>
  )
}
