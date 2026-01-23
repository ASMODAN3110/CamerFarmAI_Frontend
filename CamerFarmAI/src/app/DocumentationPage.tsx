"use client"

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaInfoCircle,
  FaThermometerHalf,
  FaTint,
  FaCloud,
  FaWater,
  FaSun,
  FaSignal,
  FaServer,
  FaBook,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { TranslationKey } from '@/utils/translations';
import { IconType } from 'react-icons';
import styles from './DocumentationPage.module.css';

interface DocumentationSection {
  id: string;
  icon: IconType;
  key: TranslationKey;
}

export function DocumentationPage() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const sections: DocumentationSection[] = [
    { id: 'introduction', icon: FaInfoCircle, key: 'docs.sections.introduction' },
    { id: 'temperature', icon: FaThermometerHalf, key: 'docs.sections.temperature' },
    { id: 'soil-moisture', icon: FaTint, key: 'docs.sections.soilMoisture' },
    { id: 'co2', icon: FaCloud, key: 'docs.sections.co2' },
    { id: 'water-level', icon: FaWater, key: 'docs.sections.waterLevel' },
    { id: 'luminosity', icon: FaSun, key: 'docs.sections.luminosity' },
    { id: 'status', icon: FaSignal, key: 'docs.sections.status' },
    { id: 'api', icon: FaServer, key: 'docs.sections.api' },
  ];

  return (
    <>
      <Background3D />
      <Header currentPath="/docs" />
      <main className={styles.docsPage}>
        <div className={styles.docsPage__container}>
          <header className={styles.docsPage__header}>
            <h1 className={styles.docsPage__title}>
              <FaBook className={styles.docsPage__titleIcon} />
              {t('docs.title')}
            </h1>
            <p className={styles.docsPage__subtitle}>{t('docs.subtitle')}</p>
          </header>

          <div className={styles.docsPage__content}>
            <aside className={`${styles.docsPage__sidebar} ${mobileMenuOpen ? styles.docsPage__sidebarOpen : ''}`}>
              <div className={styles.docsPage__sidebarHeader}>
                <h2 className={styles.docsPage__tocTitle}>{t('docs.tableOfContents')}</h2>
                <button
                  className={styles.docsPage__mobileClose}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className={styles.docsPage__toc}>
                <ul className={styles.docsPage__tocList}>
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
                          className={styles.docsPage__tocLink}
                        >
                          <Icon className={styles.docsPage__tocIcon} />
                          {t(section.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <button
              className={styles.docsPage__mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            <div className={styles.docsPage__main}>
              {/* Section 1: Introduction */}
              <section id="introduction" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaInfoCircle className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.introduction')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.intro.title')}</h3>
                  <p>{t('docs.intro.content')}</p>
                </div>
              </section>

              {/* Section 2: Temperature */}
              <section id="temperature" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaThermometerHalf className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.temperature')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.temperature.title')}</h3>
                  <p>{t('docs.temperature.description')}</p>
                  <ul className={styles.docsPage__featureList}>
                    <li><strong>{t('docs.temperature.unit')}</strong></li>
                    <li>{t('docs.temperature.importance')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Soil Moisture */}
              <section id="soil-moisture" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaTint className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.soilMoisture')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.soilMoisture.title')}</h3>
                  <p>{t('docs.soilMoisture.description')}</p>
                  <ul className={styles.docsPage__featureList}>
                    <li><strong>{t('docs.soilMoisture.unit')}</strong></li>
                    <li>{t('docs.soilMoisture.importance')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 4: CO2 Level */}
              <section id="co2" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaCloud className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.co2')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.co2.title')}</h3>
                  <p>{t('docs.co2.description')}</p>
                  <ul className={styles.docsPage__featureList}>
                    <li><strong>{t('docs.co2.unit')}</strong></li>
                    <li>{t('docs.co2.importance')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 5: Water Level */}
              <section id="water-level" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaWater className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.waterLevel')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.waterLevel.title')}</h3>
                  <p>{t('docs.waterLevel.description')}</p>
                  <ul className={styles.docsPage__featureList}>
                    <li><strong>{t('docs.waterLevel.unit')}</strong></li>
                    <li>{t('docs.waterLevel.importance')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 6: Luminosity */}
              <section id="luminosity" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaSun className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.luminosity')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.luminosity.title')}</h3>
                  <p>{t('docs.luminosity.description')}</p>
                  <ul className={styles.docsPage__featureList}>
                    <li><strong>{t('docs.luminosity.unit')}</strong></li>
                    <li>{t('docs.luminosity.importance')}</li>
                  </ul>
                </div>
              </section>

              {/* Section 7: Status Management */}
              <section id="status" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaSignal className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.status')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.status.title')}</h3>
                  <p>{t('docs.status.description')}</p>
                  <div className={styles.docsPage__statusGrid}>
                    <div className={`${styles.docsPage__statusCard} ${styles.docsPage__statusActive}`}>
                      <span className={styles.docsPage__statusDot}></span>
                      <p>{t('docs.status.active')}</p>
                    </div>
                    <div className={`${styles.docsPage__statusCard} ${styles.docsPage__statusInactive}`}>
                      <span className={styles.docsPage__statusDot}></span>
                      <p>{t('docs.status.inactive')}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: API Integration */}
              <section id="api" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaServer className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.api')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.api.title')}</h3>
                  <p>{t('docs.api.description')}</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
