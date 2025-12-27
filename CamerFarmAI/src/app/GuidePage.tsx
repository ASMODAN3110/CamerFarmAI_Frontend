import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  FaBook,
  FaUser,
  FaSeedling,
  FaChartLine,
  FaBell,
  FaRobot,
  FaGlobe,
  FaSignInAlt,
  FaUserPlus,
  FaShieldAlt,
  FaCog,
  FaEye,
  FaEdit,
  FaTachometerAlt,
  FaSlidersH,
  FaHistory,
  FaComments
} from 'react-icons/fa';
import styles from './GuidePage.module.css';

export function GuidePage() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Background3D />
      <Header currentPath="/guide" />
      <main className={styles.guidePage}>
        <div className={styles.guidePage__container}>
          <header className={styles.guidePage__header}>
            <h1 className={styles.guidePage__title}>
              <FaBook className={styles.guidePage__titleIcon} />
              {t('guide.title')}
            </h1>
            <p className={styles.guidePage__subtitle}>{t('guide.subtitle')}</p>
          </header>

          <div className={styles.guidePage__content}>
            <aside className={styles.guidePage__sidebar}>
              <nav className={styles.guidePage__toc}>
                <h2 className={styles.guidePage__tocTitle}>{t('guide.tableOfContents.title')}</h2>
                <ul className={styles.guidePage__tocList}>
                  <li>
                    <a 
                      href="#introduction" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.introduction')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#quick-start" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('quick-start'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.quickStart')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#authentication" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('authentication'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.authentication')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#profile" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('profile'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.profile')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#plantations" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('plantations'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.plantations')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#monitoring" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('monitoring'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.monitoring')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#graphs" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('graphs'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.graphs')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#notifications" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('notifications'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.notifications')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#ai" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('ai'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.ai')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#language" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('language'); }}
                      className={styles.guidePage__tocLink}
                    >
                      {t('guide.tableOfContents.language')}
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            <div className={styles.guidePage__main}>
              {/* Introduction */}
              <section id="introduction" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaBook className={styles.guidePage__sectionIcon} />
                  {t('guide.introduction.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.introduction.description')}</p>
                  <ul className={styles.guidePage__featureList}>
                    <li>{t('guide.introduction.feature1')}</li>
                    <li>{t('guide.introduction.feature2')}</li>
                    <li>{t('guide.introduction.feature3')}</li>
                    <li>{t('guide.introduction.feature4')}</li>
                  </ul>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaSignInAlt className={styles.guidePage__sectionIcon} />
                  {t('guide.quickStart.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaUserPlus className={styles.guidePage__subsectionIcon} />
                    {t('guide.quickStart.signup.title')}
                  </h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.quickStart.signup.step1')}</li>
                    <li>{t('guide.quickStart.signup.step2')}</li>
                    <li>{t('guide.quickStart.signup.step3')}</li>
                    <li>{t('guide.quickStart.signup.step4')}</li>
                  </ol>

                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaSignInAlt className={styles.guidePage__subsectionIcon} />
                    {t('guide.quickStart.login.title')}
                  </h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.quickStart.login.step1')}</li>
                    <li>{t('guide.quickStart.login.step2')}</li>
                    <li>{t('guide.quickStart.login.step3')}</li>
                  </ol>
                </div>
              </section>

              {/* Authentication */}
              <section id="authentication" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaShieldAlt className={styles.guidePage__sectionIcon} />
                  {t('guide.auth.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.auth.twoFactor.title')}</h3>
                  <p>{t('guide.auth.twoFactor.description')}</p>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.auth.twoFactor.step1')}</li>
                    <li>{t('guide.auth.twoFactor.step2')}</li>
                    <li>{t('guide.auth.twoFactor.step3')}</li>
                    <li>{t('guide.auth.twoFactor.step4')}</li>
                  </ol>
                  <div className={styles.guidePage__infoBox}>
                    <strong>{t('guide.auth.twoFactor.tip')}</strong>
                  </div>
                </div>
              </section>

              {/* Profile */}
              <section id="profile" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaUser className={styles.guidePage__sectionIcon} />
                  {t('guide.profile.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaEdit className={styles.guidePage__subsectionIcon} />
                    {t('guide.profile.edit.title')}
                  </h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.profile.edit.step1')}</li>
                    <li>{t('guide.profile.edit.step2')}</li>
                    <li>{t('guide.profile.edit.step3')}</li>
                    <li>{t('guide.profile.edit.step4')}</li>
                  </ol>

                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaCog className={styles.guidePage__subsectionIcon} />
                    {t('guide.profile.photo.title')}
                  </h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.profile.photo.step1')}</li>
                    <li>{t('guide.profile.photo.step2')}</li>
                    <li>{t('guide.profile.photo.step3')}</li>
                  </ol>
                </div>
              </section>

              {/* Plantations */}
              <section id="plantations" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaSeedling className={styles.guidePage__sectionIcon} />
                  {t('guide.plantations.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaEdit className={styles.guidePage__subsectionIcon} />
                    {t('guide.plantations.create.title')}
                  </h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.plantations.create.step1')}</li>
                    <li>{t('guide.plantations.create.step2')}</li>
                    <li>{t('guide.plantations.create.step3')}</li>
                    <li>{t('guide.plantations.create.step4')}</li>
                  </ol>

                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaEye className={styles.guidePage__subsectionIcon} />
                    {t('guide.plantations.view.title')}
                  </h3>
                  <p>{t('guide.plantations.view.description')}</p>
                  <ul className={styles.guidePage__featureList}>
                    <li>{t('guide.plantations.view.feature1')}</li>
                    <li>{t('guide.plantations.view.feature2')}</li>
                    <li>{t('guide.plantations.view.feature3')}</li>
                  </ul>
                </div>
              </section>

              {/* Monitoring */}
              <section id="monitoring" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaTachometerAlt className={styles.guidePage__sectionIcon} />
                  {t('guide.monitoring.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.monitoring.description')}</p>
                  
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.monitoring.sensors.title')}</h3>
                  <p>{t('guide.monitoring.sensors.description')}</p>
                  <ul className={styles.guidePage__featureList}>
                    <li>{t('guide.monitoring.sensors.temperature')}</li>
                    <li>{t('guide.monitoring.sensors.soilHumidity')}</li>
                    <li>{t('guide.monitoring.sensors.co2')}</li>
                    <li>{t('guide.monitoring.sensors.waterLevel')}</li>
                    <li>{t('guide.monitoring.sensors.luminosity')}</li>
                  </ul>

                  <h3 className={styles.guidePage__subsectionTitle}>
                    <FaSlidersH className={styles.guidePage__subsectionIcon} />
                    {t('guide.monitoring.thresholds.title')}
                  </h3>
                  <p>{t('guide.monitoring.thresholds.description')}</p>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.monitoring.thresholds.step1')}</li>
                    <li>{t('guide.monitoring.thresholds.step2')}</li>
                    <li>{t('guide.monitoring.thresholds.step3')}</li>
                  </ol>

                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.monitoring.actuators.title')}</h3>
                  <p>{t('guide.monitoring.actuators.description')}</p>
                  <ul className={styles.guidePage__featureList}>
                    <li>{t('guide.monitoring.actuators.irrigation')}</li>
                    <li>{t('guide.monitoring.actuators.fans')}</li>
                    <li>{t('guide.monitoring.actuators.lighting')}</li>
                  </ul>
                </div>
              </section>

              {/* Graphs */}
              <section id="graphs" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaChartLine className={styles.guidePage__sectionIcon} />
                  {t('guide.graphs.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.graphs.description')}</p>
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.graphs.filters.title')}</h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.graphs.filters.step1')}</li>
                    <li>{t('guide.graphs.filters.step2')}</li>
                    <li>{t('guide.graphs.filters.step3')}</li>
                  </ol>
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.graphs.sensors.title')}</h3>
                  <p>{t('guide.graphs.sensors.description')}</p>
                </div>
              </section>

              {/* Notifications */}
              <section id="notifications" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaBell className={styles.guidePage__sectionIcon} />
                  {t('guide.notifications.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.notifications.description')}</p>
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.notifications.management.title')}</h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.notifications.management.step1')}</li>
                    <li>{t('guide.notifications.management.step2')}</li>
                    <li>{t('guide.notifications.management.step3')}</li>
                  </ol>
                </div>
              </section>

              {/* AI Chatbot */}
              <section id="ai" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaRobot className={styles.guidePage__sectionIcon} />
                  {t('guide.ai.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.ai.description')}</p>
                  <h3 className={styles.guidePage__subsectionTitle}>{t('guide.ai.usage.title')}</h3>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.ai.usage.step1')}</li>
                    <li>{t('guide.ai.usage.step2')}</li>
                    <li>{t('guide.ai.usage.step3')}</li>
                  </ol>
                  <div className={styles.guidePage__infoBox}>
                    <strong>{t('guide.ai.tip')}</strong>
                  </div>
                </div>
              </section>

              {/* Language */}
              <section id="language" className={styles.guidePage__section}>
                <h2 className={styles.guidePage__sectionTitle}>
                  <FaGlobe className={styles.guidePage__sectionIcon} />
                  {t('guide.language.title')}
                </h2>
                <div className={styles.guidePage__sectionContent}>
                  <p>{t('guide.language.description')}</p>
                  <ol className={styles.guidePage__stepList}>
                    <li>{t('guide.language.step1')}</li>
                    <li>{t('guide.language.step2')}</li>
                    <li>{t('guide.language.step3')}</li>
                  </ol>
                  <ul className={styles.guidePage__featureList}>
                    <li>{t('guide.language.option1')}</li>
                    <li>{t('guide.language.option2')}</li>
                    <li>{t('guide.language.option3')}</li>
                    <li>{t('guide.language.option4')}</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButton
        href="/ai"
        position="bottom-right"
        aria-label={t('floatingButton.ariaLabel')}
      />
    </>
  );
}

