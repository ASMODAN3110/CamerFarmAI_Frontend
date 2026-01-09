"use client"

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaHome,
  FaCheckCircle,
  FaCog,
  FaUser,
  FaFileContract,
  FaExclamationTriangle,
  FaDoorOpen,
  FaEdit,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { TranslationKey } from '@/utils/translations';
import { IconType } from 'react-icons';
import styles from './TermsPage.module.css';

interface TermsSection {
  id: string;
  icon: IconType;
  key: TranslationKey;
}

export function TermsPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const sections: TermsSection[] = [
    { id: 'introduction', icon: FaHome, key: 'terms.sections.introduction' },
    { id: 'acceptance', icon: FaCheckCircle, key: 'terms.sections.acceptance' },
    { id: 'service-usage', icon: FaCog, key: 'terms.sections.serviceUsage' },
    { id: 'user-account', icon: FaUser, key: 'terms.sections.userAccount' },
    { id: 'intellectual-property', icon: FaFileContract, key: 'terms.sections.intellectualProperty' },
    { id: 'liability', icon: FaExclamationTriangle, key: 'terms.sections.liability' },
    { id: 'termination', icon: FaDoorOpen, key: 'terms.sections.termination' },
    { id: 'changes', icon: FaEdit, key: 'terms.sections.changes' },
    { id: 'contact', icon: FaEnvelope, key: 'terms.sections.contact' },
  ];

  return (
    <>
      <Background3D />
      <Header currentPath="/terms" />
      <main className={styles.termsPage}>
        <div className={styles.termsPage__container}>
          <header className={styles.termsPage__header}>
            <h1 className={styles.termsPage__title}>
              <FaFileContract className={styles.termsPage__titleIcon} />
              {t('terms.title')}
            </h1>
            <p className={styles.termsPage__subtitle}>{t('terms.subtitle')}</p>
          </header>

          <div className={styles.termsPage__content}>
            <aside className={`${styles.termsPage__sidebar} ${mobileMenuOpen ? styles.termsPage__sidebarOpen : ''}`}>
              <div className={styles.termsPage__sidebarHeader}>
                <h2 className={styles.termsPage__tocTitle}>{t('terms.tableOfContents')}</h2>
                <button
                  className={styles.termsPage__mobileClose}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className={styles.termsPage__toc}>
                <ul className={styles.termsPage__tocList}>
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
                          className={styles.termsPage__tocLink}
                        >
                          <Icon className={styles.termsPage__tocIcon} />
                          {t(section.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <button
              className={styles.termsPage__mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            <div className={styles.termsPage__main}>
              {/* Section 1: Introduction */}
              <section id="introduction" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaHome className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.introduction')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.introduction.content')}</p>
                  <p>{t('terms.introduction.lastUpdated')}</p>
                </div>
              </section>

              {/* Section 2: Acceptation des conditions */}
              <section id="acceptance" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaCheckCircle className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.acceptance')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.acceptance.content')}</p>
                  <ul>
                    <li>{t('terms.acceptance.item1')}</li>
                    <li>{t('terms.acceptance.item2')}</li>
                    <li>{t('terms.acceptance.item3')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Utilisation du service */}
              <section id="service-usage" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaCog className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.serviceUsage')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.serviceUsage.content')}</p>
                  <h3>{t('terms.serviceUsage.allowed.title')}</h3>
                  <ul>
                    <li>{t('terms.serviceUsage.allowed.item1')}</li>
                    <li>{t('terms.serviceUsage.allowed.item2')}</li>
                    <li>{t('terms.serviceUsage.allowed.item3')}</li>
                    <li>{t('terms.serviceUsage.allowed.item4')}</li>
                  </ul>
                  <h3>{t('terms.serviceUsage.prohibited.title')}</h3>
                  <ul>
                    <li>{t('terms.serviceUsage.prohibited.item1')}</li>
                    <li>{t('terms.serviceUsage.prohibited.item2')}</li>
                    <li>{t('terms.serviceUsage.prohibited.item3')}</li>
                    <li>{t('terms.serviceUsage.prohibited.item4')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Compte utilisateur */}
              <section id="user-account" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaUser className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.userAccount')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.userAccount.content')}</p>
                  <h3>{t('terms.userAccount.responsibility.title')}</h3>
                  <ul>
                    <li>{t('terms.userAccount.responsibility.item1')}</li>
                    <li>{t('terms.userAccount.responsibility.item2')}</li>
                    <li>{t('terms.userAccount.responsibility.item3')}</li>
                  </ul>
                  <h3>{t('terms.userAccount.security.title')}</h3>
                  <p>{t('terms.userAccount.security.content')}</p>
                </div>
              </section>

              {/* Section 5: Propriété intellectuelle */}
              <section id="intellectual-property" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaFileContract className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.intellectualProperty')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.intellectualProperty.content')}</p>
                  <h3>{t('terms.intellectualProperty.ownership.title')}</h3>
                  <p>{t('terms.intellectualProperty.ownership.content')}</p>
                  <h3>{t('terms.intellectualProperty.userContent.title')}</h3>
                  <p>{t('terms.intellectualProperty.userContent.content')}</p>
                </div>
              </section>

              {/* Section 6: Limitation de responsabilité */}
              <section id="liability" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaExclamationTriangle className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.liability')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.liability.content')}</p>
                  <ul>
                    <li>{t('terms.liability.item1')}</li>
                    <li>{t('terms.liability.item2')}</li>
                    <li>{t('terms.liability.item3')}</li>
                    <li>{t('terms.liability.item4')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 7: Résiliation */}
              <section id="termination" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaDoorOpen className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.termination')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.termination.content')}</p>
                  <h3>{t('terms.termination.user.title')}</h3>
                  <p>{t('terms.termination.user.content')}</p>
                  <h3>{t('terms.termination.service.title')}</h3>
                  <p>{t('terms.termination.service.content')}</p>
                </div>
              </section>

              {/* Section 8: Modifications */}
              <section id="changes" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaEdit className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.changes')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.changes.content')}</p>
                </div>
              </section>

              {/* Section 9: Contact */}
              <section id="contact" className={styles.termsPage__section}>
                <h2 className={styles.termsPage__sectionTitle}>
                  <FaEnvelope className={styles.termsPage__sectionIcon} />
                  {t('terms.sections.contact')}
                </h2>
                <div className={styles.termsPage__sectionContent}>
                  <p>{t('terms.contact.content')}</p>
                  <p>
                    <strong>{t('terms.contact.email')}</strong>
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

