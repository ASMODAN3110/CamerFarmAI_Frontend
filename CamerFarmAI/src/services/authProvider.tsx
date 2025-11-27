import { useEffect, useState } from 'react';
import { useAuthStore } from './useAuthStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loadUser = useAuthStore((s) => s.loadUser);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        console.log('🔐 Token trouvé, restauration de la session...');
        try {
          // Réinitialiser le store avant de charger pour éviter les données obsolètes
          useAuthStore.setState({ user: null, isAuthenticated: false });
          
          await loadUser();
          console.log('✅ Session restaurée avec succès');
        } catch (error) {
          console.error('❌ Erreur lors de la restauration de la session:', error);
          // Ne pas supprimer le token ici, laisser les intercepteurs gérer
          // Le token pourrait être valide mais l'API temporairement indisponible
        }
      } else {
        console.log('ℹ️ Aucun token trouvé, session non authentifiée');
        // S'assurer que le store est vide si pas de token
        useAuthStore.setState({ user: null, isAuthenticated: false });
      }
      
      setIsInitialized(true);
    };

    initializeAuth();
  }, [loadUser]);

  // Afficher un loader pendant l'initialisation pour éviter les flashs
  if (!isInitialized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Chargement...
      </div>
    );
  }

  return <>{children}</>;
};