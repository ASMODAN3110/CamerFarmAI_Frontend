import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';
import {useAuth} from '@/contexts/AuthContext';

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



// import { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '@/services/useAuthStore';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   /**
//    * Liste des rôles autorisés pour cette route
//    * Ex: ['technician'], ['farmer', 'admin'], etc.
//    */
//   roles: string[];
//   /**
//    * Si true, force la vérification du token dans localStorage au montage
//    */
//   requireAuthCheck?: boolean;
// }

// export const ProtectedRoute = ({
//   children,
//   roles,
//   requireAuthCheck = true,
// }: ProtectedRouteProps) => {
//   const location = useLocation();

//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const user = useAuthStore((state) => state.user);
//   const loadUser = useAuthStore((state) => state.loadUser);

//   const [isValidating, setIsValidating] = useState(true);
//   const [isCheckingToken, setIsCheckingToken] = useState(false);

//   useEffect(() => {
//     const validateAuth = async () => {
//       // Si déjà authentifié avec rôle chargé → OK
//       if (isAuthenticated && user && roles.includes(user.role)) {
//         setIsValidating(false);
//         return;
//       }

//       // Si on ne demande pas de vérification explicite → on accepte l'état actuel
//       if (!requireAuthCheck) {
//         setIsValidating(false);
//         return;
//       }

//       // Vérification du token dans localStorage
//       const token = localStorage.getItem('accessToken');

//       if (!token) {
//         setIsValidating(false);
//         return;
//       }

//       // Si pas d'utilisateur chargé, on essaie de le récupérer
//       if (!user) {
//         setIsCheckingToken(true);
//         try {
//           await loadUser();
//         } catch (error) {
//           console.error('Erreur lors du chargement de l\'utilisateur:', error);
//           localStorage.removeItem('accessToken');
//         } finally {
//           setIsCheckingToken(false);
//         }
//       }

//       setIsValidating(false);
//     };

//     validateAuth();
//   }, [isAuthenticated, user, loadUser, roles, requireAuthCheck]);

//   // Loader pendant validation
//   if (isValidating || isCheckingToken) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           fontSize: '1.2rem',
//           color: '#666',
//           backgroundColor: '#f9fafb',
//         }}
//       >
//         Vérification de l'authentification...
//       </div>
//     );
//   }

//   // Pas authentifié → login avec returnUrl
//   if (!isAuthenticated || !user) {
//     const returnUrl = encodeURIComponent(location.pathname + location.search);
//     return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
//   }

//   // Authentifié mais rôle non autorisé → page unauthorized ou accueil
//   if (!roles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Tout est OK → affichage du contenu
//   return <>{children}</>;
// };