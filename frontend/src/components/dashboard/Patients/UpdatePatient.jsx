import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { axiosClient } from '../../../api/axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdatePatient() {
    const {id} = useParams()
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
        const formDataWithMethod = {...formData,_method:'PUT'}

        
            try{
                const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`, formDataWithMethod, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
              if(response.status === 200){
                setErrors({})
                setLoading(false)
                navigate('/admin/patients')
              }
            }catch(err){
              if (err.response) {
                setErrors(err.response.data.errors);
                setLoading(false)
            
            }
        }
    };
    useEffect(()=>{
        axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`).then((res)=>{
            setFormData({
                first_name: res.data.patient.first_name || '',
                last_name: res.data.patient.last_name || '',
                email: res.data.patient.email || '',
                password:  '',
                confirm_password: '',
                gender: res.data.patient.gender || '',
                phone: res.data.patient.phone || '',
                address: res.data.patient.address || '',
                birthdate: res.data.patient.birthdate || ''
            })
        })
    },[id])
    return (
        <div className='bg-slate-800 p-5 min-h-screen text-white'>
            <div className='flex justify-between'>
                <h1 className='text-2xl'>Update Patient</h1>
                <Link to='/admin/patients' className='text-blue-400 border rounded-md border-blue-400 p-2 '>Back</Link>
                
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
                        <label htmlFor="password" className='block'>Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Password' />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="confirmPassword" className='block'>Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirm_password" value={formData.confirm_password} onChange={handleChange}  className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Confirm Password' />
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
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3'>{loading ? <AiOutlineLoading3Quarters className='text-white animate-spin' /> : 'Save'}</button>
                
            </form>
        </div>
    );
}
