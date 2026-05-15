import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true 
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        
        if (
            error.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') && 
            !originalRequest.url.includes('/auth/refresh')   
        ) {
            originalRequest._retry = true;
            try {
                // Backend call to refresh tokens using the refresh cookie
                await axios.post('http://localhost:3000/api/auth/refresh', {}, { withCredentials: true });
                return api(originalRequest);
            } catch (refreshError) {
                
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;