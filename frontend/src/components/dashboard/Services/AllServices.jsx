import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient';
import Loading from '../../Loading';
import Pagination from '../../Pagination';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/AuthContext';

export default function AllServices() {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState({});
    const {setMessage} = useAuthContext()
    const [name, setName] = useState('');
    const baseUrl = 'http://localhost:8000/api/services';

    const fetchServices = async (url) => {
        try {
            if (name) {
                const response = await axiosClient.get(url, {
                    params: { name }
                });
                setServices(response.data.services);
                setLoading(false);
            } else {
                const response = await axiosClient.get(url);
                setServices(response.data.services);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices(baseUrl);
    }, [name]);

    const handleNext = (url) => {
        setLoading(true);
        fetchServices(url);
    };

    const handlePrev = (url) => {
        setLoading(true);
        fetchServices(url);
    };

    const clearFilters = () => {
        setName('');
    };
    const navigate = useNavigate()

    const handleDelete = async(id)=>{

        try{
            const response = await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/services/${id}`)
            if(response.status === 200){
                navigate('/admin/services')
                setMessage({
                    type: 'success',
                    message: 'Service deleted  successfully!',
                });
            }
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Services</h1>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-2'>
                <input type='text' name='name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Search' className='border border-slate-500 bg-slate-900 p-2 text-white rounded-md' />
                <button onClick={clearFilters} className='text-gray-300'>Clear Filters</button>
                </div>
                <Link to='/admin/services/add' className="bg-blue-400 text-white p-2 rounded-md">Add Service</Link>
            </div>
            {loading ? <Loading /> : <div className='p-4'>
                <table className='bg-slate-900 w-full table'>
                    <thead className='bg-slate-700'>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Service Charge</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.data && services.data.map(service => (
                            <tr key={service.id}>
                                <td><td className="p-2"><img src={`http://127.0.0.1:8000/storage/${service.image}`} className='w-10 h-10 rounded-full' /> </td> </td>
                                <td>{service.name} </td>
                                <td>{service.category} </td>
                                <td>${Math.floor(service.service_charge)}.00</td>
                                <td className='text-center'>
                                <p className={service.status === 'Available' ? 'bg-green-950 text-green-500 p-1 w-max rounded-md inline-block' : 'bg-red-950 text-red-500 p-1 w-max rounded-md inline-block'}>

                                        {service.status}
                                    </p>
                                </td>
                                
                                <td>
                                    <div className='flex gap-4 p-3'>
                                    <Link to={`/admin/services/${service.id}/edit`}><FaEdit className='text-blue-400 cursor-pointer '/></Link>
                                    <MdDelete onClick={()=>handleDelete(service.id)} className='text-red-600 cursor-pointer ' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <Pagination handleNext={handleNext} handlePrev={handlePrev} data={services} />
        </div>
    )
}
