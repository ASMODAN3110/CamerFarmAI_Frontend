# Requirements - CamerFarm AI Frontend

## 📋 Prérequis système

### Node.js
- **Version minimale** : Node.js 18.0.0
- **Version recommandée** : Node.js 20.x ou supérieure
- **Installation** : [https://nodejs.org/](https://nodejs.org/)

### Gestionnaire de paquets
- **npm** : Inclus avec Node.js (version 9.x ou supérieure)
- **yarn** (optionnel) : Version 1.22.x ou supérieure
- **pnpm** (optionnel) : Version 8.x ou supérieure

### Navigateurs supportés
- **Chrome** : Version 90 ou supérieure
- **Firefox** : Version 88 ou supérieure
- **Safari** : Version 14 ou supérieure
- **Edge** : Version 90 ou supérieure

### Backend API
- **URL par défaut** : `http://localhost:3000/api/v1`
- **Protocole** : HTTP/HTTPS
- **CORS** : Doit être configuré pour accepter les requêtes du frontend
- **Authentification** : JWT (JSON Web Tokens)

## 📦 Dépendances de production

### Core
- **react** : `^19.2.0` - Bibliothèque UI principale
- **react-dom** : `^19.2.0` - Rendu React pour le DOM
- **react-router-dom** : `^6.28.0` - Routage côté client

### Gestion d'état
- **zustand** : `^5.0.8` - Gestion d'état légère et performante

### Communication API
- **axios** : `^1.13.2` - Client HTTP pour les requêtes API

### UI et icônes
- **react-icons** : `^5.3.0` - Bibliothèque d'icônes

### Visualisation de données
- **recharts** : `^3.5.0` - Bibliothèque de graphiques React

## 🛠️ Dépendances de développement

### Build et bundling
- **vite** : `^7.2.4` - Build tool et dev server ultra-rapide
- **@vitejs/plugin-react** : `^5.1.1` - Plugin Vite pour React

### TypeScript
- **typescript** : `~5.9.3` - Typage statique
- **@types/node** : `^24.10.1` - Types pour Node.js
- **@types/react** : `^19.2.5` - Types pour React
- **@types/react-dom** : `^19.2.3` - Types pour React DOM

### Linting et qualité de code
- **eslint** : `^9.39.1` - Linter JavaScript/TypeScript
- **@eslint/js** : `^9.39.1` - Configuration ESLint moderne
- **typescript-eslint** : `^8.46.4` - Support TypeScript pour ESLint
- **eslint-plugin-react-hooks** : `^7.0.1` - Règles pour les hooks React
- **eslint-plugin-react-refresh** : `^0.4.24` - Support React Refresh
- **globals** : `^16.5.0` - Variables globales pour ESLint

### Compilation React
- **babel-plugin-react-compiler** : `^1.0.0` - Compilateur React expérimental

## 🔧 Configuration requise

### Variables d'environnement
Créer un fichier `.env` à la racine du projet :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:3000/api/v1
```

### Configuration TypeScript
- **tsconfig.json** : Configuration TypeScript principale
- **tsconfig.app.json** : Configuration pour l'application
- **tsconfig.node.json** : Configuration pour Node.js

### Configuration Vite
- **vite.config.ts** : Configuration du build et du dev server

### Configuration ESLint
- **eslint.config.js** : Règles de linting

## 📊 Versions des dépendances

### Dependencies (Production)
```
axios: ^1.13.2
react: ^19.2.0
react-dom: ^19.2.0
react-icons: ^5.3.0
react-router-dom: ^6.28.0
recharts: ^3.5.0
zustand: ^5.0.8
```

### DevDependencies (Développement)
```
@eslint/js: ^9.39.1
@types/node: ^24.10.1
@types/react: ^19.2.5
@types/react-dom: ^19.2.3
@vitejs/plugin-react: ^5.1.1
babel-plugin-react-compiler: ^1.0.0
eslint: ^9.39.1
eslint-plugin-react-hooks: ^7.0.1
eslint-plugin-react-refresh: ^0.4.24
globals: ^16.5.0
typescript: ~5.9.3
typescript-eslint: ^8.46.4
vite: ^7.2.4
```

## 🚀 Installation

### Installation des dépendances

```bash
# Avec npm
npm install

# Avec yarn
yarn install

# Avec pnpm
pnpm install
```

### Vérification de l'installation

```bash
# Vérifier la version de Node.js
node --version  # Doit être >= 18.0.0

# Vérifier la version de npm
npm --version   # Doit être >= 9.0.0

# Vérifier que les dépendances sont installées
npm list --depth=0
```

## 🔍 Vérification des requirements

### Script de vérification

Vous pouvez créer un script pour vérifier que tous les requirements sont satisfaits :

```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier que les dépendances sont installées
test -d node_modules && echo "✓ node_modules existe" || echo "✗ node_modules manquant"

# Vérifier que le fichier .env existe
test -f .env && echo "✓ .env existe" || echo "⚠ .env manquant (créer avec VITE_API_URL)"
```

## 📝 Notes importantes

### Versions de React
- Ce projet utilise **React 19**, qui est une version récente
- Assurez-vous que toutes les dépendances sont compatibles avec React 19

### TypeScript
- Le projet utilise TypeScript strict mode
- Tous les fichiers doivent être typés correctement

### Vite
- Vite nécessite Node.js 18+ pour fonctionner correctement
- Le port par défaut est 5173 (modifiable dans `vite.config.ts`)

### Backend
- Le backend doit être démarré avant de lancer le frontend
- L'API doit être accessible à l'URL configurée dans `.env`
- Les CORS doivent être configurés pour accepter les requêtes du frontend

## 🐛 Résolution de problèmes

### Erreur "Node version not supported"
- Mettre à jour Node.js vers la version 18 ou supérieure

### Erreur "Module not found"
- Exécuter `npm install` pour installer les dépendances
- Vérifier que `node_modules` existe

### Erreur "Cannot find module"
- Supprimer `node_modules` et `package-lock.json`
- Exécuter `npm install` à nouveau

### Erreur de connexion API
- Vérifier que le backend est démarré
- Vérifier l'URL dans `.env`
- Vérifier les CORS côté backend

---

**Dernière mise à jour** : Novembre 2025

