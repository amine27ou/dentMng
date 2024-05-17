import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { axiosClient } from '../../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function AddPatient() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        gender: '',
        phone: '',
        address: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
              const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/patients`,formData)
              if(response.status === 200){
                setErrors({})
                setLoading(false)
                navigate('/admin/dashboard')
              }
            }catch(err){
              if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
                setLoading(false)
            
            }
        }
    };
    
    return (
        <div className='bg-slate-800 p-5 min-h-screen text-white'>
            <div>
                <h1 className='text-3xl'>Add Patient</h1>
            </div>
            <form className='p-5 bg-slate-700 mt-5 rounded-sm' onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="firstName" className='block'>First Name:<span className='text-red-500'>*</span></label>
                        <input type="text" id="firstName" name="first_name" value={formData.first_name} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='First Name' />
                        {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="lastName" className='block'>Last Name:<span className='text-red-500'>*</span></label>
                        <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Last Name' />
                        {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="email" className='block'>Email:<span className='text-red-500'>*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Email' />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="password" className='block'>Password:<span className='text-red-500'>*</span></label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Password' />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="confirmPassword" className='block'>Confirm Password:<span className='text-red-500'>*</span></label>
                        <input type="password" id="confirmPassword" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Confirm Password' />
                        {errors.confirm_password && <span className="text-red-500">{errors.confirm_password}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="gender" className='block'>Gender:<span className='text-red-500'>*</span></label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none'>
                            <option>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="phoneNumber" className='block'>Phone Number:<span className='text-red-500'>*</span></label>
                        <input type="tel" id="phoneNumber" name="phone" value={formData.phone} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Phone Number' />
                        {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                    </div>
                    <div className='w-full px-3 mb-6'>
                        <label htmlFor="address" className='block'>Address:<span className='text-red-500'>*</span></label>
                        <input id="address" name="address" value={formData.address} onChange={handleChange} required className='bg-slate-800 p-2 border resize-none border-slate-600 rounded-md text-white outline-none' placeholder='Address' />
                        {errors.address && <span className="text-red-500">{errors.address}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="birthDate" className='block'>Birth Date:<span className='text-red-500'>*</span></label>
                        <input type="date" id="birthDate" name="birthdate" value={formData.birthdate} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' />
                        {errors.birthdate && <span className="text-red-500">{errors.birthdate}</span>}
                    </div>
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3'>{loading ? <AiOutlineLoading3Quarters className='text-white animate-spin' /> : 'Register'}</button>
                <button onClick={() => setFormData({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone: '',
    address: '',
    birthdate: ''
})} className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded m-3'>Discard</button>
            </form>
        </div>
    );
}
