# Documentation : Implémentation des Notifications par Email

Ce document décrit comment la fonctionnalité de notifications par email est implémentée dans le frontend CamerFarmAI.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Services et API](#services-et-api)
4. [Composants UI](#composants-ui)
5. [Gestion des erreurs](#gestion-des-erreurs)
6. [Diagnostic et débogage](#diagnostic-et-débogage)
7. [Filtrage et affichage](#filtrage-et-affichage)
8. [Statistiques](#statistiques)
9. [Flux de données](#flux-de-données)
10. [Configuration requise](#configuration-requise)

---

## Vue d'ensemble

Le système de notifications par email permet aux utilisateurs de recevoir des notifications par email lorsque des événements se produisent dans leurs plantations (seuil dépassé, actionneur activé, etc.).

**Caractéristiques principales :**
- Affichage des notifications email dans l'interface web
- Filtrage par canal (email, web, toutes)
- Détection et affichage des erreurs d'envoi
- Statistiques par canal
- Diagnostic automatique des problèmes
- Marquage comme lu / suppression

**Important :** Le frontend n'envoie **pas** directement les emails. Il affiche uniquement les notifications email créées et gérées par le backend. L'envoi réel des emails est géré côté backend via SMTP.

---

## Architecture

### Structure des fichiers

```
src/
├── services/
│   └── notificationService.ts      # Service API pour les notifications
├── hooks/
│   └── useNotifications.ts          # Hook pour gérer les notifications
├── contexts/
│   └── NotificationContext.tsx      # Contexte React pour partager l'état
├── components/
│   └── notifications/
│       ├── NotificationList.tsx     # Liste des notifications
│       └── NotificationStats.tsx   # Statistiques des notifications
├── app/
│   └── NotificationsPage.tsx       # Page principale des notifications
└── utils/
    ├── emailNotificationDiagnostic.ts  # Outil de diagnostic
    └── notificationFormatters.ts       # Formatage des notifications
```

### Flux de données

```
Backend API
    ↓
notificationService (API calls)
    ↓
useNotifications (hook)
    ↓
NotificationContext (React Context)
    ↓
NotificationsPage / NotificationList (UI)
```

---

## Services et API

### notificationService

Le service `notificationService` (`src/services/notificationService.ts`) gère toutes les interactions avec l'API backend pour les notifications.

#### Méthode : `getAllEmail()`

Récupère uniquement les notifications email de l'utilisateur connecté.

```typescript
async getAllEmail(): Promise<Notification[]>
```

**Implémentation :**
```typescript
async getAllEmail(): Promise<Notification[]> {
  const allNotifications = await this.getAll();
  // Filtrer uniquement les notifications email et trier par date décroissante
  const emailNotifications = allNotifications
    .filter(notif => notif.canal === 'email')
    .sort((a, b) => new Date(b.dateEnvoi).getTime() - new Date(a.dateEnvoi).getTime());
  
  return emailNotifications;
}
```

**Caractéristiques :**
- Filtre les notifications avec `canal === 'email'`
- Trie par date décroissante (plus récentes en premier)
- Retourne un tableau vide en cas d'erreur

#### Structure de données : Notification

```typescript
interface Notification {
  id: string;                    // UUID
  canal: 'web' | 'email' | 'whatsapp';  // Canal de notification
  statut: 'envoyee' | 'en_attente' | 'erreur';  // Statut d'envoi
  eventId: string;               // UUID de l'événement
  userId: string;               // UUID de l'utilisateur
  dateEnvoi: string;             // Format ISO 8601
  isRead: boolean;               // Si la notification a été lue
  dateLu: string | null;         // Date de lecture (ISO 8601)
  event?: NotificationEvent;     // Détails de l'événement
}
```

**Normalisation automatique :**
- Le service normalise automatiquement les valeurs de `canal` et `statut` (insensible à la casse)
- Convertit `isRead` depuis différents formats (boolean, string, number)

---

## Composants UI

### NotificationsPage

**Fichier :** `src/app/NotificationsPage.tsx`

Page principale qui affiche toutes les notifications avec filtrage par canal.

#### Fonctionnalités principales

1. **Filtrage par canal**
   ```typescript
   type FilterType = 'all' | 'web' | 'email' | 'unread';
   ```

2. **Chargement des notifications filtrées**
   ```typescript
   useEffect(() => {
     const loadFilteredNotifications = async () => {
       switch (filter) {
         case 'email':
           filtered = await notificationService.getAllEmail();
           break;
         // ...
       }
     };
   }, [filter]);
   ```

3. **Détection des erreurs email**
   ```typescript
   const emailErrors = useMemo(() => {
     return notifications.filter(
       (n) => n.canal === NotificationCanal.EMAIL && 
             n.statut === NotificationStatut.ERREUR
     );
   }, [notifications]);
   ```

4. **Alerte d'erreur email**
   - Affiche une alerte si des notifications email sont en erreur
   - Propose des solutions de dépannage
   - Bouton de diagnostic (en mode développement)

#### Structure du composant

```tsx
<NotificationsPage>
  <Header />
  <main>
    {/* Alerte erreurs email */}
    {hasEmailErrors && <EmailErrorAlert />}
    
    {/* Statistiques */}
    <NotificationStats />
    
    {/* Liste des notifications */}
    <NotificationList 
      filter={filter}
      onFilterChange={setFilter}
    />
  </main>
  <Footer />
</NotificationsPage>
```

### NotificationList

**Fichier :** `src/components/notifications/NotificationList.tsx`

Composant qui affiche la liste des notifications avec filtrage et actions.

#### Fonctionnalités

1. **Filtrage côté client**
   ```typescript
   const filteredNotifications = notifications.filter(notif => {
     if (filter === 'email') return notif.canal === NotificationCanal.EMAIL;
     // ...
   });
   ```

2. **Affichage des badges de statut**
   - `envoyee` : Badge vert avec icône ✓
   - `en_attente` : Badge orange avec icône ⏰
   - `erreur` : Badge rouge avec icône ⚠️

3. **Icônes de canal**
   - Email : `FaEnvelope` (📧)
   - Web : `FaGlobe` (🌐)
   - WhatsApp : `FaEnvelope` (fallback)

4. **Message d'erreur pour les emails**
   ```tsx
   {notification.canal === NotificationCanal.EMAIL && 
    notification.statut === NotificationStatut.ERREUR && (
     <div className={styles.errorInfo}>
       <p>💡 Cette notification email n'a pas pu être envoyée...</p>
     </div>
   )}
   ```

5. **Actions disponibles**
   - Marquer comme lu (si non lue)
   - Supprimer la notification

#### Structure d'une notification email

```tsx
<div className={styles.notificationItem}>
  <div className={styles.notificationHeader}>
    <h3>{eventTypeLabel}</h3>
    <div className={styles.notificationBadges}>
      <span className={styles.badge}>
        {/* Badge statut (envoyee/en_attente/erreur) */}
      </span>
      <span className={styles.badge}>
        <FaEnvelope /> Email
      </span>
    </div>
  </div>
  
  <div className={styles.notificationContent}>
    <p>{event.description}</p>
    {hasError && <div className={styles.errorInfo}>...</div>}
  </div>
  
  <div className={styles.notificationActions}>
    {/* Boutons d'action */}
  </div>
</div>
```

### NotificationStats

**Fichier :** `src/components/notifications/NotificationStats.tsx`

Affiche les statistiques des notifications, y compris par canal.

#### Statistiques affichées

1. **Statistiques générales**
   - Total
   - Envoyées
   - En attente
   - Erreurs
   - Non lues

2. **Statistiques par canal**
   ```tsx
   {stats.parCanal && (
     <div className={styles.channelStats}>
       <div className={styles.channelItem}>
         <span>Email</span>
         <span>{stats.parCanal.email || 0}</span>
       </div>
     </div>
   )}
   ```

---

## Gestion des erreurs

### Détection des erreurs

Le système détecte automatiquement les notifications email en erreur :

```typescript
const emailErrors = notifications.filter(
  (n) => n.canal === NotificationCanal.EMAIL && 
        n.statut === NotificationStatut.ERREUR
);
```

### Affichage des erreurs

1. **Alerte globale** (NotificationsPage)
   - S'affiche en haut de la page si des erreurs sont détectées
   - Liste les causes possibles
   - Propose des solutions

2. **Message d'erreur par notification** (NotificationList)
   - Affiche un message d'aide pour chaque notification en erreur
   - Indique que la configuration SMTP doit être vérifiée

### Causes d'erreur possibles

1. **Problème de configuration SMTP**
   - Variables d'environnement manquantes ou incorrectes
   - Serveur SMTP inaccessible
   - Identifiants incorrects

2. **Adresse email manquante**
   - L'utilisateur n'a pas d'adresse email dans son profil
   - L'adresse email est invalide

3. **Problème réseau**
   - Le serveur SMTP n'est pas accessible
   - Timeout lors de l'envoi

### Gestion des erreurs dans le service

```typescript
try {
  const res = await api.get('/notifications/my');
  // ...
} catch (error: any) {
  // En cas d'erreur, retourner un tableau vide
  // plutôt que de faire planter l'application
  if (import.meta.env.DEV) {
    console.error('Erreur lors de la récupération des notifications:', error);
  }
  return [];
}
```

---

## Diagnostic et débogage

### Outil de diagnostic

**Fichier :** `src/utils/emailNotificationDiagnostic.ts`

Fonction de diagnostic disponible en mode développement pour identifier les problèmes avec les notifications email.

#### Utilisation

En mode développement, la fonction est disponible dans la console du navigateur :

```javascript
diagnoseEmailNotifications()
```

#### Étapes du diagnostic

1. **Vérification de l'adresse email utilisateur**
   - Vérifie si l'utilisateur a une adresse email configurée
   - Affiche l'adresse si présente

2. **Vérification des notifications email**
   - Compte le nombre de notifications email créées
   - Affiche les détails de chaque notification

3. **Vérification des statistiques**
   - Affiche les statistiques générales
   - Vérifie les statistiques par canal

4. **Vérification des erreurs**
   - Liste les notifications email en erreur
   - Propose des causes possibles

5. **Vérification des notifications en attente**
   - Liste les notifications en attente d'envoi

6. **Vérification des événements récents**
   - Affiche les événements d'actionneurs récents

7. **Résumé et recommandations**
   - Fournit un résumé des problèmes détectés
   - Propose des actions correctives

#### Exemple de sortie

```
🔍 === DIAGNOSTIC DES NOTIFICATIONS EMAIL ===

📧 Étape 1: Vérification de l'adresse email de l'utilisateur
✅ Adresse email configurée: user@example.com

📬 Étape 2: Vérification des notifications email
✅ 5 notification(s) email créée(s)

📊 Étape 3: Vérification des statistiques
Statistiques générales:
   - Total: 20
   - Envoyées: 15
   - En attente: 3
   - Erreurs: 2

⚠️ Étape 4: Vérification des notifications en erreur
❌ PROBLÈME #3: 2 notification(s) email en erreur
   Causes possibles:
   - Problème de configuration SMTP côté backend
   - Serveur SMTP inaccessible
   - Identifiants SMTP incorrects

📋 === RÉSUMÉ ET RECOMMANDATIONS ===
❌ Action requise: Vérifiez la configuration SMTP côté backend
```

#### Intégration dans l'application

La fonction est automatiquement exposée en mode développement :

```typescript
// src/main.tsx
if (import.meta.env.DEV) {
  import('./utils/emailNotificationDiagnostic').then((module) => {
    (window as any).diagnoseEmailNotifications = module.diagnoseEmailNotifications;
  });
}
```

---

## Filtrage et affichage

### Filtres disponibles

1. **Toutes** (`'all'`)
   - Affiche toutes les notifications (web, email, WhatsApp)

2. **Web** (`'web'`)
   - Affiche uniquement les notifications web

3. **Email** (`'email'`)
   - Affiche uniquement les notifications email
   - Utilise `notificationService.getAllEmail()`

4. **Non lues** (`'unread'`)
   - Affiche uniquement les notifications non lues
   - Tous canaux confondus

### Implémentation du filtre email

```typescript
// Dans NotificationsPage.tsx
useEffect(() => {
  const loadFilteredNotifications = async () => {
    switch (filter) {
      case 'email':
        filtered = await notificationService.getAllEmail();
        break;
      // ...
    }
    setNotifications(filtered);
  };
  loadFilteredNotifications();
}, [filter]);
```

### Filtrage côté client

Le composant `NotificationList` applique aussi un filtre côté client pour garantir la cohérence :

```typescript
const filteredNotifications = notifications.filter(notif => {
  if (filter === 'email') return notif.canal === NotificationCanal.EMAIL;
  // ...
});
```

---

## Statistiques

### Affichage des statistiques email

Le composant `NotificationStats` affiche les statistiques par canal :

```tsx
<div className={styles.channelStats}>
  <h3>Par canal</h3>
  <div className={styles.channelGrid}>
    <div className={styles.channelItem}>
      <span>Email</span>
      <span>{stats.parCanal?.email || 0}</span>
    </div>
  </div>
</div>
```

### Calcul des statistiques

Les statistiques sont calculées de deux façons :

1. **Depuis l'API backend** (`/notifications/stats`)
   - Statistiques pré-calculées
   - Peut ne pas être à jour

2. **Calcul réel depuis les notifications** (fallback)
   ```typescript
   const realStats = {
     email: notifications.filter(n => n.canal === 'email').length,
     // ...
   };
   ```

Le frontend utilise les statistiques réelles si disponibles, sinon celles du backend.

---

## Flux de données

### Chargement initial

```
1. App démarre
   ↓
2. NotificationProvider initialise useNotifications
   ↓
3. useNotifications charge les notifications web (par défaut)
   ↓
4. NotificationContext expose les données
   ↓
5. NotificationsPage affiche les notifications
```

### Filtrage par email

```
1. Utilisateur clique sur filtre "Email"
   ↓
2. NotificationsPage appelle notificationService.getAllEmail()
   ↓
3. Service filtre les notifications avec canal === 'email'
   ↓
4. NotificationsPage met à jour l'état
   ↓
5. NotificationList affiche les notifications filtrées
```

### Rafraîchissement automatique

```
1. useNotifications configure un intervalle (45s par défaut)
   ↓
2. Toutes les 45 secondes, recharge les notifications
   ↓
3. Met à jour le contexte
   ↓
4. Les composants se mettent à jour automatiquement
```

### Marquage comme lu

```
1. Utilisateur clique sur "Marquer comme lu"
   ↓
2. NotificationList appelle onMarkAsRead(id)
   ↓
3. NotificationsPage appelle markAsRead(id) du contexte
   ↓
4. useNotifications appelle notificationService.markAsRead(id)
   ↓
5. API PATCH /notifications/:id/read
   ↓
6. Service récupère la notification mise à jour
   ↓
7. Contexte rafraîchit les notifications
   ↓
8. UI se met à jour
```

---

## Configuration requise

### Backend

Le backend doit implémenter les endpoints suivants (voir `CONFIGURATION_BACKEND_NOTIFICATIONS.md`) :

1. `GET /api/v1/notifications/my` - Liste toutes les notifications
2. `GET /api/v1/notifications/stats` - Statistiques
3. `PATCH /api/v1/notifications/:id/read` - Marquer comme lu
4. `DELETE /api/v1/notifications/:id` - Supprimer

### Structure de données backend

Le backend doit retourner des notifications avec :

```typescript
{
  id: string;
  canal: 'email';  // En minuscules
  statut: 'envoyee' | 'en_attente' | 'erreur';  // En minuscules
  eventId: string;
  userId: string;
  dateEnvoi: string;  // ISO 8601
  isRead: boolean;
  dateLu: string | null;
  event?: {
    id: string;
    type: string;
    description: string;
    date: string;
    // ... relations sensor, actuator, plantation
  };
}
```

### Configuration SMTP (Backend)

Le backend doit être configuré avec :

- `SMTP_HOST` : Serveur SMTP
- `SMTP_PORT` : Port SMTP
- `SMTP_USER` : Nom d'utilisateur SMTP
- `SMTP_PASS` : Mot de passe SMTP
- `SMTP_FROM` : Adresse email expéditrice

### Profil utilisateur

L'utilisateur doit avoir une adresse email valide dans son profil pour recevoir les notifications email.

---

## Points importants

### 1. Le frontend n'envoie pas d'emails

Le frontend affiche uniquement les notifications email créées par le backend. L'envoi réel des emails est géré côté backend via SMTP.

### 2. Normalisation automatique

Le service normalise automatiquement :
- Les valeurs de `canal` (insensible à la casse)
- Les valeurs de `statut` (insensible à la casse)
- Le champ `isRead` (boolean, string, number)

### 3. Gestion gracieuse des erreurs

En cas d'erreur API, le frontend retourne des valeurs par défaut (tableaux vides) plutôt que de faire planter l'application.

### 4. Rafraîchissement automatique

Les notifications sont rafraîchies automatiquement toutes les 45 secondes (configurable).

### 5. Filtrage hybride

Le filtrage est effectué à la fois :
- Côté serveur (via `getAllEmail()`)
- Côté client (pour garantir la cohérence)

### 6. Diagnostic en développement

L'outil de diagnostic est disponible uniquement en mode développement pour aider au débogage.

---

## Exemples d'utilisation

### Charger les notifications email

```typescript
import { notificationService } from '@/services/notificationService';

const emailNotifications = await notificationService.getAllEmail();
```

### Utiliser le contexte

```typescript
import { useNotificationContext } from '@/contexts/NotificationContext';

function MyComponent() {
  const { notifications, stats, refresh } = useNotificationContext();
  
  const emailNotifications = notifications.filter(
    n => n.canal === 'email'
  );
  
  return <div>{emailNotifications.length} notifications email</div>;
}
```

### Filtrer par email dans une page

```typescript
import { notificationService } from '@/services/notificationService';

const [filter, setFilter] = useState<'all' | 'web' | 'email' | 'unread'>('all');
const [notifications, setNotifications] = useState([]);

useEffect(() => {
  if (filter === 'email') {
    notificationService.getAllEmail().then(setNotifications);
  }
}, [filter]);
```

### Lancer le diagnostic

```typescript
// En mode développement uniquement
if (import.meta.env.DEV && (window as any).diagnoseEmailNotifications) {
  await (window as any).diagnoseEmailNotifications();
}
```

---

## Dépannage

### Problème : Aucune notification email n'apparaît

**Solutions :**
1. Vérifier que le backend crée bien des notifications email
2. Vérifier que l'utilisateur a une adresse email dans son profil
3. Utiliser `diagnoseEmailNotifications()` pour diagnostiquer

### Problème : Notifications email en erreur

**Solutions :**
1. Vérifier la configuration SMTP du backend
2. Vérifier que l'adresse email de l'utilisateur est valide
3. Consulter les logs du backend pour l'erreur exacte

### Problème : Les statistiques email ne sont pas à jour

**Note :** Le frontend calcule les statistiques réelles depuis les notifications si les statistiques du backend ne sont pas à jour.

---

**Dernière mise à jour :** Basé sur l'analyse du code source (notificationService.ts, NotificationsPage.tsx, NotificationList.tsx, etc.)

