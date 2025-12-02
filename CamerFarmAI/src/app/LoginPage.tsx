import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useAuthStore } from '@/services/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logoIcon from '@/assets/logo.ico';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: textRef, isVisible: isTextVisible } = useScrollAnimation({ threshold: 0.1 });

  // Images de fond pour le carousel
  const backgroundImages = [
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80',
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
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
      await login(email, password);
      // Redirection après connexion réussie vers la page d'accueil
      // L'utilisateur peut ensuite accéder à son profil via le menu
      navigate('/', { replace: true });
    } catch (error: any) {
      // Afficher le message d'erreur détaillé du backend
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
        <LanguageSwitcher />
      </div>

      <div className={styles.loginPage__container}>
          <div 
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`${styles.loginPage__formWrapper} ${isFormVisible ? styles.loginPage__formWrapperVisible : ''}`}
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

              <FormField
                type="password"
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
          </div>

          <div 
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`${styles.loginPage__motivationalText} ${isTextVisible ? styles.loginPage__motivationalTextVisible : ''}`}
          >
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
    </main>
  );
}

