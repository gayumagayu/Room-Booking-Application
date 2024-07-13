
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor to add the token to requests
axiosInstance.interceptors.request.use(
  async config => {
    // Check if token is present
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor to handle token expiration and refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh the token
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await axios.post('http://localhost:5000/api/auth/refresh-token', { token: refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        // Handle token refresh error (e.g., redirect to login)
        console.error('Refresh token error:', err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


