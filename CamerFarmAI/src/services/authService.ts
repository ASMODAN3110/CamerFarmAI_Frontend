// src/services/authService.ts
import { api } from './api';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'advisor' | 'admin';
    language: string;
  };
}

export const authService = {
  register: (data: { phone: string; password: string; firstName?: string; lastName?: string; email?: string; language?: string }) =>
    api.post('/auth/register', data),

  login: (email: string, password: string): Promise<LoginResponse> => {
    // Normaliser l'email (trim et lowercase)
    const normalizedEmail = email.trim().toLowerCase();
    
    return api.post('/auth/login', { email: normalizedEmail, password }).then((res) => {
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data;
    });
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  },

  me: () => api.get('/auth/me').then(res => res.data), // retourne user + role
};