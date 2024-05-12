import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { axiosClient } from '../../../api/axiosClient'
import Loading from '../../Loading'
import { useAuthContext } from '../../../context/AuthContext'
import PDFFile from '../../pdf/PDFFile'
import { FaDownload } from "react-icons/fa6";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


export default function ShowAppointment() {
  const [appointment, setAppointment] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [changes, setChanges] = useState({});
    const { setMessage } = useAuthContext();

    const fetchAppt = async () => {
        await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/appointments/${id}`).then((res) => {
            if (res.status === 200) {
                setAppointment(res.data.appointment);                
                setLoading(false);
            }
        });
    };

    const updateAppointment = async () => {
        try {
            await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/appointments/${id}`, {
                ...changes,
                _method: 'PUT',
            });
            setMessage({
                type: 'success',
                message: 'Info updated successfully!',
            });
        } catch (error) {

          setMessage({
                type: 'error',
                message: 'Failed to update appointment information!',
            });
        }
    };

    useEffect(() => {
        fetchAppt();
        if (Object.keys(changes).length > 0) {
          updateAppointment();
      }
    }, [changes,id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChanges((prevState) => ({ ...prevState, [name]: value }));
      };

  return (
    <div className='p-5 min-h-screen bg-slate-800 text-white'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>Appointments Details</h1>
                <Link to='/admin/appointments' className='p-2 border border-blue-400 text-blue-400 rounded-md'>Back</Link>
              </div>
              <div className='mt-5 bg-slate-700 p-5 rounded-lg'>
                    {loading ?<Loading/> : <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <p className='text-gray-400'>Appointment ID:</p>
                            <h1>
                                {appointment?.id}
                            </h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Appointment At</p>
                            <h1>{appointment?.appointment_date}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Status</p>
                            <select name='status' className='p-2 bg-slate-800 rounded-sm' onChange={handleChange}>
                              <option value={appointment.status} selected>{appointment.status}</option>
                              <option value='Scheduled'>Scheduled</option>
                              <option value='Completed'>Completed</option>
                              <option value='Canceled'>Canceled</option>

                            </select>
                        </div>
                        <div>
                            <p className='text-gray-400'>Patient:</p>
                            <Link className='text-blue-400' to={`/admin/patients/${appointment.patient.id}`}>{appointment.patient.first_name} {appointment.patient.last_name}</Link>
                        </div>
                        <div>
                            <p className='text-gray-400'>Doctor:</p>
                            <Link className='text-blue-400' to={`/admin/doctors/${appointment.doctor.id}`}>{appointment.doctor.first_name} {appointment.doctor.last_name}</Link>
                        </div>
                        <div>
                            <p className='text-gray-400'>Service:</p>
                            <h1>{appointment.service.name}</h1>
                        </div>
                        
                        <div>
                            <p className='text-gray-400'>Created At</p>
                            <h1>{appointment.created_at.split('T')[0]}</h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Amount:</p>
                            <h1>
                                ${appointment?.amount}.00
                            </h1>
                        </div>
                        <div>
                            <p className='text-gray-400'>Payment:</p>
                            <select name='payment_status' className='p-2 bg-slate-800 rounded-sm' onChange={handleChange}>
                              <option value={appointment.payment_status} selected>{appointment.payment_status}</option>
                              <option value='Paid'>Paid</option>
                              <option value='Pending'>Pending</option>

                            </select>
                        </div>
                        <div>
                          <PDFDownloadLink document={<PDFFile data={appointment}/>} fileName={`Appointment_${appointment.id}`} className='flex items-center  p-2  rounded-md  gap-4  cursor-pointer bg-blue-400 w-max text-white'>{({loading})=>(loading ? <AiOutlineLoading3Quarters className='animate-spin' /> :<><FaDownload /> Download</> )}</PDFDownloadLink>
                        </div>
                    </div>
                        }
  </div>

    </div>
  )
}
