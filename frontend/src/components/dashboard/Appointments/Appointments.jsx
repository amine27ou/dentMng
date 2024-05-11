import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient';
import Loading from '../../Loading';
import Pagination from '../../Pagination';
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/AuthContext';


export default function Appointments() {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState({});
    const {setMessage} = useAuthContext()
    const [filters, setFilters] = useState('');
    const baseUrl = 'http://localhost:8000/api/appointments';

    const fetchAppointments = async (url) => {
        try {
            if (filters) {
                const response = await axiosClient.get(url, {
                    params: { app_status:filters }
                });
                setAppointments(response.data.appointments);
                setLoading(false);
            } else {
                const response = await axiosClient.get(url);
                setAppointments(response.data.appointments);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(baseUrl);
    }, [filters]);

    const handleNext = (url) => {
        setLoading(true);
        fetchAppointments(url);
    };

    const handlePrev = (url) => {
        setLoading(true);
        fetchAppointments(url);
    };

    const clearFilters = () => {
        setFilters('');
    };
    const navigate = useNavigate()

    const handleDelete = async(id)=>{

        try{
            const response = await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/appointments/${id}`)
            if(response.status === 200){
                navigate('/admin/appointments')
                setMessage({
                    type: 'success',
                    message: 'Appointment deleted  successfully!',
                });
            }
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Appointments</h1>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-2'>
                <select className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' name='app_status' onChange={(e)=>{setFilters(e.target.value)}}>
                    <option value=''>STATUS</option>
                    <option value='Scheduled'>Scheduled</option>
                    <option value='Completed'>Completed</option>
                    <option value='Canceled'>Canceled</option>
                </select>
                
                <button onClick={clearFilters} className='text-gray-300'>Clear Filters</button>
                </div>
                <Link to='/admin/appointments/create' className="bg-blue-400 text-white p-2 rounded-md">Add Appointment</Link>
            </div>
            {loading ? <Loading /> : <div className='p-4'>
                <table className='bg-slate-900 w-full table'>
                    <thead className='bg-slate-700'>
                        <tr className='w-full'>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Appointments At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.data && appointments.data.map(appointment => (
                            <tr key={appointment.id}>
                                <td>
                                    <div className='flex items-center gap-2'>
                                    <img src={appointment?.doctor?.image?.includes('http') ? appointment?.doctor?.image : `http://127.0.0.1:8000/storage/${appointment?.doctor?.image}`} className='w-10 h-10 rounded-full' />

                                    <div>
                                        <p>{appointment?.doctor?.first_name} {appointment?.doctor?.last_name}</p>
                                        <p className='text-slate-500'>{appointment?.doctor?.email}</p>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <p>{appointment?.patient?.first_name} {appointment?.patient?.last_name}</p>
                                        <p className='text-slate-500'>{appointment?.patient?.email}</p>
                                    </div>
                                    </div>
                                </td>
                                
                                <td>{appointment.appointment_date}</td>
                                <td>
                                    <div className='flex gap-4 p-3'>
                                    <Link to={`/admin/appointments/${appointment.id}`}><FaEye className='text-green-600 cursor-pointer ' /></Link>
                                    <button ><FaDownload className='text-blue-500 cursor-pointer ' /></button>
                                    <MdDelete onClick={()=>handleDelete(appointment.id)} className='text-red-600 cursor-pointer ' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <Pagination handleNext={handleNext} handlePrev={handlePrev} data={appointments} />
        </div>
    )
}
