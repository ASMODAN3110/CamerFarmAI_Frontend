import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { plantationService, type Sensor, type Actuator, type SensorReading, type SensorType } from '@/services/plantationService';
import {
  FaTint,
  FaSun,
  FaCloud,
  FaWind,
  FaThermometerHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
  FaHandPointer,
  FaArrowLeft,
  FaCircle,
} from 'react-icons/fa';
import styles from './MonitoringPage.module.css';

interface SensorData {
  temperature: number;
  soilHumidity: number;
  co2: number;
  luminosity: number;
  waterLevel: number;
  co2Level?: number;
}

interface EquipmentState {
  irrigationPump: boolean;
  fans: boolean;
  lighting: boolean;
}

// Widget de température avec jauge semi-circulaire
function TemperatureWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const min = -10;
  const max = 50;
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90; // -90 à 90 degrés

  return (
    <div className={styles.monitoringPage__widget}>
      <div className={styles.monitoringPage__widgetHeader}>
        <div className={styles.monitoringPage__widgetTitle}>
          <Icon icon={FaThermometerHalf} size={20} />
          {t('monitoring.sensors.temperature')}
          <div className={`${styles.monitoringPage__statusIndicator} ${isActive ? styles.monitoringPage__statusIndicatorActive : styles.monitoringPage__statusIndicatorInactive}`}>
            <FaCircle size={8} />
          </div>
        </div>
        <div className={styles.monitoringPage__widgetUpdated}>
          {t('monitoring.updated')}: {updatedAt}
        </div>
      </div>
      <div className={styles.monitoringPage__gaugeContainer}>
        <svg
          className={styles.monitoringPage__gauge}
          viewBox="0 0 200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arc de fond */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Arc de valeur */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#10B981"
            strokeWidth="12"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            strokeLinecap="round"
            transform="rotate(0 100 100)"
          />
          {/* Marqueurs */}
          {[-10, 0, 10, 20, 30, 40, 50].map((mark, index) => {
            const markAngle = ((mark - min) / (max - min)) * 180 - 90;
            const rad = (markAngle * Math.PI) / 180;
            const x1 = 100 + 80 * Math.cos(rad);
            const y1 = 100 - 80 * Math.sin(rad);
            const x2 = 100 + 92 * Math.cos(rad);
            const y2 = 100 - 92 * Math.sin(rad);
            return (
              <g key={mark}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="2" />
                <text
                  x={100 + 105 * Math.cos(rad)}
                  y={100 - 105 * Math.sin(rad)}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {mark}
                </text>
              </g>
            );
          })}
          {/* Aiguille */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="#10B981" />
        </svg>
        <div className={styles.monitoringPage__gaugeValue}>
          {value.toFixed(1)}°C
        </div>
      </div>
    </div>
  );
}

