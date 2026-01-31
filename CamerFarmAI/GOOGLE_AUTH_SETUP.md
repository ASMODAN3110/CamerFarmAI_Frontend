# Configuration de l'authentification Google

## Variables d'environnement requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Backend API URL
# En développement, utilise le proxy Vite configuré dans vite.config.ts
# En production, utilisez l'URL complète de votre backend
VITE_API_URL=http://localhost:3000/api/v1

# Google OAuth 2.0 Client ID
# Le Client ID doit être identique à celui configuré dans le backend (GOOGLE_CLIENT_ID)
# Format: xxxxx.apps.googleusercontent.com
# Client ID du backend: 331821726072-ns07hb7p5bqtlmk0p248s3vcmenlrv55.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=331821726072-ns07hb7p5bqtlmk0p248s3vcmenlrv55.apps.googleusercontent.com
```

## Configuration Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API "Google Identity Services" (anciennement "Google+ API" ou "Identity Toolkit API")
4. Créez des identifiants OAuth 2.0 :
   - Type : Application Web
   - Authorized JavaScript origins :
     - `http://localhost:5173` (développement)
     - `https://votre-domaine.com` (production)
5. Récupérez le Client ID et ajoutez-le dans votre fichier `.env`

## Endpoints API

L'authentification Google utilise deux endpoints distincts :

### 1. Connexion Google (utilisateur existant)
**Endpoint :** `POST /api/v1/auth/google/login`

Utilisé pour connecter un utilisateur qui a déjà un compte lié à son compte Google.

### 2. Inscription Google (nouvel utilisateur)
**Endpoint :** `POST /api/v1/auth/google/register`

Utilisé pour créer un nouveau compte avec un compte Google.

### 3. Flux automatique
Le composant `GoogleSignInButton` peut utiliser un flux automatique (`mode="auto"`) qui :
- Essaie d'abord la connexion (`/auth/google/login`)
- Si aucun compte n'est trouvé (404), essaie automatiquement l'inscription (`/auth/google/register`)

## Utilisation

### Sur la page de connexion
```tsx
<GoogleSignInButton mode="login" />
```

### Sur la page d'inscription
```tsx
<GoogleSignInButton mode="register" />
```

### Mode automatique (par défaut)
```tsx
<GoogleSignInButton mode="auto" />
// ou simplement
<GoogleSignInButton />
```

Le mode automatique détecte la page actuelle et utilise le bon endpoint.

## Gestion des erreurs

Le composant gère automatiquement les erreurs suivantes :

- **404 (login)** : Aucun compte trouvé → Propose l'inscription
- **409 (register)** : Compte existe déjà → Propose la connexion
- **403** : Compte désactivé → Affiche un message approprié
- **401** : Token invalide → Demande de réessayer
- **400** : Données invalides → Affiche les erreurs de validation

## Important

- Le `VITE_GOOGLE_CLIENT_ID` doit être identique au `GOOGLE_CLIENT_ID` configuré dans le backend
- Le bouton Google ne s'affichera pas si `VITE_GOOGLE_CLIENT_ID` n'est pas défini
- Les deux endpoints (`/auth/google/login` et `/auth/google/register`) sont utilisés selon le contexte
- Le flux automatique améliore l'expérience utilisateur en gérant automatiquement la distinction connexion/inscription