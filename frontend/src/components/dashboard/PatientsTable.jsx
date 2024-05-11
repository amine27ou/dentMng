import React from 'react';

export default function PatientsTable({ data }) {

    return (
        <div className='p-4'>
            <table className='bg-slate-900 w-full table'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Unique ID</th>
                        <th>Total Appointments</th>
                        <th>Registered On</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(patient => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
