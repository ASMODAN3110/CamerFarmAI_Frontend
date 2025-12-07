# Corrections des Notifications Email - Frontend

## Problème identifié

D'après le diagnostic, **toutes les notifications email échouent à l'envoi** (9/9 notifications en erreur). Le problème est **côté backend** (configuration SMTP), mais le frontend a été amélioré pour mieux gérer les notifications selon la documentation API.

## Corrections apportées au Frontend

### 1. **Normalisation des notifications selon la documentation API**

#### ✅ Ajout des champs `sensorId` et `actuatorId` dans `NotificationEvent`

Selon la documentation API, les événements peuvent avoir `sensorId` et `actuatorId` directement dans l'événement (pas seulement dans `sensor` et `actuator`).

**Avant :**
```typescript
export interface NotificationEvent {
  id: string;
  type: string;
  description: string;
  date: string;
  plantationId?: string;
  sensor?: { ... } | null;
  actuator?: { ... } | null;
}
```

**Après :**
```typescript
export interface NotificationEvent {
  id: string;
  type: string;
  description: string;
  date: string;
  plantationId?: string;
  sensorId?: string | null;      // ✅ Ajouté selon la doc API
  actuatorId?: string | null;   // ✅ Ajouté selon la doc API
  sensor?: { ... } | null;
  actuator?: { ... } | null;
}
```

#### ✅ Normalisation des événements

La fonction `normalizeNotification` inclut maintenant `sensorId` et `actuatorId` :

```typescript
event: data.event ? {
  id: data.event.id,
  type: data.event.type,
  description: data.event.description,
  date: data.event.date,
  plantationId: data.event.plantationId,
  sensorId: data.event.sensorId || null,      // ✅ Ajouté
  actuatorId: data.event.actuatorId || null,  // ✅ Ajouté
  sensor: data.event.sensor || null,
  actuator: data.event.actuator || null,
} : undefined,
```

### 2. **Amélioration du calcul des statistiques**

#### ✅ Calcul des stats réelles à partir des notifications

