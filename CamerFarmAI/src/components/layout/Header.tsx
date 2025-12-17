import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { FaBars, FaTimes, FaBell, FaUser, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { useAuthStore } from '@/services/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { plantationService } from '@/services/plantationService';
import type { Notification as AppNotification } from '@/services/notificationService';
import logoIcon from '@/assets/logo.png';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  navItems?: NavItem[];
  currentPath?: string;
  showAuthIcons?: boolean; // Force l'affichage des icônes de notification et profil
}

// Les labels seront traduits dynamiquement dans le composant
const defaultNavItemsConfig: Array<{ key: 'nav.home' | 'nav.support'; href: string }> = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.support', href: '/support' },
];

const authenticatedNavItemsConfig: Array<{ 
  key: 'nav.home' | 'nav.plantations' | 'nav.support' | 'nav.ai'; 
  href: string 
}> = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.plantations', href: '/plantations' },
  { key: 'nav.ai', href: '/ai' },
  { key: 'nav.support', href: '/support' },
];

export function Header({ 
  navItems,
  currentPath = '/',
  showAuthIcons = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Utiliser le contexte de notifications
  const {
    notifications,
    stats,
    isLoading: isLoadingNotifications,
    markAsRead,
    deleteNotification,
  } = useNotificationContext();

  // Détection mobile
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 900);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Fonction pour formater la date relative
  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return t('notifications.justNow') || 'À l\'instant';
    } else if (diffMins < 60) {
      return `${diffMins} ${t('notifications.minutesAgo') || 'min'}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${t('notifications.hoursAgo') || 'h'}`;
    } else if (diffDays < 7) {
      return `${diffDays} ${t('notifications.daysAgo') || 'j'}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Supprimer une notification
  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher le clic de déclencher handleMarkAsRead
    e.preventDefault(); // Empêcher tout comportement par défaut
    
    try {
      if (import.meta.env.DEV) {
        console.log('🖱️ Clic sur bouton de suppression pour notification:', notificationId);
      }
      
      await deleteNotification(notificationId);
      
      if (import.meta.env.DEV) {
        console.log('✅ Notification supprimée avec succès');
      }
    } catch (error) {
      // Gestion d'erreur silencieuse en production, log en développement
      if (import.meta.env.DEV) {
        console.error('❌ Erreur lors de la suppression de la notification:', {
          id: notificationId,
          error,
          message: error instanceof Error ? error.message : 'Erreur inconnue'
        });
      }
      // L'erreur est déjà gérée dans le hook useNotifications qui recharge les notifications
      // On ne fait rien de plus ici pour éviter de perturber l'UX
    }
  };

  // Marquer une notification comme lue
  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  // Cache pour les noms de plantations (évite les appels API répétés)
  const [plantationNamesCache, setPlantationNamesCache] = useState<Map<string, string>>(new Map());

  // Fonction pour récupérer le nom d'une plantation
  const getPlantationName = async (plantationId: string): Promise<string> => {
    // Vérifier le cache d'abord
    if (plantationNamesCache.has(plantationId)) {
      return plantationNamesCache.get(plantationId)!;
    }

    try {
      const plantation = await plantationService.getById(plantationId);
      const name = plantation.name || 'la plantation';
      // Mettre en cache
      setPlantationNamesCache(prev => new Map(prev).set(plantationId, name));
      return name;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Impossible de récupérer le nom de la plantation ${plantationId}:`, error);
      }
      return 'la plantation';
    }
  };

  // Enrichir les notifications avec les noms de plantations
  const [enrichedNotifications, setEnrichedNotifications] = useState<Map<string, string>>(new Map());

  // Cache pour toutes les plantations (évite les appels répétés)
  const [allPlantationsCache, setAllPlantationsCache] = useState<Map<string, string>>(new Map());
  const [allPlantationsLoaded, setAllPlantationsLoaded] = useState(false);

  useEffect(() => {
    const enrichNotifications = async () => {
      const newEnriched = new Map<string, string>();
      
      // Identifier les notifications qui ont besoin d'enrichissement
      const notificationsToEnrich = notifications.filter(notif => 
        notif.event?.description && 
        (notif.event.description.includes('undefined') || 
         notif.event.description.includes('"la plantation"'))
      );

      if (notificationsToEnrich.length === 0) {
        // Aucune notification à enrichir, utiliser les descriptions originales
        notifications.forEach(notif => {
          newEnriched.set(notif.id, notif.event?.description || '');
        });
        setEnrichedNotifications(newEnriched);
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
            // Mettre aussi dans le cache des noms
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
      for (const notif of notifications) {
        if (notif.event?.description) {
          const needsEnrichment = notif.event.description.includes('undefined') || 
                                  notif.event.description.includes('"la plantation"');
          
          if (needsEnrichment) {
            // Essayer de trouver le plantationId depuis l'événement
            // Pour mode_changed, le plantationId peut être dans plusieurs endroits
            let plantationId = notif.event.plantationId || 
                              (notif.event as any).plantationId || 
                              notif.event.actuator?.plantationId || 
                              notif.event.sensor?.plantationId ||
                              // Pour mode_changed, essayer aussi dans les données brutes de l'événement
                              (notif.event.type === 'mode_changed' && (notif.event as any).plantation?.id);

            let plantationName: string | null = null;

            if (plantationId) {
              // Utiliser le cache si disponible
              if (allPlantationsCache.has(plantationId)) {
                plantationName = allPlantationsCache.get(plantationId)!;
              } else {
                // Sinon, récupérer via getPlantationName (qui utilise aussi un cache)
                plantationName = await getPlantationName(plantationId);
                // Mettre à jour le cache
                setAllPlantationsCache(prev => new Map(prev).set(plantationId!, plantationName!));
              }
            } else if (notif.event.type === 'mode_changed') {
              // Pour mode_changed sans plantationId, essayer de récupérer toutes les plantations
              // et utiliser celle qui correspond (ou la première si on ne peut pas déterminer)
              if (allPlantationsCache.size === 1) {
                // Si une seule plantation, l'utiliser
                plantationName = Array.from(allPlantationsCache.values())[0];
              } else if (allPlantationsCache.size > 1) {
                // Si plusieurs plantations, essayer de récupérer toutes les plantations
                // et utiliser la première (ou on pourrait améliorer avec une logique plus sophistiquée)
                try {
                  const plantations = await plantationService.getAll();
                  if (plantations.length > 0) {
                    // Utiliser la première plantation trouvée
                    plantationName = plantations[0].name;
                    // Mettre à jour le cache avec toutes les plantations
                    plantations.forEach(p => {
                      setAllPlantationsCache(prev => new Map(prev).set(p.id, p.name));
                    });
                  }
                } catch (error) {
                  if (import.meta.env.DEV) {
                    console.warn('⚠️ Impossible de récupérer les plantations pour mode_changed:', error);
                  }
                }
              } else {
                // Si le cache est vide, essayer de charger les plantations
                try {
                  const plantations = await plantationService.getAll();
                  if (plantations.length > 0) {
                    plantationName = plantations[0].name;
                    // Mettre à jour le cache
                    const newCache = new Map<string, string>();
                    plantations.forEach(p => {
                      newCache.set(p.id, p.name);
                      setPlantationNamesCache(prev => new Map(prev).set(p.id, p.name));
                    });
                    setAllPlantationsCache(newCache);
                    setAllPlantationsLoaded(true);
                  }
                } catch (error) {
                  if (import.meta.env.DEV) {
                    console.warn('⚠️ Impossible de récupérer les plantations pour mode_changed:', error);
                  }
                }
              }
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
      
      setEnrichedNotifications(newEnriched);
    };

    if (notifications.length > 0) {
      enrichNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  // Fonction pour obtenir la description enrichie d'une notification
  const getNotificationDescription = (notif: AppNotification): string => {
    const enriched = enrichedNotifications.get(notif.id);
    if (enriched) {
      return enriched;
    }
    // Fallback vers la description originale ou un texte par défaut
    return notif.event?.description || t('notifications.noDescription') || 'Notification';
  };

  // Créer les items de navigation avec traductions
  let navItemsWithActive: NavItem[];
  
  if (navItems) {
    // Si des navItems personnalisés sont fournis, les utiliser tels quels
    navItemsWithActive = navItems.map(item => ({
      ...item,
      active: item.href === currentPath,
    }));
  } else {
    // Sinon, utiliser les items par défaut avec traductions
    const activeNavItemsConfig = isAuthenticated 
      ? authenticatedNavItemsConfig 
      : defaultNavItemsConfig;

    navItemsWithActive = activeNavItemsConfig.map(item => ({
      label: t(item.key),
      href: item.href,
      active: item.href === currentPath,
    }));
  }

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  // Calculer le nombre de notifications web non lues
  // Note: notifications contient déjà uniquement les notifications web (filtrées par getAllWeb dans useNotifications)
  // On compte celles où isRead === false
  const unreadWebCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <header className={styles.header} role="banner">
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img src={logoIcon} alt="CamerFarm AI" className={styles.header__logoImage} />
          <span className={styles.header__logoText}>CamerFarm AI</span>
        </Link>
        
        {/* Navigation Desktop */}
        {!isMobile && (
          <nav className={styles.header__nav} aria-label="Navigation principale">
            {navItemsWithActive.map((item) => (
              <Link 
                key={item.href} 
                to={item.href}
                className={`${styles.header__navLink} ${item.active ? styles.header__navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Actions Desktop */}
        {!isMobile && (
          <div className={styles.header__actions}>
            <LanguageSwitcher />
            {(isAuthenticated || showAuthIcons) ? (
              <>
                <div className={styles.header__iconButtonContainer}>
                  <button
                    className={styles.header__iconButton}
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    aria-label="Notifications"
                  >
                    <Icon icon={FaBell} size={22} />
                    {unreadWebCount > 0 && (
                      <span className={styles.header__notificationBadge}>
                        {unreadWebCount > 99 ? '99+' : unreadWebCount}
                      </span>
                    )}
                  </button>
                  <Dropdown
                    isOpen={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                    align="right"
                  >
                    <div className={styles.header__notificationsDropdown}>
                      <div className={styles.header__notificationsHeader}>
                        <h3 className={styles.header__notificationsTitle}>{t('notifications.title')}</h3>
                        <button
                          className={styles.header__closeButton}
                          onClick={() => setNotificationsOpen(false)}
                          aria-label="Fermer"
                        >
                          ×
                        </button>
                      </div>
                      <div className={styles.header__notificationsList}>
                        {isLoadingNotifications ? (
                          <div className={styles.header__notificationEmpty}>
                            {t('notifications.loading') || 'Chargement...'}
                          </div>
                        ) : notifications.length > 0 ? (
                          <>
                            {notifications.map((notif) => (
                              <div 
                                key={notif.id} 
                                className={`${styles.header__notificationItem} ${!notif.isRead ? styles.header__notificationItemUnread : ''}`}
                                onClick={() => {
                                  if (!notif.isRead) {
                                    handleMarkAsRead(notif.id);
                                  }
                                }}
                              >
                                <div className={styles.header__notificationContent}>
                                  <div className={styles.header__notificationMessage}>
                                    {getNotificationDescription(notif)}
                                  </div>
                                  <div className={styles.header__notificationTime}>
                                    {notif.dateLu ? formatRelativeTime(notif.dateLu) : formatRelativeTime(notif.dateEnvoi)}
                                  </div>
                                </div>
                                <button
                                  className={styles.header__notificationDelete}
                                  onClick={(e) => handleDelete(notif.id, e)}
                                  aria-label={t('notifications.delete') || 'Supprimer la notification'}
                                  title={t('notifications.delete') || 'Supprimer'}
                                >
                                  <Icon icon={FaTrash} size={14} />
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className={styles.header__notificationEmpty}>
                            {t('notifications.empty')}
                          </div>
                        )}
                      </div>
                    </div>
                  </Dropdown>
                </div>

                <div className={styles.header__iconButtonContainer}>
                  <button
                    className={styles.header__iconButton}
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    aria-label="Profil"
                  >
                    <Icon icon={FaUser} size={22} />
                  </button>
                  <Dropdown
                    isOpen={profileMenuOpen}
                    onClose={() => setProfileMenuOpen(false)}
                    align="right"
                  >
                    <div className={styles.header__profileDropdown}>
                      <button
                        className={styles.header__profileMenuItem}
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/profile');
                        }}
                      >
                        <Icon icon={FaUser} size={18} />
                        {t('auth.profile')}
                      </button>
                      <button
                        className={`${styles.header__profileMenuItem} ${styles.header__profileMenuItemDanger}`}
                        onClick={handleLogout}
                      >
                        <Icon icon={FaSignOutAlt} size={18} />
                        {t('auth.logout')}
                      </button>
                    </div>
                  </Dropdown>
                </div>
              </>
            ) : (
              <>
                <Button variant="primary" size="sm" href="/login">
                  {t('auth.login')}
                </Button>
                <Button variant="primary" size="sm" href="/signup">
                  {t('auth.signup')}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Bouton Hamburger Mobile */}
        {isMobile && (
          <button
            className={styles.header__hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon icon={mobileMenuOpen ? FaTimes : FaBars} size={32} />
          </button>
        )}
      </div>

      {/* Menu Mobile */}
      {isMobile && (
        <div className={`${styles.header__mobileMenu} ${mobileMenuOpen ? styles.header__mobileMenuOpen : ''}`}>
          <nav className={styles.header__mobileNav} aria-label="Navigation mobile">
            {navItemsWithActive.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`${styles.header__mobileNavLink} ${item.active ? styles.header__mobileNavLinkActive : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.header__mobileLanguage}>
            <LanguageSwitcher />
          </div>
          {(isAuthenticated || showAuthIcons) ? (
            <div className={styles.header__mobileActions}>
              <button
                className={styles.header__mobileIconButton}
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setMobileMenuOpen(false);
                }}
                aria-label="Notifications"
              >
                <Icon icon={FaBell} size={24} />
                {unreadWebCount > 0 && (
                  <span className={styles.header__notificationBadge}>
                    {unreadWebCount > 99 ? '99+' : unreadWebCount}
                  </span>
                )}
              </button>
              <button
                className={styles.header__mobileIconButton}
                onClick={() => {
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                aria-label="Profil"
              >
                <Icon icon={FaUser} size={24} />
              </button>
            </div>
          ) : (
            <div className={styles.header__mobileAuthButtons}>
                <Button
                  variant="primary"
                  size="md"
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                {t('auth.login')}
              </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                {t('auth.signup')}
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
