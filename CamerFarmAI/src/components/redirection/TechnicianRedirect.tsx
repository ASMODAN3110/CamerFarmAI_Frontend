import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';

export const TechnicianRedirect = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'technician') {
      const allowedPaths = ['/', '/login', '/technicien'];
      const currentPath = window.location.pathname;

      const isAllowed = allowedPaths.some((path) =>
        currentPath === path || currentPath.startsWith(path + '/')
      );

      if (!isAllowed) {
        navigate('/technicien', { replace: true });
      }
    }
  }, [user, isAuthenticated, navigate]);

  return null; // Ce composant n'affiche rien
};