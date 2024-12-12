import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const setupAxiosInterceptors = (setUser) => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && error.response?.data?.message === 'Token expired') {
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                const navigate = useNavigate();
                window.location.href='/login';
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
