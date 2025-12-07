// src/services/authService.ts
import { api } from './api';

export interface LoginResponse {
  accessToken?: string;
  requires2FA?: boolean;
  temporaryToken?: string;
  user?: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'advisor' | 'admin';
    language: string;
  };
  // Le backend peut aussi retourner {success: true, data: {...}}
  data?: {
    requires2FA?: boolean;
    temporaryToken?: string;
    user?: {
      id: string;
      phone: string;
      firstName: string;
      lastName: string;
      role: 'farmer' | 'advisor' | 'admin';
      language: string;
    };
    accessToken?: string;
  };
}

export interface TwoFactorSecretResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: 'farmer' | 'advisor' | 'admin';
  language: string;
  email?: string;
  avatarUrl?: string | null;
  twoFactorEnabled?: boolean;
}

export const authService = {
  register: (data: { phone: string; password: string; firstName?: string; lastName?: string; email?: string; language?: string }) =>
    api.post('/auth/register', data),

  login: (email: string, password: string): Promise<LoginResponse> => {
    // Normaliser l'email (trim et lowercase)
    const normalizedEmail = email.trim().toLowerCase();
    
    return api.post('/auth/login', { email: normalizedEmail, password }).then((res) => {
      console.log('🔐 Réponse complète de /auth/login:', res.data);
      
      const responseData = res.data.data || res.data;
      
      // Si 2FA est requis, retourner les informations nécessaires
      if (responseData.requires2FA) {
        console.log('🔐 2FA requis, temporaryToken reçu');
        return {
          requires2FA: true,
          temporaryToken: responseData.temporaryToken,
        };
      }
      
      // Extraire le token (peut être dans res.data.accessToken ou res.data.data.accessToken)
      const accessToken = responseData.accessToken || res.data.accessToken;
      
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('✅ Token sauvegardé dans localStorage');
      } else {
        console.warn('⚠️ Aucun token trouvé dans la réponse de login');
      }
      
      return {
        accessToken,
        user: responseData.user,
      };
    });
  },

  verifyTwoFactorLogin: (temporaryToken: string, twoFactorCode: string): Promise<LoginResponse> => {
    return api.post('/auth/login/verify-2fa', {
      temporaryToken,
      twoFactorCode,
    }).then((res) => {
      console.log('🔐 Réponse complète de /auth/login/verify-2fa:', res.data);
      
      const responseData = res.data.data || res.data;
      const accessToken = responseData.accessToken || res.data.accessToken;
      
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('✅ Token sauvegardé dans localStorage après vérification 2FA');
      }
      
      return {
        accessToken,
        user: responseData.user,
      };
    });
  },

  generateTwoFactorSecret: (): Promise<TwoFactorSecretResponse> => {
    return api.get('/auth/2fa/generate').then((res) => {
      const responseData = res.data.data || res.data;
      return {
        secret: responseData.secret,
        qrCodeUrl: responseData.qrCodeUrl,
      };
    });
  },

  enableTwoFactor: (token: string): Promise<void> => {
    return api.post('/auth/2fa/enable', { token }).then(() => {
      console.log('✅ 2FA activé avec succès');
    });
  },

  disableTwoFactor: (token: string): Promise<void> => {
    return api.post('/auth/2fa/disable', { token }).then(() => {
      console.log('✅ 2FA désactivé avec succès');
    });
  },

  logout: async () => {
    try {
      // Essayer de notifier le backend de la déconnexion
      await api.post('/auth/logout');
    } catch (error) {
      // Même si le backend échoue, on déconnecte côté client
      console.warn('⚠️ Erreur lors de la déconnexion côté serveur, déconnexion locale effectuée');
    } finally {
      // Toujours supprimer le token et rediriger, même si l'API échoue
      localStorage.removeItem('accessToken');
      console.log('🚪 Session fermée, redirection vers la page de connexion');
      window.location.href = '/login';
    }
  },

  me: () => {
    // Vérifier le token avant de faire la requête
    const token = localStorage.getItem('accessToken');
    console.log('🔑 Token utilisé pour /auth/me:', token ? `Token présent (${token.substring(0, 20)}...)` : 'AUCUN TOKEN!');
    
    return api.get('/auth/me').then(res => {
      console.log('🔍 Réponse complète de /auth/me:', res.data);
      
      // Le backend retourne {success: true, data: {...}}
      // On doit accéder à res.data.data pour obtenir les vraies données
      const userData = res.data.data || res.data.user || res.data;
      
      console.log('📦 Données utilisateur extraites:', userData);
      console.log('👤 ID utilisateur dans /auth/me:', userData?.id || userData?._id);
      console.log('👤 Rôle utilisateur dans /auth/me:', userData?.role);
      
      // Normaliser les noms de propriétés (snake_case -> camelCase)
      if (userData && typeof userData === 'object') {
        const normalized: User = {
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
        console.log('🔄 Données normalisées:', normalized);
        console.log('✅ ID final normalisé:', normalized.id, 'Rôle:', normalized.role, '2FA:', normalized.twoFactorEnabled);
        return normalized;
      }
      
      console.warn('⚠️ Format de données inattendu:', userData);
      return userData;
    });
  }, // retourne user + role

  updateProfile: (data: { firstName?: string; lastName?: string; phone?: string; language?: string }) =>
    api.put('/auth/profile', data).then(res => {
      console.log('✅ Réponse de updateProfile:', res.data);
      // Le backend retourne {success: true, data: {...}} ou { user: {...} } ou directement {...}
      const updatedUser = res.data.data || res.data.user || res.data;
      
      console.log('📦 Données utilisateur extraites après update:', updatedUser);
      
      // Si le backend retourne les données utilisateur mises à jour, les normaliser
      if (updatedUser && typeof updatedUser === 'object') {
        const normalized = {
          id: updatedUser.id || updatedUser._id || '',
          firstName: updatedUser.firstName || updatedUser.first_name || '',
          lastName: updatedUser.lastName || updatedUser.last_name || '',
          phone: updatedUser.phone || '',
          role: updatedUser.role || 'farmer',
          language: updatedUser.language || 'fr',
          email: updatedUser.email || '',
          avatarUrl: updatedUser.avatarUrl || updatedUser.avatar_url || null,
        };
        console.log('🔄 Données normalisées après update:', normalized);
        return normalized;
      }
      
      return updatedUser;
    }),

  uploadProfilePicture: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/auth/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  },
};