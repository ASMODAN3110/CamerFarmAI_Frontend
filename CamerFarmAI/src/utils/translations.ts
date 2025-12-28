import type { Language } from '@/contexts/LanguageContext';

export type TranslationKey = 
  | 'nav.home'
  | 'nav.support'
  | 'nav.monitoring'
  | 'nav.graphs'
  | 'nav.plantations'
  | 'nav.ai'
  | 'nav.guide'
  | 'nav.technician'
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
  | 'plantations.detail.sensors.readingsHistory'
  | 'plantations.detail.sensors.recentReadings'
  | 'plantations.detail.sensors.loadingReadings'
  | 'plantations.detail.sensors.noReadings'
  | 'plantations.detail.sensors.noReading'
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
  | 'monitoring.inactiveSensors.title'
  | 'monitoring.inactiveSensors.message'
  | 'sensor.status.active'
  | 'sensor.status.inactive'
  | 'sensor.status.offline'
  | 'sensor.status.unknown'
  | 'profile.back'
  | 'profile.backToDashboard'
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
  | 'profile.readonlyMessage'
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
  | 'language.ew'
  | 'guide.title'
  | 'guide.subtitle'
  | 'guide.tableOfContents.title'
  | 'guide.tableOfContents.introduction'
  | 'guide.tableOfContents.quickStart'
  | 'guide.tableOfContents.authentication'
  | 'guide.tableOfContents.profile'
  | 'guide.tableOfContents.plantations'
  | 'guide.tableOfContents.monitoring'
  | 'guide.tableOfContents.graphs'
  | 'guide.tableOfContents.notifications'
  | 'guide.tableOfContents.ai'
  | 'guide.tableOfContents.language'
  | 'guide.introduction.title'
  | 'guide.introduction.description'
  | 'guide.introduction.feature1'
  | 'guide.introduction.feature2'
  | 'guide.introduction.feature3'
  | 'guide.introduction.feature4'
  | 'guide.quickStart.title'
  | 'guide.quickStart.signup.title'
  | 'guide.quickStart.signup.step1'
  | 'guide.quickStart.signup.step2'
  | 'guide.quickStart.signup.step3'
  | 'guide.quickStart.signup.step4'
  | 'guide.quickStart.login.title'
  | 'guide.quickStart.login.step1'
  | 'guide.quickStart.login.step2'
  | 'guide.quickStart.login.step3'
  | 'guide.auth.title'
  | 'guide.auth.twoFactor.title'
  | 'guide.auth.twoFactor.description'
  | 'guide.auth.twoFactor.step1'
  | 'guide.auth.twoFactor.step2'
  | 'guide.auth.twoFactor.step3'
  | 'guide.auth.twoFactor.step4'
  | 'guide.auth.twoFactor.tip'
  | 'guide.profile.title'
  | 'guide.profile.edit.title'
  | 'guide.profile.edit.step1'
  | 'guide.profile.edit.step2'
  | 'guide.profile.edit.step3'
  | 'guide.profile.edit.step4'
  | 'guide.profile.photo.title'
  | 'guide.profile.photo.step1'
  | 'guide.profile.photo.step2'
  | 'guide.profile.photo.step3'
  | 'guide.plantations.title'
  | 'guide.plantations.create.title'
  | 'guide.plantations.create.step1'
  | 'guide.plantations.create.step2'
  | 'guide.plantations.create.step3'
  | 'guide.plantations.create.step4'
  | 'guide.plantations.view.title'
  | 'guide.plantations.view.description'
  | 'guide.plantations.view.feature1'
  | 'guide.plantations.view.feature2'
  | 'guide.plantations.view.feature3'
  | 'guide.monitoring.title'
  | 'guide.monitoring.description'
  | 'guide.monitoring.sensors.title'
  | 'guide.monitoring.sensors.description'
  | 'guide.monitoring.sensors.temperature'
  | 'guide.monitoring.sensors.soilHumidity'
  | 'guide.monitoring.sensors.co2'
  | 'guide.monitoring.sensors.waterLevel'
  | 'guide.monitoring.sensors.luminosity'
  | 'guide.monitoring.thresholds.title'
  | 'guide.monitoring.thresholds.description'
  | 'guide.monitoring.thresholds.step1'
  | 'guide.monitoring.thresholds.step2'
  | 'guide.monitoring.thresholds.step3'
  | 'guide.monitoring.actuators.title'
  | 'guide.monitoring.actuators.description'
  | 'guide.monitoring.actuators.irrigation'
  | 'guide.monitoring.actuators.fans'
  | 'guide.monitoring.actuators.lighting'
  | 'guide.graphs.title'
  | 'guide.graphs.description'
  | 'guide.graphs.filters.title'
  | 'guide.graphs.filters.step1'
  | 'guide.graphs.filters.step2'
  | 'guide.graphs.filters.step3'
  | 'guide.graphs.sensors.title'
  | 'guide.graphs.sensors.description'
  | 'guide.notifications.title'
  | 'guide.notifications.description'
  | 'guide.notifications.management.title'
  | 'guide.notifications.management.step1'
  | 'guide.notifications.management.step2'
  | 'guide.notifications.management.step3'
  | 'guide.ai.title'
  | 'guide.ai.description'
  | 'guide.ai.usage.title'
  | 'guide.ai.usage.step1'
  | 'guide.ai.usage.step2'
  | 'guide.ai.usage.step3'
  | 'guide.ai.tip'
  | 'guide.language.title'
  | 'guide.language.description'
  | 'guide.language.step1'
  | 'guide.language.step2'
  | 'guide.language.step3'
  | 'guide.language.option1'
  | 'guide.language.option2'
  | 'guide.language.option3'
  | 'guide.language.option4';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Plantations',
    'nav.ai': 'IA',
    'nav.guide': 'Guide',
    'nav.technician': 'Tableau de bord',
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
    'monitoring.help.intro': 'Les couleurs des jauges s\'adaptent automatiquement selon les seuils que vous avez configurés (seuilMin et seuilMax). La zone optimale (verte) se situe entre ces deux seuils. Chaque jauge utilise un système de couleurs pour vous indiquer rapidement l\'état de vos capteurs.',
    'monitoring.help.temperature.title': '🌡️ Température (0-50°C)',
    'monitoring.help.temperature.description': 'La zone optimale (verte) se situe entre votre seuil minimum et maximum. En dessous du seuil min, la couleur passe du bleu (froid) au vert. Au-dessus du seuil max, elle devient orange puis rouge (trop chaud).',
    'monitoring.help.soilHumidity.title': '💧 Humidité du sol (0-100%)',
    'monitoring.help.soilHumidity.description': 'La zone optimale (verte) se situe entre votre seuil minimum et maximum. En dessous du seuil min, la couleur passe à l\'orange puis au rouge (trop sec). Au-dessus du seuil max, elle devient orange puis rouge (trop humide).',
    'monitoring.help.co2.title': '🌬️ Taux de CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'La zone optimale (verte) se situe entre votre seuil minimum et maximum. En dessous du seuil min, la couleur est bleu-vert (faible). Au-dessus du seuil max, elle devient jaune puis orange puis rouge (niveau dangereux).',
    'monitoring.help.luminosity.title': '☀️ Luminosité (0-100000 lux)',
    'monitoring.help.luminosity.description': 'La zone optimale (verte) se trouve entre votre seuil minimum et maximum. En dessous du seuil min, la couleur devient bleu-gris puis bleu foncé (obscurité). Au-dessus du seuil max, elle devient jaune puis orange puis rouge (saturation extrême).',
    'monitoring.help.waterLevel.title': '💧 Niveau d\'eau (0-100%)',
    'monitoring.help.waterLevel.description': 'Le rouge indique un niveau critique (en dessous du seuil min). Au-dessus du seuil minimum, la couleur passe progressivement à l\'orange, puis au vert pour indiquer un niveau suffisant. Le gradient de couleur s\'applique sur toute la hauteur de la jauge.',
    'monitoring.help.zones.optimal': 'Zone optimale',
    'monitoring.help.zones.warning': 'Zone d\'avertissement',
    'monitoring.help.zones.danger': 'Zone de danger',
    'monitoring.help.close': 'Fermer',
    'monitoring.inactiveSensors.title': 'Capteurs inactifs détectés',
    'monitoring.inactiveSensors.message': 'capteur(s) n\'ont pas envoyé de données depuis plus d\'1 heure',
    'sensor.status.active': 'Actif',
    'sensor.status.inactive': 'Inactif',
    'sensor.status.offline': 'Hors ligne',
    'sensor.status.unknown': 'Inconnu',
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
    'plantations.detail.sensors.readingsHistory': 'Historique des valeurs',
    'plantations.detail.sensors.recentReadings': 'Valeurs récentes',
    'plantations.detail.sensors.loadingReadings': 'Chargement des valeurs...',
    'plantations.detail.sensors.noReadings': 'Aucune valeur enregistrée',
    'plantations.detail.sensors.noReading': 'Aucune lecture',
    'plantations.detail.errors.invalidId': 'ID de plantation invalide',
    'plantations.detail.errors.fetchFailed': 'Impossible de charger les détails de la plantation.',
    'plantations.detail.errors.notFound': 'Plantation non trouvée',
    'profile.back': 'Retour',
    'profile.backToDashboard': 'Retour au dashboard',
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
    'profile.readonlyMessage': 'Ce profil est en lecture seule. Les techniciens ne peuvent pas modifier leurs informations.',
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
    'guide.title': 'Guide d\'utilisation',
    'guide.subtitle': 'Découvrez comment utiliser toutes les fonctionnalités de CamerFarm AI pour optimiser votre agriculture intelligente.',
    'guide.tableOfContents.title': 'Table des matières',
    'guide.tableOfContents.introduction': 'Introduction',
    'guide.tableOfContents.quickStart': 'Démarrage rapide',
    'guide.tableOfContents.authentication': 'Authentification',
    'guide.tableOfContents.profile': 'Profil utilisateur',
    'guide.tableOfContents.plantations': 'Plantations',
    'guide.tableOfContents.monitoring': 'Monitoring',
    'guide.tableOfContents.graphs': 'Graphiques',
    'guide.tableOfContents.notifications': 'Notifications',
    'guide.tableOfContents.ai': 'Chatbot IA',
    'guide.tableOfContents.language': 'Multilingue',
    'guide.introduction.title': 'Introduction',
    'guide.introduction.description': 'CamerFarm AI est une plateforme intelligente conçue pour moderniser l\'agriculture camerounaise. Cette application vous permet de suivre vos cultures en temps réel grâce à l\'IoT et l\'intelligence artificielle.',
    'guide.introduction.feature1': 'Suivi en temps réel des conditions de vos plantations',
    'guide.introduction.feature2': 'Contrôle automatique des équipements (irrigation, ventilation, éclairage)',
    'guide.introduction.feature3': 'Analyse des données historiques avec graphiques interactifs',
    'guide.introduction.feature4': 'Assistant IA pour conseils agricoles personnalisés',
    'guide.quickStart.title': 'Démarrage rapide',
    'guide.quickStart.signup.title': 'Créer un compte',
    'guide.quickStart.signup.step1': 'Cliquez sur "S\'inscrire" dans le menu de navigation ou sur la page d\'accueil',
    'guide.quickStart.signup.step2': 'Remplissez le formulaire avec vos informations : nom, prénom, email, téléphone et mot de passe',
    'guide.quickStart.signup.step3': 'Assurez-vous que votre mot de passe respecte les critères de sécurité (au moins 6 caractères, majuscule, minuscule, chiffre et caractère spécial)',
    'guide.quickStart.signup.step4': 'Cliquez sur "S\'inscrire" pour créer votre compte',
    'guide.quickStart.login.title': 'Se connecter',
    'guide.quickStart.login.step1': 'Accédez à la page de connexion via le menu ou le lien "Se Connecter"',
    'guide.quickStart.login.step2': 'Entrez votre email ou numéro de téléphone et votre mot de passe',
    'guide.quickStart.login.step3': 'Si vous avez activé l\'authentification à deux facteurs (2FA), entrez le code de vérification après la connexion',
    'guide.auth.title': 'Authentification',
    'guide.auth.twoFactor.title': 'Authentification à deux facteurs (2FA)',
    'guide.auth.twoFactor.description': 'L\'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte. Après avoir entré votre mot de passe, vous devrez également fournir un code de vérification généré par une application d\'authentification.',
    'guide.auth.twoFactor.step1': 'Connectez-vous à votre compte et accédez à votre profil',
    'guide.auth.twoFactor.step2': 'Dans la section "Authentification à deux facteurs", cliquez sur "Activer le 2FA"',
    'guide.auth.twoFactor.step3': 'Scannez le code QR avec une application d\'authentification (Google Authenticator, Authy, Microsoft Authenticator, etc.)',
    'guide.auth.twoFactor.step4': 'Entrez le code de vérification à 6 chiffres généré par l\'application pour confirmer l\'activation',
    'guide.auth.twoFactor.tip': 'Astuce : Conservez une copie de sauvegarde de votre code QR dans un endroit sûr. Si vous perdez l\'accès à votre application d\'authentification, vous pourrez réactiver le 2FA avec ce code.',
    'guide.profile.title': 'Gestion du profil utilisateur',
    'guide.profile.edit.title': 'Modifier les informations personnelles',
    'guide.profile.edit.step1': 'Accédez à votre profil en cliquant sur "Profil" dans le menu de navigation',
    'guide.profile.edit.step2': 'Cliquez sur le bouton "Modifier" pour activer le mode édition',
    'guide.profile.edit.step3': 'Modifiez les champs souhaités : prénom, nom, téléphone ou langue préférée',
    'guide.profile.edit.step4': 'Cliquez sur "Enregistrer" pour sauvegarder vos modifications ou "Annuler" pour revenir en arrière',
    'guide.profile.photo.title': 'Changer la photo de profil',
    'guide.profile.photo.step1': 'Dans la section photo de profil, cliquez sur l\'icône de caméra ou sur la photo actuelle',
    'guide.profile.photo.step2': 'Sélectionnez une image depuis votre appareil (formats acceptés : JPG, PNG, taille maximale : 5MB)',
    'guide.profile.photo.step3': 'L\'image sera automatiquement téléchargée et affichée comme nouvelle photo de profil',
    'guide.plantations.title': 'Gestion des plantations',
    'guide.plantations.create.title': 'Créer une nouvelle plantation',
    'guide.plantations.create.step1': 'Accédez à la page "Plantations" depuis le menu de navigation',
    'guide.plantations.create.step2': 'Cliquez sur le bouton "Créer une plantation"',
    'guide.plantations.create.step3': 'Remplissez le formulaire avec les informations de votre plantation : nom, localisation, superficie, type de culture et coordonnées GPS (optionnel)',
    'guide.plantations.create.step4': 'Cliquez sur "Suivant" puis "Créer" pour finaliser la création de votre plantation',
    'guide.plantations.view.title': 'Visualiser et gérer les plantations',
    'guide.plantations.view.description': 'La page des plantations affiche toutes vos plantations avec leurs informations principales. Vous pouvez :',
    'guide.plantations.view.feature1': 'Voir les détails de chaque plantation en cliquant sur "Voir les détails"',
    'guide.plantations.view.feature2': 'Accéder rapidement au monitoring et aux graphiques depuis la page de détails',
    'guide.plantations.view.feature3': 'Voir le nombre de capteurs et actionneurs assignés à chaque plantation',
    'guide.monitoring.title': 'Monitoring en temps réel',
    'guide.monitoring.description': 'La page de monitoring vous permet de suivre en temps réel les conditions de votre plantation grâce aux données des capteurs IoT.',
    'guide.monitoring.sensors.title': 'Types de capteurs',
    'guide.monitoring.sensors.description': 'CamerFarm AI supporte plusieurs types de capteurs pour surveiller différentes conditions :',
    'guide.monitoring.sensors.temperature': 'Température : Mesure la température ambiante (0-50°C) avec indicateur visuel de couleur',
    'guide.monitoring.sensors.soilHumidity': 'Humidité du sol : Mesure le pourcentage d\'humidité du sol (0-100%) avec barre de progression animée',
    'guide.monitoring.sensors.co2': 'Niveau de CO₂ : Mesure la concentration de dioxyde de carbone (0-2500 ppm) avec indicateurs de qualité de l\'air',
    'guide.monitoring.sensors.waterLevel': 'Niveau d\'eau : Affiche le niveau d\'eau dans le réservoir avec animation 3D',
    'guide.monitoring.sensors.luminosity': 'Luminosité : Mesure l\'intensité lumineuse avec effet de glow dynamique',
    'guide.monitoring.thresholds.title': 'Configuration des seuils',
    'guide.monitoring.thresholds.description': 'Vous pouvez personnaliser les seuils d\'alerte pour chaque capteur afin de recevoir des notifications lorsque les valeurs sortent des plages optimales.',
    'guide.monitoring.thresholds.step1': 'Sur la page de monitoring, localisez le capteur pour lequel vous souhaitez modifier les seuils',
    'guide.monitoring.thresholds.step2': 'Cliquez sur l\'icône d\'édition à côté des seuils min/max',
    'guide.monitoring.thresholds.step3': 'Entrez les nouvelles valeurs (le seuil max doit être supérieur au seuil min) et cliquez sur "Enregistrer"',
    'guide.monitoring.actuators.title': 'Contrôle des actionneurs',
    'guide.monitoring.actuators.description': 'Les actionneurs permettent de contrôler automatiquement ou manuellement les équipements de votre plantation :',
    'guide.monitoring.actuators.irrigation': 'Pompe d\'irrigation : Active/désactive l\'arrosage automatique',
    'guide.monitoring.actuators.fans': 'Ventilateurs : Contrôle la ventilation pour réguler la température',
    'guide.monitoring.actuators.lighting': 'Éclairage : Gère l\'éclairage artificiel pour les cultures en serre',
    'guide.graphs.title': 'Graphiques et statistiques',
    'guide.graphs.description': 'La page des graphiques vous permet d\'analyser l\'évolution des données de vos capteurs sur différentes périodes.',
    'guide.graphs.filters.title': 'Utilisation des filtres',
    'guide.graphs.filters.step1': 'Sélectionnez une plantation depuis la liste déroulante si vous avez plusieurs plantations',
    'guide.graphs.filters.step2': 'Choisissez une plage de dates en utilisant les sélecteurs "Date de début" et "Date de fin"',
    'guide.graphs.filters.step3': 'Cliquez sur "Appliquer le filtre" pour charger les données correspondantes',
    'guide.graphs.sensors.title': 'Sélection des capteurs',
    'guide.graphs.sensors.description': 'Vous pouvez activer ou désactiver l\'affichage de chaque type de capteur en cochant/décochant les cases correspondantes. Les graphiques se mettent à jour automatiquement.',
    'guide.notifications.title': 'Système de notifications',
    'guide.notifications.description': 'Les notifications vous alertent en temps réel des événements importants liés à vos plantations et capteurs.',
    'guide.notifications.management.title': 'Gérer les notifications',
    'guide.notifications.management.step1': 'Accédez aux notifications en cliquant sur l\'icône de cloche dans le header (le badge indique le nombre de notifications non lues)',
    'guide.notifications.management.step2': 'Marquez une notification comme lue en cliquant dessus, ou supprimez-la avec le bouton de suppression',
    'guide.notifications.management.step3': 'Les notifications sont automatiquement rafraîchies toutes les 45 secondes pour afficher les dernières alertes',
    'guide.ai.title': 'Chatbot IA',
    'guide.ai.description': 'L\'assistant IA de CamerFarm AI vous fournit des conseils agricoles personnalisés en temps réel. Il peut répondre à vos questions sur l\'agriculture, l\'irrigation, les maladies des plantes, et bien plus encore.',
    'guide.ai.usage.title': 'Utiliser le chatbot',
    'guide.ai.usage.step1': 'Accédez à la page "IA" depuis le menu de navigation ou cliquez sur le bouton flottant en bas à droite',
    'guide.ai.usage.step2': 'Tapez votre question dans le champ de saisie en bas de la chatbox',
    'guide.ai.usage.step3': 'Appuyez sur "Envoyer" ou la touche Entrée pour envoyer votre question. L\'assistant IA répondra avec des conseils détaillés',
    'guide.ai.tip': 'Astuce : Le chatbot supporte plusieurs langues (français, anglais, fulfulde, ewondo). Vous pouvez poser vos questions dans votre langue préférée.',
    'guide.language.title': 'Changement de langue',
    'guide.language.description': 'CamerFarm AI supporte 4 langues pour rendre l\'application accessible à tous les utilisateurs camerounais.',
    'guide.language.step1': 'Cliquez sur le sélecteur de langue dans le header (icône de globe)',
    'guide.language.step2': 'Sélectionnez votre langue préférée parmi les options disponibles',
    'guide.language.step3': 'L\'interface se mettra à jour immédiatement dans la langue sélectionnée',
    'guide.language.option1': 'Français : Langue officielle du Cameroun',
    'guide.language.option2': 'English : Pour les utilisateurs anglophones',
    'guide.language.option3': 'Fulfulde : Langue locale du nord du Cameroun',
    'guide.language.option4': 'Ewondo : Langue locale du centre et sud du Cameroun',
  },
  en: {
    'nav.home': 'Home',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphs',
    'nav.plantations': 'Plantations',
    'nav.ai': 'AI',
    'nav.guide': 'Guide',
    'nav.technician': 'Dashboard',
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
    'plantations.detail.sensors.readingsHistory': 'Readings History',
    'plantations.detail.sensors.recentReadings': 'Recent Readings',
    'plantations.detail.sensors.loadingReadings': 'Loading readings...',
    'plantations.detail.sensors.noReadings': 'No readings recorded',
    'plantations.detail.sensors.noReading': 'No reading',
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
    'monitoring.help.intro': 'Gauge colors adapt automatically based on the thresholds you have configured (minThreshold and maxThreshold). The optimal zone (green) is between these two thresholds. Each gauge uses a color system to quickly indicate the status of your sensors.',
    'monitoring.help.temperature.title': '🌡️ Temperature (0-50°C)',
    'monitoring.help.temperature.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Below the min threshold, the color transitions from blue (cold) to green. Above the max threshold, it becomes orange then red (too hot).',
    'monitoring.help.soilHumidity.title': '💧 Soil Humidity (0-100%)',
    'monitoring.help.soilHumidity.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Below the min threshold, the color changes to orange then red (too dry). Above the max threshold, it becomes orange then red (too wet).',
    'monitoring.help.co2.title': '🌬️ CO2 Rate (0-2500 ppm)',
    'monitoring.help.co2.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Below the min threshold, the color is blue-green (low). Above the max threshold, it becomes yellow then orange then red (dangerous level).',
    'monitoring.help.luminosity.title': '☀️ Luminosity (0-100000 lux)',
    'monitoring.help.luminosity.description': 'The optimal zone (green) is between your minimum and maximum thresholds. Below the min threshold, the color becomes blue-grey then dark blue (darkness). Above the max threshold, it becomes yellow then orange then red (extreme saturation).',
    'monitoring.help.waterLevel.title': '💧 Water Level (0-100%)',
    'monitoring.help.waterLevel.description': 'Red indicates a critical level (below the min threshold). Above the minimum threshold, the color progressively changes to orange, then green to indicate a sufficient level. The color gradient applies across the entire gauge height.',
    'monitoring.help.zones.optimal': 'Optimal zone',
    'monitoring.help.zones.warning': 'Warning zone',
    'monitoring.help.zones.danger': 'Danger zone',
    'monitoring.help.close': 'Close',
    'monitoring.inactiveSensors.title': 'Inactive sensors detected',
    'monitoring.inactiveSensors.message': 'sensor(s) have not sent data for more than 1 hour',
    'sensor.status.active': 'Active',
    'sensor.status.inactive': 'Inactive',
    'sensor.status.offline': 'Offline',
    'sensor.status.unknown': 'Unknown',
    'profile.back': 'Back',
    'profile.backToDashboard': 'Back to dashboard',
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
    'profile.readonlyMessage': 'This profile is read-only. Technicians cannot modify their information.',
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
    'guide.title': 'User Guide',
    'guide.subtitle': 'Discover how to use all CamerFarm AI features to optimize your smart agriculture.',
    'guide.tableOfContents.title': 'Table of Contents',
    'guide.tableOfContents.introduction': 'Introduction',
    'guide.tableOfContents.quickStart': 'Quick Start',
    'guide.tableOfContents.authentication': 'Authentication',
    'guide.tableOfContents.profile': 'User Profile',
    'guide.tableOfContents.plantations': 'Plantations',
    'guide.tableOfContents.monitoring': 'Monitoring',
    'guide.tableOfContents.graphs': 'Graphs',
    'guide.tableOfContents.notifications': 'Notifications',
    'guide.tableOfContents.ai': 'AI Chatbot',
    'guide.tableOfContents.language': 'Multilingual',
    'guide.introduction.title': 'Introduction',
    'guide.introduction.description': 'CamerFarm AI is an intelligent platform designed to modernize Cameroonian agriculture. This application allows you to monitor your crops in real-time through IoT and artificial intelligence.',
    'guide.introduction.feature1': 'Real-time monitoring of your plantation conditions',
    'guide.introduction.feature2': 'Automatic control of equipment (irrigation, ventilation, lighting)',
    'guide.introduction.feature3': 'Historical data analysis with interactive charts',
    'guide.introduction.feature4': 'AI assistant for personalized agricultural advice',
    'guide.quickStart.title': 'Quick Start',
    'guide.quickStart.signup.title': 'Create an Account',
    'guide.quickStart.signup.step1': 'Click on "Sign Up" in the navigation menu or on the home page',
    'guide.quickStart.signup.step2': 'Fill out the form with your information: name, first name, email, phone, and password',
    'guide.quickStart.signup.step3': 'Make sure your password meets security criteria (at least 6 characters, uppercase, lowercase, number, and special character)',
    'guide.quickStart.signup.step4': 'Click on "Sign Up" to create your account',
    'guide.quickStart.login.title': 'Log In',
    'guide.quickStart.login.step1': 'Access the login page via the menu or the "Log In" link',
    'guide.quickStart.login.step2': 'Enter your email or phone number and password',
    'guide.quickStart.login.step3': 'If you have enabled two-factor authentication (2FA), enter the verification code after logging in',
    'guide.auth.title': 'Authentication',
    'guide.auth.twoFactor.title': 'Two-Factor Authentication (2FA)',
    'guide.auth.twoFactor.description': 'Two-factor authentication adds an extra layer of security to your account. After entering your password, you will also need to provide a verification code generated by an authentication app.',
    'guide.auth.twoFactor.step1': 'Log in to your account and access your profile',
    'guide.auth.twoFactor.step2': 'In the "Two-Factor Authentication" section, click on "Enable 2FA"',
    'guide.auth.twoFactor.step3': 'Scan the QR code with an authentication app (Google Authenticator, Authy, Microsoft Authenticator, etc.)',
    'guide.auth.twoFactor.step4': 'Enter the 6-digit verification code generated by the app to confirm activation',
    'guide.auth.twoFactor.tip': 'Tip: Keep a backup copy of your QR code in a safe place. If you lose access to your authentication app, you can reactivate 2FA with this code.',
    'guide.profile.title': 'User Profile Management',
    'guide.profile.edit.title': 'Edit Personal Information',
    'guide.profile.edit.step1': 'Access your profile by clicking on "Profile" in the navigation menu',
    'guide.profile.edit.step2': 'Click on the "Edit" button to enable edit mode',
    'guide.profile.edit.step3': 'Modify the desired fields: first name, last name, phone, or preferred language',
    'guide.profile.edit.step4': 'Click on "Save" to save your changes or "Cancel" to go back',
    'guide.profile.photo.title': 'Change Profile Photo',
    'guide.profile.photo.step1': 'In the profile photo section, click on the camera icon or the current photo',
    'guide.profile.photo.step2': 'Select an image from your device (accepted formats: JPG, PNG, maximum size: 5MB)',
    'guide.profile.photo.step3': 'The image will be automatically uploaded and displayed as your new profile photo',
    'guide.plantations.title': 'Plantation Management',
    'guide.plantations.create.title': 'Create a New Plantation',
    'guide.plantations.create.step1': 'Access the "Plantations" page from the navigation menu',
    'guide.plantations.create.step2': 'Click on the "Create Plantation" button',
    'guide.plantations.create.step3': 'Fill out the form with your plantation information: name, location, area, crop type, and GPS coordinates (optional)',
    'guide.plantations.create.step4': 'Click on "Next" then "Create" to finalize the creation of your plantation',
    'guide.plantations.view.title': 'View and Manage Plantations',
    'guide.plantations.view.description': 'The plantations page displays all your plantations with their main information. You can:',
    'guide.plantations.view.feature1': 'View details of each plantation by clicking on "View Details"',
    'guide.plantations.view.feature2': 'Quickly access monitoring and graphs from the details page',
    'guide.plantations.view.feature3': 'See the number of sensors and actuators assigned to each plantation',
    'guide.monitoring.title': 'Real-Time Monitoring',
    'guide.monitoring.description': 'The monitoring page allows you to track in real-time the conditions of your plantation through IoT sensor data.',
    'guide.monitoring.sensors.title': 'Sensor Types',
    'guide.monitoring.sensors.description': 'CamerFarm AI supports several types of sensors to monitor different conditions:',
    'guide.monitoring.sensors.temperature': 'Temperature: Measures ambient temperature (0-50°C) with color visual indicator',
    'guide.monitoring.sensors.soilHumidity': 'Soil Humidity: Measures soil moisture percentage (0-100%) with animated progress bar',
    'guide.monitoring.sensors.co2': 'CO₂ Level: Measures carbon dioxide concentration (0-2500 ppm) with air quality indicators',
    'guide.monitoring.sensors.waterLevel': 'Water Level: Displays water level in the tank with 3D animation',
    'guide.monitoring.sensors.luminosity': 'Luminosity: Measures light intensity with dynamic glow effect',
    'guide.monitoring.thresholds.title': 'Threshold Configuration',
    'guide.monitoring.thresholds.description': 'You can customize alert thresholds for each sensor to receive notifications when values fall outside optimal ranges.',
    'guide.monitoring.thresholds.step1': 'On the monitoring page, locate the sensor for which you want to modify thresholds',
    'guide.monitoring.thresholds.step2': 'Click on the edit icon next to min/max thresholds',
    'guide.monitoring.thresholds.step3': 'Enter the new values (max threshold must be greater than min threshold) and click "Save"',
    'guide.monitoring.actuators.title': 'Actuator Control',
    'guide.monitoring.actuators.description': 'Actuators allow automatic or manual control of your plantation equipment:',
    'guide.monitoring.actuators.irrigation': 'Irrigation Pump: Activates/deactivates automatic watering',
    'guide.monitoring.actuators.fans': 'Fans: Controls ventilation to regulate temperature',
    'guide.monitoring.actuators.lighting': 'Lighting: Manages artificial lighting for greenhouse crops',
    'guide.graphs.title': 'Graphs and Statistics',
    'guide.graphs.description': 'The graphs page allows you to analyze the evolution of your sensor data over different periods.',
    'guide.graphs.filters.title': 'Using Filters',
    'guide.graphs.filters.step1': 'Select a plantation from the dropdown list if you have multiple plantations',
    'guide.graphs.filters.step2': 'Choose a date range using the "Start Date" and "End Date" selectors',
    'guide.graphs.filters.step3': 'Click on "Apply Filter" to load the corresponding data',
    'guide.graphs.sensors.title': 'Sensor Selection',
    'guide.graphs.sensors.description': 'You can enable or disable the display of each sensor type by checking/unchecking the corresponding boxes. Charts update automatically.',
    'guide.notifications.title': 'Notification System',
    'guide.notifications.description': 'Notifications alert you in real-time of important events related to your plantations and sensors.',
    'guide.notifications.management.title': 'Manage Notifications',
    'guide.notifications.management.step1': 'Access notifications by clicking on the bell icon in the header (the badge indicates the number of unread notifications)',
    'guide.notifications.management.step2': 'Mark a notification as read by clicking on it, or delete it with the delete button',
    'guide.notifications.management.step3': 'Notifications are automatically refreshed every 45 seconds to display the latest alerts',
    'guide.ai.title': 'AI Chatbot',
    'guide.ai.description': 'CamerFarm AI\'s AI assistant provides you with personalized agricultural advice in real-time. It can answer your questions about agriculture, irrigation, plant diseases, and much more.',
    'guide.ai.usage.title': 'Using the Chatbot',
    'guide.ai.usage.step1': 'Access the "AI" page from the navigation menu or click on the floating button at the bottom right',
    'guide.ai.usage.step2': 'Type your question in the input field at the bottom of the chatbox',
    'guide.ai.usage.step3': 'Press "Send" or Enter key to send your question. The AI assistant will respond with detailed advice',
    'guide.ai.tip': 'Tip: The chatbot supports multiple languages (French, English, Fulfulde, Ewondo). You can ask your questions in your preferred language.',
    'guide.language.title': 'Language Change',
    'guide.language.description': 'CamerFarm AI supports 4 languages to make the application accessible to all Cameroonian users.',
    'guide.language.step1': 'Click on the language selector in the header (globe icon)',
    'guide.language.step2': 'Select your preferred language from the available options',
    'guide.language.step3': 'The interface will update immediately in the selected language',
    'guide.language.option1': 'French: Official language of Cameroon',
    'guide.language.option2': 'English: For English-speaking users',
    'guide.language.option3': 'Fulfulde: Local language of northern Cameroon',
    'guide.language.option4': 'Ewondo: Local language of central and southern Cameroon',
  },
  ff: {
    'nav.home': 'Fuɗɗo',
    'nav.support': 'Wallitorde',
    'nav.monitoring': 'Jokkondiral',
    'nav.graphs': 'Giraafuuji',
    'nav.plantations': 'Nguurndam',
    'nav.ai': 'AI',
    'nav.guide': 'Jangirde',
    'nav.technician': 'Dashboard',
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
    'plantations.detail.sensors.readingsHistory': 'Jokkondiral keɓe',
    'plantations.detail.sensors.recentReadings': 'Keɓe sakkitiɗe',
    'plantations.detail.sensors.loadingReadings': 'Jokkondir keɓe...',
    'plantations.detail.sensors.noReadings': 'Alaa keɓe binndaaɗe',
    'plantations.detail.sensors.noReading': 'Alaa jokkondiral',
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
    'monitoring.help.intro': 'Kulooruuji jokkondirɗe ɓeydiraa e hoore maɓɓe no fuɗɗiiɗe señoluuji maa (señol woɗnde e señol ɓurnde). Nokkuure moƴƴude (wuɗɗo) woni hakkunde señoluuji ɗiɗi ɗen. Jokkondir kala huutortoo e noone kulooruuji ngam hollude e sahaa nokkuure jokkondirɗe maa.',
    'monitoring.help.temperature.title': '🌡️ Temperatuur (0-50°C)',
    'monitoring.help.temperature.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ley nder señol woɗnde, kulooru ɓeydiraa e bulaawal (ɓulɓulɗe) haa wuɗɗo. E dow señol ɓurnde, naatiraa ñiiɓɓo rewo boɗɗo (ɓeydugol ɓurɗe).',
    'monitoring.help.soilHumidity.title': '💧 Ɓuɓɓe Leyɗe (0-100%)',
    'monitoring.help.soilHumidity.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ley nder señol woɗnde, kulooru naatiraa ñiiɓɓo rewo boɗɗo (ɓeydugol ɓurɗe). E dow señol ɓurnde, naatiraa ñiiɓɓo rewo boɗɗo (ɓuɓɓe ɓurɗe).',
    'monitoring.help.co2.title': '🌬️ Nder CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ley nder señol woɗnde, kulooru woni bulaawal-wuɗɗo (woɗɗude). E dow señol ɓurnde, naatiraa jaasi rewo ñiiɓɓo rewo boɗɗo (nokkuure meɗɗe).',
    'monitoring.help.luminosity.title': '☀️ Ndaariɗe (0-100000 lux)',
    'monitoring.help.luminosity.description': 'Nokkuure moƴƴude (wuɗɗo) woni hakkunde señol woɗnde maa e ɓurnde. Ley nder señol woɗnde, kulooru naatiraa bulaawal-ɓuɓɓe rewo bulaawal ñuulɗe (ñuulɗe). E dow señol ɓurnde, naatiraa jaasi rewo ñiiɓɓo rewo boɗɗo (ɓeydugol ɓurɗe).',
    'monitoring.help.waterLevel.title': '💧 Nder Leyɗe (0-100%)',
    'monitoring.help.waterLevel.description': 'Boɗɗo hollataa nokkuure meɗɗe (ley nder señol woɗnde). E dow señol woɗnde, kulooru ɓeydiraa e jaasi e ñiiɓɓo, rewo wuɗɗo ngam hollude nokkuure ɓurɗo. Gradient kulooru naatiraa e dow jokkondiral fof.',
    'monitoring.help.zones.optimal': 'Nokkuure moƴƴude',
    'monitoring.help.zones.warning': 'Nokkuure tintine',
    'monitoring.help.zones.danger': 'Nokkuure meɗɗe',
    'monitoring.help.close': 'Uddu',
    'monitoring.inactiveSensors.title': 'Jokkondirɗe ɓe alaa kuuɗe',
    'monitoring.inactiveSensors.message': 'jokkondirɗe ɓe ndaɓɓaani dataa ɓurɗe nder sahaa 1',
    'sensor.status.active': 'Kuuɗe',
    'sensor.status.inactive': 'Alaa kuuɗe',
    'sensor.status.offline': 'Alaa jokkondirɗo',
    'sensor.status.unknown': 'Anndaa',
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
    'profile.backToDashboard': 'Rutto e dashboard',
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
    'profile.readonlyMessage': 'Jokkondiral ngal no foti tan ko jokkondiral. Kuutowɓe ɓe hokkataa ɓeydugol keɓe maɓɓe.',
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
    'guide.title': 'Jangirde Kuutoraade',
    'guide.subtitle': 'Ɓeydu no kuutoraade kala ɓeyngu CamerFarm AI ngam ɓeydude nguurndam maa ngam anndude.',
    'guide.tableOfContents.title': 'Tirde Alkawal',
    'guide.tableOfContents.introduction': 'Fuɗɗorde',
    'guide.tableOfContents.quickStart': 'Fuɗɗo Cawɗo',
    'guide.tableOfContents.authentication': 'Tiimtinde',
    'guide.tableOfContents.profile': 'Jokkondiral Kuutoro',
    'guide.tableOfContents.plantations': 'Nguurndam',
    'guide.tableOfContents.monitoring': 'Jokkondiral',
    'guide.tableOfContents.graphs': 'Giraafuuji',
    'guide.tableOfContents.notifications': 'Tintine',
    'guide.tableOfContents.ai': 'AI Jokkondiral',
    'guide.tableOfContents.language': 'Ɗiɗɗo Ɓasde',
    'guide.introduction.title': 'Fuɗɗorde',
    'guide.introduction.description': 'CamerFarm AI ko platform anndal ngol ngam ɓeydude nguurndam Kameruun. Ndee app ina waawi jokkondirde nguurndam maa e nder wakati goonga e IoT e anndal.',
    'guide.introduction.feature1': 'Jokkondiral wakati goonga ngam nguurndam maa',
    'guide.introduction.feature2': 'Laamngo otomatik ngam ɓeynguuji (irrigation, ventilation, lighting)',
    'guide.introduction.feature3': 'Ɓeydude keɓe taariikhi e giraafuuji',
    'guide.introduction.feature4': 'Jokkondiral AI ngam laawol nguurndam',
    'guide.quickStart.title': 'Fuɗɗo Cawɗo',
    'guide.quickStart.signup.title': 'Waɗtu Kontu',
    'guide.quickStart.signup.step1': 'Dobo "Winndito" e menu walla e hello fuɗɗorde',
    'guide.quickStart.signup.step2': 'Hulno formo e keɓe maa: innde, innde fuɗɗorde, email, telefon e finnde',
    'guide.quickStart.signup.step3': 'Ƴeewto finnde maa ina heɓi keɓe kisal (kalaa 6 karaktere, mawnɗe, ɓaŋnguɗe, limoore e karaktere jaɓɓo)',
    'guide.quickStart.signup.step4': 'Dobo "Winndito" ngam waɗde kontu maa',
    'guide.quickStart.login.title': 'Seŋo',
    'guide.quickStart.login.step1': 'Yah e hello seŋo e menu walla jokkol "Seŋo"',
    'guide.quickStart.login.step2': 'Naatu email maa walla telefon e finnde maa',
    'guide.quickStart.login.step3': 'So a waɗi 2FA, naatu koode tiimtinde ɓaawo seŋo',
    'guide.auth.title': 'Tiimtinde',
    'guide.auth.twoFactor.title': 'Tiimtinde Ɗiɗɗo (2FA)',
    'guide.auth.twoFactor.description': '2FA ɓeyda kisal e kontu maa. Ɓaawo naatude finnde, a foti naatude koode tiimtinde e app.',
    'guide.auth.twoFactor.step1': 'Seŋo e kontu maa e yah e jokkondiral maa',
    'guide.auth.twoFactor.step2': 'E "Tiimtinde Ɗiɗɗo", dobo "Waɗtu 2FA"',
    'guide.auth.twoFactor.step3': 'Dobo koode QR e app tiimtinde (Google Authenticator, Authy, etc.)',
    'guide.auth.twoFactor.step4': 'Naatu koode 6 limoore ngam tiimtinde waɗde',
    'guide.auth.twoFactor.tip': 'Laawol: Danndu koode QR maa e nokkuure kisal. So a ɓeewi app maa, a waawi waɗde 2FA e koode oo.',
    'guide.profile.title': 'Laamngo Jokkondiral Kuutoro',
    'guide.profile.edit.title': 'Waylu Keɓe Kuutoro',
    'guide.profile.edit.step1': 'Yah e jokkondiral maa e dobo "Jokkondiral" e menu',
    'guide.profile.edit.step2': 'Dobo "Waylu" ngam waɗde waylude',
    'guide.profile.edit.step3': 'Waylu keɓe: innde fuɗɗorde, innde, telefon walla ɗemngal',
    'guide.profile.edit.step4': 'Dobo "Danndu" ngam danndude walla "Haaytu" ngam rutto',
    'guide.profile.photo.title': 'Waylu Foto Jokkondiral',
    'guide.profile.photo.step1': 'E foto jokkondiral, dobo ikon kamera walla foto jooni',
    'guide.profile.photo.step2': 'Labo njaajeende e ɓeyngu maa (JPG, PNG, mawnɗe: 5MB)',
    'guide.profile.photo.step3': 'Njaajeende ina danndoto otomatik e holloto e foto jokkondiral',
    'guide.plantations.title': 'Laamngo Nguurndam',
    'guide.plantations.create.title': 'Waɗtu Nguurndam Hesɗo',
    'guide.plantations.create.step1': 'Yah e hello "Nguurndam" e menu',
    'guide.plantations.create.step2': 'Dobo "Waɗtu Nguurndam"',
    'guide.plantations.create.step3': 'Hulno formo e keɓe nguurndam: innde, nokkuure, nguurndam, fannu nguurndam e GPS (jaɓɓo)',
    'guide.plantations.create.step4': 'Dobo "Jokkuɓe" e "Waɗtu" ngam waɗde nguurndam',
    'guide.plantations.view.title': 'Yiyde e Laamngo Nguurndam',
    'guide.plantations.view.description': 'Hello nguurndam hollata nguurndam maa fof e keɓe maɓɓe. A waawi:',
    'guide.plantations.view.feature1': 'Yiyde keɓe nguurndam kala e dobo "Yiyde Keɓe"',
    'guide.plantations.view.feature2': 'Yah cawɗo e jokkondiral e giraafuuji e hello keɓe',
    'guide.plantations.view.feature3': 'Yiyde limoore keɓe e ɓeynguuji e nguurndam kala',
    'guide.monitoring.title': 'Jokkondiral Wakati Goonga',
    'guide.monitoring.description': 'Hello jokkondiral ina waawi jokkondirde nguurndam maa e wakati goonga e keɓe IoT.',
    'guide.monitoring.sensors.title': 'Fannuuji Keɓe',
    'guide.monitoring.sensors.description': 'CamerFarm AI ina walla fannuuji keɓe ɗuuɗɗe ngam jokkondirde keɓe:',
    'guide.monitoring.sensors.temperature': 'Temperatuur: Jokkondira temperatuur (0-50°C) e hollirde',
    'guide.monitoring.sensors.soilHumidity': 'Ɓuɓɓe Leyɗe: Jokkondira ɓuɓɓe leydi (0-100%) e barre',
    'guide.monitoring.sensors.co2': 'Nder CO2: Jokkondira CO2 (0-2500 ppm) e hollirde',
    'guide.monitoring.sensors.waterLevel': 'Nder Leyɗe: Hollira nder leydi e tank e animation 3D',
    'guide.monitoring.sensors.luminosity': 'Ndaariɗe: Jokkondira ndaariɗe e ɓeyngu',
    'guide.monitoring.thresholds.title': 'Laamngo Señoluuji',
    'guide.monitoring.thresholds.description': 'A waawi waylude señoluuji ngam keɓe kala ngam heɓde tintine so keɓe ɓeewi e limoore moƴƴude.',
    'guide.monitoring.thresholds.step1': 'E hello jokkondiral, yiytu keɓe ngam waylude señoluuji',
    'guide.monitoring.thresholds.step2': 'Dobo ikon waylude e señoluuji min/max',
    'guide.monitoring.thresholds.step3': 'Naatu keɓe hesɗi (max ina foti mawnɗo e min) e dobo "Danndu"',
    'guide.monitoring.actuators.title': 'Laamngo Ɓeynguuji',
    'guide.monitoring.actuators.description': 'Ɓeynguuji ina waawi laamngo otomatik walla laamngo kuutoro ngam ɓeynguuji nguurndam maa:',
    'guide.monitoring.actuators.irrigation': 'Pompe Irrigation: Waɗta/ɓeewta irrigation otomatik',
    'guide.monitoring.actuators.fans': 'Ventilateurs: Laamngo ventilation ngam laamngo temperatuur',
    'guide.monitoring.actuators.lighting': 'Lighting: Laamngo lighting ngam nguurndam e serre',
    'guide.graphs.title': 'Giraafuuji e Statistiques',
    'guide.graphs.description': 'Hello giraafuuji ina waawi ɓeydude keɓe keɓe maa e wakati ɗuuɗɗe.',
    'guide.graphs.filters.title': 'Kuutoraade Filtres',
    'guide.graphs.filters.step1': 'Labo nguurndam e liste so a jogii ɗuuɗɗe',
    'guide.graphs.filters.step2': 'Labo wakati e "Fuɗɗo Wakati" e "Gila Wakati"',
    'guide.graphs.filters.step3': 'Dobo "Waɗtu Filtre" ngam ɓeydude keɓe',
    'guide.graphs.sensors.title': 'Labo Keɓe',
    'guide.graphs.sensors.description': 'A waawi waɗde walla ɓeewde hollirde fannu keɓe kala e dobo. Giraafuuji ina ɓeydoto otomatik.',
    'guide.notifications.title': 'Sistem Tintine',
    'guide.notifications.description': 'Tintine ina tintina maa e wakati goonga ngam ɓeynguuji nguurndam maa e keɓe.',
    'guide.notifications.management.title': 'Laamngo Tintine',
    'guide.notifications.management.step1': 'Yah e tintine e dobo ikon tintine e header (badge hollira limoore tintine ɓeewɗe)',
    'guide.notifications.management.step2': 'Maarke tintine e dobo walla mbatu e dobo mbatu',
    'guide.notifications.management.step3': 'Tintine ina ɓeydoto otomatik e kala 45 sekonde ngam hollirde tintine hesɗi',
    'guide.ai.title': 'AI Jokkondiral',
    'guide.ai.description': 'Jokkondiral AI CamerFarm AI ina hokki laawol nguurndam e wakati goonga. Ina waawi jaabde laawol maa e nguurndam, irrigation, koɓe nguurndam, e ɗuuɗɗe.',
    'guide.ai.usage.title': 'Kuutoraade Jokkondiral',
    'guide.ai.usage.step1': 'Yah e hello "AI" e menu walla dobo buton e nder les',
    'guide.ai.usage.step2': 'Winndu laawol maa e nder input e les hello',
    'guide.ai.usage.step3': 'Dobo "Neldu" walla Enter ngam nelde laawol. Jokkondiral AI ina jaabde e laawol',
    'guide.ai.tip': 'Laawol: Jokkondiral ina walla ɗiɗɗo ɓasde (Faransinkoore, Inngilinkoore, Fulfulde, Ewondo). A waawi laawol maa e ɗemngal maa.',
    'guide.language.title': 'Waylu Ɗemngal',
    'guide.language.description': 'CamerFarm AI ina walla ɗiɗɗo ɓasde ngam waɗde app e kuutoro Kameruun fof.',
    'guide.language.step1': 'Dobo labo ɗemngal e header (ikon globe)',
    'guide.language.step2': 'Labo ɗemngal maa e ɓeynguuji',
    'guide.language.step3': 'Interface ina ɓeydoto cawɗo e ɗemngal labɗo',
    'guide.language.option1': 'Faransinkoore: Ɗemngal jaɓɓo Kameruun',
    'guide.language.option2': 'Inngilinkoore: Ngam kuutoroje Inngilinkoore',
    'guide.language.option3': 'Fulfulde: Ɗemngal nokkuure worgo Kameruun',
    'guide.language.option4': 'Ewondo: Ɗemngal nokkuure caka e les Kameruun',
  },
  ew: {
    'nav.home': 'Ndé',
    'nav.support': 'Nsámbí',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Bisó',
    'nav.ai': 'AI',
    'nav.guide': 'Guide',
    'nav.technician': 'Tableau de bord',
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
    'monitoring.help.intro': 'Couleurs jauges s\'adaptent automatiquement selon seuils wá configurés (seuilMin é seuilMax). Zone optimale (verte) situe entre seuils ékpé. Chaque jauge utilise système couleurs indiquer rapidement état capteurs wá.',
    'monitoring.help.temperature.title': '🌡️ Mvú (0-50°C)',
    'monitoring.help.temperature.description': 'Zone optimale (verte) situe entre seuil minimum é maximum. En dessous seuil min, couleur transitionne bleu (froid) vers vert. Au-dessus seuil max, devient orange puis rouge (trop chaud).',
    'monitoring.help.soilHumidity.title': '💧 Mvú bisó (0-100%)',
    'monitoring.help.soilHumidity.description': 'Zone optimale (verte) situe entre seuil minimum é maximum. En dessous seuil min, couleur passe orange puis rouge (trop sec). Au-dessus seuil max, devient orange puis rouge (trop humide).',
    'monitoring.help.co2.title': '🌬️ Taux CO2 (0-2500 ppm)',
    'monitoring.help.co2.description': 'Zone optimale (verte) situe entre seuil minimum é maximum. En dessous seuil min, couleur bleu-vert (faible). Au-dessus seuil max, devient jaune puis orange puis rouge (niveau dangereux).',
    'monitoring.help.luminosity.title': '☀️ Nsámbí (0-100000 lux)',
    'monitoring.help.luminosity.description': 'Zone optimale (verte) trouve entre seuil minimum é maximum. En dessous seuil min, couleur devient bleu-gris puis bleu foncé (obscurité). Au-dessus seuil max, devient jaune puis orange puis rouge (saturation extrême).',
    'monitoring.help.waterLevel.title': '💧 Niveau mán (0-100%)',
    'monitoring.help.waterLevel.description': 'Rouge indique niveau critique (en dessous seuil min). Au-dessus seuil minimum, couleur passe progressivement orange, puis vert indiquer niveau suffisant. Gradient couleur applique sur toute hauteur jauge.',
    'monitoring.help.zones.optimal': 'Zone optimale',
    'monitoring.help.zones.warning': 'Zone avertissement',
    'monitoring.help.zones.danger': 'Zone danger',
    'monitoring.help.close': 'Fermer',
    'monitoring.inactiveSensors.title': 'Capteurs inactifs détectés',
    'monitoring.inactiveSensors.message': 'capteur(s) n\'ont pas envoyé de données depuis plus d\'1 heure',
    'sensor.status.active': 'Actif',
    'sensor.status.inactive': 'Inactif',
    'sensor.status.offline': 'Hors ligne',
    'sensor.status.unknown': 'Inconnu',
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
    'plantations.detail.sensors.readingsHistory': 'Historique valeurs',
    'plantations.detail.sensors.recentReadings': 'Valeurs récentes',
    'plantations.detail.sensors.loadingReadings': 'Chargement valeurs...',
    'plantations.detail.sensors.noReadings': 'Alé valeurs enregistrées',
    'plantations.detail.sensors.noReading': 'Alé lecture',
    'plantations.detail.errors.invalidId': 'ID plantation invalide',
    'plantations.detail.errors.fetchFailed': 'Alé charger détails plantation.',
    'plantations.detail.errors.notFound': 'Plantation non trouvée',
    'profile.back': 'Bwá',
    'profile.backToDashboard': 'Bwá dashboard',
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
    'profile.readonlyMessage': 'Profil lecture seule. Techniciens ne peuvent pas modifier informations.',
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
    'guide.title': 'Guide utilisation',
    'guide.subtitle': 'Fón no kuutoraade kala ɓeyngu CamerFarm AI ngam ɓeydude bisó wá mán.',
    'guide.tableOfContents.title': 'Tirde Alkawal',
    'guide.tableOfContents.introduction': 'Fuɗɗorde',
    'guide.tableOfContents.quickStart': 'Fuɗɗo Cawɗo',
    'guide.tableOfContents.authentication': 'Tiimtinde',
    'guide.tableOfContents.profile': 'Profil utilisateur',
    'guide.tableOfContents.plantations': 'Bisó',
    'guide.tableOfContents.monitoring': 'Monitoring',
    'guide.tableOfContents.graphs': 'Graphiques',
    'guide.tableOfContents.notifications': 'Notifications',
    'guide.tableOfContents.ai': 'AI Chatbot',
    'guide.tableOfContents.language': 'Multilingue',
    'guide.introduction.title': 'Fuɗɗorde',
    'guide.introduction.description': 'CamerFarm AI ko platform mán ngam ɓeydude bisó camerounaise. App wá bwá jokkondirde bisó wá e wakati goonga e IoT é AI.',
    'guide.introduction.feature1': 'Jokkondiral wakati goonga ngam bisó wá',
    'guide.introduction.feature2': 'Laamngo otomatik ngam ɓeynguuji (irrigation, ventilation, éclairage)',
    'guide.introduction.feature3': 'Ɓeydude keɓe taariikhi e graphiques',
    'guide.introduction.feature4': 'Jokkondiral AI ngam laawol bisó',
    'guide.quickStart.title': 'Fuɗɗo Cawɗo',
    'guide.quickStart.signup.title': 'Sígní kontó',
    'guide.quickStart.signup.step1': 'Dobo "Sígní" e menu walla e hello fuɗɗorde',
    'guide.quickStart.signup.step2': 'Hulno formo e keɓe wá: innde, innde fuɗɗorde, email, téléphone é mótí',
    'guide.quickStart.signup.step3': 'Ƴeewto mótí wá ina heɓi keɓe kisal (kalaa 6 caractères, majuscule, minuscule, chiffre é caractère spécial)',
    'guide.quickStart.signup.step4': 'Dobo "Sígní" ngam sígní kontó wá',
    'guide.quickStart.login.title': 'Kómbí',
    'guide.quickStart.login.step1': 'Yah e hello kómbí e menu walla jokkol "Kómbí"',
    'guide.quickStart.login.step2': 'Naatu email wá walla téléphone é mótí wá',
    'guide.quickStart.login.step3': 'So wá waɗi 2FA, naatu kóde vérification ɓaawo kómbí',
    'guide.auth.title': 'Tiimtinde',
    'guide.auth.twoFactor.title': 'Tiimtinde Ɗiɗɗo (2FA)',
    'guide.auth.twoFactor.description': '2FA ɓeyda kisal e kontó wá. Ɓaawo naatude mótí, wá foti naatude kóde vérification e app.',
    'guide.auth.twoFactor.step1': 'Kómbí e kontó wá é yah e profil wá',
    'guide.auth.twoFactor.step2': 'E "Tiimtinde Ɗiɗɗo", dobo "Activer 2FA"',
    'guide.auth.twoFactor.step3': 'Dobo kóde QR e app vérification (Google Authenticator, Authy, etc.)',
    'guide.auth.twoFactor.step4': 'Naatu kóde 6 chiffres ngam tiimtinde activation',
    'guide.auth.twoFactor.tip': 'Laawol: Danndu kóde QR wá e nokkuure kisal. So wá ɓeewi app wá, wá waawi waɗde 2FA e kóde oo.',
    'guide.profile.title': 'Laamngo Profil utilisateur',
    'guide.profile.edit.title': 'Waylu Keɓe utilisateur',
    'guide.profile.edit.step1': 'Yah e profil wá e dobo "Profil" e menu',
    'guide.profile.edit.step2': 'Dobo "Modifier" ngam waɗde waylude',
    'guide.profile.edit.step3': 'Waylu keɓe: prénom, nom, téléphone walla langue',
    'guide.profile.edit.step4': 'Dobo "Enregistrer" ngam danndude walla "Annuler" ngam rutto',
    'guide.profile.photo.title': 'Waylu Foto Profil',
    'guide.profile.photo.step1': 'E foto profil, dobo ikon caméra walla foto jooni',
    'guide.profile.photo.step2': 'Labo image e ɓeyngu wá (JPG, PNG, mawnɗe: 5MB)',
    'guide.profile.photo.step3': 'Image ina danndoto otomatik é holloto e foto profil',
    'guide.plantations.title': 'Laamngo Bisó',
    'guide.plantations.create.title': 'Sígní Bisó Hesɗo',
    'guide.plantations.create.step1': 'Yah e hello "Bisó" e menu',
    'guide.plantations.create.step2': 'Dobo "Sígní bisó"',
    'guide.plantations.create.step3': 'Hulno formo e keɓe bisó: nom, localisation, superficie, type culture é GPS (optionnel)',
    'guide.plantations.create.step4': 'Dobo "Suivant" é "Créer" ngam sígní bisó',
    'guide.plantations.view.title': 'Fón é Laamngo Bisó',
    'guide.plantations.view.description': 'Hello bisó hollata bisó wá fof e keɓe maɓɓe. Wá waawi:',
    'guide.plantations.view.feature1': 'Fón détails bisó kala e dobo "Fón détails"',
    'guide.plantations.view.feature2': 'Yah cawɗo e monitoring é graphiques e hello détails',
    'guide.plantations.view.feature3': 'Fón limoore capteurs é actionneurs e bisó kala',
    'guide.monitoring.title': 'Monitoring Wakati Goonga',
    'guide.monitoring.description': 'Hello monitoring bwá jokkondirde bisó wá e wakati goonga e keɓe IoT.',
    'guide.monitoring.sensors.title': 'Fannuuji Capteurs',
    'guide.monitoring.sensors.description': 'CamerFarm AI walla fannuuji capteurs ɗuuɗɗe ngam jokkondirde keɓe:',
    'guide.monitoring.sensors.temperature': 'Température: Jokkondira température (0-50°C) e indicateur',
    'guide.monitoring.sensors.soilHumidity': 'Humidité sol: Jokkondira humidité sol (0-100%) e barre',
    'guide.monitoring.sensors.co2': 'Niveau CO2: Jokkondira CO2 (0-2500 ppm) e indicateurs',
    'guide.monitoring.sensors.waterLevel': 'Niveau eau: Hollira niveau eau e réservoir e animation 3D',
    'guide.monitoring.sensors.luminosity': 'Luminosité: Jokkondira luminosité e effet',
    'guide.monitoring.thresholds.title': 'Laamngo Seuils',
    'guide.monitoring.thresholds.description': 'Wá waawi waylude seuils ngam capteurs kala ngam heɓde notifications so keɓe ɓeewi e plage optimal.',
    'guide.monitoring.thresholds.step1': 'E hello monitoring, yiytu capteur ngam waylude seuils',
    'guide.monitoring.thresholds.step2': 'Dobo ikon édition e seuils min/max',
    'guide.monitoring.thresholds.step3': 'Naatu keɓe hesɗi (max ina foti mawnɗo e min) é dobo "Enregistrer"',
    'guide.monitoring.actuators.title': 'Laamngo Actionneurs',
    'guide.monitoring.actuators.description': 'Actionneurs walla laamngo otomatik walla manuel ngam ɓeynguuji bisó wá:',
    'guide.monitoring.actuators.irrigation': 'Pompe irrigation: Active/désactive irrigation otomatik',
    'guide.monitoring.actuators.fans': 'Ventilateurs: Laamngo ventilation ngam réguler température',
    'guide.monitoring.actuators.lighting': 'Éclairage: Laamngo éclairage ngam cultures serre',
    'guide.graphs.title': 'Graphiques é Statistiques',
    'guide.graphs.description': 'Hello graphiques bwá ɓeydude keɓe capteurs wá e wakati ɗuuɗɗe.',
    'guide.graphs.filters.title': 'Kuutoraade Filtres',
    'guide.graphs.filters.step1': 'Labo bisó e liste so wá jogii ɗuuɗɗe',
    'guide.graphs.filters.step2': 'Labo wakati e "Date début" é "Date fin"',
    'guide.graphs.filters.step3': 'Dobo "Appliquer filtre" ngam ɓeydude keɓe',
    'guide.graphs.sensors.title': 'Labo Capteurs',
    'guide.graphs.sensors.description': 'Wá waawi activer walla désactiver hollirde fannu capteur kala e dobo. Graphiques ina ɓeydoto otomatik.',
    'guide.notifications.title': 'Sistem Notifications',
    'guide.notifications.description': 'Notifications tintina wá e wakati goonga ngam ɓeynguuji bisó wá é capteurs.',
    'guide.notifications.management.title': 'Laamngo Notifications',
    'guide.notifications.management.step1': 'Yah e notifications e dobo ikon cloche e header (badge hollira limoore notifications non lues)',
    'guide.notifications.management.step2': 'Marquer notification lue e dobo walla mbatu e dobo suppression',
    'guide.notifications.management.step3': 'Notifications ina ɓeydoto otomatik e kala 45 secondes ngam hollirde notifications hesɗi',
    'guide.ai.title': 'AI Chatbot',
    'guide.ai.description': 'Jokkondiral AI CamerFarm AI hokki laawol bisó e wakati goonga. Ina waawi jaabde laawol wá e bisó, irrigation, maladies plantes, é ɗuuɗɗe.',
    'guide.ai.usage.title': 'Kuutoraade Chatbot',
    'guide.ai.usage.step1': 'Yah e hello "AI" e menu walla dobo bouton flottant e nder les',
    'guide.ai.usage.step2': 'Winndu laawol wá e input e les chatbox',
    'guide.ai.usage.step3': 'Dobo "Envoyer" walla Enter ngam nelde laawol. Jokkondiral AI ina jaabde e laawol',
    'guide.ai.tip': 'Laawol: Chatbot walla ɗiɗɗo ɓasde (Français, English, Fulfulde, Ewondo). Wá waawi laawol wá e langue préférée.',
    'guide.language.title': 'Waylu Langue',
    'guide.language.description': 'CamerFarm AI walla 4 langues ngam waɗde app e kuutoro camerounais fof.',
    'guide.language.step1': 'Dobo sélecteur langue e header (ikon globe)',
    'guide.language.step2': 'Labo langue préférée e ɓeynguuji',
    'guide.language.step3': 'Interface ina ɓeydoto cawɗo e langue sélectionnée',
    'guide.language.option1': 'Français: Langue officielle Cameroun',
    'guide.language.option2': 'English: Ngam kuutoroje anglophones',
    'guide.language.option3': 'Fulfulde: Langue locale nord Cameroun',
    'guide.language.option4': 'Ewondo: Langue locale centre é sud Cameroun',
  },
};

export function getTranslation(key: TranslationKey, language: Language): string {
  const translation = translations[language]?.[key];
  return translation || key;
}
