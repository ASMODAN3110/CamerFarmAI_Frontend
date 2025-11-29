import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { plantationService, type SensorReading } from '@/services/plantationService';
import {
  FaTint,
  FaSun,
  FaCloud,
  FaArrowLeft,
} from 'react-icons/fa';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './GraphsPage.module.css';

interface ChartDataPoint {
  day: string;
  date: string;
  value: number;
  temperature: number;
  humidity?: number;
  soilMoisture: number;
  co2Level?: number;
  waterLevel?: number;
  luminosity: number;
  timestamp: string;
}

interface SensorFilter {
  id: string;
  label: string;
  icon: typeof FaTint;
  color: string;
  bgColor: string;
  dataKey: keyof ChartDataPoint;
}

export function GraphsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plantationId = searchParams.get('plantationId');
  const [selectedSensor, setSelectedSensor] = useState('humidity');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sensorsData, setSensorsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref: chartRef, isVisible: isChartVisible } = useScrollAnimation({ threshold: 0.1 });

  // Charger les données des capteurs depuis l'API
  useEffect(() => {
    const loadSensorsData = async () => {
      if (!plantationId) return;
      setIsLoading(true);
      try {
        // Récupérer tous les capteurs
        const sensors = await plantationService.getSensors(plantationId);
        
        // Récupérer toutes les lectures de tous les capteurs
        const allReadings: SensorReading[] = [];
        for (const sensor of sensors) {
          if (sensor.readings && sensor.readings.length > 0) {
            allReadings.push(...sensor.readings);
          } else if (sensor.id) {
            // Si les lectures ne sont pas incluses, les récupérer
            const readings = await plantationService.getSensorReadings(plantationId, sensor.id);
            allReadings.push(...readings);
          }
        }
        
        // Créer un map pour associer chaque lecture à son type de capteur
        const sensorTypeMap = new Map<string, string>();
        sensors.forEach(sensor => {
          if (sensor.id) {
            sensorTypeMap.set(sensor.id, sensor.type);
          }
        });
        
        // Grouper les lectures par timestamp et combiner les valeurs de différents capteurs
        const groupedByTimestamp = new Map<string, any>();
        allReadings.forEach(reading => {
          const sensorType = sensorTypeMap.get(reading.sensorId) || '';
          const timestamp = reading.timestamp;
          
          if (!groupedByTimestamp.has(timestamp)) {
            groupedByTimestamp.set(timestamp, {
              id: reading.id,
              timestamp,
              temperature: sensorType === 'temperature' ? reading.value : undefined,
              soilMoisture: sensorType === 'soilMoisture' ? reading.value : undefined,
              co2Level: sensorType === 'co2Level' ? reading.value : undefined,
              waterLevel: sensorType === 'waterLevel' ? reading.value : undefined,
              luminosity: sensorType === 'luminosity' ? reading.value : undefined,
            });
          } else {
            const existing = groupedByTimestamp.get(timestamp)!;
            if (sensorType === 'temperature') existing.temperature = reading.value;
            if (sensorType === 'soilMoisture') existing.soilMoisture = reading.value;
            if (sensorType === 'co2Level') existing.co2Level = reading.value;
            if (sensorType === 'waterLevel') existing.waterLevel = reading.value;
            if (sensorType === 'luminosity') existing.luminosity = reading.value;
          }
        });
        
        setSensorsData(Array.from(groupedByTimestamp.values()));
      } catch (error) {
        console.error('Error loading sensors data:', error);
        setSensorsData([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadSensorsData();
  }, [plantationId]);

  // Transformer les données des capteurs en données de graphique
  const chartData = useMemo(() => {
    if (sensorsData.length === 0) return [];

    // Trier par timestamp
    const sortedData = [...sensorsData].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Filtrer par date si des dates sont sélectionnées
    let filteredData = sortedData;
    if (dateFrom) {
      // Créer une date au début de la journée (minuit) pour la comparaison
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      filteredData = filteredData.filter(sensor => {
        const sensorDate = new Date(sensor.timestamp);
        sensorDate.setHours(0, 0, 0, 0);
        return sensorDate >= fromDate;
      });
    }
    if (dateTo) {
      // Créer une date à la fin de la journée (23:59:59) pour la comparaison
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filteredData = filteredData.filter(sensor => {
        const sensorDate = new Date(sensor.timestamp);
        return sensorDate <= toDate;
      });
    }

    // Transformer en format de graphique
    return filteredData.map((sensor) => {
      const date = new Date(sensor.timestamp);
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      return {
        day: dayNames[date.getDay()],
        date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        value: sensor.humidity || sensor.soilMoisture,
        temperature: sensor.temperature,
        humidity: sensor.humidity,
        soilMoisture: sensor.soilMoisture,
        co2Level: sensor.co2Level,
        waterLevel: sensor.waterLevel,
        luminosity: sensor.luminosity,
        timestamp: sensor.timestamp,
      };
    });
  }, [sensorsData, dateFrom, dateTo]);

  // Déterminer quels capteurs sont disponibles dans les données
  const availableSensorTypes = useMemo(() => {
    if (sensorsData.length === 0) return [];
    const types: string[] = [];
    // Vérifier tous les points de données pour trouver les types disponibles
    sensorsData.forEach((data: any) => {
      if (data.temperature != null && !types.includes('temperature')) types.push('temperature');
      if (data.soilMoisture != null && !types.includes('soilMoisture')) types.push('soilMoisture');
      if (data.co2Level != null && !types.includes('co2Level')) types.push('co2Level');
      if (data.waterLevel != null && !types.includes('waterLevel')) types.push('waterLevel');
      if (data.luminosity != null && !types.includes('luminosity')) types.push('luminosity');
    });
    return types;
  }, [sensorsData]);

  const allSensors: SensorFilter[] = [
    {
      id: 'temperature',
      label: t('graphs.sensors.temperature'),
      icon: FaSun,
      color: '#3B82F6',
      bgColor: styles.sensorTemperature,
      dataKey: 'temperature',
    },
    {
      id: 'soilMoisture',
      label: t('graphs.sensors.soilMoisture'),
      icon: FaTint,
      color: '#10B981',
      bgColor: styles.sensorHumidity,
      dataKey: 'soilMoisture',
    },
    {
      id: 'co2Level',
      label: t('graphs.sensors.co2'),
      icon: FaCloud,
      color: '#8B5CF6',
      bgColor: styles.sensorLuminosity,
      dataKey: 'co2Level',
    },
    {
      id: 'waterLevel',
      label: t('graphs.sensors.waterLevel'),
      icon: FaTint,
      color: '#06B6D4',
      bgColor: styles.sensorHumidity,
      dataKey: 'waterLevel',
    },
    {
      id: 'luminosity',
      label: t('graphs.sensors.luminosity'),
      icon: FaCloud,
      color: '#F59E0B',
      bgColor: styles.sensorLuminosity,
      dataKey: 'luminosity',
    },
  ];

  // Filtrer les capteurs disponibles
  const sensors = allSensors.filter(s => availableSensorTypes.includes(s.id));

  const activeSensor = sensors.find((s) => s.id === selectedSensor) || sensors[0];

  // Configuration de la navbar pour la page des graphiques
  const graphsNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    { label: t('nav.ai'), href: '/ai' },
    { label: t('nav.support'), href: '/support' },
  ];

  const handleApplyFilter = () => {
    // Le filtrage est déjà géré automatiquement dans le useMemo de chartData
    // Cette fonction peut être utilisée pour d'autres actions si nécessaire
    // Le graphique se mettra à jour automatiquement grâce au useMemo
    console.log('Filter applied:', { dateFrom, dateTo, sensor: selectedSensor });
  };

  return (
    <>
      <Header
        navItems={graphsNavItems}
        currentPath="/graphs"
        showAuthIcons={true}
      />
      <main className={styles.graphsPage}>
        <div className={styles.graphsPage__container}>
          {plantationId && (
            <div className={styles.graphsPage__header}>
              <Button
                variant="secondary"
                onClick={() => navigate(`/plantations/${plantationId}`)}
                className={styles.graphsPage__backButton}
              >
                <FaArrowLeft /> {t('plantations.detail.backToList')}
              </Button>
            </div>
          )}
          {/* Dashboard Title */}
          <div className={styles.graphsPage__titleSection}>
            <h1 className={styles.graphsPage__title}>
              <Icon icon={FaSun} size={24} />
              {t('graphs.title')}
            </h1>
          </div>

          {/* Welcome Section */}
          <div className={styles.graphsPage__welcomeSection}>
            <h2 className={styles.graphsPage__welcomeTitle}>
              {t('graphs.welcome.title')}
            </h2>
            <p className={styles.graphsPage__welcomeDescription}>
              {t('graphs.welcome.description')}
            </p>
            <p className={styles.graphsPage__welcomeHint}>
              {t('graphs.welcome.hint')}
            </p>
            {isLoading && (
              <p className={styles.graphsPage__loadingMessage}>
                {t('graphs.loading')}
              </p>
            )}
            {!isLoading && chartData.length === 0 && plantationId && (
              <p className={styles.graphsPage__emptyMessage}>
                {t('graphs.empty')}
              </p>
            )}
          </div>

          {/* Sensor Filter Buttons */}
          <div className={styles.graphsPage__sensorFilters}>
            {sensors.map((sensor) => (
              <button
                key={sensor.id}
                onClick={() => setSelectedSensor(sensor.id)}
                className={`${styles.graphsPage__sensorButton} ${
                  selectedSensor === sensor.id
                    ? `${sensor.bgColor} ${styles.graphsPage__sensorButtonActive}`
                    : styles.graphsPage__sensorButtonInactive
                }`}
                style={
                  selectedSensor === sensor.id
                    ? {
                        borderColor: sensor.color,
                      }
                    : undefined
                }
              >
                <Icon icon={sensor.icon} size={20} />
                <span className={styles.graphsPage__sensorButtonLabel}>
                  {sensor.label}
                </span>
              </button>
            ))}
          </div>

          {/* Date Range Section */}
          <div className={styles.graphsPage__dateRangeSection}>
            <div className={styles.graphsPage__dateInputs}>
              <div className={styles.graphsPage__dateInput}>
                <label className={styles.graphsPage__dateLabel}>
                  {t('graphs.dateFrom')}:
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className={styles.graphsPage__dateInputField}
                />
              </div>
              <div className={styles.graphsPage__dateInput}>
                <label className={styles.graphsPage__dateLabel}>
                  {t('graphs.dateTo')}:
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className={styles.graphsPage__dateInputField}
                />
              </div>
            </div>
            <Button
              variant="primary"
              onClick={handleApplyFilter}
              className={styles.graphsPage__applyButton}
            >
              {t('graphs.applyFilter')}
            </Button>
          </div>

          {/* Chart Section */}
          <div
            ref={chartRef as React.RefObject<HTMLDivElement>}
            className={`${styles.graphsPage__chartSection} ${
              isChartVisible ? styles.graphsPage__chartSectionVisible : ''
            }`}
          >
            <h3 className={styles.graphsPage__chartTitle}>
              {t('graphs.chart.title')} - {activeSensor.label}
            </h3>
            <div className={styles.graphsPage__chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id={`colorGradient-${activeSensor.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={activeSensor.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={activeSensor.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: `2px solid ${activeSensor.color}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    cursor={{ stroke: activeSensor.color, strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                      dataKey={activeSensor.dataKey}
                    stroke={activeSensor.color}
                    strokeWidth={3}
                    fill={`url(#colorGradient-${activeSensor.id})`}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


