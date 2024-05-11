import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { axiosClient } from "../../api/axiosClient";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import Chart from "./Chart";
import PatientsTable from "./PatientsTable";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const fetchData = async () => {
        try {
            const response = await axiosClient.get(
                `${import.meta.env.VITE_BACKEND_URL}api/dashboard`
            );
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(true);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-slate-800 p-10 min-h-screen text-white">
            <h1 className="text-white text-3xl mb-10">Dashboard</h1>
            {loading ? (
                <Loading />
            ) : (
                <div>
                <div className="flex justiy-between w-full  gap-10">
                    <div className="grid grid-cols-1 w-1/3  gap-4">
                        <div className="bg-slate-700 w-[400px] p-5 rounded-md flex gap-10 items-center  justify-between">
                            <div className="flex items-start flex-col">
                                <h1 className=" gap-5 text-2xl">
                                    Total Appointments
                                </h1>
                                <p className="text-blue-400 text-2xl font-bold">
                                    {data.total_appointments}
                                </p>
                            </div>
                            <FaCalendarDays className="text-white text-3xl" />
                        </div>
                        <div>
                            <div className="bg-slate-700 w-[400px] p-5 rounded-md flex gap-10 items-center  justify-between">
                                <div className="flex items-start flex-col">
                                    <h1 className=" gap-5 text-2xl">
                                        Upcoming Appointments
                                    </h1>
                                    <p className="text-blue-400 text-2xl font-bold">
                                        {data.upcoming_appointments}
                                    </p>
                                </div>
                                <FaCalendarDays className="text-white text-3xl" />
                            </div>
                        </div>
                        <div className="bg-slate-700 w-[400px] p-5 rounded-md flex gap-10 items-center  justify-between">
                            <div className="flex items-start flex-col">
                                <h1 className=" gap-5 text-2xl">
                                    Doctors
                                </h1>
                                <p className="text-blue-400 text-2xl font-bold">
                                    {data.doctors}
                                </p>
                            </div>
                            <FaUserDoctor className="text-white text-3xl" />
                        </div>                      
                        <div className="bg-slate-700 w-[400px] p-5 rounded-md flex gap-10 items-center  justify-between">
                            <div className="flex items-start flex-col">
                                <h1 className=" gap-5 text-2xl">
                                    Medicines
                                </h1>
                                <p className="text-blue-400 text-2xl font-bold">
                                    {data.medicines}
                                </p>
                            </div>
                            <GiMedicines className="text-white text-3xl" />
                          
                        </div>
                        </div>
                        <div className="w-2/3">
                          <Chart patients={data.patients} />
                        </div>
                </div>
                    // latest patients 
                    <PatientsTable data={data.latest_patients} />
                </div>
            )}
        </div>
    );
}
