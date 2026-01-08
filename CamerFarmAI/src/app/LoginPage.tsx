import { useState, useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { AccountDisabledModal } from '@/components/ui/AccountDisabledModal/AccountDisabledModal';
import { useAuthStore } from '@/services/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logoIcon from '@/assets/logo.png';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const verifyTwoFactor = useAuthStore((s) => s.verifyTwoFactor);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; twoFactor?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [temporaryToken, setTemporaryToken] = useState<string | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAccountDisabledModal, setShowAccountDisabledModal] = useState(false);
  const [accountDisabledMessage, setAccountDisabledMessage] = useState<string | undefined>(undefined);
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: textRef, isVisible: isTextVisible } = useScrollAnimation({ threshold: 0.1 });

  // Images de fond pour le carousel - Agriculture camerounaise
  const backgroundImages = [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80', // Champs agricoles camerounais
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80', // Plantations et cultures locales
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80', // Agriculture traditionnelle et moderne
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80', // Serres et agriculture technologique
  ];

  // Rotation automatique des images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Rediriger si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      const user = useAuthStore.getState().user;
      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user?.role === 'technician') {
        navigate('/technicien', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  // Mémoriser l'icône pour éviter les problèmes de réconciliation
  const passwordIcon = useMemo(() => {
    return showPassword ? <FaEyeSlash aria-hidden="true" key="eye-slash-icon" /> : <FaEye aria-hidden="true" key="eye-icon" />;
  }, [showPassword]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = t('login.errors.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('login.errors.emailInvalid');
    }

    if (!password.trim()) {
      newErrors.password = t('login.errors.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('login.errors.passwordMinLength');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      
      // Si 2FA est requis, afficher le formulaire de vérification
      if (result && 'requires2FA' in result && result.requires2FA && result.temporaryToken) {
        setRequires2FA(true);
        setTemporaryToken(result.temporaryToken);
        setIsSubmitting(false);
        return;
      }
      
      // Redirection après connexion réussie
      // Récupérer l'utilisateur depuis le store
      const user = useAuthStore.getState().user;
      
      // Déterminer la destination
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
    } catch (error: any) {
      console.log('🔍 Erreur capturée dans handleSubmit:', error);
      console.log('🔍 errorCode:', error?.errorCode, 'response errorCode:', error?.response?.data?.errorCode);
      
      // Vérifier si c'est un compte désactivé
      if (error?.errorCode === 'ACCOUNT_DISABLED' || error?.response?.data?.errorCode === 'ACCOUNT_DISABLED') {
        console.log('🚫 Compte désactivé détecté, affichage du modal');
        const disabledMessage = error?.message || error?.response?.data?.message || t('login.accountDisabled.message');
        setAccountDisabledMessage(disabledMessage);
        setShowAccountDisabledModal(true);
        setErrors({}); // Ne pas afficher d'erreur dans le champ email
      } else {
        // Afficher le message d'erreur détaillé du backend pour les autres erreurs
        const errorMessage = 
          error?.response?.data?.message || 
          error?.response?.data?.error || 
          error?.message || 
          t('login.errors.loginFailed') || 
          'Échec de la connexion';
        
        console.error('Login error details:', {
          status: error?.response?.status,
          data: error?.response?.data,
          message: errorMessage
        });
        
        setErrors({ 
          email: errorMessage,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwoFactorSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!twoFactorCode.trim() || twoFactorCode.length !== 6 || !/^\d+$/.test(twoFactorCode)) {
      setErrors({ twoFactor: t('login.errors.twoFactorInvalid') });
      return;
    }

    if (!temporaryToken) {
      setErrors({ twoFactor: t('login.errors.twoFactorTokenMissing') });
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyTwoFactor(temporaryToken, twoFactorCode);
      
      // Redirection après vérification 2FA réussie
      // Récupérer l'utilisateur depuis le store
      const user = useAuthStore.getState().user;
      
      // Déterminer la destination
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
    } catch (error: any) {
      // Vérifier si c'est un compte désactivé
      if (error?.errorCode === 'ACCOUNT_DISABLED' || error?.response?.data?.errorCode === 'ACCOUNT_DISABLED') {
        const disabledMessage = error?.message || error?.response?.data?.message || t('login.accountDisabled.message');
        setAccountDisabledMessage(disabledMessage);
        setShowAccountDisabledModal(true);
        setErrors({}); // Ne pas afficher d'erreur dans le champ 2FA
      } else {
        const errorMessage = 
          error?.response?.data?.message || 
          error?.response?.data?.error || 
          error?.message || 
          t('login.errors.twoFactorFailed') || 
          'Code 2FA invalide';
        
        setErrors({ twoFactor: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <Background3D />
      {/* Images de fond en carousel */}
      <div className={styles.loginPage__background}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.loginPage__backgroundImage} ${
              index === currentImageIndex ? styles.loginPage__backgroundImageActive : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden={index !== currentImageIndex}
          />
        ))}
        <div className={styles.loginPage__overlay} />
      </div>

      {/* Bouton de retour en haut à gauche */}
      <Link to="/" className={styles.loginPage__backButton} aria-label={t('login.backToHome')}>
        <FaArrowLeft className={styles.loginPage__backIcon} />
        <span className={styles.loginPage__backText}>{t('login.backToHome')}</span>
      </Link>

      {/* Sélecteur de langue en haut à droite */}
      <div className={styles.loginPage__languageSwitcher}>
        <LanguageSwitcher variant="light" />
      </div>

      <div className={styles.loginPage__container}>
          <div 
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`${styles.loginPage__formWrapper} ${isFormVisible ? styles.loginPage__formWrapperVisible : ''}`}
          >
            {!requires2FA ? (
              <form className={styles.loginPage__form} onSubmit={handleSubmit}>
                <h2 className={styles.loginPage__title}>{t('login.title')}</h2>

                <FormField
                  type="email"
                  name="email"
                  label={t('login.emailLabel')}
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                />

                <div className={styles.loginPage__passwordWrapper}>
                <FormField
                    type={showPassword ? 'text' : 'password'}
                  name="password"
                  label={t('login.passwordLabel')}
                  placeholder={t('login.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                  <button
                    type="button"
                    className={styles.loginPage__togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                    tabIndex={-1}
                  >
                    {passwordIcon}
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className={styles.loginPage__submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('login.submitting') : t('login.submitButton')}
                </Button>

                <div className={styles.loginPage__links}>
                  <Link to="/forgot-password" className={styles.loginPage__link}>
                    {t('login.forgotPassword')}
                  </Link>
                  <p className={styles.loginPage__signupText}>
                    {t('login.noAccount')}{' '}
                    <Link to="/signup" className={styles.loginPage__link}>
                      {t('login.signupLink')}
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form className={styles.loginPage__form} onSubmit={handleTwoFactorSubmit}>
                <h2 className={styles.loginPage__title}>{t('login.twoFactorTitle')}</h2>
                <p className={styles.loginPage__twoFactorDescription}>
                  {t('login.twoFactorDescription')}
                </p>

                <FormField
                  type="text"
                  name="twoFactorCode"
                  label={t('login.twoFactorCodeLabel')}
                  placeholder={t('login.twoFactorCodePlaceholder')}
                  value={twoFactorCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTwoFactorCode(value);
                  }}
                  error={errors.twoFactor}
                  required
                  autoComplete="one-time-code"
                  disabled={isSubmitting}
                  maxLength={6}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className={styles.loginPage__submitButton}
                  disabled={isSubmitting || twoFactorCode.length !== 6}
                >
                  {isSubmitting ? t('login.verifying') : t('login.verifyButton')}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className={styles.loginPage__backToLoginButton}
                  onClick={() => {
                    setRequires2FA(false);
                    setTemporaryToken(null);
                    setTwoFactorCode('');
                    setErrors({});
                  }}
                  disabled={isSubmitting}
                >
                  {t('login.backToLogin')}
                </Button>
              </form>
            )}
          </div>

          <div 
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`${styles.loginPage__rightSection} ${isTextVisible ? styles.loginPage__rightSectionVisible : ''}`}
          >
            <div className={styles.loginPage__logoSection}>
              <div className={styles.loginPage__logoContainer}>
                <div className={styles.loginPage__logoOrbit}>
                  <span className={styles.loginPage__logoParticle} />
                  <span className={`${styles.loginPage__logoParticle} ${styles.loginPage__logoParticle2}`} />
                  <span className={`${styles.loginPage__logoParticle} ${styles.loginPage__logoParticle3}`} />
                </div>
                <img 
                  src={logoIcon} 
                  alt="CamerFarm AI" 
                  className={styles.loginPage__logo}
                />
              </div>
              <h1 className={styles.loginPage__logoText}>CAMERFARM AI</h1>
            </div>

            <div className={styles.loginPage__motivationalText}>
              <p className={styles.loginPage__motivationalLine}>
                {t('login.motivational.line1')}
              </p>
              <p className={styles.loginPage__motivationalLine}>
                {t('login.motivational.line2')}
              </p>
              <p className={styles.loginPage__motivationalLine}>
                {t('login.motivational.line3')}
              </p>
            </div>
          </div>
      </div>

      <AccountDisabledModal
        isOpen={showAccountDisabledModal}
        onClose={() => {
          setShowAccountDisabledModal(false);
          setAccountDisabledMessage(undefined);
        }}
        message={accountDisabledMessage}
      />
    </main>
  );
}

