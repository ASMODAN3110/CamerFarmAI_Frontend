import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Si true, vérifie également que le token est présent dans localStorage
   * et tente de charger l'utilisateur si nécessaire
   */
  requireToken?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireToken = true 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const loadUser = useAuthStore((s) => s.loadUser);
  const [isChecking, setIsChecking] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      // Si déjà authentifié et utilisateur chargé, pas besoin de vérifier
      if (isAuthenticated && user) {
        setIsValidating(false);
        return;
      }

      // Vérifier le token dans localStorage
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        // Pas de token, rediriger vers login
        setIsValidating(false);
        return;
      }

      // Si requireToken est activé et qu'on n'a pas d'utilisateur, essayer de charger
      if (requireToken && !user) {
        setIsChecking(true);
        try {
          await loadUser();
        } catch (error) {
          // Erreur lors du chargement, le token est probablement invalide
          console.error('❌ Erreur lors de la validation de l\'authentification:', error);
          localStorage.removeItem('accessToken');
        } finally {
          setIsChecking(false);
        }
      }

      setIsValidating(false);
    };

    validateAuth();
  }, [isAuthenticated, user, loadUser, requireToken]);

  // Afficher un loader pendant la validation
  if (isValidating || isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Vérification de l'authentification...
      </div>
    );
  }

  // Si pas authentifié, rediriger vers login avec l'URL de retour
  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  return <>{children}</>;
};

