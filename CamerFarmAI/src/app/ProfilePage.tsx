import { useState, useEffect, useRef, useMemo } from 'react';
import { useAuthStore } from '@/services/useAuthStore';
import { authService } from '@/services/authService';
import { useTranslation } from '@/hooks/useTranslation';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaEdit, FaSave, FaTimes, FaCamera, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaBell } from 'react-icons/fa';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';
import { TwoFactorModal } from '@/components/ui/TwoFactorModal/TwoFactorModal';
import { plantationService } from '@/services/plantationService';
import type { TranslationKey } from '@/utils/translations';
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
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [twoFactorMode, setTwoFactorMode] = useState<'enable' | 'disable'>('enable');
  
  // Utiliser le hook pour les notifications email
  const {
    emailNotifications,
    stats: emailStats,
    isLoading: isLoadingEmails,
  } = useEmailNotifications({ autoRefresh: true, refreshInterval: 60000 });
  const [enrichedEmailDescriptions, setEnrichedEmailDescriptions] = useState<Map<string, string>>(new Map());
  
  // Cache pour les noms de plantations
  const [plantationNamesCache, setPlantationNamesCache] = useState<Map<string, string>>(new Map());
  const [allPlantationsCache, setAllPlantationsCache] = useState<Map<string, string>>(new Map());
  const [allPlantationsLoaded, setAllPlantationsLoaded] = useState(false);
  
  // Fonction pour récupérer le nom d'une plantation
  const getPlantationName = async (plantationId: string): Promise<string> => {
    if (plantationNamesCache.has(plantationId)) {
      return plantationNamesCache.get(plantationId)!;
    }
    
    try {
      const plantation = await plantationService.getById(plantationId);
      const name = plantation.name;
      setPlantationNamesCache(prev => new Map(prev).set(plantationId, name));
      setAllPlantationsCache(prev => new Map(prev).set(plantationId, name));
      return name;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('⚠️ Erreur lors de la récupération du nom de plantation:', error);
      }
      return 'la plantation';
    }
  };
  
  // Enrichir les descriptions des notifications email
  useEffect(() => {
    const enrichEmailDescriptions = async () => {
      const newEnriched = new Map<string, string>();
      
      // Identifier les notifications qui ont besoin d'enrichissement
      const notificationsToEnrich = emailNotifications.filter(notif => 
        notif.event?.description && 
        (notif.event.description.includes('undefined') || 
         notif.event.description.includes('"la plantation"'))
      );

      if (notificationsToEnrich.length === 0) {
        // Aucune notification à enrichir
        emailNotifications.forEach(notif => {
          newEnriched.set(notif.id, notif.event?.description || '');
        });
        setEnrichedEmailDescriptions(newEnriched);
        return;
      }

      // Charger toutes les plantations une seule fois si nécessaire
      if (!allPlantationsLoaded && notificationsToEnrich.some(n => 
        n.event &&
        !n.event.actuator?.plantationId && 
        !n.event.sensor?.plantationId && 
        !(n.event as any).plantationId
      )) {
        try {
          const plantations = await plantationService.getAll();
          const newCache = new Map<string, string>();
          plantations.forEach(p => {
            newCache.set(p.id, p.name);
            setPlantationNamesCache(prev => new Map(prev).set(p.id, p.name));
          });
          setAllPlantationsCache(newCache);
          setAllPlantationsLoaded(true);
        } catch (error) {
          if (import.meta.env.DEV) {
            console.warn('⚠️ Erreur lors de la récupération des plantations:', error);
          }
        }
      }

      // Enrichir chaque notification
      for (const notif of emailNotifications) {
        if (notif.event?.description) {
          const needsEnrichment = notif.event.description.includes('undefined') || 
                                  notif.event.description.includes('"la plantation"');
          
          if (needsEnrichment) {
            let plantationId = (notif.event as any).plantationId || 
                              notif.event.actuator?.plantationId || 
                              notif.event.sensor?.plantationId;
            
            let plantationName: string | null = null;

            if (plantationId) {
              // Utiliser le cache si disponible
              if (allPlantationsCache.has(plantationId)) {
                plantationName = allPlantationsCache.get(plantationId)!;
              } else {
                plantationName = await getPlantationName(plantationId);
                setAllPlantationsCache(prev => new Map(prev).set(plantationId, plantationName!));
              }
            } else if (notif.event.type === 'mode_changed' && allPlantationsCache.size > 0) {
              // Pour mode_changed sans plantationId, utiliser la première plantation du cache
              plantationName = Array.from(allPlantationsCache.values())[0];
            }

            if (plantationName) {
              let enhanced = notif.event.description.replace(/undefined/g, plantationName);
              enhanced = enhanced.replace(/"la plantation"/g, `"${plantationName}"`);
              newEnriched.set(notif.id, enhanced);
            } else {
              newEnriched.set(notif.id, notif.event.description);
            }
          } else {
            newEnriched.set(notif.id, notif.event.description);
          }
        } else {
          newEnriched.set(notif.id, notif.event?.description || '');
        }
      }
      
      setEnrichedEmailDescriptions(newEnriched);
    };
    
    if (emailNotifications.length > 0) {
      enrichEmailDescriptions();
    }
  }, [emailNotifications, allPlantationsCache, allPlantationsLoaded]);

  const profileNavItems = useMemo(
    () => [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.plantations'), href: '/plantations' },
      { label: t('nav.ai'), href: '/ai' },
      { label: t('nav.support'), href: '/support' },
    ],
    [t]
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
              {!isEditing ? (
                <Button variant="primary" onClick={() => setIsEditing(true)} className={styles.editButton}>
                  <FaEdit /> {t('profile.editButton')}
                </Button>
              ) : (
                <div className={styles.editActions}>
                  <Button variant="primary" onClick={handleSave} disabled={isSaving} className={styles.saveButton}>
                    <FaSave /> {isSaving ? t('profile.saving') : t('profile.saveButton')}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel} disabled={isSaving} className={styles.cancelButton}>
                    <FaTimes /> {t('profile.cancelButton')}
                  </Button>
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
                        <span className={styles.emailValue}>{formData.email || t('profile.noEmail')}</span>
                        <span className={styles.emailDate}>{t('profile.notConfigured')}</span>
                      </div>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm" className={styles.addEmailButton}>
                        + {t('profile.addEmail')}
                      </Button>
                    )}
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
                  disabled={!isEditing}
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
                  </div>
                </div>

                <div className={styles.emailNotificationsSection}>
                  <label className={styles.emailNotificationsLabel}>
                    <FaBell /> {t('profile.emailNotifications.title')}
                  </label>
                  <div className={styles.emailNotificationsContent}>
                    {!user.email ? (
                      <div className={styles.emailNotificationsWarning}>
                        <p className={styles.emailNotificationsWarningText}>
                          {t('profile.emailNotifications.noEmailConfigured')}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className={styles.emailNotificationsDescription}>
                          {t('profile.emailNotifications.description')}
                        </p>
                        
                        {/* Bouton de diagnostic */}
                        <div style={{ marginBottom: '1rem' }}>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={async () => {
                              if (typeof window !== 'undefined' && (window as any).diagnoseEmailNotifications) {
                                await (window as any).diagnoseEmailNotifications();
                              } else {
                                console.log('💡 Script de diagnostic non disponible. Vérifiez la console pour plus d\'informations.');
                                console.log('📧 Notifications email actuelles:', emailNotifications);
                                console.log('📊 Statistiques:', emailStats);
                                if (emailNotifications.length === 0) {
                                  console.warn('⚠️ Aucune notification email trouvée. Le backend ne crée peut-être pas de notifications email.');
                                }
                                if (emailNotifications.some(n => n.statut === 'ERREUR')) {
                                  console.error('❌ Certaines notifications email ont échoué. Vérifiez la configuration SMTP côté backend.');
                                }
                              }
                            }}
                            style={{ fontSize: '0.875rem' }}
                          >
                            🔍 Diagnostic des notifications email
                          </Button>
                        </div>
                        
                        {/* Statistiques des notifications email */}
                        {emailStats && (() => {
                          // Calculer les statistiques spécifiques aux emails
                          const emailSent = emailNotifications.filter(n => n.statut === 'ENVOYEE').length;
                          const emailPending = emailNotifications.filter(n => n.statut === 'EN_ATTENTE').length;
                          const emailErrors = emailNotifications.filter(n => n.statut === 'ERREUR').length;
                          const totalEmails = emailNotifications.length;
                          
                          return (
                            <div className={styles.emailNotificationsStats}>
                              <div className={styles.emailNotificationsStatsItem}>
                                <span className={styles.emailNotificationsStatsLabel}>
                                  {t('profile.emailNotifications.status.sent')}:
                                </span>
                                <span className={styles.emailNotificationsStatsValue}>
                                  {emailSent}
                                </span>
                              </div>
                              {emailPending > 0 && (
                                <div className={styles.emailNotificationsStatsItem}>
                                  <span className={styles.emailNotificationsStatsLabel}>
                                    {t('profile.emailNotifications.status.pending')}:
                                  </span>
                                  <span className={styles.emailNotificationsStatsValue}>
                                    {emailPending}
                                  </span>
                                </div>
                              )}
                              {emailErrors > 0 && (
                                <div className={styles.emailNotificationsStatsItem}>
                                  <span className={styles.emailNotificationsStatsLabel}>
                                    {t('profile.emailNotifications.status.error')}:
                                  </span>
                                  <span className={`${styles.emailNotificationsStatsValue} ${styles.emailNotificationsStatsError}`}>
                                    {emailErrors}
                                  </span>
                                </div>
                              )}
                              {emailErrors > 0 && emailErrors === totalEmails && (
                                <div style={{ 
                                  marginTop: '1rem', 
                                  padding: '0.75rem', 
                                  backgroundColor: '#fee', 
                                  border: '1px solid #fcc',
                                  borderRadius: '4px',
                                  fontSize: '0.875rem',
                                  color: '#c33'
                                }}>
                                  <strong>⚠️ Problème SMTP détecté</strong>
                                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8125rem' }}>
                                    Toutes les notifications email échouent à l'envoi. 
                                    Vérifiez la configuration SMTP côté backend (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).
                                  </p>
                                </div>
                              )}
                              {totalEmails > 0 && (
                                <div className={styles.emailNotificationsStatsItem}>
                                  <span className={styles.emailNotificationsStatsLabel}>
                                    {t('profile.emailNotifications.total')}:
                                  </span>
                                  <span className={styles.emailNotificationsStatsValue}>
                                    {totalEmails}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                        
                        {/* Liste des notifications email récentes */}
                        {isLoadingEmails ? (
                          <div className={styles.emailNotificationsLoading}>
                            {t('notifications.loading') || 'Chargement...'}
                          </div>
                        ) : emailNotifications.length > 0 ? (
                          <div className={styles.emailNotificationsList}>
                            <h4 className={styles.emailNotificationsListTitle}>
                              {t('profile.emailNotifications.recent') || 'Notifications récentes'}
                            </h4>
                            {emailNotifications.slice(0, 5).map((notif) => (
                              <div 
                                key={notif.id} 
                                className={`${styles.emailNotificationItem} ${
                                  notif.statut === 'ERREUR' ? styles.emailNotificationItemError : ''
                                }`}
                              >
                                <div className={styles.emailNotificationContent}>
                                  <div className={styles.emailNotificationMessage}>
                                    {enrichedEmailDescriptions.get(notif.id) || notif.event?.description || t('notifications.noDescription')}
                                  </div>
                                  <div className={styles.emailNotificationMeta}>
                                    <span className={styles.emailNotificationStatus}>
                                      {notif.statut === 'ENVOYEE' && '✅ '}
                                      {notif.statut === 'EN_ATTENTE' && '⏳ '}
                                      {notif.statut === 'ERREUR' && '❌ '}
                                      {notif.statut === 'ENVOYEE' && t('profile.emailNotifications.status.sent')}
                                      {notif.statut === 'EN_ATTENTE' && t('profile.emailNotifications.status.pending')}
                                      {notif.statut === 'ERREUR' && t('profile.emailNotifications.status.error')}
                                    </span>
                                    <span className={styles.emailNotificationDate}>
                                      {new Date(notif.dateEnvoi).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {emailNotifications.length > 5 && (
                              <div className={styles.emailNotificationsMore}>
                                {t('profile.emailNotifications.more')?.replace('{count}', String(emailNotifications.length - 5)) || 
                                  `+ ${emailNotifications.length - 5} autre(s) notification(s)`}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className={styles.emailNotificationsEmpty}>
                            {t('profile.emailNotifications.noNotifications') || 'Aucune notification email pour le moment'}
                          </div>
                        )}
                      </>
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
      <Header navItems={profileNavItems} currentPath="/profile" showAuthIcons />
      <main className={styles.profilePage}>
        <div className={styles.profileContainer}>{renderContent()}</div>
      </main>
      <Footer />
      <FloatingButton href="/support" position="bottom-right" aria-label={t('floatingButton.ariaLabel')} />
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

