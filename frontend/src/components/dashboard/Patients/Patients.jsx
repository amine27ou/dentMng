import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient';
import Loading from '../../Loading';
import Pagination from '../../Pagination';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/AuthContext';

export default function Patients() {
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState({});
    const {setMessage} = useAuthContext()
    const [name, setName] = useState('');
    const baseUrl = 'http://localhost:8000/api/patients';

    const fetchPatients = async (url) => {
        try {
            if (name) {
                const response = await axiosClient.get(url, {
                    params: { name }
                });
                setPatients(response.data.patients);
                setLoading(false);
            } else {
                const response = await axiosClient.get(url);
                setPatients(response.data.patients);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients(baseUrl);
    }, [name]);

    const handleNext = (url) => {
        setLoading(true);
        fetchPatients(url);
    };

    const handlePrev = (url) => {
        setLoading(true);
        fetchPatients(url);
    };

    const clearFilters = () => {
        setName('');
    };
    const navigate = useNavigate()

    const handleDelete = async(id)=>{

        try{
            const response = await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`)
            if(response.status === 200){
                navigate('/admin/patients')
                setMessage({
                    type: 'success',
                    message: 'Patient deleted  successfully!',
                });
            }
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Patients</h1>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-2'>
                <input type='text' name='name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Search' className='border border-slate-500 bg-slate-900 p-2 text-white rounded-md' />
                <button onClick={clearFilters} className='text-gray-300'>Clear Filters</button>
                </div>
                <Link to='/admin/patients/add' className="bg-blue-400 text-white p-2 rounded-md">Add Patient</Link>
            </div>
            {loading ? <Loading /> : <div className='p-4'>
                <table className='bg-slate-900 w-full table'>
                    <thead className='bg-slate-700'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Unique ID</th>
                            <th>Total Appointments</th>
                            <th>Registered On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.data && patients.data.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.first_name} {patient.last_name}</td>
                                <td>{patient.email}</td>
                                <td className='text-center'>
                                    <p className='bg-green-950 text-green-500 p-1 w-max rounded-md inline-block'>
                                        {patient.unique_id}
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <p className='bg-red-950 text-red-500 p-1 w-max rounded-md inline-block'>
                                        {patient.appointments_count}
                                    </p>
                                </td>
                                <td>{patient.created_at.split('T')[0]}</td>
                                <td>
                                    <div className='flex gap-4 p-3'>
                                    <Link to={`/admin/patients/${patient.id}`}><FaEye className='text-green-600 cursor-pointer ' /></Link>
                                    <Link to={`/admin/patients/${patient.id}/edit`}><FaEdit className='text-blue-400 cursor-pointer '/></Link>
                                    <MdDelete onClick={()=>handleDelete(patient.id)} className='text-red-600 cursor-pointer ' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <Pagination handleNext={handleNext} handlePrev={handlePrev} data={patients} />
        </div>
    )
}
