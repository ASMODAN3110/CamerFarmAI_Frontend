import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';

interface PublicRouteProps {
  children: React.ReactNode;
  /**
   * URL de redirection si l'utilisateur est déjà authentifié
   * Par défaut: '/'
   */
  redirectTo?: string;
}

/**
 * Composant pour protéger les routes publiques (login, signup)
 * Redirige les utilisateurs déjà authentifiés vers la page d'accueil
 */
export const PublicRoute = ({ 
  children, 
  redirectTo = '/' 
}: PublicRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  // Vérifier si l'utilisateur est authentifié
  // Si oui, rediriger vers la page d'accueil ou l'URL de retour
  if (isAuthenticated && user) {
    // Vérifier s'il y a une URL de retour dans les paramètres de requête
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get('returnUrl');
    
    // Si une URL de retour est présente et valide, rediriger vers celle-ci
    if (returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('/login') && !returnUrl.startsWith('/signup')) {
      return <Navigate to={returnUrl} replace />;
    }
    
    // Sinon, rediriger vers la page par défaut
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

