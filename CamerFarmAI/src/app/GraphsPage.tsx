import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Background3D } from '@/components/ui/Background3D/Background3D';
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
  // États pour les valeurs des champs (temporaires, non appliquées)
  const [selectedSensorInput, setSelectedSensorInput] = useState<string>('');
  const [dateFromInput, setDateFromInput] = useState('');
  const [dateToInput, setDateToInput] = useState('');
  // États pour les valeurs appliquées (utilisées pour le filtrage)
  const [selectedSensor, setSelectedSensor] = useState<string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sensorsData, setSensorsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref: chartRef, isVisible: isChartVisible } = useScrollAnimation({ threshold: 0.1 });

  // Charger les données des capteurs depuis l'API
  useEffect(() => {
    const loadSensorsData = async () => {
      if (!plantationId) {
        console.log('📊 GraphsPage: Pas de plantationId, arrêt du chargement');
        setSensorsData([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        // Récupérer tous les capteurs
        const sensors = await plantationService.getSensors(plantationId);
        console.log('📊 GraphsPage: Capteurs récupérés:', sensors.length, sensors.map(s => ({ id: s.id, type: s.type, status: s.status, hasReadings: !!s.readings?.length })));
        
        // Filtrer uniquement les capteurs actifs
        const activeSensors = sensors.filter(s => s.status === 'active');
        console.log('📊 GraphsPage: Capteurs actifs:', activeSensors.length);
        
        // Récupérer toutes les lectures de tous les capteurs actifs uniquement
        const allReadings: SensorReading[] = [];
        for (const sensor of activeSensors) {
          if (sensor.readings && sensor.readings.length > 0) {
            console.log(`📊 GraphsPage: Capteur ${sensor.type} a ${sensor.readings.length} lectures incluses`);
            allReadings.push(...sensor.readings);
          } else if (sensor.id) {
            // Si les lectures ne sont pas incluses, les récupérer
            console.log(`📊 GraphsPage: Récupération des lectures pour le capteur ${sensor.type} (${sensor.id})`);
            const readings = await plantationService.getSensorReadings(plantationId, sensor.id);
            console.log(`📊 GraphsPage: ${readings.length} lectures récupérées pour ${sensor.type}`);
            allReadings.push(...readings);
          }
        }
        
        console.log('📊 GraphsPage: Total de lectures:', allReadings.length);
        
        // Créer un map pour associer chaque lecture à son type de capteur (uniquement pour les capteurs actifs)
        const sensorTypeMap = new Map<string, string>();
        activeSensors.forEach(sensor => {
          if (sensor.id) {
            sensorTypeMap.set(sensor.id, sensor.type);
          }
        });
        
        // Grouper les lectures par timestamp (normalisé à la minute) et combiner les valeurs de différents capteurs
        // On normalise le timestamp à la minute pour grouper les lectures proches
        const groupedByTimestamp = new Map<string, any>();
        allReadings.forEach(reading => {
          const sensorType = sensorTypeMap.get(reading.sensorId) || '';
          const timestamp = reading.timestamp;
          
          // Normaliser le timestamp à la minute pour grouper les lectures proches
          const date = new Date(timestamp);
          const normalizedTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0).toISOString();
          
          if (!groupedByTimestamp.has(normalizedTimestamp)) {
            groupedByTimestamp.set(normalizedTimestamp, {
              id: reading.id,
              timestamp: normalizedTimestamp,
              originalTimestamp: timestamp, // Garder le timestamp original pour l'affichage
              temperature: sensorType === 'temperature' ? reading.value : undefined,
              soilMoisture: sensorType === 'soilMoisture' ? reading.value : undefined,
              co2Level: sensorType === 'co2Level' ? reading.value : undefined,
              waterLevel: sensorType === 'waterLevel' ? reading.value : undefined,
              luminosity: sensorType === 'luminosity' ? reading.value : undefined,
    });
          } else {
            const existing = groupedByTimestamp.get(normalizedTimestamp)!;
            if (sensorType === 'temperature') existing.temperature = reading.value;
            if (sensorType === 'soilMoisture') existing.soilMoisture = reading.value;
            if (sensorType === 'co2Level') existing.co2Level = reading.value;
            if (sensorType === 'waterLevel') existing.waterLevel = reading.value;
            if (sensorType === 'luminosity') existing.luminosity = reading.value;
          }
        });
        
        const groupedData = Array.from(groupedByTimestamp.values());
        console.log('📊 GraphsPage: Données groupées:', groupedData.length, groupedData.slice(0, 3));
        setSensorsData(groupedData);
      } catch (error) {
        console.error('❌ GraphsPage: Erreur lors du chargement des données:', error);
        setSensorsData([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadSensorsData();
  }, [plantationId]);

  // Transformer les données des capteurs en données de graphique
  const chartData = useMemo(() => {
    if (sensorsData.length === 0) {
      console.log('📊 GraphsPage: Aucune donnée de capteur disponible pour le graphique');
      return [];
    }

    // Trier par timestamp
    const sortedData = [...sensorsData].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    console.log('📊 GraphsPage: Données triées:', sortedData.length);

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
    const chartDataPoints = filteredData.map((sensor) => {
      // Utiliser le timestamp original si disponible, sinon le timestamp normalisé
      const timestamp = sensor.originalTimestamp || sensor.timestamp;
      const date = new Date(timestamp);
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const point = {
        day: dayNames[date.getDay()],
        date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        value: sensor.humidity || sensor.soilMoisture,
        // Convertir undefined en null pour Recharts (Recharts gère mieux null que undefined)
        temperature: sensor.temperature != null ? sensor.temperature : null,
        humidity: sensor.humidity != null ? sensor.humidity : null,
        soilMoisture: sensor.soilMoisture != null ? sensor.soilMoisture : null,
        co2Level: sensor.co2Level != null ? sensor.co2Level : null,
        waterLevel: sensor.waterLevel != null ? sensor.waterLevel : null,
        luminosity: sensor.luminosity != null ? sensor.luminosity : null,
        timestamp: timestamp,
      };
      return point;
    });
    console.log('📊 GraphsPage: Données de graphique finales:', {
      count: chartDataPoints.length,
      sample: chartDataPoints.slice(0, 3),
      hasTemperature: chartDataPoints.some(p => p.temperature != null),
      hasSoilMoisture: chartDataPoints.some(p => p.soilMoisture != null),
      hasCo2Level: chartDataPoints.some(p => p.co2Level != null),
      hasWaterLevel: chartDataPoints.some(p => p.waterLevel != null),
      hasLuminosity: chartDataPoints.some(p => p.luminosity != null),
    });
    return chartDataPoints;
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
  
  console.log('📊 GraphsPage: Capteurs disponibles:', {
    availableSensorTypes,
    sensorsCount: sensors.length,
    sensors: sensors.map(s => s.id),
    selectedSensor,
    chartDataLength: chartData.length
  });

  // Mettre à jour selectedSensorInput et selectedSensor si aucun n'est sélectionné ou si le capteur sélectionné n'est plus disponible
  useEffect(() => {
    if (sensors.length > 0) {
      if (!selectedSensorInput || !sensors.find(s => s.id === selectedSensorInput)) {
        console.log('📊 GraphsPage: Mise à jour du capteur sélectionné (input) vers:', sensors[0].id);
        setSelectedSensorInput(sensors[0].id);
      }
      if (!selectedSensor || !sensors.find(s => s.id === selectedSensor)) {
        console.log('📊 GraphsPage: Mise à jour du capteur appliqué vers:', sensors[0].id);
        setSelectedSensor(sensors[0].id);
      }
    }
  }, [sensors, selectedSensor, selectedSensorInput]);

  const activeSensor = sensors.find((s) => s.id === selectedSensor) || sensors[0];
  
  console.log('📊 GraphsPage: État complet:', {
    plantationId,
    sensorsCount: sensors.length,
    selectedSensor,
    activeSensor: activeSensor ? { id: activeSensor.id, label: activeSensor.label, dataKey: activeSensor.dataKey } : null,
    sensorsDataLength: sensorsData.length,
    chartDataLength: chartData.length,
    chartDataSample: chartData.slice(0, 2),
    availableSensorTypes,
    isLoading
  });

  // Configuration de la navbar pour la page des graphiques
  const graphsNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    { label: t('nav.graphs'), href: '/graphs' },
    { label: t('nav.ai'), href: '/ai' },
    { label: t('nav.support'), href: '/support' },
  ];

  const handleApplyFilter = () => {
    // Appliquer les filtres en copiant les valeurs des champs vers les valeurs appliquées
    setDateFrom(dateFromInput);
    setDateTo(dateToInput);
    setSelectedSensor(selectedSensorInput);
    console.log('Filter applied:', { dateFrom: dateFromInput, dateTo: dateToInput, sensor: selectedSensorInput });
  };

  const handleResetFilter = () => {
    // Réinitialiser les filtres
    setDateFromInput('');
    setDateToInput('');
    setDateFrom('');
    setDateTo('');
    // Réinitialiser le capteur au premier disponible
    if (sensors.length > 0) {
      setSelectedSensorInput(sensors[0].id);
      setSelectedSensor(sensors[0].id);
    }
    console.log('Filter reset');
  };

  return (
    <>
      <Background3D />
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
            {!plantationId && (
              <div className={styles.graphsPage__emptyMessage}>
                <p>{t('graphs.selectPlantation')}</p>
                <Link to="/plantations">
                  <Button variant="primary" style={{ marginTop: '1rem' }}>
                    {t('graphs.viewMyPlantations')}
                  </Button>
                </Link>
              </div>
            )}
            {isLoading && plantationId && (
              <p className={styles.graphsPage__loadingMessage}>
                {t('graphs.loading')}
              </p>
            )}
            {!isLoading && chartData.length === 0 && plantationId && sensors.length === 0 && (
              <p className={styles.graphsPage__emptyMessage}>
                {t('graphs.noSensorsAvailable')}
              </p>
            )}
            {!isLoading && chartData.length === 0 && plantationId && sensors.length > 0 && (
              <p className={styles.graphsPage__emptyMessage}>
                {t('graphs.empty')} - {t('graphs.noDataForSelectedSensors')}
              </p>
            )}
          </div>

          {/* Sensor Filter Buttons */}
          {plantationId && sensors.length > 0 && (
          <div className={styles.graphsPage__sensorFilters}>
            {sensors.map((sensor) => (
              <button
                key={sensor.id}
                onClick={() => setSelectedSensorInput(sensor.id)}
                className={`${styles.graphsPage__sensorButton} ${
                  selectedSensorInput === sensor.id
                    ? `${sensor.bgColor} ${styles.graphsPage__sensorButtonActive}`
                    : styles.graphsPage__sensorButtonInactive
                }`}
                style={
                  selectedSensorInput === sensor.id
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
          )}

          {/* Date Range Section */}
          {plantationId && (
          <div className={styles.graphsPage__dateRangeSection}>
            <div className={styles.graphsPage__dateInputs}>
              <div className={styles.graphsPage__dateInput}>
                <label className={styles.graphsPage__dateLabel}>
                  {t('graphs.dateFrom')}:
                </label>
                <input
                  type="date"
                  value={dateFromInput}
                  onChange={(e) => setDateFromInput(e.target.value)}
                  className={styles.graphsPage__dateInputField}
                />
              </div>
              <div className={styles.graphsPage__dateInput}>
                <label className={styles.graphsPage__dateLabel}>
                  {t('graphs.dateTo')}:
                </label>
                <input
                  type="date"
                  value={dateToInput}
                  onChange={(e) => setDateToInput(e.target.value)}
                  className={styles.graphsPage__dateInputField}
                />
              </div>
            </div>
            <div className={styles.graphsPage__filterButtons}>
              <Button
                variant="primary"
                onClick={handleApplyFilter}
                className={styles.graphsPage__applyButton}
              >
                {t('graphs.applyFilter')}
              </Button>
              {(dateFromInput || dateToInput || dateFrom || dateTo || (selectedSensorInput !== selectedSensor)) && (
                <Button
                  variant="secondary"
                  onClick={handleResetFilter}
                  className={styles.graphsPage__resetButton}
                >
                  {t('graphs.resetFilter')}
                </Button>
              )}
            </div>
          </div>
          )}

          {/* Chart Section */}
           {!plantationId ? (
             <div className={styles.graphsPage__chartSection}>
               <p className={styles.graphsPage__emptyMessage}>
                 {t('graphs.selectPlantation')}
               </p>
             </div>
           ) : !activeSensor ? (
             <div className={styles.graphsPage__chartSection}>
               <p className={styles.graphsPage__emptyMessage}>
                 {t('graphs.noSensorSelected')}
               </p>
             </div>
           ) : sensors.length > 0 ? (
          <div
            ref={chartRef as React.RefObject<HTMLDivElement>}
            className={`${styles.graphsPage__chartSection} ${
                 (isChartVisible || chartData.length > 0) ? styles.graphsPage__chartSectionVisible : ''
            }`}
          >
            <h3 className={styles.graphsPage__chartTitle}>
              {t('graphs.chart.title')} - {activeSensor.label}
            </h3>
               {(() => {
                 if (chartData.length > 0) {
                   console.log('📊 GraphsPage: Affichage du graphique avec', chartData.length, 'points de données');
                   console.log('📊 GraphsPage: Données pour Recharts:', {
                     dataLength: chartData.length,
                     firstPoint: chartData[0],
                     activeSensorDataKey: activeSensor.dataKey,
                     hasDataKey: chartData[0] && activeSensor.dataKey in chartData[0],
                     dataKeyValue: chartData[0]?.[activeSensor.dataKey],
                     allDataKeys: chartData[0] ? Object.keys(chartData[0]) : []
                   });
                   return (
            <div className={styles.graphsPage__chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                     <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
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
                       connectNulls={false}
                       dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
                   );
                 } else {
                   console.log('📊 GraphsPage: chartData est vide, affichage du message d\'erreur');
                   return (
                 <div className={styles.graphsPage__chartContainer}>
                   <p className={styles.graphsPage__emptyMessage}>
                     {t('graphs.empty')} - {t('graphs.noDataForSensor')} ({activeSensor.label}).
                     {sensorsData.length > 0 && (
                       <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                         {t('graphs.dataPointsLoaded').replace('{count}', sensorsData.length.toString()).replace('{sensorKey}', activeSensor.dataKey)}
                       </span>
                     )}
                   </p>
                 </div>
                   );
                 }
               })()}
             </div>
           ) : (
             <div className={styles.graphsPage__chartSection}>
               <p className={styles.graphsPage__emptyMessage}>
                 {t('graphs.noSensorsWithData')}
               </p>
          </div>
           )}
        </div>
      </main>
      <Footer />
    </>
  );
}


