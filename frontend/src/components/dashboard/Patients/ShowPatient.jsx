import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient';
import Loading from '../../Loading';
import Male from '../../../assets/male.png';
import { MdDelete } from 'react-icons/md';
import { FaEdit, FaEye } from 'react-icons/fa';

export default function ShowPatient() {
    const [patientInfo, setPatientInfo] = useState({});
    const [section, setSection] = useState('overview');
    const { id } = useParams();

    const fetchPatient = async () => {
        try {
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/patients/${id}`);

            if (response.status === 200) {
                setPatientInfo(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const patient = patientInfo.patient;

    return (
        <div className='p-5 min-h-screen bg-slate-800 text-white'>
            <div className='flex justify-between'>
                <h1 className='text-2xl'>Patient Details</h1>
                <div>
                <Link to='/admin/patients' className='text-blue-400 border rounded-md border-blue-400 p-2 '>Back</Link>
                <Link to={`/admin/patients/${id}/edit`} className='text-white bg-blue-400 rounded-md ml-2 p-2 '>Edit</Link>
                </div>
            </div>
            <div className='bg-slate-700 p-5 rounded-lg mt-5'>
                {patientInfo.patient ? (
                    <div className='flex gap-4 justify-between'>
                        <div>
                            <img src={Male} className='w-20' alt='Patient Avatar' />
                        </div>
                        <div>
                            <p className='text-green-500'>Patient</p>
                            <p className='text-2xl'>
                                {patient?.first_name} {patient?.last_name}
                            </p>
                            <p className='text-slate-500'>{patient?.email}</p>
                        </div>
                        <div className='border border-slate-500 rounded-lg p-4'>
                            <p className='text-blue-400 text-2xl font-bold'>{patientInfo.upcoming_appointments}</p>
                            <h2 className='text-2xl'>Upcoming Appointments</h2>
                        </div>
                        <div className='border border-slate-500 rounded-lg p-4'>
                            <p className='text-blue-400 text-2xl font-bold'>{patientInfo.completed_appointments}</p>
                            <h2 className='text-2xl'>Completed Appointments</h2>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
                <nav className='mt-5 flex gap-5'>
                    <button onClick={()=>{setSection('overview')}} className={`${section === 'overview' && 'text-blue-400 underline'}`}>Overview</button>
                    <button onClick={()=>{setSection('appointments')}} className={`${section === 'appointments' && 'text-blue-400 underline'}`}>Appointments</button>
                </nav>
            <div className='mt-5 bg-slate-700 p-5 rounded-lg'>
                {section === 'overview' ? (
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <p className='text-gray-400'>Full Name</p>
                            <h1>
                                {patient?.first_name} {patient?.last_name}
                            </h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Phone</p>
                            <h1>{patient?.phone}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Email</p>
                            <h1>{patient?.email}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Gender</p>
                            <h1>{patient?.gender}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Address</p>
                            <h1>{patient?.address}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Registered On</p>
                            <h1>{patient?.created_at.split('T')[0]}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Last Updated</p>
                            <h1>{patient?.updated_at.split('T')[0]}</h1>
                        </div>
                    </div>
                ) : (
                    <div>
                      {patientInfo.appointments ?
                      <>
                        <table className='bg-slate-900 rounded-md w-full table'>
                    <thead className='bg-slate-700'>
                        <tr>
                            <th>Doctor</th>
                            <th>Appointment At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientInfo.appointments.length > 0 ? patientInfo.appointments.map(patient => (
                            <tr key={patient.id}>
                                <td>
                                  <p>{patientInfo.doctor.first_name} {patientInfo.doctor.last_name}</p>
                                  <p className='text-xs text-gray-500'>{patientInfo.doctor.email}</p>
                                </td>
                                <td className='text-center'>
                                    <p >
                                        {patientInfo.appointments[0].appointment_date}
                                    </p>
                                </td>
                                <td><p className='bg-red-950 text-red-500 p-1 w-max rounded-md inline-block'>{patientInfo.appointments[0].status}</p></td>
                                <td>
                                    <div className='flex justify-center gap-4 p-3'>
                                    <Link to={`/admin/patients/${patient.id}`}><FaEye className='text-green-600 cursor-pointer ' /></Link>
                                    <Link to={`/admin/patients/${patient.id}/edit`}><FaEdit className='text-blue-400 cursor-pointer '/></Link>
                                    <MdDelete onClick={()=>handleDelete(patient.id)} className='text-red-600 cursor-pointer ' />
                                    </div>
                                </td>
                                
                            </tr>
                        )) :  <p className='p-2 text-center text-gray-500'>No Data Available</p>}
                    </tbody>
                </table>
                      </> :<Loading/>}
                    </div>
                )}
            </div>
        </div>
    );
}
