import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié (token dans localStorage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      // TODO: Vérifier la validité du token et récupérer les infos utilisateur
      setAuthState({
        isAuthenticated: true,
        user: { id: '1', email: 'user@example.com' },
      });
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('accessToken', token);
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setAuthState({ isAuthenticated: false, user: null });
  };

  return {
    ...authState,
    login,
    logout,
  };
}

