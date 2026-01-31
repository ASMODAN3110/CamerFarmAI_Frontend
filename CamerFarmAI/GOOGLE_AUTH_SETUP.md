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
3. Activez l'API "Google+ API" ou "Identity Toolkit API"
4. Créez des identifiants OAuth 2.0 :
   - Type : Application Web
   - Authorized JavaScript origins :
     - `http://localhost:5173` (développement)
     - `https://votre-domaine.com` (production)
5. Récupérez le Client ID et ajoutez-le dans votre fichier `.env`

## Important

- Le `VITE_GOOGLE_CLIENT_ID` doit être identique au `GOOGLE_CLIENT_ID` configuré dans le backend
- Le bouton Google ne s'affichera pas si `VITE_GOOGLE_CLIENT_ID` n'est pas défini
