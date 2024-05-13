import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuthContext } from '../../../context/AuthContext';
import Loading from '../../Loading';

export default function UpdateService() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAuthContext();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: '',
    status: '',
    service_charge: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosClient.post(
        `${import.meta.env.VITE_BACKEND_URL}api/services/${id}`,
        {...formData,_method:'PUT'},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        navigate('/admin/services');
        setMessage({
          type: 'success',
          message: 'Service created successfully!',
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const fetchService = async () => {
    try {
      const res = await axiosClient.get(
        `${import.meta.env.VITE_BACKEND_URL}api/services/${id}`
      );
      const serviceData = res.data.service;
      setFormData({ 
        name: serviceData.name || '',
        category: serviceData.category || '',
        status: serviceData.status || '',
        service_charge: serviceData.service_charge || '',
      });
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { value, name, files, type } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <div className="p-4 bg-slate-800 min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit Service</h1>
        <Link to="/admin/services" className="p-2 text-white bg-blue-400 rounded-md">
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-slate-700 p-5 rounded-lg mt-5">
        {Object.values(formData).some((value) => value === '') ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2">
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <label htmlFor="name" className="block">
                  Name:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none"
                  placeholder="Service Name"
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <label htmlFor="category" className="block">
                  Category:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none"
                  placeholder="Category"
                />
                {errors.category && <span className="text-red-500">{errors.category}</span>}
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <label htmlFor="service_charge" className="block">
                  Service Charge:<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  id="service_charge"
                  name="service_charge"
                  value={formData.service_charge}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none"
                  placeholder="Service Charge"
                />
                {errors.service_charge && (
                  <span className="text-red-500">{errors.service_charge}</span>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <label htmlFor="status" className="block">
                  Status:<span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                {errors.status && <span className="text-red-500">{errors.status}</span>}
              </div>
              <div className="w-full lg:w-1/2 px-3 mb-6">
                <label htmlFor="image" className="block">
                  Image:<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="bg-slate-800 p-2 border border-slate-600 rounded-md text-white outline-none"
                  placeholder="Image"
                />
                {errors.image && <span className="text-red-500">{errors.image}</span>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-3"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
              ) : (
                'Update'
              )}
            </button>
            <button
              onClick={() => setFormData({})}
              className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded m-3"
            >
              Discard
            </button>
          </>
        )}
      </form>
    </div>
  );
}
