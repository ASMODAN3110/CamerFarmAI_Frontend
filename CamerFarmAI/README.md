# CamerFarm AI - Frontend

Plateforme intelligente pour une agriculture camerounaise moderne et durable. Application web React permettant aux producteurs de suivre leurs cultures en temps réel grâce à l'IoT et l'intelligence artificielle.

## 🚀 Fonctionnalités

### Authentification
- **Inscription** : Création de compte avec email, téléphone, nom et prénom
- **Connexion** : Authentification par email et mot de passe
- **Authentification à deux facteurs (2FA)** : Sécurisation supplémentaire avec codes de vérification (Google Authenticator, Authy, etc.)
- **Gestion de session** : Refresh token automatique, déconnexion
- **Protection des routes** : Routes protégées nécessitant une authentification

### Profil utilisateur
- **Page de profil** : Visualisation et modification des informations personnelles
- **Upload de photo** : Téléchargement et affichage de la photo de profil
- **Gestion des données** : Modification du prénom, nom, téléphone, langue
- **Gestion du 2FA** : Activation/désactivation de l'authentification à deux facteurs depuis le profil

### Gestion des plantations
- **Liste des plantations** : Visualisation de toutes les plantations de l'utilisateur
- **Création de plantation** : Formulaire de création avec nom, localisation, superficie, type de culture
- **Détails de plantation** : 
  - Informations complètes (nom, localisation, superficie, type de culture)
  - Liste des capteurs assignés avec leurs dernières lectures
  - Navigation vers les pages de monitoring et graphiques
  - Affichage conditionnel basé sur la présence de capteurs/actionneurs

### Monitoring en temps réel
- **Tableau de bord** : Visualisation en temps réel des données des capteurs
- **Capteurs supportés** avec jauges interactives :
  - **Température** : Jauge semi-circulaire horizontale (0-50°C) avec dégradé vert-jaune-rouge et aiguille animée
  - **Humidité du sol** : Barre de progression avec dégradé rouge-jaune-vert, bulles animées et indicateur de statut
  - **Niveau de CO₂** : Jauge semi-circulaire horizontale (0-2500 ppm) avec dégradé vert-lime-jaune-orange-rouge et seuils de qualité
  - **Niveau d'eau** : Réservoir 3D avec dégradé rouge-jaune-vert, bulles remontantes, ondes de surface et indicateur de flux
  - **Luminosité** : Widget avec effet de glow dynamique, soleil rotatif avec rayons animés, particules de lumière flottantes
- **Indicateurs de statut** : Voyants visuels pour indiquer si chaque capteur est actif ou inactif
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
- **Multi-canal** : Support des notifications web, email et SMS
- **Affichage dans le header** : Badge avec compteur de notifications non lues

### Intelligence Artificielle
- **Chatbot IA** : Assistant conversationnel pour répondre aux questions sur l'agriculture
- **Support multilingue** : Chat disponible en français, anglais, fulfulde et ewondo
- **Interface intuitive** : Chatbox moderne avec historique des conversations

