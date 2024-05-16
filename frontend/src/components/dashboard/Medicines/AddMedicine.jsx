import React, { useState } from 'react';
import { axiosClient } from '../../../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthContext } from '../../../context/AuthContext';

export default function AddMedicine() {
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const {setMessage} = useAuthContext()
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      quantity: '',
      selling_price:'',
      buying_price:'',
      status: '',
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/medicines`,formData);
        if (response.status === 200) {
            setLoading(false)
            navigate('/admin/medicines')
            setMessage({
                type:'success',
                message:'Medicine created successfully!'
            })
        }

      } catch (error) {
        setLoading(false)
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
      }
    } 
};


const handleChange = (e)=>{
      const {value,name} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <div className='p-4 bg-slate-800 min-h-screen text-white'>
            <div className='flex justify-between items-center'>
              <h1>Add Medicine</h1>
              <Link to='/admin/medicines' className='p-2 text-white bg-blue-400 rounded-md' >Back</Link>
            </div>
            <form onSubmit={handleSubmit} className='bg-slate-700 p-5 rounded-lg mt-5'>
            <div className='grid grid-cols-2'>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="name" className='block'>Name:<span className='text-red-500'>*</span></label>
                        <input type="text" id="name" name="name" value={formData.first_name} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Medicine Name' />
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="category" className='block'>Category:<span className='text-red-500'>*</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none'>
                        <option value='' disabled>Select Medicine Category</option>
                        <option value='tablets'>Tablets</option>
                        <option value='capsules'>Capsules</option>
                        <option value='syrups'>Syrups</option>
                        <option value='injections'>Injections</option>
                    </select>
                        {errors.category && <span className="text-red-500">{errors.category}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="quantity" className='block'>Quantity:<span className='text-red-500'>*</span></label>
                        <input type="number" min={0} id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Quantity' />
                        {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
                    </div>
                    <div className='w-full lg:w-1/2 px-3 mb-6'>
                    <label htmlFor="status" className='block'>Status:<span className='text-red-500'>*</span></label>
                    <select name="status" value={formData.status} onChange={handleChange} className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none'>
                        <option value='' disabled>Select Status</option>
                        <option value='Available'>Available</option>
                        <option value='Not Available'>Not Available</option>
                    </select>
                    {errors.status && <span className="text-red-500">{errors.status}</span>}
                </div>

                <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="selling_price" className='block'>Selling Price:<span className='text-red-500'>*</span></label>
                        <input type="number" min={0} id="selling_price" name="selling_price" value={formData.selling_price} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Selling Price' />
                        {errors.selling_price && <span className="text-red-500">{errors.selling_price}</span>}
                    </div>
                <div className='w-full lg:w-1/2 px-3 mb-6'>
                        <label htmlFor="buying_price" className='block'>Buying Price:<span className='text-red-500'>*</span></label>
                        <input type="number" min={0} id="buying_price" name="buying_price" value={formData.buying_price} onChange={handleChange} required className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Buying Price' />
                        {errors.buying_price && <span className="text-red-500">{errors.buying_price}</span>}
                    </div>
                    </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mt-3'>{loading ? <AiOutlineLoading3Quarters className='text-white animate-spin' /> : 'Register'}</button>
                <button onClick={()=>setFormData({})} className='bg-gray-500 hover:bg-gray-400 text-white  py-2 px-4 rounded m-3'>Discard</button>
            </form>
        </div>
    );
}
