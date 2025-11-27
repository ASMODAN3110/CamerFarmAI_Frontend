
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 30000,
  withCredentials: true, // ← INDISPENSABLE : envoie automatiquement le cookie refreshToken
});

// Mode debug (actif en développement)
const DEBUG = import.meta.env.DEV;

// Variable pour suivre si un refresh est en cours
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

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
      if (isRefreshing) {
        // Si un refresh est déjà en cours, mettre la requête en queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      if (DEBUG) {
        console.log('🔄 Token expired, attempting refresh...');
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = data.accessToken || data.data?.accessToken;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        if (DEBUG) {
          console.log('✅ Token refreshed successfully, retrying original request');
        }

        processQueue(null, newToken);
        isRefreshing = false;

        return api(originalRequest); // retry la requête initiale
      } catch (refreshError: any) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // Refresh échoué → déconnexion forcée uniquement si c'est une erreur d'authentification
        if (DEBUG) {
          console.error('❌ Token refresh failed:', {
            status: refreshError.response?.status,
            message: refreshError.message,
            data: refreshError.response?.data
          });
        }
        
        // Ne déconnecter que si c'est une erreur d'authentification (401, 403)
        // Pour les erreurs réseau, on peut laisser l'utilisateur réessayer
        if (refreshError?.response?.status === 401 || refreshError?.response?.status === 403) {
          if (DEBUG) {
            console.log('🚪 Erreur d\'authentification, déconnexion forcée');
          }
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        } else {
          if (DEBUG) {
            console.log('⚠️ Erreur non-authentification lors du refresh, conservation de la session');
          }
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };