// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { authService } from '@/services/authService';

interface AuthState {
  user: null | {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'technician' | 'admin';
    language: string;
    email?: string;
    avatarUrl?: string | null;
    twoFactorEnabled?: boolean;
  };
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ requires2FA?: boolean; temporaryToken?: string } | void>;
  verifyTwoFactor: (temporaryToken: string, twoFactorCode: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateAvatarUrl: (avatarUrl: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    // IMPORTANT: Réinitialiser le store AVANT la connexion pour éviter les données obsolètes
    console.log('🔄 Réinitialisation du store avant connexion...');
    set({ user: null, isAuthenticated: false });
    
    const data = await authService.login(email, password);
    console.log('🔐 Données de connexion reçues:', data);
    
    // Si 2FA est requis, retourner les informations nécessaires
    if (data.requires2FA && data.temporaryToken) {
      console.log('🔐 2FA requis, retour des informations pour la vérification');
      return {
        requires2FA: true,
        temporaryToken: data.temporaryToken,
      };
    }
    
    // Vérifier que le token est bien sauvegardé
    const savedToken = localStorage.getItem('accessToken');
    if (!savedToken) {
      console.error('❌ ERREUR: Token non sauvegardé après login!');
      throw new Error('Token non sauvegardé après connexion');
    }
    console.log('✅ Token vérifié dans localStorage après login');
    
    // Normaliser les données utilisateur de la réponse de login
    // Le backend peut retourner {user: {...}} ou {data: {user: {...}}}
    let userData: any = data.user || data.data?.user || data.data;
    
    // Si les données ne sont pas normalisées, les normaliser
    if (userData && typeof userData === 'object' && !('accessToken' in userData)) {
      const normalized = {
        id: userData.id || userData._id || '',
        firstName: userData.firstName || userData.first_name || '',
        lastName: userData.lastName || userData.last_name || '',
        phone: userData.phone || '',
        role: userData.role || 'farmer',
        language: userData.language || 'fr',
        email: userData.email || '',
        avatarUrl: userData.avatarUrl || userData.avatar_url || null,
      };
      console.log('🔄 Données utilisateur normalisées après login:', normalized);
      console.log('👤 ID utilisateur connecté:', normalized.id);
      console.log('👤 Rôle utilisateur connecté:', normalized.role);
      
      // Mettre à jour temporairement le store avec les données de login
      set({ user: normalized, isAuthenticated: true });
      
      // Recharger les données depuis le serveur pour s'assurer d'avoir les bonnes données
      // Cela garantit que même si la réponse de login est incorrecte, on charge les bonnes données
      try {
        console.log('🔄 Rechargement des données depuis /auth/me après connexion...');
        console.log('🔑 Token utilisé pour /auth/me:', savedToken ? 'Token présent' : 'AUCUN TOKEN!');
        
        const loadUserFn = useAuthStore.getState().loadUser;
        await loadUserFn();
        
        // Vérifier que les données chargées correspondent à l'utilisateur qui s'est connecté
        const finalUser = useAuthStore.getState().user;
        if (finalUser) {
          console.log('✅ Données finales chargées - ID:', finalUser.id, 'Rôle:', finalUser.role);
          if (finalUser.id !== normalized.id) {
            console.error('❌ ERREUR CRITIQUE: Les données chargées ne correspondent pas à l\'utilisateur connecté!');
            console.error('   ID attendu (depuis login):', normalized.id, 'Rôle:', normalized.role);
            console.error('   ID reçu (depuis /auth/me):', finalUser.id, 'Rôle:', finalUser.role);
            console.error('   ⚠️ PROBLÈME BACKEND: Le token généré est associé au mauvais utilisateur!');
            
            // PROBLÈME BACKEND: Le token est associé au mauvais utilisateur
            // On garde les données de login qui sont correctes
            console.log('🔄 Restauration des données de login correctes...');
            set({ user: normalized, isAuthenticated: true });
            
            // Afficher une alerte à l'utilisateur
            alert(
              `⚠️ Problème d'authentification détecté!\n\n` +
              `Vous vous êtes connecté en tant que: ${normalized.firstName} ${normalized.lastName} (${normalized.role})\n` +
              `Mais le serveur retourne les données d'un autre utilisateur.\n\n` +
              `Veuillez contacter l'administrateur. Le problème vient du backend.`
            );
          }
        }
      } catch (error) {
        console.warn('⚠️ Erreur lors du rechargement après login, utilisation des données de login');
      }
    } else {
      // Si pas de données utilisateur dans la réponse, charger depuis le serveur
      console.log('⚠️ Pas de données utilisateur dans la réponse de login, chargement depuis /auth/me...');
      const loadUserFn = useAuthStore.getState().loadUser;
      await loadUserFn();
    }
  },

  verifyTwoFactor: async (temporaryToken, twoFactorCode) => {
    console.log('🔐 Vérification du code 2FA...');
    const data = await authService.verifyTwoFactorLogin(temporaryToken, twoFactorCode);
    console.log('🔐 Données de vérification 2FA reçues:', data);
    
    // Vérifier que le token est bien sauvegardé
    const savedToken = localStorage.getItem('accessToken');
    if (!savedToken) {
      console.error('❌ ERREUR: Token non sauvegardé après vérification 2FA!');
      throw new Error('Token non sauvegardé après vérification 2FA');
    }
    console.log('✅ Token vérifié dans localStorage après vérification 2FA');
    
    // Normaliser les données utilisateur
    let userData: any = data.user || data.data?.user || data.data;
    
    if (userData && typeof userData === 'object' && !('accessToken' in userData)) {
      const normalized = {
        id: userData.id || userData._id || '',
        firstName: userData.firstName || userData.first_name || '',
        lastName: userData.lastName || userData.last_name || '',
        phone: userData.phone || '',
        role: userData.role || 'farmer',
        language: userData.language || 'fr',
        email: userData.email || '',
        avatarUrl: userData.avatarUrl || userData.avatar_url || null,
        twoFactorEnabled: userData.twoFactorEnabled || userData.two_factor_enabled || false,
      };
      console.log('🔄 Données utilisateur normalisées après vérification 2FA:', normalized);
      
      set({ user: normalized, isAuthenticated: true });
      
      // Recharger les données depuis le serveur
      try {
        const loadUserFn = useAuthStore.getState().loadUser;
        await loadUserFn();
      } catch (error) {
        console.warn('⚠️ Erreur lors du rechargement après vérification 2FA');
      }
    } else {
      const loadUserFn = useAuthStore.getState().loadUser;
      await loadUserFn();
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const user = await authService.me();
      console.log('✅ Données reçues de /auth/me:', user);
      
      // Vérifier que les données sont valides avant de les mettre dans le store
      if (user && user.id) {
        // Comparer avec l'utilisateur actuel pour éviter les mises à jour inutiles
        const currentUser = useAuthStore.getState().user;
        if (currentUser && currentUser.id === user.id) {
          // Même utilisateur, mettre à jour seulement si les données ont changé
          set({ user, isAuthenticated: true });
          console.log('✅ Store mis à jour avec les données utilisateur ID:', user.id);
        } else {
          // Nouvel utilisateur ou pas d'utilisateur actuel, mettre à jour directement
          set({ user, isAuthenticated: true });
          console.log('✅ Store mis à jour avec les données utilisateur ID:', user.id);
        }
      } else {
        console.error('❌ Données utilisateur invalides reçues:', user);
        // Ne pas réinitialiser si on a déjà un utilisateur valide
        const currentUser = useAuthStore.getState().user;
        if (!currentUser) {
          set({ user: null, isAuthenticated: false });
        }
      }
    } catch (error: any) {
      console.error('❌ Erreur lors du chargement de l\'utilisateur:', error);
      
      // Ne supprimer le token que si c'est une erreur d'authentification réelle
      // (401 Unauthorized ou 403 Forbidden)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log('🚪 Erreur d\'authentification, suppression du token');
        localStorage.removeItem('accessToken');
        set({ user: null, isAuthenticated: false });
      } else {
        // Pour les autres erreurs (réseau, serveur, etc.), garder le token
        // L'utilisateur pourra réessayer plus tard
        console.log('⚠️ Erreur non-authentification, conservation du token');
        // Ne pas changer l'état d'authentification si on avait déjà un utilisateur
        // Cela évite de déconnecter l'utilisateur en cas d'erreur réseau temporaire
      }
    }
  },

  updateAvatarUrl: (avatarUrl: string) => {
    const currentUser = useAuthStore.getState().user;
    if (currentUser) {
      set({
        user: {
          ...currentUser,
          avatarUrl,
        },
      });
      console.log('✅ Avatar URL mise à jour dans le store:', avatarUrl);
    }
  },
}));