Le backend peut retourner des stats incomplètes (ex: `parCanal.email === 0` alors qu'il y a des notifications email). Le frontend calcule maintenant les stats réelles à partir des notifications :

```typescript
async getStats(): Promise<NotificationStats> {
  // ... récupération des stats du backend ...
  
  // Calculer les stats réelles à partir des notifications
  const allNotifications = await this.getAll();
  const realStats = {
    web: allNotifications.filter(n => n.canal === 'web').length,
    email: allNotifications.filter(n => n.canal === 'email').length,
    whatsapp: allNotifications.filter(n => n.canal === 'whatsapp').length,
  };
  
  return {
    // ... autres stats ...
    parCanal: {
      // Utiliser les stats réelles si disponibles
      web: realStats.web || data.parCanal?.web || 0,
      email: realStats.email || data.parCanal?.email || 0,
      whatsapp: realStats.whatsapp || data.parCanal?.whatsapp || 0,
    },
  };
}
```

### 3. **Amélioration du diagnostic**

#### ✅ Détection correcte des notifications email

Le diagnostic vérifie maintenant d'abord les notifications réelles avant de se fier aux stats :

```typescript
// Vérifier d'abord les notifications réelles
if (emailNotifications.length === 0) {
  console.log('❌ PROBLÈME #2: Aucune notification email créée');
} else {
  console.log(`✅ ${emailNotifications.length} notification(s) email créée(s)`);
  if (stats.parCanal?.email === 0 && emailNotifications.length > 0) {
    console.log('⚠️ Note: Les statistiques par canal ne sont pas à jour');
  }
}
```

#### ✅ Détails des erreurs SMTP

Le diagnostic affiche maintenant des détails spécifiques pour chaque notification en erreur :

```typescript
if (errorNotifications.length > 0) {
  console.log(`❌ PROBLÈME #3: ${errorNotifications.length} notification(s) email en erreur`);
  console.log('⚠️ TOUTES les notifications email échouent à l\'envoi !');
  // ... causes possibles et solutions ...
  errorNotifications.slice(0, 3).forEach((notif, index) => {
    console.log(`${index + 1}. Notification ${notif.id}:`);
    console.log(`   - Type: ${notif.event?.type}`);
    console.log(`   - Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
    console.log(`   - Description: ${notif.event?.description}`);
  });
}
```

### 4. **Amélioration de l'affichage dans ProfilePage**

#### ✅ Message d'alerte pour les erreurs SMTP

Un message d'alerte s'affiche maintenant si **toutes** les notifications email échouent :

```typescript
{emailErrors > 0 && emailErrors === totalEmails && (
  <div style={{ 
    backgroundColor: '#fee', 
    border: '1px solid #fcc',
    padding: '0.75rem',
    borderRadius: '4px'
  }}>
    <strong>⚠️ Problème SMTP détecté</strong>
    <p>
      Toutes les notifications email échouent à l'envoi. 
      Vérifiez la configuration SMTP côté backend.
    </p>
  </div>
)}
```

## Structure des données selon la documentation API

### Notification Email (exemple)

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "canal": "email",
  "statut": "envoyee",  // ou "en_attente", "erreur"
  "eventId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "userId": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "dateEnvoi": "2024-01-15T10:30:00.000Z",
  "isRead": false,
  "dateLu": null,
  "event": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "type": "seuil_depasse",
    "description": "Le capteur température a enregistré une valeur (38) supérieure au seuil maximum (32)",
    "date": "2024-01-15T10:30:00.000Z",
    "sensorId": "d4e5f6a7-b8c9-0123-def0-123456789013",  // ✅ Géré maintenant
    "actuatorId": null,
    "sensor": {
      "id": "d4e5f6a7-b8c9-0123-def0-123456789013",
      "type": "temperature",
      "status": "active",
      "plantationId": "e5f6a7b8-c9d0-1234-ef01-123456789014"
    },
    "actuator": null
  }
}
```

### Statuts possibles

- `"envoyee"` : Email envoyé avec succès ✅
- `"en_attente"` : Email en attente d'envoi ⏳
- `"erreur"` : Erreur lors de l'envoi de l'email ❌

### Canaux possibles

- `"web"` : Notification web
- `"email"` : Notification email
- `"whatsapp"` : Notification WhatsApp

## Problème principal : Configuration SMTP côté Backend

### ⚠️ Toutes les notifications email échouent (9/9 = 100%)

Le problème est **côté backend** : la configuration SMTP est incorrecte ou manquante.

### Solution : Vérifier la configuration SMTP

Dans le fichier `.env` du backend, vérifiez :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=mot_de_passe_application  # ⚠️ Important : mot de passe d'application pour Gmail
SMTP_FROM=noreply@camerfarmai.com
```

### Points importants

1. **Pour Gmail** : Utilisez un **mot de passe d'application**, pas votre mot de passe normal
   - Allez dans votre compte Google → Sécurité → Validation en 2 étapes → Mots de passe des applications
   - Générez un mot de passe d'application et utilisez-le dans `SMTP_PASS`

2. **Vérifiez les logs du backend** pour voir l'erreur SMTP exacte

3. **Testez la connexion SMTP** avec un script de test

## Fichiers modifiés

1. **`src/services/notificationService.ts`**
   - Ajout de `sensorId` et `actuatorId` dans `NotificationEvent`
   - Amélioration de `normalizeNotification` pour inclure ces champs
   - Amélioration de `getStats()` pour calculer les stats réelles

2. **`src/utils/emailNotificationDiagnostic.ts`**
   - Détection correcte des notifications email (vérifie d'abord les notifications réelles)
   - Détails des erreurs SMTP avec exemples
   - Recommandations spécifiques pour chaque problème

3. **`src/app/ProfilePage.tsx`**
   - Message d'alerte si toutes les notifications email échouent
   - Affichage clair du problème SMTP

## Tests à effectuer

1. ✅ Vérifier que les notifications email sont correctement filtrées
2. ✅ Vérifier que les stats email sont correctement calculées
3. ✅ Vérifier que le diagnostic détecte correctement les problèmes
4. ⚠️ **Corriger la configuration SMTP côté backend** (action requise)
5. ✅ Tester l'envoi d'email après correction SMTP

## Prochaines étapes

1. **URGENT** : Corriger la configuration SMTP côté backend
2. Vérifier les logs du backend pour l'erreur SMTP exacte
3. Tester l'envoi d'email après correction
4. Relancer le diagnostic pour vérifier que les emails sont envoyés

Une fois la configuration SMTP corrigée côté backend, les notifications email devraient être envoyées correctement.

