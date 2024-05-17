import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../api/axiosClient';
import Loading from '../components/Loading';
import { useAuthContext } from '../context/AuthContext';

export default function BookApp() {
        const {setMessage,user} = useAuthContext()
        const [formData, setFormData] = useState({});
        const [errors,setErrors] = useState({})
        const [loading, setLoading] = useState(true)
        const [doctors, setDoctors] = useState([])
        const [services, setServices] = useState([])

        const fetchDoctors = async () => {
            await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/appointments`).then((res) => {
                if (res.status === 200) {
                    setDoctors(res.data.doctors)
                    setLoading(false)
                }
            })
        }
    
        const fetchServices = async () => {
            await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/appointments`).then((res) => {
                if (res.status === 200) {
                    setServices(res.data.services) 
                    setLoading(false)
                }
            })
        }
    
        useEffect(() => {
            fetchDoctors()
            fetchServices()
        }, [])

    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        const navigate = useNavigate()
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/appointments`, {...formData,patient_id:user.id});
                if (res.status === 200) {
                    navigate('/');
                    setMessage({
                        type:'success',
                        message : res.message
                    })
                }
            } catch (err) {
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }
            }
        }
  return (
    <div className=''>
        <div className='flex items-center justify-center flex-col my-20 p-5'>
            <h3 className='text-6xl font-bold'>Book Appointment</h3>
            <h3 className='text-blue-400 font-bold text-2xl mt-2'>Home / Book Appointment</h3>
        </div>
        <hr/>
        <div className='bg-gray-300'>

        <div className='bg-gray-200 min-h-screen p-10 text-black'>
            {loading ? <Loading /> : <>
                <div className='my-5'>
                    <h1 className='text-3xl'>Add Appointment</h1>
                </div>
                <div className=''>
                    <form className='rounded-md p-10' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2'>
                        <div className='flex flex-col w-1/2'>
                        <label>Patient:<span className='text-red-500'>*</span></label>
                        <input 
                            type='text'  
                            value={`${user.first_name} ${user.last_name}`} 
                            readOnly 
                            className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' 
                        />
                        <input 
                            type='hidden' 
                            name='patient_id' 
                            value={user.id} 
                        />
                    </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Doctor:<span className='text-red-500'>*</span></label>
                            <select required name='doctor_id' className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Select Doctor</option>
                                {doctors && doctors.map(doctor => (
                                    <option  value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
                                ))}
                            </select>
                            {errors.doctor_id && <p className='text-red-500'>{errors.doctor_id}</p>}
                        </div>
                                
                        <div className='flex flex-col w-1/2'>
                            <label>Service:<span className='text-red-500'>*</span></label>
                            <select required name='service_id' className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Select Service</option>
                                {services && services.map(service => (
                                    <option key={service.id} value={service.id}>{service.name}</option>
                                ))}
                            </select>
                            {errors.service_id && <p className='text-red-500'>{errors.service_id}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Date:<span className='text-red-500'>*</span></label>
                            <input type='date' name='appointment_date' className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' onChange={handleChange} />
                            {errors.appointment_date && <p className='text-red-500'>{errors.appointment_date}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Status:<span className='text-red-500'>*</span></label>
                            <select required name='status' className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Status</option>
                                <option value='Scheduled'>Scheduled</option>
                                <option value='Completed'>Completed</option>
                                <option value='Canceled'>Canceled</option>
                            </select>
                            {errors.status && <p className='text-red-500'>{errors.status}</p>}

                        </div>
                        
                        <div className='flex flex-col w-1/2'>
                            <label>Payment Method:<span className='text-red-500'>*</span></label>
                            <select required name='payment_method' className='bg-gray-300 p-2 border border-gray-400 rounded-md  outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Payment Method</option>
                                <option value='Cash'>Cash</option>
                                <option value='Credit Card'>Credit Card</option>
                            </select>
                            {errors.payment_method && <p className='text-red-500'>{errors.payment_method}</p>}

                        </div>
                        
                        </div>
                        <button type='submit' className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md'>Submit</button>
                    </form>
                </div>
            </>}
        </div>
   

        </div>
    </div>
  )
}
