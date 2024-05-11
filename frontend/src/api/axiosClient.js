import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