// Widget d'humidité du sol avec barre de progression horizontale
function SoilHumidityWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const getStatus = () => {
    if (value >= 50 && value <= 70) return { text: t('monitoring.status.optimal'), color: '#10B981' };
    if (value < 50) return { text: t('monitoring.status.low'), color: '#ef4444' };
    return { text: t('monitoring.status.high'), color: '#f59e0b' };
  };
  const status = getStatus();

  return (
    <div className={styles.monitoringPage__widget}>
      <div className={styles.monitoringPage__widgetHeader}>
        <div className={styles.monitoringPage__widgetTitle}>
          <Icon icon={FaTint} size={20} />
          {t('monitoring.sensors.soilHumidity')}
          <div className={`${styles.monitoringPage__statusIndicator} ${isActive ? styles.monitoringPage__statusIndicatorActive : styles.monitoringPage__statusIndicatorInactive}`}>
            <FaCircle size={8} />
          </div>
        </div>
        <div className={styles.monitoringPage__widgetUpdated}>
          {t('monitoring.updated')}: {updatedAt}
        </div>
      </div>
      <div className={styles.monitoringPage__humidityContainer}>
        <div className={styles.monitoringPage__humidityValue}>{value}%</div>
        <div className={styles.monitoringPage__humidityStatus} style={{ color: status.color }}>
          {status.text}
        </div>
        <div className={styles.monitoringPage__progressBar}>
          <div className={styles.monitoringPage__progressBarTrack}>
            <div
              className={styles.monitoringPage__progressBarFill}
              style={{ width: `${value}%`, backgroundColor: status.color }}
            />
          </div>
          <div className={styles.monitoringPage__progressBarLabels}>
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Widget de CO2 avec jauge semi-circulaire
function CO2Widget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const min = 0;
  const max = 2500;
  const percentage = (value / max) * 100;
  const angle = (percentage / 100) * 180 - 90;

  const getColor = () => {
    if (value <= 625) return '#10B981'; // Green
    if (value <= 1250) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const color = getColor();
  const getStatus = () => {
    if (value <= 625) return t('monitoring.status.good');
    if (value <= 1250) return t('monitoring.status.moderate');
    return t('monitoring.status.critical');
  };

  return (
    <div className={styles.monitoringPage__widget}>
      <div className={styles.monitoringPage__widgetHeader}>
        <div className={styles.monitoringPage__widgetTitle}>
          <Icon icon={FaWind} size={20} />
          {t('monitoring.sensors.co2')}
          <div className={`${styles.monitoringPage__statusIndicator} ${isActive ? styles.monitoringPage__statusIndicatorActive : styles.monitoringPage__statusIndicatorInactive}`}>
            <FaCircle size={8} />
          </div>
        </div>
        <div className={styles.monitoringPage__widgetUpdated}>
          {t('monitoring.updated')}: {updatedAt}
        </div>
      </div>
      <div className={styles.monitoringPage__gaugeContainer}>
        <svg
          className={styles.monitoringPage__gauge}
          viewBox="0 0 200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arc vert (0-625) */}
          <path
            d="M 20 100 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="#10B981"
            strokeWidth="12"
          />
          {/* Arc orange (625-1250) */}
          <path
            d="M 100 20 A 80 80 0 0 1 150 60"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="12"
          />
          {/* Arc rouge (1250-2500) */}
          <path
            d="M 150 60 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="12"
          />
          {/* Marqueurs */}
          {[0, 625, 1250, 1875, 2500].map((mark) => {
            const markPercentage = (mark / max) * 100;
            const markAngle = (markPercentage / 100) * 180 - 90;
            const rad = (markAngle * Math.PI) / 180;
            const x1 = 100 + 80 * Math.cos(rad);
            const y1 = 100 - 80 * Math.sin(rad);
            const x2 = 100 + 92 * Math.cos(rad);
            const y2 = 100 - 92 * Math.sin(rad);
            return (
              <g key={mark}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="2" />
                <text
                  x={100 + 105 * Math.cos(rad)}
                  y={100 - 105 * Math.sin(rad)}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {mark}
                </text>
              </g>
            );
          })}
          {/* Aiguille */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill={color} />
        </svg>
        <div className={styles.monitoringPage__gaugeValue} style={{ color }}>
          {value} ppm
        </div>
        <div className={styles.monitoringPage__gaugeStatus} style={{ color }}>
          {getStatus()}
        </div>
      </div>
    </div>
  );
}

// Widget de luminosité avec grande valeur numérique
function LuminosityWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const getStatus = () => {
    if (value >= 50000) return t('monitoring.status.bright');
    if (value >= 20000) return t('monitoring.status.normal');
    return t('monitoring.status.dim');
  };

  return (
    <div className={styles.monitoringPage__widget}>
      <div className={styles.monitoringPage__widgetHeader}>
        <div className={styles.monitoringPage__widgetTitle}>
          <Icon icon={FaSun} size={20} />
          {t('monitoring.sensors.luminosity')}
          <div className={`${styles.monitoringPage__statusIndicator} ${isActive ? styles.monitoringPage__statusIndicatorActive : styles.monitoringPage__statusIndicatorInactive}`}>
            <FaCircle size={8} />
          </div>
        </div>
        <div className={styles.monitoringPage__widgetUpdated}>
          {t('monitoring.updated')}: {updatedAt}
        </div>
      </div>
      <div className={styles.monitoringPage__luminosityContainer}>
        <div className={styles.monitoringPage__luminosityIcon}>
          <Icon icon={FaSun} size={64} />
        </div>
        <div className={styles.monitoringPage__luminosityValue}>
          {value.toLocaleString('fr-FR')} <span className={styles.monitoringPage__luminosityUnit}>lux</span>
        </div>
        <div className={styles.monitoringPage__luminosityStatus}>{getStatus()}</div>
      </div>
    </div>
  );
}

// Widget de niveau d'eau avec barre de progression verticale
function WaterLevelWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const getStatus = () => {
    if (value >= 70) return { text: t('monitoring.status.good'), color: '#10B981' };
    if (value >= 40) return { text: t('monitoring.status.moderate'), color: '#f59e0b' };
    return { text: t('monitoring.status.low'), color: '#ef4444' };
  };
  const status = getStatus();

  return (
    <div className={styles.monitoringPage__widget}>
      <div className={styles.monitoringPage__widgetHeader}>
        <div className={styles.monitoringPage__widgetTitle}>
          <Icon icon={FaTint} size={20} />
          {t('monitoring.sensors.waterLevel')}
          <div className={`${styles.monitoringPage__statusIndicator} ${isActive ? styles.monitoringPage__statusIndicatorActive : styles.monitoringPage__statusIndicatorInactive}`}>
            <FaCircle size={8} />
          </div>
        </div>
        <div className={styles.monitoringPage__widgetUpdated}>
          {t('monitoring.updated')}: {updatedAt}
        </div>
      </div>
      <div className={styles.monitoringPage__waterLevelContainer}>
        <div className={styles.monitoringPage__verticalProgressBar}>
          <div className={styles.monitoringPage__verticalProgressBarTrack}>
            <div
              className={styles.monitoringPage__verticalProgressBarFill}
              style={{
                height: `${value}%`,
                background: `linear-gradient(to top, ${status.color}, ${status.color}dd)`,
              }}
            />
            <div
              className={styles.monitoringPage__verticalProgressBarIndicator}
              style={{ bottom: `${value}%` }}
            />
          </div>
          <div className={styles.monitoringPage__verticalProgressBarLabels}>
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span>0%</span>
          </div>
        </div>
        <div className={styles.monitoringPage__waterLevelValue} style={{ color: status.color }}>
          {value}%
        </div>
        <div className={styles.monitoringPage__waterLevelStatus} style={{ color: status.color }}>
          {status.text}
        </div>
      </div>
    </div>
  );
}

