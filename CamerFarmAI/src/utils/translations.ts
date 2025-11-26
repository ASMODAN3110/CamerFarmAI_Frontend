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
  | 'login.passwordLabel'
  | 'login.passwordPlaceholder'
  | 'login.submitButton'
  | 'login.submitting'
  | 'login.forgotPassword'
  | 'login.noAccount'
  | 'login.signupLink'
  | 'login.backToHome'
  | 'login.errors.emailRequired'
  | 'login.errors.emailInvalid'
  | 'login.errors.passwordRequired'
  | 'login.errors.passwordMinLength'
  | 'login.errors.loginFailed'
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
  | 'signup.errors.lastNameRequired'
  | 'signup.errors.firstNameRequired'
  | 'signup.errors.emailRequired'
  | 'signup.errors.emailInvalid'
  | 'signup.errors.phoneRequired'
  | 'signup.errors.phoneInvalid'
  | 'signup.errors.passwordRequired'
  | 'signup.errors.passwordMinLength'
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
  | 'plantations.createModal.locationLabel'
  | 'plantations.createModal.locationPlaceholder'
  | 'plantations.createModal.next'
  | 'plantations.createModal.cancel'
  | 'plantations.createModal.submitting'
  | 'plantations.createModal.errors.nameRequired'
  | 'plantations.createModal.errors.areaRequired'
  | 'plantations.createModal.errors.areaInvalid'
  | 'plantations.createModal.errors.locationRequired'
  | 'notifications.title'
  | 'notifications.empty'
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
  | 'graphs.sensors.luminosity'
  | 'graphs.sensors.co2'
  | 'graphs.dateFrom'
  | 'graphs.dateTo'
  | 'graphs.applyFilter'
  | 'graphs.chart.title'
  | 'monitoring.sensors.title'
  | 'monitoring.sensors.temperature'
  | 'monitoring.sensors.soilHumidity'
  | 'monitoring.sensors.co2'
  | 'monitoring.sensors.luminosity'
  | 'monitoring.sensors.waterLevel'
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
  | 'monitoring.mode.automatic'
  | 'monitoring.mode.manual'
  | 'monitoring.mode.automaticInfo';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr: {
    'nav.home': 'Accueil',
    'nav.support': 'Support',
    'nav.monitoring': 'Monitoring',
    'nav.graphs': 'Graphique',
    'nav.plantations': 'Plantation',
    'nav.ai': 'IA',
    'auth.login': 'Se Connecter',
    'auth.signup': "S'inscrire",
    'auth.logout': 'Déconnexion',
    'auth.profile': 'Profil',
    'login.title': 'CONNEXION',
    'login.emailLabel': 'Adresse email',
    'login.emailPlaceholder': 'Adresse email',
    'login.passwordLabel': 'Mot de passe',
    'login.passwordPlaceholder': 'Mot de passe',
    'login.submitButton': 'Se Connecter',
    'login.submitting': 'Connexion...',
    'login.forgotPassword': 'Mot de passe oublié ?',
    'login.noAccount': 'Vous n\'avez pas de compte ?',
    'login.signupLink': 'Inscrivez-vous.',
    'login.backToHome': 'Retour à l\'accueil',
    'login.errors.emailRequired': 'L\'adresse email est requise',
    'login.errors.emailInvalid': 'L\'adresse email n\'est pas valide',
    'login.errors.passwordRequired': 'Le mot de passe est requis',
    'login.errors.passwordMinLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'login.errors.loginFailed': 'Échec de la connexion. Vérifiez vos identifiants.',
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
    'signup.errors.lastNameRequired': 'Le nom est requis',
    'signup.errors.firstNameRequired': 'Le prénom est requis',
    'signup.errors.emailRequired': 'L\'adresse email est requise',
    'signup.errors.emailInvalid': 'L\'adresse email n\'est pas valide',
    'signup.errors.phoneRequired': 'Le numéro de téléphone est requis',
    'signup.errors.phoneInvalid': 'Le numéro de téléphone n\'est pas valide',
    'signup.errors.passwordRequired': 'Le mot de passe est requis',
    'signup.errors.passwordMinLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'signup.errors.confirmPasswordRequired': 'La confirmation du mot de passe est requise',
    'signup.errors.passwordsMismatch': 'Les mots de passe ne correspondent pas',
    'signup.errors.signupFailed': 'Échec de l\'inscription. Veuillez réessayer.',
    'notifications.title': 'Notifications',
    'notifications.empty': 'Aucune notification',
    'hero.heading': 'CamerFarm AI Connecte Les Producteurs À Leurs Terres Grâce À L\'IoT, Offrant Un Suivi Précis Des Cultures Et La Détection Rapide Des Maladies Grâce À L\'Intelligence Artificielle Pour Transformer Durablement L\'agriculture Camerounaise.',
    'features.automation.title': 'Automatisation',
    'features.automation.description': 'Gérez Votre Irrigation, Ventilation Et Eclairage Sans Effort. Notre Système Autonome, Alimenté Par Energie Solaire, Garantit Que Les Taches Essentielles S\'exécutent Meme En Cas De Coupure De Courant.',
    'features.ai.title': 'AI Intégré',
    'features.ai.description': 'Identifiez Les Maladies Des Cultures Par Simple Photo Et Recevez Des Recommandations De Traitement Immédiates. Accédez À Des Conseils Agricoles Personnalisés En Français, Anglais Et Langues Locales.',
    'features.realtime.title': 'Suivi En Temps Réel',
    'features.realtime.description': 'Visualisez Les Conditions Critiques De Votre Champ À Distance : Humidité Du Sol, Température, CO2 Et Niveau D\'eau. Recevez Des Alertes En Temps Réel Pour Anticiper Les Risques Climatiques Et Les Anomalies.',
    'benefits.yield.title': 'Augmenter le rendement des produits',
    'benefits.energy.title': 'Réduire la consommation d\'énergie par acre',
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
    'plantations.empty.message': 'Il semble que vous n\'ayez créé une plantation.',
    'plantations.empty.action': 'Créer-en',
    'plantations.empty.icon': 'Aucune plantation',
    'plantations.slogan.line1': 'Modernisez vos cultures, automatisez vos tâches et améliorez vos récoltes',
    'plantations.slogan.line2': 'L\'agriculture connectée et automatisée c\'est l\'avenir',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Bienvenue sur votre tableau de bord Smart Farming.',
    'graphs.welcome.description': 'Visualisez en temps réel les données de vos capteurs pour mieux comprendre l\'état de vos parcelles et optimiser vos interventions.',
    'graphs.welcome.hint': 'Utilisez les boutons ci-dessous pour filtrer les types de capteurs (Humidité, température, CO₂, etc.)',
    'graphs.sensors.humidity': 'Capteur Humidité du sol',
    'graphs.sensors.temperature': 'Capteur Température ambiante',
    'graphs.sensors.luminosity': 'Capteur de luminosité',
    'graphs.sensors.co2': 'Capteur de CO2',
    'graphs.dateFrom': 'Du',
    'graphs.dateTo': 'Au',
    'graphs.applyFilter': 'Appliquer Filtre',
    'graphs.chart.title': 'Évolution',
    'monitoring.sensors.title': 'Valeurs des capteurs en temps réel',
    'monitoring.sensors.temperature': 'Température',
    'monitoring.sensors.soilHumidity': 'Humidité du sol',
    'monitoring.sensors.co2': 'Taux de CO2',
    'monitoring.sensors.luminosity': 'Luminosité',
    'monitoring.sensors.waterLevel': 'Niveau d\'eau',
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
    'monitoring.mode.automatic': 'Automatique',
    'monitoring.mode.manual': 'Manuel',
    'monitoring.mode.automaticInfo': 'Mode automatique activé : Les équipements sont contrôlés automatiquement selon les données des capteurs.',
    'plantations.createModal.title': 'Entrez les informations du champ',
    'plantations.createModal.nameLabel': 'Nom de votre plantation',
    'plantations.createModal.namePlaceholder': 'Entrer le nom de votre plantation',
    'plantations.createModal.areaLabel': 'Superficie de plantation',
    'plantations.createModal.areaPlaceholder': 'Entrer la superficie de votre plantation',
    'plantations.createModal.locationLabel': 'Localisation',
    'plantations.createModal.locationPlaceholder': 'Entrer la zone de votre plantation',
    'plantations.createModal.next': 'Suivant',
    'plantations.createModal.cancel': 'Annuler',
    'plantations.createModal.submitting': 'Création...',
    'plantations.createModal.errors.nameRequired': 'Le nom de la plantation est requis',
    'plantations.createModal.errors.areaRequired': 'La superficie est requise',
    'plantations.createModal.errors.areaInvalid': 'La superficie doit être un nombre valide',
    'plantations.createModal.errors.locationRequired': 'La localisation est requise',
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
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': 'Password',
    'login.submitButton': 'Log In',
    'login.submitting': 'Logging in...',
    'login.forgotPassword': 'Forgot password?',
    'login.noAccount': 'Don\'t have an account?',
    'login.signupLink': 'Sign up.',
    'login.backToHome': 'Back to home',
    'login.errors.emailRequired': 'Email address is required',
    'login.errors.emailInvalid': 'Email address is invalid',
    'login.errors.passwordRequired': 'Password is required',
    'login.errors.passwordMinLength': 'Password must be at least 6 characters',
    'login.errors.loginFailed': 'Login failed. Please check your credentials.',
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
    'signup.errors.lastNameRequired': 'Last name is required',
    'signup.errors.firstNameRequired': 'First name is required',
    'signup.errors.emailRequired': 'Email address is required',
    'signup.errors.emailInvalid': 'Email address is invalid',
    'signup.errors.phoneRequired': 'Phone number is required',
    'signup.errors.phoneInvalid': 'Phone number is invalid',
    'signup.errors.passwordRequired': 'Password is required',
    'signup.errors.passwordMinLength': 'Password must be at least 6 characters',
    'signup.errors.confirmPasswordRequired': 'Password confirmation is required',
    'signup.errors.passwordsMismatch': 'Passwords do not match',
    'signup.errors.signupFailed': 'Sign up failed. Please try again.',
    'notifications.title': 'Notifications',
    'notifications.empty': 'No notifications',
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
    'plantations.createModal.locationLabel': 'Location',
    'plantations.createModal.locationPlaceholder': 'Enter the zone of your plantation',
    'plantations.createModal.next': 'Next',
    'plantations.createModal.cancel': 'Cancel',
    'plantations.createModal.submitting': 'Creating...',
    'plantations.createModal.errors.nameRequired': 'Plantation name is required',
    'plantations.createModal.errors.areaRequired': 'Area is required',
    'plantations.createModal.errors.areaInvalid': 'Area must be a valid number',
    'plantations.createModal.errors.locationRequired': 'Location is required',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Welcome to your Smart Farming dashboard.',
    'graphs.welcome.description': 'View real-time data from your sensors to better understand the state of your plots and optimize your interventions.',
    'graphs.welcome.hint': 'Use the buttons below to filter sensor types (Humidity, temperature, CO₂, etc.)',
    'graphs.sensors.humidity': 'Soil Humidity Sensor',
    'graphs.sensors.temperature': 'Ambient Temperature Sensor',
    'graphs.sensors.luminosity': 'Luminosity Sensor',
    'graphs.sensors.co2': 'CO2 Sensor',
    'graphs.dateFrom': 'From',
    'graphs.dateTo': 'To',
    'graphs.applyFilter': 'Apply Filter',
    'graphs.chart.title': 'Evolution',
    'monitoring.sensors.title': 'Real-time sensor values',
    'monitoring.sensors.temperature': 'Temperature',
    'monitoring.sensors.soilHumidity': 'Soil Humidity',
    'monitoring.sensors.co2': 'CO2 Rate',
    'monitoring.sensors.luminosity': 'Luminosity',
    'monitoring.sensors.waterLevel': 'Water Level',
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
    'monitoring.mode.automatic': 'Automatic',
    'monitoring.mode.manual': 'Manual',
    'monitoring.mode.automaticInfo': 'Automatic mode enabled: Equipment is controlled automatically based on sensor data.',
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
    'auth.profile': 'Jokkondiral',
    'login.title': 'SEŊO',
    'login.emailLabel': 'Nder email',
    'login.emailPlaceholder': 'Nder email',
    'login.passwordLabel': 'Finnde',
    'login.passwordPlaceholder': 'Finnde',
    'login.submitButton': 'Seŋo',
    'login.submitting': 'Seŋo...',
    'login.forgotPassword': 'Aɗa yejjii finnde?',
    'login.noAccount': 'Aɗa alaa konte?',
    'login.signupLink': 'Winndito.',
    'login.backToHome': 'Rutto fuɗɗo',
    'login.errors.emailRequired': 'Nder email ina tawaa',
    'login.errors.emailInvalid': 'Nder email fotaani',
    'login.errors.passwordRequired': 'Finnde ina tawaa',
    'login.errors.passwordMinLength': 'Finnde ina tawaa koɗɗe 6 ɓuri',
    'login.errors.loginFailed': 'Seŋo Ɓaawtaani. Ɗaɓɓu keɓe maɓɓe.',
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
    'signup.errors.lastNameRequired': 'Innde ina tawaa',
    'signup.errors.firstNameRequired': 'Innde fuɗɗo ina tawaa',
    'signup.errors.emailRequired': 'Nder email ina tawaa',
    'signup.errors.emailInvalid': 'Nder email fotaani',
    'signup.errors.phoneRequired': 'Nder tel ina tawaa',
    'signup.errors.phoneInvalid': 'Nder tel fotaani',
    'signup.errors.passwordRequired': 'Finnde ina tawaa',
    'signup.errors.passwordMinLength': 'Finnde ina tawaa koɗɗe 6 ɓuri',
    'signup.errors.confirmPasswordRequired': 'Fedduɗe finnde ina tawaa',
    'signup.errors.passwordsMismatch': 'Finnde ɗe njaatondiraani',
    'signup.errors.signupFailed': 'Winndito Ɓaawtaani. Ɗaɓɓu yeewto.',
    'notifications.title': 'Tindinɗe',
    'notifications.empty': 'Alaa tindinɗe',
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
    'plantations.createModal.locationLabel': 'Nokkuure',
    'plantations.createModal.locationPlaceholder': 'Naatu nokkuure nguurndam maa',
    'plantations.createModal.next': 'Jokku',
    'plantations.createModal.cancel': 'Dirtu',
    'plantations.createModal.submitting': 'Waɗaade...',
    'plantations.createModal.errors.nameRequired': 'Innde nguurndam ina tawaa',
    'plantations.createModal.errors.areaRequired': 'Leyɗe ina tawaa',
    'plantations.createModal.errors.areaInvalid': 'Leyɗe ina tawaa limoore goonga',
    'plantations.createModal.errors.locationRequired': 'Nokkuure ina tawaa',
    'graphs.title': 'DASHBOARD',
    'graphs.welcome.title': 'Aɗa naatii e jokkondiral maa Smart Farming.',
    'graphs.welcome.description': 'Yiylaade keɓe waktu goonga e jokkondirɗe maɓɓe ngam ɓeyduɗe faamugol nokkuure maɓɓe e ɓeyduɗe tontinɗe maɓɓe.',
    'graphs.welcome.hint': 'Kuutoraade kuuɗe ɗoo les ngam ɓaŋnguɗe nokkuure jokkondirɗe (Ɓuɓɓe, temperatuur, CO₂, e koɗɗe goɗɗe)',
    'graphs.sensors.humidity': 'Jokkondiral Ɓuɓɓe Leyɗe',
    'graphs.sensors.temperature': 'Jokkondiral Temperatuur',
    'graphs.sensors.luminosity': 'Jokkondiral Ndaariɗe',
    'graphs.sensors.co2': 'Jokkondiral CO2',
    'graphs.dateFrom': 'Fuɗɗo',
    'graphs.dateTo': 'Gila',
    'graphs.applyFilter': 'Naatu ɓaŋnguɗe',
    'graphs.chart.title': 'Ɓeydugol',
    'monitoring.sensors.title': 'Keɓe jokkondirɗe waktu goonga',
    'monitoring.sensors.temperature': 'Temperatuur',
    'monitoring.sensors.soilHumidity': 'Ɓuɓɓe Leyɗe',
    'monitoring.sensors.co2': 'Nder CO2',
    'monitoring.sensors.luminosity': 'Ndaariɗe',
    'monitoring.sensors.waterLevel': 'Nder Leyɗe',
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
    'monitoring.equipment.title': 'Toppu kuuɗe e kuuɗe',
    'monitoring.equipment.irrigationPump': 'Pompe Irrigasion',
    'monitoring.equipment.fans': 'Ventilateerɗe',
    'monitoring.equipment.lighting': 'Ndaariɗe',
    'monitoring.mode.automatic': 'Wattinɗam',
    'monitoring.mode.manual': 'Jokkondirɗam',
    'monitoring.mode.automaticInfo': 'Wattinɗam naatnɗam: Kuuɗe ɗe toppataa e wattinɗam ngam keɓe jokkondirɗe.',
  },
};

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key] || key;
}

