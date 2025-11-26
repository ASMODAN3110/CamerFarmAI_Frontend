
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 30000,
  withCredentials: true, // ← INDISPENSABLE : envoie automatiquement le cookie refreshToken
});

// Mode debug (actif en développement)
const DEBUG = import.meta.env.DEV;

// Ajout auto du Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Logs pour debug
  if (DEBUG) {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      headers: {
        ...config.headers,
        Authorization: token ? 'Bearer ***' : 'none'
      }
    });
  }
  
  return config;
});

// Refresh token automatique sur 401
api.interceptors.response.use(
  (response) => {
    // Log pour succès
    if (DEBUG) {
      console.log('✅ API Response Success:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log pour erreur
    if (DEBUG) {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        message: error.message,
        responseData: error.response?.data,
        requestData: error.config?.data
      });
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (DEBUG) {
        console.log('🔄 Token expired, attempting refresh...');
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        if (DEBUG) {
          console.log('✅ Token refreshed successfully, retrying original request');
        }

        return api(originalRequest); // retry la requête initiale
      } catch (refreshError: any) {
        // Refresh échoué → déconnexion forcée
        if (DEBUG) {
          console.error('❌ Token refresh failed:', {
            status: refreshError.response?.status,
            message: refreshError.message,
            data: refreshError.response?.data
          });
          console.log('🚪 Redirecting to login...');
        }
        
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };