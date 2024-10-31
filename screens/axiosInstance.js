import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = 'your-token';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
