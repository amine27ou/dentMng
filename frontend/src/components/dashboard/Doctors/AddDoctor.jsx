import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AddDoctor() {
    const [specializations, setSpecializations] = useState([]);
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password:'',
      gender: '',
      address: '',
      phone: '',
      status: '',
      specialization_id: ''
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/doctors`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        if (response.status === 200) {
            setLoading(false)
            navigate('/admin/doctors')
        }

      } catch (error) {
        setLoading(false)
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
      }
    } 
};


const handleChange = (e)=>{
      const {value,name,files,type} = e.target
      const newValue = type === 'file' ? files[0] : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    }

    const [errors,setErrors] = useState({})
    const fetchSpec = async () => {
        try {
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/specializations`);
            if (response.status === 200) {
                setSpecializations(response.data.specializations); 
            }
        } catch (err) {
            console.error('Error fetching specializations:', err);
        }
    };

    useEffect(() => {
        fetchSpec();
    }, []);


    return (
        <div className='p-4 bg-slate-800 min-h-screen text-white'>
            <div className='flex justify-between items-center'>
              <h1>Add Doctor</h1>
              <Link to='/admin/doctors' className='p-2 text-white bg-blue-400 rounded-md' >Back</Link>
            </div>
            <form onSubmit={handleSubmit} className='bg-slate-700 p-5 rounded-lg mt-5'>
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
                        <label htmlFor="status" className='block'>Status:<span className='text-red-500'>*</span></label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none'>
                            <option value="">Select</option>
                            <option value="available">Available</option>
                            <option value="not available">Not Available</option>
                        </select>
                        {errors.status && <span className="text-red-500">{errors.status}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="status" className='block'>specialization:<span className='text-red-500'>*</span></label>
                        <select id="specialization" name="specialization_id"  onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none'>
                        <option value="">Select</option>

                          {
                            specializations.map((spec)=>(
                              <>
                                <option value={spec.id}>{spec.name}</option>
                                
                              </>
                            ))
                          }
                        </select>
                        {errors.specialization_id && <span className="text-red-500">{errors.specialization_id}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="image" className='block'>Image</label>
                        <input className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' type='file' name='image' onChange={handleChange}/>
                        {errors.image && <span className="text-red-500">{errors.image}</span>}
                    </div>
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mt-3'>{loading ? <AiOutlineLoading3Quarters className='text-white animate-spin' /> : 'Register'}</button>
                <button onClick={()=>setFormData({})} className='bg-gray-500 hover:bg-gray-400 text-white  py-2 px-4 rounded m-3'>Discard</button>
            </form>
        </div>
    );
}
