import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/services/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './GoogleSignInButton.module.css';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            config: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              width?: number;
              locale?: string;
            }
          ) => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onError?: (error: string) => void;
  className?: string;
  /**
   * Mode d'authentification :
   * - 'login' : Connexion uniquement (utilisateur existant)
   * - 'register' : Inscription uniquement (nouvel utilisateur)
   * - 'auto' : Essaie login puis register si nécessaire (par défaut)
   */
  mode?: 'login' | 'register' | 'auto';
}

export function GoogleSignInButton({ onError, className, mode = 'auto' }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const loadUser = useAuthStore((s) => s.loadUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestAction, setSuggestAction] = useState<'login' | 'register' | null>(null);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Détecter automatiquement le mode si non spécifié
  const detectedMode = mode === 'auto' 
    ? (location.pathname === '/signup' ? 'register' : 'login')
    : mode;

  const handleGoogleSignIn = useCallback(async (idToken: string) => {
    setLoading(true);
    setError(null);
    setSuggestAction(null);

    try {
      let response: any;
      let action: 'login' | 'register' = 'login';

      // Utiliser le flux automatique si mode='auto', sinon utiliser le mode spécifié
      if (mode === 'auto') {
        const result = await authService.googleAuthAuto(idToken);
        response = result.data;
        action = result.action;
      } else if (detectedMode === 'login') {
        response = await authService.googleLogin(idToken);
        action = 'login';
      } else {
        response = await authService.googleRegister(idToken);
        action = 'register';
      }

      if (response.success && response.data) {
        // Stocker le token d'accès
        localStorage.setItem('accessToken', response.data.accessToken);

        // Recharger les données utilisateur depuis le serveur pour mettre à jour le store
        await loadUser();

        // Récupérer l'utilisateur depuis le store pour déterminer la destination
        const user = useAuthStore.getState().user;
        
        // Déterminer la destination selon le rôle (même logique que LoginPage)
        let destination = '/';
        if (user?.role === 'admin') {
          destination = '/admin';
        } else if (user?.role === 'technician') {
          destination = '/technicien';
        } else {
          // Vérifier s'il y a une URL de retour dans les paramètres
          const returnUrl = searchParams.get('returnUrl');
          // Si une URL de retour est présente et valide, rediriger vers celle-ci
          if (returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('/login') && !returnUrl.startsWith('/signup')) {
            destination = returnUrl;
          }
        }
        
        navigate(destination, { replace: true });
      } else {
        // Gérer les erreurs selon le code de statut
        const errorMessage = response.message || t('googleAuth.errors.generic') || 'Erreur lors de l\'authentification Google';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err: any) {
      console.error('Erreur authentification Google:', err);
      
      // Vérifier si c'est un compte désactivé
      if (err.errorCode === 'ACCOUNT_DISABLED' || err.response?.data?.errorCode === 'ACCOUNT_DISABLED') {
        const disabledMessage = err.message || err.response?.data?.message || t('login.accountDisabled.message') || 'Votre compte a été désactivé. Veuillez contacter l\'administrateur du système pour plus d\'informations.';
        setError(disabledMessage);
        onError?.(disabledMessage);
        setLoading(false);
        return;
      }
      
      // Gérer les erreurs spécifiques selon le statut HTTP
      const status = err.status || err.response?.status;
      const data = err.response?.data || err;
      let errorMessage = t('googleAuth.errors.networkError') || 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.';

      if (status) {
        switch (status) {
          case 400:
            if (data?.errors) {
              errorMessage = data.errors.map((e: any) => e.msg).join(', ');
            } else {
              errorMessage = data?.message || t('googleAuth.errors.validationError') || 'Données invalides';
            }
            break;
          case 401:
            errorMessage = data?.message || t('googleAuth.errors.tokenInvalid') || 'Token Google invalide ou expiré. Veuillez réessayer.';
            break;
          case 403:
            errorMessage = data?.message || t('login.accountDisabled.message') || 'Votre compte a été désactivé. Veuillez contacter l\'administrateur.';
            break;
          case 404:
            // Aucun compte trouvé - proposer l'inscription si on est en mode login
            if (detectedMode === 'login') {
              errorMessage = data?.message || t('googleAuth.errors.noAccount') || 'Aucun compte trouvé avec ce compte Google.';
              setSuggestAction('register');
            } else {
              errorMessage = data?.message || t('googleAuth.errors.noAccount') || 'Aucun compte trouvé.';
            }
            break;
          case 409:
            // Compte existe déjà - proposer la connexion si on est en mode register
            if (detectedMode === 'register') {
              errorMessage = data?.message || t('googleAuth.errors.accountExists') || 'Un compte existe déjà avec ce compte Google. Veuillez vous connecter.';
              setSuggestAction('login');
            } else {
              errorMessage = data?.message || t('googleAuth.errors.accountExists') || 'Un compte existe déjà avec cet email. Veuillez vous connecter avec votre mot de passe.';
            }
            break;
          case 500:
            errorMessage = data?.message || t('googleAuth.errors.serverError') || 'Erreur serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = data?.message || errorMessage;
        }
      } else {
        // Erreur réseau ou autre
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [mode, detectedMode, loadUser, navigate, searchParams, t, onError]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn('VITE_GOOGLE_CLIENT_ID n\'est pas défini dans les variables d\'environnement');
      return;
    }

    const initializeGoogle = () => {
      if (window.google && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: { credential: string }) => {
            if (response.credential) {
              await handleGoogleSignIn(response.credential);
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          text: detectedMode === 'register' ? 'signup_with' : 'signin_with',
          width: 250,
          locale: t('common.locale') || 'fr',
        });
      }
    };

    // Vérifier si Google est déjà chargé
    if (window.google) {
      initializeGoogle();
    } else {
      // Attendre le chargement du script Google
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle);
          initializeGoogle();
        }
      }, 100);

      // Timeout après 10 secondes
      setTimeout(() => {
        clearInterval(checkGoogle);
        if (!window.google) {
          const errorMsg = t('googleAuth.errors.scriptNotLoaded') || 'Erreur: Script Google non chargé';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      }, 10000);
    }
  }, [GOOGLE_CLIENT_ID, t, onError, detectedMode, handleGoogleSignIn]);

  if (!GOOGLE_CLIENT_ID) {
    return null; // Ne pas afficher le bouton si le Client ID n'est pas configuré
  }

  return (
    <div className={`${styles.googleSignInContainer} ${className || ''}`}>
      <div ref={buttonRef} className={styles.googleButtonWrapper}></div>
      {loading && (
        <div className={styles.loadingOverlay}>
          <p>{t('googleAuth.loading') || 'Connexion en cours...'}</p>
        </div>
      )}
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
          {suggestAction && (
            <button
              type="button"
              onClick={() => {
                if (suggestAction === 'register') {
                  navigate('/signup', { replace: true });
                } else {
                  navigate('/login', { replace: true });
                }
              }}
              className={styles.suggestButton}
            >
              {suggestAction === 'register' 
                ? (t('googleAuth.suggest.register') || 'S\'inscrire')
                : (t('googleAuth.suggest.login') || 'Se connecter')
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
}
