"use client"

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaHome,
  FaCookie,
  FaCog,
  FaSlidersH,
  FaHandshake,
  FaEdit,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useCookiePreferences } from '@/contexts/CookieContext';
import { CookiePreferencesModal } from '@/components/cookies/CookiePreferencesModal';
import { Button } from '@/components/ui/Button/Button';
import styles from './CookiesPage.module.css';

export function CookiesPage() {
  const { t } = useTranslation();
  const { preferences } = useCookiePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const sections = [
    { id: 'introduction', icon: FaHome, key: 'cookies.sections.introduction' },
    { id: 'types', icon: FaCookie, key: 'cookies.sections.types' },
    { id: 'usage', icon: FaCog, key: 'cookies.sections.usage' },
    { id: 'management', icon: FaSlidersH, key: 'cookies.sections.management' },
    { id: 'third-party', icon: FaHandshake, key: 'cookies.sections.thirdParty' },
    { id: 'changes', icon: FaEdit, key: 'cookies.sections.changes' },
    { id: 'contact', icon: FaEnvelope, key: 'cookies.sections.contact' },
  ];

  return (
    <>
      <Background3D />
      <Header currentPath="/cookies" />
      <main className={styles.cookiesPage}>
        <div className={styles.cookiesPage__container}>
          <header className={styles.cookiesPage__header}>
            <h1 className={styles.cookiesPage__title}>
              <FaCookie className={styles.cookiesPage__titleIcon} />
              {t('cookies.title')}
            </h1>
            <p className={styles.cookiesPage__subtitle}>{t('cookies.subtitle')}</p>
          </header>

          <div className={styles.cookiesPage__content}>
            <aside className={`${styles.cookiesPage__sidebar} ${mobileMenuOpen ? styles.cookiesPage__sidebarOpen : ''}`}>
              <div className={styles.cookiesPage__sidebarHeader}>
                <h2 className={styles.cookiesPage__tocTitle}>{t('cookies.tableOfContents')}</h2>
                <button
                  className={styles.cookiesPage__mobileClose}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className={styles.cookiesPage__toc}>
                <ul className={styles.cookiesPage__tocList}>
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(section.id);
                          }}
                          className={styles.cookiesPage__tocLink}
                        >
                          <Icon className={styles.cookiesPage__tocIcon} />
                          {t(section.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <button
              className={styles.cookiesPage__mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            <div className={styles.cookiesPage__main}>
              {/* Section 1: Introduction */}
              <section id="introduction" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaHome className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.introduction')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.introduction.content')}</p>
                  <p>{t('cookies.introduction.lastUpdated')}</p>
                </div>
              </section>

              {/* Section 2: Types de cookies */}
              <section id="types" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaCookie className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.types')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <h3>{t('cookies.types.essential.title')}</h3>
                  <p>{t('cookies.types.essential.content')}</p>
                  
                  <h3>{t('cookies.types.analytical.title')}</h3>
                  <p>{t('cookies.types.analytical.content')}</p>
                  
                  <h3>{t('cookies.types.functional.title')}</h3>
                  <p>{t('cookies.types.functional.content')}</p>
                  
                  <h3>{t('cookies.types.marketing.title')}</h3>
                  <p>{t('cookies.types.marketing.content')}</p>
                </div>
              </section>

              {/* Section 3: Utilisation des cookies */}
              <section id="usage" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaCog className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.usage')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.usage.content')}</p>
                  <ul>
                    <li>{t('cookies.usage.item1')}</li>
                    <li>{t('cookies.usage.item2')}</li>
                    <li>{t('cookies.usage.item3')}</li>
                    <li>{t('cookies.usage.item4')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Gestion des cookies */}
              <section id="management" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaSlidersH className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.management')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.management.content')}</p>
                  
                  <h3>{t('cookies.management.currentPreferences')}</h3>
                  <div className={styles.cookiesPage__preferencesStatus}>
                    <p>
                      <strong>{t('cookies.preferences.essential.label')}:</strong> {preferences.essential ? t('cookies.preferences.enabled') : t('cookies.preferences.disabled')}
                    </p>
                    <p>
                      <strong>{t('cookies.preferences.analytical.label')}:</strong> {preferences.analytical ? t('cookies.preferences.enabled') : t('cookies.preferences.disabled')}
                    </p>
                    <p>
                      <strong>{t('cookies.preferences.functional.label')}:</strong> {preferences.functional ? t('cookies.preferences.enabled') : t('cookies.preferences.disabled')}
                    </p>
                    <p>
                      <strong>{t('cookies.preferences.marketing.label')}:</strong> {preferences.marketing ? t('cookies.preferences.enabled') : t('cookies.preferences.disabled')}
                    </p>
                  </div>
                  
                  <div className={styles.cookiesPage__manageButtonContainer}>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setIsPreferencesModalOpen(true)}
                    >
                      {t('cookies.management.manageButton')}
                    </Button>
                  </div>
                  
                  <h3>{t('cookies.management.browser.title')}</h3>
                  <p>{t('cookies.management.browser.content')}</p>
                  <h3>{t('cookies.management.impact.title')}</h3>
                  <p>{t('cookies.management.impact.content')}</p>
                </div>
              </section>

              {/* Section 5: Cookies tiers */}
              <section id="third-party" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaHandshake className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.thirdParty')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.thirdParty.content')}</p>
                  <h3>{t('cookies.thirdParty.services.title')}</h3>
                  <p>{t('cookies.thirdParty.services.content')}</p>
                </div>
              </section>

              {/* Section 6: Modifications */}
              <section id="changes" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaEdit className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.changes')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.changes.content')}</p>
                </div>
              </section>

              {/* Section 7: Contact */}
              <section id="contact" className={styles.cookiesPage__section}>
                <h2 className={styles.cookiesPage__sectionTitle}>
                  <FaEnvelope className={styles.cookiesPage__sectionIcon} />
                  {t('cookies.sections.contact')}
                </h2>
                <div className={styles.cookiesPage__sectionContent}>
                  <p>{t('cookies.contact.content')}</p>
                  <p>
                    <strong>{t('cookies.contact.email')}</strong>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <CookiePreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
      />
    </>
  );
}

