import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useAxiosInterceptors = () => {
    const { setUser } = useAuth(); // Get setUser from AuthContext
    const navigate = useNavigate(); // Get navigate function from React Router

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 && error.response?.data?.message === 'Token expired') {
                    // Clear user session and redirect to login
                    setUser(null);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/login'); // Redirect to login page
                }
                return Promise.reject(error);
            }
        );

        // Cleanup the interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [setUser, navigate]);
};

export default useAxiosInterceptors;
