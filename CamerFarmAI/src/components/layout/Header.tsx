import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { FaBars, FaTimes, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '@/services/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import logoIcon from '@/assets/logo.png';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface Notification {
  id: number;
  message: string;
  time: string;
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
  const logout = useAuthStore((s) => s.logout);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Détection mobile
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 900);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Notifications d'exemple (à remplacer par de vraies données)
  const notifications: Notification[] = [];

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
                    {notifications.length > 0 && (
                      <span className={styles.header__notificationBadge} />
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
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div key={notif.id} className={styles.header__notificationItem}>
                              <div className={styles.header__notificationMessage}>{notif.message}</div>
                              <div className={styles.header__notificationTime}>{notif.time}</div>
                            </div>
                          ))
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
                {notifications.length > 0 && (
                  <span className={styles.header__notificationBadge} />
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
