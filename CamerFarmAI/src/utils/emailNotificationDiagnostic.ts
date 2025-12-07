/**
 * Script de diagnostic pour les notifications email
 * Utilisez ce script dans la console du navigateur pour diagnostiquer les problèmes
 */

import { api } from '@/services/api';
import { notificationService } from '@/services/notificationService';
import { useAuthStore } from '@/services/useAuthStore';

export async function diagnoseEmailNotifications() {
  console.log('🔍 === DIAGNOSTIC DES NOTIFICATIONS EMAIL ===\n');

  // 1. Vérifier l'utilisateur connecté
  const user = useAuthStore.getState().user;
  console.log('1️⃣ Utilisateur connecté:');
  console.log('   - ID:', user?.id);
  console.log('   - Email:', user?.email || '❌ AUCUNE ADRESSE EMAIL');
  console.log('   - Téléphone:', user?.phone);
  
  if (!user?.email) {
    console.error('\n❌ PROBLÈME: L\'utilisateur n\'a pas d\'adresse email configurée!');
    console.log('   → Solution: Ajoutez une adresse email dans votre profil');
    return;
  }

  // 2. Vérifier les notifications email
  console.log('\n2️⃣ Notifications email:');
  try {
    const emailNotifications = await notificationService.getAllEmail();
    console.log('   - Nombre de notifications email:', emailNotifications.length);
    
    if (emailNotifications.length > 0) {
      // Grouper par statut
      const parStatut = {
        ENVOYEE: emailNotifications.filter(n => n.statut === 'ENVOYEE'),
        EN_ATTENTE: emailNotifications.filter(n => n.statut === 'EN_ATTENTE'),
        ERREUR: emailNotifications.filter(n => n.statut === 'ERREUR'),
      };
      
      console.log('   - Répartition par statut:');
      console.log(`     • ✅ Envoyées: ${parStatut.ENVOYEE.length}`);
      console.log(`     • ⏳ En attente: ${parStatut.EN_ATTENTE.length}`);
      console.log(`     • ❌ Erreurs: ${parStatut.ERREUR.length}`);
      
      // Afficher les notifications récentes (dernières 24h)
      const recentNotifications = emailNotifications.filter(
        n => new Date(n.dateEnvoi).getTime() > Date.now() - 24 * 60 * 60 * 1000
      );
      
      console.log(`   - Notifications des dernières 24h: ${recentNotifications.length}`);
      
      if (recentNotifications.length > 0) {
        console.log('   - Détails des notifications récentes:');
        recentNotifications.slice(0, 10).forEach((notif, index) => {
          const statutIcon = notif.statut === 'ENVOYEE' ? '✅' : 
                            notif.statut === 'EN_ATTENTE' ? '⏳' : '❌';
          console.log(`     ${index + 1}. ${statutIcon} ${notif.statut} - ${notif.event?.type || 'N/A'}`);
          console.log(`        ID: ${notif.id}`);
          console.log(`        Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
          console.log(`        Description: ${notif.event?.description || 'N/A'}`);
          if (notif.statut === 'ERREUR') {
            console.log(`        ⚠️ Cette notification a échoué à l'envoi`);
          }
        });
      }
      
      // Afficher les notifications d'actionneurs spécifiquement
      const actuatorNotifications = emailNotifications.filter(
        n => n.event?.type === 'ACTIONNEUR_ACTIVE' || n.event?.type === 'ACTIONNEUR_DESACTIVE'
      );
      console.log(`   - Notifications d'actionneurs: ${actuatorNotifications.length}`);
      
      if (actuatorNotifications.length > 0) {
        console.log('   - Détails des notifications d\'actionneurs:');
        actuatorNotifications.slice(0, 5).forEach((notif, index) => {
          const statutIcon = notif.statut === 'ENVOYEE' ? '✅' : 
                            notif.statut === 'EN_ATTENTE' ? '⏳' : '❌';
          console.log(`     ${index + 1}. ${statutIcon} ${notif.statut} - ${notif.event?.type}`);
          console.log(`        Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
          console.log(`        Description: ${notif.event?.description || 'N/A'}`);
        });
      }
    } else {
      console.log('   ⚠️ Aucune notification email trouvée');
      console.log('   → Cela peut signifier que:');
      console.log('     1. Le backend ne crée pas de notifications email');
      console.log('     2. Les événements ne sont pas créés lors de l\'activation d\'actionneurs');
      console.log('     3. L\'utilisateur n\'a pas d\'email configuré (mais on a déjà vérifié)');
    }
  } catch (error) {
    console.error('   ❌ Erreur lors de la récupération:', error);
  }

  // 3. Vérifier les statistiques
  console.log('\n3️⃣ Statistiques des notifications:');
  try {
    const stats = await notificationService.getStats();
    console.log('   - Total:', stats.total);
    console.log('   - Envoyées:', stats.envoyees);
    console.log('   - En attente:', stats.enAttente);
    console.log('   - Erreurs:', stats.erreurs);
    console.log('   - Par canal:');
    console.log('     • Web:', stats.parCanal?.web || 0);
    console.log('     • Email:', stats.parCanal?.email || 0);
    console.log('     • WhatsApp:', stats.parCanal?.whatsapp || 0);
    
    // Analyse des statistiques
    if (stats.parCanal?.email === 0) {
      console.log('\n   ⚠️ PROBLÈME DÉTECTÉ: Aucune notification email dans les statistiques');
      console.log('   → Le backend ne crée probablement pas de notifications email');
      console.log('   → Vérifiez que le backend crée bien des notifications EMAIL lors de la création d\'événements');
    } else if (stats.erreurs > 0) {
      console.log(`\n   ⚠️ PROBLÈME DÉTECTÉ: ${stats.erreurs} notification(s) en erreur`);
      console.log('   → Certains emails n\'ont pas pu être envoyés');
      console.log('   → Vérifiez la configuration SMTP côté backend');
      console.log('   → Vérifiez les logs du backend pour les détails des erreurs');
    } else if (stats.enAttente > 0) {
      console.log(`\n   ⏳ ${stats.enAttente} notification(s) en attente d'envoi`);
      console.log('   → Les emails sont peut-être en cours d\'envoi (traitement asynchrone)');
    }
  } catch (error) {
    console.error('   ❌ Erreur lors de la récupération des stats:', error);
  }

  // 4. Vérifier les événements récents
  console.log('\n4️⃣ Événements récents:');
  try {
    const allNotifications = await notificationService.getAll();
    const recentEvents = allNotifications
      .filter(n => n.event)
      .slice(0, 10)
      .map(n => ({
        type: n.event?.type,
        description: n.event?.description,
        date: n.event?.date,
        canal: n.canal,
        statut: n.statut,
      }));
    
    console.log('   - Événements trouvés:', recentEvents.length);
    recentEvents.forEach((event, index) => {
      console.log(`     ${index + 1}. [${event.canal}] ${event.type} - ${event.statut}`);
      console.log(`        ${event.description}`);
    });
  } catch (error) {
    console.error('   ❌ Erreur lors de la récupération des événements:', error);
  }

  // 5. Vérifier la configuration backend (si possible)
  console.log('\n5️⃣ Test de connexion backend:');
  try {
    const response = await api.get('/notifications/stats');
    console.log('   ✅ Backend accessible');
    console.log('   - Réponse:', response.status, response.statusText);
  } catch (error: any) {
    console.error('   ❌ Erreur de connexion au backend:', error.message);
    console.log('   → Vérifiez que le backend est démarré et accessible');
  }

  // 6. Analyse détaillée des problèmes
  console.log('\n6️⃣ ANALYSE DÉTAILLÉE:');
  
  const emailNotifications = await notificationService.getAllEmail().catch(() => []);
  const stats = await notificationService.getStats().catch(() => null);
  
  // Problème 1: Pas d'email configuré
  if (!user?.email) {
    console.log('   ❌ PROBLÈME #1: Aucune adresse email configurée');
    console.log('      → Solution: Ajoutez une adresse email dans votre profil');
    console.log('      → Action: Allez dans votre profil et ajoutez votre email');
  } else {
    console.log('   ✅ Email configuré:', user.email);
  }
  
  // Problème 2: Aucune notification email créée
  // Vérifier d'abord les notifications réelles, puis les stats
  if (emailNotifications.length === 0) {
    console.log('\n   ❌ PROBLÈME #2: Aucune notification email n\'a été créée par le backend');
    console.log('      → Causes possibles:');
    console.log('        1. Le backend ne crée pas de notifications EMAIL lors de la création d\'événements');
    console.log('        2. Les événements ne sont pas créés lors de l\'activation d\'actionneurs');
    console.log('        3. La logique de création de notifications email est désactivée');
    console.log('      → Solutions:');
    console.log('        1. Vérifiez les logs du backend après avoir activé un actionneur');
    console.log('        2. Vérifiez que le backend crée bien des notifications avec canal="EMAIL"');
    console.log('        3. Vérifiez le code backend qui crée les notifications (EventService.processEvent)');
  } else {
    console.log(`\n   ✅ ${emailNotifications.length} notification(s) email créée(s) par le backend`);
    if (stats && stats.parCanal?.email === 0 && emailNotifications.length > 0) {
      console.log('      ⚠️ Note: Les statistiques par canal ne sont pas à jour, mais les notifications existent');
    }
  }
  
  // Problème 3: Notifications en erreur
  const errorNotifications = emailNotifications.filter(n => n.statut === 'ERREUR');
  if (errorNotifications.length > 0) {
    console.log(`\n   ❌ PROBLÈME #3: ${errorNotifications.length} notification(s) email en erreur (${errorNotifications.length}/${emailNotifications.length} = ${Math.round(errorNotifications.length / emailNotifications.length * 100)}%)`);
    console.log('      → ⚠️ TOUTES les notifications email échouent à l\'envoi !');
    console.log('      → Causes possibles:');
    console.log('        1. Configuration SMTP incorrecte ou manquante (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)');
    console.log('        2. Serveur SMTP inaccessible ou bloqué');
    console.log('        3. Identifiants SMTP incorrects ou expirés');
    console.log('        4. Port SMTP bloqué par le firewall');
    console.log('        5. Serveur SMTP qui rejette les connexions');
    console.log('      → Solutions URGENTES:');
    console.log('        1. Vérifiez les variables d\'environnement SMTP côté backend:');
    console.log('           - SMTP_HOST (ex: smtp.gmail.com)');
    console.log('           - SMTP_PORT (ex: 587 pour TLS, 465 pour SSL)');
    console.log('           - SMTP_USER (votre adresse email complète)');
    console.log('           - SMTP_PASS (mot de passe d\'application pour Gmail)');
    console.log('           - SMTP_FROM (adresse d\'expéditeur)');
    console.log('        2. Vérifiez les logs du backend pour l\'erreur exacte SMTP');
    console.log('        3. Testez la connexion SMTP manuellement avec un script de test');
    console.log('        4. Pour Gmail, utilisez un "mot de passe d\'application" (pas le mot de passe normal)');
    console.log('        5. Vérifiez que le port SMTP n\'est pas bloqué par votre firewall');
    console.log('      → Détails des erreurs:');
    errorNotifications.slice(0, 3).forEach((notif, index) => {
      console.log(`         ${index + 1}. Notification ${notif.id}:`);
      console.log(`            - Type: ${notif.event?.type || 'N/A'}`);
      console.log(`            - Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
      console.log(`            - Description: ${notif.event?.description || 'N/A'}`);
    });
    if (errorNotifications.length > 3) {
      console.log(`         ... et ${errorNotifications.length - 3} autre(s) notification(s) en erreur`);
    }
  }
  
  // Problème 4: Notifications en attente
  const pendingNotifications = emailNotifications.filter(n => n.statut === 'EN_ATTENTE');
  if (pendingNotifications.length > 0) {
    console.log(`\n   ⏳ ${pendingNotifications.length} notification(s) email en attente d'envoi`);
    console.log('      → Les emails sont peut-être en cours d\'envoi (traitement asynchrone)');
    console.log('      → Attendez quelques secondes et relancez le diagnostic');
  }
  
  // Problème 5: Emails envoyés mais non reçus
  const sentNotifications = emailNotifications.filter(n => n.statut === 'ENVOYEE');
  if (sentNotifications.length > 0 && user?.email) {
    console.log(`\n   ✅ ${sentNotifications.length} notification(s) email marquée(s) comme envoyée(s)`);
    console.log('      → Si vous ne les avez pas reçues, vérifiez:');
    console.log('        1. Votre boîte de réception (et les spams/courriers indésirables)');
    console.log('        2. Que l\'adresse email est correcte:', user.email);
    console.log('        3. Que l\'adresse SMTP_FROM n\'est pas bloquée par votre fournisseur email');
    console.log('        4. Les logs du serveur SMTP pour confirmer l\'envoi');
  }

  // 7. Recommandations finales
  console.log('\n📋 RECOMMANDATIONS FINALES:');
  
  if (!user?.email) {
    console.log('   1. ❌ URGENT: Ajoutez une adresse email dans votre profil');
  } else {
    console.log('   1. ✅ Adresse email configurée');
  }

  if (emailNotifications.length === 0) {
    console.log('   2. ⚠️ URGENT: Vérifiez que le backend crée bien des notifications email');
    console.log('      → Contactez l\'équipe backend pour vérifier la configuration');
  } else if (errorNotifications.length > 0) {
    console.log(`   2. ❌ URGENT: ${errorNotifications.length} notification(s) email en erreur - Problème SMTP`);
    console.log('      → TOUTES les notifications email échouent à l\'envoi');
    console.log('      → Action immédiate requise: Corrigez la configuration SMTP côté backend');
    console.log('      → Vérifiez les variables d\'environnement SMTP dans le fichier .env du backend');
    console.log('      → Consultez les logs du backend pour voir l\'erreur SMTP exacte');
  } else if (emailNotifications.length > 0) {
    console.log(`   2. ✅ ${emailNotifications.length} notification(s) email trouvée(s) et fonctionnelle(s)`);
  }

  console.log('   3. Vérifiez la configuration SMTP côté backend:');
  console.log('      - SMTP_HOST (ex: smtp.gmail.com)');
  console.log('      - SMTP_PORT (ex: 587 pour TLS, 465 pour SSL)');
  console.log('      - SMTP_USER (votre adresse email)');
  console.log('      - SMTP_PASS (mot de passe d\'application pour Gmail)');
  console.log('      - SMTP_FROM (adresse d\'expéditeur)');

  console.log('   4. Vérifiez les logs du backend après avoir activé un actionneur');
  console.log('   5. Vérifiez votre boîte de réception ET les spams/courriers indésirables');
  console.log('   6. Testez avec un autre compte email si possible');

  console.log('\n✅ === FIN DU DIAGNOSTIC ===\n');
  console.log('💡 Pour plus d\'aide, consultez GUIDE_DIAGNOSTIC_EMAIL.md');
}

// Export pour utilisation dans la console
if (typeof window !== 'undefined') {
  (window as any).diagnoseEmailNotifications = diagnoseEmailNotifications;
  console.log('💡 Utilisez diagnoseEmailNotifications() dans la console pour diagnostiquer les problèmes');
}

