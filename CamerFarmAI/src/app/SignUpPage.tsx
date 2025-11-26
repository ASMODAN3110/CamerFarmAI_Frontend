import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logoIcon from '@/assets/logo.ico';
import styles from './SignUpPage.module.css';

export function SignUpPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });

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

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('signup.errors.lastNameRequired');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('signup.errors.firstNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('signup.errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('signup.errors.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('signup.errors.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('signup.errors.phoneInvalid');
    }

    if (!formData.password.trim()) {
      newErrors.password = t('signup.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('signup.errors.passwordMinLength');
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t('signup.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('signup.errors.passwordsMismatch');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Appeler le service d'inscription
      // const response = await authService.signup(formData);
      // login(response.token, response.user);
      
      // Simulation temporaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirection après inscription réussie
      navigate('/login', { replace: true });
    } catch (error) {
      setErrors({ 
        email: t('signup.errors.signupFailed'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.signUpPage}>
      {/* Images de fond en carousel */}
      <div className={styles.signUpPage__background}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.signUpPage__backgroundImage} ${
              index === currentImageIndex ? styles.signUpPage__backgroundImageActive : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden={index !== currentImageIndex}
          />
        ))}
        <div className={styles.signUpPage__overlay} />
      </div>

      {/* Bouton de retour en haut à gauche */}
      <Link to="/" className={styles.signUpPage__backButton} aria-label={t('signup.backToHome')}>
        <FaArrowLeft className={styles.signUpPage__backIcon} />
        <span className={styles.signUpPage__backText}>{t('signup.backToHome')}</span>
      </Link>

      {/* Sélecteur de langue en haut à droite */}
      <div className={styles.signUpPage__languageSwitcher}>
        <LanguageSwitcher />
      </div>

      <div className={styles.signUpPage__container}>
        <div 
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={`${styles.signUpPage__formWrapper} ${isFormVisible ? styles.signUpPage__formWrapperVisible : ''}`}
        >
          <div className={styles.signUpPage__logoSection}>
            <div className={styles.signUpPage__logoContainer}>
              <div className={styles.signUpPage__logoOrbit}>
                <span className={styles.signUpPage__logoParticle} />
                <span className={`${styles.signUpPage__logoParticle} ${styles.signUpPage__logoParticle2}`} />
                <span className={`${styles.signUpPage__logoParticle} ${styles.signUpPage__logoParticle3}`} />
              </div>
              <img 
                src={logoIcon} 
                alt="CamerFarm AI" 
                className={styles.signUpPage__logo}
              />
            </div>
            <h1 className={styles.signUpPage__logoText}>CAMERFARM AI</h1>
          </div>

          <form className={styles.signUpPage__form} onSubmit={handleSubmit}>
            <h2 className={styles.signUpPage__title}>{t('signup.title')}</h2>

            <div className={styles.signUpPage__formRow}>
              <FormField
                type="text"
                name="lastName"
                label={t('signup.lastNameLabel')}
                placeholder={t('signup.lastNamePlaceholder')}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                required
                autoComplete="family-name"
                disabled={isSubmitting}
              />
              <FormField
                type="text"
                name="firstName"
                label={t('signup.firstNameLabel')}
                placeholder={t('signup.firstNamePlaceholder')}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                required
                autoComplete="given-name"
                disabled={isSubmitting}
              />
            </div>

            <FormField
              type="email"
              name="email"
              label={t('signup.emailLabel')}
              placeholder={t('signup.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
              autoComplete="email"
              disabled={isSubmitting}
            />

            <FormField
              type="tel"
              name="phone"
              label={t('signup.phoneLabel')}
              placeholder={t('signup.phonePlaceholder')}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              error={errors.phone}
              required
              autoComplete="tel"
              disabled={isSubmitting}
            />

            <div className={styles.signUpPage__passwordWrapper}>
              <FormField
                type={showPassword ? 'text' : 'password'}
                name="password"
                label={t('signup.passwordLabel')}
                placeholder={t('signup.passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                required
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.signUpPage__togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('signup.hidePassword') : t('signup.showPassword')}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className={styles.signUpPage__passwordWrapper}>
              <FormField
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label={t('signup.confirmPasswordLabel')}
                placeholder={t('signup.confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.signUpPage__togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? t('signup.hidePassword') : t('signup.showPassword')}
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.signUpPage__submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('signup.submitting') : t('signup.submitButton')}
            </Button>

            <div className={styles.signUpPage__loginLink}>
              <p className={styles.signUpPage__loginText}>
                {t('signup.hasAccount')}{' '}
                <Link to="/login" className={styles.signUpPage__link}>
                  {t('signup.loginLink')}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