// Widget de contrôle d'équipement
function EquipmentControlWidget({
  title,
  icon,
  isOn,
  onToggle,
  disabled,
  isActive,
  offlineLabel,
}: {
  title: string;
  icon: typeof FaTint;
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isActive?: boolean;
  offlineLabel?: string;
}) {
  return (
    <div className={styles.monitoringPage__equipmentCard}>
      <div className={styles.monitoringPage__equipmentIcon}>
        {isActive !== false ? (
          <Icon icon={FaCheckCircle} size={32} className={isOn ? styles.monitoringPage__equipmentIconActive : styles.monitoringPage__equipmentIconInactive} />
        ) : (
          <Icon icon={FaTimesCircle} size={32} className={styles.monitoringPage__equipmentIconOffline} />
        )}
      </div>
      <h3 className={styles.monitoringPage__equipmentTitle}>
        {title}
        {isActive === false && offlineLabel && (
          <span className={styles.monitoringPage__equipmentStatusBadge}>
            {offlineLabel}
          </span>
        )}
      </h3>
      <div className={styles.monitoringPage__equipmentControls}>
        <button
          className={`${styles.monitoringPage__equipmentButton} ${
            isOn ? styles.monitoringPage__equipmentButtonActive : ''
          }`}
          onClick={onToggle}
          disabled={disabled || isActive === false}
        >
          ON
        </button>
        <button
          className={`${styles.monitoringPage__equipmentButton} ${
            !isOn ? styles.monitoringPage__equipmentButtonOff : ''
          }`}
          onClick={onToggle}
          disabled={disabled || isActive === false}
        >
          OFF
        </button>
      </div>
    </div>
  );
}

