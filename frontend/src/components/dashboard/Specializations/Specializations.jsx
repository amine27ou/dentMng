import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axiosClient'; 
import Loading from '../../Loading'; 
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useAuthContext } from '../../../context/AuthContext';
import { IoMdClose } from 'react-icons/io';

export default function Specializations() {
    const [loading, setLoading] = useState(false);
    const [specId, setSpecId] = useState('');
    const [addSpecData, setAddSpecData] = useState({ name: '' });
    const [updateSpecData, setUpdateSpecData] = useState({ name: '' });
    const [addFormIsOpen, setAddFormIsOpen] = useState(false);
    const [updateFormIsOpen, setUpdateFormIsOpen] = useState(false);
    const [specializations, setSpecializations] = useState([]);
    const { setMessage } = useAuthContext();

    const fetchSpecializations = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get(`${import.meta.env.VITE_BACKEND_URL}api/specializations`);
            setSpecializations(response.data.specializations); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error('Error fetching specializations:', err);
        }
    };

    useEffect(() => {
        fetchSpecializations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`${import.meta.env.VITE_BACKEND_URL}api/specializations/${id}`);
            setMessage({
                type: 'success',
                message: 'Specialization deleted successfully!'
            });
            fetchSpecializations();
        } catch (error) {
            console.error('Error deleting specialization:', error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/specializations`, addSpecData);
            setMessage({
                type: 'success',
                message: 'Specialization added successfully!'
            });
            fetchSpecializations();
            setAddFormIsOpen(false);
            setAddSpecData({ name: '' });
        } catch (error) {
            setLoading(false);
            console.error('Error adding specialization:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosClient.post(`${import.meta.env.VITE_BACKEND_URL}api/specializations/${specId}`, { ...updateSpecData, _method: 'PUT' });
            setMessage({
                type: 'success',
                message: 'Specialization updated successfully!'
            });
            fetchSpecializations();
            setUpdateFormIsOpen(false);
            setUpdateSpecData({ name: '' });
        } catch (error) {
            setLoading(false);
            console.error('Error updating specialization:', error);
        }
    };

    return (
        <div className='bg-slate-800 min-h-screen p-10 text-white'>
            <div>
                <h1 className='text-3xl'>Patients</h1>
            </div>
            <div className='mt-5'>
                <button onClick={() => setAddFormIsOpen(!addFormIsOpen)} className="bg-blue-400 text-white p-2 rounded-md">Add Specialization</button>
            </div>
            {/* Add Specialization Form */}
            {addFormIsOpen && (
                <div className='flex items-center justify-center'>
                    <div className='min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50'></div>
                    <div className='bg-slate-800 opacity-100 z-30 absolute rounded-lg p-5 h-1/3 w-1/3'>
                        <div className='flex items-center justify-between text-2xl '>
                            <h1 className='text-3xl text-white'>Add Specialization</h1>
                            <IoMdClose className='cursor-pointer' onClick={() => setAddFormIsOpen(!addFormIsOpen)} />
                        </div>
                        <hr/>
                        <div className='flex flex-col gap-5 mt-5'>
                            <input type='text' name='name' value={addSpecData.name} onChange={(e) => setAddSpecData({ ...addSpecData, name: e.target.value })} className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Specialization name'/>
                            <button onClick={handleAdd} className='bg-blue-400 p-2 text-white rounded-md'>Add specialization</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Update Specialization Form */}
            {updateFormIsOpen && (
                <div className='flex items-center justify-center'>
                    <div className='min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50'></div>
                    <div className='bg-slate-800 opacity-100 z-30 absolute rounded-lg p-5 h-1/3 w-1/3'>
                        <div className='flex items-center justify-between text-2xl '>
                            <h1 className='text-3xl text-white'>Edit Specialization</h1>
                            <IoMdClose className='cursor-pointer' onClick={() => setUpdateFormIsOpen(!updateFormIsOpen)} />
                        </div>
                        <hr/>
                        <div className='flex flex-col gap-5 mt-5'>
                            <input type='text' name='name' value={updateSpecData.name} onChange={(e) => setUpdateSpecData({ ...updateSpecData, name: e.target.value })} className='bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none' placeholder='Specialization name'/>
                            <button onClick={(e) => handleUpdate(e)} className='bg-blue-400 p-2 text-white rounded-md'>Edit specialization</button>
                        </div>
                    </div>
                </div>
            )}

            {loading ? <Loading /> : (
                <div className='p-4'>
                    <table className='bg-slate-900 w-full table'>
                        <thead className='bg-slate-700'>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specializations.length > 0 ? (
                                specializations.map((specialization) => (
                                    <tr key={specialization.id}>
                                        <td>{specialization.name}</td>
                                        <td>
                                            <div className='flex gap-4 p-3'>
                                                <button onClick={() => {setUpdateFormIsOpen(!updateFormIsOpen); setSpecId(specialization.id)}}><FaEdit className='text-blue-400 cursor-pointer '/></button>
                                                <MdDelete onClick={() => handleDelete(specialization.id)} className='text-red-600 cursor-pointer ' />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='2' className='p-3'>No Specializations Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}