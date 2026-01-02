import type { Language } from '@/contexts/LanguageContext';

export type TranslationKey = string;

export const translations: Record<Language, Record<string, string>> = {
  fr: {
    'graphs.selectPlantation': 'Sélectionnez une plantation',
    'graphs.viewMyPlantations': 'Voir mes plantations',
    'graphs.noSensorsAvailable': 'Aucun capteur disponible pour cette plantation',
    'graphs.noDataForSelectedSensors': 'Aucune donnée pour les capteurs sélectionnés',
    'graphs.noSensorSelected': 'Aucun capteur sélectionné',
    'graphs.noDataForSensor': 'Aucune donnée pour ce capteur',
    'graphs.dataPointsLoaded': '{count} points chargés pour {sensorKey}',
    'graphs.noSensorsWithData': 'Aucun capteur avec des données',
    'graphs.loading': 'Chargement des données des capteurs...'
  },
  en: {},
  ff: {},
  ew: {},
};

export function getTranslation(key: TranslationKey | string, language: Language): string {
  return translations[language]?.[key] || String(key);
}

export default translations;
