import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../../api/axiosClient'
import Loading from '../../Loading'
import { useAuthContext } from '../../../context/AuthContext'

export default function AddAppointment() {
    const {setMessage} = useAuthContext()
    const [formData, setFormData] = useState({});
    const [errors,setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [services, setServices] = useState([])

    const fetchDoctors = async () => {
        await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/appointments`).then((res) => {
            if (res.status === 200) {
                setDoctors(res.data.doctors)
                setLoading(false)
            }
        })
    }

    const fetchPatients = async () => {
        await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/appointments`).then((res) => {
            if (res.status === 200) {
                setPatients(res.data.patients) 
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
        fetchPatients()
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
            const res = await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/appointments`, formData);
            if (res.status === 200) {
                navigate('/admin/appointments');
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
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            {loading ? <Loading /> : <>
                <div className='flex justify-between my-5'>
                    <h1 className='text-3xl'>Add Appointment</h1>
                    <Link to='/appointments' className='p-2 text-blue-400 border border-blue-400 rounded-md'>Back</Link>
                </div>
                <div>
                    <form className='rounded-md bg-slate-700 p-10' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2'>

                        <div className='flex flex-col w-1/2'>
                            <label>Doctor:<span className='text-red-500'>*</span></label>
                            <select required name='doctor_id' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Select Doctor</option>
                                {doctors && doctors.map(doctor => (
                                    <option  value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
                                ))}
                            </select>
                            {errors.doctor_id && <p className='text-red-500'>{errors.doctor_id}</p>}
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Patient:<span className='text-red-500'>*</span></label>
                            <select required name='patient_id' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Select Patient</option>
                                {patients && patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
                                ))}
                            </select>
                            {errors.patient_id && <p className='text-red-500'>{errors.patient_id}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Service:<span className='text-red-500'>*</span></label>
                            <select required name='service_id' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Select Service</option>
                                {services && services.map(service => (
                                    <option key={service.id} value={service.id}>{service.name}</option>
                                ))}
                            </select>
                            {errors.service_id && <p className='text-red-500'>{errors.service_id}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Date:<span className='text-red-500'>*</span></label>
                            <input type='date' name='appointment_date' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange} />
                            {errors.appointment_date && <p className='text-red-500'>{errors.appointment_date}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Status:<span className='text-red-500'>*</span></label>
                            <select required name='status' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Status</option>
                                <option value='Scheduled'>Scheduled</option>
                                <option value='Completed'>Completed</option>
                                <option value='Canceled'>Canceled</option>
                            </select>
                            {errors.status && <p className='text-red-500'>{errors.status}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Amount:<span className='text-red-500'>*</span></label>
                            <input type='number' name='amount' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange} placeholder='Amount'/>
                            {errors.amount && <p className='text-red-500'>{errors.amount}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Payment Method:<span className='text-red-500'>*</span></label>
                            <select required name='payment_method' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Payment Method</option>
                                <option value='Cash'>Cash</option>
                                <option value='Credit Card'>Credit Card</option>
                            </select>
                            {errors.payment_method && <p className='text-red-500'>{errors.payment_method}</p>}

                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Payment Status:<span className='text-red-500'>*</span></label>
                            <select required name='payment_status' className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' onChange={handleChange}>
                                <option value='' disabled selected>Payment Status</option>
                                <option value='Paid'>Paid</option>
                                <option value='Pending'>Pending</option>
                            </select>
                            {errors.payment_status && <p className='text-red-500'>{errors.payment_status}</p>}

                        </div>
                        </div>
                        <button type='submit' className='bg-green-500 text-white px-4 py-2 mt-4 rounded-md'>Submit</button>
                    </form>
                </div>
            </>}
        </div>
    )
}
