import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient'; 
import Loading from '../../Loading'; 
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useAuthContext } from '../../../context/AuthContext';
import { IoMdClose } from 'react-icons/io';

export default function Medicines() {
    const [loading, setLoading] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const { setMessage } = useAuthContext();

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/medicines`);
            setMedicines(response.data.medicines); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error('Error fetching medicines:', err);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/medicines/${id}`);
            setMessage({
                type: 'success',
                message: 'Specialization deleted successfully!'
            });
            fetchMedicines();
        } catch (error) {
            console.error('Error deleting specialization:', error);
        }
    };

    

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Medicines</h1>
            </div>
            <div className='mt-5'>
                <Link to='/admin/medicines/add' className="bg-blue-400 text-white p-2 rounded-md">Add Medicine</Link>
            </div>
            
            {loading ? <Loading /> : (
                <div className='p-4'>
                    <table className='bg-slate-900 w-full table'>
                        <thead className='bg-slate-700'>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Selling Price</th>
                                <th>Buying Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.length > 0 ? (
                                medicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.category}</td>
                                        <td>{medicine.quantity} PCS</td>
                                        <td>${medicine.selling_price}.00</td>
                                        <td>${medicine.buying_price}.00</td>
                                        <td><p className={`${medicine.status.toLowerCase() === 'available' ? 'bg-green-950 text-green-500 ':'bg-red-950 text-red-500 '} p-1 w-max rounded-md inline-block'`}>
                                        {medicine.status}
                                    </p></td>
                                        <td>
                                            <div className='flex gap-4 p-3'>
                                                <Link to={`/admin/medicines/${medicine.id}/edit`}><FaEdit className='text-blue-400 cursor-pointer '/></Link>
                                                <MdDelete onClick={() => handleDelete(medicine.id)} className='text-red-600 cursor-pointer ' />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='2' className='p-3'>No Medicines Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}