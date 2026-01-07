import { useState, useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useAuthStore } from '@/services/useAuthStore';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logoIcon from '@/assets/logo.png';
import styles from './SignUpPage.module.css';

export function SignUpPage() {
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: textRef, isVisible: isTextVisible } = useScrollAnimation({ threshold: 0.1 });

  // Images de fond pour le carousel
  // Images de fond pour le carousel - Agriculture camerounaise
  const backgroundImages = [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80', // Plantations et cultures camerounaises
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80', // Champs agricoles et paysages ruraux
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80', // Serres et technologies agricoles
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80', // Agriculture moderne au Cameroun
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

  // Mémoriser l'icône pour éviter les problèmes de réconciliation
  const passwordIcon = useMemo(() => {
    return showPassword ? <FaEyeSlash aria-hidden="true" key="eye-slash-icon" /> : <FaEye aria-hidden="true" key="eye-icon" />;
  }, [showPassword]);

  const confirmPasswordIcon = useMemo(() => {
    return showConfirmPassword ? <FaEyeSlash aria-hidden="true" key="eye-slash-confirm-icon" /> : <FaEye aria-hidden="true" key="eye-confirm-icon" />;
  }, [showConfirmPassword]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push(t('signup.errors.passwordMinLength'));
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push(t('signup.errors.passwordUppercase'));
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push(t('signup.errors.passwordLowercase'));
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push(t('signup.errors.passwordNumber'));
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(t('signup.errors.passwordSpecial'));
    }
    
    return errors;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Validation en temps réel du mot de passe
    if (field === 'password') {
      setPasswordValidation({
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
    
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
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        // Afficher toutes les erreurs de validation du mot de passe
        newErrors.password = passwordErrors.join('. ');
      }
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
      await authService.register({
        phone: formData.phone,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.trim(),
        language: 'fr', // TODO: Récupérer depuis le contexte de langue
      });
      
      // Afficher un message de succès avec information sur l'email de bienvenue
      setSuccessMessage(t('signup.successMessageWithEmail') || 'Inscription réussie ! Vérifiez votre boîte email pour recevoir votre email de bienvenue.');
      
      // Redirection après inscription réussie (avec délai pour voir le message)
      setTimeout(() => {
      navigate('/login', { replace: true });
      }, 3000);
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      console.error('📦 Détails de l\'erreur:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors
      });
      
      // Gérer les erreurs de validation du backend
      const backendErrors = error?.response?.data?.errors || [];
      const newErrors: Record<string, string> = {};
      
      // Extraire les erreurs du backend et les mapper aux champs du formulaire
      if (Array.isArray(backendErrors)) {
        backendErrors.forEach((err: any) => {
          if (err.path && err.msg) {
            const field = err.path;
            // Si le champ a déjà une erreur, concaténer les messages
            if (newErrors[field]) {
              newErrors[field] += '. ' + err.msg;
            } else {
              newErrors[field] = err.msg;
            }
          }
        });
      }
      
      // Gérer les erreurs spécifiques (email/phone déjà existant)
      let errorMessage = error?.response?.data?.message || error?.response?.data?.error || '';
      const statusCode = error?.response?.status;
      
      // Détecter et remplacer les messages techniques de base de données
      const lowerMessage = errorMessage.toLowerCase();
      
      // Détecter les erreurs de contrainte unique (clé dupliquée)
      // Ces messages proviennent généralement de PostgreSQL
      const isDuplicateKeyError = lowerMessage.includes('clé dupliquée') || 
                                   lowerMessage.includes('contrainte unique') || 
                                   lowerMessage.includes('unique constraint') ||
                                   lowerMessage.includes('duplicate key') ||
                                   lowerMessage.includes('uq_') ||
                                   lowerMessage.includes('violates unique constraint');
      
      if (isDuplicateKeyError) {
        // Essayer de déterminer quel champ est concerné
        // 1. Vérifier dans le message d'erreur
        // 2. Vérifier dans le nom de la contrainte
        // 3. Vérifier dans les données envoyées (formData)
        
        // Extraire le nom de la contrainte si présent
        const constraintMatch = errorMessage.match(/«\s*([^»]+)\s*»/) || 
                               errorMessage.match(/constraint\s+['"]?([^'"]+)['"]?/i) ||
                               errorMessage.match(/uq_[\w]+/i) ||
                               errorMessage.match(/(uq_\w+)/i);
        
        const constraintName = constraintMatch ? (constraintMatch[1] || constraintMatch[0]) : '';
        
        // Combiner le message et le nom de la contrainte pour l'analyse
        const fullErrorText = (errorMessage + ' ' + constraintName).toLowerCase();
        
        // Détecter le champ concerné
        let detectedField: 'email' | 'phone' | null = null;
        
        if (fullErrorText.includes('email') || fullErrorText.includes('courriel') || fullErrorText.includes('e-mail')) {
          detectedField = 'email';
        } else if (fullErrorText.includes('phone') || fullErrorText.includes('téléphone') || fullErrorText.includes('telephone') || fullErrorText.includes('numéro')) {
          detectedField = 'phone';
        } else {
          // Si on ne peut pas déterminer, vérifier les données du formulaire
          // Si les deux champs sont remplis, on suppose que c'est l'email (plus courant)
          // Sinon, on vérifie quel champ a été rempli
          if (formData.email && formData.phone) {
            detectedField = 'email'; // Par défaut, email
          } else if (formData.email) {
            detectedField = 'email';
          } else if (formData.phone) {
            detectedField = 'phone';
          } else {
            detectedField = 'email'; // Par défaut
          }
        }
        
        // Afficher le message d'erreur approprié
        if (detectedField === 'email') {
          newErrors.email = t('signup.errors.emailExists');
        } else if (detectedField === 'phone') {
          newErrors.phone = t('signup.errors.phoneExists');
        }
      }
      // Si aucune erreur spécifique n'a été extraite des erreurs de validation
      else if (Object.keys(newErrors).length === 0) {
        // Vérifier le code de statut et le message pour déterminer le type d'erreur
        
        // Erreur 409 (Conflict) = ressource déjà existante
        if (statusCode === 409) {
          // Détecter si c'est l'email ou le téléphone
          if (lowerMessage.includes('email') || lowerMessage.includes('courriel') || lowerMessage.includes('e-mail')) {
            newErrors.email = errorMessage || t('signup.errors.emailExists');
          } else if (lowerMessage.includes('téléphone') || lowerMessage.includes('phone') || lowerMessage.includes('numéro') || lowerMessage.includes('telephone')) {
            newErrors.phone = errorMessage || t('signup.errors.phoneExists');
          } else {
            // Si on ne peut pas déterminer, essayer de détecter dans les erreurs
            const hasEmailError = backendErrors.some((err: any) => 
              err.path === 'email' || (err.msg && err.msg.toLowerCase().includes('email'))
            );
            const hasPhoneError = backendErrors.some((err: any) => 
              err.path === 'phone' || (err.msg && err.msg.toLowerCase().includes('phone') || err.msg.toLowerCase().includes('téléphone'))
            );
            
            if (hasEmailError) {
              newErrors.email = errorMessage || t('signup.errors.emailExists');
            } else if (hasPhoneError) {
              newErrors.phone = errorMessage || t('signup.errors.phoneExists');
            } else {
              // Par défaut, mettre sur email si le message contient "déjà" ou "existe"
              if (lowerMessage.includes('déjà') || lowerMessage.includes('existe') || lowerMessage.includes('already') || lowerMessage.includes('exists')) {
                newErrors.email = errorMessage || t('signup.errors.emailExists');
              } else {
                newErrors.email = errorMessage || t('signup.errors.signupFailed');
              }
            }
          }
        } else if (errorMessage) {
          // Pour les autres erreurs, utiliser le message du backend
          // Essayer de détecter le champ concerné
          if (lowerMessage.includes('email') || lowerMessage.includes('courriel')) {
            newErrors.email = errorMessage;
          } else if (lowerMessage.includes('téléphone') || lowerMessage.includes('phone') || lowerMessage.includes('numéro')) {
            newErrors.phone = errorMessage;
          } else {
            newErrors.email = errorMessage;
          }
        } else {
          // Message d'erreur générique
          newErrors.email = t('signup.errors.signupFailed');
        }
      }
      
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.signUpPage}>
      <Background3D />
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
        <LanguageSwitcher variant="light" />
      </div>

      <div className={styles.signUpPage__container}>
        <div 
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={`${styles.signUpPage__formWrapper} ${isFormVisible ? styles.signUpPage__formWrapperVisible : ''}`}
        >
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
              helperText={t('signup.emailHint') || 'Un email de bienvenue vous sera envoyé à cette adresse'}
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
                {passwordIcon}
              </button>
            </div>
            {/* Indicateurs de validation du mot de passe */}
            {formData.password && (
              <div className={styles.signUpPage__passwordRequirements}>
                <p className={styles.signUpPage__passwordRequirementsTitle}>
                  {t('signup.passwordRequirements')}
                </p>
                <ul className={styles.signUpPage__passwordRequirementsList}>
                  <li className={passwordValidation.minLength ? styles.signUpPage__requirementMet : ''}>
                    {passwordValidation.minLength ? '✓' : '○'} {t('signup.errors.passwordMinLength')}
                  </li>
                  <li className={passwordValidation.hasUppercase ? styles.signUpPage__requirementMet : ''}>
                    {passwordValidation.hasUppercase ? '✓' : '○'} {t('signup.errors.passwordUppercase')}
                  </li>
                  <li className={passwordValidation.hasLowercase ? styles.signUpPage__requirementMet : ''}>
                    {passwordValidation.hasLowercase ? '✓' : '○'} {t('signup.errors.passwordLowercase')}
                  </li>
                  <li className={passwordValidation.hasNumber ? styles.signUpPage__requirementMet : ''}>
                    {passwordValidation.hasNumber ? '✓' : '○'} {t('signup.errors.passwordNumber')}
                  </li>
                  <li className={passwordValidation.hasSpecial ? styles.signUpPage__requirementMet : ''}>
                    {passwordValidation.hasSpecial ? '✓' : '○'} {t('signup.errors.passwordSpecial')}
                  </li>
                </ul>
              </div>
            )}

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
                {confirmPasswordIcon}
              </button>
            </div>

            {successMessage && (
              <div className={styles.signUpPage__alertSuccess}>
                <p><strong>{successMessage}</strong></p>
                <p className={styles.signUpPage__successRedirect}>
                  {t('signup.redirecting') || 'Redirection vers la page de connexion...'}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.signUpPage__submitButton}
              disabled={isSubmitting || !!successMessage}
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

        <div 
          ref={textRef as React.RefObject<HTMLDivElement>}
          className={`${styles.signUpPage__rightSection} ${isTextVisible ? styles.signUpPage__rightSectionVisible : ''}`}
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

          <div className={styles.signUpPage__motivationalText}>
            <p className={styles.signUpPage__motivationalLine}>
              {t('login.motivational.line1')}
            </p>
            <p className={styles.signUpPage__motivationalLine}>
              {t('login.motivational.line2')}
            </p>
            <p className={styles.signUpPage__motivationalLine}>
              {t('login.motivational.line3')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

