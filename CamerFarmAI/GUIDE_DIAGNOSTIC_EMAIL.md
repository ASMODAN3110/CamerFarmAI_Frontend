# 🔍 Guide de Diagnostic - Notifications Email

## Problème : Vous n'avez pas reçu d'email après avoir activé un actionneur

### Étape 1 : Utiliser le script de diagnostic automatique

1. Ouvrez la console du navigateur (F12)
2. Tapez la commande suivante :
```javascript
diagnoseEmailNotifications()
```

Ce script va vérifier :
- ✅ Si vous avez une adresse email configurée
- ✅ Si des notifications email ont été créées
- ✅ Les statistiques des notifications
- ✅ Les événements récents
- ✅ La connexion au backend

### Étape 2 : Vérifications manuelles

#### 2.1 Vérifier votre adresse email
1. Allez sur `/profile`
2. Vérifiez que vous avez une adresse email affichée
3. Si non, ajoutez-en une dans votre profil

#### 2.2 Vérifier les notifications créées
Dans la console du navigateur :
```javascript
import { notificationService } from './src/services/notificationService';

// Vérifier toutes les notifications email
notificationService.getAllEmail().then(notifs => {
  console.log('Notifications email:', notifs);
  notifs.forEach(n => {
    console.log(`- ${n.statut}: ${n.event?.type} - ${n.event?.description}`);
  });
});

// Vérifier les statistiques
notificationService.getStats().then(stats => {
  console.log('Statistiques:', stats);
  console.log('Notifications email:', stats.parCanal?.email);
});
```

#### 2.3 Vérifier les événements créés
Dans la console du navigateur :
```javascript
import { notificationService } from './src/services/notificationService';

// Vérifier tous les événements
notificationService.getAll().then(notifs => {
  const events = notifs.filter(n => n.event).map(n => n.event);
  console.log('Événements:', events);
  
  // Filtrer les événements d'actionneurs
  const actuatorEvents = events.filter(e => 
    e.type === 'ACTIONNEUR_ACTIVE' || e.type === 'ACTIONNEUR_DESACTIVE'
  );
  console.log('Événements actionneurs:', actuatorEvents);
});
```

### Étape 3 : Vérifications côté Backend

#### 3.1 Vérifier la configuration SMTP
Le backend doit avoir ces variables d'environnement configurées :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=mot_de_passe_application
SMTP_FROM=noreply@camerfarmai.com
```

#### 3.2 Vérifier les logs du backend
Après avoir activé un actionneur, vérifiez les logs du backend pour voir :
- Si un événement a été créé
- Si une notification email a été créée
- Si l'email a été envoyé
- S'il y a des erreurs SMTP

#### 3.3 Vérifier la base de données
Vérifiez dans la base de données :
```sql
-- Vérifier les événements créés
SELECT * FROM events 
WHERE type IN ('ACTIONNEUR_ACTIVE', 'ACTIONNEUR_DESACTIVE') 
ORDER BY date DESC 
LIMIT 10;

-- Vérifier les notifications email
SELECT n.*, e.type, e.description 
FROM notifications n
JOIN events e ON n.eventId = e.id
WHERE n.canal = 'EMAIL'
ORDER BY n.dateEnvoi DESC
LIMIT 10;
```

### Étape 4 : Points de contrôle

#### ✅ Checklist de vérification

- [ ] L'utilisateur a une adresse email dans son profil
- [ ] L'actionneur a bien été activé (vérifier dans la base de données)
- [ ] Un événement `ACTIONNEUR_ACTIVE` a été créé
- [ ] Une notification avec `canal: 'EMAIL'` a été créée
- [ ] La notification a le statut `ENVOYEE` ou `ERREUR`
- [ ] La configuration SMTP est correcte côté backend
- [ ] Le backend peut se connecter au serveur SMTP
- [ ] L'email n'est pas dans les spams

### Étape 5 : Solutions courantes

#### Problème : Aucune notification email créée
**Cause possible** : Le backend ne crée pas de notifications email
**Solution** : Vérifier que le backend crée bien des notifications email lors de la création d'événements

#### Problème : Notification créée mais statut `ERREUR`
**Cause possible** : Problème de configuration SMTP ou de connexion
**Solution** : 
- Vérifier les variables d'environnement SMTP
- Tester la connexion SMTP
- Vérifier les logs du backend pour l'erreur exacte

#### Problème : Notification créée avec statut `EN_ATTENTE`
**Cause possible** : L'email n'a pas encore été envoyé (traitement asynchrone)
**Solution** : Attendre quelques secondes et vérifier à nouveau

#### Problème : Notification `ENVOYEE` mais pas d'email reçu
**Cause possible** : 
- Email dans les spams
- Adresse email incorrecte
- Problème avec le serveur SMTP
**Solution** :
- Vérifier les spams
- Vérifier que l'adresse email est correcte
- Vérifier les logs du serveur SMTP

### Étape 6 : Test manuel d'envoi d'email

Pour tester si le système d'envoi d'email fonctionne :

1. Dans la console du navigateur :
```javascript
// Tester l'envoi d'un email de test (si l'endpoint existe)
fetch('http://localhost:3000/api/v1/notifications/test-email', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json'
  }
}).then(r => r.json()).then(console.log).catch(console.error);
```

2. Ou utiliser le script de test du backend (si disponible) :
```bash
npm run test:email
```

### Étape 7 : Logs à vérifier

#### Côté Frontend (Console navigateur)
- ✅ Actionneur activé avec succès
- ✅ Notifications rafraîchies
- ✅ Notifications email trouvées (ou avertissement)

#### Côté Backend (Logs serveur)
- ✅ Événement créé
- ✅ Notification email créée
- ✅ Tentative d'envoi d'email
- ✅ Succès ou erreur d'envoi

### Contact et Support

Si le problème persiste après avoir suivi ce guide :
1. Collectez les logs du backend
2. Collectez les logs de la console du navigateur
3. Exécutez `diagnoseEmailNotifications()` et copiez le résultat
4. Vérifiez la configuration SMTP
5. Contactez l'équipe de développement avec ces informations

