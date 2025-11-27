import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaEdit, FaSave, FaTimes, FaCamera, FaArrowLeft } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const loadUser = useAuthStore((s) => s.loadUser);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    language: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Charger les données utilisateur au montage du composant seulement si pas déjà chargé
  useEffect(() => {
    const fetchUserData = async () => {
      // Si l'utilisateur est déjà chargé, ne pas recharger immédiatement
      // pour éviter de réinitialiser le formulaire
      if (!user) {
        try {
          console.log('🔄 Chargement des données utilisateur...');
          await loadUser();
        } catch (error) {
          console.error('❌ Erreur lors du chargement des données utilisateur:', error);
        }
      } else {
        console.log('✅ Utilisateur déjà chargé, pas besoin de recharger');
      }
    };
    
    fetchUserData();
  }, []); // Seulement au montage

  // Fonction utilitaire pour normaliser les données utilisateur
  const normalizeUserData = (userData: any) => {
    if (!userData) return null;
    
    return {
      firstName: userData.firstName || userData.first_name || '',
      lastName: userData.lastName || userData.last_name || '',
      phone: userData.phone || '',
      email: userData.email || '',
      language: userData.language || 'fr',
    };
  };

  // Mettre à jour le formulaire quand les données utilisateur changent
  useEffect(() => {
    if (user) {
      console.log('📋 Données utilisateur chargées:', user);
      
      // Normaliser les données
      const normalized = normalizeUserData(user);
      
      if (normalized) {
        const newFormData = {
          ...normalized,
        };
        
        console.log('📝 Formulaire mis à jour avec:', newFormData);
        setFormData(newFormData);
      }
      
      // Charger l'image de profil si disponible
      if ((user as any).avatarUrl || (user as any).avatar_url) {
        setProfileImage((user as any).avatarUrl || (user as any).avatar_url);
      }
    } else {
      console.log('⚠️ Aucun utilisateur trouvé dans le store');
    }
  }, [user]);

  const getCurrentDate = () => {
    const date = new Date();
    const currentLang = user?.language || 'fr';
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString(currentLang === 'ff' ? 'fr' : currentLang, options);
  };

  const getRoleLabel = (role: string) => {
    const roleKey = `profile.role.${role}` as TranslationKey;
    return t(roleKey) || role;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('profile.errors.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('profile.errors.lastNameRequired');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('profile.errors.phoneRequired');
    } else {
      // Validation basique du téléphone
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = t('profile.errors.phoneInvalid');
      }
    }

    return newErrors;
  };

  const handleSave = async () => {
    setErrors({});
    
    // Validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      const response = await authService.updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        language: formData.language,
      });
      
      console.log('✅ Profil mis à jour, réponse:', response);
      
      setIsEditing(false);
      
      // Recharger les données utilisateur pour avoir les dernières infos
      console.log('🔄 Rechargement des données après modification...');
      await loadUser();
      
      // Forcer la mise à jour du formulaire après rechargement
      // On utilise un petit délai pour s'assurer que le store est mis à jour
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          const normalized = normalizeUserData(currentUser);
          if (normalized) {
            setFormData(normalized);
            console.log('📋 Formulaire mis à jour après rechargement:', normalized);
          }
        }
      }, 500);
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error ||
        t('profile.errors.updateFailed');
      
      console.error('❌ Erreur lors de la sauvegarde:', error);
      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      // Utiliser la même logique de normalisation que dans useEffect
      const firstName = user.firstName || (user as any).first_name || '';
      const lastName = user.lastName || (user as any).last_name || '';
      const phone = user.phone || '';
      const language = user.language || 'fr';
      
      setFormData({
        firstName,
        lastName,
        phone,
        email: (user as any).email || '',
        language,
      });
    }
    setErrors({});
    setIsEditing(false);
    setImagePreview(null); // Annuler le preview si on annule l'édition
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      setErrors({ general: t('profile.errors.invalidImage') });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      setErrors({ general: t('profile.errors.imageSizeExceeded') });
      return;
    }

    // Créer un preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setImagePreview(previewUrl);
      
      // Upload immédiat de l'image après le preview
      setIsUploading(true);
      setErrors({});

      authService.uploadProfilePicture(file)
        .then(() => {
          setProfileImage(previewUrl);
          loadUser(); // Recharger les données utilisateur
        })
        .catch((error: any) => {
          setErrors({
            general: error?.response?.data?.message || t('profile.errors.uploadFailed'),
          });
          setImagePreview(null);
        })
        .finally(() => {
          setIsUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        });
    };
    reader.readAsDataURL(file);
  };

  // Afficher un état de chargement si l'utilisateur n'est pas encore chargé
  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}>⏳</div>
          <p>{t('profile.loading')}</p>
          <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '1rem' }}>
            {t('profile.loadingHint')}
          </p>
        </div>
      </div>
    );
  }

  // Debug: afficher les données dans la console
  console.log('👤 Utilisateur actuel dans ProfilePage:', user);
  console.log('📋 Données du formulaire:', formData);
  console.log('🔍 Vérification des champs:', {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    language: user.language,
    role: user.role,
    id: user.id,
  });

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || t('profile.welcome', { name: '' }).replace(', ', '');
  
  // Afficher un message de débogage si les données sont vides
  const hasEmptyData = !user.firstName && !user.lastName && !user.phone;

  return (
    <div className={styles.profilePage}>
      {/* Bouton de retour */}
      <Link to="/" className={styles.backButton} aria-label={t('profile.back')}>
        <FaArrowLeft className={styles.backIcon} />
        <span className={styles.backText}>{t('profile.back')}</span>
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.welcomeTitle}>
            {t('profile.welcome').replace('{name}', user.firstName || '')}
          </h1>
          <p className={styles.welcomeDate}>{getCurrentDate()}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profileImageContainer}>
            <div 
              className={`${styles.profileImage} ${isEditing ? styles.profileImageEditable : ''}`}
              onClick={handleImageClick}
              style={{
                backgroundImage: imagePreview || profileImage ? `url(${imagePreview || profileImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!imagePreview && !profileImage && <FaUser size={60} />}
              {isEditing && (
                <div className={styles.profileImageOverlay}>
                  {isUploading ? (
                    <div className={styles.uploadingSpinner}>⏳</div>
                  ) : (
                    <>
                      <FaCamera size={24} />
                      <span>{t('profile.changePhoto')}</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
              disabled={!isEditing || isUploading}
            />
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>{fullName}</h2>
            <p className={styles.profileEmail}>
              {user.phone ? (
                <>
                  <FaPhone size={14} style={{ marginRight: '0.5rem' }} />
                  {user.phone}
                </>
              ) : (
                t('profile.noPhone')
              )}
            </p>
            {user.role && (
              <p className={styles.profileRole}>
                {t('profile.roleLabel')}: {getRoleLabel(user.role)}
              </p>
            )}
          </div>
          <div className={styles.profileActions}>
            {!isEditing ? (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                <FaEdit /> {t('profile.editButton')}
              </Button>
            ) : (
              <div className={styles.editActions}>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={isSaving}
                  className={styles.saveButton}
                >
                  <FaSave /> {isSaving ? t('profile.saving') : t('profile.saveButton')}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className={styles.cancelButton}
                >
                  <FaTimes /> {t('profile.cancelButton')}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          {errors.general && (
            <div className={styles.errorMessage}>{errors.general}</div>
          )}

          {/* Message de débogage temporaire */}
          {hasEmptyData && (
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffc107', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              <strong>⚠️ Debug:</strong> Les données utilisateur semblent vides. 
              Vérifiez la console pour voir ce qui est retourné par l'API.
              <details style={{ marginTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Afficher les données brutes</summary>
                <pre style={{ 
                  background: '#f8f9fa', 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  {JSON.stringify({ user, formData }, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <div className={styles.formGrid}>
            {/* Left Column */}
            <div className={styles.formColumn}>
                <FormField
                  type="text"
                  name="firstName"
                  label={t('profile.firstNameLabel')}
                  placeholder={t('profile.firstNamePlaceholder')}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                disabled={!isEditing}
              />

                <FormField
                  type="text"
                  name="lastName"
                  label={t('profile.lastNameLabel')}
                  placeholder={t('profile.lastNamePlaceholder')}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                disabled={!isEditing}
              />

              <div className={styles.selectField}>
                <label className={styles.selectLabel}>
                  <FaGlobe /> {t('profile.languageLabel')}
                </label>
                <select
                  className={styles.select}
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="fr">{t('language.fr')}</option>
                  <option value="en">{t('language.en')}</option>
                  <option value="ff">{t('language.ff')}</option>
                </select>
              </div>

              <div className={styles.emailSection}>
                <label className={styles.emailSectionLabel}>
                  <FaEnvelope /> {t('profile.emailLabel')}
                </label>
                <div className={styles.emailList}>
                  <div className={styles.emailItem}>
                    <FaEnvelope className={styles.emailIcon} />
                    <div className={styles.emailInfo}>
                      <span className={styles.emailValue}>
                        {formData.email || t('profile.noEmail')}
                      </span>
                      <span className={styles.emailDate}>{t('profile.notConfigured')}</span>
                    </div>
                  </div>
                  {isEditing && (
                    <Button
                      variant="primary"
                      size="sm"
                      className={styles.addEmailButton}
                      >
                        + {t('profile.addEmail')}
                      </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.formColumn}>
              <div className={styles.infoField}>
                <label className={styles.infoLabel}>{t('profile.roleLabel')}</label>
                <div className={styles.infoValue}>{getRoleLabel(user.role)}</div>
                <p className={styles.infoHint}>{t('profile.roleHint')}</p>
              </div>

              <FormField
                type="tel"
                name="phone"
                label={t('profile.phoneLabel')}
                placeholder={user?.phone || t('profile.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
                disabled={!isEditing}
              />

              <div className={styles.infoField}>
                <label className={styles.infoLabel}>{t('profile.idLabel')}</label>
                <div className={styles.infoValue}>{user.id}</div>
                <p className={styles.infoHint}>{t('profile.idHint')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

