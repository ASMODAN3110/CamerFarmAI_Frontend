# CamerFarm AI - Frontend

Plateforme intelligente pour une agriculture camerounaise moderne et durable. Application web React permettant aux producteurs de suivre leurs cultures en temps réel grâce à l'IoT et l'intelligence artificielle.

## 🛠️ Technologies utilisées

- **React 19** : Bibliothèque UI moderne avec hooks et contexte
- **TypeScript** : Typage statique pour une meilleure maintenabilité
- **Vite** : Build tool rapide et moderne
- **React Router** : Routage côté client
- **Axios** : Client HTTP pour les appels API
- **Zustand** : Gestion d'état légère
- **Recharts** : Bibliothèque de graphiques React
- **React Three Fiber** : Rendu 3D pour les visualisations avancées
- **React Icons** : Collection d'icônes
- **Lucide React** : Icônes modernes et optimisées
- **CSS Modules** : Styles modulaires et encapsulés
- **ESLint** : Linter pour la qualité du code

## 📐 Architecture des types

Le projet utilise une architecture de types centralisée et alignée avec le backend :

### Enums centralisés (`src/types/enums.ts`)
- `UserRole` : 'farmer' | 'technician' | 'admin'
- `PlantationMode` : 'automatic' | 'manual'
- `SensorType` : 'temperature' | 'soilMoisture' | 'co2Level' | 'waterLevel' | 'luminosity'
- `SensorStatus` : 'active' | 'inactive'
- `ActuatorStatus` : 'active' | 'inactive'
- `NotificationCanal` : 'web' | 'email' | 'whatsapp'
- `NotificationStatut` : 'envoyee' | 'en_attente' | 'erreur'
- `EventType` : Types d'événements pour les notifications

### DTOs (`src/types/dto.ts`)
Tous les DTOs pour les requêtes API sont centralisés :
- `RegisterDto`, `LoginDto`, `UpdateProfileDto`
- `CreatePlantationDto`, `UpdatePlantationDto`
- `CreateSensorDto`, `UpdateSensorThresholdsDto`, `AddSensorReadingDto`
- `CreateActuatorDto`, `UpdateActuatorDto`

### Conversion d'unités (`src/utils/unitConverter.ts`)
Le frontend convertit automatiquement les unités de superficie :
- Le backend attend toujours `area` en m²
- Conversions supportées : m², ha, acre, km²
- Fonctions : `convertToM2()`, `convertFromM2()`, `formatArea()`

## 🚀 Fonctionnalités

### Authentification
- **Inscription** : Création de compte avec email, téléphone, nom et prénom
- **Connexion** : Authentification par email et mot de passe
- **Authentification Google** : 
  - Connexion Google pour utilisateurs existants (`POST /auth/google/login`)
  - Inscription Google pour nouveaux utilisateurs (`POST /auth/google/register`)
  - Flux automatique : essaie la connexion puis l'inscription si nécessaire
  - Gestion intelligente des erreurs avec suggestions de redirection
  - Disponible sur les pages de connexion et d'inscription
- **Authentification à deux facteurs (2FA)** : Sécurisation supplémentaire avec codes de vérification (Google Authenticator, Authy, etc.)
- **Gestion de session** : Refresh token automatique, déconnexion
- **Protection des routes** : Routes protégées nécessitant une authentification
- **Routes basées sur les rôles** : Accès restreint selon le rôle (farmer, technician, admin)
- **Statut des comptes** : Gestion du statut actif/inactif des comptes utilisateurs

### Profil utilisateur
- **Page de profil** : Visualisation et modification des informations personnelles
- **Upload de photo** : Téléchargement et affichage de la photo de profil
- **Gestion des données** : Modification du prénom, nom, téléphone, langue
- **Gestion du 2FA** : Activation/désactivation de l'authentification à deux facteurs depuis le profil

### Gestion des plantations
- **Liste des plantations** : Visualisation de toutes les plantations de l'utilisateur
- **Création de plantation** : Formulaire de création avec nom, localisation, superficie (avec conversion d'unités), type de culture, coordonnées GPS optionnelles
- **Détails de plantation** : 
  - Informations complètes (nom, localisation, superficie, type de culture, coordonnées)
  - État de santé calculé (healthy, warning, critical, unknown)
  - Liste des capteurs assignés avec leurs dernières lectures
  - Navigation vers les pages de monitoring et graphiques
  - Affichage conditionnel basé sur la présence de capteurs/actionneurs
  - Mode de contrôle (automatique ou manuel)

### Monitoring en temps réel
- **Tableau de bord** : Visualisation en temps réel des données des capteurs
- **Capteurs supportés** avec jauges interactives :
  - **Température** : Jauge semi-circulaire horizontale (0-50°C) avec dégradé vert-jaune-rouge et aiguille animée
  - **Humidité du sol** : Barre de progression avec dégradé rouge-jaune-vert, bulles animées et indicateur de statut
  - **Niveau de CO₂** : Jauge semi-circulaire horizontale (0-2500 ppm) avec dégradé vert-lime-jaune-orange-rouge et seuils de qualité
  - **Niveau d'eau** : Réservoir 3D avec dégradé rouge-jaune-vert, bulles remontantes, ondes de surface et indicateur de flux
  - **Luminosité** : Widget avec effet de glow dynamique, soleil rotatif avec rayons animés, particules de lumière flottantes
- **Indicateurs de statut** : Voyants visuels pour indiquer si chaque capteur est actif ou inactif
  - **Statut actif** : Capteur fonctionnel et envoyant des données régulièrement
  - **Statut inactif** : Capteur n'ayant pas envoyé de données depuis plus d'1 heure
- **Alertes de capteurs inactifs** : Notification visuelle lorsqu'un ou plusieurs capteurs sont inactifs
- **Animations fluides** : Transitions et animations pour tous les widgets de capteurs
- **Dégradés de couleur** : Indicateurs visuels de couleur selon les valeurs (rouge = danger, jaune = attention, vert = optimal)
- **Configuration des seuils** :
  - Affichage des seuils min/max pour chaque capteur
  - Édition des seuils par capteur (réservé aux propriétaires de plantation)
  - Validation des seuils (max > min)
  - Sauvegarde via API avec gestion d'erreurs
- **Système de variation des couleurs dynamique** :
  - Les couleurs des jauges s'adaptent automatiquement aux seuils configurés par l'utilisateur
  - Chaque type de capteur utilise une logique de variation spécifique optimisée
  - Transitions fluides entre les zones (optimal, avertissement, danger)
  - Zones d'avertissement configurables pour une meilleure visibilité
- **Contrôle des équipements** :
  - Pompe d'irrigation
  - Ventilateurs
  - Éclairage
- **Modes de fonctionnement** :
  - Mode automatique (contrôlé par l'IA)
  - Mode manuel (contrôle utilisateur)
- **Affichage conditionnel** : Seuls les capteurs et actionneurs assignés à la plantation sont affichés
- **Mise à jour automatique** : Rafraîchissement des données toutes les 5 secondes

### Graphiques et statistiques
- **Graphiques interactifs** : Visualisation de l'évolution des données des capteurs
- **Filtres par date** : Sélection d'une plage de dates pour analyser les données historiques
- **Sélection de capteurs** : Activation/désactivation de l'affichage de chaque type de capteur
- **Données en temps réel** : Mise à jour automatique des graphiques

### Système de notifications
- **Notifications en temps réel** : Alertes et événements liés aux plantations et capteurs
- **Gestion des notifications** : Marquer comme lue, supprimer, filtrer
- **Statistiques** : Compteurs de notifications (total, envoyées, non lues, etc.)
- **Rafraîchissement automatique** : Mise à jour automatique toutes les 45 secondes
- **Multi-canal** : Support des notifications web, email et WhatsApp
- **Affichage dans le header** : Badge avec compteur de notifications non lues
- **Notifications email** : Affichage des notifications email avec détection des erreurs d'envoi
- **Diagnostic email** : Outil de diagnostic disponible en développement pour identifier les problèmes SMTP
- **Filtrage par canal** : Filtres pour afficher uniquement les notifications web, email, ou toutes

### Intelligence Artificielle
- **Chatbot IA** : Assistant conversationnel pour répondre aux questions sur l'agriculture
- **Support multilingue** : Chat disponible en français, anglais, fulfulde et ewondo
- **Interface intuitive** : Chatbox moderne avec historique des conversations

### Administration et Rôles
- **Espace Administrateur** : 
  - Gestion des utilisateurs (bannissement, réactivation)
  - Vue d'ensemble des statistiques système
  - Gestion des rôles
- **Espace Technicien** :
  - Tableau de bord dédié
  - Vue d'ensemble des plantations assignées
  - Outils de diagnostic avancés

### Multilingue
- Support de 4 langues : Français, English, Fulfulde, Ewondo,,,
- Changement de langue dynamique
- Traductions complètes de l'interface
- Approche hybride pour l'Ewondo : termes techniques modernes conservés en français pour une meilleure compréhension

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend API accessible (par défaut : `http://localhost:3000/api/v1`)

## 🛠️ Installation

1. **Cloner le dépôt** (si applicable)
```bash
git clone <repository-url>
cd CamerFarmAI
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :
```env
# Configuration du serveur backend
VITE_API_URL=http://localhost:3000/api/v1

# Google OAuth 2.0 Client ID (optionnel)
# Doit être identique au GOOGLE_CLIENT_ID configuré dans le backend
# Format: xxxxx.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
```

**Note :** Pour plus de détails sur la configuration de l'authentification Google, consultez le fichier [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md).

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
src/
├── app/                           # Pages de l'application
│   ├── HomePage.tsx              # Page d'accueil
│   ├── LoginPage.tsx             # Page de connexion
│   ├── SignUpPage.tsx            # Page d'inscription
│   ├── ForgotPasswordPage.tsx    # Page mot de passe oublié
│   ├── ResetPasswordPage.tsx     # Page réinitialisation mot de passe
│   ├── ProfilePage.tsx           # Page de profil utilisateur
│   ├── MonitoringPage.tsx         # Page de monitoring en temps réel
│   ├── GraphsPage.tsx            # Page des graphiques
│   ├── ListPlantationsPage.tsx   # Liste des plantations
│   ├── PlantationDetailPage.tsx  # Détails d'une plantation
│   ├── ChatboxPage.tsx           # Page de chat IA
│   ├── TechnicianDashboardPage.tsx # Tableau de bord technicien
│   ├── AdministrationPage.tsx    # Page d'administration
│   ├── GuidePage.tsx             # Guide d'utilisation
│   ├── DocumentationPage.tsx     # Documentation technique
│   ├── PrivacyPage.tsx           # Politique de confidentialité
│   ├── TermsPage.tsx             # Conditions d'utilisation
│   ├── CookiesPage.tsx           # Politique des cookies
│   └── SupportPage.tsx           # Page de support
├── components/                    # Composants réutilisables
│   ├── auth/                     # Composants d'authentification
│   │   ├── ProtectedRoute.tsx   # Route protégée
│   │   ├── PublicRoute.tsx     # Route publique
│   │   └── RoleBasedRoute.tsx   # Route basée sur les rôles
│   ├── layout/                   # Layout (Header, Footer)
│   ├── blocks/                   # Blocs de contenu (Hero, Features, etc.)
│   ├── notifications/            # Composants de notifications
│   │   ├── NotificationList.tsx # Liste des notifications
│   │   └── NotificationStats.tsx # Statistiques des notifications
│   ├── cookies/                  # Gestion des cookies
│   ├── redirection/              # Composants de redirection (TechnicianRedirect)
│   └── ui/                       # Composants UI génériques
│       ├── Button/
│       ├── Card/
│       ├── FormField/
│       ├── Icon/
│       ├── Modal/
│       ├── Dropdown/
│       ├── LanguageSwitcher/
│       ├── FloatingButton/
│       ├── CreatePlantationModal/
│       ├── TwoFactorModal/
│       ├── Toast/
│       ├── ConfirmationModal/
│       ├── GoogleSignInButton/
│       └── Background3D/
├── services/                      # Services API
│   ├── api.ts                    # Configuration Axios
│   ├── authService.ts           # Service d'authentification
│   ├── plantationService.ts     # Service de gestion des plantations
│   ├── notificationService.ts  # Service de gestion des notifications
│   ├── technicianService.ts     # Service technicien
│   ├── adminService.ts          # Service administration
│   ├── cookieService.ts         # Service cookies
│   ├── authProvider.tsx          # Provider d'authentification
│   └── useAuthStore.ts          # Store Zustand pour l'auth
├── hooks/                        # Hooks personnalisés
│   ├── useTranslation.ts        # Hook de traduction
│   ├── useLanguage.ts           # Hook de langue
│   ├── useScrollAnimation.ts     # Hook d'animation au scroll
│   ├── useNotifications.ts      # Hook de gestion des notifications
│   └── useEnrichedNotifications.ts # Hook de notifications enrichies
├── contexts/                     # Contextes React
│   ├── AuthContext.tsx          # Contexte d'authentification
│   ├── CookieContext.tsx        # Contexte de gestion des cookies
│   ├── LanguageContext.tsx      # Contexte de langue
│   └── NotificationContext.tsx  # Contexte de notifications
├── types/                         # Types TypeScript centralisés
│   ├── enums.ts                  # Enums (UserRole, SensorType, SensorStatus, etc.)
│   └── dto.ts                    # DTOs pour les requêtes API
├── utils/                         # Utilitaires
│   ├── translations.ts           # Fichiers de traduction
│   ├── sensorStatus.ts           # Utilitaires pour les statuts des capteurs
│   ├── unitConverter.ts          # Conversion d'unités de superficie
│   ├── notificationFormatters.ts # Formatage des notifications
│   ├── paramsSerializer.ts       # Sérialisation des paramètres URL
│   └── emailNotificationDiagnostic.ts  # Diagnostic des notifications email
└── styles/                        # Styles globaux
    ├── global.css
    └── theme.ts
```

## 🌐 Routes

| Route | Description | Protection |
|-------|-------------|------------|
| `/` | Page d'accueil | Publique |
| `/login` | Page de connexion | Publique |
| `/signup` | Page d'inscription | Publique |
| `/forgot-password` | Mot de passe oublié | Publique |
| `/reset-password` | Réinitialisation du mot de passe | Publique |
| `/profile` | Page de profil | Protégée |
| `/plantations` | Liste des plantations | Protégée |
| `/plantations/:id` | Détails d'une plantation | Protégée |
| `/graphs?plantationId=:id` | Graphiques et statistiques | Protégée |
| `/monitoring?plantationId=:id` | Monitoring en temps réel | Protégée |
| `/ai` | Chatbot IA | Protégée |
| `/technicien` | Tableau de bord technicien | Protégée (technicien uniquement) |
| `/admin` | Panneau d'administration | Protégée (admin uniquement) |
| `/support` | Centre de support | Publique |
| `/guide` | Guide d'utilisation | Publique |
| `/docs` | Documentation technique | Publique |
| `/privacy` | Politique de confidentialité | Publique |
| `/terms` | Conditions d'utilisation | Publique |
| `/cookies` | Politique des cookies | Publique |

## 📡 API Backend

### Endpoints d'authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/google/login` - Connexion Google (utilisateur existant)
- `POST /auth/google/register` - Inscription Google (nouvel utilisateur)
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Récupération du profil utilisateur
- `PUT /auth/profile` - Mise à jour du profil
- `POST /auth/profile/avatar` - Upload de la photo de profil
- `POST /auth/refresh` - Rafraîchissement du token
- `POST /auth/2fa/setup` - Configuration du 2FA (génération du QR code)
- `POST /auth/2fa/verify` - Vérification du code 2FA lors de la connexion
- `POST /auth/2fa/enable` - Activation du 2FA
- `POST /auth/2fa/disable` - Désactivation du 2FA

### Endpoints des plantations
- `GET /plantations/my` - Liste des plantations de l'utilisateur
- `GET /plantations/:id` - Détails d'une plantation (avec capteurs et actionneurs)
- `POST /plantations` - Création d'une nouvelle plantation
- `PATCH /plantations/:id` - Mise à jour d'une plantation (notamment le mode)
- `GET /plantations/:id/sensors` - Liste des capteurs d'une plantation
- `GET /plantations/:id/actuators` - Liste des actionneurs d'une plantation
- `GET /plantations/:id/sensors/:sensorId/readings` - Lectures d'un capteur
- `POST /plantations/:id/sensors/:sensorId/readings` - Ajout d'une lecture de capteur
- `PATCH /plantations/:id/sensors/:sensorId/thresholds` - Mise à jour des seuils d'un capteur
- `PATCH /plantations/:id/actuators/:actuatorId` - Mise à jour d'un actionneur

### Endpoints technicien
- `GET /technician/stats` - Statistiques globales
- `GET /technician/farmers` - Liste des agriculteurs (avec recherche optionnelle)
- `GET /technician/farmers/:farmerId/plantations` - Plantations d'un agriculteur

### Endpoints des notifications
- `GET /notifications/my` - Liste de toutes les notifications de l'utilisateur
- `GET /notifications/my?unreadOnly=true` - Liste des notifications non lues uniquement
- `GET /notifications/web` - Liste des notifications web uniquement
- `GET /notifications/stats` - Statistiques des notifications
- `GET /notifications/:id` - Détails d'une notification
- `PATCH /notifications/:id/read` - Marquer une notification comme lue
- `DELETE /notifications/:id` - Supprimer une notification

### Structure des données

#### Plantation
```typescript
interface Plantation {
  id: string;                    // UUID
  name: string;                  // Requis
  location: string | null;       // Nullable
  area?: number;                 // Optionnel, en m²
  cropType: string;              // Requis
  coordinates?: {                 // Optionnel
    lat: number;
    lng: number;
  };
  mode: 'automatic' | 'manual';  // Default: 'automatic'
  ownerId?: string;              // UUID du propriétaire
  sensors?: Sensor[];
  actuators?: Actuator[];
  hasSensors?: boolean;          // Calculé (non-backend)
  hasActuators?: boolean;        // Calculé (non-backend)
  createdAt: string;             // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  etat?: {                       // État calculé par le backend
    status: 'healthy' | 'warning' | 'critical' | 'unknown';
    activeSensors: number;
    totalSensors: number;
    activeActuators: number;
    totalActuators: number;
    message: string;
  };
}
```

**Note:** Le champ `area` doit toujours être en m². Le frontend convertit automatiquement depuis d'autres unités (ha, acre, km²) avant l'envoi.

#### Capteur
```typescript
interface Sensor {
  id: string;                    // UUID
  type: 'temperature' | 'soilMoisture' | 'co2Level' | 'waterLevel' | 'luminosity';
  status: 'active' | 'inactive';  // 'active' | 'inactive' (pas 'offline')
  plantationId: string;          // UUID
  seuilMin?: number;             // Optionnel, decimal(10,2)
  seuilMax?: number;             // Optionnel, decimal(10,2)
  createdAt: string;             // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  latestReading?: SensorReading; // Dernière lecture du capteur
  readings?: SensorReading[];     // Historique des lectures
}

// Statuts des capteurs :
// - 'active' : Capteur fonctionnel et envoyant des données régulièrement
// - 'inactive' : Capteur n'ayant pas envoyé de données depuis plus d'1 heure
```

**Note:** Le type `'humidity'` n'existe plus. Utiliser `'soilMoisture'` ou `'waterLevel'` à la place.

#### Actionneur
```typescript
interface Actuator {
  id: string;                    // UUID
  type: string;                  // Requis (ex: "pompe", "ventilateur", "éclairage")
  name: string;                  // Requis
  status: 'active' | 'inactive';  // 'active' | 'inactive' (pas 'offline')
  plantationId: string;          // UUID
  metadata?: Record<string, any>; // Optionnel, JSON
  createdAt: string;             // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  isOn?: boolean;                // Calculé depuis status === 'active' (non-backend)
}
```

**Note:** Le statut `'offline'` n'existe plus. Utiliser `'inactive'` à la place.

## 🎨 Système de variation des couleurs des jauges

Le système de variation des couleurs est conçu pour fournir un feedback visuel immédiat et intuitif sur l'état des capteurs. Chaque type de capteur utilise une logique de variation spécifique optimisée pour son domaine d'application.

### Principe général

Les couleurs des jauges s'adaptent **dynamiquement** aux seuils (`seuilMin` et `seuilMax`) configurés par l'utilisateur. Si aucun seuil n'est défini, des valeurs par défaut sont utilisées. Le système utilise des **gradients CSS linéaires** pour créer des transitions fluides entre les différentes zones de statut.

### Zones de statut

Chaque jauge définit trois zones principales :
- **🟢 Zone optimale** : Valeurs dans la plage idéale (vert)
- **🟡 Zone d'avertissement** : Valeurs proches des limites (jaune/orange)
- **🔴 Zone de danger** : Valeurs critiques (rouge)

### Logique par type de capteur

#### 🌡️ Température (0-50°C)

**Gradient optimisé** : Vert optimal autour de `seuilMin`, transition fluide vers rouge au-dessus de `seuilMax`.

- **En dessous de `seuilMin - 5°C`** : Bleu-vert (très froid)
- **Autour de `seuilMin`** : Vert optimal (température idéale)
- **Entre `seuilMin` et `seuilMax`** : Transition progressive vert → jaune → orange
- **À `seuilMax`** : Rouge (danger)
- **Au-dessus de `seuilMax`** : Rouge intense (danger extrême)

**Caractéristiques** :
- 9 stops de gradient pour une transition ultra-fluide
- Zone d'avertissement de 5% avant `seuilMax`
- Dégradé HSL pour des transitions naturelles

#### 💧 Humidité du sol (0-100%)

**Gradient optimisé** : Zone optimale verte bien définie entre les seuils avec transitions fluides.

- **En dessous de `seuilMin - 12%`** : Rouge intense (très sec)
- **Entre `seuilMin - 12%` et `seuilMin`** : Transition rouge → orange-jaune
- **Entre `seuilMin` et `seuilMax`** : Zone optimale verte (humidité idéale)
- **Entre `seuilMax` et `seuilMax + 12%`** : Transition jaune-orange → rouge
- **Au-dessus de `seuilMax + 12%`** : Rouge intense (saturation)

**Caractéristiques** :
- 11 stops de gradient pour une zone optimale bien visible
- Zone d'avertissement de 8% de chaque côté
- Centre de la zone optimale en vert pur

#### 🌬️ Niveau de CO₂ (0-2500 ppm)

**Gradient optimisé** : Vert optimal en dessous de `seuilMin`, transition progressive vers rouge au-dessus de `seuilMax`.

- **En dessous de `seuilMin`** : Vert optimal (air de qualité)
- **Entre `seuilMin` et `seuilMax`** : Transition progressive vert-jaune → jaune → orange
- **À `seuilMax`** : Rouge-orange (danger)
- **Au-dessus de `seuilMax`** : Rouge intense (danger extrême)

**Caractéristiques** :
- 10 stops de gradient avec 4 zones de transition
- Zone d'avertissement de 5% avant `seuilMax`
- Transitions en quartiles pour une progression claire

#### 💧 Niveau d'eau (0-100%)

**Gradient optimisé** : Rouge en dessous de `seuilMin`, vert au-dessus avec transition fluide.

- **En dessous de `seuilMin - 10%`** : Rouge intense (vide)
- **Entre `seuilMin - 10%` et `seuilMin`** : Transition rouge → orange-jaune
- **À `seuilMin`** : Orange-jaune (niveau critique)
- **Au-dessus de `seuilMin + 20%`** : Vert (bon niveau)
- **À 100%** : Vert foncé (plein)

**Caractéristiques** :
- 7 stops de gradient pour une transition claire
- Zone d'avertissement de 5% avant `seuilMin`
- Gradient vertical (de bas en haut) pour l'effet de réservoir

#### ☀️ Luminosité (0-100000 lux)

**Gradient optimisé** : Zone optimale verte entre les seuils avec transitions fluides.

- **En dessous de `seuilMin - 6%`** : Bleu foncé (obscurité totale)
- **Entre `seuilMin - 6%` et `seuilMin`** : Transition bleu-gris → vert-cyan
- **Entre `seuilMin` et `seuilMax`** : Zone optimale verte (luminosité idéale)
- **Entre `seuilMax` et `seuilMax + 6%`** : Transition vert-jaune → jaune → orange
- **Au-dessus de `seuilMax + 6%`** : Rouge (saturation extrême)

**Caractéristiques** :
- 9 stops de gradient pour une transition naturelle
- Zone d'avertissement de 3% de chaque côté
- Effet de glow dynamique basé sur la position dans le gradient

### Valeurs par défaut

Si aucun seuil n'est configuré, les valeurs suivantes sont utilisées. Ces valeurs sont adaptées aux conditions climatiques et aux cultures du Cameroun :

| Capteur | `seuilMin` (défaut) | `seuilMax` (défaut) | Justification |
|---------|---------------------|---------------------|---------------|
| Température | 22°C | 30°C | Plage optimale pour cultures tropicales (cacao, café, maïs, etc.) |
| Humidité du sol | 50% | 80% | Adapté aux cultures tropicales nécessitant plus d'eau |
| CO₂ | 400 ppm | 1000 ppm | Plage normale de CO₂ en agriculture |
| Niveau d'eau | 20% | - | Niveau minimum plus élevé pour cultures tropicales |
| Luminosité | 20000 lux | 90000 lux | Plage optimale pour cultures tropicales en plein soleil. Échelle lux : < 50 (très sombre), 50-200 (sombre), 200-500 (normal), 500-1000 (fort), > 1000 (très lumineux). Soleil direct : 10 000 à 100 000 lux |

### Implémentation technique

Le système utilise deux fonctions principales :

1. **`generateXGradientStops()`** : Génère les stops de gradient CSS basés sur les seuils
2. **`calculateColorFromThresholds()`** : Calcule la couleur actuelle pour les indicateurs de statut

Les gradients sont convertis en **gradients CSS linéaires** pour une compatibilité maximale et des performances optimales. Chaque widget utilise son gradient spécifique pour créer un rendu visuel cohérent et informatif.

### Avantages

- ✅ **Adaptabilité** : Les couleurs s'adaptent automatiquement aux seuils personnalisés
- ✅ **Fluidité** : Transitions douces entre les zones grâce aux gradients multi-stops
- ✅ **Intuitivité** : Code couleur universel (vert = bon, jaune = attention, rouge = danger)
- ✅ **Performance** : Gradients CSS natifs, pas de calculs JavaScript à chaque rendu
- ✅ **Cohérence** : Logique unifiée pour tous les types de capteurs

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut | Requis |
|----------|-------------|--------|--------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3000/api/v1` | Non |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID pour l'authentification Google | - | Non (optionnel) |

**Note :** 
- Le bouton d'authentification Google ne s'affichera que si `VITE_GOOGLE_CLIENT_ID` est défini
- L'authentification Google utilise deux endpoints distincts : `/auth/google/login` pour la connexion et `/auth/google/register` pour l'inscription
- Le composant `GoogleSignInButton` supporte un mode automatique qui essaie la connexion puis l'inscription si nécessaire
- Pour plus de détails, consultez [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

## 🚀 Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement sur http://localhost:5173

# Build de production
npm run build        # Compile l'application pour la production dans le dossier dist/

# Preview du build
npm run preview      # Prévisualise le build de production localement

# Linter
npm run lint         # Vérifie le code avec ESLint

# Tests unitaires
npm test             # Lance les tests unitaires (Vitest)
npm run test:watch   # Lance les tests en mode watch
```

## 🧪 Tests unitaires
Les tests unitaires utilisent **Vitest** (configuration : `vitest.config.ts`).
Les fichiers de tests sont placés typiquement dans `src/**/*.test.ts` / `src/**/*.spec.ts`.

## 🐛 Dépannage

### Erreur de connexion API

1. Vérifier que le backend est démarré
2. Vérifier l'URL dans `.env`
3. Vérifier les logs dans la console du navigateur

### Problème d'authentification

1. Vérifier que les cookies sont activés
2. Vérifier que `withCredentials: true` est configuré
3. Vérifier les CORS côté backend

### Les capteurs/actionneurs ne s'affichent pas

1. Vérifier que les capteurs/actionneurs sont assignés à la plantation en base de données
2. Vérifier que `hasSensors` ou `hasActuators` est `true` dans la réponse API
3. Vérifier les logs de normalisation dans la console

### Les graphiques ne s'affichent pas

1. Vérifier que des lectures de capteurs existent pour la période sélectionnée
2. Vérifier que les capteurs ont des données dans la plage de dates
3. Vérifier les filtres de date dans la console

## 📚 Documentation Technique

Pour plus de détails sur l'implémentation et la configuration, consultez les documents suivants :

- **[Guide de Déploiement](./DEPLOYMENT.md)** : Instructions détaillées pour déployer sur Vercel.
- **[Configuration Authentification Google](./GOOGLE_AUTH_SETUP.md)** : Guide complet pour configurer l'authentification Google OAuth 2.0.
- **[Configuration Backend des Notifications](./CONFIGURATION_BACKEND_NOTIFICATIONS.md)** : Spécifications de l'API de notifications.
- **[Notifications Email](./DOCUMENTATION_NOTIFICATIONS_EMAIL.md)** : Fonctionnement du système de notifications par email.
- **[Modèle de Données Backend](./MODELE_DONNEES_BACKEND.md)** : Structure des données attendues du backend.

## 📄 Licence

Ce projet fait partie du projet CamerFarm AI.

## 👥 Contribution

Pour contribuer au projet, veuillez suivre les conventions de code et créer une pull request.

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

## 🌐 Système de traduction (i18n)

Le système de traduction de CamerFarm AI est implémenté de manière centralisée et type-safe, permettant une gestion efficace des 4 langues supportées.

### Architecture du système

Le système de traduction repose sur une architecture en couches :

```
┌─────────────────────────────────────────┐
│   Composants React (UI)                 │
│   Utilisent useTranslation()            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Hook useTranslation()                 │
│   - Fournit la fonction t(key)          │
│   - Utilise useLanguage() pour la      │
│     langue courante                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Fonction getTranslation()             │
│   - Recherche la traduction dans         │
│     translations[language][key]         │
│   - Fallback sur la clé si absente      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   Objet translations                    │
│   - Structure: Record<Language,          │
│     Record<TranslationKey, string>>    │
│   - Toutes les traductions centralisées │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│   LanguageContext (React Context)       │
│   - Gère l'état de la langue            │
│   - Persiste dans localStorage          │
│   - Met à jour document.documentElement  │
└─────────────────────────────────────────┘
```

### Composants principaux

#### 1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)

Le contexte React qui gère l'état global de la langue dans l'application.

**Fonctionnalités :**
- **État de la langue** : Stocke la langue courante (`fr`, `en`, `ff`, `ew`)
- **Persistance** : Sauvegarde automatique dans `localStorage` avec la clé `camerfarm-language`
- **Initialisation** : Récupère la langue sauvegardée au démarrage, sinon utilise le français par défaut
- **Mise à jour du DOM** : Met à jour l'attribut `lang` de `<html>` pour l'accessibilité et le SEO
- **Validation** : Vérifie que la langue stockée est valide avant de l'utiliser

**Exemple d'utilisation :**
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, changeLanguage } = useLanguage();
  
  return (
    <button onClick={() => changeLanguage('en')}>
      Current: {language}
    </button>
  );
}
```

#### 2. **Fichier de traductions** (`src/utils/translations.ts`)

Le fichier central contenant toutes les traductions de l'application.

**Structure :**
- **Type `TranslationKey`** : Union type TypeScript listant toutes les clés de traduction possibles (type-safe)
- **Type `Language`** : `'fr' | 'en' | 'ff' | 'ew'`
- **Objet `translations`** : Structure hiérarchique `Record<Language, Record<TranslationKey, string>>`

**Organisation des clés :**
Les clés suivent une convention de nommage hiérarchique par fonctionnalité :
- `nav.*` : Navigation (home, support, monitoring, etc.)
- `auth.*` : Authentification (login, signup, logout, profile)
- `login.*` : Page de connexion (title, labels, placeholders, errors, etc.)
- `signup.*` : Page d'inscription
- `plantations.*` : Gestion des plantations
- `monitoring.*` : Monitoring en temps réel
- `profile.*` : Profil utilisateur
- `chatbox.*` : Chatbot IA
- `admin.*` : Administration
- etc.

**Exemple de structure :**
```typescript
export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.support': 'Support',
    'login.title': 'CONNEXION',
    'login.emailLabel': 'Adresse email',
    // ... toutes les autres traductions
  },
  en: {
    'nav.home': 'Home',
    'nav.support': 'Support',
    'login.title': 'LOGIN',
    'login.emailLabel': 'Email address',
    // ...
  },
  // ... autres langues
};
```

#### 3. **Fonction `getTranslation()`** (`src/utils/translations.ts`)

Fonction utilitaire qui récupère la traduction pour une clé et une langue données.

**Logique :**
1. Recherche la traduction dans `translations[language][key]`
2. Si la traduction existe, la retourne
3. Sinon, retourne la clé elle-même comme fallback (évite les erreurs d'affichage)

**Signature :**
```typescript
export function getTranslation(
  key: TranslationKey, 
  language: Language
): string
```

**Exemple :**
```typescript
getTranslation('nav.home', 'fr')  // → 'Accueil'
getTranslation('nav.home', 'en')  // → 'Home'
getTranslation('nav.home', 'ff')  // → 'Galle'
getTranslation('nav.home', 'ew')  // → 'Ndé'
```

#### 4. **Hook `useTranslation()`** (`src/hooks/useTranslation.ts`)

Hook React personnalisé qui simplifie l'utilisation des traductions dans les composants.

**Fonctionnalités :**
- Récupère automatiquement la langue courante via `useLanguage()`
- Fournit une fonction `t(key)` qui encapsule `getTranslation()`
- Retourne également la langue courante pour un usage conditionnel

**Exemple d'utilisation :**
```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

#### 5. **Composant `LanguageSwitcher`** (`src/components/ui/LanguageSwitcher/LanguageSwitcher.tsx`)

Composant UI permettant à l'utilisateur de changer de langue.

**Fonctionnalités :**
- Affiche la langue courante avec son drapeau
- Menu déroulant avec les 4 langues disponibles
- Indicateur visuel de la langue active
- Gestion du clic extérieur pour fermer le menu
- Support de variantes (`default`, `light`)

**Langues affichées :**
```typescript
const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ff', label: 'Fulfulde', flag: '🇨🇲' },
  { code: 'ew', label: 'Ewondo', flag: '🇨🇲' },
];
```

### Flux de traduction

1. **Initialisation** :
   - Au chargement de l'application, `LanguageProvider` vérifie `localStorage`
   - Si une langue valide est trouvée, elle est utilisée
   - Sinon, le français (`fr`) est utilisé par défaut
   - L'attribut `lang` de `<html>` est mis à jour

2. **Utilisation dans un composant** :
   ```typescript
   const { t } = useTranslation();
   const title = t('login.title'); // Récupère la traduction
   ```

3. **Changement de langue** :
   - L'utilisateur clique sur `LanguageSwitcher`
   - `changeLanguage('en')` est appelé
   - Le contexte met à jour l'état
   - `localStorage` est mis à jour
   - `document.documentElement.lang` est mis à jour
   - Tous les composants utilisant `useTranslation()` se re-rendent automatiquement

4. **Récupération de la traduction** :
   - `t(key)` appelle `getTranslation(key, language)`
   - La fonction cherche dans `translations[language][key]`
   - Retourne la traduction ou la clé en fallback

### Avantages de cette architecture

✅ **Type-safety** : TypeScript garantit que seules les clés valides peuvent être utilisées  
✅ **Centralisation** : Toutes les traductions sont dans un seul fichier, facile à maintenir  
✅ **Performance** : Pas de chargement dynamique, toutes les traductions sont en mémoire  
✅ **Persistance** : La préférence de langue est sauvegardée entre les sessions  
✅ **Accessibilité** : L'attribut `lang` du HTML est mis à jour automatiquement  
✅ **Réactivité** : Changement de langue instantané sans rechargement de page  
✅ **Fallback** : Si une traduction manque, la clé est affichée (évite les erreurs)  
✅ **Maintenabilité** : Structure hiérarchique claire des clés de traduction  

### Ajout d'une nouvelle traduction

Pour ajouter une nouvelle traduction :

1. **Ajouter la clé au type `TranslationKey`** :
   ```typescript
   export type TranslationKey = 
     | 'nav.home'
     | 'nav.newKey'  // ← Nouvelle clé
     | // ...
   ```

2. **Ajouter la traduction pour chaque langue** :
   ```typescript
   export const translations = {
     fr: {
       'nav.newKey': 'Nouvelle traduction',
       // ...
     },
     en: {
       'nav.newKey': 'New translation',
       // ...
     },
     ff: {
       'nav.newKey': 'Tradusyon hesere',
       // ...
     },
     ew: {
       'nav.newKey': 'Traduction ékpé',
       // ...
     },
   };
   ```

3. **Utiliser dans un composant** :
   ```typescript
   const { t } = useTranslation();
   return <div>{t('nav.newKey')}</div>;
   ```

### Bonnes pratiques

1. **Nommage des clés** : Utiliser une hiérarchie claire (`feature.section.item`)
2. **Cohérence** : Maintenir la même structure pour toutes les langues
3. **Complétude** : S'assurer que toutes les clés existent pour toutes les langues
4. **Contexte** : Les clés doivent être suffisamment descriptives pour comprendre leur usage
5. **Réutilisation** : Éviter la duplication, réutiliser les clés communes

### Exemple complet

```typescript
// Dans un composant
import { useTranslation } from '@/hooks/useTranslation';

export function LoginPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('login.title')}</h1>
      <label>{t('login.emailLabel')}</label>
      <input placeholder={t('login.emailPlaceholder')} />
      <button>{t('login.submitButton')}</button>
    </div>
  );
}
```

## 🌍 Langues supportées

L'application supporte 4 langues pour une accessibilité maximale :

| Langue | Code | Description |
|--------|------|-------------|
| Français | `fr` | Langue principale (par défaut) |
| English | `en` | Langue internationale |
| Fulfulde | `ff` | Langue locale camerounaise |
| Ewondo | `ew` | Langue locale camerounaise (approche hybride pour les termes techniques) |

### Approche de traduction Ewondo

Pour l'Ewondo, une approche hybride a été adoptée :
- **Termes de base** : Traduits en Ewondo (ex: "Accueil" → "Ndé", "Connexion" → "Kómbí")
- **Termes techniques modernes** : Conservés en français pour une meilleure compréhension (ex: "Email", "Monitoring", "Système", "AI", "Dashboard")

Cette approche reflète l'usage réel de la langue Ewondo dans un contexte technologique moderne.

## 📚 Documentation supplémentaire

Le projet inclut plusieurs documents de référence pour faciliter le développement et l'intégration :

- **MODELE_DONNEES_BACKEND.md** : Documentation complète des modèles de données attendus par le frontend depuis le backend, incluant tous les types, DTOs, et formats de réponse API.

- **CONFIGURATION_BACKEND_NOTIFICATIONS.md** : Guide complet pour configurer le backend afin que les notifications fonctionnent correctement. Inclut les endpoints requis, structures de données, types d'événements, canaux de notification, et exemples de réponses.

- **DOCUMENTATION_NOTIFICATIONS_EMAIL.md** : Documentation détaillée de l'implémentation des notifications par email dans le frontend. Décrit l'architecture, les services, composants UI, gestion des erreurs, diagnostic, et flux de données.

**Dernière mise à jour** : Décembre 2025

