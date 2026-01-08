import type { Language } from '@/contexts/LanguageContext';

export type TranslationKey = 
  | 'nav.home'
  | 'nav.support'
  | 'nav.monitoring'
  | 'nav.graphs'
  | 'nav.plantations'
  | 'nav.ai'
  | 'nav.guide'
  | 'nav.docs'
  | 'nav.privacy'
  | 'nav.terms'
  | 'nav.cookies'
  | 'nav.technician'
  | 'nav.admin'
  | 'auth.login'
  | 'auth.signup'
  | 'auth.logout'
  | 'auth.profile'
  | 'header.close'
  | 'header.menu'
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
  | 'login.accountDisabled.title'
  | 'login.accountDisabled.message'
  | 'login.accountDisabled.close'
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
  | 'forgotPassword.title'
  | 'forgotPassword.subtitle'
  | 'forgotPassword.emailLabel'
  | 'forgotPassword.emailPlaceholder'
  | 'forgotPassword.submitButton'
  | 'forgotPassword.submitting'
  | 'forgotPassword.successMessage'
  | 'forgotPassword.successHint'
  | 'forgotPassword.backToLogin'
  | 'forgotPassword.errors.emailRequired'
  | 'forgotPassword.errors.emailInvalid'
  | 'resetPassword.title'
  | 'resetPassword.subtitle'
  | 'resetPassword.newPasswordLabel'
  | 'resetPassword.newPasswordPlaceholder'
  | 'resetPassword.confirmPasswordLabel'
  | 'resetPassword.confirmPasswordPlaceholder'
  | 'resetPassword.submitButton'
  | 'resetPassword.submitting'
  | 'resetPassword.successMessage'
  | 'resetPassword.redirecting'
  | 'resetPassword.validation.title'
  | 'resetPassword.validation.minLength'
  | 'resetPassword.validation.hasUpperCase'
  | 'resetPassword.validation.hasLowerCase'
  | 'resetPassword.validation.hasNumber'
  | 'resetPassword.validation.hasSpecialChar'
  | 'resetPassword.errors.tokenMissing'
  | 'resetPassword.errors.tokenExpired'
  | 'resetPassword.errors.passwordMismatch'
  | 'resetPassword.errors.passwordInvalid'
  | 'resetPassword.errors.accountDisabled'
  | 'resetPassword.requestNewLink'
  | 'resetPassword.backToLogin'
  | 'signup.title'
  | 'signup.lastNameLabel'
  | 'signup.lastNamePlaceholder'
  | 'signup.firstNameLabel'
  | 'signup.firstNamePlaceholder'
  | 'signup.emailLabel'
  | 'signup.emailPlaceholder'
  | 'signup.emailHint'
  | 'signup.successMessage'
  | 'signup.successMessageWithEmail'
  | 'signup.redirecting'
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
  | 'notifications.pageTitle'
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
  | 'notifications.markAsRead'
  | 'notifications.confirmDelete'
  | 'notifications.plantation'
  | 'notifications.stats.title'
  | 'notifications.stats.total'
  | 'notifications.stats.envoyees'
  | 'notifications.stats.enAttente'
  | 'notifications.stats.erreurs'
  | 'notifications.stats.nonLues'
  | 'notifications.stats.parCanal'
  | 'notifications.stats.loading'
  | 'notifications.filters.all'
  | 'notifications.filters.web'
  | 'notifications.filters.email'
  | 'notifications.filters.unread'
  | 'notifications.canal.email'
  | 'notifications.canal.web'
  | 'notifications.canal.whatsapp'
  | 'notifications.status.envoyee'
  | 'notifications.status.enAttente'
  | 'notifications.status.erreur'
  | 'notifications.emailError.hint'
  | 'notifications.emailErrors.title'
  | 'notifications.emailErrors.message'
  | 'notifications.emailErrors.check1'
  | 'notifications.emailErrors.check2'
  | 'notifications.emailErrors.check3'
  | 'notifications.emailErrors.runDiagnostic'
  | 'notifications.emailErrors.dismiss'
  | 'notifications.deleteAll.button'
  | 'notifications.deleteAll.confirm'
  | 'notifications.deleteAll.deleting'
  | 'notifications.deleteAll.error'
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
  | 'technician.loading.stats'
  | 'technician.loading.farmers'
  | 'technician.loading.plantations'
  | 'technician.loading.details'
  | 'technician.stats.farmers'
  | 'technician.stats.plantations'
  | 'technician.stats.activeSensors'
  | 'technician.stats.actuators'
  | 'technician.search.placeholder'
  | 'technician.search.loading'
  | 'technician.section.farmers'
  | 'technician.section.plantations'
  | 'technician.empty.noFarmers'
  | 'technician.empty.noFarmersFound'
  | 'technician.empty.selectFarmer'
  | 'technician.details.sensors'
  | 'technician.details.actuators'
  | 'technician.details.locationNotSet'
  | 'technician.errors.loadData'
  | 'technician.errors.search'
  | 'technician.errors.loadPlantations'
  | 'technician.errors.loadDetails'
  | 'technician.retry'
  | 'technician.farmer.label'
  | 'technician.plantation.singular'
  | 'technician.plantation.plural'
  | 'technician.details.owner'
  | 'technician.details.activeCount'
  | 'technician.details.thresholds'
  | 'technician.details.noSensors'
  | 'technician.details.noActuators'
  | 'technician.details.manyInactiveSensors'
  | 'technician.details.selectPlantation'
  | 'technician.details.noPlantationsAvailable'
  | 'technician.details.lastUpdate'
  | 'technician.details.notAvailable'
  | 'technician.details.cropType'
  | 'technician.details.area'
  | 'technician.details.location'
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
  | 'profile.upload.success'
  | 'profile.errors.upload.fileMissing'
  | 'profile.errors.upload.invalidFormat'
  | 'profile.errors.upload.sessionExpired'
  | 'profile.errors.upload.userNotFound'
  | 'profile.errors.upload.serverError'
  | 'profile.errors.upload.networkError'
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
  | 'guide.language.option4'
  | 'docs.title'
  | 'docs.subtitle'
  | 'docs.tableOfContents'
  | 'docs.sections.introduction'
  | 'docs.sections.architecture'
  | 'docs.sections.services'
  | 'docs.sections.components'
  | 'docs.sections.hooks'
  | 'docs.sections.contexts'
  | 'docs.sections.pages'
  | 'docs.sections.api'
  | 'docs.sections.i18n'
  | 'docs.sections.utils'
  | 'docs.sections.devGuide'
  | 'docs.sections.deployment'
  | 'docs.introduction.overview.title'
  | 'docs.introduction.overview.content'
  | 'docs.introduction.tech.title'
  | 'docs.introduction.architecture.title'
  | 'docs.introduction.architecture.content'
  | 'docs.introduction.prerequisites.title'
  | 'docs.introduction.installation.title'
  | 'docs.architecture.structure.title'
  | 'docs.architecture.patterns.title'
  | 'docs.architecture.dataFlow.title'
  | 'docs.architecture.dataFlow.content'
  | 'docs.services.config.title'
  | 'docs.services.config.content'
  | 'docs.services.auth.title'
  | 'docs.services.auth.description'
  | 'docs.services.plantation.title'
  | 'docs.services.plantation.description'
  | 'docs.services.technician.title'
  | 'docs.services.technician.description'
  | 'docs.services.notification.title'
  | 'docs.services.notification.description'
  | 'docs.services.errors.title'
  | 'docs.services.errors.content'
  | 'docs.services.refresh.title'
  | 'docs.services.refresh.content'
  | 'docs.components.auth.title'
  | 'docs.components.ui.title'
  | 'docs.components.layout.title'
  | 'docs.hooks.translation.description'
  | 'docs.hooks.language.description'
  | 'docs.hooks.notifications.description'
  | 'docs.hooks.scroll.description'
  | 'docs.contexts.auth.description'
  | 'docs.contexts.language.description'
  | 'docs.contexts.notification.description'
  | 'docs.pages.list.title'
  | 'docs.pages.routes.title'
  | 'docs.pages.routes.content'
  | 'docs.pages.protection.title'
  | 'docs.pages.protection.content'
  | 'docs.api.endpoints.title'
  | 'docs.api.endpoints.content'
  | 'docs.api.auth.title'
  | 'docs.api.plantations.title'
  | 'docs.api.format.title'
  | 'docs.api.format.content'
  | 'docs.i18n.system.title'
  | 'docs.i18n.system.content'
  | 'docs.i18n.languages.title'
  | 'docs.i18n.files.title'
  | 'docs.i18n.files.content'
  | 'docs.i18n.adding.title'
  | 'docs.i18n.adding.content'
  | 'docs.utils.sensorStatus.description'
  | 'docs.utils.paramsSerializer.description'
  | 'docs.utils.notificationFormatters.description'
  | 'docs.utils.emailDiagnostic.description'
  | 'docs.devGuide.standards.title'
  | 'docs.devGuide.standards.typescript'
  | 'docs.devGuide.standards.components'
  | 'docs.devGuide.standards.naming'
  | 'docs.devGuide.standards.styles'
  | 'docs.devGuide.conventions.title'
  | 'docs.devGuide.conventions.files'
  | 'docs.devGuide.conventions.components'
  | 'docs.devGuide.conventions.hooks'
  | 'docs.devGuide.conventions.services'
  | 'docs.devGuide.structure.title'
  | 'docs.devGuide.structure.content'
  | 'docs.deployment.build.title'
  | 'docs.deployment.env.title'
  | 'docs.deployment.config.title'
  | 'docs.deployment.config.content'
  | 'privacy.title'
  | 'privacy.subtitle'
  | 'privacy.tableOfContents'
  | 'privacy.sections.introduction'
  | 'privacy.sections.dataCollection'
  | 'privacy.sections.dataUsage'
  | 'privacy.sections.dataSharing'
  | 'privacy.sections.dataSecurity'
  | 'privacy.sections.yourRights'
  | 'privacy.sections.cookies'
  | 'privacy.sections.changes'
  | 'privacy.sections.contact'
  | 'privacy.introduction.content'
  | 'privacy.introduction.lastUpdated'
  | 'privacy.dataCollection.personalData.title'
  | 'privacy.dataCollection.personalData.content'
  | 'privacy.dataCollection.personalData.item1'
  | 'privacy.dataCollection.personalData.item2'
  | 'privacy.dataCollection.personalData.item3'
  | 'privacy.dataCollection.personalData.item4'
  | 'privacy.dataCollection.personalData.item5'
  | 'privacy.dataCollection.usageData.title'
  | 'privacy.dataCollection.usageData.content'
  | 'privacy.dataCollection.usageData.item1'
  | 'privacy.dataCollection.usageData.item2'
  | 'privacy.dataCollection.usageData.item3'
  | 'privacy.dataUsage.content'
  | 'privacy.dataUsage.item1'
  | 'privacy.dataUsage.item2'
  | 'privacy.dataUsage.item3'
  | 'privacy.dataUsage.item4'
  | 'privacy.dataUsage.item5'
  | 'privacy.dataSharing.content'
  | 'privacy.dataSharing.thirdParties.title'
  | 'privacy.dataSharing.thirdParties.content'
  | 'privacy.dataSharing.legal.title'
  | 'privacy.dataSharing.legal.content'
  | 'privacy.dataSecurity.content'
  | 'privacy.dataSecurity.item1'
  | 'privacy.dataSecurity.item2'
  | 'privacy.dataSecurity.item3'
  | 'privacy.dataSecurity.item4'
  | 'privacy.yourRights.content'
  | 'privacy.yourRights.item1'
  | 'privacy.yourRights.item2'
  | 'privacy.yourRights.item3'
  | 'privacy.yourRights.item4'
  | 'privacy.yourRights.item5'
  | 'privacy.cookies.content'
  | 'privacy.cookies.types.title'
  | 'privacy.cookies.types.content'
  | 'privacy.cookies.management.title'
  | 'privacy.cookies.management.content'
  | 'privacy.changes.content'
  | 'privacy.contact.content'
  | 'privacy.contact.email'
  | 'terms.title'
  | 'terms.subtitle'
  | 'terms.tableOfContents'
  | 'terms.sections.introduction'
  | 'terms.sections.acceptance'
  | 'terms.sections.serviceUsage'
  | 'terms.sections.userAccount'
  | 'terms.sections.intellectualProperty'
  | 'terms.sections.liability'
  | 'terms.sections.termination'
  | 'terms.sections.changes'
  | 'terms.sections.contact'
  | 'terms.introduction.content'
  | 'terms.introduction.lastUpdated'
  | 'terms.acceptance.content'
  | 'terms.acceptance.item1'
  | 'terms.acceptance.item2'
  | 'terms.acceptance.item3'
  | 'terms.serviceUsage.content'
  | 'terms.serviceUsage.allowed.title'
  | 'terms.serviceUsage.allowed.item1'
  | 'terms.serviceUsage.allowed.item2'
  | 'terms.serviceUsage.allowed.item3'
  | 'terms.serviceUsage.allowed.item4'
  | 'terms.serviceUsage.prohibited.title'
  | 'terms.serviceUsage.prohibited.item1'
  | 'terms.serviceUsage.prohibited.item2'
  | 'terms.serviceUsage.prohibited.item3'
  | 'terms.serviceUsage.prohibited.item4'
  | 'terms.userAccount.content'
  | 'terms.userAccount.responsibility.title'
  | 'terms.userAccount.responsibility.item1'
  | 'terms.userAccount.responsibility.item2'
  | 'terms.userAccount.responsibility.item3'
  | 'terms.userAccount.security.title'
  | 'terms.userAccount.security.content'
  | 'terms.intellectualProperty.content'
  | 'terms.intellectualProperty.ownership.title'
  | 'terms.intellectualProperty.ownership.content'
  | 'terms.intellectualProperty.userContent.title'
  | 'terms.intellectualProperty.userContent.content'
  | 'terms.liability.content'
  | 'terms.liability.item1'
  | 'terms.liability.item2'
  | 'terms.liability.item3'
  | 'terms.liability.item4'
  | 'terms.termination.content'
  | 'terms.termination.user.title'
  | 'terms.termination.user.content'
  | 'terms.termination.service.title'
  | 'terms.termination.service.content'
  | 'terms.changes.content'
  | 'terms.contact.content'
  | 'terms.contact.email'
  | 'cookies.title'
  | 'cookies.subtitle'
  | 'cookies.tableOfContents'
  | 'cookies.sections.introduction'
  | 'cookies.sections.types'
  | 'cookies.sections.usage'
  | 'cookies.sections.management'
  | 'cookies.sections.thirdParty'
  | 'cookies.sections.changes'
  | 'cookies.sections.contact'
  | 'cookies.introduction.content'
  | 'cookies.introduction.lastUpdated'
  | 'cookies.types.essential.title'
  | 'cookies.types.essential.content'
  | 'cookies.types.analytical.title'
  | 'cookies.types.analytical.content'
  | 'cookies.types.functional.title'
  | 'cookies.types.functional.content'
  | 'cookies.types.marketing.title'
  | 'cookies.types.marketing.content'
  | 'cookies.usage.content'
  | 'cookies.usage.item1'
  | 'cookies.usage.item2'
  | 'cookies.usage.item3'
  | 'cookies.usage.item4'
  | 'cookies.management.content'
  | 'cookies.management.browser.title'
  | 'cookies.management.browser.content'
  | 'cookies.management.impact.title'
  | 'cookies.management.impact.content'
  | 'cookies.thirdParty.content'
  | 'cookies.thirdParty.services.title'
  | 'cookies.thirdParty.services.content'
  | 'cookies.changes.content'
  | 'cookies.contact.content'
  | 'cookies.contact.email'
  | 'cookies.banner.title'
  | 'cookies.banner.description'
  | 'cookies.banner.acceptAll'
  | 'cookies.banner.rejectAll'
  | 'cookies.banner.customize'
  | 'cookies.preferences.title'
  | 'cookies.preferences.description'
  | 'cookies.preferences.essential.label'
  | 'cookies.preferences.essential.description'
  | 'cookies.preferences.analytical.label'
  | 'cookies.preferences.analytical.description'
  | 'cookies.preferences.functional.label'
  | 'cookies.preferences.functional.description'
  | 'cookies.preferences.marketing.label'
  | 'cookies.preferences.marketing.description'
  | 'cookies.preferences.save'
  | 'cookies.preferences.cancel'
  | 'cookies.preferences.acceptAll'
  | 'cookies.preferences.rejectAll'
  | 'cookies.preferences.enabled'
  | 'cookies.preferences.disabled'
  | 'cookies.management.currentPreferences'
  | 'cookies.management.manageButton';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.support': 'Support',
    'nav.monitoring': 'Surveillance',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Plantations',
    'nav.ai': 'IA',
    'nav.guide': 'Guide',
    'nav.docs': 'Documentation',
    'nav.privacy': 'Confidentialité',
    'nav.terms': 'Conditions',
    'nav.cookies': 'Cookies',
    'nav.technician': 'Tableau de bord',
    'nav.admin': 'Administration',
    'auth.login': 'Se Connecter',
    'auth.signup': "S'inscrire",
    'auth.logout': 'Déconnexion',
    'auth.profile': 'Profil',
    'header.close': 'Fermer',
    'header.menu': 'Menu',
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
    'login.errors.twoFactorTokenMissing': 'Jeton de vérification manquant',
    'login.errors.twoFactorFailed': 'Code d\'authentification à deux facteurs invalide. Veuillez réessayer.',
    'login.accountDisabled.title': 'Compte désactivé',
    'login.accountDisabled.message': 'Votre compte a été désactivé veuillez contacter l\'administrateur du système pour plus d\'info',
    'login.accountDisabled.close': 'Fermer',
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
    'forgotPassword.title': 'MOT DE PASSE OUBLIÉ',
    'forgotPassword.subtitle': 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
    'forgotPassword.emailLabel': 'Adresse email',
    'forgotPassword.emailPlaceholder': 'votre.email@example.com',
    'forgotPassword.submitButton': 'Envoyer le lien de réinitialisation',
    'forgotPassword.submitting': 'Envoi en cours...',
    'forgotPassword.successMessage': 'Si cet email existe dans notre système, un lien de réinitialisation a été envoyé.',
    'forgotPassword.successHint': 'Vérifiez votre boîte de réception (et les spams) pour le lien de réinitialisation. Le lien expire dans 1 heure.',
    'forgotPassword.backToLogin': 'Retour à la connexion',
    'forgotPassword.errors.emailRequired': 'L\'adresse email est requise',
    'forgotPassword.errors.emailInvalid': 'L\'adresse email n\'est pas valide',
    'resetPassword.title': 'RÉINITIALISER VOTRE MOT DE PASSE',
    'resetPassword.subtitle': 'Créez un nouveau mot de passe sécurisé pour votre compte.',
    'resetPassword.newPasswordLabel': 'Nouveau mot de passe',
    'resetPassword.newPasswordPlaceholder': 'Nouveau mot de passe',
    'resetPassword.confirmPasswordLabel': 'Confirmer le mot de passe',
    'resetPassword.confirmPasswordPlaceholder': 'Confirmer le mot de passe',
    'resetPassword.submitButton': 'Réinitialiser le mot de passe',
    'resetPassword.submitting': 'Réinitialisation en cours...',
    'resetPassword.successMessage': 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
    'resetPassword.redirecting': 'Redirection vers la page de connexion...',
    'resetPassword.validation.title': 'Le mot de passe doit contenir :',
    'resetPassword.validation.minLength': 'Au moins 8 caractères',
    'resetPassword.validation.hasUpperCase': 'Une lettre majuscule',
    'resetPassword.validation.hasLowerCase': 'Une lettre minuscule',
    'resetPassword.validation.hasNumber': 'Un chiffre',
    'resetPassword.validation.hasSpecialChar': 'Un caractère spécial',
    'resetPassword.errors.tokenMissing': 'Token de réinitialisation manquant. Veuillez utiliser le lien reçu par email.',
    'resetPassword.errors.tokenExpired': 'Token de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.',
    'resetPassword.errors.passwordMismatch': 'Les mots de passe ne correspondent pas',
    'resetPassword.errors.passwordInvalid': 'Le mot de passe ne respecte pas toutes les règles requises',
    'resetPassword.errors.accountDisabled': 'Impossible de réinitialiser le mot de passe d\'un compte désactivé',
    'resetPassword.requestNewLink': 'Demander un nouveau lien',
    'resetPassword.backToLogin': 'Retour à la connexion',
    'signup.title': 'INSCRIPTION',
    'signup.lastNameLabel': 'Nom',
    'signup.lastNamePlaceholder': 'Nom',
    'signup.firstNameLabel': 'Prénom',
    'signup.firstNamePlaceholder': 'Prénom',
    'signup.emailLabel': 'Adresse email',
    'signup.emailPlaceholder': 'Adresse email',
    'signup.emailHint': 'Un email de bienvenue vous sera envoyé si vous fournissez votre adresse email',
    'signup.successMessage': 'Inscription réussie !',
    'signup.successMessageWithEmail': 'Inscription réussie ! Vérifiez votre boîte email pour recevoir votre email de bienvenue.',
    'signup.redirecting': 'Redirection vers la page de connexion...',
    'signup.phoneLabel': 'Numéro de téléphone',
    'signup.phonePlaceholder': 'Numéro de téléphone',
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
    'signup.errors.emailExists': 'Ce courriel est déjà utilisé',
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
    'notifications.pageTitle': 'Notifications',
    'notifications.empty': 'Aucune notification',
    'notifications.loading': 'Chargement...',
    'notifications.noDescription': 'Notification',
    'notifications.sent': 'envoyées',
    'notifications.noEmail': 'Aucune notification par courriel',
    'notifications.justNow': 'À l\'instant',
    'notifications.minutesAgo': 'min',
    'notifications.hoursAgo': 'h',
    'notifications.daysAgo': 'j',
    'notifications.delete': 'Supprimer',
    'notifications.markAsRead': 'Marquer comme lu',
    'notifications.confirmDelete': 'Voulez-vous vraiment supprimer cette notification ?',
    'notifications.plantation': 'Plantation',
    'notifications.stats.title': 'Statistiques des notifications',
    'notifications.stats.total': 'Total',
    'notifications.stats.envoyees': 'Envoyées',
    'notifications.stats.enAttente': 'En attente',
    'notifications.stats.erreurs': 'Erreurs',
    'notifications.stats.nonLues': 'Non lues',
    'notifications.stats.parCanal': 'Par canal',
    'notifications.stats.loading': 'Chargement des statistiques...',
    'notifications.filters.all': 'Toutes',
    'notifications.filters.web': 'Web',
    'notifications.filters.email': 'Email',
    'notifications.filters.unread': 'Non lues',
    'notifications.canal.email': 'Email',
    'notifications.canal.web': 'Web',
    'notifications.canal.whatsapp': 'WhatsApp',
    'notifications.status.envoyee': 'Envoyée',
    'notifications.status.enAttente': 'En attente',
    'notifications.status.erreur': 'Erreur',
    'notifications.emailError.hint': '💡 Cette notification email n\'a pas pu être envoyée. Vérifiez la configuration SMTP du backend.',
    'notifications.emailErrors.title': 'Erreurs d\'envoi d\'email détectées',
    'notifications.emailErrors.message': 'notification(s) email n\'ont pas pu être envoyée(s). Cela indique généralement un problème de configuration SMTP côté backend.',
    'notifications.emailErrors.check1': 'Vérifiez que votre profil contient une adresse email valide',
    'notifications.emailErrors.check2': 'Vérifiez la configuration SMTP du backend (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)',
    'notifications.emailErrors.check3': 'Consultez les logs du backend pour plus de détails',
    'notifications.emailErrors.runDiagnostic': 'Lancer le diagnostic',
    'notifications.emailErrors.dismiss': 'Fermer',
    'notifications.deleteAll.button': 'Tout supprimer',
    'notifications.deleteAll.confirm': 'Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette action est irréversible.',
    'notifications.deleteAll.deleting': 'Suppression...',
    'notifications.deleteAll.error': 'Une erreur est survenue lors de la suppression. Certaines notifications n\'ont peut-être pas été supprimées.',
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
    'graphs.title': 'TABLEAU DE BORD',
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
    'plantations.detail.monitoring': 'Surveillance',
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
    'profile.backToDashboard': 'Retour au tableau de bord',
    'profile.pageLabel': 'Profil utilisateur',
    'technician.loading.stats': 'Chargement des statistiques…',
    'technician.loading.farmers': 'Chargement des agriculteurs…',
    'technician.loading.plantations': 'Chargement des plantations…',
    'technician.loading.details': 'Chargement des détails…',
    'technician.stats.farmers': 'AGRICULTEURS',
    'technician.stats.plantations': 'PLANTATIONS',
    'technician.stats.activeSensors': 'CAPTEURS ACTIFS',
    'technician.stats.actuators': 'ACTIONNEURS',
    'technician.search.placeholder': 'Rechercher un agriculteur...',
    'technician.search.loading': 'Recherche...',
    'technician.section.farmers': 'Agriculteurs',
    'technician.section.plantations': 'Plantations',
    'technician.empty.noFarmers': 'Aucun agriculteur',
    'technician.empty.noFarmersFound': 'Aucun agriculteur trouvé',
    'technician.empty.selectFarmer': 'Sélectionnez un agriculteur',
    'technician.details.sensors': 'Capteurs',
    'technician.details.actuators': 'Actionneurs',
    'technician.details.locationNotSet': 'Non renseignée',
    'technician.errors.loadData': 'Impossible de charger les données',
    'technician.errors.search': 'Erreur lors de la recherche',
    'technician.errors.loadPlantations': 'Impossible de charger les plantations',
    'technician.errors.loadDetails': 'Impossible de charger les détails de la plantation',
    'technician.retry': 'Réessayer',
    'technician.farmer.label': 'AGRICULTEUR',
    'technician.plantation.singular': 'plantation',
    'technician.plantation.plural': 'plantations',
    'technician.details.owner': 'Propriétaire:',
    'technician.details.activeCount': 'Actifs:',
    'technician.details.thresholds': 'Seuils:',
    'technician.details.noSensors': 'Aucun capteur sur cette plantation',
    'technician.details.noActuators': 'Aucun actionneur sur cette plantation',
    'technician.details.manyInactiveSensors': 'Plus de 50% des capteurs sont inactifs',
    'technician.details.selectPlantation': 'Sélectionnez une plantation',
    'technician.details.noPlantationsAvailable': 'Aucune plantation disponible',
    'technician.details.lastUpdate': 'Dernière mise à jour:',
    'technician.details.notAvailable': 'Non disponible',
    'technician.details.cropType': 'Culture',
    'technician.details.area': 'Superficie',
    'technician.details.location': 'Localisation',
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
    'profile.noEmail': 'Aucune adresse courriel',
    'profile.notConfigured': 'Non configuré',
    'profile.addEmail': 'Ajouter une adresse courriel',
    'profile.roleHint': 'Le rôle ne peut pas être modifié',
    'profile.phoneLabel': 'Téléphone',
    'profile.phonePlaceholder': 'Votre numéro de téléphone',
    'profile.idLabel': 'ID Utilisateur',
    'profile.idHint': 'Identifiant unique',
    'profile.twoFactor.title': 'Authentification à deux facteurs',
    'profile.twoFactor.description': 'Sécurisez votre compte avec un code de vérification supplémentaire',
    'profile.twoFactor.enabled': 'Activé',
    'profile.twoFactor.disabled': 'Désactivé',
    'profile.twoFactor.enableButton': 'Activer l\'authentification à deux facteurs',
    'profile.twoFactor.disableButton': 'Désactiver l\'authentification à deux facteurs',
    'profile.twoFactor.setupTitle': 'Configuration de l\'authentification à deux facteurs',
    'profile.twoFactor.setupDescription': 'Scannez le QR code avec votre application d\'authentification (Google Authenticator, Authy, etc.)',
    'profile.twoFactor.scanQRCode': 'Scannez ce QR code',
    'profile.twoFactor.enterCode': 'Entrez le code de vérification',
    'profile.twoFactor.codeLabel': 'Code de vérification',
    'profile.twoFactor.codePlaceholder': '000000',
    'profile.twoFactor.activateButton': 'Activer',
    'profile.twoFactor.deactivateButton': 'Désactiver',
    'profile.twoFactor.disableTitle': 'Désactiver l\'authentification à deux facteurs',
    'profile.twoFactor.disableDescription': 'Entrez votre code d\'authentification à deux facteurs pour confirmer la désactivation',
    'profile.twoFactor.success': 'Authentification à deux facteurs activée avec succès',
    'profile.twoFactor.error': 'Erreur lors de l\'activation de l\'authentification à deux facteurs',
    'profile.errors.firstNameRequired': 'Le prénom est requis',
    'profile.errors.lastNameRequired': 'Le nom est requis',
    'profile.errors.phoneRequired': 'Le numéro de téléphone est requis',
    'profile.errors.phoneInvalid': 'Le numéro de téléphone n\'est pas valide',
    'profile.errors.invalidImage': 'Veuillez sélectionner une image valide',
    'profile.errors.imageSizeExceeded': 'L\'image ne doit pas dépasser 5MB',
    'profile.errors.uploadFailed': 'Erreur lors de l\'upload de la photo',
    'profile.upload.success': 'Photo de profil mise à jour avec succès',
    'profile.errors.upload.fileMissing': 'Aucun fichier sélectionné. Veuillez sélectionner une image.',
    'profile.errors.upload.invalidFormat': 'Format de fichier non supporté. Utilisez PNG, JPG, JPEG, GIF ou WEBP.',
    'profile.errors.upload.sessionExpired': 'Votre session a expiré. Veuillez vous reconnecter.',
    'profile.errors.upload.userNotFound': 'Utilisateur non trouvé. Veuillez vous reconnecter.',
    'profile.errors.upload.serverError': 'Erreur serveur. Veuillez réessayer plus tard.',
    'profile.errors.upload.networkError': 'Problème de connexion. Vérifiez votre connexion internet.',
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
    'admin.fakers.entities.notification': 'Notifications (web, email) avec statuts',
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
    'guide.tableOfContents.monitoring': 'Surveillance',
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
    'guide.quickStart.login.step3': 'Si vous avez activé l\'authentification à deux facteurs, entrez le code de vérification après la connexion',
    'guide.auth.title': 'Authentification',
    'guide.auth.twoFactor.title': 'Authentification à deux facteurs',
    'guide.auth.twoFactor.description': 'L\'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte. Après avoir entré votre mot de passe, vous devrez également fournir un code de vérification généré par une application d\'authentification.',
    'guide.auth.twoFactor.step1': 'Connectez-vous à votre compte et accédez à votre profil',
    'guide.auth.twoFactor.step2': 'Dans la section "Authentification à deux facteurs", cliquez sur "Activer l\'authentification à deux facteurs"',
    'guide.auth.twoFactor.step3': 'Scannez le code QR avec une application d\'authentification (Google Authenticator, Authy, Microsoft Authenticator, etc.)',
    'guide.auth.twoFactor.step4': 'Entrez le code de vérification à 6 chiffres généré par l\'application pour confirmer l\'activation',
    'guide.auth.twoFactor.tip': 'Astuce : Conservez une copie de sauvegarde de votre code QR dans un endroit sûr. Si vous perdez l\'accès à votre application d\'authentification, vous pourrez réactiver l\'authentification à deux facteurs avec ce code.',
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
    'guide.plantations.view.feature2': 'Accéder rapidement à la surveillance et aux graphiques depuis la page de détails',
    'guide.plantations.view.feature3': 'Voir le nombre de capteurs et actionneurs assignés à chaque plantation',
    'guide.monitoring.title': 'Surveillance en temps réel',
    'guide.monitoring.description': 'La page de surveillance vous permet de suivre en temps réel les conditions de votre plantation grâce aux données des capteurs IoT.',
    'guide.monitoring.sensors.title': 'Types de capteurs',
    'guide.monitoring.sensors.description': 'CamerFarm AI supporte plusieurs types de capteurs pour surveiller différentes conditions :',
    'guide.monitoring.sensors.temperature': 'Température : Mesure la température ambiante (0-50°C) avec indicateur visuel de couleur',
    'guide.monitoring.sensors.soilHumidity': 'Humidité du sol : Mesure le pourcentage d\'humidité du sol (0-100%) avec barre de progression animée',
    'guide.monitoring.sensors.co2': 'Niveau de CO₂ : Mesure la concentration de dioxyde de carbone (0-2500 ppm) avec indicateurs de qualité de l\'air',
    'guide.monitoring.sensors.waterLevel': 'Niveau d\'eau : Affiche le niveau d\'eau dans le réservoir avec animation 3D',
    'guide.monitoring.sensors.luminosity': 'Luminosité : Mesure l\'intensité lumineuse avec effet de glow dynamique',
    'guide.monitoring.thresholds.title': 'Configuration des seuils',
    'guide.monitoring.thresholds.description': 'Vous pouvez personnaliser les seuils d\'alerte pour chaque capteur afin de recevoir des notifications lorsque les valeurs sortent des plages optimales.',
    'guide.monitoring.thresholds.step1': 'Sur la page de surveillance, localisez le capteur pour lequel vous souhaitez modifier les seuils',
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
    'docs.title': 'Documentation Développeur',
    'docs.subtitle': 'Documentation complète pour les développeurs de CamerFarm AI',
    'docs.tableOfContents': 'Table des matières',
    'docs.sections.introduction': 'Introduction',
    'docs.sections.architecture': 'Architecture',
    'docs.sections.services': 'Services API',
    'docs.sections.components': 'Composants',
    'docs.sections.hooks': 'Hooks',
    'docs.sections.contexts': 'Contextes',
    'docs.sections.pages': 'Pages',
    'docs.sections.api': 'API Backend',
    'docs.sections.i18n': 'Internationalisation',
    'docs.sections.utils': 'Utilitaires',
    'docs.sections.devGuide': 'Guide de développement',
    'docs.sections.deployment': 'Déploiement',
    'docs.introduction.overview.title': 'Vue d\'ensemble',
    'docs.introduction.overview.content': 'CamerFarm AI est une plateforme intelligente pour une agriculture camerounaise moderne et durable. Cette application web React permet aux producteurs de suivre leurs cultures en temps réel grâce à l\'IoT et l\'intelligence artificielle.',
    'docs.introduction.tech.title': 'Technologies utilisées',
    'docs.introduction.architecture.title': 'Architecture générale',
    'docs.introduction.architecture.content': 'L\'application utilise une architecture basée sur React avec TypeScript pour le typage statique, Vite comme outil de construction, et React Router pour le routage. Les appels API sont gérés via Axios avec une configuration centralisée.',
    'docs.introduction.prerequisites.title': 'Prérequis',
    'docs.introduction.installation.title': 'Installation',
    'docs.architecture.structure.title': 'Structure du projet',
    'docs.architecture.patterns.title': 'Modèles utilisés',
    'docs.architecture.dataFlow.title': 'Flux de données',
    'docs.architecture.dataFlow.content': 'Les données circulent depuis les services API vers les composants via les hooks et contextes. Les états globaux sont gérés par Zustand (auth) et les contextes React (language, notifications).',
    'docs.services.config.title': 'Configuration Axios',
    'docs.services.config.content': 'Le fichier api.ts configure Axios avec l\'URL de base, les intercepteurs pour le jeton de rafraîchissement automatique, et la gestion des erreurs.',
    'docs.services.auth.title': 'Service d\'authentification',
    'docs.services.auth.description': 'Gère l\'authentification, l\'inscription, la connexion, le jeton de rafraîchissement, et la gestion du profil utilisateur.',
    'docs.services.plantation.title': 'Service des plantations',
    'docs.services.plantation.description': 'Gère la création, la récupération, et la mise à jour des plantations, ainsi que les capteurs et actionneurs associés.',
    'docs.services.technician.title': 'Service technicien',
    'docs.services.technician.description': 'Gère le tableau de bord technicien avec les statistiques, la liste des agriculteurs, et les plantations.',
    'docs.services.notification.title': 'Service de notifications',
    'docs.services.notification.description': 'Gère la récupération, la mise à jour, et la suppression des notifications.',
    'docs.services.errors.title': 'Gestion des erreurs',
    'docs.services.errors.content': 'Tous les services gèrent les erreurs de manière centralisée via les intercepteurs Axios, avec affichage des messages d\'erreur appropriés.',
    'docs.services.refresh.title': 'Jeton de rafraîchissement automatique',
    'docs.services.refresh.content': 'Le système de jeton de rafraîchissement est géré automatiquement via les intercepteurs Axios, avec mise en file d\'attente des requêtes en cas de rafraîchissement en cours.',
    'docs.components.auth.title': 'Composants d\'authentification',
    'docs.components.ui.title': 'Composants d\'interface utilisateur',
    'docs.components.layout.title': 'Composants de mise en page',
    'docs.hooks.translation.description': 'Hook pour accéder aux traductions multilingues de l\'application.',
    'docs.hooks.language.description': 'Hook pour gérer le changement de langue et accéder à la langue actuelle.',
    'docs.hooks.notifications.description': 'Hook pour gérer les notifications : récupération, marquage comme lue, suppression.',
    'docs.hooks.scroll.description': 'Hook pour animer les éléments au scroll de la page.',
    'docs.contexts.auth.description': 'Contexte React pour gérer l\'état d\'authentification global de l\'application.',
    'docs.contexts.language.description': 'Contexte React pour gérer la langue sélectionnée et les traductions.',
    'docs.contexts.notification.description': 'Contexte React pour gérer les notifications en temps réel.',
    'docs.pages.list.title': 'Liste des pages',
    'docs.pages.routes.title': 'Routes',
    'docs.pages.routes.content': 'Les routes sont définies dans App.tsx avec React Router. Certaines routes sont publiques, d\'autres nécessitent une authentification.',
    'docs.pages.protection.title': 'Protection des routes',
    'docs.pages.protection.content': 'Les routes protégées utilisent ProtectedRoute, PublicRoute, ou RoleBasedRoute selon le niveau d\'accès requis.',
    'docs.api.endpoints.title': 'Endpoints disponibles',
    'docs.api.endpoints.content': 'L\'API backend expose plusieurs endpoints pour l\'authentification, les plantations, les capteurs, les notifications, etc.',
    'docs.api.auth.title': 'Endpoints d\'authentification',
    'docs.api.plantations.title': 'Endpoints des plantations',
    'docs.api.format.title': 'Format des requêtes/réponses',
    'docs.api.format.content': 'Les requêtes utilisent JSON pour le body, et les réponses sont également en JSON. L\'authentification se fait via Bearer token dans le header Authorization.',
    'docs.i18n.system.title': 'Système de traductions',
    'docs.i18n.system.content': 'L\'application utilise un système de traductions centralisé avec support de 4 langues : Français, English, Fulfulde, et Ewondo.',
    'docs.i18n.languages.title': 'Langues supportées',
    'docs.i18n.files.title': 'Fichiers de traduction',
    'docs.i18n.files.content': 'Toutes les traductions sont centralisées dans src/utils/translations.ts avec un type TypeScript pour la sécurité des clés.',
    'docs.i18n.adding.title': 'Ajout de nouvelles traductions',
    'docs.i18n.adding.content': 'Pour ajouter une nouvelle traduction, ajoutez la clé dans le type TranslationKey, puis ajoutez les traductions dans les 4 langues dans l\'objet translations.',
    'docs.utils.sensorStatus.description': 'Utilitaires pour déterminer le statut des capteurs (actif, inactif, hors ligne) basé sur les dernières lectures.',
    'docs.utils.paramsSerializer.description': 'Sérialiseur personnalisé pour les paramètres de requête, notamment pour les tableaux (ex: search[]=mot1&search[]=mot2).',
    'docs.utils.notificationFormatters.description': 'Fonctions pour formater les notifications selon leur type et leur contenu.',
    'docs.utils.emailDiagnostic.description': 'Utilitaires pour diagnostiquer les problèmes de notifications email.',
    'docs.devGuide.standards.title': 'Standards de code',
    'docs.devGuide.standards.typescript': 'Utiliser TypeScript pour tous les fichiers, avec typage strict.',
    'docs.devGuide.standards.components': 'Composants fonctionnels avec hooks React, pas de classes.',
    'docs.devGuide.standards.naming': 'Nommage en camelCase pour les variables/fonctions, PascalCase pour les composants.',
    'docs.devGuide.standards.styles': 'Utiliser CSS Modules pour tous les styles, avec nommage BEM-like.',
    'docs.devGuide.conventions.title': 'Conventions',
    'docs.devGuide.conventions.files': 'Un composant = un fichier .tsx + un fichier .module.css',
    'docs.devGuide.conventions.components': 'Composants dans src/components/, pages dans src/app/',
    'docs.devGuide.conventions.hooks': 'Hooks personnalisés dans src/hooks/ avec préfixe use',
    'docs.devGuide.conventions.services': 'Services API dans src/services/ avec suffixe Service',
    'docs.devGuide.structure.title': 'Structure des composants',
    'docs.devGuide.structure.content': 'Chaque composant doit être modulaire, réutilisable, et bien documenté. Utiliser les props TypeScript pour la sécurité des types.',
    'docs.deployment.build.title': 'Build de production',
    'docs.deployment.env.title': 'Variables d\'environnement',
    'docs.deployment.config.title': 'Configuration',
    'docs.deployment.config.content': 'Le build de production génère un dossier dist/ avec les fichiers optimisés. Configurer VITE_API_URL pour pointer vers l\'API de production.',
    'privacy.title': 'Politique de Confidentialité',
    'privacy.subtitle': 'Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.',
    'privacy.tableOfContents': 'Table des matières',
    'privacy.sections.introduction': 'Introduction',
    'privacy.sections.dataCollection': 'Collecte de données',
    'privacy.sections.dataUsage': 'Utilisation des données',
    'privacy.sections.dataSharing': 'Partage des données',
    'privacy.sections.dataSecurity': 'Sécurité des données',
    'privacy.sections.yourRights': 'Vos droits',
    'privacy.sections.cookies': 'Cookies',
    'privacy.sections.changes': 'Modifications',
    'privacy.sections.contact': 'Contact',
    'privacy.introduction.content': 'CamerFarm AI s\'engage à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre plateforme.',
    'privacy.introduction.lastUpdated': 'Dernière mise à jour : Janvier 2025',
    'privacy.dataCollection.personalData.title': 'Données personnelles',
    'privacy.dataCollection.personalData.content': 'Nous collectons les informations suivantes lorsque vous créez un compte ou utilisez nos services :',
    'privacy.dataCollection.personalData.item1': 'Nom et prénom',
    'privacy.dataCollection.personalData.item2': 'Adresse courriel',
    'privacy.dataCollection.personalData.item3': 'Numéro de téléphone',
    'privacy.dataCollection.personalData.item4': 'Informations sur vos plantations (localisation, superficie, type de culture)',
    'privacy.dataCollection.personalData.item5': 'Données de capteurs et actionneurs associés à vos plantations',
    'privacy.dataCollection.usageData.title': 'Données d\'utilisation',
    'privacy.dataCollection.usageData.content': 'Nous collectons automatiquement certaines informations lorsque vous utilisez notre plateforme :',
    'privacy.dataCollection.usageData.item1': 'Adresse de protocole Internet et informations sur votre appareil',
    'privacy.dataCollection.usageData.item2': 'Pages visitées et actions effectuées',
    'privacy.dataCollection.usageData.item3': 'Données de connexion et horaires d\'utilisation',
    'privacy.dataUsage.content': 'Nous utilisons vos données pour :',
    'privacy.dataUsage.item1': 'Fournir et améliorer nos services',
    'privacy.dataUsage.item2': 'Personnaliser votre expérience utilisateur',
    'privacy.dataUsage.item3': 'Vous envoyer des notifications importantes concernant vos plantations',
    'privacy.dataUsage.item4': 'Analyser l\'utilisation de la plateforme pour améliorer nos services',
    'privacy.dataUsage.item5': 'Respecter nos obligations légales',
    'privacy.dataSharing.content': 'Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :',
    'privacy.dataSharing.thirdParties.title': 'Prestataires de services',
    'privacy.dataSharing.thirdParties.content': 'Nous pouvons partager vos données avec des prestataires de services de confiance qui nous aident à exploiter notre plateforme (hébergement, analyse, notifications). Ces prestataires sont tenus de protéger vos données.',
    'privacy.dataSharing.legal.title': 'Obligations légales',
    'privacy.dataSharing.legal.content': 'Nous pouvons divulguer vos informations si la loi l\'exige ou pour protéger nos droits et la sécurité de nos utilisateurs.',
    'privacy.dataSecurity.content': 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :',
    'privacy.dataSecurity.item1': 'Chiffrement des données sensibles',
    'privacy.dataSecurity.item2': 'Authentification sécurisée avec mots de passe forts',
    'privacy.dataSecurity.item3': 'Accès restreint aux données personnelles',
    'privacy.dataSecurity.item4': 'Surveillance régulière de nos systèmes de sécurité',
    'privacy.yourRights.content': 'Vous avez le droit de :',
    'privacy.yourRights.item1': 'Accéder à vos données personnelles',
    'privacy.yourRights.item2': 'Corriger ou mettre à jour vos informations',
    'privacy.yourRights.item3': 'Demander la suppression de vos données',
    'privacy.yourRights.item4': 'Vous opposer au traitement de vos données',
    'privacy.yourRights.item5': 'Demander une copie de vos données',
    'privacy.cookies.content': 'Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme. Les cookies sont de petits fichiers texte stockés sur votre appareil.',
    'privacy.cookies.types.title': 'Types de cookies',
    'privacy.cookies.types.content': 'Nous utilisons des cookies essentiels pour le fonctionnement de la plateforme et des cookies analytiques pour comprendre comment vous utilisez notre service.',
    'privacy.cookies.management.title': 'Gestion des cookies',
    'privacy.cookies.management.content': 'Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le fonctionnement de la plateforme.',
    'privacy.changes.content': 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date de "Dernière mise à jour".',
    'privacy.contact.content': 'Si vous avez des questions concernant cette politique de confidentialité ou souhaitez exercer vos droits, veuillez nous contacter :',
    'privacy.contact.email': 'contact@camerfarmai.com',
    'terms.title': 'Conditions d\'Utilisation',
    'terms.subtitle': 'Découvrez les termes et conditions régissant l\'utilisation de notre plateforme.',
    'terms.tableOfContents': 'Table des matières',
    'terms.sections.introduction': 'Introduction',
    'terms.sections.acceptance': 'Acceptation des conditions',
    'terms.sections.serviceUsage': 'Utilisation du service',
    'terms.sections.userAccount': 'Compte utilisateur',
    'terms.sections.intellectualProperty': 'Propriété intellectuelle',
    'terms.sections.liability': 'Limitation de responsabilité',
    'terms.sections.termination': 'Résiliation',
    'terms.sections.changes': 'Modifications',
    'terms.sections.contact': 'Contact',
    'terms.introduction.content': 'Bienvenue sur CamerFarm AI. Ces conditions d\'utilisation régissent votre accès et votre utilisation de notre plateforme d\'agriculture intelligente. En utilisant nos services, vous acceptez d\'être lié par ces conditions.',
    'terms.introduction.lastUpdated': 'Dernière mise à jour : Janvier 2025',
    'terms.acceptance.content': 'En accédant ou en utilisant CamerFarm AI, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, vous ne devez pas utiliser notre service.',
    'terms.acceptance.item1': 'Vous devez avoir au moins 18 ans pour utiliser ce service',
    'terms.acceptance.item2': 'Vous êtes responsable de maintenir la confidentialité de votre compte',
    'terms.acceptance.item3': 'Vous acceptez de fournir des informations exactes et à jour',
    'terms.serviceUsage.content': 'CamerFarm AI fournit une plateforme pour la gestion intelligente de plantations agricoles. Vous acceptez d\'utiliser notre service conformément à ces conditions.',
    'terms.serviceUsage.allowed.title': 'Utilisations autorisées',
    'terms.serviceUsage.allowed.item1': 'Gérer vos plantations et suivre leurs données',
    'terms.serviceUsage.allowed.item2': 'Utiliser les fonctionnalités d\'IA pour la détection de maladies',
    'terms.serviceUsage.allowed.item3': 'Accéder aux données de vos capteurs en temps réel',
    'terms.serviceUsage.allowed.item4': 'Recevoir des notifications et alertes concernant vos plantations',
    'terms.serviceUsage.prohibited.title': 'Utilisations interdites',
    'terms.serviceUsage.prohibited.item1': 'Utiliser le service à des fins illégales ou frauduleuses',
    'terms.serviceUsage.prohibited.item2': 'Tenter d\'accéder à des comptes ou données d\'autres utilisateurs',
    'terms.serviceUsage.prohibited.item3': 'Perturber ou endommager le fonctionnement du service',
    'terms.serviceUsage.prohibited.item4': 'Reproduire, copier ou revendre le service sans autorisation',
    'terms.userAccount.content': 'Pour utiliser certaines fonctionnalités de CamerFarm AI, vous devez créer un compte. Vous êtes responsable de toutes les activités qui se produisent sous votre compte.',
    'terms.userAccount.responsibility.title': 'Responsabilités du compte',
    'terms.userAccount.responsibility.item1': 'Maintenir la sécurité de votre mot de passe',
    'terms.userAccount.responsibility.item2': 'Notifier immédiatement toute utilisation non autorisée de votre compte',
    'terms.userAccount.responsibility.item3': 'Assurer que les informations de votre compte sont exactes et à jour',
    'terms.userAccount.security.title': 'Sécurité du compte',
    'terms.userAccount.security.content': 'Nous mettons en œuvre des mesures de sécurité pour protéger votre compte, mais vous êtes également responsable de la protection de vos identifiants de connexion.',
    'terms.intellectualProperty.content': 'Tous les contenus, fonctionnalités et technologies de CamerFarm AI sont protégés par les lois sur la propriété intellectuelle.',
    'terms.intellectualProperty.ownership.title': 'Propriété de CamerFarm AI',
    'terms.intellectualProperty.ownership.content': 'CamerFarm AI et son contenu, y compris mais sans s\'y limiter, les textes, graphiques, logos, icônes, images, clips audio et vidéo, téléchargements numériques et compilations de données, sont la propriété de CamerFarm AI ou de ses fournisseurs de contenu et sont protégés par les lois sur le droit d\'auteur et autres lois sur la propriété intellectuelle.',
    'terms.intellectualProperty.userContent.title': 'Contenu utilisateur',
    'terms.intellectualProperty.userContent.content': 'En soumettant du contenu sur notre plateforme, vous nous accordez une licence non exclusive pour utiliser, reproduire et distribuer ce contenu dans le cadre de nos services.',
    'terms.liability.content': 'Dans les limites permises par la loi, CamerFarm AI ne sera pas responsable de :',
    'terms.liability.item1': 'Dommages directs, indirects, accessoires ou consécutifs résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service',
    'terms.liability.item2': 'Pertes de données, de profits ou d\'opportunités commerciales',
    'terms.liability.item3': 'Interruptions de service ou erreurs techniques',
    'terms.liability.item4': 'Actions ou omissions de tiers, y compris les fournisseurs de services',
    'terms.termination.content': 'Vous ou CamerFarm AI pouvez résilier votre accès au service à tout moment, avec ou sans motif.',
    'terms.termination.user.title': 'Résiliation par l\'utilisateur',
    'terms.termination.user.content': 'Vous pouvez résilier votre compte à tout moment en contactant notre service client ou en utilisant les fonctionnalités de résiliation disponibles dans votre compte.',
    'terms.termination.service.title': 'Résiliation par CamerFarm AI',
    'terms.termination.service.content': 'Nous nous réservons le droit de suspendre ou de résilier votre accès au service si vous violez ces conditions d\'utilisation ou si nous estimons que votre utilisation du service est préjudiciable à d\'autres utilisateurs ou à notre entreprise.',
    'terms.changes.content': 'Nous nous réservons le droit de modifier ces conditions d\'utilisation à tout moment. Nous vous informerons de tout changement important en publiant la nouvelle version sur cette page. Votre utilisation continue du service après la publication des modifications constitue votre acceptation des nouvelles conditions.',
    'terms.contact.content': 'Si vous avez des questions concernant ces conditions d\'utilisation, veuillez nous contacter :',
    'terms.contact.email': 'contact@camerfarmai.com',
    'cookies.title': 'Politique de Cookies',
    'cookies.subtitle': 'Découvrez comment nous utilisons les cookies pour améliorer votre expérience sur notre plateforme.',
    'cookies.tableOfContents': 'Table des matières',
    'cookies.sections.introduction': 'Introduction',
    'cookies.sections.types': 'Types de cookies',
    'cookies.sections.usage': 'Utilisation des cookies',
    'cookies.sections.management': 'Gestion des cookies',
    'cookies.sections.thirdParty': 'Cookies tiers',
    'cookies.sections.changes': 'Modifications',
    'cookies.sections.contact': 'Contact',
    'cookies.introduction.content': 'CamerFarm AI utilise des cookies pour améliorer votre expérience de navigation, analyser l\'utilisation de notre plateforme et personnaliser le contenu. Cette politique explique ce que sont les cookies, comment nous les utilisons et comment vous pouvez les gérer.',
    'cookies.introduction.lastUpdated': 'Dernière mise à jour : Janvier 2025',
    'cookies.types.essential.title': 'Cookies essentiels',
    'cookies.types.essential.content': 'Ces cookies sont nécessaires au fonctionnement de la plateforme. Ils permettent des fonctionnalités de base comme la navigation sécurisée, l\'authentification et l\'accès aux zones protégées. Sans ces cookies, certaines fonctionnalités ne peuvent pas être fournies.',
    'cookies.types.analytical.title': 'Cookies analytiques',
    'cookies.types.analytical.content': 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre plateforme en collectant et rapportant des informations anonymes. Ils nous permettent d\'améliorer le fonctionnement de la plateforme en analysant les modèles d\'utilisation.',
    'cookies.types.functional.title': 'Cookies fonctionnels',
    'cookies.types.functional.content': 'Ces cookies permettent à la plateforme de se souvenir de vos choix (comme votre langue préférée) et de fournir des fonctionnalités améliorées et personnalisées. Ils peuvent également être utilisés pour mémoriser les modifications que vous avez apportées à la taille du texte, les polices et autres parties de la page web que vous pouvez personnaliser.',
    'cookies.types.marketing.title': 'Cookies marketing',
    'cookies.types.marketing.content': 'Ces cookies sont utilisés pour suivre les visiteurs sur différents sites web. L\'intention est d\'afficher des publicités pertinentes et engageantes pour l\'utilisateur individuel et donc plus précieuses pour les éditeurs et annonceurs tiers.',
    'cookies.usage.content': 'Nous utilisons les cookies pour les raisons suivantes :',
    'cookies.usage.item1': 'Assurer le bon fonctionnement de la plateforme et améliorer ses performances',
    'cookies.usage.item2': 'Mémoriser vos préférences et paramètres pour une expérience personnalisée',
    'cookies.usage.item3': 'Analyser l\'utilisation de la plateforme pour identifier les problèmes et améliorer nos services',
    'cookies.usage.item4': 'Fournir des fonctionnalités de sécurité et prévenir les activités frauduleuses',
    'cookies.management.content': 'Vous avez le contrôle sur les cookies. La plupart des navigateurs web acceptent automatiquement les cookies, mais vous pouvez généralement modifier les paramètres de votre navigateur pour refuser les cookies si vous le souhaitez.',
    'cookies.management.browser.title': 'Paramètres du navigateur',
    'cookies.management.browser.content': 'Vous pouvez gérer les cookies via les paramètres de votre navigateur. Chaque navigateur a des instructions différentes pour gérer les cookies. Consultez le menu d\'aide de votre navigateur pour plus d\'informations.',
    'cookies.management.impact.title': 'Impact de la désactivation',
    'cookies.management.impact.content': 'Si vous choisissez de désactiver les cookies, certaines fonctionnalités de la plateforme peuvent ne pas fonctionner correctement. Les cookies essentiels sont nécessaires au fonctionnement de base de la plateforme et ne peuvent généralement pas être désactivés.',
    'cookies.thirdParty.content': 'Certains cookies sur notre plateforme sont placés par des services tiers qui apparaissent sur nos pages.',
    'cookies.thirdParty.services.title': 'Services tiers',
    'cookies.thirdParty.services.content': 'Nous pouvons utiliser des services d\'analyse tiers (comme Google Analytics) qui utilisent leurs propres cookies pour collecter des informations sur votre utilisation de notre plateforme. Ces cookies sont soumis aux politiques de confidentialité des tiers respectifs.',
    'cookies.changes.content': 'Nous pouvons mettre à jour cette politique de cookies de temps à autre pour refléter les changements dans les technologies que nous utilisons ou pour d\'autres raisons opérationnelles, légales ou réglementaires. Nous vous encourageons à consulter cette page régulièrement pour rester informé de notre utilisation des cookies.',
    'cookies.contact.content': 'Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter :',
    'cookies.contact.email': 'contact@camerfarmai.com',
    'cookies.banner.title': 'Nous utilisons des cookies',
    'cookies.banner.description': 'Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.',
    'cookies.banner.acceptAll': 'Accepter tout',
    'cookies.banner.rejectAll': 'Refuser tout',
    'cookies.banner.customize': 'Personnaliser',
    'cookies.preferences.title': 'Gérer vos préférences de cookies',
    'cookies.preferences.description': 'Sélectionnez les types de cookies que vous souhaitez accepter. Les cookies essentiels sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.',
    'cookies.preferences.essential.label': 'Cookies essentiels',
    'cookies.preferences.essential.description': 'Ces cookies sont nécessaires au fonctionnement de base du site. Ils ne peuvent pas être désactivés.',
    'cookies.preferences.analytical.label': 'Cookies analytiques',
    'cookies.preferences.analytical.description': 'Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site en collectant des informations anonymes.',
    'cookies.preferences.functional.label': 'Cookies fonctionnels',
    'cookies.preferences.functional.description': 'Ces cookies permettent au site de se souvenir de vos choix et de fournir des fonctionnalités améliorées.',
    'cookies.preferences.marketing.label': 'Cookies marketing',
    'cookies.preferences.marketing.description': 'Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer l\'efficacité des campagnes publicitaires.',
    'cookies.preferences.save': 'Enregistrer les préférences',
    'cookies.preferences.cancel': 'Annuler',
    'cookies.preferences.acceptAll': 'Accepter tout',
    'cookies.preferences.rejectAll': 'Refuser tout',
    'cookies.preferences.enabled': 'Activé',
    'cookies.preferences.disabled': 'Désactivé',
    'cookies.management.currentPreferences': 'Vos préférences actuelles',
    'cookies.management.manageButton': 'Gérer mes préférences',
  },
  en: {
    'nav.home': 'Home',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphs',
    'nav.plantations': 'Plantations',
    'nav.ai': 'AI',
    'nav.guide': 'Guide',
    'nav.docs': 'Documentation',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'nav.cookies': 'Cookies',
    'nav.technician': 'Dashboard',
    'nav.admin': 'Administration',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.profile': 'Profile',
    'header.close': 'Close',
    'header.menu': 'Menu',
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
    'login.accountDisabled.title': 'Account Disabled',
    'login.accountDisabled.message': 'Your account has been disabled. Please contact the system administrator for more information.',
    'login.accountDisabled.close': 'Close',
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
    'forgotPassword.title': 'FORGOT PASSWORD',
    'forgotPassword.subtitle': 'Enter your email address and we will send you a link to reset your password.',
    'forgotPassword.emailLabel': 'Email address',
    'forgotPassword.emailPlaceholder': 'your.email@example.com',
    'forgotPassword.submitButton': 'Send reset link',
    'forgotPassword.submitting': 'Sending...',
    'forgotPassword.successMessage': 'If this email exists in our system, a reset link has been sent.',
    'forgotPassword.successHint': 'Check your inbox (and spam) for the reset link. The link expires in 1 hour.',
    'forgotPassword.backToLogin': 'Back to login',
    'forgotPassword.errors.emailRequired': 'Email address is required',
    'forgotPassword.errors.emailInvalid': 'Email address is invalid',
    'resetPassword.title': 'RESET YOUR PASSWORD',
    'resetPassword.subtitle': 'Create a new secure password for your account.',
    'resetPassword.newPasswordLabel': 'New password',
    'resetPassword.newPasswordPlaceholder': 'New password',
    'resetPassword.confirmPasswordLabel': 'Confirm password',
    'resetPassword.confirmPasswordPlaceholder': 'Confirm password',
    'resetPassword.submitButton': 'Reset password',
    'resetPassword.submitting': 'Resetting...',
    'resetPassword.successMessage': 'Your password has been successfully reset. You can now log in.',
    'resetPassword.redirecting': 'Redirecting to login page...',
    'resetPassword.validation.title': 'The password must contain:',
    'resetPassword.validation.minLength': 'At least 8 characters',
    'resetPassword.validation.hasUpperCase': 'One uppercase letter',
    'resetPassword.validation.hasLowerCase': 'One lowercase letter',
    'resetPassword.validation.hasNumber': 'One number',
    'resetPassword.validation.hasSpecialChar': 'One special character',
    'resetPassword.errors.tokenMissing': 'Reset token is missing. Please use the link received by email.',
    'resetPassword.errors.tokenExpired': 'Reset token is invalid or expired. Please request a new link.',
    'resetPassword.errors.passwordMismatch': 'Passwords do not match',
    'resetPassword.errors.passwordInvalid': 'Password does not meet all required rules',
    'resetPassword.errors.accountDisabled': 'Cannot reset password for a disabled account',
    'resetPassword.requestNewLink': 'Request a new link',
    'resetPassword.backToLogin': 'Back to login',
    'signup.title': 'SIGN UP',
    'signup.lastNameLabel': 'Last Name',
    'signup.lastNamePlaceholder': 'Last Name',
    'signup.firstNameLabel': 'First Name',
    'signup.firstNamePlaceholder': 'First Name',
    'signup.emailLabel': 'Email address',
    'signup.emailPlaceholder': 'Email address',
    'signup.emailHint': 'A welcome email will be sent to you if you provide your email address',
    'signup.successMessage': 'Registration successful!',
    'signup.successMessageWithEmail': 'Registration successful! Check your email inbox to receive your welcome email.',
    'signup.redirecting': 'Redirecting to login page...',
    'signup.phoneLabel': 'Phone number',
    'signup.phonePlaceholder': 'Phone number',
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
    'notifications.pageTitle': 'Notifications',
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
    'notifications.markAsRead': 'Mark as read',
    'notifications.confirmDelete': 'Are you sure you want to delete this notification?',
    'notifications.plantation': 'Plantation',
    'notifications.stats.title': 'Notification Statistics',
    'notifications.stats.total': 'Total',
    'notifications.stats.envoyees': 'Sent',
    'notifications.stats.enAttente': 'Pending',
    'notifications.stats.erreurs': 'Errors',
    'notifications.stats.nonLues': 'Unread',
    'notifications.stats.parCanal': 'By channel',
    'notifications.stats.loading': 'Loading statistics...',
    'notifications.filters.all': 'All',
    'notifications.filters.web': 'Web',
    'notifications.filters.email': 'Email',
    'notifications.filters.unread': 'Unread',
    'notifications.canal.email': 'Email',
    'notifications.canal.web': 'Web',
    'notifications.canal.whatsapp': 'WhatsApp',
    'notifications.status.envoyee': 'Sent',
    'notifications.status.enAttente': 'Pending',
    'notifications.status.erreur': 'Error',
    'notifications.emailError.hint': '💡 This email notification could not be sent. Check the backend SMTP configuration.',
    'notifications.emailErrors.title': 'Email sending errors detected',
    'notifications.emailErrors.message': 'email notification(s) could not be sent. This usually indicates a backend SMTP configuration issue.',
    'notifications.emailErrors.check1': 'Check that your profile contains a valid email address',
    'notifications.emailErrors.check2': 'Check the backend SMTP configuration (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)',
    'notifications.emailErrors.check3': 'Check the backend logs for more details',
    'notifications.emailErrors.runDiagnostic': 'Run diagnostic',
    'notifications.emailErrors.dismiss': 'Close',
    'notifications.deleteAll.button': 'Delete all',
    'notifications.deleteAll.confirm': 'Are you sure you want to delete all notifications? This action cannot be undone.',
    'notifications.deleteAll.deleting': 'Deleting...',
    'notifications.deleteAll.error': 'An error occurred while deleting. Some notifications may not have been deleted.',
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
    'technician.loading.stats': 'Loading statistics…',
    'technician.loading.farmers': 'Loading farmers…',
    'technician.loading.plantations': 'Loading plantations…',
    'technician.loading.details': 'Loading details…',
    'technician.stats.farmers': 'FARMERS',
    'technician.stats.plantations': 'PLANTATIONS',
    'technician.stats.activeSensors': 'ACTIVE SENSORS',
    'technician.stats.actuators': 'ACTUATORS',
    'technician.search.placeholder': 'Search for a farmer...',
    'technician.search.loading': 'Searching...',
    'technician.section.farmers': 'Farmers',
    'technician.section.plantations': 'Plantations',
    'technician.empty.noFarmers': 'No farmers',
    'technician.empty.noFarmersFound': 'No farmers found',
    'technician.empty.selectFarmer': 'Select a farmer',
    'technician.details.sensors': 'Sensors',
    'technician.details.actuators': 'Actuators',
    'technician.details.locationNotSet': 'Not set',
    'technician.errors.loadData': 'Unable to load data',
    'technician.errors.search': 'Search error',
    'technician.errors.loadPlantations': 'Unable to load plantations',
    'technician.errors.loadDetails': 'Unable to load plantation details',
    'technician.retry': 'Retry',
    'technician.farmer.label': 'FARMER',
    'technician.plantation.singular': 'plantation',
    'technician.plantation.plural': 'plantations',
    'technician.details.owner': 'Owner:',
    'technician.details.activeCount': 'Active:',
    'technician.details.thresholds': 'Thresholds:',
    'technician.details.noSensors': 'No sensors on this plantation',
    'technician.details.noActuators': 'No actuators on this plantation',
    'technician.details.manyInactiveSensors': 'More than 50% of sensors are inactive',
    'technician.details.selectPlantation': 'Select a plantation',
    'technician.details.noPlantationsAvailable': 'No plantations available',
    'technician.details.lastUpdate': 'Last update:',
    'technician.details.notAvailable': 'N/A',
    'technician.details.cropType': 'Crop',
    'technician.details.area': 'Area',
    'technician.details.location': 'Location',
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
    'profile.upload.success': 'Profile picture updated successfully',
    'profile.errors.upload.fileMissing': 'No file selected. Please select an image.',
    'profile.errors.upload.invalidFormat': 'File format not supported. Use PNG, JPG, JPEG, GIF or WEBP.',
    'profile.errors.upload.sessionExpired': 'Your session has expired. Please log in again.',
    'profile.errors.upload.userNotFound': 'User not found. Please log in again.',
    'profile.errors.upload.serverError': 'Server error. Please try again later.',
    'profile.errors.upload.networkError': 'Connection problem. Check your internet connection.',
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
    'docs.title': 'Developer Documentation',
    'docs.subtitle': 'Complete documentation for CamerFarm AI developers',
    'docs.tableOfContents': 'Table of Contents',
    'docs.sections.introduction': 'Introduction',
    'docs.sections.architecture': 'Architecture',
    'docs.sections.services': 'API Services',
    'docs.sections.components': 'Components',
    'docs.sections.hooks': 'Hooks',
    'docs.sections.contexts': 'Contexts',
    'docs.sections.pages': 'Pages',
    'docs.sections.api': 'Backend API',
    'docs.sections.i18n': 'Internationalization',
    'docs.sections.utils': 'Utilities',
    'docs.sections.devGuide': 'Development Guide',
    'docs.sections.deployment': 'Deployment',
    'docs.introduction.overview.title': 'Overview',
    'docs.introduction.overview.content': 'CamerFarm AI is an intelligent platform for modern and sustainable Cameroonian agriculture. This React web application allows producers to monitor their crops in real-time through IoT and artificial intelligence.',
    'docs.introduction.tech.title': 'Technologies Used',
    'docs.introduction.architecture.title': 'General Architecture',
    'docs.introduction.architecture.content': 'The application uses a React-based architecture with TypeScript for static typing, Vite as build tool, and React Router for routing. API calls are managed via Axios with centralized configuration.',
    'docs.introduction.prerequisites.title': 'Prerequisites',
    'docs.introduction.installation.title': 'Installation',
    'docs.architecture.structure.title': 'Project Structure',
    'docs.architecture.patterns.title': 'Patterns Used',
    'docs.architecture.dataFlow.title': 'Data Flow',
    'docs.architecture.dataFlow.content': 'Data flows from API services to components via hooks and contexts. Global states are managed by Zustand (auth) and React contexts (language, notifications).',
    'docs.services.config.title': 'Axios Configuration',
    'docs.services.config.content': 'The api.ts file configures Axios with baseURL, interceptors for automatic token refresh, and error handling.',
    'docs.services.auth.title': 'Authentication Service',
    'docs.services.auth.description': 'Handles authentication, registration, login, token refresh, and user profile management.',
    'docs.services.plantation.title': 'Plantation Service',
    'docs.services.plantation.description': 'Handles creation, retrieval, and update of plantations, as well as associated sensors and actuators.',
    'docs.services.technician.title': 'Technician Service',
    'docs.services.technician.description': 'Handles the technician dashboard with statistics, farmer list, and plantations.',
    'docs.services.notification.title': 'Notification Service',
    'docs.services.notification.description': 'Handles retrieval, update, and deletion of notifications.',
    'docs.services.errors.title': 'Error Handling',
    'docs.services.errors.content': 'All services handle errors centrally via Axios interceptors, with appropriate error messages displayed.',
    'docs.services.refresh.title': 'Automatic Token Refresh',
    'docs.services.refresh.content': 'The token refresh system is managed automatically via Axios interceptors, with request queuing during refresh.',
    'docs.components.auth.title': 'Authentication Components',
    'docs.components.ui.title': 'UI Components',
    'docs.components.layout.title': 'Layout Components',
    'docs.hooks.translation.description': 'Hook to access multilingual translations of the application.',
    'docs.hooks.language.description': 'Hook to manage language change and access the current language.',
    'docs.hooks.notifications.description': 'Hook to manage notifications: retrieval, marking as read, deletion.',
    'docs.hooks.scroll.description': 'Hook to animate elements on page scroll.',
    'docs.contexts.auth.description': 'React context to manage the global authentication state of the application.',
    'docs.contexts.language.description': 'React context to manage the selected language and translations.',
    'docs.contexts.notification.description': 'React context to manage real-time notifications.',
    'docs.pages.list.title': 'Page List',
    'docs.pages.routes.title': 'Routes',
    'docs.pages.routes.content': 'Routes are defined in App.tsx with React Router. Some routes are public, others require authentication.',
    'docs.pages.protection.title': 'Route Protection',
    'docs.pages.protection.content': 'Protected routes use ProtectedRoute, PublicRoute, or RoleBasedRoute depending on the required access level.',
    'docs.api.endpoints.title': 'Available Endpoints',
    'docs.api.endpoints.content': 'The backend API exposes several endpoints for authentication, plantations, sensors, notifications, etc.',
    'docs.api.auth.title': 'Authentication Endpoints',
    'docs.api.plantations.title': 'Plantation Endpoints',
    'docs.api.format.title': 'Request/Response Format',
    'docs.api.format.content': 'Requests use JSON for the body, and responses are also in JSON. Authentication is done via Bearer token in the Authorization header.',
    'docs.i18n.system.title': 'Translation System',
    'docs.i18n.system.content': 'The application uses a centralized translation system with support for 4 languages: French, English, Fulfulde, and Ewondo.',
    'docs.i18n.languages.title': 'Supported Languages',
    'docs.i18n.files.title': 'Translation Files',
    'docs.i18n.files.content': 'All translations are centralized in src/utils/translations.ts with a TypeScript type for key safety.',
    'docs.i18n.adding.title': 'Adding New Translations',
    'docs.i18n.adding.content': 'To add a new translation, add the key to the TranslationKey type, then add translations in all 4 languages in the translations object.',
    'docs.utils.sensorStatus.description': 'Utilities to determine sensor status (active, inactive, offline) based on latest readings.',
    'docs.utils.paramsSerializer.description': 'Custom serializer for request parameters, especially for arrays (e.g., search[]=word1&search[]=word2).',
    'docs.utils.notificationFormatters.description': 'Functions to format notifications according to their type and content.',
    'docs.utils.emailDiagnostic.description': 'Utilities to diagnose email notification issues.',
    'docs.devGuide.standards.title': 'Code Standards',
    'docs.devGuide.standards.typescript': 'Use TypeScript for all files, with strict typing.',
    'docs.devGuide.standards.components': 'Functional components with React hooks, no classes.',
    'docs.devGuide.standards.naming': 'camelCase naming for variables/functions, PascalCase for components.',
    'docs.devGuide.standards.styles': 'Use CSS Modules for all styles, with BEM-like naming.',
    'docs.devGuide.conventions.title': 'Conventions',
    'docs.devGuide.conventions.files': 'One component = one .tsx file + one .module.css file',
    'docs.devGuide.conventions.components': 'Components in src/components/, pages in src/app/',
    'docs.devGuide.conventions.hooks': 'Custom hooks in src/hooks/ with use prefix',
    'docs.devGuide.conventions.services': 'API services in src/services/ with Service suffix',
    'docs.devGuide.structure.title': 'Component Structure',
    'docs.devGuide.structure.content': 'Each component should be modular, reusable, and well documented. Use TypeScript props for type safety.',
    'docs.deployment.build.title': 'Production Build',
    'docs.deployment.env.title': 'Environment Variables',
    'docs.deployment.config.title': 'Configuration',
    'docs.deployment.config.content': 'The production build generates a dist/ folder with optimized files. Configure VITE_API_URL to point to the production API.',
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Learn how we collect, use, and protect your personal data.',
    'privacy.tableOfContents': 'Table of Contents',
    'privacy.sections.introduction': 'Introduction',
    'privacy.sections.dataCollection': 'Data Collection',
    'privacy.sections.dataUsage': 'Data Usage',
    'privacy.sections.dataSharing': 'Data Sharing',
    'privacy.sections.dataSecurity': 'Data Security',
    'privacy.sections.yourRights': 'Your Rights',
    'privacy.sections.cookies': 'Cookies',
    'privacy.sections.changes': 'Changes',
    'privacy.sections.contact': 'Contact',
    'privacy.introduction.content': 'CamerFarm AI is committed to protecting your privacy and personal data. This privacy policy explains how we collect, use, share, and protect your information when you use our platform.',
    'privacy.introduction.lastUpdated': 'Last updated: January 2025',
    'privacy.dataCollection.personalData.title': 'Personal Data',
    'privacy.dataCollection.personalData.content': 'We collect the following information when you create an account or use our services:',
    'privacy.dataCollection.personalData.item1': 'First and last name',
    'privacy.dataCollection.personalData.item2': 'Email address',
    'privacy.dataCollection.personalData.item3': 'Phone number',
    'privacy.dataCollection.personalData.item4': 'Information about your plantations (location, area, crop type)',
    'privacy.dataCollection.personalData.item5': 'Sensor and actuator data associated with your plantations',
    'privacy.dataCollection.usageData.title': 'Usage Data',
    'privacy.dataCollection.usageData.content': 'We automatically collect certain information when you use our platform:',
    'privacy.dataCollection.usageData.item1': 'IP address and device information',
    'privacy.dataCollection.usageData.item2': 'Pages visited and actions taken',
    'privacy.dataCollection.usageData.item3': 'Login data and usage times',
    'privacy.dataUsage.content': 'We use your data to:',
    'privacy.dataUsage.item1': 'Provide and improve our services',
    'privacy.dataUsage.item2': 'Personalize your user experience',
    'privacy.dataUsage.item3': 'Send you important notifications about your plantations',
    'privacy.dataUsage.item4': 'Analyze platform usage to improve our services',
    'privacy.dataUsage.item5': 'Comply with our legal obligations',
    'privacy.dataSharing.content': 'We never sell your personal data. We may share your information only in the following cases:',
    'privacy.dataSharing.thirdParties.title': 'Service Providers',
    'privacy.dataSharing.thirdParties.content': 'We may share your data with trusted service providers who help us operate our platform (hosting, analytics, notifications). These providers are required to protect your data.',
    'privacy.dataSharing.legal.title': 'Legal Obligations',
    'privacy.dataSharing.legal.content': 'We may disclose your information if required by law or to protect our rights and the safety of our users.',
    'privacy.dataSecurity.content': 'We implement appropriate security measures to protect your data:',
    'privacy.dataSecurity.item1': 'Encryption of sensitive data',
    'privacy.dataSecurity.item2': 'Secure authentication with strong passwords',
    'privacy.dataSecurity.item3': 'Restricted access to personal data',
    'privacy.dataSecurity.item4': 'Regular monitoring of our security systems',
    'privacy.yourRights.content': 'You have the right to:',
    'privacy.yourRights.item1': 'Access your personal data',
    'privacy.yourRights.item2': 'Correct or update your information',
    'privacy.yourRights.item3': 'Request deletion of your data',
    'privacy.yourRights.item4': 'Object to the processing of your data',
    'privacy.yourRights.item5': 'Request a copy of your data',
    'privacy.cookies.content': 'We use cookies to improve your experience on our platform. Cookies are small text files stored on your device.',
    'privacy.cookies.types.title': 'Types of Cookies',
    'privacy.cookies.types.content': 'We use essential cookies for platform functionality and analytical cookies to understand how you use our service.',
    'privacy.cookies.management.title': 'Cookie Management',
    'privacy.cookies.management.content': 'You can manage your cookie preferences through your browser settings. Note that disabling certain cookies may affect platform functionality.',
    'privacy.changes.content': 'We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.',
    'privacy.contact.content': 'If you have questions about this privacy policy or wish to exercise your rights, please contact us:',
    'privacy.contact.email': 'contact@camerfarmai.com',
    'terms.title': 'Terms of Service',
    'terms.subtitle': 'Learn about the terms and conditions governing the use of our platform.',
    'terms.tableOfContents': 'Table of Contents',
    'terms.sections.introduction': 'Introduction',
    'terms.sections.acceptance': 'Acceptance of Terms',
    'terms.sections.serviceUsage': 'Service Usage',
    'terms.sections.userAccount': 'User Account',
    'terms.sections.intellectualProperty': 'Intellectual Property',
    'terms.sections.liability': 'Liability Limitation',
    'terms.sections.termination': 'Termination',
    'terms.sections.changes': 'Changes',
    'terms.sections.contact': 'Contact',
    'terms.introduction.content': 'Welcome to CamerFarm AI. These terms of service govern your access and use of our smart agriculture platform. By using our services, you agree to be bound by these terms.',
    'terms.introduction.lastUpdated': 'Last updated: January 2025',
    'terms.acceptance.content': 'By accessing or using CamerFarm AI, you agree to be bound by these terms of service. If you do not agree to these terms, you must not use our service.',
    'terms.acceptance.item1': 'You must be at least 18 years old to use this service',
    'terms.acceptance.item2': 'You are responsible for maintaining the confidentiality of your account',
    'terms.acceptance.item3': 'You agree to provide accurate and up-to-date information',
    'terms.serviceUsage.content': 'CamerFarm AI provides a platform for smart agricultural plantation management. You agree to use our service in accordance with these terms.',
    'terms.serviceUsage.allowed.title': 'Permitted Uses',
    'terms.serviceUsage.allowed.item1': 'Manage your plantations and track their data',
    'terms.serviceUsage.allowed.item2': 'Use AI features for disease detection',
    'terms.serviceUsage.allowed.item3': 'Access your sensor data in real-time',
    'terms.serviceUsage.allowed.item4': 'Receive notifications and alerts about your plantations',
    'terms.serviceUsage.prohibited.title': 'Prohibited Uses',
    'terms.serviceUsage.prohibited.item1': 'Use the service for illegal or fraudulent purposes',
    'terms.serviceUsage.prohibited.item2': 'Attempt to access other users\' accounts or data',
    'terms.serviceUsage.prohibited.item3': 'Disrupt or damage the service\'s operation',
    'terms.serviceUsage.prohibited.item4': 'Reproduce, copy, or resell the service without authorization',
    'terms.userAccount.content': 'To use certain features of CamerFarm AI, you must create an account. You are responsible for all activities that occur under your account.',
    'terms.userAccount.responsibility.title': 'Account Responsibilities',
    'terms.userAccount.responsibility.item1': 'Maintain the security of your password',
    'terms.userAccount.responsibility.item2': 'Immediately notify us of any unauthorized use of your account',
    'terms.userAccount.responsibility.item3': 'Ensure that your account information is accurate and up-to-date',
    'terms.userAccount.security.title': 'Account Security',
    'terms.userAccount.security.content': 'We implement security measures to protect your account, but you are also responsible for protecting your login credentials.',
    'terms.intellectualProperty.content': 'All content, features, and technology of CamerFarm AI are protected by intellectual property laws.',
    'terms.intellectualProperty.ownership.title': 'CamerFarm AI Ownership',
    'terms.intellectualProperty.ownership.content': 'CamerFarm AI and its content, including but not limited to text, graphics, logos, icons, images, audio and video clips, digital downloads, and data compilations, are the property of CamerFarm AI or its content providers and are protected by copyright and other intellectual property laws.',
    'terms.intellectualProperty.userContent.title': 'User Content',
    'terms.intellectualProperty.userContent.content': 'By submitting content on our platform, you grant us a non-exclusive license to use, reproduce, and distribute that content as part of our services.',
    'terms.liability.content': 'To the extent permitted by law, CamerFarm AI shall not be liable for:',
    'terms.liability.item1': 'Direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service',
    'terms.liability.item2': 'Loss of data, profits, or business opportunities',
    'terms.liability.item3': 'Service interruptions or technical errors',
    'terms.liability.item4': 'Actions or omissions of third parties, including service providers',
    'terms.termination.content': 'You or CamerFarm AI may terminate your access to the service at any time, with or without cause.',
    'terms.termination.user.title': 'Termination by User',
    'terms.termination.user.content': 'You may terminate your account at any time by contacting our customer service or using the termination features available in your account.',
    'terms.termination.service.title': 'Termination by CamerFarm AI',
    'terms.termination.service.content': 'We reserve the right to suspend or terminate your access to the service if you violate these terms of service or if we determine that your use of the service is harmful to other users or our business.',
    'terms.changes.content': 'We reserve the right to modify these terms of service at any time. We will notify you of any significant changes by posting the new version on this page. Your continued use of the service after the publication of changes constitutes your acceptance of the new terms.',
    'terms.contact.content': 'If you have questions about these terms of service, please contact us:',
    'terms.contact.email': 'contact@camerfarmai.com',
    'cookies.title': 'Cookie Policy',
    'cookies.subtitle': 'Learn how we use cookies to improve your experience on our platform.',
    'cookies.tableOfContents': 'Table of Contents',
    'cookies.sections.introduction': 'Introduction',
    'cookies.sections.types': 'Types of Cookies',
    'cookies.sections.usage': 'Cookie Usage',
    'cookies.sections.management': 'Cookie Management',
    'cookies.sections.thirdParty': 'Third-Party Cookies',
    'cookies.sections.changes': 'Changes',
    'cookies.sections.contact': 'Contact',
    'cookies.introduction.content': 'CamerFarm AI uses cookies to enhance your browsing experience, analyze platform usage, and personalize content. This policy explains what cookies are, how we use them, and how you can manage them.',
    'cookies.introduction.lastUpdated': 'Last updated: January 2025',
    'cookies.types.essential.title': 'Essential Cookies',
    'cookies.types.essential.content': 'These cookies are necessary for the platform to function. They enable basic features like secure navigation, authentication, and access to protected areas. Without these cookies, certain features cannot be provided.',
    'cookies.types.analytical.title': 'Analytical Cookies',
    'cookies.types.analytical.content': 'These cookies help us understand how visitors interact with our platform by collecting and reporting anonymous information. They allow us to improve platform performance by analyzing usage patterns.',
    'cookies.types.functional.title': 'Functional Cookies',
    'cookies.types.functional.content': 'These cookies allow the platform to remember your choices (such as your preferred language) and provide enhanced and personalized features. They may also be used to remember changes you have made to text size, fonts, and other parts of web pages that you can customize.',
    'cookies.types.marketing.title': 'Marketing Cookies',
    'cookies.types.marketing.content': 'These cookies are used to track visitors across different websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.',
    'cookies.usage.content': 'We use cookies for the following reasons:',
    'cookies.usage.item1': 'Ensure the proper functioning of the platform and improve its performance',
    'cookies.usage.item2': 'Remember your preferences and settings for a personalized experience',
    'cookies.usage.item3': 'Analyze platform usage to identify issues and improve our services',
    'cookies.usage.item4': 'Provide security features and prevent fraudulent activities',
    'cookies.management.content': 'You have control over cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.',
    'cookies.management.browser.title': 'Browser Settings',
    'cookies.management.browser.content': 'You can manage cookies through your browser settings. Each browser has different instructions for managing cookies. Please consult your browser\'s help menu for more information.',
    'cookies.management.impact.title': 'Impact of Disabling',
    'cookies.management.impact.content': 'If you choose to disable cookies, some platform features may not work properly. Essential cookies are necessary for basic platform functionality and generally cannot be disabled.',
    'cookies.thirdParty.content': 'Some cookies on our platform are placed by third-party services that appear on our pages.',
    'cookies.thirdParty.services.title': 'Third-Party Services',
    'cookies.thirdParty.services.content': 'We may use third-party analytics services (such as Google Analytics) that use their own cookies to collect information about your use of our platform. These cookies are subject to the respective third parties\' privacy policies.',
    'cookies.changes.content': 'We may update this cookie policy from time to time to reflect changes in the technologies we use or for other operational, legal, or regulatory reasons. We encourage you to review this page regularly to stay informed about our use of cookies.',
    'cookies.contact.content': 'If you have any questions regarding our use of cookies, please contact us:',
    'cookies.contact.email': 'contact@camerfarmai.com',
    'cookies.banner.title': 'We use cookies',
    'cookies.banner.description': 'This site uses cookies to improve your experience. You can accept all cookies, reject them, or customize your preferences.',
    'cookies.banner.acceptAll': 'Accept All',
    'cookies.banner.rejectAll': 'Reject All',
    'cookies.banner.customize': 'Customize',
    'cookies.preferences.title': 'Manage your cookie preferences',
    'cookies.preferences.description': 'Select the types of cookies you want to accept. Essential cookies are necessary for the site to function and cannot be disabled.',
    'cookies.preferences.essential.label': 'Essential Cookies',
    'cookies.preferences.essential.description': 'These cookies are necessary for the basic functioning of the site. They cannot be disabled.',
    'cookies.preferences.analytical.label': 'Analytical Cookies',
    'cookies.preferences.analytical.description': 'These cookies help us understand how visitors use our site by collecting anonymous information.',
    'cookies.preferences.functional.label': 'Functional Cookies',
    'cookies.preferences.functional.description': 'These cookies allow the site to remember your choices and provide enhanced features.',
    'cookies.preferences.marketing.label': 'Marketing Cookies',
    'cookies.preferences.marketing.description': 'These cookies are used to display relevant ads and measure the effectiveness of advertising campaigns.',
    'cookies.preferences.save': 'Save Preferences',
    'cookies.preferences.cancel': 'Cancel',
    'cookies.preferences.acceptAll': 'Accept All',
    'cookies.preferences.rejectAll': 'Reject All',
    'cookies.preferences.enabled': 'Enabled',
    'cookies.preferences.disabled': 'Disabled',
    'cookies.management.currentPreferences': 'Your current preferences',
    'cookies.management.manageButton': 'Manage my preferences',
  },
  ff: {
    'nav.home': 'Fuɗɗo',
    'nav.support': 'Wallitorde',
    'nav.monitoring': 'Jokkondiral',
    'nav.graphs': 'Giraafuuji',
    'nav.plantations': 'Nguurndam',
    'nav.ai': 'AI',
    'nav.guide': 'Jangirde',
    'nav.docs': 'Jokkondiral Bayɗe',
    'nav.privacy': 'Suuduɓe',
    'nav.terms': 'Koɗɗe',
    'nav.cookies': 'Cookies',
    'nav.technician': 'Dashboard',
    'nav.admin': 'Laamngo',
    'auth.login': 'Seŋo',
    'auth.signup': 'Winndito',
    'auth.logout': 'Yaltu',
    'auth.profile': 'Jokkondiral kuutoro',
    'header.close': 'Uddu',
    'header.menu': 'Menu',
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
    'login.accountDisabled.title': 'Konte Ɓamtaaɗo',
    'login.accountDisabled.message': 'Konte maa Ɓamtaama. Tawaama e jaɓɓoowo laawol ngol no feewi habaru goɗɗe.',
    'login.accountDisabled.close': 'Uddu',
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
    'forgotPassword.title': 'FINNDE YEJJII',
    'forgotPassword.subtitle': 'Naatu nder email maa e min neldu maa jokkol ngam ruttude finnde maa.',
    'forgotPassword.emailLabel': 'Nder email',
    'forgotPassword.emailPlaceholder': 'email.maa@example.com',
    'forgotPassword.submitButton': 'Neldu jokkol ruttude',
    'forgotPassword.submitting': 'Neldugol...',
    'forgotPassword.successMessage': 'So nder email ngol no njahii e siistem amen, jokkol ruttude nelduɗo.',
    'forgotPassword.successHint': 'Ƴeewto nder email maa (e spam) ngam jokkol ruttude. Jokkol ngal faytii e nder sahaa 1.',
    'forgotPassword.backToLogin': 'Rutto seŋo',
    'forgotPassword.errors.emailRequired': 'Nder email ina tawaa',
    'forgotPassword.errors.emailInvalid': 'Nder email fotaani',
    'resetPassword.title': 'RUTTU FINNDE MAA',
    'resetPassword.subtitle': 'Waɗu finnde hesɗo ngam konte maa.',
    'resetPassword.newPasswordLabel': 'Finnde hesɗo',
    'resetPassword.newPasswordPlaceholder': 'Finnde hesɗo',
    'resetPassword.confirmPasswordLabel': 'Fedduɗe finnde',
    'resetPassword.confirmPasswordPlaceholder': 'Fedduɗe finnde',
    'resetPassword.submitButton': 'Ruttu finnde',
    'resetPassword.submitting': 'Ruttugol...',
    'resetPassword.successMessage': 'Finnde maa ruttaama e moƴƴere. A waawi seŋo jooni.',
    'resetPassword.redirecting': 'Rutto e hello seŋo...',
    'resetPassword.validation.title': 'Finnde ina tawaa:',
    'resetPassword.validation.minLength': 'Koɗɗe 8 ɓuri',
    'resetPassword.validation.hasUpperCase': 'Harfe mawnude gooto ɓuri',
    'resetPassword.validation.hasLowerCase': 'Harfe ɓelɗe gooto ɓuri',
    'resetPassword.validation.hasNumber': 'Limoore gooto ɓuri',
    'resetPassword.validation.hasSpecialChar': 'Maande gooto ɓuri',
    'resetPassword.errors.tokenMissing': 'Token ruttude ina ɓadii. Kuutora jokkol ɗe heɓii e email.',
    'resetPassword.errors.tokenExpired': 'Token ruttude fotaani walla faytii. Ɗaɓɓu yeewto jokkol hesɗo.',
    'resetPassword.errors.passwordMismatch': 'Finnde ɗe njaatondiraani',
    'resetPassword.errors.passwordInvalid': 'Finnde ngal alaa jokkondiraa koɗɗe fof',
    'resetPassword.errors.accountDisabled': 'Waawaa ruttude finnde konte ɓaawtaaɗe',
    'resetPassword.requestNewLink': 'Yeewto jokkol hesɗo',
    'resetPassword.backToLogin': 'Rutto seŋo',
    'signup.title': 'WINNDITO',
    'signup.lastNameLabel': 'Innde',
    'signup.lastNamePlaceholder': 'Innde',
    'signup.firstNameLabel': 'Innde fuɗɗo',
    'signup.firstNamePlaceholder': 'Innde fuɗɗo',
    'signup.emailLabel': 'Nder email',
    'signup.emailPlaceholder': 'Nder email',
    'signup.emailHint': 'Email jokkondiral nelduɗo e maa so a hokkii nder email maa',
    'signup.successMessage': 'Winndito moƴƴii!',
    'signup.successMessageWithEmail': 'Winndito moƴƴii! Ƴeewto nder email maa ngam heɓde email jokkondiral maa.',
    'signup.redirecting': 'Rutto e hello seŋo...',
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
    'notifications.pageTitle': 'Tindinɗe',
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
    'notifications.markAsRead': 'Maayde e jaangooɗe',
    'notifications.confirmDelete': 'Aɗa yiɗi momtude tindinɗe ngal?',
    'notifications.plantation': 'Plantation',
    'notifications.stats.title': 'Statistiques Tindinɗe',
    'notifications.stats.total': 'Fuɗɗam',
    'notifications.stats.envoyees': 'Neldi',
    'notifications.stats.enAttente': 'E les',
    'notifications.stats.erreurs': 'Faljirɗe',
    'notifications.stats.nonLues': 'Alaa jaangooɗe',
    'notifications.stats.parCanal': 'E canal',
    'notifications.stats.loading': 'Nawtude statistiques...',
    'notifications.filters.all': 'Fof',
    'notifications.filters.web': 'Web',
    'notifications.filters.email': 'Email',
    'notifications.filters.unread': 'Alaa jaangooɗe',
    'notifications.canal.email': 'Email',
    'notifications.canal.web': 'Web',
    'notifications.canal.whatsapp': 'WhatsApp',
    'notifications.status.envoyee': 'Neldi',
    'notifications.status.enAttente': 'E les',
    'notifications.status.erreur': 'Faljirɗe',
    'notifications.emailError.hint': '💡 Tindinɗe email ngal faytii neldude. Ƴeewto teelte SMTP backend.',
    'notifications.emailErrors.title': 'Faljirɗe neldude email yiytiɗe',
    'notifications.emailErrors.message': 'tindinɗe email faytii neldude. Ɗuum holli koɗɗe maaɗa ko faljirɗe teelte SMTP backend.',
    'notifications.emailErrors.check1': 'Ƴeewto ko profil maa ina jogii adires email goonga',
    'notifications.emailErrors.check2': 'Ƴeewto teelte SMTP backend (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)',
    'notifications.emailErrors.check3': 'Yilto loguji backend ngam bayɗe ɓurɗe',
    'notifications.emailErrors.runDiagnostic': 'Fuɗɗo yiytude',
    'notifications.emailErrors.dismiss': 'Uddu',
    'notifications.deleteAll.button': 'Momtu fof',
    'notifications.deleteAll.confirm': 'Aɗa yiɗi momtude tindinɗe fof? Ɗuum faytii ruttoowo.',
    'notifications.deleteAll.deleting': 'Momtude...',
    'notifications.deleteAll.error': 'Faljirɗe waɗi e momtude. Tindinɗe ɗiɗi mbaawi wanaa momtaaɗe.',
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
    'technician.loading.stats': 'Nawtude statistik…',
    'technician.loading.farmers': 'Nawtude ngurɓe…',
    'technician.loading.plantations': 'Nawtude nguurndam…',
    'technician.loading.details': 'Nawtude firooji…',
    'technician.stats.farmers': 'NGURɓE',
    'technician.stats.plantations': 'NGUURNDAM',
    'technician.stats.activeSensors': 'JOKKONDIRɗE KUUɗE',
    'technician.stats.actuators': 'TOPPU KUUɗE',
    'technician.search.placeholder': 'Yiylo ngurɓe...',
    'technician.search.loading': 'Yiylo...',
    'technician.section.farmers': 'Ngurɓe',
    'technician.section.plantations': 'Nguurndam',
    'technician.empty.noFarmers': 'Alaa ngurɓe',
    'technician.empty.noFarmersFound': 'Alaa ngurɓe yiɓɓe',
    'technician.empty.selectFarmer': 'Labo ngurɓo',
    'technician.details.sensors': 'Jokkondirɗe',
    'technician.details.actuators': 'Toppu kuuɗe',
    'technician.details.locationNotSet': 'Alaa nokkuure',
    'technician.errors.loadData': 'Alaa kuuɗe nawtude dataa',
    'technician.errors.search': 'Juumre e yiylo',
    'technician.errors.loadPlantations': 'Alaa kuuɗe nawtude nguurndam',
    'technician.errors.loadDetails': 'Alaa kuuɗe nawtude firooji nguurndam',
    'technician.retry': 'Yeewto',
    'technician.farmer.label': 'NGURɓO',
    'technician.plantation.singular': 'nguurndam',
    'technician.plantation.plural': 'nguurndam',
    'technician.details.owner': 'Jom:',
    'technician.details.activeCount': 'Kuuɗe:',
    'technician.details.thresholds': 'Seuils:',
    'technician.details.noSensors': 'Alaa jokkondirɗe e nguurndam ngal',
    'technician.details.noActuators': 'Alaa toppu kuuɗe e nguurndam ngal',
    'technician.details.manyInactiveSensors': 'Ɓurɗe 50% jokkondirɗe alaa kuuɗe',
    'technician.details.selectPlantation': 'Labo nguurndam',
    'technician.details.noPlantationsAvailable': 'Alaa nguurndam heɓɓe',
    'technician.details.lastUpdate': 'Bennawtude sakkitiingo:',
    'technician.details.notAvailable': 'N/A',
    'technician.details.cropType': 'Culture',
    'technician.details.area': 'Superficie',
    'technician.details.location': 'Nokkuure',
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
    'profile.upload.success': 'Foto jokkondiral ruttaama e moƴƴere',
    'profile.errors.upload.fileMissing': 'Fayl alaa cuɓaaɗe. Toro limoore goonga.',
    'profile.errors.upload.invalidFormat': 'Fannu fayl fotaani. Kuutora PNG, JPG, JPEG, GIF walla WEBP.',
    'profile.errors.upload.sessionExpired': 'Seŋo maa faytii. Seŋo kadi.',
    'profile.errors.upload.userNotFound': 'Kuutoro alaa yiɗaaɗe. Seŋo kadi.',
    'profile.errors.upload.serverError': 'Koɗɗe serveur. Ƴeewto kadi.',
    'profile.errors.upload.networkError': 'Koɗɗe jokkondiral. Ƴeewto jokkondiral internet maa.',
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
    'admin.fakers.results.notifications': 'Tindinɗe',
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
    'admin.fakers.entities.notification': 'Tindinɗe (web, email, WhatsApp) e nokkuure',
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
    'guide.tableOfContents.notifications': 'Tindinɗe',
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
    'guide.notifications.title': 'Sistem Tindinɗe',
    'guide.notifications.description': 'Tindinɗe ina tintina maa e wakati goonga ngam ɓeynguuji nguurndam maa e keɓe.',
    'guide.notifications.management.title': 'Laamngo Tindinɗe',
    'guide.notifications.management.step1': 'Yah e tindinɗe e dobo ikon tindinɗe e header (badge hollira limoore tindinɗe ɓeewɗe)',
    'guide.notifications.management.step2': 'Maarke tindinɗe e dobo walla mbatu e dobo mbatu',
    'guide.notifications.management.step3': 'Tindinɗe ina ɓeydoto otomatik e kala 45 sekonde ngam hollirde tindinɗe hesɗi',
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
    'docs.title': 'Jokkondiral Bayɗe',
    'docs.subtitle': 'Jokkondiral timminde ngam bayɗe CamerFarm AI',
    'docs.tableOfContents': 'Tabel Keɓe',
    'docs.sections.introduction': 'Fuɗɗo',
    'docs.sections.architecture': 'Laamngo',
    'docs.sections.services': 'Jokkondiral API',
    'docs.sections.components': 'Ɓeynguuji',
    'docs.sections.hooks': 'Hooks',
    'docs.sections.contexts': 'Contextes',
    'docs.sections.pages': 'Helloji',
    'docs.sections.api': 'API Backend',
    'docs.sections.i18n': 'Ɗemngal',
    'docs.sections.utils': 'Kuutorɗe',
    'docs.sections.devGuide': 'Jokkondiral Bayɗe',
    'docs.sections.deployment': 'Jokkondiral',
    'docs.introduction.overview.title': 'Fón',
    'docs.introduction.overview.content': 'CamerFarm AI ko platform anndal ngam bisó Kameruun hesɗi é kuutoraade. App React ɗee walla bisó jokkondirde bisó wá e wakati goonga e IoT é AI.',
    'docs.introduction.tech.title': 'Kuutorɗe Teknoloji',
    'docs.introduction.architecture.title': 'Laamngo Fuɗɗo',
    'docs.introduction.architecture.content': 'App ina kuutora React e TypeScript, Vite, é React Router. API ina jokkondiraade e Axios.',
    'docs.introduction.prerequisites.title': 'Keɓe Hesɗi',
    'docs.introduction.installation.title': 'Jokkondiral',
    'docs.architecture.structure.title': 'Laamngo Projet',
    'docs.architecture.patterns.title': 'Patterns Kuutorɗe',
    'docs.architecture.dataFlow.title': 'Jokkondiral Keɓe',
    'docs.architecture.dataFlow.content': 'Keɓe ina jokkondira e services API ɓe ɓeynguuji e hooks é nokkuure. Nokkuure global ina laamngo e Zustand é React contexts.',
    'docs.services.config.title': 'Laamngo Axios',
    'docs.services.config.content': 'Pelle api.ts ina laamngo Axios e baseURL, interceptors ngam refresh token, é laamngo errors.',
    'docs.services.auth.title': 'Service Tiimtinde',
    'docs.services.auth.description': 'Laamngo tiimtinde, winndito, seŋo, refresh token, é jokkondiral kuutoro.',
    'docs.services.plantation.title': 'Service Plantations',
    'docs.services.plantation.description': 'Laamngo sígní, fón, é waylude plantations, é kuutorɓe ɓeydorde é ɓeynguuji.',
    'docs.services.technician.title': 'Service Teknisiyen',
    'docs.services.technician.description': 'Laamngo dashboard teknisiyen e statistiques, doggol koobaajooje, é nguurndam.',
    'docs.services.notification.title': 'Service Notifications',
    'docs.services.notification.description': 'Laamngo fón, waylude, é mbatu notifications.',
    'docs.services.errors.title': 'Laamngo Errors',
    'docs.services.errors.content': 'Services fof ina laamngo errors e interceptors Axios, e hollirde messages errors.',
    'docs.services.refresh.title': 'Refresh Token Otomatik',
    'docs.services.refresh.content': 'Sistem refresh token ina laamngo otomatik e interceptors Axios, e queue requests so refresh e les.',
    'docs.components.auth.title': 'Ɓeynguuji Tiimtinde',
    'docs.components.ui.title': 'Ɓeynguuji UI',
    'docs.components.layout.title': 'Ɓeynguuji Layout',
    'docs.hooks.translation.description': 'Hook ngam heɓde traductions multilingues app.',
    'docs.hooks.language.description': 'Hook ngam laamngo waylu ɗemngal é heɓde ɗemngal jooni.',
    'docs.hooks.notifications.description': 'Hook ngam laamngo notifications: fón, maarke lue, mbatu.',
    'docs.hooks.scroll.description': 'Hook ngam animer ɓeynguuji e scroll hello.',
    'docs.contexts.auth.description': 'Nokkuure React ngam laamngo nokkuure tiimtinde global app.',
    'docs.contexts.language.description': 'Nokkuure React ngam laamngo ɗemngal labɗo é traductions.',
    'docs.contexts.notification.description': 'Nokkuure React ngam laamngo notifications wakati goonga.',
    'docs.pages.list.title': 'Liste Helloji',
    'docs.pages.routes.title': 'Jokkondiral',
    'docs.pages.routes.content': 'Jokkondiral ina laamngo e App.tsx e React Router. Jokkondiral ɗuuɗɗe ko publiques, ɗuuɗɗe ina ɗaɓɓa tiimtinde.',
    'docs.pages.protection.title': 'Laamngo Jokkondiral',
    'docs.pages.protection.content': 'Jokkondiral kisal ina kuutora ProtectedRoute, PublicRoute, walla RoleBasedRoute e nder access level.',
    'docs.api.endpoints.title': 'Endpoints Hesɗi',
    'docs.api.endpoints.content': 'API backend ina hollir endpoints ɗuuɗɗe ngam authentification, plantations, capteurs, notifications, é ɗuuɗɗe.',
    'docs.api.auth.title': 'Endpoints Authentification',
    'docs.api.plantations.title': 'Endpoints Plantations',
    'docs.api.format.title': 'Format Requests/Responses',
    'docs.api.format.content': 'Requests ina kuutora JSON ngam body, é responses ko e JSON. Tiimtinde ina waɗaade e Bearer token e header Authorization.',
    'docs.i18n.system.title': 'Sistem Traductions',
    'docs.i18n.system.content': 'App ina kuutora sistem traductions centralisé e wallitorde 4 ɗemngal: Faransinkoore, Inngilinkoore, Fulfulde, é Ewondo.',
    'docs.i18n.languages.title': 'Ɗemngal Wallitɗe',
    'docs.i18n.files.title': 'Pelle Traductions',
    'docs.i18n.files.content': 'Traductions fof ina centralisé e src/utils/translations.ts e type TypeScript ngam laamngo cawɗe.',
    'docs.i18n.adding.title': 'Ɓeydude Traductions Hesɗi',
    'docs.i18n.adding.content': 'Ngam ɓeydude traduction hesɗi, ɓeydu cawɗo e type TranslationKey, ɓaawo ɓeydu traductions e 4 ɗemngal e objet translations.',
    'docs.utils.sensorStatus.description': 'Kuutorɗe ngam fannude nokkuure kuutorɓe ɓeydorde (jokkondirɗam, alaa jokkondirɗam, hors ligne) e nder jaangooje sakkitiingo.',
    'docs.utils.paramsSerializer.description': 'Sakkondirɗo kuutorɗam ngam paramètres requests, ɓurɗe ngam tableaux (misal: search[]=mot1&search[]=mot2).',
    'docs.utils.notificationFormatters.description': 'Fonctions ngam sakkondirde notifications e nder type é keɓe maɓɓe.',
    'docs.utils.emailDiagnostic.description': 'Kuutorɗe ngam fannude laawol notifications email.',
    'docs.devGuide.standards.title': 'Koɗɗe Code',
    'docs.devGuide.standards.typescript': 'Kuutora TypeScript ngam pelle fof, e typage strict.',
    'docs.devGuide.standards.components': 'Ɓeynguuji fonctionnels e hooks React, alaa classes.',
    'docs.devGuide.standards.naming': 'Innde camelCase ngam variables/fonctions, PascalCase ngam ɓeynguuji.',
    'docs.devGuide.standards.styles': 'Kuutora CSS Modules ngam styles fof, e innde BEM-like.',
    'docs.devGuide.conventions.title': 'Koɗɗe',
    'docs.devGuide.conventions.files': 'Ɓeynguuji gooto = fichier .tsx gooto + fichier .module.css gooto',
    'docs.devGuide.conventions.components': 'Ɓeynguuji e src/components/, helloji e src/app/',
    'docs.devGuide.conventions.hooks': 'Hooks kuutorɗam e src/hooks/ e préfixe use',
    'docs.devGuide.conventions.services': 'Services API e src/services/ e suffixe Service',
    'docs.devGuide.structure.title': 'Laamngo Ɓeynguuji',
    'docs.devGuide.structure.content': 'Ɓeynguuji kala ina foti modulaire, réutilisable, é jokkondiraade ɓurɗe. Kuutora props TypeScript ngam laamngo types.',
    'docs.deployment.build.title': 'Build Production',
    'docs.deployment.env.title': 'Keɓe Nokkuure',
    'docs.deployment.config.title': 'Laamngo',
    'docs.deployment.config.content': 'Build production ina ɓeydude dossier dist/ e pelle optimisés. Laamngo VITE_API_URL ngam pointer e API production.',
    'privacy.title': 'Koɗɗe Suuduɓe',
    'privacy.subtitle': 'Ɓeydu no min ɓeydude, kuutorɗe, é laamngo keɓe maa.',
    'privacy.tableOfContents': 'Tabel Keɓe',
    'privacy.sections.introduction': 'Fuɗɗo',
    'privacy.sections.dataCollection': 'Ɓeydude Keɓe',
    'privacy.sections.dataUsage': 'Kuutoraade Keɓe',
    'privacy.sections.dataSharing': 'Jokkondiral Keɓe',
    'privacy.sections.dataSecurity': 'Laamngo Keɓe',
    'privacy.sections.yourRights': 'Haɓɓe Maɓɓe',
    'privacy.sections.cookies': 'Cookies',
    'privacy.sections.changes': 'Waylude',
    'privacy.sections.contact': 'Jokkondiral',
    'privacy.introduction.content': 'CamerFarm AI ina foti laamngo suuduɓe maa é keɓe maa. Koɗɗe oo ina hollira no min ɓeydude, kuutorɗe, jokkondiraade, é laamngo keɓe maa so a kuutoraade platform amen.',
    'privacy.introduction.lastUpdated': 'Bennawtude sakkitiingo: Yanwiye 2025',
    'privacy.dataCollection.personalData.title': 'Keɓe Kuutoro',
    'privacy.dataCollection.personalData.content': 'Min ina ɓeydude keɓe ɗee so a waɗde kontó walla kuutoraade jokkondiral amen:',
    'privacy.dataCollection.personalData.item1': 'Innde é innde fuɗɗorde',
    'privacy.dataCollection.personalData.item2': 'Nder email',
    'privacy.dataCollection.personalData.item3': 'Nder tel',
    'privacy.dataCollection.personalData.item4': 'Keɓe e nder nguurndam maa (nokkuure, laawol, type culture)',
    'privacy.dataCollection.personalData.item5': 'Keɓe kuutorɓe ɓeydorde é ɓeynguuji e nder nguurndam maa',
    'privacy.dataCollection.usageData.title': 'Keɓe Kuutoraade',
    'privacy.dataCollection.usageData.content': 'Min ina ɓeydude keɓe ɗuuɗɗe otomatik so a kuutoraade platform amen:',
    'privacy.dataCollection.usageData.item1': 'Nder IP é keɓe ɓeyngu maa',
    'privacy.dataCollection.usageData.item2': 'Helloji yiɓɓe é ɓeynguuji waɗɗe',
    'privacy.dataCollection.usageData.item3': 'Keɓe kómbí é wakati kuutoraade',
    'privacy.dataUsage.content': 'Min ina kuutora keɓe maa ngam:',
    'privacy.dataUsage.item1': 'Hokki é ɓeydude jokkondiral amen',
    'privacy.dataUsage.item2': 'Waɗde kuutoraade maa mán',
    'privacy.dataUsage.item3': 'Nelde tindinɗe hesɗi e nder nguurndam maa',
    'privacy.dataUsage.item4': 'Fannude kuutoraade platform ngam ɓeydude jokkondiral amen',
    'privacy.dataUsage.item5': 'Laamngo koɗɗe laawol',
    'privacy.dataSharing.content': 'Min alaa reende keɓe kuutoro maa. Min waawi jokkondiraade keɓe maa tan e nder ɓeynguuji ɗee:',
    'privacy.dataSharing.thirdParties.title': 'Hokkiiɓe Jokkondiral',
    'privacy.dataSharing.thirdParties.content': 'Min waawi jokkondiraade keɓe maa e hokkiiɓe jokkondiral kisal ɓe walla min waɗde platform amen (hébergement, fannude, tintine). Hokkiiɓe ɗee ina foti laamngo keɓe maa.',
    'privacy.dataSharing.legal.title': 'Koɗɗe Laawol',
    'privacy.dataSharing.legal.content': 'Min waawi hollirde keɓe maa so laawol ina ɗaɓɓa walla ngam laamngo haɓɓe amen é kisal kuutoroje amen.',
    'privacy.dataSecurity.content': 'Min ina waɗde ɓeynguuji laamngo hesɗi ngam laamngo keɓe maa:',
    'privacy.dataSecurity.item1': 'Sakkondirgol keɓe kisal',
    'privacy.dataSecurity.item2': 'Tiimtinde kisal e mótí ɓurɗe',
    'privacy.dataSecurity.item3': 'Jokkondiral keɓe kuutoro e nder laamngo',
    'privacy.dataSecurity.item4': 'Jokkondiral wakati goonga sistem laamngo amen',
    'privacy.yourRights.content': 'A jogii haɓɓe ngam:',
    'privacy.yourRights.item1': 'Heɓde keɓe kuutoro maa',
    'privacy.yourRights.item2': 'Waylude walla bennawtude keɓe maa',
    'privacy.yourRights.item3': 'Ƴeewto mbatu keɓe maa',
    'privacy.yourRights.item4': 'Ƴeewto laamngo keɓe maa',
    'privacy.yourRights.item5': 'Ƴeewto kopi keɓe maa',
    'privacy.cookies.content': 'Min ina kuutora cookies ngam ɓeydude kuutoraade maa e platform amen. Cookies ko fayluji tekstuuji ɗuuɗɗe e nder ɓeyngu maa.',
    'privacy.cookies.types.title': 'Fannuuji Cookies',
    'privacy.cookies.types.content': 'Min ina kuutora cookies hesɗi ngam waɗde platform é cookies fannuuji ngam anndude no a kuutoraade jokkondiral amen.',
    'privacy.cookies.management.title': 'Laamngo Cookies',
    'privacy.cookies.management.content': 'A waawi laamngo cookies maa e laamngo navigator maa. Anndu ko mbatu cookies ɗuuɗɗe waawi ɓeydude waɗde platform.',
    'privacy.changes.content': 'Min waawi bennawtude koɗɗe oo e wakati ɗuuɗɗe. Min ina hollirde maa waylude hesɗi e ɓeydude koɗɗe hesɗi e hello oo é bennawtude "Bennawtude sakkitiingo".',
    'privacy.contact.content': 'So a jogii laawol e nder koɗɗe oo walla a waawi waɗde haɓɓe maa, jokkondir amen:',
    'privacy.contact.email': 'contact@camerfarmai.com',
    'terms.title': 'Koɗɗe Kuutoraade',
    'terms.subtitle': 'Ɓeydu koɗɗe é laamngo kuutoraade platform amen.',
    'terms.tableOfContents': 'Tabel Keɓe',
    'terms.sections.introduction': 'Fuɗɗo',
    'terms.sections.acceptance': 'Laamngo Koɗɗe',
    'terms.sections.serviceUsage': 'Kuutoraade Jokkondiral',
    'terms.sections.userAccount': 'Konte Kuutoro',
    'terms.sections.intellectualProperty': 'Laamngo Keɓe',
    'terms.sections.liability': 'Limitation Responsabilité',
    'terms.sections.termination': 'Uddu',
    'terms.sections.changes': 'Waylude',
    'terms.sections.contact': 'Jokkondiral',
    'terms.introduction.content': 'Aɗa heɓii e CamerFarm AI. Koɗɗe ɗee ina laamngo jokkondiral maa é kuutoraade maa platform amen. So a kuutoraade jokkondiral amen, a laamngo koɗɗe ɗee.',
    'terms.introduction.lastUpdated': 'Bennawtude sakkitiingo: Yanwiye 2025',
    'terms.acceptance.content': 'So a heɓii walla kuutoraade CamerFarm AI, a laamngo koɗɗe ɗee. So alaa laamngo koɗɗe ɗee, a fotaa kuutoraade jokkondiral amen.',
    'terms.acceptance.item1': 'A foti jogii duuɓi 18 ngam kuutoraade jokkondiral oo',
    'terms.acceptance.item2': 'A jogii laamngo laamngo suuduɓe konte maa',
    'terms.acceptance.item3': 'A laamngo hokki keɓe goonga é bennawtude',
    'terms.serviceUsage.content': 'CamerFarm AI ina hokki platform ngam laamngo nguurndam hesɗi. A laamngo kuutoraade jokkondiral amen e nder laamngo koɗɗe ɗee.',
    'terms.serviceUsage.allowed.title': 'Kuutoraade Laamngo',
    'terms.serviceUsage.allowed.item1': 'Laamngo nguurndam maa é jokkondiral keɓe maɓɓe',
    'terms.serviceUsage.allowed.item2': 'Kuutoraade ɓeynguuji AI ngam yiɓde cuɓal',
    'terms.serviceUsage.allowed.item3': 'Heɓde keɓe kuutorɓe ɓeydorde maa e wakati goonga',
    'terms.serviceUsage.allowed.item4': 'Heɓde tindinɗe é alertes e nder nguurndam maa',
    'terms.serviceUsage.prohibited.title': 'Kuutoraade Ƴeewtude',
    'terms.serviceUsage.prohibited.item1': 'Kuutoraade jokkondiral oo ngam ɓeynguuji laawol walla fayde',
    'terms.serviceUsage.prohibited.item2': 'Ƴeewto heɓde konte walla keɓe kuutoroje goɗɗe',
    'terms.serviceUsage.prohibited.item3': 'Ƴeewto walla ɓeydude waɗde jokkondiral',
    'terms.serviceUsage.prohibited.item4': 'Waɗde kopi, walla reende jokkondiral oo alaa laamngo',
    'terms.userAccount.content': 'Ngam kuutoraade ɓeynguuji ɗuuɗɗe CamerFarm AI, a foti waɗde konte. A jogii laamngo ɓeynguuji fof ɗe ina waɗde e nder konte maa.',
    'terms.userAccount.responsibility.title': 'Laamngo Konte',
    'terms.userAccount.responsibility.item1': 'Laamngo kisal mótí maa',
    'terms.userAccount.responsibility.item2': 'Hollirde min otomatik so a jogii kuutoraade alaa laamngo konte maa',
    'terms.userAccount.responsibility.item3': 'Laamngo keɓe konte maa ina goonga é bennawtude',
    'terms.userAccount.security.title': 'Kisal Konte',
    'terms.userAccount.security.content': 'Min ina waɗde ɓeynguuji kisal ngam laamngo konte maa, kono a jogii laamngo laamngo keɓe kómbí maa.',
    'terms.intellectualProperty.content': 'Keɓe fof, ɓeynguuji, é teknoloji CamerFarm AI ina laamngo e koɗɗe laamngo keɓe.',
    'terms.intellectualProperty.ownership.title': 'Laamngo CamerFarm AI',
    'terms.intellectualProperty.ownership.content': 'CamerFarm AI é keɓe maɓɓe, ɗuuɗɗe tekstuuji, giraafuuji, logos, icônes, njaaje, clips audio é vidéo, téléchargements numériques é compilations keɓe, ko laamngo CamerFarm AI walla hokkiiɓe keɓe maɓɓe é ina laamngo e koɗɗe copyright é koɗɗe goɗɗe laamngo keɓe.',
    'terms.intellectualProperty.userContent.title': 'Keɓe Kuutoro',
    'terms.intellectualProperty.userContent.content': 'So a hokkii keɓe e platform amen, a hokkii min licence alaa exclusive ngam kuutoraade, waɗde kopi, é jokkondiraade keɓe ɗee e nder jokkondiral amen.',
    'terms.liability.content': 'E nder laamngo laawol, CamerFarm AI alaa jogii laamngo ngam:',
    'terms.liability.item1': 'Dommages directs, indirects, accessoires walla consécutifs ɗe ina yaltude e kuutoraade walla alaa kuutoraade jokkondiral',
    'terms.liability.item2': 'Mbatu keɓe, profits walla ɓeynguuji commerce',
    'terms.liability.item3': 'Interruptions jokkondiral walla laawol teknik',
    'terms.liability.item4': 'Ɓeynguuji walla mbatu ɓeynguuji kuutoroje tati, ɗuuɗɗe hokkiiɓe jokkondiral',
    'terms.termination.content': 'A walla CamerFarm AI waawi uddude jokkondiral maa e jokkondiral oo e wakati kala, e ɓeyngu walla alaa ɓeyngu.',
    'terms.termination.user.title': 'Uddu e Kuutoro',
    'terms.termination.user.content': 'A waawi uddude konte maa e wakati kala e jokkondiraade jokkondiral kuutoro amen walla kuutoraade ɓeynguuji uddu e nder konte maa.',
    'terms.termination.service.title': 'Uddu e CamerFarm AI',
    'terms.termination.service.content': 'Min jogii haɓɓe uddude walla uddude jokkondiral maa e jokkondiral oo so a ɓeydude koɗɗe ɗee walla so min yiɓii kuutoraade maa jokkondiral oo ina ɓeydude kuutoroje goɗɗe walla commerce amen.',
    'terms.changes.content': 'Min jogii haɓɓe waylude koɗɗe ɗee e wakati kala. Min ina hollirde maa waylude hesɗi e ɓeydude version hesɗi e hello oo. Kuutoraade maa jokkondiral oo sakkitiingo ɓaawo ɓeydude waylude ina laamngo waylude hesɗi.',
    'terms.contact.content': 'So a jogii laawol e nder koɗɗe ɗee, jokkondir amen:',
    'terms.contact.email': 'contact@camerfarmai.com',
    'cookies.title': 'Laamngo Cookies',
    'cookies.subtitle': 'Anndu no min kuutora cookies ngam ɓeydude kuutoraade maa e platform amen.',
    'cookies.tableOfContents': 'Tabel keɓe',
    'cookies.sections.introduction': 'Fuɗɗo',
    'cookies.sections.types': 'Fannuuji Cookies',
    'cookies.sections.usage': 'Kuutoraade Cookies',
    'cookies.sections.management': 'Laamngo Cookies',
    'cookies.sections.thirdParty': 'Cookies Tati',
    'cookies.sections.changes': 'Waylude',
    'cookies.sections.contact': 'Jokkondiral',
    'cookies.introduction.content': 'CamerFarm AI ina kuutora cookies ngam ɓeydude kuutoraade maa e navigator, fannuuji kuutoraade platform amen é ɓeydude keɓe. Laamngo oo ina fannu cookies, no min kuutoraade ɗee, é no a waawi laamngo ɗee.',
    'cookies.introduction.lastUpdated': 'Waylude sakkitiingo: Yanwiye 2025',
    'cookies.types.essential.title': 'Cookies Hesɗi',
    'cookies.types.essential.content': 'Cookies ɗee ɗuuɗɗe ngam waɗde platforme. Ɗee ina waɗde ɓeynguuji fuɗɗi no navigator hesɗi, jokkondiral, é heɓde nder nder ɓeynguuji laamngo. So alaa cookies ɗee, ɓeynguuji ɗuuɗɗe alaa waawi hokkude.',
    'cookies.types.analytical.title': 'Cookies Fannuuji',
    'cookies.types.analytical.content': 'Cookies ɗee ina wallit min anndude no kuutoroje ina jokkondiraade e platform amen e ɓeydude é hollirde keɓe anndaaɗe. Ɗee ina waɗde min ɓeydude waɗde platform e fannuuji kuutoraade.',
    'cookies.types.functional.title': 'Cookies Waɗde',
    'cookies.types.functional.content': 'Cookies ɗee ina waɗde platform maatude cuɓal maa (no ɓeyngu ɗam maa) é hokkude ɓeynguuji ɓeydude é ɓeydude. Ɗee waawi kuutoraade maatude waylude maa e ɓeydude ɓeyngu tekstu, fontes, é ɓeynguuji goɗɗe hello web maa a waawi ɓeydude.',
    'cookies.types.marketing.title': 'Cookies Marketing',
    'cookies.types.marketing.content': 'Cookies ɗee ina kuutoraade jokkondiraade kuutoroje e hello web ɗuuɗɗe. Ɗuum ina hollirde ads ɗuuɗɗe é ɓeydude ngam kuutoro hesɗi é ɓeydude ngam hokkiiɓe é ads tati.',
    'cookies.usage.content': 'Min ina kuutora cookies ngam ɓeynguuji ɗee:',
    'cookies.usage.item1': 'Laamngo waɗde hesɗi platform é ɓeydude waɗde maɓɓe',
    'cookies.usage.item2': 'Maatude cuɓal maa é laamngo maa ngam kuutoraade ɓeydude',
    'cookies.usage.item3': 'Fannuuji kuutoraade platform ngam yiɓde ɓeynguuji é ɓeydude jokkondiral amen',
    'cookies.usage.item4': 'Hokkude ɓeynguuji hesɗi é haɓɓe ɓeynguuji ɓeydude',
    'cookies.management.content': 'A jogii laamngo e cookies. Hello web ɗuuɗɗe ina laamngo yamiraade cookies, kono a waawi waylude laamngo navigator maa ngam yamiraade cookies so a yiɓii.',
    'cookies.management.browser.title': 'Laamngo Navigator',
    'cookies.management.browser.content': 'A waawi laamngo cookies e laamngo navigator maa. Navigator kala jogii ɓeynguuji ɗuuɗɗe ngam laamngo cookies. Yiɓo menu wallitorde navigator maa ngam keɓe ɓeydude.',
    'cookies.management.impact.title': 'Ɓeydude Mbatu',
    'cookies.management.impact.content': 'So a cuɓii mbatu cookies, ɓeynguuji ɗuuɗɗe platform waawi waɗaade hesɗi. Cookies hesɗi ɗuuɗɗe ngam waɗde fuɗɗi platform é ɗuuɗɗe alaa waawi mbatu.',
    'cookies.thirdParty.content': 'Cookies ɗuuɗɗe e platform amen ina laamngo e jokkondiral tati ɗuuɗɗe ina hollira e hello amen.',
    'cookies.thirdParty.services.title': 'Jokkondiral Tati',
    'cookies.thirdParty.services.content': 'Min waawi kuutoraade jokkondiral fannuuji tati (no Google Analytics) ɗuuɗɗe ina kuutoraade cookies maɓɓe ngam ɓeydude keɓe e kuutoraade maa platform amen. Cookies ɗee ina laamngo e laamngo hesɗi tati ɗuuɗɗe.',
    'cookies.changes.content': 'Min waawi waylude laamngo cookies oo e wakati kala ngam hollirde waylude e ɓeynguuji min kuutoraade walla ɓeynguuji goɗɗe waɗde, laamngo, walla laamngo. Min ina wallit maa yiɓde hello oo e wakati kala ngam anndude kuutoraade maa cookies.',
    'cookies.contact.content': 'So a jogii laawol e kuutoraade maa cookies, jokkondir amen:',
    'cookies.contact.email': 'contact@camerfarmai.com',
    'cookies.banner.title': 'Min ina kuutora cookies',
    'cookies.banner.description': 'Hello oo ina kuutora cookies ngam ɓeydude kuutoraade maa. A waawi yamiraade cookies ɗuuɗɗe, yamiraade ɗee, walla ɓeydude cuɓal maa.',
    'cookies.banner.acceptAll': 'Yamiraade Fof',
    'cookies.banner.rejectAll': 'Yamiraade Fof',
    'cookies.banner.customize': 'Ɓeydude',
    'cookies.preferences.title': 'Laamngo cuɓal cookies maa',
    'cookies.preferences.description': 'Cuɓo fannuuji cookies a yiɓii yamiraade. Cookies hesɗi ɗuuɗɗe ngam waɗde hello é alaa waawi mbatu.',
    'cookies.preferences.essential.label': 'Cookies Hesɗi',
    'cookies.preferences.essential.description': 'Cookies ɗee ɗuuɗɗe ngam waɗde fuɗɗi hello. Ɗee alaa waawi mbatu.',
    'cookies.preferences.analytical.label': 'Cookies Fannuuji',
    'cookies.preferences.analytical.description': 'Cookies ɗee ina wallit min anndude no kuutoroje ina kuutoraade hello amen e ɓeydude keɓe anndaaɗe.',
    'cookies.preferences.functional.label': 'Cookies Waɗde',
    'cookies.preferences.functional.description': 'Cookies ɗee ina waɗde hello maatude cuɓal maa é hokkude ɓeynguuji ɓeydude.',
    'cookies.preferences.marketing.label': 'Cookies Marketing',
    'cookies.preferences.marketing.description': 'Cookies ɗee ina kuutoraade hollirde ads ɗuuɗɗe é fannuuji waɗde ads.',
    'cookies.preferences.save': 'Danndu Cuɓal',
    'cookies.preferences.cancel': 'Uddu',
    'cookies.preferences.acceptAll': 'Yamiraade Fof',
    'cookies.preferences.rejectAll': 'Yamiraade Fof',
    'cookies.preferences.enabled': 'Laamngo',
    'cookies.preferences.disabled': 'Mbatu',
    'cookies.management.currentPreferences': 'Cuɓal maa jeyaaɗe',
    'cookies.management.manageButton': 'Laamngo cuɓal am',
  },
  ew: {
    'nav.home': 'Ndé',
    'nav.support': 'Nsámbí',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphiques',
    'nav.plantations': 'Bisó',
    'nav.ai': 'AI',
    'nav.guide': 'Guide',
    'nav.docs': 'Jokkondiral',
    'nav.privacy': 'Confidentialité',
    'nav.terms': 'Conditions',
    'nav.cookies': 'Cookies',
    'nav.technician': 'Tableau de bord',
    'nav.admin': 'Administration',
    'auth.login': 'Kómbí',
    'auth.signup': 'Sígní',
    'auth.logout': 'Bwá',
    'auth.profile': 'Profil',
    'header.close': 'Fermer',
    'header.menu': 'Menu',
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
    'login.accountDisabled.title': 'Kóntá ábéngá',
    'login.accountDisabled.message': 'Kóntá ábéngá. Bwá sígní ádminístrátór sístémá bó nkóbá nkóbá.',
    'login.accountDisabled.close': 'Férmé',
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
    'forgotPassword.title': 'MÓTÍ ÓBÍ',
    'forgotPassword.subtitle': 'Sígní email wá é min sígní wá jokkol ngam ruttu mótí wá.',
    'forgotPassword.emailLabel': 'Email wá',
    'forgotPassword.emailPlaceholder': 'email.wá@example.com',
    'forgotPassword.submitButton': 'Sígní jokkol ruttu',
    'forgotPassword.submitting': 'Sígní...',
    'forgotPassword.successMessage': 'So email ékpé sígní e sistem wá, jokkol ruttu sígní.',
    'forgotPassword.successHint': 'Bwá email wá (é spam) ngam jokkol ruttu. Jokkol faytí e 1 heure.',
    'forgotPassword.backToLogin': 'Bwá kómbí',
    'forgotPassword.errors.emailRequired': 'Email ékpé',
    'forgotPassword.errors.emailInvalid': 'Email alé mán',
    'resetPassword.title': 'RUTTU MÓTÍ WÁ',
    'resetPassword.subtitle': 'Sígní mótí mán ngam kóntó wá.',
    'resetPassword.newPasswordLabel': 'Mótí mán',
    'resetPassword.newPasswordPlaceholder': 'Mótí mán',
    'resetPassword.confirmPasswordLabel': 'Vérification mótí',
    'resetPassword.confirmPasswordPlaceholder': 'Vérification mótí',
    'resetPassword.submitButton': 'Ruttu mótí',
    'resetPassword.submitting': 'Ruttu...',
    'resetPassword.successMessage': 'Mótí wá ruttu ékpé mbálá. Wá waawi kómbí mbálá.',
    'resetPassword.redirecting': 'Bwá hello kómbí...',
    'resetPassword.validation.title': 'Mótí ékpé:',
    'resetPassword.validation.minLength': 'Mbálá 8',
    'resetPassword.validation.hasUpperCase': 'Mbálá míbalé mán',
    'resetPassword.validation.hasLowerCase': 'Mbálá míbalé alé mán',
    'resetPassword.validation.hasNumber': 'Mbálá nombre',
    'resetPassword.validation.hasSpecialChar': 'Mbálá spécial',
    'resetPassword.errors.tokenMissing': 'Token ruttu alé. Kuutora jokkol wá email.',
    'resetPassword.errors.tokenExpired': 'Token ruttu alé mán walla faytí. Bwá sígní jokkol mán.',
    'resetPassword.errors.passwordMismatch': 'Mótí alé mán',
    'resetPassword.errors.passwordInvalid': 'Mótí alé jokkondira koɗɗe fof',
    'resetPassword.errors.accountDisabled': 'Alé waawi ruttu mótí kóntó ɓaawtaaɗe',
    'resetPassword.requestNewLink': 'Bwá sígní jokkol mán',
    'resetPassword.backToLogin': 'Bwá kómbí',
    'signup.title': 'SÍGNÍ',
    'signup.lastNameLabel': 'Nkómbó',
    'signup.lastNamePlaceholder': 'Sígní nkómbó wá',
    'signup.firstNameLabel': 'Nkómbó ndé',
    'signup.firstNamePlaceholder': 'Sígní nkómbó ndé wá',
    'signup.emailLabel': 'Email wá',
    'signup.emailPlaceholder': 'Sígní email wá',
    'signup.emailHint': 'Email jókón sígní wá so wá sígní email wá',
    'signup.successMessage': 'Sígní mbálá!',
    'signup.successMessageWithEmail': 'Sígní mbálá! Bwá email wá ngam heɓde email jókón wá.',
    'signup.redirecting': 'Bwá hello kómbí...',
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
    'notifications.pageTitle': 'Notifications',
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
    'notifications.markAsRead': 'Máŋgá bóŋ bíŋ',
    'notifications.confirmDelete': 'Ó bóŋ bíŋ sóbí notification éyí?',
    'notifications.plantation': 'Plantation',
    'notifications.stats.title': 'Statistiques Notifications',
    'notifications.stats.total': 'Total',
    'notifications.stats.envoyees': 'Envoyées',
    'notifications.stats.enAttente': 'E attente',
    'notifications.stats.erreurs': 'Erreurs',
    'notifications.stats.nonLues': 'Alé lues',
    'notifications.stats.parCanal': 'E canal',
    'notifications.stats.loading': 'Chargement statistiques...',
    'notifications.filters.all': 'Fof',
    'notifications.filters.web': 'Web',
    'notifications.filters.email': 'Email',
    'notifications.filters.unread': 'Alé lues',
    'notifications.canal.email': 'Email',
    'notifications.canal.web': 'Web',
    'notifications.canal.whatsapp': 'WhatsApp',
    'notifications.status.envoyee': 'Envoyée',
    'notifications.status.enAttente': 'E attente',
    'notifications.status.erreur': 'Erreur',
    'notifications.emailError.hint': '💡 Notification email wá faytí sígní. Yéwtó configuration SMTP backend.',
    'notifications.emailErrors.title': 'Erreurs sígní email détectées',
    'notifications.emailErrors.message': 'notification(s) email faytí sígní. Ékpé hollí koɗɗé máádá ko problème configuration SMTP côté backend.',
    'notifications.emailErrors.check1': 'Yéwtó ko profil máá jókí adresse email valide',
    'notifications.emailErrors.check2': 'Yéwtó configuration SMTP backend (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)',
    'notifications.emailErrors.check3': 'Yíltó logs backend ékpé bayɗé ɓúrɗé',
    'notifications.emailErrors.runDiagnostic': 'Lancer diagnostic',
    'notifications.emailErrors.dismiss': 'Fermer',
    'notifications.deleteAll.button': 'Sóbí fof',
    'notifications.deleteAll.confirm': 'Ó bóŋ bíŋ sóbí notifications fof? Ékpé faytí ruttoowó.',
    'notifications.deleteAll.deleting': 'Sóbí...',
    'notifications.deleteAll.error': 'Erreur wáɗí e sóbí. Notifications ɗíɗí mbaawí wanaa sóbí.',
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
    'technician.loading.stats': 'Nawtude statistiques…',
    'technician.loading.farmers': 'Nawtude agriculteurs…',
    'technician.loading.plantations': 'Nawtude plantations…',
    'technician.loading.details': 'Nawtude détails…',
    'technician.stats.farmers': 'AGRICULTEURS',
    'technician.stats.plantations': 'PLANTATIONS',
    'technician.stats.activeSensors': 'CAPTEURS ACTIFS',
    'technician.stats.actuators': 'ACTIONNEURS',
    'technician.search.placeholder': 'Yiylo agriculteur...',
    'technician.search.loading': 'Yiylo...',
    'technician.section.farmers': 'Agriculteurs',
    'technician.section.plantations': 'Plantations',
    'technician.empty.noFarmers': 'Alaa agriculteurs',
    'technician.empty.noFarmersFound': 'Alaa agriculteurs yiɓɓe',
    'technician.empty.selectFarmer': 'Labo agriculteur',
    'technician.details.sensors': 'Capteurs',
    'technician.details.actuators': 'Actionneurs',
    'technician.details.locationNotSet': 'Alaa nokkuure',
    'technician.errors.loadData': 'Alaa kuuɗe nawtude dataa',
    'technician.errors.search': 'Juumre e yiylo',
    'technician.errors.loadPlantations': 'Alaa kuuɗe nawtude plantations',
    'technician.errors.loadDetails': 'Alaa kuuɗe nawtude détails plantation',
    'technician.retry': 'Yeewto',
    'technician.farmer.label': 'AGRICULTEUR',
    'technician.plantation.singular': 'plantation',
    'technician.plantation.plural': 'plantations',
    'technician.details.owner': 'Propriétaire:',
    'technician.details.activeCount': 'Actifs:',
    'technician.details.thresholds': 'Seuils:',
    'technician.details.noSensors': 'Alaa capteurs e plantation wá',
    'technician.details.noActuators': 'Alaa actionneurs e plantation wá',
    'technician.details.manyInactiveSensors': 'Ɓurɗe 50% capteurs alaa kuuɗe',
    'technician.details.selectPlantation': 'Labo plantation',
    'technician.details.noPlantationsAvailable': 'Alaa plantations heɓɓe',
    'technician.details.lastUpdate': 'Bennawtude sakkitiingo:',
    'technician.details.notAvailable': 'N/A',
    'technician.details.cropType': 'Culture',
    'technician.details.area': 'Superficie',
    'technician.details.location': 'Localisation',
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
    'profile.upload.success': 'Foto jokkondiral ruttu mbálá',
    'profile.errors.upload.fileMissing': 'Fayl alé sélectionner. Bwá sélectionner image.',
    'profile.errors.upload.invalidFormat': 'Format fayl alé mán. Kuutora PNG, JPG, JPEG, GIF walla WEBP.',
    'profile.errors.upload.sessionExpired': 'Kómbí wá faytí. Bwá kómbí kadi.',
    'profile.errors.upload.userNotFound': 'Kuutoro alé mán. Bwá kómbí kadi.',
    'profile.errors.upload.serverError': 'Erreur serveur. Bwá sígní kadi.',
    'profile.errors.upload.networkError': 'Koɗɗe jokkondiral. Bwá vérifier jokkondiral internet wá.',
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
    'docs.title': 'Jokkondiral Bayɗe',
    'docs.subtitle': 'Jokkondiral timminde ngam bayɗe CamerFarm AI',
    'docs.tableOfContents': 'Tabel Keɓe',
    'docs.sections.introduction': 'Fuɗɗo',
    'docs.sections.architecture': 'Laamngo',
    'docs.sections.services': 'Jokkondiral API',
    'docs.sections.components': 'Ɓeynguuji',
    'docs.sections.hooks': 'Hooks',
    'docs.sections.contexts': 'Contextes',
    'docs.sections.pages': 'Helloji',
    'docs.sections.api': 'API Backend',
    'docs.sections.i18n': 'Ɗemngal',
    'docs.sections.utils': 'Kuutorɗe',
    'docs.sections.devGuide': 'Jokkondiral Bayɗe',
    'docs.sections.deployment': 'Jokkondiral',
    'docs.introduction.overview.title': 'Fón',
    'docs.introduction.overview.content': 'CamerFarm AI é platforme intelligente ngam agriculture camerounaise moderne é durable. App React ɗee walla producteurs suivre cultures wá e wakati goonga e IoT é intelligence artificielle.',
    'docs.introduction.tech.title': 'Kuutorɗe Teknoloji',
    'docs.introduction.architecture.title': 'Laamngo Fuɗɗo',
    'docs.introduction.architecture.content': 'App ina kuutora architecture React e TypeScript, Vite, é React Router. API calls ina laamngo e Axios e configuration centralisée.',
    'docs.introduction.prerequisites.title': 'Keɓe Hesɗi',
    'docs.introduction.installation.title': 'Jokkondiral',
    'docs.architecture.structure.title': 'Laamngo Projet',
    'docs.architecture.patterns.title': 'Patterns Kuutorɗe',
    'docs.architecture.dataFlow.title': 'Jokkondiral Keɓe',
    'docs.architecture.dataFlow.content': 'Données ina jokkondira e services API ɓe composants e hooks é contextes. États globaux ina laamngo e Zustand (auth) é React contexts (language, notifications).',
    'docs.services.config.title': 'Laamngo Axios',
    'docs.services.config.content': 'Fichier api.ts ina laamngo Axios e baseURL, interceptors ngam refresh token automatique, é laamngo errors.',
    'docs.services.auth.title': 'Service Authentification',
    'docs.services.auth.description': 'Laamngo authentification, inscription, connexion, refresh token, é profil utilisateur.',
    'docs.services.plantation.title': 'Service Plantations',
    'docs.services.plantation.description': 'Laamngo création, récupération, é mise à jour plantations, é capteurs é actionneurs associés.',
    'docs.services.technician.title': 'Service Technicien',
    'docs.services.technician.description': 'Laamngo dashboard technicien e statistiques, liste agriculteurs, é plantations.',
    'docs.services.notification.title': 'Service Notifications',
    'docs.services.notification.description': 'Laamngo récupération, mise à jour, é suppression notifications.',
    'docs.services.errors.title': 'Laamngo Errors',
    'docs.services.errors.content': 'Services fof ina laamngo errors e manière centralisée e interceptors Axios, e hollirde messages errors appropriés.',
    'docs.services.refresh.title': 'Refresh Token Otomatik',
    'docs.services.refresh.content': 'Sistem refresh token ina laamngo automatiquement e interceptors Axios, e queue requests so refresh e les.',
    'docs.components.auth.title': 'Ɓeynguuji Authentification',
    'docs.components.ui.title': 'Ɓeynguuji UI',
    'docs.components.layout.title': 'Ɓeynguuji Layout',
    'docs.hooks.translation.description': 'Hook ngam accéder traductions multilingues app.',
    'docs.hooks.language.description': 'Hook ngam laamngo changement langue é accéder langue actuelle.',
    'docs.hooks.notifications.description': 'Hook ngam laamngo notifications: récupération, marquer lue, suppression.',
    'docs.hooks.scroll.description': 'Hook ngam animer éléments e scroll page.',
    'docs.contexts.auth.description': 'Contexte React ngam laamngo état authentification global app.',
    'docs.contexts.language.description': 'Contexte React ngam laamngo langue sélectionnée é traductions.',
    'docs.contexts.notification.description': 'Contexte React ngam laamngo notifications wakati goonga.',
    'docs.pages.list.title': 'Liste Helloji',
    'docs.pages.routes.title': 'Routes',
    'docs.pages.routes.content': 'Routes ina laamngo e App.tsx e React Router. Routes ɗuuɗɗe ko publiques, ɗuuɗɗe ina ɗaɓɓa authentification.',
    'docs.pages.protection.title': 'Laamngo Routes',
    'docs.pages.protection.content': 'Routes protégées ina kuutora ProtectedRoute, PublicRoute, walla RoleBasedRoute e nder access level requis.',
    'docs.api.endpoints.title': 'Endpoints Hesɗi',
    'docs.api.endpoints.content': 'API backend ina hollir endpoints ɗuuɗɗe ngam authentification, plantations, capteurs, notifications, é ɗuuɗɗe.',
    'docs.api.auth.title': 'Endpoints Authentification',
    'docs.api.plantations.title': 'Endpoints Plantations',
    'docs.api.format.title': 'Format Requests/Responses',
    'docs.api.format.content': 'Requêtes ina kuutora JSON ngam body, é réponses ko e JSON. Authentification ina waɗaade e Bearer token e header Authorization.',
    'docs.i18n.system.title': 'Sistem Traductions',
    'docs.i18n.system.content': 'App ina kuutora sistem traductions centralisé e wallitorde 4 ɗemngal: Français, English, Fulfulde, é Ewondo.',
    'docs.i18n.languages.title': 'Ɗemngal Wallitɗe',
    'docs.i18n.files.title': 'Fichiers Traductions',
    'docs.i18n.files.content': 'Traductions fof ina centralisé e src/utils/translations.ts e type TypeScript ngam sécurité clés.',
    'docs.i18n.adding.title': 'Ɓeydude Traductions Hesɗi',
    'docs.i18n.adding.content': 'Ngam ɓeydude traduction hesɗi, ɓeydu clé e type TranslationKey, ɓaawo ɓeydu traductions e 4 ɗemngal e objet translations.',
    'docs.utils.sensorStatus.description': 'Kuutorɗe ngam fannude statut capteurs (actif, inactif, hors ligne) e nder dernières lectures.',
    'docs.utils.paramsSerializer.description': 'Sérialiseur personnalisé ngam paramètres requête, notamment ngam tableaux (ex: search[]=mot1&search[]=mot2).',
    'docs.utils.notificationFormatters.description': 'Fonctions ngam formater notifications e nder type é contenu maɓɓe.',
    'docs.utils.emailDiagnostic.description': 'Kuutorɗe ngam diagnostiquer laawol notifications email.',
    'docs.devGuide.standards.title': 'Standards Code',
    'docs.devGuide.standards.typescript': 'Kuutora TypeScript ngam fichiers fof, e typage strict.',
    'docs.devGuide.standards.components': 'Ɓeynguuji fonctionnels e hooks React, alaa classes.',
    'docs.devGuide.standards.naming': 'Nommage camelCase ngam variables/fonctions, PascalCase ngam ɓeynguuji.',
    'docs.devGuide.standards.styles': 'Kuutora CSS Modules ngam styles fof, e nommage BEM-like.',
    'docs.devGuide.conventions.title': 'Conventions',
    'docs.devGuide.conventions.files': 'Ɓeynguuji gooto = fichier .tsx gooto + fichier .module.css gooto',
    'docs.devGuide.conventions.components': 'Ɓeynguuji e src/components/, helloji e src/app/',
    'docs.devGuide.conventions.hooks': 'Hooks personnalisés e src/hooks/ e préfixe use',
    'docs.devGuide.conventions.services': 'Services API e src/services/ e suffixe Service',
    'docs.devGuide.structure.title': 'Laamngo Ɓeynguuji',
    'docs.devGuide.structure.content': 'Ɓeynguuji kala ina foti modulaire, réutilisable, é jokkondiraade ɓurɗe. Kuutora props TypeScript ngam sécurité types.',
    'docs.deployment.build.title': 'Build Production',
    'docs.deployment.env.title': 'Keɓe Nokkuure',
    'docs.deployment.config.title': 'Laamngo',
    'docs.deployment.config.content': 'Build production ina ɓeydude dossier dist/ e fichiers optimisés. Laamngo VITE_API_URL ngam pointer e API production.',
    'privacy.title': 'Politique Confidentialité',
    'privacy.subtitle': 'Fón no min ɓeydude, kuutorɗe, é laamngo keɓe wá.',
    'privacy.tableOfContents': 'Tabel Keɓe',
    'privacy.sections.introduction': 'Fuɗɗo',
    'privacy.sections.dataCollection': 'Ɓeydude Keɓe',
    'privacy.sections.dataUsage': 'Kuutoraade Keɓe',
    'privacy.sections.dataSharing': 'Jokkondiral Keɓe',
    'privacy.sections.dataSecurity': 'Laamngo Keɓe',
    'privacy.sections.yourRights': 'Haɓɓe Wá',
    'privacy.sections.cookies': 'Cookies',
    'privacy.sections.changes': 'Waylude',
    'privacy.sections.contact': 'Jokkondiral',
    'privacy.introduction.content': 'CamerFarm AI ina foti laamngo suuduɓe wá é keɓe wá. Koɗɗe oo ina hollira no min ɓeydude, kuutorɗe, jokkondiraade, é laamngo keɓe wá so wá kuutoraade platforme amen.',
    'privacy.introduction.lastUpdated': 'Bennawtude sakkitiingo: Yanwiye 2025',
    'privacy.dataCollection.personalData.title': 'Keɓe Kuutoro',
    'privacy.dataCollection.personalData.content': 'Min ina ɓeydude keɓe ɗee so wá waɗde kontó walla kuutoraade jokkondiral amen:',
    'privacy.dataCollection.personalData.item1': 'Innde é innde fuɗɗorde',
    'privacy.dataCollection.personalData.item2': 'Adresse email',
    'privacy.dataCollection.personalData.item3': 'Núméro téléphone',
    'privacy.dataCollection.personalData.item4': 'Keɓe e nder bisó wá (nokkuure, laawol, type culture)',
    'privacy.dataCollection.personalData.item5': 'Keɓe capteurs é actionneurs e nder bisó wá',
    'privacy.dataCollection.usageData.title': 'Keɓe Kuutoraade',
    'privacy.dataCollection.usageData.content': 'Min ina ɓeydude keɓe ɗuuɗɗe otomatik so wá kuutoraade platforme amen:',
    'privacy.dataCollection.usageData.item1': 'Adresse IP é keɓe ɓeyngu wá',
    'privacy.dataCollection.usageData.item2': 'Helloji yiɓɓe é ɓeynguuji waɗɗe',
    'privacy.dataCollection.usageData.item3': 'Keɓe kómbí é wakati kuutoraade',
    'privacy.dataUsage.content': 'Min ina kuutora keɓe wá ngam:',
    'privacy.dataUsage.item1': 'Hokki é ɓeydude jokkondiral amen',
    'privacy.dataUsage.item2': 'Waɗde kuutoraade wá mán',
    'privacy.dataUsage.item3': 'Nelde tindinɗe hesɗi e nder bisó wá',
    'privacy.dataUsage.item4': 'Fannude kuutoraade platforme ngam ɓeydude jokkondiral amen',
    'privacy.dataUsage.item5': 'Laamngo koɗɗe laawol',
    'privacy.dataSharing.content': 'Min alaa reende keɓe kuutoro wá. Min waawi jokkondiraade keɓe wá tan e nder ɓeynguuji ɗee:',
    'privacy.dataSharing.thirdParties.title': 'Prestataires Services',
    'privacy.dataSharing.thirdParties.content': 'Min waawi jokkondiraade keɓe wá e prestataires services kisal ɓe walla min waɗde platforme amen (hébergement, analyse, tintine). Prestataires ɗee ina foti laamngo keɓe wá.',
    'privacy.dataSharing.legal.title': 'Koɗɗe Laawol',
    'privacy.dataSharing.legal.content': 'Min waawi hollirde keɓe wá so laawol ina ɗaɓɓa walla ngam laamngo haɓɓe amen é kisal kuutoroje amen.',
    'privacy.dataSecurity.content': 'Min ina waɗde ɓeynguuji laamngo hesɗi ngam laamngo keɓe wá:',
    'privacy.dataSecurity.item1': 'Chiffrement keɓe kisal',
    'privacy.dataSecurity.item2': 'Tiimtinde kisal e mótí ɓurɗe',
    'privacy.dataSecurity.item3': 'Jokkondiral keɓe kuutoro e nder laamngo',
    'privacy.dataSecurity.item4': 'Jokkondiral wakati goonga sistem laamngo amen',
    'privacy.yourRights.content': 'Wá jogii haɓɓe ngam:',
    'privacy.yourRights.item1': 'Heɓde keɓe kuutoro wá',
    'privacy.yourRights.item2': 'Waylude walla bennawtude keɓe wá',
    'privacy.yourRights.item3': 'Ƴeewto mbatu keɓe wá',
    'privacy.yourRights.item4': 'Ƴeewto laamngo keɓe wá',
    'privacy.yourRights.item5': 'Ƴeewto kopi keɓe wá',
    'privacy.cookies.content': 'Min ina kuutora cookies ngam ɓeydude kuutoraade wá e platforme amen. Cookies ko fayluji tekstuuji ɗuuɗɗe e nder ɓeyngu wá.',
    'privacy.cookies.types.title': 'Fannuuji Cookies',
    'privacy.cookies.types.content': 'Min ina kuutora cookies hesɗi ngam waɗde platforme é cookies fannuuji ngam anndude no wá kuutoraade jokkondiral amen.',
    'privacy.cookies.management.title': 'Laamngo Cookies',
    'privacy.cookies.management.content': 'Wá waawi laamngo cookies wá e laamngo navigator wá. Anndu ko mbatu cookies ɗuuɗɗe waawi ɓeydude waɗde platforme.',
    'privacy.changes.content': 'Min waawi bennawtude koɗɗe oo e wakati ɗuuɗɗe. Min ina hollirde wá waylude hesɗi e ɓeydude koɗɗe hesɗi e hello oo é bennawtude "Bennawtude sakkitiingo".',
    'privacy.contact.content': 'So wá jogii laawol e nder koɗɗe oo walla wá waawi waɗde haɓɓe wá, jokkondir amen:',
    'privacy.contact.email': 'contact@camerfarmai.com',
    'terms.title': 'Koɗɗe Kuutoraade',
    'terms.subtitle': 'Fón koɗɗe é laamngo kuutoraade platforme amen.',
    'terms.tableOfContents': 'Tabel Keɓe',
    'terms.sections.introduction': 'Fuɗɗo',
    'terms.sections.acceptance': 'Laamngo Koɗɗe',
    'terms.sections.serviceUsage': 'Kuutoraade Jokkondiral',
    'terms.sections.userAccount': 'Kóntó Kuutoro',
    'terms.sections.intellectualProperty': 'Laamngo Keɓe',
    'terms.sections.liability': 'Limitation Responsabilité',
    'terms.sections.termination': 'Bwá',
    'terms.sections.changes': 'Waylude',
    'terms.sections.contact': 'Jokkondiral',
    'terms.introduction.content': 'Wá heɓii e CamerFarm AI. Koɗɗe ɗee ina laamngo jokkondiral wá é kuutoraade wá platforme amen. So wá kuutoraade jokkondiral amen, wá laamngo koɗɗe ɗee.',
    'terms.introduction.lastUpdated': 'Bennawtude sakkitiingo: Yanwiye 2025',
    'terms.acceptance.content': 'So wá heɓii walla kuutoraade CamerFarm AI, wá laamngo koɗɗe ɗee. So wá alé laamngo koɗɗe ɗee, wá fotaa kuutoraade jokkondiral amen.',
    'terms.acceptance.item1': 'Wá foti jogii duuɓi 18 ngam kuutoraade jokkondiral oo',
    'terms.acceptance.item2': 'Wá jogii laamngo laamngo suuduɓe kóntó wá',
    'terms.acceptance.item3': 'Wá laamngo hokki keɓe goonga é bennawtude',
    'terms.serviceUsage.content': 'CamerFarm AI ina hokki platforme ngam laamngo bisó hesɗi. Wá laamngo kuutoraade jokkondiral amen e nder laamngo koɗɗe ɗee.',
    'terms.serviceUsage.allowed.title': 'Kuutoraade Laamngo',
    'terms.serviceUsage.allowed.item1': 'Laamngo bisó wá é jokkondiral keɓe maɓɓe',
    'terms.serviceUsage.allowed.item2': 'Kuutoraade ɓeynguuji AI ngam yiɓde cuɓal',
    'terms.serviceUsage.allowed.item3': 'Heɓde keɓe capteurs wá e wakati goonga',
    'terms.serviceUsage.allowed.item4': 'Heɓde tindinɗe é alertes e nder bisó wá',
    'terms.serviceUsage.prohibited.title': 'Kuutoraade Ƴeewtude',
    'terms.serviceUsage.prohibited.item1': 'Kuutoraade jokkondiral oo ngam ɓeynguuji laawol walla fayde',
    'terms.serviceUsage.prohibited.item2': 'Ƴeewto heɓde kóntó walla keɓe kuutoroje goɗɗe',
    'terms.serviceUsage.prohibited.item3': 'Ƴeewto walla ɓeydude waɗde jokkondiral',
    'terms.serviceUsage.prohibited.item4': 'Waɗde kopi, walla reende jokkondiral oo alaa laamngo',
    'terms.userAccount.content': 'Ngam kuutoraade ɓeynguuji ɗuuɗɗe CamerFarm AI, wá foti waɗde kóntó. Wá jogii laamngo ɓeynguuji fof ɗe ina waɗde e nder kóntó wá.',
    'terms.userAccount.responsibility.title': 'Laamngo Kóntó',
    'terms.userAccount.responsibility.item1': 'Laamngo kisal mótí wá',
    'terms.userAccount.responsibility.item2': 'Hollirde min otomatik so wá jogii kuutoraade alaa laamngo kóntó wá',
    'terms.userAccount.responsibility.item3': 'Laamngo keɓe kóntó wá ina goonga é bennawtude',
    'terms.userAccount.security.title': 'Kisal Kóntó',
    'terms.userAccount.security.content': 'Min ina waɗde ɓeynguuji kisal ngam laamngo kóntó wá, kono wá jogii laamngo laamngo keɓe kómbí wá.',
    'terms.intellectualProperty.content': 'Keɓe fof, ɓeynguuji, é teknoloji CamerFarm AI ina laamngo e koɗɗe laamngo keɓe.',
    'terms.intellectualProperty.ownership.title': 'Laamngo CamerFarm AI',
    'terms.intellectualProperty.ownership.content': 'CamerFarm AI é keɓe maɓɓe, ɗuuɗɗe tekstuuji, giraafuuji, logos, icônes, njaaje, clips audio é vidéo, téléchargements numériques é compilations keɓe, ko laamngo CamerFarm AI walla hokkiiɓe keɓe maɓɓe é ina laamngo e koɗɗe copyright é koɗɗe goɗɗe laamngo keɓe.',
    'terms.intellectualProperty.userContent.title': 'Keɓe Kuutoro',
    'terms.intellectualProperty.userContent.content': 'So wá hokkii keɓe e platforme amen, wá hokkii min licence alaa exclusive ngam kuutoraade, waɗde kopi, é jokkondiraade keɓe ɗee e nder jokkondiral amen.',
    'terms.liability.content': 'E nder laamngo laawol, CamerFarm AI alaa jogii laamngo ngam:',
    'terms.liability.item1': 'Dommages directs, indirects, accessoires walla consécutifs ɗe ina yaltude e kuutoraade walla alaa kuutoraade jokkondiral',
    'terms.liability.item2': 'Mbatu keɓe, profits walla ɓeynguuji commerce',
    'terms.liability.item3': 'Interruptions jokkondiral walla laawol teknik',
    'terms.liability.item4': 'Ɓeynguuji walla mbatu ɓeynguuji kuutoroje tati, ɗuuɗɗe hokkiiɓe jokkondiral',
    'terms.termination.content': 'Wá walla CamerFarm AI waawi uddude jokkondiral wá e jokkondiral oo e wakati kala, e ɓeyngu walla alaa ɓeyngu.',
    'terms.termination.user.title': 'Uddu e Kuutoro',
    'terms.termination.user.content': 'Wá waawi uddude kóntó wá e wakati kala e jokkondiraade service client amen walla kuutoraade ɓeynguuji uddu e nder kóntó wá.',
    'terms.termination.service.title': 'Uddu e CamerFarm AI',
    'terms.termination.service.content': 'Min jogii haɓɓe uddude walla uddude jokkondiral wá e jokkondiral oo so wá ɓeydude koɗɗe ɗee walla so min yiɓii kuutoraade wá jokkondiral oo ina ɓeydude kuutoroje goɗɗe walla commerce amen.',
    'terms.changes.content': 'Min jogii haɓɓe waylude koɗɗe ɗee e wakati kala. Min ina hollirde wá waylude hesɗi e ɓeydude version hesɗi e hello oo. Kuutoraade wá jokkondiral oo sakkitiingo ɓaawo ɓeydude waylude ina laamngo waylude hesɗi.',
    'terms.contact.content': 'So wá jogii laawol e nder koɗɗe ɗee, jokkondir amen:',
    'terms.contact.email': 'contact@camerfarmai.com',
    'cookies.title': 'Laamngo Cookies',
    'cookies.subtitle': 'Anndu no min kuutora cookies ngam ɓeydude kuutoraade wá e platforme amen.',
    'cookies.tableOfContents': 'Tabel keɓe',
    'cookies.sections.introduction': 'Fuɗɗo',
    'cookies.sections.types': 'Fannuuji Cookies',
    'cookies.sections.usage': 'Kuutoraade Cookies',
    'cookies.sections.management': 'Laamngo Cookies',
    'cookies.sections.thirdParty': 'Cookies Tati',
    'cookies.sections.changes': 'Waylude',
    'cookies.sections.contact': 'Jokkondiral',
    'cookies.introduction.content': 'CamerFarm AI ina kuutora cookies ngam ɓeydude kuutoraade wá e navigator, fannuuji kuutoraade platforme amen é ɓeydude keɓe. Laamngo oo ina fannu cookies, no min kuutoraade ɗee, é no wá waawi laamngo ɗee.',
    'cookies.introduction.lastUpdated': 'Waylude sakkitiingo: Yanwiye 2025',
    'cookies.types.essential.title': 'Cookies Hesɗi',
    'cookies.types.essential.content': 'Cookies ɗee ɗuuɗɗe ngam waɗde platforme. Ɗee ina waɗde ɓeynguuji fuɗɗi no navigator hesɗi, jokkondiral, é heɓde nder nder ɓeynguuji laamngo. So alaa cookies ɗee, ɓeynguuji ɗuuɗɗe alaa waawi hokkude.',
    'cookies.types.analytical.title': 'Cookies Fannuuji',
    'cookies.types.analytical.content': 'Cookies ɗee ina wallit min anndude no kuutoroje ina jokkondiraade e platform amen e ɓeydude é hollirde keɓe anndaaɗe. Ɗee ina waɗde min ɓeydude waɗde platform e fannuuji kuutoraade.',
    'cookies.types.functional.title': 'Cookies Waɗde',
    'cookies.types.functional.content': 'Cookies ɗee ina waɗde platforme maatude cuɓal wá (no ɓeyngu ɗam wá) é hokkude ɓeynguuji ɓeydude é ɓeydude. Ɗee waawi kuutoraade maatude waylude wá e ɓeydude ɓeyngu tekstu, fontes, é ɓeynguuji goɗɗe hello web wá a waawi ɓeydude.',
    'cookies.types.marketing.title': 'Cookies Marketing',
    'cookies.types.marketing.content': 'Cookies ɗee ina kuutoraade jokkondiraade kuutoroje e hello web ɗuuɗɗe. Ɗuum ina hollirde ads ɗuuɗɗe é ɓeydude ngam kuutoro hesɗi é ɓeydude ngam hokkiiɓe é ads tati.',
    'cookies.usage.content': 'Min ina kuutora cookies ngam ɓeynguuji ɗee:',
    'cookies.usage.item1': 'Laamngo waɗde hesɗi platforme é ɓeydude waɗde maɓɓe',
    'cookies.usage.item2': 'Maatude cuɓal wá é laamngo wá ngam kuutoraade ɓeydude',
    'cookies.usage.item3': 'Fannuuji kuutoraade platforme ngam yiɓde ɓeynguuji é ɓeydude jokkondiral amen',
    'cookies.usage.item4': 'Hokkude ɓeynguuji hesɗi é haɓɓe ɓeynguuji ɓeydude',
    'cookies.management.content': 'Wá jogii laamngo e cookies. Hello web ɗuuɗɗe ina laamngo yamiraade cookies, kono wá waawi waylude laamngo navigator wá ngam yamiraade cookies so wá yiɓii.',
    'cookies.management.browser.title': 'Laamngo Navigator',
    'cookies.management.browser.content': 'Wá waawi laamngo cookies e laamngo navigator wá. Navigator kala jogii ɓeynguuji ɗuuɗɗe ngam laamngo cookies. Yiɓo menu wallitorde navigator wá ngam keɓe ɓeydude.',
    'cookies.management.impact.title': 'Ɓeydude Mbatu',
    'cookies.management.impact.content': 'So wá cuɓii mbatu cookies, ɓeynguuji ɗuuɗɗe platforme waawi waɗaade hesɗi. Cookies hesɗi ɗuuɗɗe ngam waɗde fuɗɗi platforme é ɗuuɗɗe alaa waawi mbatu.',
    'cookies.thirdParty.content': 'Cookies ɗuuɗɗe e platforme amen ina laamngo e jokkondiral tati ɗuuɗɗe ina hollira e hello amen.',
    'cookies.thirdParty.services.title': 'Jokkondiral Tati',
    'cookies.thirdParty.services.content': 'Min waawi kuutoraade jokkondiral fannuuji tati (no Google Analytics) ɗuuɗɗe ina kuutoraade cookies maɓɓe ngam ɓeydude keɓe e kuutoraade wá platforme amen. Cookies ɗee ina laamngo e laamngo hesɗi tati ɗuuɗɗe.',
    'cookies.changes.content': 'Min waawi waylude laamngo cookies oo e wakati kala ngam hollirde waylude e ɓeynguuji min kuutoraade walla ɓeynguuji goɗɗe waɗde, laamngo, walla laamngo. Min ina wallit wá yiɓde hello oo e wakati kala ngam anndude kuutoraade wá cookies.',
    'cookies.contact.content': 'So wá jogii laawol e kuutoraade wá cookies, jokkondir amen:',
    'cookies.contact.email': 'contact@camerfarmai.com',
    'cookies.banner.title': 'Min ina kuutora cookies',
    'cookies.banner.description': 'Hello oo ina kuutora cookies ngam ɓeydude kuutoraade wá. Wá waawi yamiraade cookies ɗuuɗɗe, yamiraade ɗee, walla ɓeydude cuɓal wá.',
    'cookies.banner.acceptAll': 'Yamiraade Fof',
    'cookies.banner.rejectAll': 'Yamiraade Fof',
    'cookies.banner.customize': 'Ɓeydude',
    'cookies.preferences.title': 'Laamngo cuɓal cookies wá',
    'cookies.preferences.description': 'Cuɓo fannuuji cookies wá yiɓii yamiraade. Cookies hesɗi ɗuuɗɗe ngam waɗde hello é alaa waawi mbatu.',
    'cookies.preferences.essential.label': 'Cookies Hesɗi',
    'cookies.preferences.essential.description': 'Cookies ɗee ɗuuɗɗe ngam waɗde fuɗɗi hello. Ɗee alaa waawi mbatu.',
    'cookies.preferences.analytical.label': 'Cookies Fannuuji',
    'cookies.preferences.analytical.description': 'Cookies ɗee ina wallit min anndude no kuutoroje ina kuutoraade hello amen e ɓeydude keɓe anndaaɗe.',
    'cookies.preferences.functional.label': 'Cookies Waɗde',
    'cookies.preferences.functional.description': 'Cookies ɗee ina waɗde hello maatude cuɓal wá é hokkude ɓeynguuji ɓeydude.',
    'cookies.preferences.marketing.label': 'Cookies Marketing',
    'cookies.preferences.marketing.description': 'Cookies ɗee ina kuutoraade hollirde ads ɗuuɗɗe é fannuuji waɗde ads.',
    'cookies.preferences.save': 'Danndu Cuɓal',
    'cookies.preferences.cancel': 'Uddu',
    'cookies.preferences.acceptAll': 'Yamiraade Fof',
    'cookies.preferences.rejectAll': 'Yamiraade Fof',
    'cookies.preferences.enabled': 'Laamngo',
    'cookies.preferences.disabled': 'Mbatu',
    'cookies.management.currentPreferences': 'Cuɓal wá jeyaaɗe',
    'cookies.management.manageButton': 'Laamngo cuɓal am',
  },
};

export function getTranslation(key: TranslationKey, language: Language): string {
  const translation = translations[language]?.[key];
  return translation || key;
}
