import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  FaTint,
  FaSun,
  FaCloud,
  FaWind,
  FaThermometerHalf,
  FaCheckCircle,
  FaRobot,
  FaHandPointer,
} from 'react-icons/fa';
import styles from './MonitoringPage.module.css';

interface SensorData {
  temperature: number;
  soilHumidity: number;
  co2: number;
  luminosity: number;
  waterLevel: number;
}

interface EquipmentState {
  irrigationPump: boolean;
  fans: boolean;
  lighting: boolean;
}

// Widget de température avec jauge semi-circulaire
function TemperatureWidget({ value, updatedAt }: { value: number; updatedAt: string }) {
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
function SoilHumidityWidget({ value, updatedAt }: { value: number; updatedAt: string }) {
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
function CO2Widget({ value, updatedAt }: { value: number; updatedAt: string }) {
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
function LuminosityWidget({ value, updatedAt }: { value: number; updatedAt: string }) {
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
function WaterLevelWidget({ value, updatedAt }: { value: number; updatedAt: string }) {
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
}: {
  title: string;
  icon: typeof FaTint;
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.monitoringPage__equipmentCard}>
      <div className={styles.monitoringPage__equipmentIcon}>
        <Icon icon={FaCheckCircle} size={32} style={{ color: '#10B981' }} />
      </div>
      <h3 className={styles.monitoringPage__equipmentTitle}>{title}</h3>
      <div className={styles.monitoringPage__equipmentControls}>
        <button
          className={`${styles.monitoringPage__equipmentButton} ${
            isOn ? styles.monitoringPage__equipmentButtonActive : ''
          }`}
          onClick={onToggle}
          disabled={disabled}
        >
          ON
        </button>
        <button
          className={`${styles.monitoringPage__equipmentButton} ${
            !isOn ? styles.monitoringPage__equipmentButtonOff : ''
          }`}
          onClick={onToggle}
          disabled={disabled}
        >
          OFF
        </button>
      </div>
    </div>
  );
}

export function MonitoringPage() {
  const { t } = useTranslation();
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 25.1,
    soilHumidity: 58,
    co2: 531,
    luminosity: 70290,
    waterLevel: 79,
  });
  const [equipmentState, setEquipmentState] = useState<EquipmentState>({
    irrigationPump: true,
    fans: true,
    lighting: true,
  });
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('17:19:04');
  const { ref: sensorsRef, isVisible: isSensorsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: equipmentRef, isVisible: isEquipmentVisible } = useScrollAnimation({ threshold: 0.1 });

  // Configuration de la navbar
  const monitoringNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.graphs'), href: '/graphs' },
    { label: t('nav.support'), href: '/support' },
    { label: t('nav.ai'), href: '/ai' },
  ];

  // Simuler la mise à jour des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 8);
      setUpdatedAt(timeString);

      // Simuler des variations de données
      setSensorData((prev) => ({
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 0.5)),
        soilHumidity: Math.max(30, Math.min(80, prev.soilHumidity + (Math.random() - 0.5) * 2)),
        co2: Math.max(300, Math.min(800, prev.co2 + (Math.random() - 0.5) * 20)),
        luminosity: Math.max(10000, Math.min(100000, prev.luminosity + (Math.random() - 0.5) * 1000)),
        waterLevel: Math.max(40, Math.min(100, prev.waterLevel + (Math.random() - 0.5) * 1)),
      }));
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

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
              <TemperatureWidget value={sensorData.temperature} updatedAt={updatedAt} />
              <SoilHumidityWidget value={sensorData.soilHumidity} updatedAt={updatedAt} />
              <CO2Widget value={sensorData.co2} updatedAt={updatedAt} />
              <LuminosityWidget value={sensorData.luminosity} updatedAt={updatedAt} />
              <WaterLevelWidget value={sensorData.waterLevel} updatedAt={updatedAt} />
            </div>
          </div>

          {/* Section de contrôle des équipements */}
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
                isEquipmentVisible ? styles.monitoringPage__equipmentGridVisible : ''
              }`}
            >
              <EquipmentControlWidget
                title={t('monitoring.equipment.irrigationPump')}
                icon={FaTint}
                isOn={equipmentState.irrigationPump}
                onToggle={() => handleEquipmentToggle('irrigationPump')}
                disabled={isAutomaticMode}
              />
              <EquipmentControlWidget
                title={t('monitoring.equipment.fans')}
                icon={FaWind}
                isOn={equipmentState.fans}
                onToggle={() => handleEquipmentToggle('fans')}
                disabled={isAutomaticMode}
              />
              <EquipmentControlWidget
                title={t('monitoring.equipment.lighting')}
                icon={FaSun}
                isOn={equipmentState.lighting}
                onToggle={() => handleEquipmentToggle('lighting')}
                disabled={isAutomaticMode}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

