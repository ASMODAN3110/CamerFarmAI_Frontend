// src/services/authService.ts
import { api } from './api';
import type { UserRole } from '@/types/enums';
import type { RegisterDto, LoginDto, UpdateProfileDto } from '@/types/dto';

export interface LoginResponse {
  accessToken?: string;
  requires2FA?: boolean;
  temporaryToken?: string;
  user?: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    language?: string; // Non-backend, pour compatibilité frontend
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
      role: UserRole;
      language?: string; // Non-backend, pour compatibilité frontend
    };
    accessToken?: string;
  };
}

export interface TwoFactorSecretResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface GoogleAuthResponse {
  user: {
    id: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: UserRole;
    avatarUrl: string | null;
    authProvider: 'google' | 'local';
  };
  accessToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    type: string;
    value: any;
    msg: string;
    path: string;
    location: string;
  }>;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  errorCode?: 'ACCOUNT_DISABLED' | 'TOKEN_EXPIRED' | 'INVALID_CREDENTIALS';
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    user: {
      id: string;
      phone: string;
      firstName: string | null;
      lastName: string | null;
      role: 'farmer' | 'technician' | 'admin';
      avatarUrl: string | null;
    };
    accessToken: string;
  };
}

/**
 * Interface User correspondant au modèle de données du backend
 * Champs marqués comme "Non-backend" sont utilisés uniquement côté frontend
 */
export interface User {
  id: string;
  phone: string; // Requis
  firstName: string;
  lastName: string;
  role: UserRole;
  email?: string | null; // Optionnel selon backend
  twoFactorEnabled: boolean; // Default: false
  isActive: boolean; // Default: true, nouveau champ backend
  // Champs non-backend (pour compatibilité frontend uniquement)
  language?: string; // Non-backend, utilisé pour les préférences UI
  avatarUrl?: string | null; // Non-backend, utilisé pour l'affichage
}

