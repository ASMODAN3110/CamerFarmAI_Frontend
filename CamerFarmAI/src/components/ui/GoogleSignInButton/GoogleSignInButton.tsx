import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
}

export function GoogleSignInButton({ onError, className }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const loadUser = useAuthStore((s) => s.loadUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
          text: 'signin_with',
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
  }, [GOOGLE_CLIENT_ID, t, onError]);

  const handleGoogleSignIn = async (idToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.googleAuth(idToken);

      if (response.success && response.data) {
        // Stocker le token d'accès
        localStorage.setItem('accessToken', response.data.accessToken);

        // Recharger les données utilisateur depuis le serveur pour mettre à jour le store
        // Cela garantit que le store a les bonnes données normalisées
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
        
        // Vérifier les erreurs spécifiques
        if (response.message?.includes('email') && response.message?.includes('vérifié')) {
          setError(t('googleAuth.errors.emailNotVerified') || 'Votre email Google n\'est pas vérifié. Veuillez vérifier votre email Google.');
        } else if (response.message?.includes('existe déjà')) {
          setError(t('googleAuth.errors.accountExists') || 'Un compte existe déjà avec cet email. Veuillez vous connecter avec votre mot de passe.');
        } else if (response.message?.includes('invalide') || response.message?.includes('expiré')) {
          setError(t('googleAuth.errors.tokenInvalid') || 'Token Google invalide ou expiré. Veuillez réessayer.');
        } else {
          setError(errorMessage);
        }
        
        onError?.(errorMessage);
      }
    } catch (err: any) {
      console.error('Erreur authentification Google:', err);
      
      // Vérifier si c'est un compte désactivé
      const errorData = err.response?.data;
      if (errorData?.errorCode === 'ACCOUNT_DISABLED') {
        const disabledMessage = errorData.message || t('login.accountDisabled.message') || 'Votre compte a été désactivé. Veuillez contacter l\'administrateur du système pour plus d\'informations.';
        setError(disabledMessage);
        onError?.(disabledMessage);
        setLoading(false);
        return;
      }
      
      let errorMessage = t('googleAuth.errors.networkError') || 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.';
      
      // Gérer les erreurs HTTP spécifiques
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        switch (status) {
          case 400:
            if (data?.errors) {
              errorMessage = data.errors.map((e: any) => e.msg).join(', ');
            } else {
              errorMessage = data?.message || t('googleAuth.errors.validationError') || 'Données invalides';
            }
            break;
          case 401:
            if (data?.message?.includes('email')) {
              errorMessage = t('googleAuth.errors.emailNotVerified') || 'Votre email Google n\'est pas vérifié. Veuillez vérifier votre email Google.';
            } else {
              errorMessage = t('googleAuth.errors.tokenInvalid') || 'Token Google invalide ou expiré. Veuillez réessayer.';
            }
            break;
          case 409:
            errorMessage = t('googleAuth.errors.accountExists') || 'Un compte existe déjà avec cet email. Veuillez vous connecter avec votre mot de passe.';
            break;
          case 500:
            errorMessage = t('googleAuth.errors.serverError') || 'Erreur serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = data?.message || errorMessage;
        }
      }

      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        </div>
      )}
    </div>
  );
}