export function MonitoringPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plantationId = searchParams.get('plantationId');
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 25.1,
    soilHumidity: 58,
    co2: 531,
    luminosity: 70290,
    waterLevel: 79,
  });
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [actuators, setActuators] = useState<Actuator[]>([]);
  const [plantation, setPlantation] = useState<any>(null);
  const [availableSensors, setAvailableSensors] = useState<{
    temperature: boolean;
    soilHumidity: boolean;
    co2: boolean;
    luminosity: boolean;
    waterLevel: boolean;
  }>({
    temperature: false,
    soilHumidity: false,
    co2: false,
    luminosity: false,
    waterLevel: false,
  });
  const [equipmentState, setEquipmentState] = useState<EquipmentState>({
    irrigationPump: false,
    fans: false,
    lighting: false,
  });

  // Mettre à jour l'état des équipements depuis les actionneurs
  useEffect(() => {
    if (actuators.length > 0) {
      const newState: EquipmentState = {
        irrigationPump: false,
        fans: false,
        lighting: false,
      };

      actuators.forEach((actuator) => {
        const isActive = actuator.status === 'active' || actuator.isOn === true;
        const type = (actuator.type || '').toLowerCase();
        const name = (actuator.name || '').toLowerCase();
        
        // Le backend utilise exactement "pump", "fan", "light" comme types
        if (type === 'pump' || type.includes('pump') || type.includes('irrigation') || name.includes('pompe') || name.includes('irrigation')) {
          newState.irrigationPump = isActive;
        } else if (type === 'fan' || type.includes('fan') || name.includes('ventilat')) {
          newState.fans = isActive;
        } else if (type === 'light' || type.includes('light') || name.includes('lumiere') || name.includes('eclairage')) {
          newState.lighting = isActive;
        }
      });

      console.log('🔧 État des équipements mis à jour:', newState);
      setEquipmentState(newState);
    } else {
      // Réinitialiser l'état si aucun actionneur
      setEquipmentState({
        irrigationPump: false,
        fans: false,
        lighting: false,
      });
    }
  }, [actuators]);
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('17:19:04');
  const { ref: sensorsRef, isVisible: isSensorsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: equipmentRef, isVisible: isEquipmentVisible } = useScrollAnimation({ threshold: 0.1 });

  // Charger les capteurs de la plantation si plantationId est présent
  useEffect(() => {
    const loadSensors = async () => {
      if (!plantationId) {
        // Si pas de plantationId, afficher tous les capteurs par défaut (mode démo)
        setAvailableSensors({
          temperature: true,
          soilHumidity: true,
          co2: true,
          luminosity: true,
          waterLevel: true,
        });
        return;
      }
      try {
        const plantationData = await plantationService.getById(plantationId);
        setPlantation(plantationData);
        
        // Charger les actionneurs
        console.log('🔧 Données plantation reçues:', {
          hasActuators: plantationData.hasActuators,
          actuators: plantationData.actuators,
          actuatorsIsArray: Array.isArray(plantationData.actuators),
          actuatorsLength: plantationData.actuators?.length
        });
        
        if (plantationData.actuators && Array.isArray(plantationData.actuators) && plantationData.actuators.length > 0) {
          // Les actionneurs sont déjà normalisés par plantationService.getById
          setActuators(plantationData.actuators);
          console.log('✅ Actionneurs chargés:', plantationData.actuators.length, plantationData.actuators.map((a: Actuator) => ({ 
            id: a.id, 
            type: a.type, 
            name: a.name, 
            status: a.status 
          })));
        } else {
          setActuators([]);
          console.log('⚠️ Aucun actionneur trouvé. hasActuators:', plantationData.hasActuators, 'actuators:', plantationData.actuators);
        }

        if (plantationData.hasSensors && plantationData.sensors && plantationData.sensors.length > 0) {
          setSensors(plantationData.sensors);
          
          // Extraire les dernières lectures depuis latestReadings ou depuis les capteurs
          const sensorMap = new Map<string, SensorReading>();
          
          // D'abord, utiliser latestReadings si disponible (format backend)
          if ((plantationData as any).latestReadings && Array.isArray((plantationData as any).latestReadings)) {
            (plantationData as any).latestReadings.forEach((item: any) => {
              if (item.latestReading && item.sensorType) {
                sensorMap.set(item.sensorType, item.latestReading);
              }
            });
          }
          
          // Sinon, utiliser les lectures des capteurs individuels
          plantationData.sensors.forEach((sensor: Sensor) => {
            if (!sensorMap.has(sensor.type)) {
              if (sensor.latestReading) {
                sensorMap.set(sensor.type, sensor.latestReading);
              } else if (sensor.readings && sensor.readings.length > 0) {
                // Prendre la lecture la plus récente
                const sortedReadings = [...sensor.readings].sort((a, b) => 
                  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                );
                sensorMap.set(sensor.type, sortedReadings[0]);
              }
            }
          });

          // Mettre à jour les données avec les dernières valeurs des capteurs
          const tempReading = sensorMap.get('temperature');
          const soilReading = sensorMap.get('soilMoisture');
          const co2Reading = sensorMap.get('co2Level');
          const lumReading = sensorMap.get('luminosity');
          const waterReading = sensorMap.get('waterLevel');

          setSensorData({
            temperature: tempReading?.value ?? 25.1,
            soilHumidity: soilReading?.value ?? 58,
            co2: co2Reading?.value ?? 531,
            luminosity: lumReading?.value ?? 70290,
            waterLevel: waterReading?.value ?? 79,
            co2Level: co2Reading?.value,
          });

          // Déterminer quels capteurs sont disponibles (uniquement ceux avec des lectures)
          const hasTemperature = tempReading != null && tempReading.value != null;
          const hasSoilMoisture = soilReading != null && soilReading.value != null;
          const hasCo2Level = co2Reading != null && co2Reading.value != null;
          const hasLuminosity = lumReading != null && lumReading.value != null;
          const hasWaterLevel = waterReading != null && waterReading.value != null;

          // Debug: afficher les données détectées
          console.log('📊 Capteurs détectés:', {
            temperature: hasTemperature,
            soilMoisture: hasSoilMoisture,
            co2Level: hasCo2Level,
            luminosity: hasLuminosity,
            waterLevel: hasWaterLevel,
            sensors: plantationData.sensors.map((s: Sensor) => ({ type: s.type, status: s.status, hasReading: !!sensorMap.get(s.type) }))
          });

          setAvailableSensors({
            temperature: hasTemperature,
            soilHumidity: hasSoilMoisture,
            co2: hasCo2Level,
            luminosity: hasLuminosity,
            waterLevel: hasWaterLevel,
          });
        } else {
          // Aucun capteur affecté
          setAvailableSensors({
            temperature: false,
            soilHumidity: false,
            co2: false,
            luminosity: false,
            waterLevel: false,
          });
        }
      } catch (error) {
        console.error('Error loading sensors:', error);
        setAvailableSensors({
          temperature: false,
          soilHumidity: false,
          co2: false,
          luminosity: false,
          waterLevel: false,
        });
      }
    };
    loadSensors();
  }, [plantationId]);

  // Fonction pour déterminer si un capteur est actif
  const getSensorStatus = (sensorType: 'temperature' | 'soilHumidity' | 'co2' | 'luminosity' | 'waterLevel'): boolean => {
    if (sensors.length === 0) return true; // Par défaut actif si pas de données
    // Vérifier si au moins un capteur est actif
    return sensors.some(sensor => sensor.status === 'active');
  };

  // Configuration de la navbar
  const monitoringNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.graphs'), href: '/graphs' },
    { label: t('nav.ai'), href: '/ai' },
    { label: t('nav.support'), href: '/support' },
  ];

  // Mettre à jour les données en temps réel uniquement si des capteurs sont disponibles
  useEffect(() => {
    if (!plantationId || !plantation?.hasSensors) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 8);
      setUpdatedAt(timeString);

      // Recharger les dernières données depuis l'API
      const refreshData = async () => {
        try {
          const plantationData = await plantationService.getById(plantationId);
          if (plantationData.sensors && plantationData.sensors.length > 0) {
            // Extraire les dernières lectures de chaque type de capteur
            const sensorMap = new Map<string, SensorReading>();
            plantationData.sensors.forEach((sensor: Sensor) => {
              if (sensor.latestReading) {
                sensorMap.set(sensor.type, sensor.latestReading);
              } else if (sensor.readings && sensor.readings.length > 0) {
                const sortedReadings = [...sensor.readings].sort((a, b) => 
                  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                );
                sensorMap.set(sensor.type, sortedReadings[0]);
              }
            });

            // D'abord, utiliser latestReadings si disponible (format backend)
            if ((plantationData as any).latestReadings && Array.isArray((plantationData as any).latestReadings)) {
              (plantationData as any).latestReadings.forEach((item: any) => {
                if (item.latestReading && item.sensorType) {
                  sensorMap.set(item.sensorType, item.latestReading);
                }
              });
            }
            
            // Sinon, utiliser les lectures des capteurs individuels
            plantationData.sensors.forEach((sensor: Sensor) => {
              if (!sensorMap.has(sensor.type)) {
                if (sensor.latestReading) {
                  sensorMap.set(sensor.type, sensor.latestReading);
                } else if (sensor.readings && sensor.readings.length > 0) {
                  const sortedReadings = [...sensor.readings].sort((a, b) => 
                    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                  );
                  sensorMap.set(sensor.type, sortedReadings[0]);
                }
              }
            });

            const tempReading = sensorMap.get('temperature');
            const soilReading = sensorMap.get('soilMoisture');
            const co2Reading = sensorMap.get('co2Level');
            const lumReading = sensorMap.get('luminosity');
            const waterReading = sensorMap.get('waterLevel');

            setSensorData((prev) => ({
              temperature: availableSensors.temperature && tempReading ? tempReading.value : prev.temperature,
              soilHumidity: availableSensors.soilHumidity && soilReading ? soilReading.value : prev.soilHumidity,
              co2: availableSensors.co2 && co2Reading ? co2Reading.value : prev.co2,
              luminosity: availableSensors.luminosity && lumReading ? lumReading.value : prev.luminosity,
              waterLevel: availableSensors.waterLevel && waterReading ? waterReading.value : prev.waterLevel,
              co2Level: co2Reading?.value,
            }));
          }
        } catch (error) {
          console.error('Error refreshing sensor data:', error);
        }
      };
      refreshData();
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [plantationId, plantation?.hasSensors, availableSensors]);

  const handleEquipmentToggle = (equipment: keyof EquipmentState) => {
    setEquipmentState((prev) => ({
      ...prev,
      [equipment]: !prev[equipment],
    }));
  };

  return (
    <>
      <Header
        navItems={monitoringNavItems}
        currentPath="/monitoring"
        showAuthIcons={true}
      />
      <main className={styles.monitoringPage}>
        <div className={styles.monitoringPage__container}>
          {plantationId && (
            <div className={styles.monitoringPage__header}>
              <Button
                variant="secondary"
                onClick={() => navigate(`/plantations/${plantationId}`)}
                className={styles.monitoringPage__backButton}
              >
                <FaArrowLeft /> {t('plantations.detail.backToList')}
              </Button>
            </div>
          )}
          {/* Section des capteurs */}
          <div className={styles.monitoringPage__section}>
            <h2 className={styles.monitoringPage__sectionTitle}>
              {t('monitoring.sensors.title')}
            </h2>
            <div
              ref={sensorsRef as React.RefObject<HTMLDivElement>}
              className={`${styles.monitoringPage__sensorsGrid} ${
                isSensorsVisible ? styles.monitoringPage__sensorsGridVisible : ''
              }`}
            >
              {availableSensors.temperature && (
                <TemperatureWidget 
                  value={sensorData.temperature} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('temperature')}
                />
              )}
              {availableSensors.soilHumidity && (
                <SoilHumidityWidget 
                  value={sensorData.soilHumidity} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('soilHumidity')}
                />
              )}
              {availableSensors.co2 && (
                <CO2Widget 
                  value={sensorData.co2} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('co2')}
                />
              )}
              {availableSensors.luminosity && (
                <LuminosityWidget 
                  value={sensorData.luminosity} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('luminosity')}
                />
              )}
              {availableSensors.waterLevel && (
                <WaterLevelWidget 
                  value={sensorData.waterLevel} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('waterLevel')}
                />
              )}
              {plantationId && !plantation?.hasSensors && (
                <div className={styles.monitoringPage__noSensors}>
                  <p>{t('monitoring.noSensors')}</p>
                </div>
              )}
              {plantationId && plantation?.hasSensors && 
               !availableSensors.temperature && 
               !availableSensors.soilHumidity && 
               !availableSensors.co2 && 
               !availableSensors.luminosity && 
               !availableSensors.waterLevel && (
                <div className={styles.monitoringPage__noSensors}>
                  <p>{t('monitoring.noSensors')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Section de contrôle des équipements */}
          {actuators && actuators.length > 0 && (
            <div className={styles.monitoringPage__section}>
              <div className={styles.monitoringPage__sectionHeader}>
                <h2 className={styles.monitoringPage__sectionTitle}>
                  {t('monitoring.equipment.title')}
                </h2>
                <div className={styles.monitoringPage__modeToggle}>
                  <button
                    className={`${styles.monitoringPage__modeButton} ${
                      isAutomaticMode ? styles.monitoringPage__modeButtonActive : ''
                    }`}
                    onClick={() => setIsAutomaticMode(true)}
                  >
                    <Icon icon={FaRobot} size={18} />
                    <span>{t('monitoring.mode.automatic')}</span>
                  </button>
                  <button
                    className={`${styles.monitoringPage__modeButton} ${
                      !isAutomaticMode ? styles.monitoringPage__modeButtonActive : ''
                    }`}
                    onClick={() => setIsAutomaticMode(false)}
                  >
                    <Icon icon={FaHandPointer} size={18} />
                    <span>{t('monitoring.mode.manual')}</span>
                  </button>
                </div>
              </div>
              {isAutomaticMode && (
                <div className={styles.monitoringPage__modeInfo}>
                  <Icon icon={FaRobot} size={16} />
                  <span>{t('monitoring.mode.automaticInfo')}</span>
                </div>
              )}
              <div
                ref={equipmentRef as React.RefObject<HTMLDivElement>}
                className={`${styles.monitoringPage__equipmentGrid} ${
                  (isEquipmentVisible || actuators.length > 0) ? styles.monitoringPage__equipmentGridVisible : ''
                }`}
              >
                {(() => {
                  // Trouver les actionneurs correspondants (uniquement ceux qui existent en base de données)
                  // Le backend retourne des types exacts : "pump", "fan", "light"
                  console.log('🔍 Recherche d\'actionneurs dans:', actuators);
                  
                  const pumpActuator = actuators.find(a => {
                    const type = (a.type || '').toLowerCase();
                    // Le backend utilise exactement "pump" comme type
                    return type === 'pump' || 
                           type.includes('pump') || 
                           type.includes('irrigation') || 
                           (a.name || '').toLowerCase().includes('pompe') ||
                           (a.name || '').toLowerCase().includes('irrigation');
                  });
                  
                  const fanActuator = actuators.find(a => {
                    const type = (a.type || '').toLowerCase();
                    // Le backend utilise exactement "fan" comme type
                    return type === 'fan' || 
                           type.includes('fan') || 
                           (a.name || '').toLowerCase().includes('ventilat');
                  });
                  
                  const lightActuator = actuators.find(a => {
                    const type = (a.type || '').toLowerCase();
                    // Le backend utilise exactement "light" comme type
                    return type === 'light' || 
                           type.includes('light') || 
                           (a.name || '').toLowerCase().includes('lumiere') ||
                           (a.name || '').toLowerCase().includes('eclairage');
                  });
                  
                  console.log('🔍 Actionneurs trouvés:', { 
                    pump: pumpActuator ? { id: pumpActuator.id, type: pumpActuator.type, name: pumpActuator.name, status: pumpActuator.status } : null,
                    fan: fanActuator ? { id: fanActuator.id, type: fanActuator.type, name: fanActuator.name, status: fanActuator.status } : null,
                    light: lightActuator ? { id: lightActuator.id, type: lightActuator.type, name: lightActuator.name, status: lightActuator.status } : null
                  });

                  // Ne rien afficher si aucun actionneur n'est disponible
                  if (!pumpActuator && !fanActuator && !lightActuator) {
                    console.log('⚠️ Aucun actionneur disponible, affichage du message "noActuators"');
                    return (
                      <div className={styles.monitoringPage__noSensors}>
                        <p>{t('monitoring.equipment.noActuators')}</p>
                      </div>
                    );
                  }

                  console.log('✅ Rendu des widgets d\'équipement:', {
                    renderPump: !!pumpActuator,
                    renderFan: !!fanActuator,
                    renderLight: !!lightActuator,
                    equipmentState
                  });

                  return (
                    <>
                      {pumpActuator && (
                        <EquipmentControlWidget
                          title={t('monitoring.equipment.irrigationPump')}
                          icon={FaTint}
                          isOn={equipmentState.irrigationPump}
                          onToggle={() => handleEquipmentToggle('irrigationPump')}
                          disabled={isAutomaticMode}
                          isActive={pumpActuator.status !== 'offline'}
                          offlineLabel={pumpActuator.status === 'offline' ? t('monitoring.equipment.offline') : undefined}
                        />
                      )}
                      {fanActuator && (
                        <EquipmentControlWidget
                          title={t('monitoring.equipment.fans')}
                          icon={FaWind}
                          isOn={equipmentState.fans}
                          onToggle={() => handleEquipmentToggle('fans')}
                          disabled={isAutomaticMode}
                          isActive={fanActuator.status !== 'offline'}
                          offlineLabel={fanActuator.status === 'offline' ? t('monitoring.equipment.offline') : undefined}
                        />
                      )}
                      {lightActuator && (
                        <EquipmentControlWidget
                          title={t('monitoring.equipment.lighting')}
                          icon={FaSun}
                          isOn={equipmentState.lighting}
                          onToggle={() => handleEquipmentToggle('lighting')}
                          disabled={isAutomaticMode}
                          isActive={lightActuator.status !== 'offline'}
                          offlineLabel={lightActuator.status === 'offline' ? t('monitoring.equipment.offline') : undefined}
                        />
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

