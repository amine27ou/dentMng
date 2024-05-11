import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient';
import Loading from '../../Loading';
import Pagination from '../../Pagination';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/AuthContext';

export default function Doctors() {
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState({});
    const {setMessage} = useAuthContext()
    const [name, setName] = useState('');
    const baseUrl = 'http://localhost:8000/api/doctors';

    const fetchDoctors = async (url) => {
        try {
            if (name) {
                const response = await axiosClient.get(url, {
                    params: { name }
                });
                setDoctors(response.data.doctors);
                setLoading(false);
            } else {
                const response = await axiosClient.get(url);
                setDoctors(response.data.doctors);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors(baseUrl);
    }, [name]);

    const handleNext = (url) => {
        setLoading(true);
        fetchDoctors(url);
    };

    const handlePrev = (url) => {
        setLoading(true);
        fetchDoctors(url);
    };

    const clearFilters = () => {
        setName('');
    };
    const navigate = useNavigate()

    const handleDelete = async(id)=>{

        try{
            const response = await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/doctors/${id}`)
            if(response.status === 200){
                navigate('/admin/doctors')
                setMessage({
                    type: 'success',
                    message: 'Doctor deleted  successfully!',
                });
            }
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Doctors</h1>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-2'>
                <input type='text' name='name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Search' className='border border-slate-500 bg-slate-900 p-2 text-white rounded-md' />
                <button onClick={clearFilters} className='text-gray-300'>Clear Filters</button>
                </div>
                <Link to='/admin/doctors/add' className="bg-blue-400 text-white p-2 rounded-md">Add Doctor</Link>
            </div>
            {loading ? <Loading /> : <div className='p-4'>
                <table className='bg-slate-900 w-full table'>
                    <thead className='bg-slate-700'>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Registered On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors?.data?.length > 0 ? doctors.data.map(doctor => (
                            <tr key={doctor.id}>
                                <td className="p-2"><img src={`http://127.0.0.1:8000/storage/${doctor.image}`} className='w-10 h-10 rounded-full' /> </td>
                                <td>{doctor.first_name} {doctor.last_name}</td>
                                <td>{doctor.email}</td>
                                
                                <td className='text-center'>
                                    <p className={`${doctor.status.toLowerCase() === 'available' ? 'bg-green-950 text-green-500 ':'bg-red-950 text-red-500 '} p-1 w-max rounded-md inline-block'`}>
                                        {doctor.status}
                                    </p>
                                </td>
                                <td>{doctor.created_at.split('T')[0]}</td>
                                <td>
                                    <div className='flex gap-4 p-3'>
                                    <Link to={`/admin/doctors/${doctor.id}`}><FaEye className='text-green-600 cursor-pointer ' /></Link>
                                    <Link to={`/admin/doctors/${doctor.id}/edit`}><FaEdit className='text-blue-400 cursor-pointer '/></Link>
                                    <MdDelete onClick={()=>handleDelete(doctor.id)} className='text-red-600 cursor-pointer ' />
                                    </div>
                                </td>
                            </tr>
                        )) :  <Loading/>}
                    </tbody>
                </table>
            </div>}
            <Pagination handleNext={handleNext} handlePrev={handlePrev} data={doctors} />
        </div>
    )
}
