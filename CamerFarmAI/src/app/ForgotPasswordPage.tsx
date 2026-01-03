import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './ForgotPasswordPage.module.css';

export function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors([]);

    // Validation côté client
    if (!email.trim()) {
      setErrors([t('forgotPassword.errors.emailRequired') || 'L\'adresse email est requise']);
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrors([t('forgotPassword.errors.emailInvalid') || 'L\'adresse email n\'est pas valide']);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        setMessage(response.message || t('forgotPassword.successMessage') || 'Si cet email existe dans notre système, un lien de réinitialisation a été envoyé.');
        // Redirection optionnelle vers login après 5 secondes
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        // Gérer les erreurs de validation
        if (response.errors) {
          const validationErrors = response.errors.map(err => err.msg);
          setErrors(validationErrors);
        } else {
          setErrors([response.message || 'Une erreur est survenue']);
        }
      }
    } catch (error: any) {
      console.error('Erreur forgot-password:', error);
      setErrors(['Une erreur est survenue. Veuillez réessayer.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.forgotPasswordPage}>
      <Background3D />
      <div className={styles.forgotPasswordPage__overlay} />

      {/* Bouton de retour en haut à gauche */}
      <Link to="/login" className={styles.forgotPasswordPage__backButton} aria-label={t('forgotPassword.backToLogin')}>
        <FaArrowLeft className={styles.forgotPasswordPage__backIcon} />
        <span className={styles.forgotPasswordPage__backText}>{t('forgotPassword.backToLogin') || 'Retour à la connexion'}</span>
      </Link>

      {/* Sélecteur de langue en haut à droite */}
      <div className={styles.forgotPasswordPage__languageSwitcher}>
        <LanguageSwitcher variant="light" />
      </div>

      <div className={styles.forgotPasswordPage__container}>
        <div 
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={`${styles.forgotPasswordPage__formWrapper} ${isFormVisible ? styles.forgotPasswordPage__formWrapperVisible : ''}`}
        >
          <form className={styles.forgotPasswordPage__form} onSubmit={handleSubmit}>
            <h2 className={styles.forgotPasswordPage__title}>{t('forgotPassword.title') || 'Mot de passe oublié'}</h2>
            <p className={styles.forgotPasswordPage__subtitle}>
              {t('forgotPassword.subtitle') || 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.'}
            </p>

            <FormField
              type="email"
              name="email"
              label={t('forgotPassword.emailLabel') || 'Adresse email'}
              placeholder={t('forgotPassword.emailPlaceholder') || 'votre.email@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.length > 0 ? errors[0] : undefined}
              required
              autoComplete="email"
              disabled={loading || !!message}
            />

            {errors.length > 0 && (
              <div className={styles.forgotPasswordPage__alertError}>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {message && (
              <div className={styles.forgotPasswordPage__alertSuccess}>
                <p><strong>{message}</strong></p>
                <p className={styles.forgotPasswordPage__successHint}>
                  {t('forgotPassword.successHint') || 'Vérifiez votre boîte de réception (et les spams) pour le lien de réinitialisation. Le lien expire dans 1 heure.'}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className={styles.forgotPasswordPage__submitButton}
              disabled={loading || !!message}
            >
              {loading ? (t('forgotPassword.submitting') || 'Envoi en cours...') : (t('forgotPassword.submitButton') || 'Envoyer le lien de réinitialisation')}
            </Button>

            <div className={styles.forgotPasswordPage__footer}>
              <Link to="/login" className={styles.forgotPasswordPage__link}>
                {t('forgotPassword.backToLogin') || 'Retour à la connexion'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

