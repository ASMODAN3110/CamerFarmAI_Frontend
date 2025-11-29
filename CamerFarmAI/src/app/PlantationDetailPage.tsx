import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Icon } from '@/components/ui/Icon/Icon';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
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
import { plantationService, type Plantation, type Sensor } from '@/services/plantationService';
import styles from './PlantationDetailPage.module.css';

export function PlantationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configuration de la navbar
  const detailNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
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

  const formatDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <>
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
      <Header navItems={detailNavItems} currentPath={`/plantations/${id}`} showAuthIcons />
      <main className={styles.plantationDetailPage}>
        <div className={styles.plantationDetailPage__container}>
          {/* Header avec bouton retour */}
          <div className={styles.plantationDetailPage__header}>
            <Button
              variant="secondary"
              onClick={() => navigate('/plantations')}
              className={styles.plantationDetailPage__backButton}
            >
              <FaArrowLeft /> {t('plantations.detail.backToList')}
            </Button>
          </div>

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
                    {plantation.area} ha
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
          {plantation.hasSensors && plantation.sensors && plantation.sensors.length > 0 ? (
            <>
              <div className={styles.plantationDetailPage__sectionHeader}>
                <h2 className={styles.plantationDetailPage__sectionTitle}>
                  {t('plantations.detail.sensors.title')} ({plantation.sensors.filter((s: Sensor) => s.latestReading != null).length})
                </h2>
                {plantation.hasSensors && (
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

              {plantation.sensors.filter((sensor: Sensor) => sensor.latestReading != null).length > 0 ? (
                <div className={styles.plantationDetailPage__sensorsGrid}>
                  {plantation.sensors
                    .filter((sensor: Sensor) => sensor.latestReading != null) // Filtrer les capteurs sans lecture
                    .map((sensor: Sensor) => {
                  const latestValue = sensor.latestReading?.value;
                  const getSensorLabel = (type: string) => {
                    const labels: Record<string, string> = {
                      temperature: t('plantations.detail.sensors.temperature'),
                      humidity: t('plantations.detail.sensors.humidity'),
                      soilMoisture: t('plantations.detail.sensors.soilMoisture'),
                      co2Level: t('plantations.detail.sensors.co2Level'),
                      waterLevel: t('plantations.detail.sensors.waterLevel'),
                      luminosity: t('plantations.detail.sensors.luminosity'),
                    };
                    return labels[type] || type;
                  };
                  
                  const getSensorIcon = (type: string) => {
                    if (type === 'temperature') return FaThermometerHalf;
                    if (type === 'humidity') return FaCloud;
                    if (type === 'soilMoisture' || type === 'waterLevel') return FaTint;
                    if (type === 'luminosity') return FaSun;
                    return FaCloud;
                  };
                  
                  const getSensorUnit = (type: string) => {
                    if (type === 'temperature') return '°C';
                    if (type === 'humidity' || type === 'soilMoisture' || type === 'waterLevel') return '%';
                    if (type === 'co2Level') return ' ppm';
                    if (type === 'luminosity') return ' lux';
                    return '';
                  };
                  
                  return (
                    <Card key={sensor.id} className={styles.plantationDetailPage__sensorCard}>
                      <div className={styles.plantationDetailPage__sensorHeader}>
                        <div className={styles.plantationDetailPage__sensorStatus}>
                          {sensor.status === 'active' ? (
                            <>
                              <Icon icon={FaCheckCircle} size={16} />
                              <span>{t('plantations.detail.sensors.active')}</span>
                            </>
                          ) : (
                            <>
                              <Icon icon={FaTimesCircle} size={16} />
                              <span>{t('plantations.detail.sensors.inactive')}</span>
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
                      {sensor.latestReading?.timestamp && (
                        <div className={styles.plantationDetailPage__sensorFooter}>
                          <span className={styles.plantationDetailPage__sensorTimestamp}>
                            {t('plantations.detail.sensors.lastUpdate')}: {formatDateTime(sensor.latestReading.timestamp)}
                          </span>
                        </div>
                      )}
                    </Card>
                  );
                  })}
                </div>
              ) : (
                <Card className={styles.plantationDetailPage__emptyState}>
                  <p>{t('plantations.detail.sensors.noSensorsMessage')}</p>
                </Card>
              )}
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
        href="/support"
        position="bottom-right"
        aria-label={t('floatingButton.ariaLabel')}
      />
    </>
  );
}

