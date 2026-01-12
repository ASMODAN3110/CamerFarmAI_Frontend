"use client"

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaHome,
  FaDatabase,
  FaSync,
  FaHandshake,
  FaShieldAlt,
  FaBalanceScale,
  FaCookie,
  FaEdit,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { TranslationKey } from '@/utils/translations';
import { IconType } from 'react-icons';
import styles from './PrivacyPage.module.css';

interface PrivacySection {
  id: string;
  icon: IconType;
  key: TranslationKey;
}

export function PrivacyPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const sections: PrivacySection[] = [
    { id: 'introduction', icon: FaHome, key: 'privacy.sections.introduction' },
    { id: 'data-collection', icon: FaDatabase, key: 'privacy.sections.dataCollection' },
    { id: 'data-usage', icon: FaSync, key: 'privacy.sections.dataUsage' },
    { id: 'data-sharing', icon: FaHandshake, key: 'privacy.sections.dataSharing' },
    { id: 'data-security', icon: FaShieldAlt, key: 'privacy.sections.dataSecurity' },
    { id: 'your-rights', icon: FaBalanceScale, key: 'privacy.sections.yourRights' },
    { id: 'cookies', icon: FaCookie, key: 'privacy.sections.cookies' },
    { id: 'changes', icon: FaEdit, key: 'privacy.sections.changes' },
    { id: 'contact', icon: FaEnvelope, key: 'privacy.sections.contact' },
  ];

  return (
    <>
      <Background3D />
      <Header currentPath="/privacy" />
      <main className={styles.privacyPage}>
        <div className={styles.privacyPage__container}>
          <header className={styles.privacyPage__header}>
            <h1 className={styles.privacyPage__title}>
              <FaShieldAlt className={styles.privacyPage__titleIcon} />
              {t('privacy.title')}
            </h1>
            <p className={styles.privacyPage__subtitle}>{t('privacy.subtitle')}</p>
          </header>

          <div className={styles.privacyPage__content}>
            <aside className={`${styles.privacyPage__sidebar} ${mobileMenuOpen ? styles.privacyPage__sidebarOpen : ''}`}>
              <div className={styles.privacyPage__sidebarHeader}>
                <h2 className={styles.privacyPage__tocTitle}>{t('privacy.tableOfContents')}</h2>
                <button
                  className={styles.privacyPage__mobileClose}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className={styles.privacyPage__toc}>
                <ul className={styles.privacyPage__tocList}>
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
                          className={styles.privacyPage__tocLink}
                        >
                          <Icon className={styles.privacyPage__tocIcon} />
                          {t(section.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <button
              className={styles.privacyPage__mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            <div className={styles.privacyPage__main}>
              {/* Section 1: Introduction */}
              <section id="introduction" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaHome className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.introduction')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.introduction.content')}</p>
                  <p>{t('privacy.introduction.lastUpdated')}</p>
                </div>
              </section>

              {/* Section 2: Collecte de données */}
              <section id="data-collection" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaDatabase className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.dataCollection')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <h3>{t('privacy.dataCollection.personalData.title')}</h3>
                  <p>{t('privacy.dataCollection.personalData.content')}</p>
                  <ul>
                    <li>{t('privacy.dataCollection.personalData.item1')}</li>
                    <li>{t('privacy.dataCollection.personalData.item2')}</li>
                    <li>{t('privacy.dataCollection.personalData.item3')}</li>
                    <li>{t('privacy.dataCollection.personalData.item4')}</li>
                    <li>{t('privacy.dataCollection.personalData.item5')}</li>
                  </ul>

                  <h3>{t('privacy.dataCollection.usageData.title')}</h3>
                  <p>{t('privacy.dataCollection.usageData.content')}</p>
                  <ul>
                    <li>{t('privacy.dataCollection.usageData.item1')}</li>
                    <li>{t('privacy.dataCollection.usageData.item2')}</li>
                    <li>{t('privacy.dataCollection.usageData.item3')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Utilisation des données */}
              <section id="data-usage" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaSync className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.dataUsage')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.dataUsage.content')}</p>
                  <ul>
                    <li>{t('privacy.dataUsage.item1')}</li>
                    <li>{t('privacy.dataUsage.item2')}</li>
                    <li>{t('privacy.dataUsage.item3')}</li>
                    <li>{t('privacy.dataUsage.item4')}</li>
                    <li>{t('privacy.dataUsage.item5')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Partage des données */}
              <section id="data-sharing" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaHandshake className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.dataSharing')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.dataSharing.content')}</p>
                  <h3>{t('privacy.dataSharing.thirdParties.title')}</h3>
                  <p>{t('privacy.dataSharing.thirdParties.content')}</p>
                  <h3>{t('privacy.dataSharing.legal.title')}</h3>
                  <p>{t('privacy.dataSharing.legal.content')}</p>
                </div>
              </section>

              {/* Section 5: Sécurité des données */}
              <section id="data-security" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaShieldAlt className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.dataSecurity')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.dataSecurity.content')}</p>
                  <ul>
                    <li>{t('privacy.dataSecurity.item1')}</li>
                    <li>{t('privacy.dataSecurity.item2')}</li>
                    <li>{t('privacy.dataSecurity.item3')}</li>
                    <li>{t('privacy.dataSecurity.item4')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 6: Vos droits */}
              <section id="your-rights" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaBalanceScale className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.yourRights')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.yourRights.content')}</p>
                  <ul>
                    <li>{t('privacy.yourRights.item1')}</li>
                    <li>{t('privacy.yourRights.item2')}</li>
                    <li>{t('privacy.yourRights.item3')}</li>
                    <li>{t('privacy.yourRights.item4')}</li>
                    <li>{t('privacy.yourRights.item5')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 7: Cookies */}
              <section id="cookies" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaCookie className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.cookies')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.cookies.content')}</p>
                  <h3>{t('privacy.cookies.types.title')}</h3>
                  <p>{t('privacy.cookies.types.content')}</p>
                  <h3>{t('privacy.cookies.management.title')}</h3>
                  <p>{t('privacy.cookies.management.content')}</p>
                </div>
              </section>

              {/* Section 8: Modifications */}
              <section id="changes" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaEdit className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.changes')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.changes.content')}</p>
                </div>
              </section>

              {/* Section 9: Contact */}
              <section id="contact" className={styles.privacyPage__section}>
                <h2 className={styles.privacyPage__sectionTitle}>
                  <FaEnvelope className={styles.privacyPage__sectionIcon} />
                  {t('privacy.sections.contact')}
                </h2>
                <div className={styles.privacyPage__sectionContent}>
                  <p>{t('privacy.contact.content')}</p>
                  <p>
                    <strong>{t('privacy.contact.email')}</strong>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

