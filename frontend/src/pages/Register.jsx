import React, { useEffect, useState } from 'react';
import { FaTooth } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Register() {
  const {getUser,user} = useAuthContext()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',

});
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  useEffect(() => {
    if (user) {
      getUser()
      navigate('/')
    } else if(!user){
      localStorage.removeItem('token')
      navigate('/login');
    }
  }, []);

  return (
    <div className='bg-gray-100 h-screen flex items-center justify-center flex-col'>
        <FaTooth className='text-blue-400 my-5 text-6xl'/>
        <form className='bg-white shadow-md p-5 flex flex-col gap-5 rounded-lg w-1/3 my-5' onSubmit={handleSubmit}>
            <h1 className='text-center font-bold text-4xl my-5'>Patient Registration</h1>
            <div className='flex items-center justify-between'>
                <label htmlFor='first_name'>
                    <p>First Name:<span className='text-red-500'>*</span></p>
                    <input className='w-full border p-2 rounded-md outline-blue-400' type='text' name='first_name' placeholder='First Name' id='first_name' value={formData.first_name} onChange={handleChange} />
                </label>
                <label htmlFor='last_name'>
                    <p>Last Name:<span className='text-red-500'>*</span></p>
                    <input className='w-full border p-2 rounded-md outline-blue-400' type='text' name='last_name' placeholder='Last Name' id='last_name' value={formData.last_name} onChange={handleChange} />
                </label>
            </div>

            <div>
            <label htmlFor='email'>
                <p>Email:<span className='text-red-500'>*</span></p>
                <input className='w-full border p-2 rounded-md outline-blue-400' type='email' name='email' placeholder='Enter Email' id='email' value={formData.email} onChange={handleChange} />
            </label>
            </div>

            <div className='flex items-center justify-between'>
                <label htmlFor='password'>
                        <p>Password:<span className='text-red-500'>*</span></p>
                    <input className='w-full border p-2 rounded-md outline-blue-400' type='password' name='password' placeholder='Enter Password' id='password' value={formData.password} onChange={handleChange} />
                </label>
                <label htmlFor='confirm_password'>
                        <p>Confirm Password:<span className='text-red-500'>*</span></p>
                    <input className='w-full border p-2 rounded-md outline-blue-400' type='password' name='confirm_password' placeholder='Confirm Password' id='confirm_password' value={formData.confirm_password} onChange={handleChange} />
                </label>
            </div>
            <label className='flex w-max items-center justify-start gap-5'>
                <input type='checkbox' className='h-4 w-4 text-blue-500' name='agree_terms' checked={formData.agree_terms} onChange={handleChange} />
                <p>I Agree <Link to='/' className='text-blue-400 underline'>Terms and conditions</Link></p>
            </label>
            <button type="submit" className='bg-blue-400 text-white border-blue-400 p-2 rounded-md hover:bg-blue-500'>Submit</button>
            <p>Already have an account? <Link to='/login' className='text-blue-400'> Sign in here</Link> </p>
        </form>
        <p>All rights reserved © 2024 <Link className='text-blue-400' to='/'>Clinic Appointment Management</Link></p> 
    </div>
  )
}
