import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosClient } from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export const AuthStateContext = createContext({});

export default function AuthContext({ children }) {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    const csrf = async () => {
        await axiosClient.get('/sanctum/csrf-cookie');
    };

    const getUser = async () => {
        try {
            const response = await axiosClient.get('api/user');
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUser(null);
                navigate('/login');
            } else {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    const login = async (formData) => {
        try {
            await csrf();
            const response = await axiosClient.post('/login', formData);
            if (response.status === 200) {
                navigate('/');
                setMessage({
                    type: 'success',
                    message: 'Logged in successfully!',
                });
                setErrors({});
                localStorage.setItem('auth-token', response.data.token);
                await getUser();
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    };

    const logout = () => {
        axiosClient.post('/logout').then(() => {
            setUser(null);
            localStorage.removeItem('auth-token');
            navigate('/login');
        });
    };

    return (
        <AuthStateContext.Provider value={{setMessage, message, login, getUser, user, errors, logout }}>
            {children}
        </AuthStateContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthStateContext);
