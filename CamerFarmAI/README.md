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

### Monitoring
- **Tableau de bord** : Visualisation en temps réel des données des capteurs
- **Graphiques** : Évolution des données (humidité, température, CO2, luminosité)
- **Alertes** : Notifications en temps réel pour les anomalies

### Plantations
- **Gestion des plantations** : Création et suivi des plantations
- **Détails** : Informations détaillées sur chaque plantation

### Multilingue
- Support de 3 langues : Français, English, Fulfulde
- Changement de langue dynamique

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
├── app/                    # Pages de l'application
│   ├── HomePage.tsx       # Page d'accueil
│   ├── LoginPage.tsx      # Page de connexion
│   ├── SignUpPage.tsx     # Page d'inscription
│   ├── ProfilePage.tsx    # Page de profil utilisateur
│   ├── MonitoringPage.tsx  # Page de monitoring
│   ├── GraphsPage.tsx     # Page des graphiques
│   └── ListPlantationsPage.tsx # Liste des plantations
├── components/            # Composants réutilisables
│   ├── auth/              # Composants d'authentification
│   ├── layout/            # Layout (Header, Footer)
│   ├── blocks/            # Blocs de contenu
│   └── ui/                # Composants UI (Button, FormField, etc.)
├── services/              # Services API
│   ├── api.ts             # Configuration Axios
│   ├── authService.ts     # Service d'authentification
│   ├── authProvider.tsx   # Provider d'authentification
│   └── useAuthStore.ts    # Store Zustand pour l'auth
├── hooks/                 # Hooks personnalisés
│   ├── useAuth.ts         # (déprécié - utiliser useAuthStore)
│   ├── useTranslation.ts  # Hook de traduction
│   └── useLanguage.ts     # Hook de langue
├── contexts/              # Contextes React
│   └── LanguageContext.tsx # Contexte de langue
├── utils/                 # Utilitaires
│   └── translations.ts    # Fichiers de traduction
└── styles/                # Styles globaux
    ├── global.css
    └── theme.ts
```

## 🔐 Authentification

### Système d'authentification

L'application utilise **Zustand** pour la gestion de l'état d'authentification :

```typescript
import { useAuthStore } from '@/services/useAuthStore';

// Dans un composant
const login = useAuthStore((s) => s.login);
const user = useAuthStore((s) => s.user);
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
```

### Routes protégées

Les routes protégées utilisent le composant `ProtectedRoute` :

```tsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

### Services API

#### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Récupération du profil utilisateur
- `PUT /auth/profile` - Mise à jour du profil
- `POST /auth/profile/avatar` - Upload de la photo de profil
- `POST /auth/refresh` - Rafraîchissement du token

## 🌐 Routes

| Route | Description | Protection |
|-------|-------------|------------|
| `/` | Page d'accueil | Publique |
| `/login` | Page de connexion | Publique |
| `/signup` | Page d'inscription | Publique |
| `/profile` | Page de profil | Protégée |
| `/plantations` | Liste des plantations | Protégée |
| `/graphs` | Graphiques et statistiques | Protégée |
| `/monitoring` | Monitoring en temps réel | Protégée |

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3000/api/v1` |

### Configuration API

Le fichier `src/services/api.ts` configure Axios avec :
- Base URL configurable via variable d'environnement
- Timeout de 30 secondes
- Support des cookies (withCredentials)
- Intercepteurs pour :
  - Ajout automatique du Bearer token
  - Refresh token automatique sur 401
  - Logs de debug en développement

## 📦 Dépendances principales

- **React 19** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Vite** : Build tool et dev server
- **React Router** : Routage
- **Zustand** : Gestion d'état (authentification)
- **Axios** : Client HTTP
- **React Icons** : Bibliothèque d'icônes
- **Recharts** : Graphiques

## 🎨 Styles

- **CSS Modules** : Styles modulaires par composant
- **CSS Variables** : Variables CSS pour les thèmes
- **Responsive Design** : Design adaptatif mobile/desktop

## 🌍 Internationalisation

L'application supporte 3 langues :
- **Français (fr)** : Langue par défaut
- **English (en)**
- **Fulfulde (ff)**

Les traductions sont définies dans `src/utils/translations.ts`

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

## 📝 Format des données utilisateur

```typescript
interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: 'farmer' | 'advisor' | 'admin';
  language: string;
  avatarUrl?: string; // URL de la photo de profil
}
```

## 🔍 Debug

En mode développement, les logs API sont automatiquement activés :
- 🚀 Requêtes API
- ✅ Réponses réussies
- ❌ Erreurs API
- 🔄 Tentatives de refresh token

## 🐛 Dépannage

### Erreur de connexion API

1. Vérifier que le backend est démarré
2. Vérifier l'URL dans `.env`
3. Vérifier les logs dans la console du navigateur

### Problème d'authentification

1. Vérifier que les cookies sont activés
2. Vérifier que `withCredentials: true` est configuré
3. Vérifier les CORS côté backend

## 📄 Licence

Ce projet fait partie du projet CamerFarm AI.

## 👥 Contribution

Pour contribuer au projet, veuillez suivre les conventions de code et créer une pull request.

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Dernière mise à jour** : 2025
