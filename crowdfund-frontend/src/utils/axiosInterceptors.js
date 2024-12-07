import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Setup Axios Interceptor
const setupAxiosInterceptors = (setUser) => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && error.response?.data?.message === 'Token expired') {
                // Clear user from AuthContext and localStorage
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                // Redirect to login page
                const navigate = useNavigate();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
