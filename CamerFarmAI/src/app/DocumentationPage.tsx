"use client"

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaHome,
  FaCode,
  FaPlug,
  FaPuzzlePiece,
  FaAnchor,
  FaGlobe,
  FaFileAlt,
  FaServer,
  FaLanguage,
  FaTools,
  FaBook,
  FaRocket,
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
    { id: 'introduction', icon: FaHome, key: 'docs.sections.introduction' },
    { id: 'architecture', icon: FaCode, key: 'docs.sections.architecture' },
    { id: 'services', icon: FaPlug, key: 'docs.sections.services' },
    { id: 'components', icon: FaPuzzlePiece, key: 'docs.sections.components' },
    { id: 'hooks', icon: FaAnchor, key: 'docs.sections.hooks' },
    { id: 'contexts', icon: FaGlobe, key: 'docs.sections.contexts' },
    { id: 'pages', icon: FaFileAlt, key: 'docs.sections.pages' },
    { id: 'api', icon: FaServer, key: 'docs.sections.api' },
    { id: 'i18n', icon: FaLanguage, key: 'docs.sections.i18n' },
    { id: 'utils', icon: FaTools, key: 'docs.sections.utils' },
    { id: 'dev-guide', icon: FaBook, key: 'docs.sections.devGuide' },
    { id: 'deployment', icon: FaRocket, key: 'docs.sections.deployment' },
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
                  <FaHome className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.introduction')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.introduction.overview.title')}</h3>
                  <p>{t('docs.introduction.overview.content')}</p>

                  <h3>{t('docs.introduction.tech.title')}</h3>
                  <ul>
                    <li><strong>React 19</strong> - Bibliothèque UI moderne avec hooks et contexte</li>
                    <li><strong>TypeScript</strong> - Typage statique pour une meilleure maintenabilité</li>
                    <li><strong>Vite</strong> - Build tool rapide et moderne</li>
                    <li><strong>React Router</strong> - Routage côté client</li>
                    <li><strong>Axios</strong> - Client HTTP pour les appels API</li>
                    <li><strong>Zustand</strong> - Gestion d'état légère</li>
                    <li><strong>Recharts</strong> - Bibliothèque de graphiques React</li>
                    <li><strong>React Three Fiber</strong> - Rendu 3D pour les visualisations</li>
                  </ul>

                  <h3>{t('docs.introduction.architecture.title')}</h3>
                  <p>{t('docs.introduction.architecture.content')}</p>

                  <h3>{t('docs.introduction.prerequisites.title')}</h3>
                  <ul>
                    <li>Node.js (version 18 ou supérieure)</li>
                    <li>npm ou yarn</li>
                    <li>Backend API accessible (par défaut : `http://localhost:3000/api/v1`)</li>
                  </ul>

                  <h3>{t('docs.introduction.installation.title')}</h3>
                  <pre className={styles.docsPage__codeBlock}>
                    <code>{`# Cloner le dépôt
git clone <repository-url>
cd CamerFarmAI

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env à la racine :
VITE_API_URL=http://localhost:3000/api/v1

# Lancer le serveur de développement
npm run dev`}</code>
                  </pre>
                </div>
              </section>

              {/* Section 2: Architecture */}
              <section id="architecture" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaCode className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.architecture')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.architecture.structure.title')}</h3>
                  <pre className={styles.docsPage__codeBlock}>
                    <code>{`src/
├── app/                    # Pages de l'application
├── components/             # Composants réutilisables
│   ├── auth/              # Composants d'authentification
│   ├── layout/            # Layout (Header, Footer)
│   ├── blocks/            # Blocs de contenu
│   └── ui/                # Composants UI
├── services/              # Services API
├── hooks/                 # Hooks personnalisés
├── contexts/              # Contextes React
├── utils/                 # Utilitaires
├── styles/                # Styles globaux
└── types/                 # Types TypeScript`}</code>
                  </pre>

                  <h3>{t('docs.architecture.patterns.title')}</h3>
                  <ul>
                    <li><strong>Component-Based Architecture</strong> - Composants réutilisables et modulaires</li>
                    <li><strong>Service Layer</strong> - Séparation des appels API dans des services dédiés</li>
                    <li><strong>Context API</strong> - Gestion de l'état global (Auth, Language, Notifications)</li>
                    <li><strong>Custom Hooks</strong> - Logique réutilisable encapsulée dans des hooks</li>
                    <li><strong>CSS Modules</strong> - Styles encapsulés par composant</li>
                  </ul>

                  <h3>{t('docs.architecture.dataFlow.title')}</h3>
                  <p>{t('docs.architecture.dataFlow.content')}</p>
                </div>
              </section>

              {/* Section 3: Services API */}
              <section id="services" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaPlug className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.services')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.services.config.title')}</h3>
                  <p>{t('docs.services.config.content')}</p>
                  <p><strong>Fichier:</strong> <code>src/services/api.ts</code></p>

                  <h3>{t('docs.services.auth.title')}</h3>
                  <p><strong>Fichier:</strong> <code>src/services/authService.ts</code></p>
                  <p>{t('docs.services.auth.description')}</p>

                  <h3>{t('docs.services.plantation.title')}</h3>
                  <p><strong>Fichier:</strong> <code>src/services/plantationService.ts</code></p>
                  <p>{t('docs.services.plantation.description')}</p>

                  <h3>{t('docs.services.technician.title')}</h3>
                  <p><strong>Fichier:</strong> <code>src/services/technicianService.ts</code></p>
                  <p>{t('docs.services.technician.description')}</p>

                  <h3>{t('docs.services.notification.title')}</h3>
                  <p><strong>Fichier:</strong> <code>src/services/notificationService.ts</code></p>
                  <p>{t('docs.services.notification.description')}</p>

                  <h3>{t('docs.services.errors.title')}</h3>
                  <p>{t('docs.services.errors.content')}</p>

                  <h3>{t('docs.services.refresh.title')}</h3>
                  <p>{t('docs.services.refresh.content')}</p>
                </div>
              </section>

              {/* Section 4: Composants */}
              <section id="components" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaPuzzlePiece className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.components')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.components.auth.title')}</h3>
                  <p><strong>Dossier:</strong> <code>src/components/auth/</code></p>
                  <ul>
                    <li><code>ProtectedRoute.tsx</code> - Route nécessitant une authentification</li>
                    <li><code>PublicRoute.tsx</code> - Route publique (redirige si authentifié)</li>
                    <li><code>RoleBasedRoute.tsx</code> - Route basée sur les rôles (farmer, technician, admin)</li>
                  </ul>

                  <h3>{t('docs.components.ui.title')}</h3>
                  <p><strong>Dossier:</strong> <code>src/components/ui/</code></p>
                  <ul>
                    <li><code>Button/</code> - Bouton réutilisable</li>
                    <li><code>Card/</code> - Carte de contenu</li>
                    <li><code>Modal/</code> - Modal dialog</li>
                    <li><code>FormField/</code> - Champ de formulaire</li>
                    <li><code>Dropdown/</code> - Menu déroulant</li>
                    <li><code>LanguageSwitcher/</code> - Sélecteur de langue</li>
                    <li><code>FloatingButton/</code> - Bouton flottant</li>
                    <li><code>CreatePlantationModal/</code> - Modal de création de plantation</li>
                    <li><code>TwoFactorModal/</code> - Modal d'authentification à deux facteurs</li>
                  </ul>

                  <h3>{t('docs.components.layout.title')}</h3>
                  <p><strong>Dossier:</strong> <code>src/components/layout/</code></p>
                  <ul>
                    <li><code>Header.tsx</code> - En-tête de l'application avec navigation</li>
                    <li><code>Footer.tsx</code> - Pied de page avec liens</li>
                  </ul>
                </div>
              </section>

              {/* Section 5: Hooks */}
              <section id="hooks" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaAnchor className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.hooks')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3><code>useTranslation</code></h3>
                  <p><strong>Fichier:</strong> <code>src/hooks/useTranslation.ts</code></p>
                  <p>{t('docs.hooks.translation.description')}</p>

                  <h3><code>useLanguage</code></h3>
                  <p><strong>Fichier:</strong> <code>src/hooks/useLanguage.ts</code></p>
                  <p>{t('docs.hooks.language.description')}</p>

                  <h3><code>useNotifications</code></h3>
                  <p><strong>Fichier:</strong> <code>src/hooks/useNotifications.ts</code></p>
                  <p>{t('docs.hooks.notifications.description')}</p>

                  <h3><code>useEnrichedNotifications</code></h3>
                  <p><strong>Fichier:</strong> <code>src/hooks/useEnrichedNotifications.ts</code></p>
                  <p>{t('docs.hooks.enrichedNotifications.description')}</p>

                  <h3><code>useScrollAnimation</code></h3>
                  <p><strong>Fichier:</strong> <code>src/hooks/useScrollAnimation.ts</code></p>
                  <p>{t('docs.hooks.scroll.description')}</p>
                </div>
              </section>

              {/* Section 6: Contextes */}
              <section id="contexts" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaGlobe className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.contexts')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3><code>AuthContext</code></h3>
                  <p><strong>Fichier:</strong> <code>src/contexts/AuthContext.tsx</code></p>
                  <p>{t('docs.contexts.auth.description')}</p>

                  <h3><code>LanguageContext</code></h3>
                  <p><strong>Fichier:</strong> <code>src/contexts/LanguageContext.tsx</code></p>
                  <p>{t('docs.contexts.language.description')}</p>

                  <h3><code>NotificationContext</code></h3>
                  <p><strong>Fichier:</strong> <code>src/contexts/NotificationContext.tsx</code></p>
                  <p>{t('docs.contexts.notification.description')}</p>
                </div>
              </section>

              {/* Section 7: Pages */}
              <section id="pages" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaFileAlt className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.pages')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.pages.list.title')}</h3>
                  <ul>
                    <li><code>HomePage.tsx</code> - Page d'accueil</li>
                    <li><code>LoginPage.tsx</code> - Page de connexion</li>
                    <li><code>SignUpPage.tsx</code> - Page d'inscription</li>
                    <li><code>ProfilePage.tsx</code> - Page de profil utilisateur</li>
                    <li><code>ListPlantationsPage.tsx</code> - Liste des plantations</li>
                    <li><code>PlantationDetailPage.tsx</code> - Détails d'une plantation</li>
                    <li><code>MonitoringPage.tsx</code> - Monitoring en temps réel</li>
                    <li><code>GraphsPage.tsx</code> - Graphiques et statistiques</li>
                    <li><code>ChatboxPage.tsx</code> - Chatbot IA</li>
                    <li><code>TechnicianDashboardPage.tsx</code> - Dashboard technicien</li>
                    <li><code>GuidePage.tsx</code> - Guide utilisateur</li>
                  </ul>

                  <h3>{t('docs.pages.routes.title')}</h3>
                  <p>{t('docs.pages.routes.content')}</p>

                  <h3>{t('docs.pages.protection.title')}</h3>
                  <p>{t('docs.pages.protection.content')}</p>
                </div>
              </section>

              {/* Section 8: API Backend */}
              <section id="api" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaServer className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.api')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.api.endpoints.title')}</h3>
                  <p>{t('docs.api.endpoints.content')}</p>

                  <h3>{t('docs.api.auth.title')}</h3>
                  <ul>
                    <li><code>POST /auth/register</code> - Inscription</li>
                    <li><code>POST /auth/login</code> - Connexion</li>
                    <li><code>POST /auth/logout</code> - Déconnexion</li>
                    <li><code>GET /auth/me</code> - Récupération du profil</li>
                    <li><code>PUT /auth/profile</code> - Mise à jour du profil</li>
                    <li><code>POST /auth/refresh</code> - Rafraîchissement du token</li>
                  </ul>

                  <h3>{t('docs.api.plantations.title')}</h3>
                  <ul>
                    <li><code>GET /plantations/my</code> - Liste des plantations</li>
                    <li><code>GET /plantations/:id</code> - Détails d'une plantation</li>
                    <li><code>POST /plantations</code> - Création d'une plantation</li>
                    <li><code>GET /plantations/:id/sensors</code> - Liste des capteurs</li>
                    <li><code>GET /plantations/:id/sensors/:sensorId/readings</code> - Lectures d'un capteur</li>
                  </ul>

                  <h3>{t('docs.api.format.title')}</h3>
                  <p>{t('docs.api.format.content')}</p>
                </div>
              </section>

              {/* Section 9: Internationalisation */}
              <section id="i18n" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaLanguage className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.i18n')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.i18n.system.title')}</h3>
                  <p>{t('docs.i18n.system.content')}</p>

                  <h3>{t('docs.i18n.languages.title')}</h3>
                  <ul>
                    <li>Français (fr)</li>
                    <li>English (en)</li>
                    <li>Fulfulde (ff)</li>
                    <li>Ewondo (ewo)</li>
                  </ul>

                  <h3>{t('docs.i18n.files.title')}</h3>
                  <p><strong>Fichier:</strong> <code>src/utils/translations.ts</code></p>
                  <p>{t('docs.i18n.files.content')}</p>

                  <h3>{t('docs.i18n.adding.title')}</h3>
                  <p>{t('docs.i18n.adding.content')}</p>
                </div>
              </section>

              {/* Section 10: Utilitaires */}
              <section id="utils" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaTools className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.utils')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3><code>sensorStatus.ts</code></h3>
                  <p>{t('docs.utils.sensorStatus.description')}</p>

                  <h3><code>paramsSerializer.ts</code></h3>
                  <p>{t('docs.utils.paramsSerializer.description')}</p>

                  <h3><code>notificationFormatters.ts</code></h3>
                  <p>{t('docs.utils.notificationFormatters.description')}</p>

                  <h3><code>emailNotificationDiagnostic.ts</code></h3>
                  <p>{t('docs.utils.emailDiagnostic.description')}</p>
                </div>
              </section>

              {/* Section 11: Guide de développement */}
              <section id="dev-guide" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaBook className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.devGuide')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.devGuide.standards.title')}</h3>
                  <ul>
                    <li>{t('docs.devGuide.standards.typescript')}</li>
                    <li>{t('docs.devGuide.standards.components')}</li>
                    <li>{t('docs.devGuide.standards.naming')}</li>
                    <li>{t('docs.devGuide.standards.styles')}</li>
                  </ul>

                  <h3>{t('docs.devGuide.conventions.title')}</h3>
                  <ul>
                    <li>{t('docs.devGuide.conventions.files')}</li>
                    <li>{t('docs.devGuide.conventions.components')}</li>
                    <li>{t('docs.devGuide.conventions.hooks')}</li>
                    <li>{t('docs.devGuide.conventions.services')}</li>
                  </ul>

                  <h3>{t('docs.devGuide.structure.title')}</h3>
                  <p>{t('docs.devGuide.structure.content')}</p>
                </div>
              </section>

              {/* Section 12: Déploiement */}
              <section id="deployment" className={styles.docsPage__section}>
                <h2 className={styles.docsPage__sectionTitle}>
                  <FaRocket className={styles.docsPage__sectionIcon} />
                  {t('docs.sections.deployment')}
                </h2>
                <div className={styles.docsPage__sectionContent}>
                  <h3>{t('docs.deployment.build.title')}</h3>
                  <pre className={styles.docsPage__codeBlock}>
                    <code>{`# Build de production
npm run build

# Le dossier dist/ contient les fichiers optimisés`}</code>
                  </pre>

                  <h3>{t('docs.deployment.env.title')}</h3>
                  <ul>
                    <li><code>VITE_API_URL</code> - URL de l'API backend</li>
                  </ul>

                  <h3>{t('docs.deployment.config.title')}</h3>
                  <p>{t('docs.deployment.config.content')}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

