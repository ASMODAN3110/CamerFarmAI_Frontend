import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Icon } from '@/components/ui/Icon/Icon';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FaLeaf,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSeedling,
  FaThermometerHalf,
  FaTint,
  FaSun,
  FaCloud,
  FaArrowLeft,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
} from 'react-icons/fa';
import { plantationService, type Plantation, type Sensor, type SensorReading } from '@/services/plantationService';
import { getSensorStatusColor, getSensorStatusLabel, getTimeSinceLastReading } from '@/utils/sensorStatus';
import styles from './PlantationDetailPage.module.css';

export function PlantationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sensorReadings, setSensorReadings] = useState<Record<string, SensorReading[]>>({});
  const [loadingReadings, setLoadingReadings] = useState<Record<string, boolean>>({});

  // Configuration de la navbar
  const detailNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    ...(id ? [{ label: t('plantations.detail.title'), href: `/plantations/${id}` }] : []),
    { label: t('nav.ai'), href: '/ai' },
    { label: t('nav.support'), href: '/support' },
  ];

  useEffect(() => {
    const loadPlantation = async () => {
      if (!id) {
        setError(t('plantations.detail.errors.invalidId'));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await plantationService.getById(id);
        console.log('📋 PlantationDetailPage - Données reçues:', {
          id: data.id,
          name: data.name,
          hasSensors: data.hasSensors,
          sensorsCount: data.sensors?.length || 0,
          sensors: data.sensors,
          hasActuators: data.hasActuators,
          actuatorsCount: data.actuators?.length || 0,
        });
        setPlantation(data);
      } catch (err) {
        console.error('Error fetching plantation:', err);
        setError(t('plantations.detail.errors.fetchFailed'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPlantation();
  }, [id, t]);

  // Charger les readings pour chaque capteur
  useEffect(() => {
    const loadSensorReadings = async () => {
      if (!plantation || !plantation.sensors || plantation.sensors.length === 0) {
        return;
      }

      const readingsMap: Record<string, SensorReading[]> = {};
      const loadingMap: Record<string, boolean> = {};

      // Initialiser l'état de chargement pour tous les capteurs
      plantation.sensors.forEach((sensor) => {
        if (sensor.id) {
          loadingMap[sensor.id] = true;
        }
      });
      setLoadingReadings(loadingMap);

      // Charger les readings pour chaque capteur
      // On récupère toujours depuis l'API pour avoir l'historique complet
      // IMPORTANT: Charger les readings même si le capteur est inactif car l'historique peut exister
      for (const sensor of plantation.sensors) {
        if (!sensor.id || !id) {
          loadingMap[sensor.id || ''] = false;
          continue;
        }

        try {
          // Toujours récupérer depuis l'API pour avoir l'historique complet
          // Si les readings sont déjà incluses, on peut les utiliser comme fallback
          let readings: SensorReading[] = [];
          
          // Essayer d'abord de récupérer depuis l'API
          try {
            readings = await plantationService.getSensorReadings(id, sensor.id);
            console.log(`📊 PlantationDetailPage - Readings récupérées pour capteur ${sensor.id} (${sensor.type}):`, readings.length);
          } catch (apiErr) {
            console.warn(`⚠️ PlantationDetailPage - Erreur API pour capteur ${sensor.id}, utilisation des readings incluses si disponibles:`, apiErr);
            // Fallback: utiliser les readings incluses dans le capteur si disponibles
            if (sensor.readings && sensor.readings.length > 0) {
              readings = sensor.readings;
              console.log(`📊 PlantationDetailPage - Utilisation des readings incluses pour capteur ${sensor.id}:`, readings.length);
            }
          }

          // Trier par timestamp décroissant (plus récent en premier)
          const sortedReadings = readings.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          readingsMap[sensor.id] = sortedReadings;
        } catch (err) {
          console.error(`❌ PlantationDetailPage - Erreur lors du chargement des readings pour capteur ${sensor.id}:`, err);
          readingsMap[sensor.id] = [];
        } finally {
          loadingMap[sensor.id] = false;
        }
      }

      setSensorReadings(readingsMap);
      setLoadingReadings(loadingMap);
      console.log('📊 PlantationDetailPage - État final des readings:', {
        sensorsCount: plantation.sensors.length,
        readingsCount: Object.keys(readingsMap).length,
        totalReadings: Object.values(readingsMap).reduce((sum, readings) => sum + readings.length, 0),
      });
    };

    loadSensorReadings();
  }, [plantation, id]);

  const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  // Fonction pour formater la superficie (convertit de m² vers l'unité la plus appropriée)
  const formatArea = (areaInSquareMeters: number) => {
    if (!areaInSquareMeters || areaInSquareMeters === 0) return '0 m²';
    
    // Convertir en différentes unités
    const km2 = areaInSquareMeters / 1000000;
    const ha = areaInSquareMeters / 10000;
    const acre = areaInSquareMeters / 4046.86;
    
    // Choisir l'unité la plus appropriée
    if (km2 >= 1) {
      return `${km2.toFixed(2)} km²`;
    } else if (ha >= 1) {
      return `${ha.toFixed(2)} ha`;
    } else if (acre >= 1) {
      return `${acre.toFixed(2)} acre`;
    } else {
      return `${areaInSquareMeters.toLocaleString()} m²`;
    }
  };

  if (isLoading) {
    return (
      <>
        <Background3D />
        <Header navItems={detailNavItems} currentPath={`/plantations/${id}`} showAuthIcons />
        <main className={styles.plantationDetailPage}>
          <div className={styles.plantationDetailPage__loading}>
            <p>{t('plantations.detail.loading')}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !plantation) {
    return (
      <>
        <Background3D />
        <Header navItems={detailNavItems} currentPath={`/plantations/${id}`} showAuthIcons />
        <main className={styles.plantationDetailPage}>
          <div className={styles.plantationDetailPage__error}>
            <p>{error || t('plantations.detail.errors.notFound')}</p>
            <Button variant="primary" onClick={() => navigate('/plantations')}>
              <FaArrowLeft /> {t('plantations.detail.backToList')}
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Background3D />
      <Header 
        navItems={detailNavItems} 
        currentPath={`/plantations/${id}`} 
        showAuthIcons 
      />
      <main className={styles.plantationDetailPage}>
        <div className={styles.plantationDetailPage__container}>
          {/* Informations principales de la plantation */}
          <Card className={styles.plantationDetailPage__infoCard}>
            <div className={styles.plantationDetailPage__infoHeader}>
              <div className={styles.plantationDetailPage__infoIcon}>
                <Icon icon={FaLeaf} size={40} />
              </div>
              <div className={styles.plantationDetailPage__infoTitle}>
                <h1>{plantation.name}</h1>
                <p className={styles.plantationDetailPage__infoSubtitle}>
                  <Icon icon={FaMapMarkerAlt} size={14} />
                  {plantation.location}
                </p>
              </div>
            </div>
            <div className={styles.plantationDetailPage__infoGrid}>
              {plantation.area && (
                <div className={styles.plantationDetailPage__infoItem}>
                  <span className={styles.plantationDetailPage__infoLabel}>
                    {t('plantations.area')}
                  </span>
                  <span className={styles.plantationDetailPage__infoValue}>
                    {formatArea(plantation.area)}
                  </span>
                </div>
              )}
              {plantation.cropType && (
                <div className={styles.plantationDetailPage__infoItem}>
                  <Icon icon={FaSeedling} size={16} />
                  <span className={styles.plantationDetailPage__infoLabel}>
                    {t('plantations.cropType')}
                  </span>
                  <span className={styles.plantationDetailPage__infoValue}>
                    {plantation.cropType}
                  </span>
                </div>
              )}
              <div className={styles.plantationDetailPage__infoItem}>
                <Icon icon={FaCalendarAlt} size={16} />
                <span className={styles.plantationDetailPage__infoLabel}>
                  {t('plantations.detail.createdAt')}
                </span>
                <span className={styles.plantationDetailPage__infoValue}>
                  {formatDate(plantation.createdAt)}
                </span>
              </div>
            </div>
          </Card>

          {/* Section capteurs */}
          {(() => {
            // Afficher les capteurs s'ils existent, même si hasSensors est false
            const hasSensorsArray = plantation.sensors && Array.isArray(plantation.sensors) && plantation.sensors.length > 0;
            const shouldShowSensors = hasSensorsArray;
            console.log('🔍 PlantationDetailPage - Condition d\'affichage capteurs:', {
              hasSensors: plantation.hasSensors,
              sensorsExists: !!plantation.sensors,
              sensorsIsArray: Array.isArray(plantation.sensors),
              sensorsLength: plantation.sensors?.length || 0,
              shouldShowSensors,
              sensors: plantation.sensors,
            });
            return shouldShowSensors;
          })() ? (
            <>
              <div className={styles.plantationDetailPage__sectionHeader}>
                <h2 className={styles.plantationDetailPage__sectionTitle}>
                  {t('plantations.detail.sensors.title')} ({plantation.sensors?.length || 0})
                </h2>
                {plantation.sensors && plantation.sensors.length > 0 && (
                  <div className={styles.plantationDetailPage__actionButtons}>
                    <Link
                      to={`/monitoring?plantationId=${plantation.id}`}
                      className={`${styles.plantationDetailPage__monitoringButton} ${styles.plantationDetailPage__monitoringButtonLink}`}
                    >
                      <FaChartLine /> {t('plantations.detail.monitoring')}
                    </Link>
                    <Link
                      to={`/graphs?plantationId=${plantation.id}`}
                      className={`${styles.plantationDetailPage__monitoringButton} ${styles.plantationDetailPage__monitoringButtonLink}`}
                    >
                      <FaChartBar /> {t('plantations.detail.graphs')}
                    </Link>
                  </div>
                )}
              </div>

              <div className={styles.plantationDetailPage__sensorsGrid}>
                {plantation.sensors?.map((sensor: Sensor) => {
                  const latestValue = sensor.latestReading?.value;
                  const getSensorLabel = (type: string) => {
                    const labels: Record<string, string> = {
                      temperature: t('plantations.detail.sensors.temperature'),
                      soilMoisture: t('plantations.detail.sensors.soilMoisture'),
                      co2Level: t('plantations.detail.sensors.co2Level'),
                      waterLevel: t('plantations.detail.sensors.waterLevel'),
                      luminosity: t('plantations.detail.sensors.luminosity'),
                    };
                    return labels[type] || type;
                  };
                  
                  const getSensorIcon = (type: string) => {
                    if (type === 'temperature') return FaThermometerHalf;
                    if (type === 'soilMoisture' || type === 'waterLevel') return FaTint;
                    if (type === 'luminosity') return FaSun;
                    return FaCloud;
                  };
                  
                  const getSensorUnit = (type: string) => {
                    if (type === 'temperature') return '°C';
                    if (type === 'soilMoisture' || type === 'waterLevel') return '%';
                    if (type === 'co2Level') return ' ppm';
                    if (type === 'luminosity') return ' lux';
                    return '';
                  };
                  
                  const statusColor = getSensorStatusColor(sensor.status);
                  const statusLabel = getSensorStatusLabel(sensor.status, t);
                  const timeSinceReading = getTimeSinceLastReading(sensor.latestReading?.timestamp);
                  
                  return (
                    <Card key={sensor.id} className={styles.plantationDetailPage__sensorCard}>
                      <div className={styles.plantationDetailPage__sensorHeader}>
                        <div 
                          className={styles.plantationDetailPage__sensorStatus}
                          style={{ color: statusColor }}
                        >
                          {sensor.status === 'active' ? (
                            <>
                              <Icon icon={FaCheckCircle} size={16} />
                              <span>{statusLabel}</span>
                            </>
                          ) : (
                            <>
                              <Icon icon={FaTimesCircle} size={16} />
                              <span>{statusLabel}</span>
                            </>
                          )}
                        </div>
                        <span className={styles.plantationDetailPage__sensorId}>
                          {getSensorLabel(sensor.type)}
                        </span>
                      </div>
                      <div className={styles.plantationDetailPage__sensorData}>
                        <div className={styles.plantationDetailPage__sensorMetric}>
                          <Icon icon={getSensorIcon(sensor.type)} size={20} />
                          <div>
                            <span className={styles.plantationDetailPage__sensorLabel}>
                              {getSensorLabel(sensor.type)}
                            </span>
                            <span className={styles.plantationDetailPage__sensorValue}>
                              {latestValue !== undefined && latestValue !== null 
                                ? `${latestValue}${getSensorUnit(sensor.type)}`
                                : t('plantations.detail.sensors.noData')
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.plantationDetailPage__sensorFooter}>
                        <span className={styles.plantationDetailPage__sensorTimestamp}>
                          {sensor.latestReading?.timestamp ? (
                            <>
                              {t('plantations.detail.sensors.lastUpdate')}: {formatDateTime(sensor.latestReading.timestamp)}
                              <span style={{ marginLeft: '8px', fontSize: '0.85em', opacity: 0.7 }}>
                                ({timeSinceReading})
                              </span>
                            </>
                          ) : (
                            <span style={{ color: '#ef4444', fontStyle: 'italic' }}>
                              {t('plantations.detail.sensors.noReading')}
                            </span>
                          )}
                        </span>
                      </div>
                      
                      {/* Historique des valeurs - Section toujours visible */}
                      <div className={styles.plantationDetailPage__readingsSection}>
                        <h4 className={styles.plantationDetailPage__readingsTitle}>
                          <Icon icon={FaChartLine} size={14} />
                          {t('plantations.detail.sensors.readingsHistory')}
                        </h4>
                        {loadingReadings[sensor.id] ? (
                          <div className={styles.plantationDetailPage__readingsLoading}>
                            <Icon icon={FaCloud} size={16} />
                            {t('plantations.detail.sensors.loadingReadings')}
                          </div>
                        ) : sensorReadings[sensor.id] && sensorReadings[sensor.id].length > 0 ? (
                          <>
                            <div className={styles.plantationDetailPage__readingsList}>
                              {sensorReadings[sensor.id].slice(0, 15).map((reading) => (
                                <div key={reading.id} className={styles.plantationDetailPage__readingItem}>
                                  <span className={styles.plantationDetailPage__readingValue}>
                                    {reading.value}{getSensorUnit(sensor.type)}
                                  </span>
                                  <span className={styles.plantationDetailPage__readingTime}>
                                    {formatDateTime(reading.timestamp)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {sensorReadings[sensor.id].length > 15 && (
                              <div className={styles.plantationDetailPage__readingsMore}>
                                +{sensorReadings[sensor.id].length - 15} {t('plantations.detail.sensors.recentReadings').toLowerCase()}...
                                <span className={styles.plantationDetailPage__readingsTotal}>
                                  ({sensorReadings[sensor.id].length} {t('plantations.detail.sensors.recentReadings').toLowerCase()})
                                </span>
                              </div>
                            )}
                            {sensorReadings[sensor.id].length <= 15 && sensorReadings[sensor.id].length > 0 && (
                              <div className={styles.plantationDetailPage__readingsSummary}>
                                {sensorReadings[sensor.id].length} {t('plantations.detail.sensors.recentReadings').toLowerCase()}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className={styles.plantationDetailPage__readingsEmpty}>
                            <Icon icon={FaCloud} size={16} />
                            {t('plantations.detail.sensors.noReadings')}
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <Card className={styles.plantationDetailPage__emptyState}>
              <Icon icon={FaCloud} size={48} />
              <h3>{t('plantations.detail.sensors.noSensors')}</h3>
              <p>{t('plantations.detail.sensors.noSensorsMessage')}</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButton
        href="/ai"
        position="bottom-right"
        aria-label={t('floatingButton.ariaLabel')}
      />
    </>
  );
}

