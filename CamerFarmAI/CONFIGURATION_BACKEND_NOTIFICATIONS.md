# Configuration Backend pour les Notifications

Ce document décrit toutes les configurations backend nécessaires pour que le système de notifications fonctionne correctement avec le frontend.

## Table des matières

1. [Endpoints API requis](#endpoints-api-requis)
2. [Structures de données](#structures-de-données)
3. [Types d'événements](#types-dévénements)
4. [Canaux de notification](#canaux-de-notification)
5. [Statuts de notification](#statuts-de-notification)
6. [Formats de réponse](#formats-de-réponse)
7. [Codes de statut HTTP](#codes-de-statut-http)
8. [Authentification](#authentification)
9. [Pagination et limites](#pagination-et-limites)
10. [Gestion des erreurs](#gestion-des-erreurs)

---

## Endpoints API requis

Le backend doit implémenter les endpoints suivants :

### 1. Récupérer toutes les notifications de l'utilisateur
```
GET /api/v1/notifications/my
```

**Query Parameters (optionnels):**
- `unreadOnly` (boolean): Si `true`, retourne uniquement les notifications non lues

**Réponse attendue:**
- Format: Array de `Notification` ou `{ data: Notification[] }`
- Par défaut: Retourne les 50 dernières notifications
- Doit inclure l'objet `event` avec toutes les relations (sensor, actuator, plantation)

**Exemple de requête:**
```
GET /api/v1/notifications/my
GET /api/v1/notifications/my?unreadOnly=true
```

### 2. Récupérer les notifications web uniquement
```
GET /api/v1/notifications/web
```

**Réponse attendue:**
- Format: Array de `Notification` avec `canal: 'web'`
- Doit inclure l'objet `event` avec toutes les relations

### 3. Récupérer les statistiques des notifications
```
GET /api/v1/notifications/stats
```

**Réponse attendue:**
- Format: `NotificationStats` ou `{ data: NotificationStats }`
- Doit inclure les statistiques par canal (web, email, whatsapp)

### 4. Récupérer une notification spécifique
```
GET /api/v1/notifications/:id
```

**Paramètres:**
- `id` (UUID): ID de la notification

**Réponse attendue:**
- Format: `Notification` ou `{ data: Notification }`
- Doit inclure l'objet `event` avec toutes les relations

**Codes de statut:**
- `200`: Notification trouvée
- `404`: Notification non trouvée ou n'appartient pas à l'utilisateur

### 5. Marquer une notification comme lue
```
PATCH /api/v1/notifications/:id/read
```

**Paramètres:**
- `id` (UUID): ID de la notification

**Réponse attendue:**
- Format: `Notification` ou `{ data: Notification }` avec `isRead: true` et `dateLu` mis à jour
- Le frontend récupère ensuite la notification via `GET /notifications/:id` pour obtenir les champs mis à jour

**Codes de statut:**
- `200`: Notification marquée comme lue
- `404`: Notification non trouvée ou n'appartient pas à l'utilisateur

### 6. Supprimer une notification
```
DELETE /api/v1/notifications/:id
```

**Paramètres:**
- `id` (UUID): ID de la notification

**Réponse attendue:**
- Format: `{ success: true, message: "..." }` ou `{ data: { success: true, message: "..." } }`

**Codes de statut:**
- `200`: Notification supprimée avec succès
- `404`: Notification non trouvée ou n'appartient pas à l'utilisateur

---

## Structures de données

### Notification

```typescript
interface Notification {
  id: string;                    // UUID, requis
  canal: 'web' | 'email' | 'whatsapp';  // Requis, en minuscules
  statut: 'envoyee' | 'en_attente' | 'erreur';  // Requis, en minuscules
  eventId: string;                // UUID, requis
  userId: string;                // UUID, requis
  dateEnvoi: string;              // Format ISO 8601, requis (ou createdAt)
  isRead: boolean;                // Requis, peut être boolean, 'true'/'false', 0/1
  dateLu: string | null;          // Format ISO 8601, null si non lue
  event?: NotificationEvent;       // Optionnel mais recommandé pour l'affichage
}
```

**Notes importantes:**
- `statut` doit être en **minuscules** : `"envoyee"`, `"en_attente"`, `"erreur"`
- `canal` doit être en **minuscules** : `"web"`, `"email"`, `"whatsapp"`
- `isRead` peut être reçu comme boolean, string (`'true'`/`'false'`), ou number (`0`/`1`)
- Le frontend normalise automatiquement ces valeurs
- `dateEnvoi` peut aussi être nommé `createdAt` dans le backend

### NotificationEvent

```typescript
interface NotificationEvent {
  id: string;                     // UUID, requis
  type: string;                   // Requis (voir Types d'événements)
  description: string;            // Requis, description lisible de l'événement
  date: string;                    // Format ISO 8601, requis
  plantationId?: string;          // UUID, optionnel (peut être dans sensor/actuator)
  sensorId?: string | null;       // UUID, optionnel
  actuatorId?: string | null;     // UUID, optionnel
  sensor?: {                      // Optionnel, présent si l'événement concerne un capteur
    id: string;
    type: string;                  // Type de capteur (temperature, soilMoisture, etc.)
    status?: 'active' | 'inactive'; // Statut du capteur
    plantationId: string;
    plantation?: {                 // Optionnel mais recommandé
      name: string;
    };
  } | null;
  actuator?: {                    // Optionnel, présent si l'événement concerne un actionneur
    id: string;
    type: string;                  // Type d'actionneur (pompe, ventilateur, etc.)
    name: string;
    plantationId: string;
    plantation?: {                 // Optionnel mais recommandé
      name: string;
    };
  } | null;
}
```

**Notes importantes:**
- Le `plantationId` peut être présent directement dans `event`, ou dans `event.sensor.plantationId`, ou dans `event.actuator.plantationId`
- Le frontend cherche le `plantationId` dans tous ces emplacements
- Pour les événements de type `mode_changed`, le `plantationId` peut être dans `event.plantation.id`
- La `description` doit être lisible et peut contenir des références à `"la plantation"` ou `"undefined"` qui seront remplacées par le frontend avec le nom réel de la plantation

### NotificationStats

```typescript
interface NotificationStats {
  total: number;                   // Nombre total de notifications
  envoyees: number;                // Nombre de notifications envoyées (ou envoyee)
  enAttente: number;               // Nombre de notifications en attente (ou en_attente)
  erreurs: number;                 // Nombre de notifications en erreur (ou erreur)
  nonLues: number;                 // Nombre de notifications non lues (ou non_lues)
  lues: number;                    // Nombre de notifications lues
  parCanal?: {                     // Optionnel mais recommandé (ou par_canal)
    web?: number;
    email?: number;
    whatsapp?: number;
  };
}
```

**Notes importantes:**
- Le frontend accepte les formats `snake_case` (`envoyees`, `en_attente`) et `camelCase` (`envoyees`, `enAttente`)
- Les champs peuvent être nommés `envoyee`, `en_attente`, `erreur`, `non_lues`, `par_canal` en snake_case
- Le frontend calcule aussi les stats réelles à partir des notifications pour plus de précision

---

## Types d'événements

Le backend doit supporter les types d'événements suivants :

| Type | Description | plantationId requis | sensor/actuator requis |
|------|-------------|---------------------|----------------------|
| `seuil_depasse` | Un seuil de capteur a été dépassé | Oui | sensor |
| `threshold_changed` | Un seuil a été modifié manuellement | Oui | sensor |
| `actionneur_active` | Un actionneur a été activé | Oui | actuator |
| `actionneur_desactive` | Un actionneur a été désactivé | Oui | actuator |
| `mode_changed` | Le mode d'une plantation a changé | Oui | Non |
| `sensor_active` | Un capteur est devenu actif | Oui | sensor |
| `sensor_inactive` | Un capteur est devenu inactif | Oui | sensor |

**Notes importantes:**
- Le type est une string et peut être étendu avec d'autres types à l'avenir
- Le frontend formate automatiquement les descriptions selon le type d'événement
- Pour `mode_changed`, le `plantationId` peut être dans `event.plantation.id` ou directement dans `event.plantationId`

---

## Canaux de notification

Le backend doit supporter les canaux suivants :

| Canal | Valeur | Description |
|-------|--------|-------------|
| Web | `'web'` | Notifications affichées dans l'interface web |
| Email | `'email'` | Notifications envoyées par email |
| WhatsApp | `'whatsapp'` | Notifications envoyées via WhatsApp |

**Notes importantes:**
- Les valeurs doivent être en **minuscules**
- Le frontend filtre automatiquement les notifications web pour l'affichage dans l'interface
- Les notifications email et WhatsApp sont affichées dans la page de notifications complète

---

## Statuts de notification

Le backend doit utiliser les statuts suivants :

| Statut | Valeur | Description |
|--------|--------|-------------|
| Envoyée | `'envoyee'` | Notification envoyée avec succès |
| En attente | `'en_attente'` | Notification en attente d'envoi |
| Erreur | `'erreur'` | Erreur lors de l'envoi de la notification |

**Notes importantes:**
- Les valeurs doivent être en **minuscules**
- Le frontend normalise automatiquement les variantes (`'envoyée'`, `'sent'`, `'envoi'` → `'envoyee'`)
- Le frontend normalise aussi (`'error'`, `'failed'`, `'echec'` → `'erreur'`)

---

## Formats de réponse

Le backend peut retourner les données dans plusieurs formats. Le frontend normalise automatiquement :

### Format 1: Direct
```json
{
  "id": "uuid",
  "canal": "web",
  "statut": "envoyee",
  ...
}
```

### Format 2: Encapsulé avec `data`
```json
{
  "data": {
    "id": "uuid",
    "canal": "web",
    "statut": "envoyee",
    ...
  }
}
```

### Format 3: Avec `success`
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "canal": "web",
    "statut": "envoyee",
    ...
  }
}
```

### Format 4: Tableau direct
```json
[
  { "id": "uuid1", ... },
  { "id": "uuid2", ... }
]
```

### Format 5: Tableau encapsulé
```json
{
  "data": [
    { "id": "uuid1", ... },
    { "id": "uuid2", ... }
  ]
}
```

**Recommandation:** Utiliser le format 2 (`{ data: ... }`) pour la cohérence.

---

## Codes de statut HTTP

Le backend doit retourner les codes suivants :

| Code | Signification | Action frontend |
|------|---------------|-----------------|
| `200` | Succès | Traite la réponse normalement |
| `401` | Non authentifié | Redirige vers la page de connexion |
| `404` | Non trouvé | Affiche un message d'erreur approprié |
| `500` | Erreur serveur | Affiche un message d'erreur générique |

**Gestion des erreurs:**
- Le frontend retourne des valeurs par défaut (tableaux vides, objets avec valeurs par défaut) plutôt que de faire planter l'application
- Les erreurs sont loggées en mode développement

---

## Authentification

Tous les endpoints de notifications nécessitent une authentification :

**Header requis:**
```
Authorization: Bearer <accessToken>
```

**Gestion du token:**
- Le frontend envoie automatiquement le token dans le header `Authorization`
- Si le token est invalide ou expiré (401), le frontend redirige vers la page de connexion
- Le frontend gère automatiquement le rafraîchissement du token si nécessaire

**Isolation des données:**
- Les endpoints `/notifications/my` et `/notifications/stats` doivent retourner uniquement les notifications de l'utilisateur authentifié
- Les endpoints `/notifications/:id` doivent vérifier que la notification appartient à l'utilisateur authentifié

---

## Pagination et limites

### Limite par défaut
- **GET /notifications/my**: Retourne les **50 dernières notifications** par défaut
- Le frontend s'attend à recevoir un nombre limité de notifications

### Tri
- Les notifications doivent être triées par `dateEnvoi` (ou `createdAt`) en ordre **décroissant** (plus récentes en premier)
- Le frontend trie aussi côté client pour garantir l'ordre

### Recommandations pour l'extension future
Si vous souhaitez implémenter la pagination :
```typescript
// Format de réponse paginé (optionnel pour l'instant)
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3
  }
}
```

---

## Gestion des erreurs

### Erreurs à gérer côté backend

1. **Notification non trouvée (404)**
   ```json
   {
     "message": "Notification non trouvée ou accès refusé"
   }
   ```

2. **Token invalide (401)**
   ```json
   {
     "message": "Token invalide ou expiré"
   }
   ```

3. **Erreur serveur (500)**
   ```json
   {
     "message": "Erreur interne du serveur"
   }
   ```

### Comportement frontend

- **401**: Redirection automatique vers `/login`
- **404**: Affichage d'un message d'erreur, retour de valeurs par défaut
- **500**: Affichage d'un message d'erreur générique, retour de valeurs par défaut
- **Autres erreurs**: Log en mode développement, retour de valeurs par défaut

---

## Exemples de réponses complètes

### GET /notifications/my

```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "canal": "web",
      "statut": "envoyee",
      "eventId": "223e4567-e89b-12d3-a456-426614174001",
      "userId": "323e4567-e89b-12d3-a456-426614174002",
      "dateEnvoi": "2024-01-15T10:30:00Z",
      "isRead": false,
      "dateLu": null,
      "event": {
        "id": "223e4567-e89b-12d3-a456-426614174001",
        "type": "seuil_depasse",
        "description": "Le seuil de température a été dépassé dans la plantation Manioc Nord",
        "date": "2024-01-15T10:25:00Z",
        "plantationId": "423e4567-e89b-12d3-a456-426614174003",
        "sensorId": "523e4567-e89b-12d3-a456-426614174004",
        "sensor": {
          "id": "523e4567-e89b-12d3-a456-426614174004",
          "type": "temperature",
          "status": "active",
          "plantationId": "423e4567-e89b-12d3-a456-426614174003",
          "plantation": {
            "name": "Manioc Nord"
          }
        }
      }
    }
  ]
}
```

### GET /notifications/stats

```json
{
  "data": {
    "total": 150,
    "envoyees": 140,
    "enAttente": 5,
    "erreurs": 5,
    "nonLues": 25,
    "lues": 125,
    "parCanal": {
      "web": 100,
      "email": 30,
      "whatsapp": 20
    }
  }
}
```

### PATCH /notifications/:id/read

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "canal": "web",
    "statut": "envoyee",
    "eventId": "223e4567-e89b-12d3-a456-426614174001",
    "userId": "323e4567-e89b-12d3-a456-426614174002",
    "dateEnvoi": "2024-01-15T10:30:00Z",
    "isRead": true,
    "dateLu": "2024-01-15T11:00:00Z",
    "event": { ... }
  }
}
```

**Note:** Le frontend récupère ensuite la notification via `GET /notifications/:id` pour s'assurer d'avoir les champs à jour.

### DELETE /notifications/:id

```json
{
  "success": true,
  "message": "Notification supprimée avec succès"
}
```

---

## Checklist de configuration backend

- [ ] Tous les endpoints listés sont implémentés
- [ ] Les structures de données correspondent aux interfaces TypeScript
- [ ] Les valeurs de `statut` sont en minuscules (`envoyee`, `en_attente`, `erreur`)
- [ ] Les valeurs de `canal` sont en minuscules (`web`, `email`, `whatsapp`)
- [ ] Le champ `isRead` peut être boolean, string, ou number
- [ ] Les dates sont au format ISO 8601
- [ ] Les UUIDs sont valides
- [ ] L'authentification est requise pour tous les endpoints
- [ ] Les notifications sont isolées par utilisateur
- [ ] Les objets `event` incluent les relations `sensor`, `actuator`, et `plantation` quand applicable
- [ ] Le `plantationId` est présent dans l'événement (directement ou via sensor/actuator)
- [ ] Les statistiques incluent les compteurs par canal
- [ ] Les codes de statut HTTP sont corrects
- [ ] Les messages d'erreur sont clairs et informatifs
- [ ] La limite par défaut de 50 notifications est respectée
- [ ] Les notifications sont triées par date décroissante

---

## Notes supplémentaires

1. **Performance:** Le frontend charge les notifications au démarrage et les rafraîchit toutes les 60 secondes. Assurez-vous que les endpoints sont performants.

2. **Relations:** Le frontend enrichit automatiquement les descriptions d'événements avec les noms de plantations. Inclure les relations `sensor.plantation`, `actuator.plantation` améliore les performances.

3. **Compatibilité:** Le frontend normalise automatiquement les variations de format (snake_case/camelCase, types de données). Cependant, il est recommandé d'utiliser le format standard pour éviter les problèmes.

4. **Extensibilité:** Le système est conçu pour être extensible. Vous pouvez ajouter de nouveaux types d'événements ou canaux sans modifier le frontend (tant que les structures de base sont respectées).

---

**Dernière mise à jour:** Basé sur l'analyse du code frontend (notificationService.ts, types, et MODELE_DONNEES_BACKEND.md)

