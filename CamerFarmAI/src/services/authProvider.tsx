import { useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      loadUser();
    }
  }, [loadUser]);

  return <>{children}</>;
};