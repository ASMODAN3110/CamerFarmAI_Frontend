// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { authService } from '@/services/authService';

interface AuthState {
  user: null | {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'advisor' | 'admin';
    language: string;
  };
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const data = await authService.login(email, password);
    set({ user: data.user, isAuthenticated: true });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const user = await authService.me();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));