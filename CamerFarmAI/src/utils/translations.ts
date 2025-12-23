import type { Language } from '@/contexts/LanguageContext';

export type TranslationKey = 
  | 'nav.home'
  | 'nav.support'
  | 'nav.monitoring'
  | 'nav.graphs'
  | 'nav.plantations'
  | 'nav.ai'
  | 'auth.login'
  | 'auth.signup'
  | 'auth.logout'
  | 'auth.profile'
  | 'login.title'
  | 'login.emailLabel'
  | 'login.emailPlaceholder'
  | 'login.phoneLabel'
  | 'login.phonePlaceholder'
  | 'login.passwordLabel'
  | 'login.passwordPlaceholder'
  | 'login.submitButton'
  | 'login.submitting'
  | 'login.forgotPassword'
  | 'login.noAccount'
  | 'login.signupLink'
  | 'login.backToHome'
  | 'login.showPassword'
  | 'login.hidePassword'
  | 'login.errors.emailRequired'
  | 'login.errors.emailInvalid'
  | 'login.errors.phoneRequired'
  | 'login.errors.phoneInvalid'
  | 'login.errors.passwordRequired'
  | 'login.errors.passwordMinLength'
  | 'login.errors.loginFailed'
  | 'login.errors.twoFactorInvalid'
  | 'login.errors.twoFactorTokenMissing'
  | 'login.errors.twoFactorFailed'
  | 'login.twoFactorTitle'
  | 'login.twoFactorDescription'
  | 'login.twoFactorCodeLabel'
  | 'login.twoFactorCodePlaceholder'
  | 'login.verifyButton'
  | 'login.verifying'
  | 'login.backToLogin'
  | 'login.motivational.line1'
  | 'login.motivational.line2'
  | 'login.motivational.line3'
  | 'signup.title'
  | 'signup.lastNameLabel'
  | 'signup.lastNamePlaceholder'
  | 'signup.firstNameLabel'
  | 'signup.firstNamePlaceholder'
  | 'signup.emailLabel'
  | 'signup.emailPlaceholder'
  | 'signup.phoneLabel'
  | 'signup.phonePlaceholder'
  | 'signup.passwordLabel'
  | 'signup.passwordPlaceholder'
  | 'signup.confirmPasswordLabel'
  | 'signup.confirmPasswordPlaceholder'
  | 'signup.submitButton'
  | 'signup.submitting'
  | 'signup.hasAccount'
  | 'signup.loginLink'
  | 'signup.backToHome'
  | 'signup.showPassword'
  | 'signup.hidePassword'
  | 'signup.passwordRequirements'
  | 'signup.errors.lastNameRequired'
  | 'signup.errors.firstNameRequired'
  | 'signup.errors.emailRequired'
  | 'signup.errors.emailInvalid'
  | 'signup.errors.emailExists'
  | 'signup.errors.phoneRequired'
  | 'signup.errors.phoneInvalid'
  | 'signup.errors.phoneExists'
  | 'signup.errors.passwordRequired'
  | 'signup.errors.passwordMinLength'
  | 'signup.errors.passwordUppercase'
  | 'signup.errors.passwordLowercase'
  | 'signup.errors.passwordNumber'
  | 'signup.errors.passwordSpecial'
  | 'signup.errors.confirmPasswordRequired'
  | 'signup.errors.passwordsMismatch'
  | 'signup.errors.signupFailed'
  | 'plantations.loading'
  | 'plantations.list.title'
  | 'plantations.create'
  | 'plantations.area'
  | 'plantations.viewDetails'
  | 'plantations.empty.title'
  | 'plantations.empty.message'
  | 'plantations.empty.action'
  | 'plantations.empty.icon'
  | 'plantations.slogan.line1'
  | 'plantations.slogan.line2'
  | 'plantations.createModal.title'
  | 'plantations.createModal.nameLabel'
  | 'plantations.createModal.namePlaceholder'
  | 'plantations.createModal.areaLabel'
  | 'plantations.createModal.areaPlaceholder'
  | 'plantations.createModal.areaUnit.m2'
  | 'plantations.createModal.areaUnit.ha'
  | 'plantations.createModal.areaUnit.acre'
  | 'plantations.createModal.areaUnit.km2'
  | 'plantations.createModal.locationLabel'
  | 'plantations.createModal.locationPlaceholder'
  | 'plantations.createModal.next'
  | 'plantations.createModal.cancel'
  | 'plantations.createModal.submitting'
  | 'plantations.createModal.cropTypeLabel'
  | 'plantations.createModal.cropTypePlaceholder'
  | 'plantations.createModal.latitudeLabel'
  | 'plantations.createModal.latitudePlaceholder'
  | 'plantations.createModal.longitudeLabel'
  | 'plantations.createModal.longitudePlaceholder'
  | 'plantations.createModal.errors.nameRequired'
  | 'plantations.createModal.errors.areaRequired'
  | 'plantations.createModal.errors.areaInvalid'
  | 'plantations.createModal.errors.locationRequired'
  | 'plantations.createModal.errors.latitudeInvalid'
  | 'plantations.createModal.errors.longitudeInvalid'
  | 'plantations.createModal.errors.coordinatesRequiredTogether'
  | 'plantations.cropType'
  | 'plantations.errors.fetchFailed'
  | 'plantations.detail.title'
  | 'plantations.detail.loading'
  | 'plantations.detail.backToList'
  | 'plantations.detail.createdAt'
  | 'plantations.detail.monitoring'
  | 'plantations.detail.graphs'
  | 'plantations.detail.sensors.title'
  | 'plantations.detail.sensors.active'
  | 'plantations.detail.sensors.inactive'
  | 'plantations.detail.sensors.temperature'
  | 'plantations.detail.sensors.humidity'
  | 'plantations.detail.sensors.soilMoisture'
  | 'plantations.detail.sensors.co2Level'
  | 'plantations.detail.sensors.waterLevel'
  | 'plantations.detail.sensors.luminosity'
  | 'plantations.detail.sensors.lastUpdate'
  | 'plantations.detail.sensors.noSensors'
  | 'plantations.detail.sensors.noSensorsMessage'
  | 'plantations.detail.sensors.noData'
  | 'plantations.detail.errors.invalidId'
  | 'plantations.detail.errors.fetchFailed'
  | 'plantations.detail.errors.notFound'
  | 'notifications.title'
  | 'notifications.empty'
  | 'notifications.loading'
  | 'notifications.noDescription'
  | 'notifications.sent'
  | 'notifications.noEmail'
  | 'notifications.justNow'
  | 'notifications.minutesAgo'
  | 'notifications.hoursAgo'
  | 'notifications.daysAgo'
  | 'notifications.delete'
  | 'hero.heading'
  | 'features.automation.title'
  | 'features.automation.description'
  | 'features.ai.title'
  | 'features.ai.description'
  | 'features.realtime.title'
  | 'features.realtime.description'
  | 'benefits.yield.title'
  | 'benefits.energy.title'
  | 'benefits.water.title'
  | 'intelligent.title'
  | 'intelligent.description'
  | 'cta.title'
  | 'cta.subtitle'
  | 'cta.button'
  | 'footer.description'
  | 'footer.resources.title'
  | 'footer.resources.documentation'
  | 'footer.resources.guide'
  | 'footer.legal.title'
  | 'footer.legal.privacy'
  | 'footer.legal.terms'
  | 'footer.legal.cookies'
  | 'footer.social.title'
  | 'footer.copyright'
  | 'floatingButton.ariaLabel'
  | 'graphs.title'
  | 'graphs.welcome.title'
  | 'graphs.welcome.description'
  | 'graphs.welcome.hint'
  | 'graphs.sensors.humidity'
  | 'graphs.sensors.temperature'
  | 'graphs.sensors.soilMoisture'
  | 'graphs.sensors.luminosity'
  | 'graphs.sensors.co2'
  | 'graphs.sensors.waterLevel'
  | 'graphs.dateFrom'
  | 'graphs.dateTo'
  | 'graphs.applyFilter'
  | 'graphs.resetFilter'
  | 'graphs.chart.title'
  | 'graphs.loading'
  | 'graphs.empty'
  | 'monitoring.sensors.title'
  | 'monitoring.sensors.temperature'
  | 'monitoring.sensors.soilHumidity'
  | 'monitoring.sensors.co2'
  | 'monitoring.sensors.luminosity'
  | 'monitoring.sensors.waterLevel'
  | 'monitoring.thresholds.title'
  | 'monitoring.thresholds.subtitle'
  | 'monitoring.thresholds.min'
  | 'monitoring.thresholds.max'
  | 'monitoring.thresholds.edit'
  | 'monitoring.thresholds.save'
  | 'monitoring.thresholds.saving'
  | 'monitoring.thresholds.cancel'
  | 'monitoring.thresholds.editingFor'
  | 'monitoring.thresholds.editingSubtitle'
  | 'monitoring.thresholds.invalidData'
  | 'monitoring.thresholds.maxMustBeGreater'
  | 'monitoring.thresholds.updateSuccess'
  | 'monitoring.thresholds.updateError'
  | 'monitoring.thresholds.notFound'
  | 'monitoring.thresholds.forbidden'
  | 'monitoring.thresholds.unauthorized'
  | 'monitoring.updated'
  | 'monitoring.status.good'
  | 'monitoring.status.optimal'
  | 'monitoring.status.moderate'
  | 'monitoring.status.low'
  | 'monitoring.status.high'
  | 'monitoring.status.critical'
  | 'monitoring.status.bright'
  | 'monitoring.status.normal'
  | 'monitoring.status.dim'
  | 'monitoring.equipment.title'
  | 'monitoring.equipment.irrigationPump'
  | 'monitoring.equipment.fans'
  | 'monitoring.equipment.lighting'
  | 'monitoring.equipment.offline'
  | 'monitoring.equipment.noActuators'
  | 'monitoring.equipment.updateError'
  | 'monitoring.mode.automatic'
  | 'monitoring.mode.manual'
  | 'monitoring.mode.automaticInfo'
  | 'monitoring.mode.updateError'
  | 'monitoring.noSensors'
  | 'monitoring.help.title'
  | 'monitoring.help.intro'
  | 'monitoring.help.temperature.title'
  | 'monitoring.help.temperature.description'
  | 'monitoring.help.soilHumidity.title'
  | 'monitoring.help.soilHumidity.description'
  | 'monitoring.help.co2.title'
  | 'monitoring.help.co2.description'
  | 'monitoring.help.luminosity.title'
  | 'monitoring.help.luminosity.description'
  | 'monitoring.help.waterLevel.title'
  | 'monitoring.help.waterLevel.description'
  | 'monitoring.help.zones.optimal'
  | 'monitoring.help.zones.warning'
  | 'monitoring.help.zones.danger'
  | 'monitoring.help.close'
  | 'profile.back'
  | 'profile.pageLabel'
  | 'profile.welcome'
  | 'profile.loading'
  | 'profile.loadingHint'
  | 'profile.changePhoto'
  | 'profile.noPhone'
  | 'profile.roleLabel'
  | 'profile.editButton'
  | 'profile.saveButton'
  | 'profile.saving'
  | 'profile.cancelButton'
  | 'profile.firstNameLabel'
  | 'profile.firstNamePlaceholder'
  | 'profile.lastNameLabel'
  | 'profile.lastNamePlaceholder'
  | 'profile.languageLabel'
  | 'profile.emailLabel'
  | 'profile.noEmail'
  | 'profile.notConfigured'
  | 'profile.addEmail'
  | 'profile.roleHint'
  | 'profile.phoneLabel'
  | 'profile.phonePlaceholder'
  | 'profile.idLabel'
  | 'profile.idHint'
  | 'profile.twoFactor.title'
  | 'profile.twoFactor.description'
  | 'profile.twoFactor.enabled'
  | 'profile.twoFactor.disabled'
  | 'profile.twoFactor.enableButton'
  | 'profile.twoFactor.disableButton'
  | 'profile.twoFactor.setupTitle'
  | 'profile.twoFactor.setupDescription'
  | 'profile.twoFactor.scanQRCode'
  | 'profile.twoFactor.enterCode'
  | 'profile.twoFactor.codeLabel'
  | 'profile.twoFactor.codePlaceholder'
  | 'profile.twoFactor.activateButton'
  | 'profile.twoFactor.deactivateButton'
  | 'profile.twoFactor.disableTitle'
  | 'profile.twoFactor.disableDescription'
  | 'profile.twoFactor.success'
  | 'profile.twoFactor.error'
  | 'profile.errors.firstNameRequired'
  | 'profile.errors.lastNameRequired'
  | 'profile.errors.phoneRequired'
  | 'profile.errors.phoneInvalid'
  | 'profile.errors.invalidImage'
  | 'profile.errors.imageSizeExceeded'
  | 'profile.errors.uploadFailed'
  | 'profile.errors.updateFailed'
  | 'profile.role.farmer'
  | 'profile.role.technician'
  | 'profile.role.admin'
  | 'admin.fakers.title'
  | 'admin.fakers.subtitle'
  | 'admin.fakers.test.title'
  | 'admin.fakers.test.description'
  | 'admin.fakers.test.button'
  | 'admin.fakers.test.testing'
  | 'admin.fakers.testError'
  | 'admin.fakers.generate.title'
  | 'admin.fakers.generate.description'
  | 'admin.fakers.generate.countLabel'
  | 'admin.fakers.generate.countPlaceholder'
  | 'admin.fakers.generate.scenarioLabel'
  | 'admin.fakers.generate.entityLabel'
  | 'admin.fakers.generate.entityOptional'
  | 'admin.fakers.generate.entityAll'
  | 'admin.fakers.generate.button'
  | 'admin.fakers.generate.generating'
  | 'admin.fakers.generateError'
  | 'admin.fakers.errors.countInvalid'
  | 'admin.fakers.errors.scenarioRequired'
  | 'admin.fakers.results.total'
  | 'admin.fakers.results.users'
  | 'admin.fakers.results.plantations'
  | 'admin.fakers.results.sensors'
  | 'admin.fakers.results.sensorReadings'
  | 'admin.fakers.results.actuators'
  | 'admin.fakers.results.events'
  | 'admin.fakers.results.notifications'
  | 'admin.fakers.scenarios.normal'
  | 'admin.fakers.scenarios.edge'
  | 'admin.fakers.scenarios.alert'
  | 'admin.fakers.scenarios.seasonal'
  | 'admin.fakers.scenarios.mixed'
  | 'admin.fakers.scenarios.normal.description'
  | 'admin.fakers.scenarios.edge.description'
  | 'admin.fakers.scenarios.alert.description'
  | 'admin.fakers.scenarios.seasonal.description'
  | 'admin.fakers.scenarios.mixed.description'
  | 'admin.fakers.scenarios.weights.normal'
  | 'admin.fakers.scenarios.weights.edge'
  | 'admin.fakers.scenarios.weights.alert'
  | 'admin.fakers.scenarios.weights.seasonal'
  | 'admin.fakers.info.title'
  | 'admin.fakers.info.description'
  | 'admin.fakers.distribution.title'
  | 'admin.fakers.distribution.description'
  | 'admin.fakers.distribution.percentage'
  | 'admin.fakers.entities.title'
  | 'admin.fakers.entities.description'
  | 'admin.fakers.entities.user'
  | 'admin.fakers.entities.plantation'
  | 'admin.fakers.entities.sensor'
  | 'admin.fakers.entities.sensorReading'
  | 'admin.fakers.entities.actuator'
  | 'admin.fakers.entities.event'
  | 'admin.fakers.entities.notification'
  | 'admin.fakers.seasonal.title'
  | 'admin.fakers.seasonal.description'
  | 'admin.fakers.seasonal.dry_season'
  | 'admin.fakers.seasonal.rainy_season'
  | 'admin.fakers.seasonal.harmattan'
  | 'admin.fakers.seasonal.transition'
  | 'admin.fakers.results.percentage'
  | 'admin.fakers.results.barChart'
  | 'chatbox.title'
  | 'chatbox.description'
  | 'chatbox.emptyState.title'
  | 'chatbox.emptyState.description'
  | 'chatbox.suggestionsHeader'
  | 'chatbox.suggestedQuestions.question1'
  | 'chatbox.suggestedQuestions.question2'
  | 'chatbox.suggestedQuestions.question3'
  | 'chatbox.suggestedQuestions.question4'
  | 'chatbox.aiResponse.prefix'
  | 'chatbox.aiResponse.intro'
  | 'chatbox.inputLabel'
  | 'chatbox.inputPlaceholder'
  | 'chatbox.sendButton'
  | 'chatbox.sending'
  | 'chatbox.inputHint'
  | 'chatbox.characters'
  | 'chatbox.characterCount'
  | 'language.fr'
  | 'language.en'
  | 'language.ff'
  | 'language.ew';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Plantations',
    'nav.ai': 'IA',
    'auth.login': 'Se Connecter',
    'auth.signup': "S'inscrire",
    'auth.logout': 'Déconnexion',
    'auth.profile': 'Profil',
    'login.title': 'CONNEXION',
    'login.emailLabel': 'Adresse email',
    'login.emailPlaceholder': 'Adresse email',
    'login.phoneLabel': 'Numéro de téléphone',
    'login.phonePlaceholder': 'Entrez votre numéro de téléphone',
    'login.passwordLabel': 'Mot de passe',
    'login.passwordPlaceholder': 'Mot de passe',
    'login.submitButton': 'Se Connecter',
    'login.submitting': 'Connexion...',
    'login.forgotPassword': 'Mot de passe oublié ?',
    'login.noAccount': 'Vous n\'avez pas de compte ?',
    'login.signupLink': 'Inscrivez-vous.',
    'login.backToHome': 'Retour à l\'accueil',
    'login.showPassword': 'Afficher le mot de passe',
    'login.hidePassword': 'Masquer le mot de passe',
    'login.errors.emailRequired': 'L\'adresse email est requise',
    'login.errors.emailInvalid': 'L\'adresse email n\'est pas valide',
    'login.errors.phoneRequired': 'Le numéro de téléphone est requis',
    'login.errors.phoneInvalid': 'Le numéro de téléphone n\'est pas valide',
    'login.errors.passwordRequired': 'Le mot de passe est requis',
    'login.errors.passwordMinLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'login.errors.loginFailed': 'Échec de la connexion. Vérifiez vos identifiants.',
    'login.errors.twoFactorInvalid': 'Le code doit contenir exactement 6 chiffres',
    'login.errors.twoFactorTokenMissing': 'Token de vérification manquant',
    'login.errors.twoFactorFailed': 'Code 2FA invalide. Veuillez réessayer.',
    'login.twoFactorTitle': 'Authentification à deux facteurs',
    'login.twoFactorDescription': 'Entrez le code à 6 chiffres généré par votre application d\'authentification',
    'login.twoFactorCodeLabel': 'Code de vérification',
    'login.twoFactorCodePlaceholder': '000000',
    'login.verifyButton': 'Vérifier',
    'login.verifying': 'Vérification...',
    'login.backToLogin': 'Retour à la connexion',
    'login.motivational.line1': 'Modernisez vos cultures, automatisez',
    'login.motivational.line2': 'vos tâches et améliorez vos récoltes',
    'login.motivational.line3': 'L\'agriculture connectée et automatisée c\'est l\'avenir',
    'signup.title': 'INSCRIPTION',
    'signup.lastNameLabel': 'Nom',
    'signup.lastNamePlaceholder': 'Nom',
    'signup.firstNameLabel': 'Prénom',
    'signup.firstNamePlaceholder': 'Prénom',
    'signup.emailLabel': 'Adresse email',
    'signup.emailPlaceholder': 'Adresse email',
    'signup.phoneLabel': 'Numéro de tel (Whatsapp)',
    'signup.phonePlaceholder': 'Numéro de tel (Whatsapp)',
    'signup.passwordLabel': 'Mot de passe',
    'signup.passwordPlaceholder': 'Mot de passe',
    'signup.confirmPasswordLabel': 'Confirmation de mot de passe',
    'signup.confirmPasswordPlaceholder': 'Confirmation de mot de passe',
    'signup.submitButton': 'S\'inscrire',
    'signup.submitting': 'Inscription...',
    'signup.hasAccount': 'Vous avez déjà un compte ?',
    'signup.loginLink': 'Connectez-vous.',
    'signup.backToHome': 'Retour à l\'accueil',
    'signup.showPassword': 'Afficher le mot de passe',
    'signup.hidePassword': 'Masquer le mot de passe',
    'signup.passwordRequirements': 'Exigences du mot de passe :',
    'signup.errors.lastNameRequired': 'Le nom est requis',
    'signup.errors.firstNameRequired': 'Le prénom est requis',
    'signup.errors.emailRequired': 'L\'adresse email est requise',
    'signup.errors.emailInvalid': 'L\'adresse email n\'est pas valide',
    'signup.errors.emailExists': 'Cet email est déjà utilisé',
    'signup.errors.phoneRequired': 'Le numéro de téléphone est requis',
    'signup.errors.phoneInvalid': 'Le numéro de téléphone n\'est pas valide',
    'signup.errors.phoneExists': 'Ce numéro de téléphone est déjà utilisé',
    'signup.errors.passwordRequired': 'Le mot de passe est requis',
    'signup.errors.passwordMinLength': 'Le mot de passe doit contenir au moins 8 caractères',
    'signup.errors.passwordUppercase': 'Le mot de passe doit contenir au moins une lettre majuscule',
    'signup.errors.passwordLowercase': 'Le mot de passe doit contenir au moins une lettre minuscule',
    'signup.errors.passwordNumber': 'Le mot de passe doit contenir au moins un nombre',
    'signup.errors.passwordSpecial': 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)',
    'signup.errors.confirmPasswordRequired': 'La confirmation du mot de passe est requise',
    'signup.errors.passwordsMismatch': 'Les mots de passe ne correspondent pas',
    'signup.errors.signupFailed': 'Échec de l\'inscription. Veuillez réessayer.',
    'notifications.title': 'Notifications',
    'notifications.empty': 'Aucune notification',
    'notifications.loading': 'Chargement...',
    'notifications.noDescription': 'Notification',
    'notifications.sent': 'envoyées',
    'notifications.noEmail': 'Aucune notification email',
    'notifications.justNow': 'À l\'instant',
    'notifications.minutesAgo': 'min',
    'notifications.hoursAgo': 'h',
    'notifications.daysAgo': 'j',
    'notifications.delete': 'Supprimer',
    'hero.heading': 'Tous ensemble pour une <span class="hero__highlight">agriculture intelligente</span>, <span class="hero__highlight">connectée</span> et <span class="hero__highlight">automatisée</span>',
    'features.automation.title': 'Automatisation',
    'features.automation.description': 'Gérez Votre Irrigation, Ventilation Et Éclairage Sans Effort. Notre Système Autonome, Alimenté Par Énergie Solaire, Garantit Que Les Tâches Essentielles S\'exécutent Même En Cas De Coupure De Courant.',
    'features.ai.title': 'IA Intégrée',
    'features.ai.description': 'Identifiez Les Maladies Des Cultures Par Simple Photo Et Recevez Des Recommandations De Traitement Immédiates. Accédez À Des Conseils Agricoles Personnalisés En Français, Anglais Et Langues Locales.',
    'features.realtime.title': 'Suivi En Temps Réel',
    'features.realtime.description': 'Visualisez Les Conditions Critiques De Votre Champ À Distance : Humidité Du Sol, Température, CO2 Et Niveau D\'eau. Recevez Des Alertes En Temps Réel Pour Anticiper Les Risques Climatiques Et Les Anomalies.',
    'benefits.yield.title': 'Augmenter le rendement des produits',
    'benefits.energy.title': 'Réduire la consommation d\'énergie',
    'benefits.water.title': 'Economiser la consommation d\'eau',
    'intelligent.title': 'Agriculture intelligente face au climat, basée sur les données',
    'intelligent.description': 'En utilisant les données en temps réel comme un coup de pouce supplémentaire, les agriculteurs et les horticulteurs fusionnent le monde physique avec les outils numériques pour lutter contre les problèmes quotidiens et améliorer leur productivité.',
    'cta.title': 'Prêt À Transformer Votre Agriculture ?',
    'cta.subtitle': 'Rejoignez Les Centaines D\'agriculteurs Qui Augmentent Leurs Rendements Avec CamerFarm AI',
    'cta.button': 'Nous Contacter',
    'footer.description': 'La plateforme intelligente pour une agriculture camerounaise moderne et durable.',
    'footer.resources.title': 'Ressources',
    'footer.resources.documentation': 'Documentation',
    'footer.resources.guide': 'Guide d\'utilisation',
    'footer.legal.title': 'Légal',
    'footer.legal.privacy': 'Confidentialité',
    'footer.legal.terms': 'Conditions',
    'footer.legal.cookies': 'Cookies',
    'footer.social.title': 'Suivez Nous',
    'footer.copyright': '© 2025 CamerFarm AI. Tous Droits Réservés.',
    'floatingButton.ariaLabel': 'Contacter le support',
    'plantations.loading': 'Chargement des plantations...',
    'plantations.list.title': 'Mes Plantations',
    'plantations.create': 'Créer une plantation',
    'plantations.area': 'Superficie',
    'plantations.viewDetails': 'Voir les détails',
    'plantations.empty.title': 'OUPS,',
    'plantations.empty.message': 'Il semble que vous n\'ayez pas créé de plantation.',
    'plantations.empty.action': 'Créer-en',
    'plantations.empty.icon': 'Aucune plantation',
    'plantations.slogan.line1': 'Modernisez vos cultures, automatisez vos tâches et améliorez vos récoltes',
    'plantations.slogan.line2': 'L\'agriculture connectée et automatisée c\'est l\'avenir',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Bienvenue sur votre tableau de bord CamerFarm AI.',
    'graphs.welcome.description': 'Visualisez en temps réel les données de vos capteurs pour mieux comprendre l\'état de vos parcelles et optimiser vos interventions.',
    'graphs.welcome.hint': 'Utilisez les boutons ci-dessous pour filtrer les types de capteurs (Humidité, température, CO₂, etc.)',
    'graphs.sensors.humidity': 'Capteur Humidité',
    'graphs.sensors.temperature': 'Capteur Température ambiante',
    'graphs.sensors.soilMoisture': 'Capteur Humidité du sol',
    'graphs.sensors.luminosity': 'Capteur de luminosité',
    'graphs.sensors.co2': 'Capteur de CO2',
    'graphs.sensors.waterLevel': 'Niveau d\'eau',
    'graphs.dateFrom': 'Du',
    'graphs.dateTo': 'Au',
    'graphs.applyFilter': 'Appliquer Filtre',
    'graphs.resetFilter': 'Réinitialiser',
    'graphs.chart.title': 'Évolution',
    'graphs.loading': 'Chargement des données des capteurs...',
    'graphs.empty': 'Aucune donnée de capteur disponible pour cette période.',
    'monitoring.sensors.title': 'Valeurs des capteurs en temps réel',
    'monitoring.sensors.temperature': 'Température',
    'monitoring.sensors.soilHumidity': 'Humidité du sol',
    'monitoring.sensors.co2': 'Taux de CO2',
    'monitoring.sensors.luminosity': 'Luminosité',
    'monitoring.sensors.waterLevel': 'Niveau d\'eau',
    'monitoring.thresholds.title': 'Seuils des capteurs',
    'monitoring.thresholds.subtitle': 'Ajustez les seuils pour vos capteurs afin de recevoir des alertes pertinentes.',
    'monitoring.thresholds.min': 'Seuil min',
    'monitoring.thresholds.max': 'Seuil max',
    'monitoring.thresholds.edit': 'Modifier les seuils',
    'monitoring.thresholds.save': 'Enregistrer',
    'monitoring.thresholds.saving': 'Enregistrement...',
    'monitoring.thresholds.cancel': 'Annuler',
    'monitoring.thresholds.editingFor': 'Modification des seuils pour',
    'monitoring.thresholds.editingSubtitle': 'Définissez les valeurs minimales et maximales pour déclencher des alertes',
    'monitoring.thresholds.invalidData': 'Données de seuils invalides',
    'monitoring.thresholds.maxMustBeGreater': 'Le seuil maximum doit être strictement supérieur au seuil minimum',
    'monitoring.thresholds.updateSuccess': 'Seuils mis à jour avec succès',
    'monitoring.thresholds.updateError': 'Erreur lors de la mise à jour des seuils',
    'monitoring.thresholds.notFound': 'Capteur ou plantation introuvable',
    'monitoring.thresholds.forbidden': 'Vous n\'avez pas la permission de modifier ces seuils',
    'monitoring.thresholds.unauthorized': 'Vous devez être connecté pour modifier les seuils',
    'monitoring.updated': 'Mis à jour',
    'monitoring.status.good': 'Bon',
    'monitoring.status.optimal': 'Optimal',
    'monitoring.status.moderate': 'Modéré',
    'monitoring.status.low': 'Faible',
    'monitoring.status.high': 'Élevé',
    'monitoring.status.critical': 'Critique',
    'monitoring.status.bright': 'Lumineux',
    'monitoring.status.normal': 'Normal',
    'monitoring.status.dim': 'Sombre',
    'monitoring.equipment.title': 'Contrôle des matériels et accessoires',
    'monitoring.equipment.irrigationPump': 'Pompe d\'irrigation',
    'monitoring.equipment.fans': 'Ventilateurs',
    'monitoring.equipment.lighting': 'Éclairage',
    'monitoring.equipment.offline': 'Hors ligne',
    'monitoring.equipment.noActuators': 'Aucun actionneur n\'est actuellement installé dans ce champ.',
    'monitoring.equipment.updateError': 'Erreur lors de la mise à jour de l\'équipement. Veuillez réessayer.',
    'monitoring.mode.automatic': 'Automatique',
    'monitoring.mode.manual': 'Manuel',
    'monitoring.mode.automaticInfo': 'Mode automatique activé : Les équipements sont contrôlés automatiquement selon les données des capteurs.',
    'monitoring.mode.updateError': 'Erreur lors de la mise à jour du mode. Veuillez réessayer.',
    'monitoring.noSensors': 'Aucun capteur n\'est actuellement affecté à cette plantation. Veuillez affecter des capteurs pour voir les données de monitoring.',
    'monitoring.help.title': 'Comment fonctionnent les couleurs des jauges ?',
    'monitoring.help.intro': 'Les couleurs des jauges s\'adaptent automatiquement selon les seuils que vous avez configurés (seuilMin et seuilMax). Chaque jauge utilise un système de couleurs pour vous indiquer rapidement l\'état de vos capteurs.',
    'monitoring.help.temperature.title': '🌡️ Température (0-50°C)',
    'monitoring.help.temperature.description': 'La jauge de température affiche du vert autour de votre seuil minimum (température idéale), puis transitionne progressivement vers le jaune et l\'orange entre les seuils, et devient rouge au-dessus du seuil maximum (danger).',
    'monitoring.help.soilHumidity.title': '💧 Humidité du sol (0-100%)',
    'monitoring.help.soilHumidity.description': 'La zone optimale (verte) se situe entre votre seuil minimum et maximum. En dessous du seuil min ou au-dessus du seuil max, la couleur passe à l\'orange puis au rouge pour indiquer un niveau critique.',
    'monitoring.help.co2.title': '🌬️ Taux de CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'Le vert indique un bon niveau de CO2 (en dessous du seuil min). La couleur transitionne vers le jaune puis l\'orange entre les seuils, et devient rouge au-dessus du seuil maximum (niveau dangereux).',
    'monitoring.help.luminosity.title': '☀️ Luminosité (0-100000 lux)',
    'monitoring.help.luminosity.description': 'La zone optimale (verte) se trouve entre votre seuil minimum et maximum. En dehors de cette plage, la couleur devient jaune (avertissement) puis rouge (saturation ou obscurité extrême).',
    'monitoring.help.waterLevel.title': '💧 Niveau d\'eau (0-100%)',
    'monitoring.help.waterLevel.description': 'Le rouge indique un niveau critique (en dessous du seuil min). Au-dessus du seuil minimum, la couleur passe progressivement à l\'orange, puis au vert pour indiquer un niveau suffisant.',
    'monitoring.help.zones.optimal': 'Zone optimale',
    'monitoring.help.zones.warning': 'Zone d\'avertissement',
    'monitoring.help.zones.danger': 'Zone de danger',
    'monitoring.help.close': 'Fermer',
    'plantations.createModal.title': 'Entrez les informations du champ',
    'plantations.createModal.nameLabel': 'Nom de votre plantation',
    'plantations.createModal.namePlaceholder': 'Entrer le nom de votre plantation',
    'plantations.createModal.areaLabel': 'Superficie de plantation',
    'plantations.createModal.areaPlaceholder': 'Entrer la superficie de votre plantation',
    'plantations.createModal.areaUnit.m2': 'm²',
    'plantations.createModal.areaUnit.ha': 'ha',
    'plantations.createModal.areaUnit.acre': 'acre',
    'plantations.createModal.areaUnit.km2': 'km²',
    'plantations.createModal.locationLabel': 'Localisation',
    'plantations.createModal.locationPlaceholder': 'Entrer la zone de votre plantation',
    'plantations.createModal.next': 'Suivant',
    'plantations.createModal.cancel': 'Annuler',
    'plantations.createModal.submitting': 'Création...',
    'plantations.createModal.cropTypeLabel': 'Type de culture',
    'plantations.createModal.cropTypePlaceholder': 'Ex: Manioc, cacao...',
    'plantations.createModal.latitudeLabel': 'Latitude',
    'plantations.createModal.latitudePlaceholder': 'Entrer la latitude',
    'plantations.createModal.longitudeLabel': 'Longitude',
    'plantations.createModal.longitudePlaceholder': 'Entrer la longitude',
    'plantations.createModal.errors.nameRequired': 'Le nom de la plantation est requis',
    'plantations.createModal.errors.areaRequired': 'La superficie est requise',
    'plantations.createModal.errors.areaInvalid': 'La superficie doit être un nombre valide',
    'plantations.createModal.errors.locationRequired': 'La localisation est requise',
    'plantations.createModal.errors.latitudeInvalid': 'La latitude n\'est pas valide',
    'plantations.createModal.errors.longitudeInvalid': 'La longitude n\'est pas valide',
    'plantations.createModal.errors.coordinatesRequiredTogether': 'La latitude et la longitude doivent être fournies ensemble',
    'plantations.cropType': 'Culture',
    'plantations.errors.fetchFailed': 'Impossible de charger les plantations. Les données affichées peuvent être obsolètes.',
    'plantations.detail.title': 'Détail plantation',
    'plantations.detail.loading': 'Chargement de la plantation...',
    'plantations.detail.backToList': 'Retour à la liste',
    'plantations.detail.createdAt': 'Créée le',
    'plantations.detail.monitoring': 'Monitoring',
    'plantations.detail.graphs': 'Graphiques',
    'plantations.detail.sensors.title': 'Capteurs',
    'plantations.detail.sensors.active': 'Actif',
    'plantations.detail.sensors.inactive': 'Inactif',
    'plantations.detail.sensors.temperature': 'Température',
    'plantations.detail.sensors.humidity': 'Humidité',
    'plantations.detail.sensors.soilMoisture': 'Humidité du sol',
    'plantations.detail.sensors.co2Level': 'Niveau CO₂',
    'plantations.detail.sensors.waterLevel': 'Niveau d\'eau',
    'plantations.detail.sensors.luminosity': 'Luminosité',
    'plantations.detail.sensors.lastUpdate': 'Dernière mise à jour',
    'plantations.detail.sensors.noSensors': 'Aucun capteur installé',
    'plantations.detail.sensors.noData': 'Aucune donnée',
    'plantations.detail.sensors.noSensorsMessage': 'Cette plantation n\'a pas encore de capteurs installés. Installez des capteurs pour accéder au monitoring.',
    'plantations.detail.errors.invalidId': 'ID de plantation invalide',
    'plantations.detail.errors.fetchFailed': 'Impossible de charger les détails de la plantation.',
    'plantations.detail.errors.notFound': 'Plantation non trouvée',
    'profile.back': 'Retour',
    'profile.pageLabel': 'Profil utilisateur',
    'profile.welcome': 'Bienvenue, {name}',
    'profile.loading': 'Chargement du profil...',
    'profile.loadingHint': 'Si le chargement prend trop de temps, vérifiez la console pour les erreurs.',
    'profile.changePhoto': 'Changer',
    'profile.noPhone': 'Aucun téléphone',
    'profile.roleLabel': 'Rôle',
    'profile.editButton': 'Modifier',
    'profile.saveButton': 'Enregistrer',
    'profile.saving': 'Enregistrement...',
    'profile.cancelButton': 'Annuler',
    'profile.firstNameLabel': 'Prénom',
    'profile.firstNamePlaceholder': 'Votre prénom',
    'profile.lastNameLabel': 'Nom',
    'profile.lastNamePlaceholder': 'Votre nom',
    'profile.languageLabel': 'Langue',
    'profile.emailLabel': 'Mon adresse email',
    'profile.noEmail': 'Aucune adresse email',
    'profile.notConfigured': 'Non configuré',
    'profile.addEmail': 'Ajouter une adresse email',
    'profile.roleHint': 'Le rôle ne peut pas être modifié',
    'profile.phoneLabel': 'Téléphone',
    'profile.phonePlaceholder': 'Votre numéro de téléphone',
    'profile.idLabel': 'ID Utilisateur',
    'profile.idHint': 'Identifiant unique',
    'profile.twoFactor.title': 'Authentification à deux facteurs',
    'profile.twoFactor.description': 'Sécurisez votre compte avec un code de vérification supplémentaire',
    'profile.twoFactor.enabled': 'Activé',
    'profile.twoFactor.disabled': 'Désactivé',
    'profile.twoFactor.enableButton': 'Activer le 2FA',
    'profile.twoFactor.disableButton': 'Désactiver le 2FA',
    'profile.twoFactor.setupTitle': 'Configuration du 2FA',
    'profile.twoFactor.setupDescription': 'Scannez le QR code avec votre application d\'authentification (Google Authenticator, Authy, etc.)',
    'profile.twoFactor.scanQRCode': 'Scannez ce QR code',
    'profile.twoFactor.enterCode': 'Entrez le code de vérification',
    'profile.twoFactor.codeLabel': 'Code de vérification',
    'profile.twoFactor.codePlaceholder': '000000',
    'profile.twoFactor.activateButton': 'Activer',
    'profile.twoFactor.deactivateButton': 'Désactiver',
    'profile.twoFactor.disableTitle': 'Désactiver le 2FA',
    'profile.twoFactor.disableDescription': 'Entrez votre code 2FA pour confirmer la désactivation',
    'profile.twoFactor.success': '2FA activé avec succès',
    'profile.twoFactor.error': 'Erreur lors de l\'activation du 2FA',
    'profile.errors.firstNameRequired': 'Le prénom est requis',
    'profile.errors.lastNameRequired': 'Le nom est requis',
    'profile.errors.phoneRequired': 'Le numéro de téléphone est requis',
    'profile.errors.phoneInvalid': 'Le numéro de téléphone n\'est pas valide',
    'profile.errors.invalidImage': 'Veuillez sélectionner une image valide',
    'profile.errors.imageSizeExceeded': 'L\'image ne doit pas dépasser 5MB',
    'profile.errors.uploadFailed': 'Erreur lors de l\'upload de la photo',
    'profile.errors.updateFailed': 'Erreur lors de la mise à jour du profil',
    'profile.role.farmer': 'Agriculteur',
    'profile.role.admin': 'Administrateur',
    'profile.role.technician': 'Technicien',
    'admin.fakers.title': 'Générateur de données de test',
    'admin.fakers.subtitle': 'Générez des données factices pour tester l\'application',
    'admin.fakers.test.title': 'Tester les fakers',
    'admin.fakers.test.description': 'Testez tous les fakers sans les sauvegarder en base de données',
    'admin.fakers.test.button': 'Tester les fakers',
    'admin.fakers.test.testing': 'Test en cours...',
    'admin.fakers.testError': 'Erreur lors du test des fakers',
    'admin.fakers.generate.title': 'Générer des fakers',
    'admin.fakers.generate.description': 'Générez et sauvegardez des données factices en base de données',
    'admin.fakers.generate.countLabel': 'Nombre d\'entités',
    'admin.fakers.generate.countPlaceholder': '100',
    'admin.fakers.generate.scenarioLabel': 'Scénario',
    'admin.fakers.generate.entityLabel': 'Entité spécifique',
    'admin.fakers.generate.entityOptional': 'optionnel',
    'admin.fakers.generate.entityAll': 'Toutes les entités',
    'admin.fakers.generate.button': 'Générer',
    'admin.fakers.generate.generating': 'Génération en cours...',
    'admin.fakers.generateError': 'Erreur lors de la génération des fakers',
    'admin.fakers.errors.countInvalid': 'Le nombre doit être supérieur à 0',
    'admin.fakers.errors.scenarioRequired': 'Veuillez sélectionner un scénario',
    'admin.fakers.results.total': 'Total',
    'admin.fakers.results.users': 'Utilisateurs',
    'admin.fakers.results.plantations': 'Plantations',
    'admin.fakers.results.sensors': 'Capteurs',
    'admin.fakers.results.sensorReadings': 'Lectures de capteurs',
    'admin.fakers.results.actuators': 'Actionneurs',
    'admin.fakers.results.events': 'Événements',
    'admin.fakers.results.notifications': 'Notifications',
    'admin.fakers.scenarios.normal': 'Normal - Valeurs dans les plages normales',
    'admin.fakers.scenarios.edge': 'Edge Cases - Valeurs aux limites',
    'admin.fakers.scenarios.alert': 'Alertes - Valeurs dépassant les seuils',
    'admin.fakers.scenarios.seasonal': 'Saisonnier - Données saisonnières',
    'admin.fakers.scenarios.mixed': 'Mixte - Mélange de tous les scénarios',
    'admin.fakers.scenarios.normal.description': 'Génère des valeurs dans les plages normales pour tous les capteurs. Idéal pour tester le comportement standard de l\'application.',
    'admin.fakers.scenarios.edge.description': 'Génère des valeurs aux limites min/max. Utile pour tester les cas limites et les validations.',
    'admin.fakers.scenarios.alert.description': 'Génère des valeurs dépassant les seuils pour déclencher des alertes. Parfait pour tester le système de notifications.',
    'admin.fakers.scenarios.seasonal.description': 'Génère des données pour les 4 situations saisonnières du Cameroun : saison sèche, saison des pluies, harmattan et transition.',
    'admin.fakers.scenarios.mixed.description': 'Mélange de tous les scénarios avec des poids équilibrés. Recommandé pour des données réalistes et variées.',
    'admin.fakers.scenarios.weights.normal': 'Poids normal',
    'admin.fakers.scenarios.weights.edge': 'Poids edge',
    'admin.fakers.scenarios.weights.alert': 'Poids alert',
    'admin.fakers.scenarios.weights.seasonal': 'Poids saisonnier',
    'admin.fakers.info.title': 'Scénarios disponibles',
    'admin.fakers.info.description': 'Liste des scénarios de génération disponibles',
    'admin.fakers.distribution.title': 'Distribution par défaut',
    'admin.fakers.distribution.description': 'Répartition des entités générées pour 1000 fakers',
    'admin.fakers.distribution.percentage': 'Pourcentage',
    'admin.fakers.entities.title': 'Types d\'entités supportés',
    'admin.fakers.entities.description': 'Liste des types d\'entités qui peuvent être générées',
    'admin.fakers.entities.user': 'Utilisateurs avec rôles (agriculteur, technicien, admin)',
    'admin.fakers.entities.plantation': 'Plantations avec cultures camerounaises et coordonnées géographiques',
    'admin.fakers.entities.sensor': 'Capteurs (température, humidité sol, CO2, niveau d\'eau, luminosité)',
    'admin.fakers.entities.sensorReading': 'Lectures de capteurs avec variations temporelles cohérentes',
    'admin.fakers.entities.actuator': 'Actionneurs (pompe, ventilateur, arroseur, vanne, chauffage, éclairage)',
    'admin.fakers.entities.event': 'Événements (seuil dépassé, actionneur activé/désactivé, changement de mode)',
    'admin.fakers.entities.notification': 'Notifications (web, email, WhatsApp) avec statuts',
    'admin.fakers.seasonal.title': 'Situations saisonnières',
    'admin.fakers.seasonal.description': 'Les valeurs des capteurs varient selon les saisons camerounaises',
    'admin.fakers.seasonal.dry_season': 'Saison sèche',
    'admin.fakers.seasonal.rainy_season': 'Saison des pluies',
    'admin.fakers.seasonal.harmattan': 'Harmattan',
    'admin.fakers.seasonal.transition': 'Transition',
    'admin.fakers.results.percentage': '%',
    'admin.fakers.results.barChart': 'Répartition visuelle',
    'chatbox.title': 'Assistant IA CamerFarm',
    'chatbox.description': 'Posez vos questions sur l\'agriculture et recevez des conseils personnalisés en temps réel.',
    'chatbox.emptyState.title': 'Bienvenue dans l\'Assistant IA',
    'chatbox.emptyState.description': 'Commencez une conversation en posant une question ou en sélectionnant une suggestion ci-dessous.',
    'chatbox.suggestionsHeader': 'Questions suggérées',
    'chatbox.suggestedQuestions.question1': 'Comment améliorer le rendement de mes cultures ?',
    'chatbox.suggestedQuestions.question2': 'Quels sont les meilleurs moments pour arroser ?',
    'chatbox.suggestedQuestions.question3': 'Comment identifier les maladies des plantes ?',
    'chatbox.suggestedQuestions.question4': 'Quels capteurs dois-je installer pour mon type de culture ?',
    'chatbox.aiResponse.prefix': 'Réponse à votre question',
    'chatbox.aiResponse.intro': 'Voici une réponse détaillée à votre question. L\'assistant IA analyse vos données et vous fournit des recommandations personnalisées basées sur les meilleures pratiques agricoles.',
    'chatbox.inputLabel': 'Votre question',
    'chatbox.inputPlaceholder': 'Tapez votre question ici... (Ex: Comment optimiser l\'irrigation ?)',
    'chatbox.sendButton': 'Envoyer',
    'chatbox.sending': 'Envoi...',
    'chatbox.inputHint': 'Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne',
    'chatbox.characters': 'caractères',
    'chatbox.characterCount': 'caractère',
    'language.fr': 'Français',
    'language.en': 'English',
    'language.ff': 'Fulfulde',
    'language.ew': 'Ewondo',
  },
  en: {
    'nav.home': 'Home',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphs',
    'nav.plantations': 'Plantations',
    'nav.ai': 'AI',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.profile': 'Profile',
    'login.title': 'LOGIN',
    'login.emailLabel': 'Email address',
    'login.emailPlaceholder': 'Email address',
    'login.phoneLabel': 'Phone number',
    'login.phonePlaceholder': 'Enter your phone number',
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': 'Password',
    'login.submitButton': 'Log In',
    'login.submitting': 'Logging in...',
    'login.forgotPassword': 'Forgot password?',
    'login.noAccount': 'Don\'t have an account?',
    'login.signupLink': 'Sign up.',
    'login.backToHome': 'Back to home',
    'login.showPassword': 'Show password',
    'login.hidePassword': 'Hide password',
    'login.errors.emailRequired': 'Email address is required',
    'login.errors.emailInvalid': 'Email address is invalid',
    'login.errors.phoneRequired': 'Phone number is required',
    'login.errors.phoneInvalid': 'Phone number is invalid',
    'login.errors.passwordRequired': 'Password is required',
    'login.errors.passwordMinLength': 'Password must be at least 6 characters',
    'login.errors.loginFailed': 'Login failed. Please check your credentials.',
    'login.errors.twoFactorInvalid': 'The code must contain exactly 6 digits',
    'login.errors.twoFactorTokenMissing': 'Verification token missing',
    'login.errors.twoFactorFailed': 'Invalid 2FA code. Please try again.',
    'login.twoFactorTitle': 'Two-Factor Authentication',
    'login.twoFactorDescription': 'Enter the 6-digit code generated by your authentication app',
    'login.twoFactorCodeLabel': 'Verification code',
    'login.twoFactorCodePlaceholder': '000000',
    'login.verifyButton': 'Verify',
    'login.verifying': 'Verifying...',
    'login.backToLogin': 'Back to login',
    'login.motivational.line1': 'Modernize your crops, automate',
    'login.motivational.line2': 'your tasks and improve your harvests',
    'login.motivational.line3': 'Connected and automated agriculture is the future',
    'signup.title': 'SIGN UP',
    'signup.lastNameLabel': 'Last Name',
    'signup.lastNamePlaceholder': 'Last Name',
    'signup.firstNameLabel': 'First Name',
    'signup.firstNamePlaceholder': 'First Name',
    'signup.emailLabel': 'Email address',
    'signup.emailPlaceholder': 'Email address',
    'signup.phoneLabel': 'Phone number (Whatsapp)',
    'signup.phonePlaceholder': 'Phone number (Whatsapp)',
    'signup.passwordLabel': 'Password',
    'signup.passwordPlaceholder': 'Password',
    'signup.confirmPasswordLabel': 'Confirm password',
    'signup.confirmPasswordPlaceholder': 'Confirm password',
    'signup.submitButton': 'Sign Up',
    'signup.submitting': 'Signing up...',
    'signup.hasAccount': 'You already have an account?',
    'signup.loginLink': 'Log in.',
    'signup.backToHome': 'Back to home',
    'signup.showPassword': 'Show password',
    'signup.hidePassword': 'Hide password',
    'signup.passwordRequirements': 'Password requirements:',
    'signup.errors.lastNameRequired': 'Last name is required',
    'signup.errors.firstNameRequired': 'First name is required',
    'signup.errors.emailRequired': 'Email address is required',
    'signup.errors.emailInvalid': 'Email address is invalid',
    'signup.errors.emailExists': 'This email is already in use',
    'signup.errors.phoneRequired': 'Phone number is required',
    'signup.errors.phoneInvalid': 'Phone number is invalid',
    'signup.errors.phoneExists': 'This phone number is already in use',
    'signup.errors.passwordRequired': 'Password is required',
    'signup.errors.passwordMinLength': 'Password must be at least 8 characters',
    'signup.errors.passwordUppercase': 'Password must contain at least one uppercase letter',
    'signup.errors.passwordLowercase': 'Password must contain at least one lowercase letter',
    'signup.errors.passwordNumber': 'Password must contain at least one number',
    'signup.errors.passwordSpecial': 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
    'signup.errors.confirmPasswordRequired': 'Password confirmation is required',
    'signup.errors.passwordsMismatch': 'Passwords do not match',
    'signup.errors.signupFailed': 'Sign up failed. Please try again.',
    'notifications.title': 'Notifications',
    'notifications.empty': 'No notifications',
    'notifications.loading': 'Loading...',
    'notifications.noDescription': 'Notification',
    'notifications.sent': 'sent',
    'notifications.noEmail': 'No email notifications',
    'notifications.justNow': 'Just now',
    'notifications.minutesAgo': 'min',
    'notifications.hoursAgo': 'h',
    'notifications.daysAgo': 'd',
    'notifications.delete': 'Delete',
    'hero.heading': 'CamerFarm AI Connects Producers To Their Land Through IoT, Offering Precise Crop Monitoring And Rapid Disease Detection Through Artificial Intelligence To Sustainably Transform Cameroonian Agriculture.',
    'features.automation.title': 'Automation',
    'features.automation.description': 'Manage Your Irrigation, Ventilation And Lighting Effortlessly. Our Autonomous System, Powered By Solar Energy, Ensures That Essential Tasks Are Executed Even In Case Of Power Outage.',
    'features.ai.title': 'Integrated AI',
    'features.ai.description': 'Identify Crop Diseases By Simple Photo And Receive Immediate Treatment Recommendations. Access Personalized Agricultural Advice In French, English And Local Languages.',
    'features.realtime.title': 'Real-Time Monitoring',
    'features.realtime.description': 'Visualize Critical Conditions Of Your Field Remotely: Soil Moisture, Temperature, CO2 And Water Level. Receive Real-Time Alerts To Anticipate Climate Risks And Anomalies.',
    'benefits.yield.title': 'Increase product yield',
    'benefits.energy.title': 'Reduce energy consumption per acre',
    'benefits.water.title': 'Save water consumption',
    'intelligent.title': 'Climate-smart, data-driven agriculture',
    'intelligent.description': 'By using real-time data as an additional boost, farmers and horticulturists merge the physical world with digital tools to tackle daily problems and improve their productivity.',
    'cta.title': 'Ready To Transform Your Agriculture?',
    'cta.subtitle': 'Join The Hundreds Of Farmers Who Are Increasing Their Yields With CamerFarm AI',
    'cta.button': 'Contact Us',
    'footer.description': 'The intelligent platform for modern and sustainable Cameroonian agriculture.',
    'footer.resources.title': 'Resources',
    'footer.resources.documentation': 'Documentation',
    'footer.resources.guide': 'User Guide',
    'footer.legal.title': 'Legal',
    'footer.legal.privacy': 'Privacy',
    'footer.legal.terms': 'Terms',
    'footer.legal.cookies': 'Cookies',
    'footer.social.title': 'Follow Us',
    'footer.copyright': '© 2025 CamerFarm AI. All Rights Reserved.',
    'floatingButton.ariaLabel': 'Contact support',
    'plantations.loading': 'Loading plantations...',
    'plantations.list.title': 'My Plantations',
    'plantations.create': 'Create plantation',
    'plantations.area': 'Area',
    'plantations.viewDetails': 'View details',
    'plantations.empty.title': 'OOPS,',
    'plantations.empty.message': 'It seems you haven\'t created a plantation.',
    'plantations.empty.action': 'Create one',
    'plantations.empty.icon': 'No plantation',
    'plantations.slogan.line1': 'Modernize your crops, automate your tasks and improve your harvests',
    'plantations.slogan.line2': 'Connected and automated agriculture is the future',
    'plantations.createModal.title': 'Enter field information',
    'plantations.createModal.nameLabel': 'Name of your plantation',
    'plantations.createModal.namePlaceholder': 'Enter the name of your plantation',
    'plantations.createModal.areaLabel': 'Plantation area',
    'plantations.createModal.areaPlaceholder': 'Enter the area of your plantation',
    'plantations.createModal.areaUnit.m2': 'm²',
    'plantations.createModal.areaUnit.ha': 'ha',
    'plantations.createModal.areaUnit.acre': 'acre',
    'plantations.createModal.areaUnit.km2': 'km²',
    'plantations.createModal.locationLabel': 'Location',
    'plantations.createModal.locationPlaceholder': 'Enter the zone of your plantation',
    'plantations.createModal.next': 'Next',
    'plantations.createModal.cancel': 'Cancel',
    'plantations.createModal.submitting': 'Creating...',
    'plantations.createModal.cropTypeLabel': 'Crop type',
    'plantations.createModal.cropTypePlaceholder': 'e.g. Cassava, cocoa...',
    'plantations.createModal.latitudeLabel': 'Latitude',
    'plantations.createModal.latitudePlaceholder': 'Enter latitude',
    'plantations.createModal.longitudeLabel': 'Longitude',
    'plantations.createModal.longitudePlaceholder': 'Enter longitude',
    'plantations.createModal.errors.nameRequired': 'Plantation name is required',
    'plantations.createModal.errors.latitudeInvalid': 'Latitude is invalid',
    'plantations.createModal.errors.longitudeInvalid': 'Longitude is invalid',
    'plantations.createModal.errors.coordinatesRequiredTogether': 'Latitude and longitude must be provided together',
    'plantations.createModal.errors.areaRequired': 'Area is required',
    'plantations.createModal.errors.areaInvalid': 'Area must be a valid number',
    'plantations.createModal.errors.locationRequired': 'Location is required',
    'plantations.cropType': 'Crop',
    'plantations.errors.fetchFailed': 'Unable to load plantations. Displayed data may be outdated.',
    'plantations.detail.title': 'Plantation Details',
    'plantations.detail.loading': 'Loading plantation...',
    'plantations.detail.backToList': 'Back to list',
    'plantations.detail.createdAt': 'Created on',
    'plantations.detail.monitoring': 'Monitoring',
    'plantations.detail.graphs': 'Graphs',
    'plantations.detail.sensors.title': 'Sensors',
    'plantations.detail.sensors.active': 'Active',
    'plantations.detail.sensors.inactive': 'Inactive',
    'plantations.detail.sensors.temperature': 'Temperature',
    'plantations.detail.sensors.humidity': 'Humidity',
    'plantations.detail.sensors.soilMoisture': 'Soil Moisture',
    'plantations.detail.sensors.co2Level': 'CO₂ Level',
    'plantations.detail.sensors.waterLevel': 'Water Level',
    'plantations.detail.sensors.luminosity': 'Luminosity',
    'plantations.detail.sensors.lastUpdate': 'Last update',
    'plantations.detail.sensors.noSensors': 'No sensors installed',
    'plantations.detail.sensors.noData': 'No data',
    'plantations.detail.sensors.noSensorsMessage': 'This plantation does not have any sensors installed yet. Install sensors to access monitoring.',
    'plantations.detail.errors.invalidId': 'Invalid plantation ID',
    'plantations.detail.errors.fetchFailed': 'Unable to load plantation details.',
    'plantations.detail.errors.notFound': 'Plantation not found',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Welcome to your CamerFarm AI dashboard.',
    'graphs.welcome.description': 'View real-time data from your sensors to better understand the state of your plots and optimize your interventions.',
    'graphs.welcome.hint': 'Use the buttons below to filter sensor types (Humidity, temperature, CO₂, etc.)',
    'graphs.sensors.humidity': 'Humidity Sensor',
    'graphs.sensors.temperature': 'Ambient Temperature Sensor',
    'graphs.sensors.soilMoisture': 'Soil Moisture Sensor',
    'graphs.sensors.luminosity': 'Luminosity Sensor',
    'graphs.sensors.co2': 'CO2 Sensor',
    'graphs.sensors.waterLevel': 'Water Level',
    'graphs.dateFrom': 'From',
    'graphs.dateTo': 'To',
    'graphs.applyFilter': 'Apply Filter',
    'graphs.resetFilter': 'Reset',
    'graphs.chart.title': 'Evolution',
    'graphs.loading': 'Loading sensor data...',
    'graphs.empty': 'No sensor data available for this period.',
    'monitoring.sensors.title': 'Real-time sensor values',
    'monitoring.sensors.temperature': 'Temperature',
    'monitoring.sensors.soilHumidity': 'Soil Humidity',
    'monitoring.sensors.co2': 'CO2 Rate',
    'monitoring.sensors.luminosity': 'Luminosity',
    'monitoring.sensors.waterLevel': 'Water Level',
    'monitoring.thresholds.title': 'Sensor thresholds',
    'monitoring.thresholds.subtitle': 'Adjust thresholds to receive relevant alerts for your sensors.',
    'monitoring.thresholds.min': 'Min threshold',
    'monitoring.thresholds.max': 'Max threshold',
    'monitoring.thresholds.edit': 'Edit thresholds',
    'monitoring.thresholds.save': 'Save',
    'monitoring.thresholds.saving': 'Saving...',
    'monitoring.thresholds.cancel': 'Cancel',
    'monitoring.thresholds.editingFor': 'Editing thresholds for',
    'monitoring.thresholds.editingSubtitle': 'Set minimum and maximum values to trigger alerts',
    'monitoring.thresholds.invalidData': 'Invalid threshold data',
    'monitoring.thresholds.maxMustBeGreater': 'Max threshold must be greater than min threshold',
    'monitoring.thresholds.updateSuccess': 'Thresholds updated successfully',
    'monitoring.thresholds.updateError': 'Error while updating thresholds',
    'monitoring.thresholds.notFound': 'Sensor or plantation not found',
    'monitoring.thresholds.forbidden': 'You are not allowed to edit these thresholds',
    'monitoring.thresholds.unauthorized': 'You must be logged in to edit thresholds',
    'monitoring.updated': 'Updated',
    'monitoring.status.good': 'Good',
    'monitoring.status.optimal': 'Optimal',
    'monitoring.status.moderate': 'Moderate',
    'monitoring.status.low': 'Low',
    'monitoring.status.high': 'High',
    'monitoring.status.critical': 'Critical',
    'monitoring.status.bright': 'Bright',
    'monitoring.status.normal': 'Normal',
    'monitoring.status.dim': 'Dim',
    'monitoring.equipment.title': 'Equipment and accessories control',
    'monitoring.equipment.irrigationPump': 'Irrigation Pump',
    'monitoring.equipment.fans': 'Fans',
    'monitoring.equipment.lighting': 'Lighting',
    'monitoring.equipment.offline': 'Offline',
    'monitoring.equipment.noActuators': 'No actuators are currently installed in this field.',
    'monitoring.equipment.updateError': 'Error updating equipment. Please try again.',
    'monitoring.mode.automatic': 'Automatic',
    'monitoring.mode.manual': 'Manual',
    'monitoring.mode.automaticInfo': 'Automatic mode enabled: Equipment is controlled automatically based on sensor data.',
    'monitoring.mode.updateError': 'Error updating mode. Please try again.',
    'monitoring.noSensors': 'No sensors are currently assigned to this plantation. Please assign sensors to view monitoring data.',
    'monitoring.help.title': 'How do gauge colors work?',
    'monitoring.help.intro': 'Gauge colors adapt automatically based on the thresholds you have configured (minThreshold and maxThreshold). Each gauge uses a color system to quickly indicate the status of your sensors.',
    'monitoring.help.temperature.title': '🌡️ Temperature (0-50°C)',
    'monitoring.help.temperature.description': 'The temperature gauge displays green around your minimum threshold (ideal temperature), then progressively transitions to yellow and orange between thresholds, and becomes red above the maximum threshold (danger).',
    'monitoring.help.soilHumidity.title': '💧 Soil Humidity (0-100%)',
    'monitoring.help.soilHumidity.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Below the min threshold or above the max threshold, the color changes to orange then red to indicate a critical level.',
    'monitoring.help.co2.title': '🌬️ CO2 Rate (0-2500 ppm)',
    'monitoring.help.co2.description': 'Green indicates a good CO2 level (below the min threshold). The color transitions to yellow then orange between thresholds, and becomes red above the maximum threshold (dangerous level).',
    'monitoring.help.luminosity.title': '☀️ Luminosity (0-100000 lux)',
    'monitoring.help.luminosity.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Outside this range, the color becomes yellow (warning) then red (extreme saturation or darkness).',
    'monitoring.help.waterLevel.title': '💧 Water Level (0-100%)',
    'monitoring.help.waterLevel.description': 'Red indicates a critical level (below the min threshold). Above the minimum threshold, the color progressively changes to orange, then green to indicate a sufficient level.',
    'monitoring.help.zones.optimal': 'Optimal zone',
    'monitoring.help.zones.warning': 'Warning zone',
    'monitoring.help.zones.danger': 'Danger zone',
    'monitoring.help.close': 'Close',
    'profile.back': 'Back',
    'profile.pageLabel': 'User profile',
    'profile.welcome': 'Welcome, {name}',
    'profile.loading': 'Loading profile...',
    'profile.loadingHint': 'If loading takes too long, check the console for errors.',
    'profile.changePhoto': 'Change',
    'profile.noPhone': 'No phone',
    'profile.roleLabel': 'Role',
    'profile.editButton': 'Edit',
    'profile.saveButton': 'Save',
    'profile.saving': 'Saving...',
    'profile.cancelButton': 'Cancel',
    'profile.firstNameLabel': 'First Name',
    'profile.firstNamePlaceholder': 'Your first name',
    'profile.lastNameLabel': 'Last Name',
    'profile.lastNamePlaceholder': 'Your last name',
    'profile.languageLabel': 'Language',
    'profile.emailLabel': 'My email address',
    'profile.noEmail': 'No email address',
    'profile.notConfigured': 'Not configured',
    'profile.addEmail': 'Add email address',
    'profile.roleHint': 'Role cannot be modified',
    'profile.phoneLabel': 'Phone',
    'profile.phonePlaceholder': 'Your phone number',
    'profile.idLabel': 'User ID',
    'profile.idHint': 'Unique identifier',
    'profile.twoFactor.title': 'Two-Factor Authentication',
    'profile.twoFactor.description': 'Secure your account with an additional verification code',
    'profile.twoFactor.enabled': 'Enabled',
    'profile.twoFactor.disabled': 'Disabled',
    'profile.twoFactor.enableButton': 'Enable 2FA',
    'profile.twoFactor.disableButton': 'Disable 2FA',
    'profile.twoFactor.setupTitle': '2FA Setup',
    'profile.twoFactor.setupDescription': 'Scan the QR code with your authentication app (Google Authenticator, Authy, etc.)',
    'profile.twoFactor.scanQRCode': 'Scan this QR code',
    'profile.twoFactor.enterCode': 'Enter verification code',
    'profile.twoFactor.codeLabel': 'Verification code',
    'profile.twoFactor.codePlaceholder': '000000',
    'profile.twoFactor.activateButton': 'Activate',
    'profile.twoFactor.deactivateButton': 'Disable',
    'profile.twoFactor.disableTitle': 'Disable 2FA',
    'profile.twoFactor.disableDescription': 'Enter your 2FA code to confirm deactivation',
    'profile.twoFactor.success': '2FA enabled successfully',
    'profile.twoFactor.error': 'Error enabling 2FA',
    'profile.errors.firstNameRequired': 'First name is required',
    'profile.errors.lastNameRequired': 'Last name is required',
    'profile.errors.phoneRequired': 'Phone number is required',
    'profile.errors.phoneInvalid': 'Phone number is invalid',
    'profile.errors.invalidImage': 'Please select a valid image',
    'profile.errors.imageSizeExceeded': 'Image must not exceed 5MB',
    'profile.errors.uploadFailed': 'Error uploading photo',
    'profile.errors.updateFailed': 'Error updating profile',
    'profile.role.farmer': 'Farmer',
    'profile.role.technician': 'Technician',
    'profile.role.admin': 'Administrator',
    'admin.fakers.title': 'Test Data Generator',
    'admin.fakers.subtitle': 'Generate fake data to test the application',
    'admin.fakers.test.title': 'Test Fakers',
    'admin.fakers.test.description': 'Test all fakers without saving them to the database',
    'admin.fakers.test.button': 'Test Fakers',
    'admin.fakers.test.testing': 'Testing...',
    'admin.fakers.testError': 'Error testing fakers',
    'admin.fakers.generate.title': 'Generate Fakers',
    'admin.fakers.generate.description': 'Generate and save fake data to the database',
    'admin.fakers.generate.countLabel': 'Number of entities',
    'admin.fakers.generate.countPlaceholder': '100',
    'admin.fakers.generate.scenarioLabel': 'Scenario',
    'admin.fakers.generate.entityLabel': 'Specific entity',
    'admin.fakers.generate.entityOptional': 'optional',
    'admin.fakers.generate.entityAll': 'All entities',
    'admin.fakers.generate.button': 'Generate',
    'admin.fakers.generate.generating': 'Generating...',
    'admin.fakers.generateError': 'Error generating fakers',
    'admin.fakers.errors.countInvalid': 'Count must be greater than 0',
    'admin.fakers.errors.scenarioRequired': 'Please select a scenario',
    'admin.fakers.results.total': 'Total',
    'admin.fakers.results.users': 'Users',
    'admin.fakers.results.plantations': 'Plantations',
    'admin.fakers.results.sensors': 'Sensors',
    'admin.fakers.results.sensorReadings': 'Sensor readings',
    'admin.fakers.results.actuators': 'Actuators',
    'admin.fakers.results.events': 'Events',
    'admin.fakers.results.notifications': 'Notifications',
    'admin.fakers.scenarios.normal': 'Normal - Values within normal ranges',
    'admin.fakers.scenarios.edge': 'Edge Cases - Values at limits',
    'admin.fakers.scenarios.alert': 'Alerts - Values exceeding thresholds',
    'admin.fakers.scenarios.seasonal': 'Seasonal - Seasonal data',
    'admin.fakers.scenarios.mixed': 'Mixed - Mix of all scenarios',
    'admin.fakers.scenarios.normal.description': 'Generates values within normal ranges for all sensors. Ideal for testing standard application behavior.',
    'admin.fakers.scenarios.edge.description': 'Generates values at min/max limits. Useful for testing edge cases and validations.',
    'admin.fakers.scenarios.alert.description': 'Generates values exceeding thresholds to trigger alerts. Perfect for testing the notification system.',
    'admin.fakers.scenarios.seasonal.description': 'Generates data for the 4 seasonal situations in Cameroon: dry season, rainy season, harmattan, and transition.',
    'admin.fakers.scenarios.mixed.description': 'Mix of all scenarios with balanced weights. Recommended for realistic and varied data.',
    'admin.fakers.scenarios.weights.normal': 'Normal weight',
    'admin.fakers.scenarios.weights.edge': 'Edge weight',
    'admin.fakers.scenarios.weights.alert': 'Alert weight',
    'admin.fakers.scenarios.weights.seasonal': 'Seasonal weight',
    'admin.fakers.info.title': 'Available Scenarios',
    'admin.fakers.info.description': 'List of available generation scenarios',
    'admin.fakers.distribution.title': 'Default Distribution',
    'admin.fakers.distribution.description': 'Entity distribution for 1000 generated fakers',
    'admin.fakers.distribution.percentage': 'Percentage',
    'admin.fakers.entities.title': 'Supported Entity Types',
    'admin.fakers.entities.description': 'List of entity types that can be generated',
    'admin.fakers.entities.user': 'Users with roles (farmer, technician, admin)',
    'admin.fakers.entities.plantation': 'Plantations with Cameroonian crops and geographic coordinates',
    'admin.fakers.entities.sensor': 'Sensors (temperature, soil moisture, CO2, water level, luminosity)',
    'admin.fakers.entities.sensorReading': 'Sensor readings with consistent temporal variations',
    'admin.fakers.entities.actuator': 'Actuators (pump, fan, sprinkler, valve, heater, light)',
    'admin.fakers.entities.event': 'Events (threshold exceeded, actuator activated/deactivated, mode changed)',
    'admin.fakers.entities.notification': 'Notifications (web, email, WhatsApp) with statuses',
    'admin.fakers.seasonal.title': 'Seasonal Situations',
    'admin.fakers.seasonal.description': 'Sensor values vary according to Cameroonian seasons',
    'admin.fakers.seasonal.dry_season': 'Dry Season',
    'admin.fakers.seasonal.rainy_season': 'Rainy Season',
    'admin.fakers.seasonal.harmattan': 'Harmattan',
    'admin.fakers.seasonal.transition': 'Transition',
    'admin.fakers.results.percentage': '%',
    'admin.fakers.results.barChart': 'Visual distribution',
    'chatbox.title': 'CamerFarm AI Assistant',
    'chatbox.description': 'Ask your questions about agriculture and receive personalized advice in real time.',
    'chatbox.emptyState.title': 'Welcome to the AI Assistant',
    'chatbox.emptyState.description': 'Start a conversation by asking a question or selecting a suggestion below.',
    'chatbox.suggestionsHeader': 'Suggested questions',
    'chatbox.suggestedQuestions.question1': 'How can I improve my crop yield?',
    'chatbox.suggestedQuestions.question2': 'What are the best times to water?',
    'chatbox.suggestedQuestions.question3': 'How to identify plant diseases?',
    'chatbox.suggestedQuestions.question4': 'What sensors should I install for my crop type?',
    'chatbox.aiResponse.prefix': 'Answer to your question',
    'chatbox.aiResponse.intro': 'Here is a detailed answer to your question. The AI assistant analyzes your data and provides you with personalized recommendations based on agricultural best practices.',
    'chatbox.inputLabel': 'Your question',
    'chatbox.inputPlaceholder': 'Type your question here... (Ex: How to optimize irrigation?)',
    'chatbox.sendButton': 'Send',
    'chatbox.sending': 'Sending...',
    'chatbox.inputHint': 'Press Enter to send, Shift+Enter for a new line',
    'chatbox.characters': 'characters',
    'chatbox.characterCount': 'character',
    'language.fr': 'Français',
    'language.en': 'English',
    'language.ff': 'Fulfulde',
    'language.ew': 'Ewondo',
  },
  ff: {
    'nav.home': 'Fuɗɗo',
    'nav.support': 'Wallitorde',
    'nav.monitoring': 'Jokkondiral',
    'nav.graphs': 'Giraafuuji',
    'nav.plantations': 'Nguurndam',
    'nav.ai': 'AI',
    'auth.login': 'Seŋo',
    'auth.signup': 'Winndito',
    'auth.logout': 'Yaltu',
    'auth.profile': 'Jokkondiral kuutoro',
    'login.title': 'SEŊO',
    'login.emailLabel': 'Nder email',
    'login.emailPlaceholder': 'Nder email',
    'login.phoneLabel': 'Nder tel',
    'login.phonePlaceholder': 'Naatu nder tel maa',
    'login.passwordLabel': 'Finnde',
    'login.passwordPlaceholder': 'Finnde',
    'login.submitButton': 'Seŋo',
    'login.submitting': 'Seŋo...',
    'login.forgotPassword': 'Aɗa yejjii finnde?',
    'login.noAccount': 'Aɗa alaa konte?',
    'login.signupLink': 'Winndito.',
    'login.backToHome': 'Rutto fuɗɗo',
    'login.showPassword': 'Hollu finnde',
    'login.hidePassword': 'Suuɗu finnde',
    'login.errors.emailRequired': 'Nder email ina tawaa',
    'login.errors.emailInvalid': 'Nder email fotaani',
    'login.errors.phoneRequired': 'Nder tel ina tawaa',
    'login.errors.phoneInvalid': 'Nder tel fotaani',
    'login.errors.passwordRequired': 'Finnde ina tawaa',
    'login.errors.passwordMinLength': 'Finnde ina tawaa koɗɗe 6 ɓuri',
    'login.errors.loginFailed': 'Seŋo Ɓaawtaani. Ɗaɓɓu keɓe maɓɓe.',
    'login.errors.twoFactorInvalid': 'Koode ina tawaa limoore 6 goonga',
    'login.errors.twoFactorTokenMissing': 'Token jokkondirɗe ina ɓadii',
    'login.errors.twoFactorFailed': 'Koode 2FA fotaani. Ɗaɓɓu ekkit.',
    'login.twoFactorTitle': 'Jokkondirgol ɗiɗɓe',
    'login.twoFactorDescription': 'Naatu koode limoore 6 ɗe jokkondirɗe app maa',
    'login.twoFactorCodeLabel': 'Koode jokkondirgol',
    'login.twoFactorCodePlaceholder': '000000',
    'login.verifyButton': 'Jokkondir',
    'login.verifying': 'Jokkondirgol...',
    'login.backToLogin': 'Rutto seŋo',
    'login.motivational.line1': 'Ɓeyduɗe nguurndam maɓɓe, wattinde',
    'login.motivational.line2': 'koɗɗe maɓɓe e ɓeyduɗe alaaɗe maɓɓe',
    'login.motivational.line3': 'Ngaynaaɗe jokkondirɗam e wattinɗam ko koɗɗe jamaa',
    'signup.title': 'WINNDITO',
    'signup.lastNameLabel': 'Innde',
    'signup.lastNamePlaceholder': 'Innde',
    'signup.firstNameLabel': 'Innde fuɗɗo',
    'signup.firstNamePlaceholder': 'Innde fuɗɗo',
    'signup.emailLabel': 'Nder email',
    'signup.emailPlaceholder': 'Nder email',
    'signup.phoneLabel': 'Nder tel (Whatsapp)',
    'signup.phonePlaceholder': 'Nder tel (Whatsapp)',
    'signup.passwordLabel': 'Finnde',
    'signup.passwordPlaceholder': 'Finnde',
    'signup.confirmPasswordLabel': 'Fedduɗe finnde',
    'signup.confirmPasswordPlaceholder': 'Fedduɗe finnde',
    'signup.submitButton': 'Winndito',
    'signup.submitting': 'Winndito...',
    'signup.hasAccount': 'Aɗa heɓii konte?',
    'signup.loginLink': 'Seŋo.',
    'signup.backToHome': 'Rutto fuɗɗo',
    'signup.showPassword': 'Hollu finnde',
    'signup.hidePassword': 'Suuɗu finnde',
    'signup.passwordRequirements': 'Cifooji finnde:',
    'signup.errors.lastNameRequired': 'Innde ina tawaa',
    'signup.errors.firstNameRequired': 'Innde fuɗɗo ina tawaa',
    'signup.errors.emailRequired': 'Nder email ina tawaa',
    'signup.errors.emailInvalid': 'Nder email fotaani',
    'signup.errors.emailExists': 'Nder email ngol no njahii no',
    'signup.errors.phoneRequired': 'Nder tel ina tawaa',
    'signup.errors.phoneInvalid': 'Nder tel fotaani',
    'signup.errors.phoneExists': 'Nder tel ngol no njahii no',
    'signup.errors.passwordRequired': 'Finnde ina tawaa',
    'signup.errors.passwordMinLength': 'Finnde ina tawaa koɗɗe 8 ɓuri',
    'signup.errors.passwordUppercase': 'Finnde ina tawaa harfe mawnude gooto ɓuri',
    'signup.errors.passwordLowercase': 'Finnde ina tawaa harfe ɓelɗe gooto ɓuri',
    'signup.errors.passwordNumber': 'Finnde ina tawaa limoore gooto ɓuri',
    'signup.errors.passwordSpecial': 'Finnde ina tawaa maande gooto ɓuri (!@#$%^&*(),.?":{}|<>)',
    'signup.errors.confirmPasswordRequired': 'Fedduɗe finnde ina tawaa',
    'signup.errors.passwordsMismatch': 'Finnde ɗe njaatondiraani',
    'signup.errors.signupFailed': 'Winndito Ɓaawtaani. Ɗaɓɓu yeewto.',
    'notifications.title': 'Tindinɗe',
    'notifications.empty': 'Alaa tindinɗe',
    'notifications.loading': 'Nawtude...',
    'notifications.noDescription': 'Tindinɗe',
    'notifications.sent': 'nelduɗe',
    'notifications.noEmail': 'Alaa tindinɗe email',
    'notifications.justNow': 'Haŋki',
    'notifications.minutesAgo': 'min',
    'notifications.hoursAgo': 'h',
    'notifications.daysAgo': 'ñal',
    'notifications.delete': 'Momtu',
    'hero.heading': 'CamerFarm AI Haɓɓanaa Ngaynaaɓe e Leyɗe Maɓɓe Ngam IoT, Hokki Jokkondiral Goonga e Yiytude Baawɗe Caggal ɓaawo Ngam Aamde Ngaari Ngam Waylude Ngaynaaɗe Kameruun.',
    'features.automation.title': 'Wattinde',
    'features.automation.description': 'Toppu Irrigasion, Ventilation e Ndaariɗe Hakkunde. Siistem Amen Eɗen, Jokkondirɗam e Njeewi Njeewi, Feddanaa Ko Tawaa Koɗɗe Mawɗe Waɗataa Hatta Si Njeewi Njeewi Ɓaawtaa.',
    'features.ai.title': 'AI Naatnɗam',
    'features.ai.description': 'Yiytu Baawɗe Nguurndam Ngam Foto Wootere e Heɓu Tontinɗe Caggal ɓaawo. Aadaa Tontinɗe Ngaynaaɗe Ngam Ko Aɗa Waawaa e Faransinkoore, Inngilinkoore e Koɗe Leyɗe.',
    'features.realtime.title': 'Jokkondiral Waktu Goonga',
    'features.realtime.description': 'Yiylaade Koɗɗe Mawɗe Leyɗe Maɓɓe e Dow: Ɓuɓɓe Leyɗe, Temperatuur, CO2 e Nder Leyɗe. Heɓu Tindinɗe Waktu Goonga Ngam Ɓaŋnguɗe Kalaama e Koɗɗe Ɓaawɗe.',
    'benefits.yield.title': 'Ɓeyduɗe Alaaɗe',
    'benefits.energy.title': 'Ɓaŋnguɗe Njeewi Njeewi Ngam Acre',
    'benefits.water.title': 'Dannduɗe Nder Leyɗe',
    'intelligent.title': 'Ngaynaaɗe Ngaari Ngam Kalaama, Jokkondirɗam e Keɓe',
    'intelligent.description': 'Ngam Kuutoraade Keɓe Waktu Goonga Wano Ɓeydugol, Ngaynaaɓe e Ngaynaaɓe Leyɗe Haɓɓanaa Adunaawal e Kuɓe Ndeefuuji Ngam Tontude Koɗɗe Jooni e Ɓeyduɗe Ɓeydugol Maɓɓe.',
    'cta.title': 'Aɗa Heɓii Ngam Waylude Ngaynaaɗe Maɓɓe?',
    'cta.subtitle': 'Naatuɗe e Tatiɓe Ngaynaaɓe Ɓe Ɓeydii Ɓeydugol Maɓɓe e CamerFarm AI',
    'cta.button': 'Jokkondir Amen',
    'footer.description': 'Platform Ngaari Ngam Ngaynaaɗe Kameruun Hesɗi e Dannduɗe.',
    'footer.resources.title': 'Alaale',
    'footer.resources.documentation': 'Winnditorde',
    'footer.resources.guide': 'Jangirde Kuutoraade',
    'footer.legal.title': 'Laawol',
    'footer.legal.privacy': 'Suuduɓe',
    'footer.legal.terms': 'Koɗɗe',
    'footer.legal.cookies': 'Cookies',
    'footer.social.title': 'Jokkondir Amen',
    'footer.copyright': '© 2025 CamerFarm AI. Koɗɗe Fof Ɓe Jeyaa.',
    'floatingButton.ariaLabel': 'Jokkondir wallitorde',
    'plantations.loading': 'Jokkondir nguurndam...',
    'plantations.list.title': 'Nguurndam Am',
    'plantations.create': 'Waɗu nguurndam',
    'plantations.area': 'Leyɗe',
    'plantations.viewDetails': 'Yiylaade keɓe',
    'plantations.empty.title': 'ƁAAWO,',
    'plantations.empty.message': 'Ɗaɓɓu aɗa waɗaani nguurndam.',
    'plantations.empty.action': 'Waɗuɗe',
    'plantations.empty.icon': 'Alaa nguurndam',
    'plantations.slogan.line1': 'Ɓeyduɗe nguurndam maɓɓe, wattinde koɗɗe maɓɓe e ɓeyduɗe alaaɗe maɓɓe',
    'plantations.slogan.line2': 'Ngaynaaɗe jokkondirɗam e wattinɗam ko koɗɗe jamaa',
    'plantations.createModal.title': 'Naatu keɓe leyɗe',
    'plantations.createModal.nameLabel': 'Innde nguurndam maa',
    'plantations.createModal.namePlaceholder': 'Naatu innde nguurndam maa',
    'plantations.createModal.areaLabel': 'Leyɗe nguurndam',
    'plantations.createModal.areaPlaceholder': 'Naatu leyɗe nguurndam maa',
    'plantations.createModal.areaUnit.m2': 'm²',
    'plantations.createModal.areaUnit.ha': 'ha',
    'plantations.createModal.areaUnit.acre': 'acre',
    'plantations.createModal.areaUnit.km2': 'km²',
    'plantations.createModal.locationLabel': 'Nokkuure',
    'plantations.createModal.locationPlaceholder': 'Naatu nokkuure nguurndam maa',
    'plantations.createModal.next': 'Jokku',
    'plantations.createModal.cancel': 'Dirtu',
    'plantations.createModal.submitting': 'Waɗaade...',
    'plantations.createModal.cropTypeLabel': 'Fannu ngesa',
    'plantations.createModal.cropTypePlaceholder': 'Eduu: Maniok, kakao...',
    'plantations.createModal.latitudeLabel': 'Latitude',
    'plantations.createModal.latitudePlaceholder': 'Naatu latitude',
    'plantations.createModal.longitudeLabel': 'Longitude',
    'plantations.createModal.longitudePlaceholder': 'Naatu longitude',
    'plantations.createModal.errors.nameRequired': 'Innde nguurndam ina tawaa',
    'plantations.createModal.errors.areaRequired': 'Leyɗe ina tawaa',
    'plantations.createModal.errors.areaInvalid': 'Leyɗe ina tawaa limoore goonga',
    'plantations.createModal.errors.locationRequired': 'Nokkuure ina tawaa',
    'plantations.createModal.errors.latitudeInvalid': 'Latitude fotaani',
    'plantations.createModal.errors.longitudeInvalid': 'Longitude fotaani',
    'plantations.createModal.errors.coordinatesRequiredTogether': 'Latitude e longitude ina tawaa e nder goɗɗe',
    'plantations.cropType': 'Fannu ngesa',
    'plantations.errors.fetchFailed': 'Waawaa nattude nguurndam. Keɓe njiyataa waawaa heddude.',
    'plantations.detail.title': 'Keɓe nguurndam',
    'plantations.detail.loading': 'Jokkondir nguurndam...',
    'plantations.detail.backToList': 'Ruttoo e njiylol',
    'plantations.detail.createdAt': 'Waɗaaɗe',
    'plantations.detail.monitoring': 'Jokkondiral',
    'plantations.detail.graphs': 'Jagol',
    'plantations.detail.sensors.title': 'Jokkondirɗe',
    'plantations.detail.sensors.active': 'Jokkondirɗo',
    'plantations.detail.sensors.inactive': 'Alaa jokkondirɗo',
    'plantations.detail.sensors.temperature': 'Temperatuur',
    'plantations.detail.sensors.humidity': 'Ɓuɓɓe',
    'plantations.detail.sensors.soilMoisture': 'Ɓuɓɓe leyɗe',
    'plantations.detail.sensors.co2Level': 'Ndaari CO₂',
    'plantations.detail.sensors.waterLevel': 'Ndaari ndiyam',
    'plantations.detail.sensors.luminosity': 'Ngesa',
    'plantations.detail.sensors.lastUpdate': 'Ndenndol sakkitiingo',
    'plantations.detail.sensors.noSensors': 'Alaa jokkondirɗe nattaaɗe',
    'plantations.detail.sensors.noData': 'Alaa keɓe',
    'plantations.detail.sensors.noSensorsMessage': 'Nguurndam ngal alaa jokkondirɗe nattaaɗe jooni. Natt jokkondirɗe ngam naatde e jokkondiral.',
    'plantations.detail.errors.invalidId': 'ID nguurndam alaa goonga',
    'plantations.detail.errors.fetchFailed': 'Waawaa nattude keɓe nguurndam.',
    'plantations.detail.errors.notFound': 'Nguurndam njiyataa',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Aɗa naatii e jokkondiral maa CamerFarm AI.',
    'graphs.welcome.description': 'Yiylaade keɓe waktu goonga e jokkondirɗe maɓɓe ngam ɓeyduɗe faamugol nokkuure maɓɓe e ɓeyduɗe tontinɗe maɓɓe.',
    'graphs.welcome.hint': 'Kuutoraade kuuɗe ɗoo les ngam ɓaŋnguɗe nokkuure jokkondirɗe (Ɓuɓɓe, temperatuur, CO₂, e koɗɗe goɗɗe)',
    'graphs.sensors.humidity': 'Jokkondiral Ɓuɓɓe',
    'graphs.sensors.temperature': 'Jokkondiral Temperatuur',
    'graphs.sensors.soilMoisture': 'Jokkondiral Ɓuɓɓe Leyɗe',
    'graphs.sensors.luminosity': 'Jokkondiral Ndaariɗe',
    'graphs.sensors.co2': 'Jokkondiral CO2',
    'graphs.sensors.waterLevel': 'Ndaari ndiyam',
    'graphs.dateFrom': 'Fuɗɗo',
    'graphs.dateTo': 'Gila',
    'graphs.applyFilter': 'Naatu ɓaŋnguɗe',
    'graphs.resetFilter': 'Fuɗɗitin',
    'graphs.chart.title': 'Ɓeydugol',
    'graphs.loading': 'Jokkondir keɓe jokkondirɗe...',
    'graphs.empty': 'Alaa keɓe jokkondirɗe njiyataa ngam nokkuure ngal.',
    'monitoring.sensors.title': 'Keɓe jokkondirɗe waktu goonga',
    'monitoring.sensors.temperature': 'Temperatuur',
    'monitoring.sensors.soilHumidity': 'Ɓuɓɓe Leyɗe',
    'monitoring.sensors.co2': 'Nder CO2',
    'monitoring.sensors.luminosity': 'Ndaariɗe',
    'monitoring.sensors.waterLevel': 'Nder Leyɗe',
    'monitoring.thresholds.title': 'Señoluuji keɓe',
    'monitoring.thresholds.subtitle': 'Waylu señoluuji ngam heɓde tintine ɓurɗe moƴƴude.',
    'monitoring.thresholds.min': 'Señol woɗnde',
    'monitoring.thresholds.max': 'Señol ɓurnde',
    'monitoring.thresholds.edit': 'Waylu señoluuji',
    'monitoring.thresholds.save': 'Danndu',
    'monitoring.thresholds.saving': 'Nana dannda...',
    'monitoring.thresholds.cancel': 'Haaytu',
    'monitoring.thresholds.editingFor': 'Waylude señoluuji ngam',
    'monitoring.thresholds.editingSubtitle': 'Naatu limoore woɗnde e ɓurnde ngam jaltude tintine',
    'monitoring.thresholds.invalidData': 'Keɓe señol heewaani',
    'monitoring.thresholds.maxMustBeGreater': 'Señol ɓurnde wonaa ɗiɗo e jaasi to woɗnde',
    'monitoring.thresholds.updateSuccess': 'Señoluuji danndaama e moƴƴugol',
    'monitoring.thresholds.updateError': 'Juumre e danndude señoluuji',
    'monitoring.thresholds.notFound': 'Keɓe walla leydi njiyataa',
    'monitoring.thresholds.forbidden': 'A alaa yamiroore ngam waylude ɗee señoluuji',
    'monitoring.thresholds.unauthorized': 'A fotaa seŋo ngam waylude señoluuji',
    'monitoring.updated': 'Ɓeyduɗe',
    'monitoring.status.good': 'Moƴƴi',
    'monitoring.status.optimal': 'Ɓurɗo',
    'monitoring.status.moderate': 'Laato',
    'monitoring.status.low': 'Ɓaŋnguɗo',
    'monitoring.status.high': 'Mawnɗo',
    'monitoring.status.critical': 'Mawɗo',
    'monitoring.status.bright': 'Ndaariɗo',
    'monitoring.status.normal': 'Goonga',
    'monitoring.status.dim': 'Suuɗo',
    'monitoring.noSensors': 'Alaa jokkondirɗe nattaaɗe e nguurndam ngal jooni. Ɗaɓɓu natt jokkondirɗe ngam yiylaade keɓe jokkondiral.',
    'monitoring.help.title': 'Hol no nooneeɗe kulooruuji jokkondirɗe?',
    'monitoring.help.intro': 'Kulooruuji jokkondirɗe ɓeydiraa e hoore maɓɓe no fuɗɗiiɗe señoluuji maa (señol woɗnde e señol ɓurnde). Jokkondir kala huutortoo e noone kulooruuji ngam hollude e sahaa nokkuure jokkondirɗe maa.',
    'monitoring.help.temperature.title': '🌡️ Temperatuur (0-50°C)',
    'monitoring.help.temperature.description': 'Jokkondiral temperatuur hollataa wuɗɗo haa ñiiɓɓo señol woɗnde maa (temperatuur moƴƴude), rewo ɓeydiraa e jaasi e ñiiɓɓo hakkunde señoluuji, e naatiraa boɗɗo e dow señol ɓurnde (meɗɗe).',
    'monitoring.help.soilHumidity.title': '💧 Ɓuɓɓe Leyɗe (0-100%)',
    'monitoring.help.soilHumidity.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ley nder señol woɗnde walla e dow señol ɓurnde, kulooru naatiraa ñiiɓɓo rewo boɗɗo ngam hollude nokkuure meɗɗe.',
    'monitoring.help.co2.title': '🌬️ Nder CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'Wuɗɗo hollataa nokkuure CO2 moƴƴude (ley nder señol woɗnde). Kulooru ɓeydiraa e jaasi rewo ñiiɓɓo hakkunde señoluuji, e naatiraa boɗɗo e dow señol ɓurnde (nokkuure meɗɗe).',
    'monitoring.help.luminosity.title': '☀️ Ndaariɗe (0-100000 lux)',
    'monitoring.help.luminosity.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ɗo wadde nokkuure ngal, kulooru naatiraa jaasi (tintine) rewo boɗɗo (ɓeydugol walla ñuulɗe ɓurɗe).',
    'monitoring.help.waterLevel.title': '💧 Nder Leyɗe (0-100%)',
    'monitoring.help.waterLevel.description': 'Boɗɗo hollataa nokkuure meɗɗe (ley nder señol woɗnde). E dow señol woɗnde, kulooru ɓeydiraa e jaasi e ñiiɓɓo, rewo wuɗɗo ngam hollude nokkuure ɓurɗo.',
    'monitoring.help.zones.optimal': 'Nokkuure moƴƴude',
    'monitoring.help.zones.warning': 'Nokkuure tintine',
    'monitoring.help.zones.danger': 'Nokkuure meɗɗe',
    'monitoring.help.close': 'Uddu',
    'monitoring.equipment.title': 'Toppu kuuɗe e kuuɗe',
    'monitoring.equipment.irrigationPump': 'Pompe Irrigasion',
    'monitoring.equipment.fans': 'Ventilateerɗe',
    'monitoring.equipment.lighting': 'Ndaariɗe',
    'monitoring.equipment.offline': 'Alaa jokkondirɗo',
    'monitoring.equipment.noActuators': 'Alaa toppuɗe nattaaɗe e nguurndam ngal jooni.',
    'monitoring.equipment.updateError': 'Firde e huutoreede toppu. Tiiɗno yeewto.',
    'monitoring.mode.automatic': 'Wattinɗam',
    'monitoring.mode.manual': 'Jokkondirɗam',
    'monitoring.mode.automaticInfo': 'Wattinɗam naatnɗam: Kuuɗe ɗe toppataa e wattinɗam ngam keɓe jokkondirɗe.',
    'monitoring.mode.updateError': 'Firde e huutoreede wattinɗam. Tiiɗno yeewto.',
    'profile.back': 'Rutto',
    'profile.pageLabel': 'Jokkondiral kuutoro',
    'profile.welcome': 'Aɗa naatii, {name}',
    'profile.loading': 'Jokkondir jokkondiral...',
    'profile.loadingHint': 'Si jokkondiral ina ɗaɓɓa, ɓaŋngu konsool ngam koɗɗe Ɓaawɗe.',
    'profile.changePhoto': 'Waylu',
    'profile.noPhone': 'Alaa tel',
    'profile.roleLabel': 'Nokkuure',
    'profile.editButton': 'Waylu',
    'profile.saveButton': 'Danndu',
    'profile.saving': 'Danndude...',
    'profile.cancelButton': 'Dirtu',
    'profile.firstNameLabel': 'Innde fuɗɗo',
    'profile.firstNamePlaceholder': 'Innde fuɗɗo maa',
    'profile.lastNameLabel': 'Innde',
    'profile.lastNamePlaceholder': 'Innde maa',
    'profile.languageLabel': 'Ɗemngal',
    'profile.emailLabel': 'Nder email am',
    'profile.noEmail': 'Alaa nder email',
    'profile.notConfigured': 'Njaatondiraani',
    'profile.addEmail': '+ Ɓeydu nder email',
    'profile.roleHint': 'Nokkuure waawaa waylude',
    'profile.phoneLabel': 'Tel',
    'profile.phonePlaceholder': 'Nder tel maa',
    'profile.idLabel': 'ID Kuutoro',
    'profile.idHint': 'Yiytude goonga',
    'profile.twoFactor.title': 'Jokkondirgol ɗiɗɓe',
    'profile.twoFactor.description': 'Wonndu konte maa e koode jokkondirgol ɓeyngol',
    'profile.twoFactor.enabled': 'Waɗɗaama',
    'profile.twoFactor.disabled': 'Ɓaawtaama',
    'profile.twoFactor.enableButton': 'Waɗɗu 2FA',
    'profile.twoFactor.disableButton': 'Ɓaawtu 2FA',
    'profile.twoFactor.setupTitle': 'Waɗɗugol 2FA',
    'profile.twoFactor.setupDescription': 'Naatu QR code e app jokkondirgol maa (Google Authenticator, Authy, etc.)',
    'profile.twoFactor.scanQRCode': 'Naatu QR code ngol',
    'profile.twoFactor.enterCode': 'Naatu koode jokkondirgol',
    'profile.twoFactor.codeLabel': 'Koode jokkondirgol',
    'profile.twoFactor.codePlaceholder': '000000',
    'profile.twoFactor.activateButton': 'Waɗɗu',
    'profile.twoFactor.deactivateButton': 'Ɓaawtu',
    'profile.twoFactor.disableTitle': 'Ɓaawtu 2FA',
    'profile.twoFactor.disableDescription': 'Naatu koode 2FA maa ngam jokkondirgol ɓaawtagol',
    'profile.twoFactor.success': '2FA waɗɗaama e moƴƴere',
    'profile.twoFactor.error': 'Koɗɗe ngam waɗɗugol 2FA',
    'profile.errors.firstNameRequired': 'Innde fuɗɗo ina tawaa',
    'profile.errors.lastNameRequired': 'Innde ina tawaa',
    'profile.errors.phoneRequired': 'Nder tel ina tawaa',
    'profile.errors.phoneInvalid': 'Nder tel fotaani',
    'profile.errors.invalidImage': 'Toro limoore goonga',
    'profile.errors.imageSizeExceeded': 'Limoore ina tawaa 5MB ɓuri',
    'profile.errors.uploadFailed': 'Koɗɗe Ɓaawɗe ngam naatnude foto',
    'profile.errors.updateFailed': 'Koɗɗe Ɓaawɗe ngam ɓeydugol jokkondiral',
    'profile.role.farmer': 'Ngaynaajo',
    'profile.role.technician': 'Kuutowo',
    'profile.role.admin': 'Toppitoowo',
    'admin.fakers.title': 'Keɓe Ɓaawɗe Ngam Ƴeewtagol',
    'admin.fakers.subtitle': 'Ɓeydu keɓe ɓaawɗe ngam Ƴeewtagol baɗɗe',
    'admin.fakers.test.title': 'Ƴeewtu Keɓe Ɓaawɗe',
    'admin.fakers.test.description': 'Ƴeewtu keɓe ɓaawɗe fof nde alaa danndugol ɗe e ɓeydorde',
    'admin.fakers.test.button': 'Ƴeewtu Keɓe Ɓaawɗe',
    'admin.fakers.test.testing': 'Nana Ƴeewta...',
    'admin.fakers.testError': 'Koɗɗe Ɓaawɗe ngam Ƴeewtagol keɓe ɓaawɗe',
    'admin.fakers.generate.title': 'Ɓeydu Keɓe Ɓaawɗe',
    'admin.fakers.generate.description': 'Ɓeydu e danndu keɓe ɓaawɗe e ɓeydorde',
    'admin.fakers.generate.countLabel': 'Limooɗe Keɓe',
    'admin.fakers.generate.countPlaceholder': '100',
    'admin.fakers.generate.scenarioLabel': 'Seenariyo',
    'admin.fakers.generate.entityLabel': 'Keɓe Goonga',
    'admin.fakers.generate.entityOptional': 'waɗɗa',
    'admin.fakers.generate.entityAll': 'Keɓe Fof',
    'admin.fakers.generate.button': 'Ɓeydu',
    'admin.fakers.generate.generating': 'Nana Ɓeyda...',
    'admin.fakers.generateError': 'Koɗɗe Ɓaawɗe ngam Ɓeydugol keɓe ɓaawɗe',
    'admin.fakers.errors.countInvalid': 'Limooɗe ina waɗi mawnude e 0',
    'admin.fakers.errors.scenarioRequired': 'Tiiɗnoo suɓo seenariyo',
    'admin.fakers.results.total': 'Mooftirde',
    'admin.fakers.results.users': 'Kuutorɓe',
    'admin.fakers.results.plantations': 'Ɗiɗɓe',
    'admin.fakers.results.sensors': 'Kuutorɓe Ɓeydorde',
    'admin.fakers.results.sensorReadings': 'Jaangooje Kuutorɓe Ɓeydorde',
    'admin.fakers.results.actuators': 'Kuutorɓe Ɓeydugol',
    'admin.fakers.results.events': 'Ƴeewte',
    'admin.fakers.results.notifications': 'Tintine',
    'admin.fakers.scenarios.normal': 'Jawdi - Limoore e limoore jawdi',
    'admin.fakers.scenarios.edge': 'Ƴeewte Cawɗe - Limoore e cawɗe',
    'admin.fakers.scenarios.alert': 'Tintine - Limoore ɓurɗe e señoluuji',
    'admin.fakers.scenarios.seasonal': 'Wakkati - Keɓe wakkati',
    'admin.fakers.scenarios.mixed': 'Sakkondiral - Sakkondiral fof',
    'admin.fakers.scenarios.normal.description': 'Ɓeyda limoore e limoore jawdi ngam kuutorɓe ɓeydorde fof. Ɗuum waɗi ngam Ƴeewtagol baɗɗe jawdi.',
    'admin.fakers.scenarios.edge.description': 'Ɓeyda limoore e cawɗe min/max. Nafaama ngam Ƴeewtagol Ƴeewte cawɗe e jaɓɓingol.',
    'admin.fakers.scenarios.alert.description': 'Ɓeyda limoore ɓurɗe e señoluuji ngam jaltinaade tintine. Ɗuum ɓurɗi ngam Ƴeewtagol nokkuure tintine.',
    'admin.fakers.scenarios.seasonal.description': 'Ɓeyda keɓe ngam ɗiɗɓe wakkati 4 Kameruun: wakkati ɓiiɓɓe, wakkati ndiyam, harmattan e sakkondiral.',
    'admin.fakers.scenarios.mixed.description': 'Sakkondiral fof seenariyooje e limoore sakkondiral. Ɗuum ɓurɗi ngam keɓe goonga e waylitiiɗe.',
    'admin.fakers.scenarios.weights.normal': 'Limoore jawdi',
    'admin.fakers.scenarios.weights.edge': 'Limoore cawɗe',
    'admin.fakers.scenarios.weights.alert': 'Limoore tintine',
    'admin.fakers.scenarios.weights.seasonal': 'Limoore wakkati',
    'admin.fakers.info.title': 'Seenariyooje Heewɓe',
    'admin.fakers.info.description': 'Doggol seenariyooje Ɓeydugol heewɓe',
    'admin.fakers.distribution.title': 'Sakkondiral Jawdi',
    'admin.fakers.distribution.description': 'Sakkondiral keɓe ɓeydiiɗe ngam 1000 keɓe ɓaawɗe',
    'admin.fakers.distribution.percentage': 'Limooɗe',
    'admin.fakers.entities.title': 'Noone Keɓe Ɓeydiiɗe',
    'admin.fakers.entities.description': 'Doggol noone keɓe ɗe ena waawi ɓeydugol',
    'admin.fakers.entities.user': 'Kuutorɓe e nokkuure (koobaajo, teknisiyen, admin)',
    'admin.fakers.entities.plantation': 'Ɗiɗɓe e ɗiɗɓe Kameruun e koordinat geografik',
    'admin.fakers.entities.sensor': 'Kuutorɓe ɓeydorde (temperatuure, ɓiiɓɓe leydi, CO2, limooɗe ndiyam, limooɗe annooru)',
    'admin.fakers.entities.sensorReading': 'Jaangooje kuutorɓe ɓeydorde e waylitiiɗe wakkati sakkondiral',
    'admin.fakers.entities.actuator': 'Kuutorɓe ɓeydugol (pompe, fentilatoor, arroseur, vanne, ɓeydugol ndiyam, ndaariɗe)',
    'admin.fakers.entities.event': 'Ƴeewte (señol ɓurɗe, kuutor ɓeydugol jaltinaaɗe/naatinaaɗe, waylitiiɗe wattinɗam)',
    'admin.fakers.entities.notification': 'Tintine (web, email, WhatsApp) e nokkuure',
    'admin.fakers.seasonal.title': 'Nokkuure Wakkati',
    'admin.fakers.seasonal.description': 'Limoore kuutorɓe ɓeydorde waylitaa e wakkati Kameruun',
    'admin.fakers.seasonal.dry_season': 'Wakkati ɓiiɓɓe',
    'admin.fakers.seasonal.rainy_season': 'Wakkati Ndiyam',
    'admin.fakers.seasonal.harmattan': 'Harmattan',
    'admin.fakers.seasonal.transition': 'Sakkondiral',
    'admin.fakers.results.percentage': '%',
    'admin.fakers.results.barChart': 'Sakkondiral Yiilal',
    'chatbox.title': 'CamerFarm AI Ballal',
    'chatbox.description': 'Naamnoo laawol maaɗa e ngayka e heɓo tawtoreeji kuutorɗam e wakkati ekkitiiɗam.',
    'chatbox.emptyState.title': 'Arii e Ballal AI',
    'chatbox.emptyState.description': 'Fuɗɗo waasde naamnoo laawol maaɗa walla suɓo tawtoreejo ɗoo les.',
    'chatbox.suggestionsHeader': 'Laawol naamnooɗe',
    'chatbox.suggestedQuestions.question1': 'Hol no mi waɗaade ɓeydugol ɗiɗɓe am?',
    'chatbox.suggestedQuestions.question2': 'Ko honɗe ɓurɗe ɓeydeede ngam ɓeydugol ndiyam?',
    'chatbox.suggestedQuestions.question3': 'Hol no mi anndinaade cuuɗi ɗiɗɓe?',
    'chatbox.suggestedQuestions.question4': 'Ko honɗe kuutorɓe ɓeydorde mi waɗaade ngam gollal ɗiɗɓe am?',
    'chatbox.aiResponse.prefix': 'Noddu laawol maaɗa',
    'chatbox.aiResponse.intro': 'Noddu ɗoo noddiraaɗo laawol maaɗa. Ballal AI seŋtina keɓe maaɗa e heɓa maa tawtoreeji kuutorɗam e jokkondiral baɗɗe ngayka jawdi.',
    'chatbox.inputLabel': 'Laawol maaɗa',
    'chatbox.inputPlaceholder': 'Binndo laawol maaɗa ton... (Misaal: Hol no mi waɗaade ɓeydugol ndiyam?)',
    'chatbox.sendButton': 'Neldu',
    'chatbox.sending': 'Neldugol...',
    'chatbox.inputHint': 'Dobo Enter ngam neldugol, Shift+Enter ngam ɓoggo hesere',
    'chatbox.characters': 'binndi',
    'chatbox.characterCount': 'binndal',
    'language.fr': 'Faransinkoore',
    'language.en': 'Inngilinkoore',
    'language.ff': 'Fulfulde',
    'language.ew': 'Ewondo',
  },
  ew: {
    'nav.home': 'Ndé',
    'nav.support': 'Nsámbí',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Bisó',
    'nav.ai': 'AI',
    'auth.login': 'Kómbí',
    'auth.signup': 'Sígní',
    'auth.logout': 'Bwá',
    'auth.profile': 'Profil',
    'login.title': 'KÓMBÍ',
    'login.emailLabel': 'Email wá',
    'login.emailPlaceholder': 'Sígní email wá',
    'login.phoneLabel': 'Téléfón wá',
    'login.phonePlaceholder': 'Sígní téléfón wá',
    'login.passwordLabel': 'Mótí',
    'login.passwordPlaceholder': 'Sígní mótí wá',
    'login.submitButton': 'Kómbí',
    'login.submitting': 'Kómbí...',
    'login.forgotPassword': 'Mótí óbí?',
    'login.noAccount': 'Wá alé kóntó?',
    'login.signupLink': 'Sígní.',
    'login.backToHome': 'Bwá ndé',
    'login.showPassword': 'Fón mótí',
    'login.hidePassword': 'Sóbí mótí',
    'login.errors.emailRequired': 'Email ékpé',
    'login.errors.emailInvalid': 'Email alé mán',
    'login.errors.phoneRequired': 'Téléfón ékpé',
    'login.errors.phoneInvalid': 'Téléfón alé mán',
    'login.errors.passwordRequired': 'Mótí ékpé',
    'login.errors.passwordMinLength': 'Mótí ékpé mbálá 6',
    'login.errors.loginFailed': 'Kómbí alé mán. Bwá kóntó wá.',
    'login.errors.twoFactorInvalid': 'Kóde ékpé mbálá 6',
    'login.errors.twoFactorTokenMissing': 'Token vérification alé',
    'login.errors.twoFactorFailed': 'Kóde 2FA alé mán. Bwá sígní.',
    'login.twoFactorTitle': 'Vérification mbálá míbalé',
    'login.twoFactorDescription': 'Sígní kóde mbálá 6 wá app vérification',
    'login.twoFactorCodeLabel': 'Kóde vérification',
    'login.twoFactorCodePlaceholder': '000000',
    'login.verifyButton': 'Vérifier',
    'login.verifying': 'Vérification...',
    'login.backToLogin': 'Bwá kómbí',
    'login.motivational.line1': 'Bwá bisó wá, automatiser',
    'login.motivational.line2': 'système wá é bwá bisó wá',
    'login.motivational.line3': 'Bisó jókón é automatiser ékpé mbálá',
    'signup.title': 'SÍGNÍ',
    'signup.lastNameLabel': 'Nkómbó',
    'signup.lastNamePlaceholder': 'Sígní nkómbó wá',
    'signup.firstNameLabel': 'Nkómbó ndé',
    'signup.firstNamePlaceholder': 'Sígní nkómbó ndé wá',
    'signup.emailLabel': 'Email wá',
    'signup.emailPlaceholder': 'Sígní email wá',
    'signup.phoneLabel': 'Téléfón (Whatsapp)',
    'signup.phonePlaceholder': 'Téléfón (Whatsapp)',
    'signup.passwordLabel': 'Mótí',
    'signup.passwordPlaceholder': 'Sígní mótí wá',
    'signup.confirmPasswordLabel': 'Vérification mot de passe',
    'signup.confirmPasswordPlaceholder': 'Vérification mot de passe',
    'signup.submitButton': 'Sígní',
    'signup.submitting': 'Sígní...',
    'signup.hasAccount': 'Wá alé kóntó?',
    'signup.loginLink': 'Kómbí.',
    'signup.backToHome': 'Bwá ndé',
    'signup.showPassword': 'Fón mótí',
    'signup.hidePassword': 'Sóbí mótí',
    'signup.passwordRequirements': 'Mótí ékpé:',
    'signup.errors.lastNameRequired': 'Nkómbó ékpé',
    'signup.errors.firstNameRequired': 'Nkómbó ndé ékpé',
    'signup.errors.emailRequired': 'Email ékpé',
    'signup.errors.emailInvalid': 'Email alé mán',
    'signup.errors.emailExists': 'Email ékpé sígní',
    'signup.errors.phoneRequired': 'Téléfón ékpé',
    'signup.errors.phoneInvalid': 'Téléfón alé mán',
    'signup.errors.phoneExists': 'Téléfón ékpé sígní',
    'signup.errors.passwordRequired': 'Mótí ékpé',
    'signup.errors.passwordMinLength': 'Mótí ékpé mbálá 8',
    'signup.errors.passwordUppercase': 'Mótí ékpé mbálá míbalé mán',
    'signup.errors.passwordLowercase': 'Mótí ékpé mbálá míbalé alé mán',
    'signup.errors.passwordNumber': 'Mótí ékpé mbálá míbalé nombre',
    'signup.errors.passwordSpecial': 'Mótí ékpé mbálá míbalé spécial (!@#$%^&*(),.?":{}|<>)',
    'signup.errors.confirmPasswordRequired': 'Vérification mot de passe ékpé',
    'signup.errors.passwordsMismatch': 'Mótí alé mán',
    'signup.errors.signupFailed': 'Sígní alé mán. Bwá sígní.',
    'notifications.title': 'Notifications',
    'notifications.empty': 'Alé notifications',
    'notifications.loading': 'Chargement...',
    'notifications.noDescription': 'Notification',
    'notifications.sent': 'sígní',
    'notifications.noEmail': 'Alé notifications email',
    'notifications.justNow': 'Mbálá',
    'notifications.minutesAgo': 'min',
    'notifications.hoursAgo': 'h',
    'notifications.daysAgo': 'j',
    'notifications.delete': 'Sóbí',
    'hero.heading': 'Bisó jókón <span class="hero__highlight">bisó mán</span>, <span class="hero__highlight">jókón</span> é <span class="hero__highlight">automatiser</span>',
    'features.automation.title': 'Automatisation',
    'features.automation.description': 'Bwá Irrigation, Ventilation É Éclairage Alé Effort. Système Wá, Alimenté Par Énergie Solaire, Garantit Ko Tâches Essentielles S\'exécutent Même En Cas De Coupure De Courant.',
    'features.ai.title': 'AI Intégré',
    'features.ai.description': 'Identifiez Maladies Cultures Par Simple Photo É Recevez Recommandations Traitement Immédiates. Accédez À Conseils Agricoles Personnalisés En Français, Anglais É Langues Locales.',
    'features.realtime.title': 'Suivi En Temps Réel',
    'features.realtime.description': 'Visualisez Conditions Critiques Champ Wá À Distance: Humidité Sol, Température, CO2 É Niveau D\'eau. Recevez Alertes En Temps Réel Pour Anticiper Risques Climatiques É Anomalies.',
    'benefits.yield.title': 'Bwá rendement produits',
    'benefits.energy.title': 'Sóbí consommation énergie',
    'benefits.water.title': 'Économiser consommation eau',
    'intelligent.title': 'Bisó mán face climat, basée données',
    'intelligent.description': 'En Utilisant Données Temps Réel Comme Coup Pouce Supplémentaire, Agriculteurs É Horticulteurs Fusionnent Monde Physique Avec Outils Numériques Pour Lutter Contre Problèmes Quotidiens É Améliorer Productivité.',
    'cta.title': 'Prêt à transformer bisó wá?',
    'cta.subtitle': 'Rejoignez Centaines D\'agriculteurs Qui Augmentent Rendements Avec CamerFarm AI',
    'cta.button': 'Nsámbí Wá',
    'footer.description': 'Plateforme mán pour bisó camerounaise moderne é durable.',
    'footer.resources.title': 'Ressources',
    'footer.resources.documentation': 'Documentation',
    'footer.resources.guide': 'Guide utilisation',
    'footer.legal.title': 'Légal',
    'footer.legal.privacy': 'Confidentialité',
    'footer.legal.terms': 'Conditions',
    'footer.legal.cookies': 'Cookies',
    'footer.social.title': 'Suivez Wá',
    'footer.copyright': '© 2025 CamerFarm AI. Tous Droits Réservés.',
    'floatingButton.ariaLabel': 'Nsámbí support',
    'plantations.loading': 'Chargement plantations...',
    'plantations.list.title': 'Bisó Wá',
    'plantations.create': 'Sígní bisó',
    'plantations.area': 'Nkómbó',
    'plantations.viewDetails': 'Fón détails',
    'plantations.empty.title': 'OUPS,',
    'plantations.empty.message': 'Wá alé sígní bisó.',
    'plantations.empty.action': 'Sígní bisó',
    'plantations.empty.icon': 'Alé bisó',
    'plantations.slogan.line1': 'Bwá bisó wá, automatiser système wá é bwá bisó wá',
    'plantations.slogan.line2': 'Bisó jókón é automatiser ékpé mbálá',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Bwá tableau bord CamerFarm AI wá.',
    'graphs.welcome.description': 'Visualisez temps réel données capteurs wá pour mieux comprendre état parcelles wá é optimiser interventions wá.',
    'graphs.welcome.hint': 'Utilisez boutons ci-dessous pour filtrer types capteurs (Humidité, température, CO₂, etc.)',
    'graphs.sensors.humidity': 'Capteur Humidité',
    'graphs.sensors.temperature': 'Capteur Température ambiante',
    'graphs.sensors.soilMoisture': 'Capteur Humidité sol',
    'graphs.sensors.luminosity': 'Capteur luminosité',
    'graphs.sensors.co2': 'Capteur CO2',
    'graphs.sensors.waterLevel': 'Niveau eau',
    'graphs.dateFrom': 'Du',
    'graphs.dateTo': 'Au',
    'graphs.applyFilter': 'Appliquer Filtre',
    'graphs.resetFilter': 'Réinitialiser',
    'graphs.chart.title': 'Évolution',
    'graphs.loading': 'Chargement données capteurs...',
    'graphs.empty': 'Alé données capteur disponible période ékpé.',
    'monitoring.sensors.title': 'Valeurs capteurs temps réel',
    'monitoring.sensors.temperature': 'Température',
    'monitoring.sensors.soilHumidity': 'Humidité sol',
    'monitoring.sensors.co2': 'Taux CO2',
    'monitoring.sensors.luminosity': 'Luminosité',
    'monitoring.sensors.waterLevel': 'Niveau eau',
    'monitoring.thresholds.title': 'Seuils capteurs',
    'monitoring.thresholds.subtitle': 'Ajustez seuils capteurs wá pour recevoir alertes pertinentes.',
    'monitoring.thresholds.min': 'Seuil min',
    'monitoring.thresholds.max': 'Seuil max',
    'monitoring.thresholds.edit': 'Modifier seuils',
    'monitoring.thresholds.save': 'Enregistrer',
    'monitoring.thresholds.saving': 'Enregistrement...',
    'monitoring.thresholds.cancel': 'Annuler',
    'monitoring.thresholds.editingFor': 'Modification seuils pour',
    'monitoring.thresholds.editingSubtitle': 'Définissez valeurs minimales é maximales pour déclencher alertes',
    'monitoring.thresholds.invalidData': 'Données seuils invalides',
    'monitoring.thresholds.maxMustBeGreater': 'Seuil maximum ékpé strictement supérieur seuil minimum',
    'monitoring.thresholds.updateSuccess': 'Seuils mis à jour succès',
    'monitoring.thresholds.updateError': 'Erreur mise à jour seuils',
    'monitoring.thresholds.notFound': 'Capteur ou plantation introuvable',
    'monitoring.thresholds.forbidden': 'Wá alé permission modifier seuils ékpé',
    'monitoring.thresholds.unauthorized': 'Wá ékpé kómbí modifier seuils',
    'monitoring.updated': 'Mis à jour',
    'monitoring.status.good': 'Bon',
    'monitoring.status.optimal': 'Optimal',
    'monitoring.status.moderate': 'Modéré',
    'monitoring.status.low': 'Faible',
    'monitoring.status.high': 'Élevé',
    'monitoring.status.critical': 'Critique',
    'monitoring.status.bright': 'Lumineux',
    'monitoring.status.normal': 'Normal',
    'monitoring.status.dim': 'Sombre',
    'monitoring.equipment.title': 'Contrôle matériels é accessoires',
    'monitoring.equipment.irrigationPump': 'Pompe irrigation',
    'monitoring.equipment.fans': 'Ventilateurs',
    'monitoring.equipment.lighting': 'Éclairage',
    'monitoring.equipment.offline': 'Hors ligne',
    'monitoring.equipment.noActuators': 'Alé actionneur actuellement installé champ ékpé.',
    'monitoring.equipment.updateError': 'Erreur mise à jour équipement. Bwá sígní.',
    'monitoring.mode.automatic': 'Automatique',
    'monitoring.mode.manual': 'Manuel',
    'monitoring.mode.automaticInfo': 'Mode automatique activé: Équipements contrôlés automatiquement selon données capteurs.',
    'monitoring.mode.updateError': 'Erreur mise à jour mode. Bwá sígní.',
    'monitoring.noSensors': 'Alé capteur actuellement affecté plantation ékpé. Bwá affecter capteurs voir données monitoring.',
    'monitoring.help.title': 'Comment fonctionnent couleurs jauges?',
    'monitoring.help.intro': 'Couleurs jauges s\'adaptent automatiquement selon seuils wá configurés (seuilMin é seuilMax). Chaque jauge utilise système couleurs indiquer rapidement état capteurs wá.',
    'monitoring.help.temperature.title': '🌡️ Mvú (0-50°C)',
    'monitoring.help.temperature.description': 'Jauge température affiche vert autour seuil minimum (température idéale), puis transitionne progressivement vers jaune é orange entre seuils, é devient rouge au-dessus seuil maximum (danger).',
    'monitoring.help.soilHumidity.title': '💧 Mvú bisó (0-100%)',
    'monitoring.help.soilHumidity.description': 'Zone optimale (verte) situe entre seuil minimum é maximum. En dessous seuil min ou au-dessus seuil max, couleur passe orange puis rouge indiquer niveau critique.',
    'monitoring.help.co2.title': '🌬️ Taux CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'Vert indique bon niveau CO2 (en dessous seuil min). Couleur transitionne vers jaune puis orange entre seuils, é devient rouge au-dessus seuil maximum (niveau dangereux).',
    'monitoring.help.luminosity.title': '☀️ Nsámbí (0-100000 lux)',
    'monitoring.help.luminosity.description': 'Zone optimale (verte) trouve entre seuil minimum é maximum. En dehors plage ékpé, couleur devient jaune (avertissement) puis rouge (saturation ou obscurité extrême).',
    'monitoring.help.waterLevel.title': '💧 Niveau mán (0-100%)',
    'monitoring.help.waterLevel.description': 'Rouge indique niveau critique (en dessous seuil min). Au-dessus seuil minimum, couleur passe progressivement orange, puis vert indiquer niveau suffisant.',
    'monitoring.help.zones.optimal': 'Zone optimale',
    'monitoring.help.zones.warning': 'Zone avertissement',
    'monitoring.help.zones.danger': 'Zone danger',
    'monitoring.help.close': 'Fermer',
    'plantations.createModal.title': 'Entrez informations champ',
    'plantations.createModal.nameLabel': 'Nkómbó plantation wá',
    'plantations.createModal.namePlaceholder': 'Sígní nkómbó plantation wá',
    'plantations.createModal.areaLabel': 'Superficie plantation',
    'plantations.createModal.areaPlaceholder': 'Sígní superficie plantation wá',
    'plantations.createModal.areaUnit.m2': 'm²',
    'plantations.createModal.areaUnit.ha': 'ha',
    'plantations.createModal.areaUnit.acre': 'acre',
    'plantations.createModal.areaUnit.km2': 'km²',
    'plantations.createModal.locationLabel': 'Localisation',
    'plantations.createModal.locationPlaceholder': 'Sígní zone plantation wá',
    'plantations.createModal.next': 'Suivant',
    'plantations.createModal.cancel': 'Bwá',
    'plantations.createModal.submitting': 'Sígní...',
    'plantations.createModal.cropTypeLabel': 'Type culture',
    'plantations.createModal.cropTypePlaceholder': 'Ex: Manioc, cacao...',
    'plantations.createModal.latitudeLabel': 'Latitude',
    'plantations.createModal.latitudePlaceholder': 'Sígní latitude',
    'plantations.createModal.longitudeLabel': 'Longitude',
    'plantations.createModal.longitudePlaceholder': 'Sígní longitude',
    'plantations.createModal.errors.nameRequired': 'Nkómbó bisó ékpé',
    'plantations.createModal.errors.areaRequired': 'Superficie ékpé',
    'plantations.createModal.errors.areaInvalid': 'Superficie ékpé nombre valide',
    'plantations.createModal.errors.locationRequired': 'Localisation ékpé',
    'plantations.createModal.errors.latitudeInvalid': 'Latitude alé mán',
    'plantations.createModal.errors.longitudeInvalid': 'Longitude alé mán',
    'plantations.createModal.errors.coordinatesRequiredTogether': 'Latitude é longitude ékpé fournies ensemble',
    'plantations.cropType': 'Culture',
    'plantations.errors.fetchFailed': 'Alé charger plantations. Données affichées peuvent obsolètes.',
    'plantations.detail.title': 'Détail plantation',
    'plantations.detail.loading': 'Chargement plantation...',
    'plantations.detail.backToList': 'Bwá liste',
    'plantations.detail.createdAt': 'Créée',
    'plantations.detail.monitoring': 'Monitoring',
    'plantations.detail.graphs': 'Graphiques',
    'plantations.detail.sensors.title': 'Capteurs',
    'plantations.detail.sensors.active': 'Actif',
    'plantations.detail.sensors.inactive': 'Inactif',
    'plantations.detail.sensors.temperature': 'Mvú',
    'plantations.detail.sensors.humidity': 'Mvú',
    'plantations.detail.sensors.soilMoisture': 'Mvú bisó',
    'plantations.detail.sensors.co2Level': 'Niveau CO₂',
    'plantations.detail.sensors.waterLevel': 'Niveau eau',
    'plantations.detail.sensors.luminosity': 'Luminosité',
    'plantations.detail.sensors.lastUpdate': 'Dernière mise à jour',
    'plantations.detail.sensors.noSensors': 'Alé capteur installé',
    'plantations.detail.sensors.noData': 'Alé données',
    'plantations.detail.sensors.noSensorsMessage': 'Plantation ékpé alé capteurs installés. Installez capteurs accéder monitoring.',
    'plantations.detail.errors.invalidId': 'ID plantation invalide',
    'plantations.detail.errors.fetchFailed': 'Alé charger détails plantation.',
    'plantations.detail.errors.notFound': 'Plantation non trouvée',
    'profile.back': 'Bwá',
    'profile.pageLabel': 'Profil utilisateur',
    'profile.welcome': 'Bwá, {name}',
    'profile.loading': 'Chargement profil...',
    'profile.loadingHint': 'Si chargement prend trop temps, vérifiez console erreurs.',
    'profile.changePhoto': 'Bwá',
    'profile.noPhone': 'Alé téléphone',
    'profile.roleLabel': 'Rôle',
    'profile.editButton': 'Modifier',
    'profile.saveButton': 'Enregistrer',
    'profile.saving': 'Enregistrement...',
    'profile.cancelButton': 'Annuler',
    'profile.firstNameLabel': 'Nkómbó ndé',
    'profile.firstNamePlaceholder': 'Sígní nkómbó ndé wá',
    'profile.lastNameLabel': 'Nkómbó',
    'profile.lastNamePlaceholder': 'Sígní nkómbó wá',
    'profile.languageLabel': 'Langue',
    'profile.emailLabel': 'Adresse email wá',
    'profile.noEmail': 'Alé adresse email',
    'profile.notConfigured': 'Non configuré',
    'profile.addEmail': 'Ajouter adresse email',
    'profile.roleHint': 'Rôle alé modifier',
    'profile.phoneLabel': 'Téléphone',
    'profile.phonePlaceholder': 'Núméro téléphone wá',
    'profile.idLabel': 'ID Utilisateur',
    'profile.idHint': 'Identifiant unique',
    'profile.twoFactor.title': 'Vérification mbálá míbalé',
    'profile.twoFactor.description': 'Sécurisez kóntó wá code vérification supplémentaire',
    'profile.twoFactor.enabled': 'Activé',
    'profile.twoFactor.disabled': 'Désactivé',
    'profile.twoFactor.enableButton': 'Activer 2FA',
    'profile.twoFactor.disableButton': 'Désactiver 2FA',
    'profile.twoFactor.setupTitle': 'Configuration 2FA',
    'profile.twoFactor.setupDescription': 'Scannez QR code app vérification wá (Google Authenticator, Authy, etc.)',
    'profile.twoFactor.scanQRCode': 'Scannez QR code ékpé',
    'profile.twoFactor.enterCode': 'Sígní code vérification',
    'profile.twoFactor.codeLabel': 'Code vérification',
    'profile.twoFactor.codePlaceholder': '000000',
    'profile.twoFactor.activateButton': 'Activer',
    'profile.twoFactor.deactivateButton': 'Désactiver',
    'profile.twoFactor.disableTitle': 'Désactiver 2FA',
    'profile.twoFactor.disableDescription': 'Sígní code 2FA wá confirmer désactivation',
    'profile.twoFactor.success': '2FA activé succès',
    'profile.twoFactor.error': 'Erreur activation 2FA',
    'profile.errors.firstNameRequired': 'Nkómbó ndé ékpé',
    'profile.errors.lastNameRequired': 'Nkómbó ékpé',
    'profile.errors.phoneRequired': 'Núméro téléphone ékpé',
    'profile.errors.phoneInvalid': 'Núméro téléphone alé mán',
    'profile.errors.invalidImage': 'Bwá sélectionner image valide',
    'profile.errors.imageSizeExceeded': 'Image alé dépasser 5MB',
    'profile.errors.uploadFailed': 'Erreur upload photo',
    'profile.errors.updateFailed': 'Erreur mise à jour profil',
    'profile.role.farmer': 'Agriculteur',
    'profile.role.admin': 'Administrateur',
    'profile.role.technician': 'Technicien',
    'admin.fakers.title': 'Générateur données test',
    'admin.fakers.subtitle': 'Générez données factices tester application',
    'admin.fakers.test.title': 'Tester fakers',
    'admin.fakers.test.description': 'Testez fakers alé sauvegarder base données',
    'admin.fakers.test.button': 'Tester fakers',
    'admin.fakers.test.testing': 'Test cours...',
    'admin.fakers.testError': 'Erreur test fakers',
    'admin.fakers.generate.title': 'Générer fakers',
    'admin.fakers.generate.description': 'Générez é sauvegardez données factices base données',
    'admin.fakers.generate.countLabel': 'Nombre entités',
    'admin.fakers.generate.countPlaceholder': '100',
    'admin.fakers.generate.scenarioLabel': 'Scénario',
    'admin.fakers.generate.entityLabel': 'Entité spécifique',
    'admin.fakers.generate.entityOptional': 'optionnel',
    'admin.fakers.generate.entityAll': 'Toutes entités',
    'admin.fakers.generate.button': 'Générer',
    'admin.fakers.generate.generating': 'Génération cours...',
    'admin.fakers.generateError': 'Erreur génération fakers',
    'admin.fakers.errors.countInvalid': 'Nombre ékpé supérieur 0',
    'admin.fakers.errors.scenarioRequired': 'Bwá sélectionner scénario',
    'admin.fakers.results.total': 'Total',
    'admin.fakers.results.users': 'Utilisateurs',
    'admin.fakers.results.plantations': 'Plantations',
    'admin.fakers.results.sensors': 'Capteurs',
    'admin.fakers.results.sensorReadings': 'Lectures capteurs',
    'admin.fakers.results.actuators': 'Actionneurs',
    'admin.fakers.results.events': 'Événements',
    'admin.fakers.results.notifications': 'Notifications',
    'admin.fakers.scenarios.normal': 'Normal - Valeurs plages normales',
    'admin.fakers.scenarios.edge': 'Edge Cases - Valeurs limites',
    'admin.fakers.scenarios.alert': 'Alertes - Valeurs dépassant seuils',
    'admin.fakers.scenarios.seasonal': 'Saisonnier - Données saisonnières',
    'admin.fakers.scenarios.mixed': 'Mixte - Mélange scénarios',
    'admin.fakers.scenarios.normal.description': 'Génère valeurs plages normales capteurs. Idéal tester comportement standard application.',
    'admin.fakers.scenarios.edge.description': 'Génère valeurs limites min/max. Utile tester cas limites é validations.',
    'admin.fakers.scenarios.alert.description': 'Génère valeurs dépassant seuils déclencher alertes. Parfait tester système notifications.',
    'admin.fakers.scenarios.seasonal.description': 'Génère données 4 situations saisonnières Cameroun: saison sèche, saison pluies, harmattan é transition.',
    'admin.fakers.scenarios.mixed.description': 'Mélange scénarios poids équilibrés. Recommandé données réalistes é variées.',
    'admin.fakers.scenarios.weights.normal': 'Poids normal',
    'admin.fakers.scenarios.weights.edge': 'Poids edge',
    'admin.fakers.scenarios.weights.alert': 'Poids alert',
    'admin.fakers.scenarios.weights.seasonal': 'Poids saisonnier',
    'admin.fakers.info.title': 'Scénarios disponibles',
    'admin.fakers.info.description': 'Liste scénarios génération disponibles',
    'admin.fakers.distribution.title': 'Distribution défaut',
    'admin.fakers.distribution.description': 'Répartition entités générées 1000 fakers',
    'admin.fakers.distribution.percentage': 'Pourcentage',
    'admin.fakers.entities.title': 'Types entités supportés',
    'admin.fakers.entities.description': 'Liste types entités générées',
    'admin.fakers.entities.user': 'Utilisateurs rôles (agriculteur, technicien, admin)',
    'admin.fakers.entities.plantation': 'Plantations cultures camerounaises é coordonnées géographiques',
    'admin.fakers.entities.sensor': 'Capteurs (température, humidité sol, CO2, niveau eau, luminosité)',
    'admin.fakers.entities.sensorReading': 'Lectures capteurs variations temporelles cohérentes',
    'admin.fakers.entities.actuator': 'Actionneurs (pompe, ventilateur, arroseur, vanne, chauffage, éclairage)',
    'admin.fakers.entities.event': 'Événements (seuil dépassé, actionneur activé/désactivé, changement mode)',
    'admin.fakers.entities.notification': 'Notifications (web, email, WhatsApp) statuts',
    'admin.fakers.seasonal.title': 'Situations saisonnières',
    'admin.fakers.seasonal.description': 'Valeurs capteurs varient saisons camerounaises',
    'admin.fakers.seasonal.dry_season': 'Saison sèche',
    'admin.fakers.seasonal.rainy_season': 'Saison pluies',
    'admin.fakers.seasonal.harmattan': 'Harmattan',
    'admin.fakers.seasonal.transition': 'Transition',
    'admin.fakers.results.percentage': '%',
    'admin.fakers.results.barChart': 'Répartition visuelle',
    'chatbox.title': 'Assistant AI CamerFarm',
    'chatbox.description': 'Sígní question wá é agriculture é bwá conseils personnalisés temps réel.',
    'chatbox.emptyState.title': 'Bwá Assistant AI',
    'chatbox.emptyState.description': 'Kómbí conversation sígní question wá é sélectionner suggestion ékpé.',
    'chatbox.suggestionsHeader': 'Questions suggérées',
    'chatbox.suggestedQuestions.question1': 'Hol no bwá rendement bisó wá?',
    'chatbox.suggestedQuestions.question2': 'Ko honɗe irrigation ékpé mbálá?',
    'chatbox.suggestedQuestions.question3': 'Hol no anndinaade maladies bisó?',
    'chatbox.suggestedQuestions.question4': 'Ko honɗe capteurs ékpé ngam type culture wá?',
    'chatbox.aiResponse.prefix': 'Réponse question wá',
    'chatbox.aiResponse.intro': 'Noddu ɗoo question wá. Assistant AI seŋtina données wá é heɓa wá conseils personnalisés basés pratiques agricoles ékpé.',
    'chatbox.inputLabel': 'Question wá',
    'chatbox.inputPlaceholder': 'Sígní question wá ton... (Ex: Hol no optimiser irrigation?)',
    'chatbox.sendButton': 'Envoyer',
    'chatbox.sending': 'Envoi...',
    'chatbox.inputHint': 'Dobo Enter ngam envoyer, Shift+Enter ngam ligne ékpé',
    'chatbox.characters': 'caractères',
    'chatbox.characterCount': 'caractère',
    'language.fr': 'Faransinkoore',
    'language.en': 'Inngilinkoore',
    'language.ff': 'Fulfulde',
    'language.ew': 'Ewondo',
  },
};

export function getTranslation(key: TranslationKey, language: Language): string {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'translations.ts:1931',message:'getTranslation entry',data:{key,language,hasLanguage:!!translations[language],hasKey:!!translations[language]?.[key]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const translation = translations[language]?.[key];
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'translations.ts:1935',message:'getTranslation result',data:{key,language,translation,fallback:translation||key},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  return translation || key;
}