export const authService = {
  register: (data: RegisterDto & { language?: string }) => {
    // Extraire language (non-backend) du payload avant l'envoi
    const { language, ...registerData } = data;
    return api.post('/auth/register', registerData);
  },

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
    }).catch((error: any) => {
      // Vérifier si c'est un compte désactivé
      const errorData = error.response?.data;
      if (errorData?.errorCode === 'ACCOUNT_DISABLED') {
        // Retourner un objet avec errorCode au lieu de lancer une exception
        return Promise.reject({
          errorCode: 'ACCOUNT_DISABLED',
          message: errorData.message || 'Votre compte a été désactivé. Veuillez contacter l\'administrateur du système pour plus d\'informations.',
        });
      }
      // Pour les autres erreurs, propager l'exception normalement
      return Promise.reject(error);
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
    }).catch((error: any) => {
      // Vérifier si c'est un compte désactivé
      const errorData = error.response?.data;
      if (errorData?.errorCode === 'ACCOUNT_DISABLED') {
        // Retourner un objet avec errorCode au lieu de lancer une exception
        return Promise.reject({
          errorCode: 'ACCOUNT_DISABLED',
          message: errorData.message || 'Votre compte a été désactivé. Veuillez contacter l\'administrateur du système pour plus d\'informations.',
        });
      }
      // Pour les autres erreurs, propager l'exception normalement
      return Promise.reject(error);
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
          role: (userData.role || 'farmer') as UserRole,
          email: userData.email !== undefined ? userData.email : null,
          twoFactorEnabled: userData.twoFactorEnabled || userData.two_factor_enabled || false,
          isActive: userData.isActive !== undefined ? userData.isActive : (userData.is_active !== undefined ? userData.is_active : true),
          // Champs non-backend (pour compatibilité frontend)
          language: userData.language || 'fr',
          avatarUrl: userData.avatarUrl || userData.avatar_url || null,
        };
        console.log('🔄 Données normalisées:', normalized);
        console.log('✅ ID final normalisé:', normalized.id, 'Rôle:', normalized.role, '2FA:', normalized.twoFactorEnabled, 'isActive:', normalized.isActive);
        return normalized;
      }

      console.warn('⚠️ Format de données inattendu:', userData);
      return userData;
    });
  }, // retourne user + role

  updateProfile: (data: UpdateProfileDto & { language?: string }) => {
    // Extraire language (non-backend) du payload avant l'envoi
    const { language, ...profileData } = data;
    return api.put('/auth/profile', profileData).then(res => {
      console.log('✅ Réponse de updateProfile:', res.data);
      // Le backend retourne {success: true, data: {...}} ou { user: {...} } ou directement {...}
      const updatedUser = res.data.data || res.data.user || res.data;

      console.log('📦 Données utilisateur extraites après update:', updatedUser);

      // Si le backend retourne les données utilisateur mises à jour, les normaliser
      if (updatedUser && typeof updatedUser === 'object') {
        const normalized: User = {
          id: updatedUser.id || updatedUser._id || '',
          firstName: updatedUser.firstName || updatedUser.first_name || '',
          lastName: updatedUser.lastName || updatedUser.last_name || '',
          phone: updatedUser.phone || '',
          role: (updatedUser.role || 'farmer') as UserRole,
          email: updatedUser.email !== undefined ? updatedUser.email : null,
          twoFactorEnabled: updatedUser.twoFactorEnabled || updatedUser.two_factor_enabled || false,
          isActive: updatedUser.isActive !== undefined ? updatedUser.isActive : (updatedUser.is_active !== undefined ? updatedUser.is_active : true),
          // Champs non-backend (pour compatibilité frontend)
          language: language || updatedUser.language || 'fr',
          avatarUrl: updatedUser.avatarUrl || updatedUser.avatar_url || null,
        };
        console.log('🔄 Données normalisées après update:', normalized);
        return normalized;
      }

      return updatedUser;
    });
  },

  /**
   * Upload une photo de profil
   * @param file - Fichier image à uploader
   * @returns Promise avec l'URL de l'avatar uploadé
   */
  uploadProfilePicture: (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<{
      success: boolean;
      message: string;
      data: {
        userId: string;
        avatarUrl: string;
      };
    }>(
      '/auth/profile/avatar',
      formData,
      {
        // Ne pas définir Content-Type : axios + FormData laissent le navigateur
        // envoyer multipart/form-data avec le boundary, requis par multer.
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    ).then((res) => {
      // Extraire l'avatarUrl de la réponse
      const avatarUrl = res.data.data?.avatarUrl;
      if (!avatarUrl) {
        throw new Error('URL de l\'avatar non trouvée dans la réponse');
      }
      return avatarUrl;
    });
  },

  /**
   * Demander une réinitialisation de mot de passe
   * @param email - Email de l'utilisateur
   * @returns Promise avec la réponse de l'API
   */
  forgotPassword: (email: string): Promise<ApiResponse> => {
    // Normaliser l'email (trim et lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    return api.post<ApiResponse>('/auth/forgot-password', { email: normalizedEmail })
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        // Si le backend retourne une erreur de validation, la retourner
        if (error.response?.data) {
          return error.response.data;
        }
        // Sinon, propager l'erreur
        throw error;
      });
  },

  /**
   * Réinitialiser le mot de passe avec token
   * @param token - Token JWT reçu dans l'URL de l'email
   * @param newPassword - Nouveau mot de passe
   * @returns Promise avec la réponse de l'API
   */
  resetPassword: (token: string, newPassword: string): Promise<ApiResponse> => {
    return api.post<ApiResponse>('/auth/reset-password', { token, newPassword })
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        // Si le backend retourne une erreur, la retourner
        if (error.response?.data) {
          return error.response.data;
        }
        // Sinon, propager l'erreur
        throw error;
      });
  },

  /**
   * Connexion Google (utilisateur existant)
   * @param idToken - Token ID Google obtenu via Google Identity Services
   * @returns Promise avec la réponse de l'API contenant user et accessToken
   */
  googleLogin: (idToken: string): Promise<ApiResponse<GoogleAuthResponse>> => {
    return api.post<ApiResponse<GoogleAuthResponse>>('/auth/google/login', { idToken })
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        // Si le backend retourne une erreur, la propager avec le statut
        if (error.response?.data) {
          const errorWithStatus = error.response.data;
          errorWithStatus.status = error.response.status;
          throw errorWithStatus;
        }
        // Sinon, propager l'erreur
        throw error;
      });
  },

  /**
   * Inscription Google (nouvel utilisateur)
   * @param idToken - Token ID Google obtenu via Google Identity Services
   * @returns Promise avec la réponse de l'API contenant user et accessToken
   */
  googleRegister: (idToken: string): Promise<ApiResponse<GoogleAuthResponse>> => {
    return api.post<ApiResponse<GoogleAuthResponse>>('/auth/google/register', { idToken })
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        // Si le backend retourne une erreur, la propager avec le statut
        if (error.response?.data) {
          const errorWithStatus = error.response.data;
          errorWithStatus.status = error.response.status;
          throw errorWithStatus;
        }
        // Sinon, propager l'erreur
        throw error;
      });
  },

  /**
   * Authentification Google automatique (essaie login puis register si nécessaire)
   * @param idToken - Token ID Google obtenu via Google Identity Services
   * @returns Promise avec la réponse de l'API et l'action effectuée ('login' | 'register')
   */
  googleAuthAuto: async (idToken: string): Promise<{ action: 'login' | 'register'; data: ApiResponse<GoogleAuthResponse> }> => {
    try {
      // Essayer la connexion d'abord
      const result = await authService.googleLogin(idToken);
      return { action: 'login', data: result };
    } catch (err: any) {
      // Si 404 (aucun compte trouvé), essayer l'inscription
      if (err.status === 404) {
        try {
          const result = await authService.googleRegister(idToken);
          return { action: 'register', data: result };
        } catch (registerErr: any) {
          throw registerErr;
        }
      }
      // Sinon, relancer l'erreur
      throw err;
    }
  },
};