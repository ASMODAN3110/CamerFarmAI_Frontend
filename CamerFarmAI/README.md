# CamerFarm AI - Frontend

Plateforme intelligente pour une agriculture camerounaise moderne et durable. Application web React permettant aux producteurs de suivre leurs cultures en temps réel grâce à l'IoT et l'intelligence artificielle.

## 🚀 Fonctionnalités

### Authentification
- **Inscription** : Création de compte avec email, téléphone, nom et prénom
- **Connexion** : Authentification par email et mot de passe
- **Gestion de session** : Refresh token automatique, déconnexion
- **Protection des routes** : Routes protégées nécessitant une authentification

### Profil utilisateur
- **Page de profil** : Visualisation et modification des informations personnelles
- **Upload de photo** : Téléchargement et affichage de la photo de profil
- **Gestion des données** : Modification du prénom, nom, téléphone, langue

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
- **Support multilingue** : Chat disponible en français, anglais et fulfulde
- **Interface intuitive** : Chatbox moderne avec historique des conversations

### Multilingue
- Support de 3 langues : Français, English, Fulfulde
- Changement de langue dynamique
- Traductions complètes de l'interface

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
│       └── CreatePlantationModal/ # Modal de création de plantation
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

**Dernière mise à jour** : Décembre 2025
