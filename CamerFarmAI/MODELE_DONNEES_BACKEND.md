# Modèles de données attendus par le Frontend depuis le Backend

Ce document décrit tous les modèles de données que le frontend attend de recevoir du backend via les API.

## Table des matières

1. [Authentification](#authentification)
2. [Utilisateur](#utilisateur)
3. [Plantations](#plantations)
4. [Capteurs](#capteurs)
5. [Actionneurs](#actionneurs)
6. [Lectures de capteurs](#lectures-de-capteurs)
7. [Notifications](#notifications)
8. [Technicien](#technicien)

---

## Authentification

### LoginResponse

Réponse de l'endpoint `/auth/login` ou `/auth/login/verify-2fa`

```typescript
interface LoginResponse {
  accessToken?: string;
  requires2FA?: boolean;
  temporaryToken?: string;
  user?: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: 'farmer' | 'technician' | 'admin';
    language: string;
  };
  // Le backend peut aussi retourner {success: true, data: {...}}
  data?: {
    requires2FA?: boolean;
    temporaryToken?: string;
    user?: {
      id: string;
      phone: string;
      firstName: string;
      lastName: string;
      role: 'farmer' | 'technician' | 'admin';
      language: string;
    };
    accessToken?: string;
  };
}
```

### TwoFactorSecretResponse

Réponse de l'endpoint `/auth/2fa/generate`

```typescript
interface TwoFactorSecretResponse {
  secret: string;
  qrCodeUrl: string;
}
```

### Refresh Token Response

Réponse de l'endpoint `/auth/refresh`

```typescript
{
  accessToken: string;
  // ou
  data: {
    accessToken: string;
  };
}
```

---

## Utilisateur

### User

Réponse de l'endpoint `/auth/me` ou `/auth/profile`

```typescript
interface User {
  id: string;                    // UUID
  phone: string;                 // Requis, unique
  firstName: string;             // Requis
  lastName: string;              // Requis
  role: 'farmer' | 'technician' | 'admin';
  email?: string | null;         // Optionnel, unique si présent
  twoFactorEnabled: boolean;     // Default: false
  isActive: boolean;              // Default: true (nouveau champ backend)
  // Champs non-backend (pour compatibilité frontend uniquement)
  language?: string;             // Non-backend, utilisé pour les préférences UI
  avatarUrl?: string | null;      // Non-backend, utilisé pour l'affichage
}
```

**Note:** Le frontend accepte les formats `snake_case` et `camelCase` et normalise automatiquement. Les champs `language` et `avatarUrl` sont utilisés uniquement côté frontend et ne sont pas envoyés au backend.

---

## Plantations

### Plantation

Réponse de l'endpoint `/plantations/my`, `/plantations/:id`, ou `/plantations` (POST)

```typescript
interface Plantation {
  id: string;                    // UUID
  name: string;                  // Requis
  location: string | null;        // Nullable selon backend
  area?: number;                 // Optionnel, en m² (mètres carrés)
  cropType: string;              // Requis (ex: "manioc", "maïs")
  coordinates?: {                 // Optionnel
    lat: number;
    lng: number;
  };
  mode: 'automatic' | 'manual';  // Default: 'automatic'
  ownerId?: string;               // UUID du propriétaire
  sensors?: Sensor[];
  actuators?: Actuator[];
  hasSensors?: boolean;           // Calculé (non-backend)
  hasActuators?: boolean;         // Calculé (non-backend)
  createdAt: string;              // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  // État calculé par le backend
  etat?: {
    status: 'healthy' | 'warning' | 'critical' | 'unknown';
    activeSensors: number;
    totalSensors: number;
    activeActuators: number;
    totalActuators: number;
    message: string;
  };
  // Pour compatibilité avec l'ancienne structure
  latestSensorData?: any;
}
```

**Note:** Le champ `area` doit toujours être en m². Le frontend convertit automatiquement depuis d'autres unités (ha, acre, km²) avant l'envoi au backend.

### CreatePlantationDto (pour création)

Payload pour l'endpoint `POST /plantations`

```typescript
interface CreatePlantationDto {
  name: string;                  // Requis
  location?: string;             // Optionnel
  area?: number;                // Optionnel, en m² (le frontend convertit depuis d'autres unités)
  cropType: string;             // Requis
  coordinates?: {                // Optionnel
    lat: number;
    lng: number;
  };
  mode?: 'automatic' | 'manual'; // Optionnel, default: 'automatic'
}
```

---

## Capteurs

### Sensor

Réponse de l'endpoint `/plantations/:id/sensors` ou inclus dans une Plantation

```typescript
interface Sensor {
  id: string;                    // UUID
  type: SensorType | string;     // Requis
  status: 'active' | 'inactive';  // 'active' | 'inactive' (pas 'offline')
  plantationId: string;          // UUID
  seuilMin?: number;             // Optionnel, decimal(10,2)
  seuilMax?: number;             // Optionnel, decimal(10,2)
  createdAt: string;             // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  latestReading?: SensorReading; // Dernière lecture du capteur
  readings?: SensorReading[];     // Historique des lectures
}
```

### SensorType

```typescript
type SensorType = 
  | 'temperature'
  | 'soilMoisture'
  | 'co2Level'
  | 'waterLevel'
  | 'luminosity';
```

**Note:** 
- Le type `'humidity'` n'existe plus dans le backend (utiliser `'soilMoisture'` ou `'waterLevel'` à la place)
- Le statut `'offline'` n'existe plus (utiliser `'inactive'` à la place). Le frontend gère gracieusement `'offline'` en le convertissant en `'inactive'` pour compatibilité.
- Le frontend accepte aussi `sensorType` comme alias de `type` lors de la normalisation.

---

## Actionneurs

### Actuator

Réponse de l'endpoint inclus dans une Plantation ou via `/plantations/:id/actuators/:actuatorId` (PATCH)

```typescript
interface Actuator {
  id: string;                    // UUID
  type: string;                  // Requis (ex: "pompe", "ventilateur", "éclairage")
  name: string;                  // Requis
  status: 'active' | 'inactive'; // 'active' | 'inactive' (pas 'offline')
  plantationId: string;          // UUID
  metadata?: Record<string, any>; // Optionnel, JSON
  createdAt: string;             // Format ISO 8601
  updatedAt: string;             // Format ISO 8601
  // Propriété calculée (non-backend) pour compatibilité frontend
  isOn?: boolean;                // Calculé depuis status === 'active'
}
```

**Note:** 
- Le statut `'offline'` n'existe plus (utiliser `'inactive'` à la place). Le frontend gère gracieusement `'offline'` en le convertissant en `'inactive'` pour compatibilité.
- `isOn` est une propriété calculée côté frontend basée sur `status === 'active'` et n'est pas envoyée au backend.
- Le champ `metadata` permet de stocker des données JSON supplémentaires spécifiques à chaque type d'actionneur.

---

## Lectures de capteurs

### SensorReading

Réponse de l'endpoint `/plantations/:id/sensors/:sensorId/readings` ou inclus dans un Sensor

```typescript
interface SensorReading {
  id: string;
  sensorId: string;
  value: number;                   // Peut être number ou string (le frontend convertit)
  timestamp: string;
  createdAt?: string;
}
```

**Note:** Le frontend accepte aussi une structure `{ sensor: {...}, readings: [...] }` pour l'endpoint de lectures.

---

## Notifications

### Notification

Réponse de l'endpoint `/notifications/my`, `/notifications/web`, `/notifications/:id`

```typescript
interface Notification {
  id: string;                    // UUID
  canal: NotificationChannel;    // 'web' | 'email' | 'whatsapp'
  statut: NotificationStatus;    // 'envoyee' | 'en_attente' | 'erreur' (minuscules selon backend)
  eventId: string;               // UUID
  userId: string;                // UUID
  dateEnvoi: string;             // Format ISO 8601 (ou createdAt)
  isRead: boolean;               // Peut être boolean, string ('true'/'false'), number (0/1)
  dateLu: string | null;         // Format ISO 8601
  event?: NotificationEvent;
}
```

**Note:** Le frontend normalise automatiquement:
- `statut`: Le backend retourne "envoyee", "en_attente", "erreur" (minuscules). Le frontend normalise vers ces valeurs.
- `canal`: accepte 'email', 'web', 'whatsapp' (insensible à la casse)
- `isRead`: convertit 'true', '1', 1 en `true`, sinon `false`

### NotificationEvent

```typescript
interface NotificationEvent {
  id: string;
  type: string;                   // Types: 'seuil_depasse', 'actionneur_active', 'actionneur_desactive', 'mode_changed', 'sensor_active', 'sensor_inactive'
  description: string;
  date: string;
  plantationId?: string;           // Peut être dans event.plantationId, event.plantation.id, event.actuator.plantationId, ou event.sensor.plantationId
  sensorId?: string | null;
  actuatorId?: string | null;
  sensor?: {
    id: string;
    type: string;
    status?: 'active' | 'inactive'; // 'active' | 'inactive' (pas 'offline')
    plantationId: string;
  } | null;
  actuator?: {
    id: string;
    type: string;
    name: string;
    plantationId: string;
  } | null;
}
```

### NotificationStats

Réponse de l'endpoint `/notifications/stats`

```typescript
interface NotificationStats {
  total: number;
  envoyees: number;                // ou envoyee
  enAttente: number;               // ou en_attente
  erreurs: number;                 // ou erreur
  nonLues: number;                 // ou non_lues
  lues: number;
  parCanal?: {                     // ou par_canal
    web?: number;
    email?: number;
    whatsapp?: number;
  };
}
```

**Note:** Le frontend accepte les formats `snake_case` et `camelCase` pour les statistiques.

---

## Technicien

### TechnicianStats

Réponse de l'endpoint `/technician/stats`

```typescript
interface TechnicianStats {
  farmers: number;                 // Nombre d'agriculteurs
  plantations: number;             // Nombre de plantations
  activeSensors: number;           // Nombre de capteurs actifs
  totalSensors: number;            // Nombre total de capteurs
  actuators: number;                // Nombre d'actionneurs
}
```

### FarmerListItem

Réponse de l'endpoint `/technician/farmers`

```typescript
interface FarmerListItem {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;            // Peut être null si non renseigné
  location: string | null;          // Peut être null
  plantationsCount: number;
}
```

**Note:** Le frontend accepte les recherches avec paramètre `search` (string) ou `search[]` (array de strings).

### PlantationListItem

Réponse de l'endpoint `/technician/farmers/:farmerId/plantations`

```typescript
interface PlantationListItem {
  id: string;
  name: string;
  location: string;
  area: number | null;             // Peut être null
  cropType: string;
  mode: 'automatic' | 'manual';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
```

### PlantationDetails

Réponse de l'endpoint `/plantations/:id` (pour technicien)

```typescript
interface PlantationDetails {
  id: string;
  name: string;
  location: string;
  area: number | null;
  cropType: string;
  mode: 'automatic' | 'manual';
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
  };
  sensors: Sensor[];
  actuators: Actuator[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Format des réponses API

### Structure standard

Le frontend accepte plusieurs formats de réponse:

1. **Format direct:**
   ```json
   {
     "id": "...",
     "name": "..."
   }
   ```

2. **Format encapsulé:**
   ```json
   {
     "data": {
       "id": "...",
       "name": "..."
     }
   }
   ```

3. **Format avec success:**
   ```json
   {
     "success": true,
     "data": {
       "id": "...",
       "name": "..."
     }
   }
   ```

4. **Format tableau:**
   ```json
   [
     { "id": "...", "name": "..." },
     { "id": "...", "name": "..." }
   ]
   ```

5. **Format paginé:**
   ```json
   {
     "items": [
       { "id": "...", "name": "..." }
     ]
   }
   ```

Le frontend normalise automatiquement ces formats en extrayant `res.data.data || res.data` ou `res.data.items` selon le cas.

---

## Notes importantes

1. **Normalisation automatique:** Le frontend normalise automatiquement les données reçues du backend pour gérer les variations de format (snake_case/camelCase, types de données, etc.)

2. **Conversion de types:** Les valeurs numériques peuvent être reçues comme strings et sont automatiquement converties en nombres.

3. **Valeurs optionnelles:** Beaucoup de champs sont optionnels (`?`) et le frontend gère les valeurs `null`, `undefined`, ou absentes.

4. **Compatibilité:** Le frontend maintient une compatibilité avec d'anciennes structures de données pour faciliter la migration.

5. **Gestion d'erreurs:** En cas d'erreur API, le frontend retourne des valeurs par défaut (tableaux vides, objets avec valeurs par défaut) plutôt que de faire planter l'application.

6. **Conversion d'unités:** Le champ `area` (superficie) doit toujours être en m² dans le backend. Le frontend convertit automatiquement depuis d'autres unités (ha, acre, km²) avant l'envoi. Utiliser `src/utils/unitConverter.ts` pour les conversions :
   - 1 ha = 10 000 m²
   - 1 acre ≈ 4 047 m²
   - 1 km² = 1 000 000 m²

7. **Statuts:** Les statuts `'offline'` n'existent plus dans le backend. Utiliser `'inactive'` à la place. Le frontend gère gracieusement `'offline'` en le convertissant en `'inactive'` pour compatibilité.

8. **Types de capteurs:** Le type `'humidity'` n'existe plus. Utiliser `'soilMoisture'` ou `'waterLevel'` à la place.

9. **Champs non-backend:** Certains champs comme `language` et `avatarUrl` dans `User`, ou `isOn` dans `Actuator`, sont utilisés uniquement côté frontend et ne sont pas envoyés au backend.

---

## Endpoints principaux

### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/login/verify-2fa` - Vérification 2FA
- `POST /auth/refresh` - Rafraîchissement du token
- `GET /auth/me` - Informations utilisateur
- `PUT /auth/profile` - Mise à jour du profil
- `POST /auth/profile/avatar` - Upload avatar
- `GET /auth/2fa/generate` - Génération secret 2FA
- `POST /auth/2fa/enable` - Activation 2FA
- `POST /auth/2fa/disable` - Désactivation 2FA
- `POST /auth/logout` - Déconnexion

### Plantations
- `GET /plantations/my` - Liste des plantations de l'utilisateur
- `GET /plantations/:id` - Détails d'une plantation
- `POST /plantations` - Création d'une plantation
- `PATCH /plantations/:id` - Mise à jour d'une plantation (notamment le mode)
- `GET /plantations/:id/sensors` - Liste des capteurs
- `GET /plantations/:id/sensors/:sensorId/readings` - Lectures d'un capteur
- `POST /plantations/:id/sensors/:sensorId/readings` - Ajout d'une lecture
- `PATCH /plantations/:id/sensors/:sensorId/thresholds` - Mise à jour des seuils
- `PATCH /plantations/:id/actuators/:actuatorId` - Mise à jour d'un actionneur

### Notifications
- `GET /notifications/my` - Toutes les notifications
- `GET /notifications/my?unreadOnly=true` - Notifications non lues
- `GET /notifications/web` - Notifications web uniquement
- `GET /notifications/stats` - Statistiques
- `GET /notifications/:id` - Détails d'une notification
- `PATCH /notifications/:id/read` - Marquer comme lue
- `DELETE /notifications/:id` - Supprimer une notification

### Technicien
- `GET /technician/stats` - Statistiques globales
- `GET /technician/farmers` - Liste des agriculteurs (avec recherche optionnelle)
- `GET /technician/farmers/:farmerId/plantations` - Plantations d'un agriculteur

