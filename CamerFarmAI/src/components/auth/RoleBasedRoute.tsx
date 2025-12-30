import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';
import type { UserRole } from '@/types/enums';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  /**
   * Rôles autorisés à accéder à cette route
   */
  allowedRoles: UserRole[];
  /**
   * URL de redirection si l'utilisateur n'a pas les permissions
   * Par défaut: '/'
   */
  redirectTo?: string;
  /**
   * Message à afficher si l'accès est refusé (optionnel)
   */
  accessDeniedMessage?: string;
}

/**
 * Composant pour protéger les routes basées sur les rôles utilisateur
 * Vérifie d'abord l'authentification, puis les permissions
 */
export const RoleBasedRoute = ({
  children,
  allowedRoles,
  redirectTo = '/',
  accessDeniedMessage
}: RoleBasedRouteProps) => {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // D'abord vérifier l'authentification
  if (!isAuthenticated || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  // Ensuite vérifier les permissions
  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    // Afficher un message si fourni
    if (accessDeniedMessage) {
      console.warn('🚫 Accès refusé:', accessDeniedMessage);
    }

    // Rediriger vers la page spécifiée ou la page d'accueil
    return <Navigate to={redirectTo} replace state={{ 
      from: location.pathname,
      reason: 'insufficient_permissions',
      message: accessDeniedMessage || 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.'
    }} />;
  }

  return <>{children}</>;
};

