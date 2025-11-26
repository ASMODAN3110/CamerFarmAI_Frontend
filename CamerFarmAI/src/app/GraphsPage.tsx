import { useState, useMemo } from 'react';
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
  value: number;
  temperature: number;
  humidity: number;
  co2: number;
}

interface SensorFilter {
  id: string;
  label: string;
  icon: typeof FaTint;
  color: string;
  bgColor: string;
}

// Générer des données de graphique
const generateChartData = (): ChartDataPoint[] => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const data: ChartDataPoint[] = [];

  for (let i = 0; i < days.length * 3; i++) {
    data.push({
      day: days[i % days.length],
      value: Math.floor(Math.random() * 70 + 20),
      temperature: Math.floor(Math.random() * 30 + 10),
      humidity: Math.floor(Math.random() * 60 + 30),
      co2: Math.floor(Math.random() * 500 + 300),
    });
  }

  return data;
};

export function GraphsPage() {
  const { t } = useTranslation();
  const [selectedSensor, setSelectedSensor] = useState('humidity');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { ref: chartRef, isVisible: isChartVisible } = useScrollAnimation({ threshold: 0.1 });

  const chartData = useMemo(() => generateChartData(), []);

  const sensors: SensorFilter[] = [
    {
      id: 'humidity',
      label: t('graphs.sensors.humidity'),
      icon: FaTint,
      color: '#10B981',
      bgColor: styles.sensorHumidity,
    },
    {
      id: 'temperature',
      label: t('graphs.sensors.temperature'),
      icon: FaSun,
      color: '#3B82F6',
      bgColor: styles.sensorTemperature,
    },
    {
      id: 'luminosity',
      label: t('graphs.sensors.luminosity'),
      icon: FaCloud,
      color: '#F59E0B',
      bgColor: styles.sensorLuminosity,
    },
    {
      id: 'co2',
      label: t('graphs.sensors.co2'),
      icon: FaWind,
      color: '#8B5CF6',
      bgColor: styles.sensorCo2,
    },
  ];

  const activeSensor = sensors.find((s) => s.id === selectedSensor) || sensors[0];

  // Configuration de la navbar pour la page des graphiques
  const graphsNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.graphs'), href: '/graphs' },
    { label: t('nav.support'), href: '/support' },
    { label: t('nav.ai'), href: '/ai' },
  ];

  const handleApplyFilter = () => {
    // TODO: Implémenter la logique de filtrage par date
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
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: `2px solid ${activeSensor.color}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    cursorStyle={{ cursor: 'pointer' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
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


