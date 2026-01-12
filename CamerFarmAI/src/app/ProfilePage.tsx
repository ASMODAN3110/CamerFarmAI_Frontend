import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/services/useAuthStore';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import type { TranslationKey } from '@/utils/translations';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaEdit, FaSave, FaTimes, FaCamera, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import { TwoFactorModal } from '@/components/ui/TwoFactorModal/TwoFactorModal';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const loadUser = useAuthStore((s) => s.loadUser);
  const updateAvatarUrl = useAuthStore((s) => s.updateAvatarUrl);

  // Détecter si l'utilisateur est un technicien
  const isTechnician = user?.role === 'technician';
  const canEdit = !isTechnician; // Les techniciens ne peuvent pas éditer

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
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [twoFactorMode, setTwoFactorMode] = useState<'enable' | 'disable'>('enable');


  const profileNavItems = useMemo(
    () => {
      // Pour les techniciens, ne pas passer de navItems pour que le Header utilise le variant technicien
      if (isTechnician) {
        return undefined;
      }
      return [
        { label: t('nav.home'), href: '/' },
        { label: t('nav.plantations'), href: '/plantations' },
        { label: t('nav.ai'), href: '/ai' },
        { label: t('nav.support'), href: '/support' },
      ];
    },
    [t, isTechnician]
  );

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
    if (isEditing && canEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Fonction de validation stricte des fichiers avatar
  const validateAvatarFile = (file: File): { valid: boolean; error?: string } => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: t('profile.errors.upload.invalidFormat'),
      };
    }

    const maxSize = 5 * 1024 * 1024; // 5 Mo
    if (file.size > maxSize) {
      return {
        valid: false,
        error: t('profile.errors.imageSizeExceeded'),
      };
    }

    return { valid: true };
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation stricte du fichier
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      setErrors({ general: validation.error || t('profile.errors.invalidImage') });
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
        .then((avatarUrl: string) => {
          // Mettre à jour immédiatement avec l'URL retournée
          setProfileImage(avatarUrl);

          // Mettre à jour le store utilisateur
          updateAvatarUrl(avatarUrl);

          // Afficher message de succès (optionnel, peut être ajouté plus tard avec un toast)
          console.log('✅ Avatar uploadé avec succès:', avatarUrl);

          // Réinitialiser le preview après succès
          setImagePreview(null);
        })
        .catch((error: any) => {
          const status = error?.response?.status;
          let errorMessage = t('profile.errors.uploadFailed');

          // Gestion spécifique des codes HTTP
          switch (status) {
            case 400:
              errorMessage = error?.response?.data?.message || t('profile.errors.upload.fileMissing');
              break;
            case 401:
              errorMessage = t('profile.errors.upload.sessionExpired');
              // Optionnel : rediriger vers login après un délai
              setTimeout(() => {
                navigate('/login');
              }, 2000);
              break;
            case 404:
              errorMessage = t('profile.errors.upload.userNotFound');
              break;
            case 500:
              errorMessage = t('profile.errors.upload.serverError');
              break;
            default:
              if (error instanceof TypeError && error.message === 'Failed to fetch') {
                errorMessage = t('profile.errors.upload.networkError');
              } else {
                errorMessage = error?.response?.data?.message || errorMessage;
              }
          }

          setErrors({ general: errorMessage });
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

  const renderContent = () => {
    if (!user) {
      return (
        <div className={styles.loadingCard}>
          <div className={styles.loadingSpinner}>⏳</div>
          <p>{t('profile.loading')}</p>
          <p className={styles.loadingHint}>{t('profile.loadingHint')}</p>
        </div>
      );
    }

    const fallbackName = t('profile.welcome').replace('{name}', '').replace(/,\s*$/, '').trim();
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || fallbackName;

    return (
      <div className={styles.content}>
        {isTechnician && (
          <div className={styles.backButtonContainer}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/technicien')}
            >
              <FaArrowLeft /> {t('profile.backToDashboard') || 'Retour au tableau de bord'}
            </Button>
          </div>
        )}
        <div className={styles.profileSection}>
          <div className={styles.profileImageContainer}>
            <div
              className={`${styles.profileImage} ${isEditing && canEdit ? styles.profileImageEditable : ''}`}
              onClick={handleImageClick}
              style={{
                backgroundImage: imagePreview || profileImage ? `url(${imagePreview || profileImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!imagePreview && !profileImage && <FaUser size={60} />}
              {isEditing && canEdit && (
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
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              onChange={handleImageChange}
              className={styles.fileInput}
              disabled={!isEditing || isUploading || !canEdit}
            />
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileRoleBadge}>{getRoleLabel(user.role)}</p>
            <h2 className={styles.profileName}>{fullName}</h2>
            <p className={styles.profileEmail}>
              {user.phone ? (
                <>
                  <FaPhone size={14} className={styles.profileEmailIcon} />
                  {user.phone}
                </>
              ) : (
                t('profile.noPhone')
              )}
            </p>
            {user.email && (
              <p className={styles.profileEmail}>
                <FaEnvelope size={14} className={styles.profileEmailIcon} />
                {user.email}
              </p>
            )}
          </div>
          <div className={styles.profileActions}>
            {canEdit && !isEditing ? (
              <Button variant="primary" onClick={() => setIsEditing(true)} className={styles.editButton}>
                <FaEdit /> {t('profile.editButton')}
              </Button>
            ) : canEdit && isEditing ? (
              <div className={styles.editActions}>
                <Button variant="primary" onClick={handleSave} disabled={isSaving} className={styles.saveButton}>
                  <FaSave /> {isSaving ? t('profile.saving') : t('profile.saveButton')}
                </Button>
                <Button variant="secondary" onClick={handleCancel} disabled={isSaving} className={styles.cancelButton}>
                  <FaTimes /> {t('profile.cancelButton')}
                </Button>
              </div>
            ) : null}
            {isTechnician && (
              <div className={styles.readonlyMessage}>
                <p>{t('profile.readonlyMessage') || 'Ce profil est en lecture seule. Les techniciens ne peuvent pas modifier leurs informations.'}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

          <div className={styles.formGrid}>
            <div className={styles.formColumn}>
              <FormField
                type="text"
                name="firstName"
                label={t('profile.firstNameLabel')}
                placeholder={t('profile.firstNamePlaceholder')}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                disabled={!isEditing || isTechnician}
              />

              <FormField
                type="text"
                name="lastName"
                label={t('profile.lastNameLabel')}
                placeholder={t('profile.lastNamePlaceholder')}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                disabled={!isEditing || isTechnician}
              />

              <div className={styles.selectField}>
                <label className={styles.selectLabel}>
                  <FaGlobe /> {t('profile.languageLabel')}
                </label>
                <select
                  className={styles.select}
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  disabled={!isEditing || isTechnician}
                >
                  <option value="fr">{t('language.fr')}</option>
                  <option value="en">{t('language.en')}</option>
                  <option value="ff">{t('language.ff')}</option>
                  <option value="ew">{t('language.ew')}</option>
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
                      <span className={styles.emailValue}>{formData.email || t('profile.noEmail')}</span>

                    </div>
                  </div>

                </div>
              </div>
            </div>

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
                disabled={!isEditing || isTechnician}
              />

              <div className={styles.infoField}>
                <label className={styles.infoLabel}>{t('profile.idLabel')}</label>
                <div className={styles.infoValue}>{user.id}</div>
                <p className={styles.infoHint}>{t('profile.idHint')}</p>
              </div>

              <div className={styles.twoFactorSection}>
                <label className={styles.twoFactorLabel}>
                  <FaShieldAlt /> {t('profile.twoFactor.title')}
                </label>
                <div className={styles.twoFactorContent}>
                  <div className={styles.twoFactorStatus}>
                    {(user as any).twoFactorEnabled ? (
                      <>
                        <FaCheckCircle className={styles.twoFactorStatusIcon} />
                        <span className={styles.twoFactorStatusText}>
                          {t('profile.twoFactor.enabled')}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className={styles.twoFactorStatusIconInactive} />
                        <span className={styles.twoFactorStatusText}>
                          {t('profile.twoFactor.disabled')}
                        </span>
                      </>
                    )}
                  </div>
                  <p className={styles.twoFactorDescription}>
                    {t('profile.twoFactor.description')}
                  </p>
                  {canEdit && (
                    <Button
                      variant={(user as any).twoFactorEnabled ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => {
                        setTwoFactorMode((user as any).twoFactorEnabled ? 'disable' : 'enable');
                        setIsTwoFactorModalOpen(true);
                      }}
                      className={styles.twoFactorButton}
                    >
                      {(user as any).twoFactorEnabled
                        ? t('profile.twoFactor.disableButton')
                        : t('profile.twoFactor.enableButton')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Background3D />
      <Header navItems={profileNavItems} currentPath="/profile" showAuthIcons={true} />
      <main className={styles.profilePage}>
        <div className={styles.profileContainer}>{renderContent()}</div>
      </main>
      <Footer />
      <FloatingButton href="/ai" position="bottom-right" aria-label={t('floatingButton.ariaLabel')} />
      <TwoFactorModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        mode={twoFactorMode}
        onSuccess={() => {
          setIsTwoFactorModalOpen(false);
        }}
      />
    </>
  );
}

