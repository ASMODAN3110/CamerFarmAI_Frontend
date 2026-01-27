import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './ResetPasswordPage.module.css';

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function ResetPasswordPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const { ref: formRef, isVisible: isFormVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    // Vérifier que le token est présent
    if (!token) {
      setErrors([t('resetPassword.errors.tokenMissing') || 'Token de réinitialisation manquant. Veuillez utiliser le lien reçu par email.']);
    }
  }, [token, t]);

  // Validation en temps réel du mot de passe
  useEffect(() => {
    setValidation({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  }, [newPassword]);

  const isPasswordValid = Object.values(validation).every(v => v === true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors([]);

    // Validation côté client
    if (!token) {
      setErrors([t('resetPassword.errors.tokenMissing') || 'Token de réinitialisation manquant']);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors([t('resetPassword.errors.passwordMismatch') || 'Les mots de passe ne correspondent pas']);
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setErrors([t('resetPassword.errors.passwordInvalid') || 'Le mot de passe ne respecte pas toutes les règles requises']);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.resetPassword(token, newPassword);
      
      if (response.success) {
        setMessage(response.message || t('resetPassword.successMessage') || 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Gérer les erreurs
        if (response.errors) {
          const validationErrors = response.errors.map(err => err.msg);
          setErrors(validationErrors);
        } else {
          const errorMessage = response.message || 'Une erreur est survenue';
          
          // Vérifier si c'est une erreur de token expiré/invalide
          if (errorMessage.includes('invalide') || errorMessage.includes('expiré') || errorMessage.includes('invalid') || errorMessage.includes('expired')) {
            setErrors([t('resetPassword.errors.tokenExpired') || 'Token de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.']);
          } else if (errorMessage.includes('désactivé') || errorMessage.includes('disabled')) {
            setErrors([t('resetPassword.errors.accountDisabled') || 'Impossible de réinitialiser le mot de passe d\'un compte désactivé']);
          } else {
            setErrors([errorMessage]);
          }
        }
      }
    } catch (error: any) {
      console.error('Erreur reset-password:', error);
      
      // Gérer les erreurs spécifiques selon les codes HTTP des spécifications
      const status = error.response?.status;
      const responseData = error.response?.data;
      
      if (status === 400) {
        // Erreur de validation
        if (responseData?.errors) {
          const validationErrors = responseData.errors.map((err: any) => err.msg);
          setErrors(validationErrors);
        } else {
          setErrors([responseData?.message || t('resetPassword.errors.passwordInvalid') || 'Données invalides']);
        }
      } else if (status === 401) {
        // Token invalide ou expiré
        setErrors([t('resetPassword.errors.tokenExpired') || 'Token de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.']);
      } else if (status === 403) {
        // Compte désactivé
        setErrors([t('resetPassword.errors.accountDisabled') || 'Impossible de réinitialiser le mot de passe d\'un compte désactivé']);
      } else if (status === 404) {
        // Utilisateur non trouvé
        setErrors([responseData?.message || t('resetPassword.errors.userNotFound') || 'Utilisateur non trouvé']);
      } else if (status === 500) {
        // Erreur serveur
        setErrors([responseData?.message || t('resetPassword.errors.serverError') || 'Erreur serveur lors de la réinitialisation du mot de passe. Veuillez réessayer plus tard.']);
      } else if (responseData?.errors) {
        // Autres erreurs de validation
        const validationErrors = responseData.errors.map((err: any) => err.msg);
        setErrors(validationErrors);
      } else {
        // Erreur générique
        setErrors([responseData?.message || t('resetPassword.errors.genericError') || 'Une erreur est survenue. Veuillez réessayer.']);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className={styles.resetPasswordPage}>
        <Background3D />
        <div className={styles.resetPasswordPage__overlay} />
        
        <Link to="/login" className={styles.resetPasswordPage__backButton}>
          <FaArrowLeft className={styles.resetPasswordPage__backIcon} />
          <span className={styles.resetPasswordPage__backText}>{t('resetPassword.backToLogin') || 'Retour à la connexion'}</span>
        </Link>

        <div className={styles.resetPasswordPage__container}>
          <div className={styles.resetPasswordPage__formWrapper}>
            <div className={styles.resetPasswordPage__errorContainer}>
              <h2 className={styles.resetPasswordPage__title}>{t('resetPassword.title') || 'Erreur'}</h2>
              <div className={styles.resetPasswordPage__alertError}>
                <p>{t('resetPassword.errors.tokenMissing') || 'Token de réinitialisation manquant.'}</p>
                <p>{t('resetPassword.errors.tokenMissing') || 'Veuillez utiliser le lien reçu par email.'}</p>
              </div>
              <Link to="/forgot-password" className={styles.resetPasswordPage__linkButton}>
                {t('resetPassword.requestNewLink') || 'Demander un nouveau lien'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.resetPasswordPage}>
      <Background3D />
      <div className={styles.resetPasswordPage__overlay} />

      {/* Bouton de retour en haut à gauche */}
      <Link to="/login" className={styles.resetPasswordPage__backButton} aria-label={t('resetPassword.backToLogin')}>
        <FaArrowLeft className={styles.resetPasswordPage__backIcon} />
        <span className={styles.resetPasswordPage__backText}>{t('resetPassword.backToLogin') || 'Retour à la connexion'}</span>
      </Link>

      {/* Sélecteur de langue en haut à droite */}
      <div className={styles.resetPasswordPage__languageSwitcher}>
        <LanguageSwitcher variant="light" />
      </div>

      <div className={styles.resetPasswordPage__container}>
        <div 
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={`${styles.resetPasswordPage__formWrapper} ${isFormVisible ? styles.resetPasswordPage__formWrapperVisible : ''}`}
        >
          <form className={styles.resetPasswordPage__form} onSubmit={handleSubmit}>
            <h2 className={styles.resetPasswordPage__title}>{t('resetPassword.title') || 'Réinitialiser votre mot de passe'}</h2>
            <p className={styles.resetPasswordPage__subtitle}>
              {t('resetPassword.subtitle') || 'Créez un nouveau mot de passe sécurisé pour votre compte.'}
            </p>

            <div className={styles.resetPasswordPage__formGroup}>
              <FormField
                type="password"
                name="newPassword"
                label={t('resetPassword.newPasswordLabel') || 'Nouveau mot de passe'}
                placeholder={t('resetPassword.newPasswordPlaceholder') || 'Nouveau mot de passe'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading || !!message}
                minLength={8}
                autoComplete="new-password"
              />
              
              {/* Indicateurs de validation en temps réel */}
              <div className={styles.resetPasswordPage__validation}>
                <p className={styles.resetPasswordPage__validationTitle}>
                  {t('resetPassword.validation.title') || 'Le mot de passe doit contenir :'}
                </p>
                <ul className={styles.resetPasswordPage__validationList}>
                  <li className={validation.minLength ? styles.resetPasswordPage__validationItemValid : styles.resetPasswordPage__validationItemInvalid}>
                    {validation.minLength ? '✓' : '✗'} {t('resetPassword.validation.minLength') || 'Au moins 8 caractères'}
                  </li>
                  <li className={validation.hasUpperCase ? styles.resetPasswordPage__validationItemValid : styles.resetPasswordPage__validationItemInvalid}>
                    {validation.hasUpperCase ? '✓' : '✗'} {t('resetPassword.validation.hasUpperCase') || 'Une lettre majuscule'}
                  </li>
                  <li className={validation.hasLowerCase ? styles.resetPasswordPage__validationItemValid : styles.resetPasswordPage__validationItemInvalid}>
                    {validation.hasLowerCase ? '✓' : '✗'} {t('resetPassword.validation.hasLowerCase') || 'Une lettre minuscule'}
                  </li>
                  <li className={validation.hasNumber ? styles.resetPasswordPage__validationItemValid : styles.resetPasswordPage__validationItemInvalid}>
                    {validation.hasNumber ? '✓' : '✗'} {t('resetPassword.validation.hasNumber') || 'Un chiffre'}
                  </li>
                  <li className={validation.hasSpecialChar ? styles.resetPasswordPage__validationItemValid : styles.resetPasswordPage__validationItemInvalid}>
                    {validation.hasSpecialChar ? '✓' : '✗'} {t('resetPassword.validation.hasSpecialChar') || 'Un caractère spécial'}
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.resetPasswordPage__formGroup}>
              <FormField
                type="password"
                name="confirmPassword"
                label={t('resetPassword.confirmPasswordLabel') || 'Confirmer le mot de passe'}
                placeholder={t('resetPassword.confirmPasswordPlaceholder') || 'Confirmer le mot de passe'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading || !!message}
                autoComplete="new-password"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className={styles.resetPasswordPage__errorText}>
                  {t('resetPassword.errors.passwordMismatch') || 'Les mots de passe ne correspondent pas'}
                </p>
              )}
            </div>

            {errors.length > 0 && (
              <div className={styles.resetPasswordPage__alertError}>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
                {errors.some(e => e.includes('invalide') || e.includes('expiré') || e.includes('invalid') || e.includes('expired')) && (
                  <Link to="/forgot-password" className={styles.resetPasswordPage__linkButton}>
                    {t('resetPassword.requestNewLink') || 'Demander un nouveau lien'}
                  </Link>
                )}
              </div>
            )}

            {message && (
              <div className={styles.resetPasswordPage__alertSuccess}>
                <p><strong>{message}</strong></p>
                <p>{t('resetPassword.redirecting') || 'Redirection vers la page de connexion...'}</p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className={styles.resetPasswordPage__submitButton}
              disabled={loading || !!message || !isPasswordValid || newPassword !== confirmPassword}
            >
              {loading ? (t('resetPassword.submitting') || 'Réinitialisation en cours...') : (t('resetPassword.submitButton') || 'Réinitialiser le mot de passe')}
            </Button>

            <div className={styles.resetPasswordPage__footer}>
              <Link to="/forgot-password" className={styles.resetPasswordPage__link}>
                {t('resetPassword.requestNewLink') || 'Demander un nouveau lien'}
              </Link>
              <span> | </span>
              <Link to="/login" className={styles.resetPasswordPage__link}>
                {t('resetPassword.backToLogin') || 'Retour à la connexion'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

