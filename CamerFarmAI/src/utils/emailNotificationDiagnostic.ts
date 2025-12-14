// Script de diagnostic pour les notifications email
// Disponible en développement uniquement
// Utilisation: Appelez diagnoseEmailNotifications() dans la console du navigateur

import { notificationService } from '../services/notificationService';
import { authService } from '../services/authService';

/**
 * Fonction de diagnostic pour les notifications email
 * Vérifie:
 * - Si l'utilisateur a une adresse email configurée
 * - Si des notifications email ont été créées
 * - Les statistiques des notifications
 * - Les événements récents
 * - La connexion au backend
 */
export async function diagnoseEmailNotifications() {
  console.log('🔍 === DIAGNOSTIC DES NOTIFICATIONS EMAIL ===\n');

  try {
    // 1. Vérifier l'utilisateur et son email
    console.log('📧 Étape 1: Vérification de l\'adresse email de l\'utilisateur');
    let user;
    try {
      user = await authService.me();
      if (user && user.email) {
        console.log(`✅ Adresse email configurée: ${user.email}`);
      } else {
        console.log('❌ PROBLÈME #1: Aucune adresse email configurée dans le profil');
        console.log('   → Solution: Allez sur /profile et ajoutez votre adresse email');
      }
    } catch (error: any) {
      console.log('❌ Erreur lors de la récupération du profil utilisateur:', error.message);
      console.log('   → Vérifiez que vous êtes connecté et que le backend est accessible');
      return;
    }

    // 2. Vérifier les notifications email
    console.log('\n📬 Étape 2: Vérification des notifications email');
    let allNotifications;
    try {
      allNotifications = await notificationService.getAll();
      const emailNotifications = allNotifications.filter(n => n.canal === 'email');
      
      if (emailNotifications.length === 0) {
        console.log('❌ PROBLÈME #2: Aucune notification email créée');
        console.log('   → Vérifiez que le backend crée bien des notifications email lors de la création d\'événements');
      } else {
        console.log(`✅ ${emailNotifications.length} notification(s) email créée(s)`);
        
        // Afficher les détails des notifications email
        emailNotifications.forEach((notif, index) => {
          console.log(`\n   Notification #${index + 1}:`);
          console.log(`   - ID: ${notif.id}`);
          console.log(`   - Statut: ${notif.statut}`);
          console.log(`   - Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
          if (notif.event) {
            console.log(`   - Événement: ${notif.event.type} - ${notif.event.description}`);
          }
        });
      }
    } catch (error: any) {
      console.log('❌ Erreur lors de la récupération des notifications:', error.message);
      return;
    }

    // 3. Vérifier les statistiques
    console.log('\n📊 Étape 3: Vérification des statistiques');
    try {
      const stats = await notificationService.getStats(allNotifications);
      console.log('Statistiques générales:');
      console.log(`   - Total: ${stats.total}`);
      console.log(`   - Envoyées: ${stats.envoyees}`);
      console.log(`   - En attente: ${stats.enAttente}`);
      console.log(`   - Erreurs: ${stats.erreurs}`);
      console.log('\nStatistiques par canal:');
      console.log(`   - Web: ${stats.parCanal?.web || 0}`);
      console.log(`   - Email: ${stats.parCanal?.email || 0}`);
      console.log(`   - WhatsApp: ${stats.parCanal?.whatsapp || 0}`);
      
      if (stats.parCanal?.email === 0 && allNotifications.filter(n => n.canal === 'email').length > 0) {
        console.log('⚠️ Note: Les statistiques par canal ne sont pas à jour');
      }
    } catch (error: any) {
      console.log('❌ Erreur lors de la récupération des statistiques:', error.message);
    }

    // 4. Vérifier les notifications en erreur
    console.log('\n⚠️ Étape 4: Vérification des notifications en erreur');
    const errorNotifications = allNotifications.filter(n => n.canal === 'email' && n.statut === 'ERREUR');
    if (errorNotifications.length > 0) {
      console.log(`❌ PROBLÈME #3: ${errorNotifications.length} notification(s) email en erreur`);
      errorNotifications.forEach((notif, index) => {
        console.log(`\n   Erreur #${index + 1}:`);
        console.log(`   - ID: ${notif.id}`);
        console.log(`   - Date: ${new Date(notif.dateEnvoi).toLocaleString()}`);
        if (notif.event) {
          console.log(`   - Événement: ${notif.event.type}`);
        }
      });
      console.log('\n   Causes possibles:');
      console.log('   - Problème de configuration SMTP côté backend');
      console.log('   - Serveur SMTP inaccessible');
      console.log('   - Identifiants SMTP incorrects');
      console.log('   → Vérifiez les logs du backend pour l\'erreur exacte');
    } else {
      console.log('✅ Aucune notification email en erreur');
    }

    // 5. Vérifier les notifications en attente
    console.log('\n⏳ Étape 5: Vérification des notifications en attente');
    const pendingNotifications = allNotifications.filter(n => n.canal === 'email' && n.statut === 'EN_ATTENTE');
    if (pendingNotifications.length > 0) {
      console.log(`⏳ ${pendingNotifications.length} notification(s) email en attente d\'envoi`);
      console.log('   → Ces notifications seront envoyées prochainement (traitement asynchrone)');
    } else {
      console.log('✅ Aucune notification email en attente');
    }

    // 6. Vérifier les événements récents
    console.log('\n📅 Étape 6: Vérification des événements récents');
    const recentEvents = allNotifications
      .filter(n => n.event)
      .map(n => n.event!)
      .filter(e => e.type === 'ACTIONNEUR_ACTIVE' || e.type === 'ACTIONNEUR_DESACTIVE')
      .slice(0, 5);
    
    if (recentEvents.length > 0) {
      console.log(`✅ ${recentEvents.length} événement(s) d'actionneur récent(s) trouvé(s):`);
      recentEvents.forEach((event, index) => {
        console.log(`\n   Événement #${index + 1}:`);
        console.log(`   - Type: ${event.type}`);
        console.log(`   - Description: ${event.description}`);
        console.log(`   - Date: ${new Date(event.date).toLocaleString()}`);
      });
    } else {
      console.log('⚠️ Aucun événement d\'actionneur récent trouvé');
      console.log('   → Activez un actionneur pour créer un événement');
    }

    // 7. Résumé et recommandations
    console.log('\n📋 === RÉSUMÉ ET RECOMMANDATIONS ===');
    const emailNotifs = allNotifications.filter(n => n.canal === 'email');
    const hasEmail = user && user.email;
    const hasEmailNotifs = emailNotifs.length > 0;
    const hasErrors = errorNotifications.length > 0;
    
    if (!hasEmail) {
      console.log('❌ Action requise: Ajoutez une adresse email dans votre profil (/profile)');
    }
    if (!hasEmailNotifs) {
      console.log('❌ Action requise: Vérifiez que le backend crée des notifications email');
    }
    if (hasErrors) {
      console.log('❌ Action requise: Vérifiez la configuration SMTP côté backend');
      console.log('   → Vérifiez les variables d\'environnement SMTP');
      console.log('   → Vérifiez les logs du backend pour l\'erreur exacte');
    }
    if (hasEmail && hasEmailNotifs && !hasErrors) {
      console.log('✅ Tout semble correct!');
      console.log('   → Si vous ne recevez toujours pas d\'emails:');
      console.log('     1. Vérifiez vos spams');
      console.log('     2. Vérifiez que l\'adresse email est correcte');
      console.log('     3. Vérifiez les logs du serveur SMTP');
    }

    console.log('\n🔍 === FIN DU DIAGNOSTIC ===\n');
  } catch (error: any) {
    console.error('❌ Erreur lors du diagnostic:', error);
    console.log('\n🔍 === FIN DU DIAGNOSTIC (avec erreurs) ===\n');
  }
}

// Exposer la fonction globalement en développement pour qu'elle soit accessible depuis la console
if (import.meta.env.DEV) {
  (window as any).diagnoseEmailNotifications = diagnoseEmailNotifications;
  console.log('💡 Fonction de diagnostic disponible: diagnoseEmailNotifications()');
}