### Multilingue
- Support de 4 langues : Français, English, Fulfulde, Ewondo
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
VITE_API_URL=http://localhost:3000/api/v1
```

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
│   ├── ProfilePage.tsx           # Page de profil utilisateur
│   ├── MonitoringPage.tsx         # Page de monitoring en temps réel
│   ├── GraphsPage.tsx            # Page des graphiques
│   ├── ListPlantationsPage.tsx   # Liste des plantations
│   ├── PlantationDetailPage.tsx  # Détails d'une plantation
│   └── ChatboxPage.tsx           # Page de chat IA
├── components/                    # Composants réutilisables
│   ├── auth/                     # Composants d'authentification
│   │   └── ProtectedRoute.tsx   # Route protégée
│   ├── layout/                   # Layout (Header, Footer)
│   ├── blocks/                   # Blocs de contenu
│   └── ui/                       # Composants UI
│       ├── Button/              # Bouton
│       ├── Card/                # Carte
│       ├── FormField/           # Champ de formulaire
│       ├── Icon/                # Icône
│       ├── Modal/               # Modal
│       ├── Dropdown/            # Menu déroulant
│       ├── LanguageSwitcher/    # Sélecteur de langue
│       ├── FloatingButton/      # Bouton flottant
│       ├── CreatePlantationModal/ # Modal de création de plantation
│       └── TwoFactorModal/      # Modal d'authentification à deux facteurs
├── services/                      # Services API
│   ├── api.ts                    # Configuration Axios
│   ├── authService.ts           # Service d'authentification
│   ├── plantationService.ts     # Service de gestion des plantations
│   ├── notificationService.ts  # Service de gestion des notifications
│   ├── authProvider.tsx          # Provider d'authentification
│   └── useAuthStore.ts          # Store Zustand pour l'auth
├── hooks/                        # Hooks personnalisés
│   ├── useTranslation.ts        # Hook de traduction
│   ├── useLanguage.ts           # Hook de langue
│   ├── useScrollAnimation.ts     # Hook d'animation au scroll
│   └── useNotifications.ts      # Hook de gestion des notifications
├── contexts/                     # Contextes React
│   ├── LanguageContext.tsx      # Contexte de langue
│   └── NotificationContext.tsx  # Contexte de notifications
├── utils/                         # Utilitaires
│   └── translations.ts           # Fichiers de traduction
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
| `/profile` | Page de profil | Protégée |
| `/plantations` | Liste des plantations | Protégée |
| `/plantations/:id` | Détails d'une plantation | Protégée |
| `/graphs?plantationId=:id` | Graphiques et statistiques | Protégée |
| `/monitoring?plantationId=:id` | Monitoring en temps réel | Protégée |
| `/ai` | Chatbot IA | Protégée |

## 📡 API Backend

### Endpoints d'authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
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
- `GET /plantations/:id/sensors` - Liste des capteurs d'une plantation
- `GET /plantations/:id/actuators` - Liste des actionneurs d'une plantation
- `GET /plantations/:id/sensors/:sensorId/readings` - Lectures d'un capteur
- `PATCH /plantations/:id/sensors/:sensorId/thresholds` - Mise à jour des seuils d'un capteur

### Endpoints des notifications
- `GET /notifications/my` - Liste de toutes les notifications de l'utilisateur
- `GET /notifications/my?unreadOnly=true` - Liste des notifications non lues uniquement
- `GET /notifications/web` - Liste des notifications web uniquement
- `GET /notifications/stats` - Statistiques des notifications
- `PUT /notifications/:id/read` - Marquer une notification comme lue
- `DELETE /notifications/:id` - Supprimer une notification

### Structure des données

#### Plantation
```typescript
interface Plantation {
  id: string;
  name: string;
  location: string;
  area: number;
  cropType?: string;
  ownerId?: string;
  sensors?: Sensor[];
  actuators?: Actuator[];
  hasSensors?: boolean;
  hasActuators?: boolean;
}
```

#### Capteur
```typescript
interface Sensor {
  id: string;
  type: 'temperature' | 'humidity' | 'soilMoisture' | 'co2Level' | 'waterLevel' | 'luminosity';
  status: 'active' | 'inactive' | 'offline';
  plantationId: string;
  seuilMin?: number;  // Seuil minimum pour les alertes
  seuilMax?: number;  // Seuil maximum pour les alertes
  latestReading?: SensorReading;
}
```

#### Actionneur
```typescript
interface Actuator {
  id: string;
  type: 'pump' | 'fan' | 'light';
  name: string;
  status: 'active' | 'inactive' | 'offline';
  plantationId: string;
}
```

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

Si aucun seuil n'est configuré, les valeurs suivantes sont utilisées :

| Capteur | `seuilMin` (défaut) | `seuilMax` (défaut) |
|---------|---------------------|---------------------|
| Température | 18°C | 28°C |
| Humidité du sol | 40% | 70% |
| CO₂ | 400 ppm | 1200 ppm |
| Niveau d'eau | 15% | - |
| Luminosité | 10000 lux | 60000 lux |

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

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3000/api/v1` |

## 🚀 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

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

**Dernière mise à jour** : Décembre 2025