## 🔍 Statuts des capteurs

Le système gère deux statuts pour les capteurs :

| Statut | Description | Couleur | Signification |
|--------|-------------|---------|---------------|
| **Actif** | Capteur fonctionnel et envoyant des données régulièrement | 🟢 Vert | Le capteur fonctionne normalement et transmet des données |
| **Inactif** | Capteur n'ayant pas envoyé de données depuis plus d'1 heure | 🔴 Rouge | Le capteur n'a pas transmis de données récemment (défaut de communication ou problème technique) |

**Note:** Le statut `'offline'` n'existe plus dans le backend. Les capteurs déconnectés sont considérés comme `'inactive'`. Le frontend gère gracieusement les anciennes valeurs `'offline'` en les convertissant en `'inactive'` pour compatibilité.

### Détection automatique

Le système détecte automatiquement le statut d'un capteur en fonction de :
- **Timestamp de la dernière lecture** : Si aucune lecture n'a été reçue depuis plus d'1 heure, le capteur est marqué comme inactif
- **Connexion réseau** : Si le capteur est déconnecté du réseau, il est marqué comme inactif
- **Configuration** : Si le capteur n'est pas correctement configuré, il peut être marqué comme inactif

### Alertes visuelles

Lorsqu'un ou plusieurs capteurs sont inactifs, une alerte visuelle s'affiche sur la page de monitoring :
- **Icône d'alerte** : Indicateur visuel avec icône d'erreur
- **Liste des capteurs inactifs** : Affichage de tous les capteurs inactifs avec leur type et le temps écoulé depuis la dernière lecture
- **Message informatif** : Indication du nombre de capteurs inactifs détectés

### Utilitaires de statut

Le fichier `src/utils/sensorStatus.ts` fournit des fonctions utilitaires pour :
- `getSensorStatusColor(status)` : Retourne la couleur associée à un statut
- `getSensorStatusLabel(status, t)` : Retourne le label traduit d'un statut
- `isSensorInactiveTooLong(timestamp, thresholdHours)` : Vérifie si un capteur est inactif depuis trop longtemps
- `getTimeSinceLastReading(timestamp)` : Calcule et formate le temps écoulé depuis la dernière lecture
