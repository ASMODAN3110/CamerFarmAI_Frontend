import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { Modal } from '@/components/ui/Modal/Modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { plantationService, type Sensor, type Actuator, type SensorReading } from '@/services/plantationService';
import type { Notification } from '@/services/notificationService';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { useAuthStore } from '@/services/useAuthStore';
import { getSensorStatusColor, getTimeSinceLastReading } from '@/utils/sensorStatus';
import {
  FaTint,
  FaSun,
  FaWind,
  FaThermometerHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
  FaHandPointer,
  FaArrowLeft,
  FaCircle,
  FaEdit,
  FaTimes,
  FaInfoCircle,
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

// Constantes centralisées pour les valeurs par défaut des seuils
// Valeurs adaptées aux conditions climatiques et aux cultures du Cameroun
const DEFAULT_THRESHOLDS = {
  temperature: { min: 22, max: 30 }, // Plage optimale pour cultures tropicales (cacao, café, maïs, etc.)
  soilHumidity: { min: 50, max: 80 }, // Humidité du sol adaptée aux cultures tropicales nécessitant plus d'eau
  co2: { min: 400, max: 1000 }, // Plage normale de CO₂ en agriculture (400-1000 ppm)
  waterLevel: { min: 20 }, // Niveau d'eau minimum plus élevé pour cultures tropicales
  // Luminosité adaptée au climat tropical avec forte exposition solaire
  // Échelle lux : < 50 (très sombre), 50-200 (sombre), 200-500 (normal), 500-1000 (fort), > 1000 (très lumineux)
  // Soleil direct : 10 000 à 100 000 lux. Pour cultures tropicales : plage optimale en plein soleil
  luminosity: { min: 20000, max: 90000 }, // Plage optimale pour cultures tropicales en plein soleil (20k-90k lux)
} as const;

// Fonction utilitaire pour valider et normaliser les seuils
function normalizeThresholds(
  seuilMin?: number,
  seuilMax?: number,
  type: 'temperature' | 'soilHumidity' | 'co2' | 'luminosity' = 'temperature'
): { min: number; max: number } {
  const defaults = DEFAULT_THRESHOLDS[type];
  const min = seuilMin ?? defaults.min;
  const max = seuilMax ?? defaults.max;
  
  // Validation : s'assurer que max > min
  if (max <= min) {
    console.warn(`Invalid thresholds: max (${max}) must be greater than min (${min}). Using defaults.`);
    return { min: defaults.min, max: defaults.max };
  }
  
  return { min, max };
}

// Fonctions utilitaires pour calculer les couleurs basées sur les seuils
// Amélioration : Gradients avec transitions fluides et zones d'avertissement claires
// Logique cohérente : Zone optimale entre les seuils (pas seulement à seuilMin)
function generateTemperatureGradientStops(seuilMin?: number, seuilMax?: number, min = 0, max = 50) {
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'temperature');
  const minOffset = ((effectiveMin - min) / (max - min)) * 100;
  const maxOffset = ((effectiveMax - min) / (max - min)) * 100;
  const warningZone = 5; // Zone d'avertissement de 5% avant seuilMax
  const coldZone = 5; // Zone de froid avant seuilMin
  
  return [
    { offset: '0%', color: 'hsl(200, 90%, 60%)' }, // Bleu-vert (très froid)
    { offset: `${Math.max(0, minOffset - coldZone * 2)}%`, color: 'hsl(180, 85%, 60%)' }, // Cyan (froid)
    { offset: `${Math.max(0, minOffset - coldZone)}%`, color: 'hsl(150, 80%, 60%)' }, // Vert-cyan (approche optimal)
    { offset: `${minOffset}%`, color: 'hsl(120, 80%, 60%)' }, // Vert optimal à seuilMin
    { offset: `${(minOffset + maxOffset) / 2}%`, color: 'hsl(120, 85%, 62%)' }, // Vert pur au centre (zone optimale)
    { offset: `${minOffset + (maxOffset - minOffset) * 0.7}%`, color: 'hsl(60, 90%, 55%)' }, // Jaune (avertissement)
    { offset: `${maxOffset - warningZone}%`, color: 'hsl(30, 90%, 55%)' }, // Orange (proche danger)
    { offset: `${maxOffset}%`, color: 'hsl(0, 90%, 55%)' }, // Rouge à seuilMax
    { offset: '100%', color: 'hsl(0, 95%, 50%)' }, // Rouge intense (danger extrême)
  ];
}

function generateSoilHumidityGradientStops(seuilMin?: number, seuilMax?: number, min = 0, max = 100) {
  // Gradient optimisé : Zone optimale verte bien définie entre les seuils avec transitions fluides
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'soilHumidity');
  
  const minOffset = ((effectiveMin - min) / (max - min)) * 100;
  const maxOffset = ((effectiveMax - min) / (max - min)) * 100;
  const warningZone = 8; // Zone d'avertissement de 8%
  
  return [
    { offset: '0%', color: 'hsl(0, 95%, 50%)' }, // Rouge intense (très sec)
    { offset: `${Math.max(0, minOffset - warningZone * 1.5)}%`, color: 'hsl(0, 90%, 55%)' }, // Rouge (sec)
    { offset: `${Math.max(0, minOffset - warningZone)}%`, color: 'hsl(15, 90%, 55%)' }, // Rouge-orange (approche seuilMin)
    { offset: `${minOffset}%`, color: 'hsl(45, 90%, 55%)' }, // Orange-jaune à seuilMin
    { offset: `${minOffset + (maxOffset - minOffset) * 0.2}%`, color: 'hsl(75, 85%, 58%)' }, // Jaune-vert (transition)
    { offset: `${(minOffset + maxOffset) / 2}%`, color: 'hsl(120, 80%, 60%)' }, // Vert optimal au centre
    { offset: `${maxOffset - (maxOffset - minOffset) * 0.2}%`, color: 'hsl(75, 85%, 58%)' }, // Vert-jaune (transition)
    { offset: `${maxOffset}%`, color: 'hsl(45, 90%, 55%)' }, // Jaune-orange à seuilMax
    { offset: `${Math.min(100, maxOffset + warningZone)}%`, color: 'hsl(15, 90%, 55%)' }, // Orange-rouge (approche danger)
    { offset: `${Math.min(100, maxOffset + warningZone * 1.5)}%`, color: 'hsl(0, 90%, 55%)' }, // Rouge (trop humide)
    { offset: '100%', color: 'hsl(0, 95%, 50%)' }, // Rouge intense (saturation)
  ];
}

function generateCO2GradientStops(seuilMin?: number, seuilMax?: number, min = 0, max = 2500) {
  // Gradient optimisé : Vert optimal en dessous de seuilMin, transition progressive vers rouge au-dessus de seuilMax
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'co2');
  
  const minOffset = ((effectiveMin - min) / (max - min)) * 100;
  const maxOffset = ((effectiveMax - min) / (max - min)) * 100;
  const warningZone = 5; // Zone d'avertissement de 5%
  
  return [
    { offset: '0%', color: 'hsl(140, 70%, 50%)' }, // Vert foncé (très bas)
    { offset: `${Math.max(0, minOffset - 10)}%`, color: 'hsl(140, 75%, 55%)' }, // Vert (bon niveau)
    { offset: `${minOffset}%`, color: 'hsl(120, 80%, 60%)' }, // Vert optimal à seuilMin
    { offset: `${minOffset + (maxOffset - minOffset) * 0.25}%`, color: 'hsl(100, 85%, 58%)' }, // Vert-jaune (transition douce)
    { offset: `${minOffset + (maxOffset - minOffset) * 0.5}%`, color: 'hsl(75, 90%, 56%)' }, // Jaune-vert (avertissement léger)
    { offset: `${minOffset + (maxOffset - minOffset) * 0.75}%`, color: 'hsl(50, 90%, 55%)' }, // Jaune-orange (avertissement)
    { offset: `${maxOffset - warningZone}%`, color: 'hsl(30, 90%, 55%)' }, // Orange (proche danger)
    { offset: `${maxOffset}%`, color: 'hsl(10, 90%, 55%)' }, // Rouge-orange à seuilMax
    { offset: `${Math.min(100, maxOffset + warningZone)}%`, color: 'hsl(0, 90%, 55%)' }, // Rouge (danger)
    { offset: '100%', color: 'hsl(0, 95%, 50%)' }, // Rouge intense (danger extrême)
  ];
}

// Fonction pour générer les stops de gradient pour le niveau d'eau
function generateWaterLevelGradientStops(seuilMin?: number, min = 0, max = 100) {
  // Gradient optimisé : Rouge en dessous de seuilMin, vert au-dessus avec transition fluide
  const effectiveMin = seuilMin ?? DEFAULT_THRESHOLDS.waterLevel.min;
  const minOffset = ((effectiveMin - min) / (max - min)) * 100;
  const warningZone = 5; // Zone d'avertissement de 5%
  
  return [
    { offset: '0%', color: 'hsl(0, 95%, 50%)' }, // Rouge intense (vide)
    { offset: `${Math.max(0, minOffset - warningZone * 2)}%`, color: 'hsl(0, 90%, 55%)' }, // Rouge (critique)
    { offset: `${Math.max(0, minOffset - warningZone)}%`, color: 'hsl(15, 90%, 55%)' }, // Rouge-orange (faible)
    { offset: `${minOffset}%`, color: 'hsl(45, 90%, 55%)' }, // Orange-jaune à seuilMin
    { offset: `${minOffset + 10}%`, color: 'hsl(75, 85%, 58%)' }, // Jaune-vert (transition)
    { offset: `${minOffset + 20}%`, color: 'hsl(120, 80%, 60%)' }, // Vert (bon niveau)
    { offset: '100%', color: 'hsl(140, 75%, 55%)' }, // Vert foncé (plein)
  ];
}

function calculateColorFromThresholds(value: number, seuilMin?: number, seuilMax?: number, type: 'temperature' | 'soilHumidity' | 'co2' | 'waterLevel' | 'luminosity' = 'temperature') {
  if (type === 'temperature') {
    const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'temperature');
    const coldZone = 5; // Zone de froid avant seuilMin
    
    // Zone très froide (en dessous de seuilMin - coldZone)
    if (value <= effectiveMin - coldZone) return 'hsl(200, 90%, 60%)'; // Bleu-vert (très froid)
    
    // Zone froide (entre seuilMin - coldZone et seuilMin)
    if (value <= effectiveMin) {
      const ratio = (value - (effectiveMin - coldZone)) / coldZone;
      const hue = 200 - (ratio * 80); // De bleu-vert (200) à vert (120)
      return `hsl(${hue}, 85%, 60%)`;
    }
    
    // Zone optimale (entre seuilMin et seuilMax)
    if (value <= effectiveMax) {
      const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
      if (ratio < 0.5) {
        // Première moitié : vert pur au centre
        return 'hsl(120, 85%, 62%)'; // Vert optimal
      } else {
        // Seconde moitié : transition vers jaune
        const subRatio = (ratio - 0.5) * 2; // 0 à 1 dans la seconde moitié
        const hue = 120 - (subRatio * 60); // De vert (120) à jaune (60)
        return `hsl(${hue}, 90%, 55%)`;
      }
    }
    
    // Zone chaude (au-dessus de seuilMax)
    const warningZone = 5;
    if (value <= effectiveMax + warningZone) {
      const ratio = (value - effectiveMax) / warningZone;
      const hue = 60 - (ratio * 30); // De jaune (60) à orange (30)
      return `hsl(${hue}, 90%, 55%)`;
    }
    
    // Zone très chaude (au-dessus de seuilMax + warningZone)
    return 'hsl(0, 95%, 50%)'; // Rouge intense (danger extrême)
  }
  
  if (type === 'soilHumidity') {
    const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'soilHumidity');
    const warningZone = 8; // Zone d'avertissement de 8% (cohérent avec le gradient)
    
    // Logique alignée avec le gradient : transitions progressives
    // Zone optimale (verte) entre les seuils
    if (value >= effectiveMin && value <= effectiveMax) {
      // Plus proche du centre = vert plus pur
      const center = (effectiveMin + effectiveMax) / 2;
      const distanceFromCenter = Math.abs(value - center);
      const maxDistance = (effectiveMax - effectiveMin) / 2;
      const ratio = distanceFromCenter / maxDistance;
      // Transition du vert pur au centre vers vert-jaune aux bords
      if (ratio < 0.3) return 'hsl(120, 80%, 60%)'; // Vert optimal
      if (ratio < 0.6) return 'hsl(100, 82%, 59%)'; // Vert-jaune léger
      return 'hsl(75, 85%, 58%)'; // Jaune-vert (bord de la zone optimale)
    }
    
    // Zone d'avertissement en dessous du seuil min
    if (value < effectiveMin) {
      const distanceBelow = effectiveMin - value;
      if (distanceBelow <= warningZone) {
        // Transition orange-jaune → rouge-orange → rouge
        const ratio = distanceBelow / warningZone;
        if (ratio < 0.33) return 'hsl(45, 90%, 55%)'; // Orange-jaune
        if (ratio < 0.66) return 'hsl(15, 90%, 55%)'; // Rouge-orange
        return 'hsl(0, 90%, 55%)'; // Rouge
      }
      // Au-delà de la zone d'avertissement = rouge intense
      return 'hsl(0, 95%, 50%)'; // Rouge intense (très sec)
    }
    
    // Zone d'avertissement au-dessus du seuil max
    if (value > effectiveMax) {
      const distanceAbove = value - effectiveMax;
      if (distanceAbove <= warningZone) {
        // Transition orange-jaune → rouge-orange → rouge
        const ratio = distanceAbove / warningZone;
        if (ratio < 0.33) return 'hsl(45, 90%, 55%)'; // Orange-jaune
        if (ratio < 0.66) return 'hsl(15, 90%, 55%)'; // Rouge-orange
        return 'hsl(0, 90%, 55%)'; // Rouge
      }
      // Au-delà de la zone d'avertissement = rouge intense
      return 'hsl(0, 95%, 50%)'; // Rouge intense (trop humide)
    }
    
    return 'hsl(120, 80%, 60%)'; // Par défaut vert (ne devrait jamais arriver ici)
  }
  
  if (type === 'co2') {
    const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'co2');
    
    // Amélioration : Transitions plus fluides
    if (value <= effectiveMin) return 'hsl(120, 80%, 60%)'; // Vert bon
    if (value >= effectiveMax) return 'hsl(0, 90%, 55%)'; // Rouge danger
    const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
    if (ratio < 0.25) return 'hsl(100, 85%, 58%)'; // Vert-jaune
    if (ratio < 0.5) return 'hsl(75, 90%, 56%)'; // Jaune-vert
    if (ratio < 0.75) return 'hsl(50, 90%, 55%)'; // Jaune-orange
    return 'hsl(30, 90%, 55%)'; // Orange
  }
  
  if (type === 'waterLevel') {
    const effectiveMin = seuilMin ?? DEFAULT_THRESHOLDS.waterLevel.min;
    
    // Amélioration : Transitions plus fluides
    if (value >= effectiveMin + 10) return 'hsl(120, 80%, 60%)'; // Vert bon
    if (value >= effectiveMin) return 'hsl(75, 85%, 58%)'; // Jaune-vert (transition)
    if (value >= effectiveMin - 5) return 'hsl(45, 90%, 55%)'; // Orange-jaune (avertissement)
    return 'hsl(0, 90%, 55%)'; // Rouge faible
  }
  
  if (type === 'luminosity') {
    const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'luminosity');
    const warningZone = 0.1; // 10% de marge pour la zone d'avertissement
    
    // Zone optimale (entre les seuils)
    if (value >= effectiveMin && value <= effectiveMax) return 'hsl(120, 80%, 60%)'; // Vert optimal
    
    // Zone d'avertissement (en dessous de seuilMin ou au-dessus de seuilMax)
    const minWarning = effectiveMin * (1 - warningZone);
    const maxWarning = effectiveMax * (1 + warningZone);
    
    if (value >= minWarning && value < effectiveMin) {
      // Zone d'avertissement en dessous
      const ratio = (value - minWarning) / (effectiveMin - minWarning);
      const hue = 200 - (ratio * 50); // De bleu-gris (200) à vert-cyan (150)
      return `hsl(${hue}, 70%, 55%)`;
    }
    
    if (value > effectiveMax && value <= maxWarning) {
      // Zone d'avertissement au-dessus
      const ratio = (value - effectiveMax) / (maxWarning - effectiveMax);
      const hue = 90 - (ratio * 30); // De vert-jaune (90) à jaune (60)
      return `hsl(${hue}, 90%, 55%)`;
    }
    
    // Zone critique (très en dessous ou très au-dessus)
    return 'hsl(0, 90%, 55%)'; // Rouge
  }
  
  return '#6b7280'; // Par défaut
}

// Widget de température avec jauge semi-circulaire
function TemperatureWidget({ value, updatedAt, isActive = true, seuilMin, seuilMax }: { value: number; updatedAt: string; isActive?: boolean; seuilMin?: number; seuilMax?: number }) {
  const { t } = useTranslation();
  const min = 0;
  const max = 50;
  
  // S'assurer que la valeur est dans les limites
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Calculate progress (0 to 1) basé sur la plage effective
  const progress = (clampedValue - min) / (max - min);
  
  // Calculer la couleur basée sur les seuils
  const color = calculateColorFromThresholds(clampedValue, seuilMin, seuilMax, 'temperature');
  
  // Générer les stops du gradient
  const gradientStops = generateTemperatureGradientStops(seuilMin, seuilMax, min, max);
  const gradientId = `temperatureGradient-${seuilMin ?? 'default'}-${seuilMax ?? 'default'}`;
  
  // Calculate arc length for dasharray (π * r for semi-circle)
  // Using larger radius for bigger gauge (like CO2)
  const arcRadius = 100; // Increased from 80 to 100 for larger gauge
  const arcLength = Math.PI * arcRadius; // ~314.16
  
  // Needle rotation: -180° (left) to 0° (right) - 180° total, horizontal
  // For a horizontal arc oriented downward, the needle should point to the exact position on the arc
  const needleAngle = -180 + progress * 180; // Angle on the arc
  
  // Calculate the exact point on the arc (radius 100) where the needle should point
  const needleLength = 85; // Length of the needle (slightly less than radius)

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
        <div className={styles.monitoringPage__gaugeWrapper}>
        <svg
          className={styles.monitoringPage__gauge}
            viewBox="-120 -120 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
            {/* Gradient definition for temperature color variation basé sur les seuils */}
            <defs>
              <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="100" y2="0">
                {gradientStops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity="1" />
                ))}
              </linearGradient>
            </defs>
            {/* Background track - 180° horizontal arc from left to right (oriented downward) */}
          <path
              d="M -100 0 A 100 100 0 0 1 100 0"
            fill="none"
              strokeWidth="16"
              stroke="rgba(209, 250, 229, 0.3)"
              strokeLinecap="round"
          />
            {/* Colored progress arc with gradient - full arc with gradient, then use dasharray to show progress */}
          <path
              d="M -100 0 A 100 100 0 0 1 100 0"
            fill="none"
              strokeWidth="16"
              stroke={`url(#${gradientId})`}
            strokeLinecap="round"
              strokeDasharray={`${progress * arcLength} ${arcLength}`}
              strokeDashoffset="0"
          />
            {/* Tick marks - 6 marks basés sur la plage effective */}
            {Array.from({ length: 6 }).map((_, i) => {
              const tickValue = min + (i * (max - min)) / 5; // 0, 10, 20, 30, 40, 50
              // Calculate angle for each tick: 0-50 maps to -180° (left) to 0° (right) - 180° total, horizontal
              const tickProgress = (tickValue - min) / (max - min);
              const tickAngle = -180 + tickProgress * 180; // -180° (left) to 0° (right)
              const x1 = 85 * Math.cos((tickAngle * Math.PI) / 180);
              const y1 = 85 * Math.sin((tickAngle * Math.PI) / 180);
              const x2 = 100 * Math.cos((tickAngle * Math.PI) / 180);
              const y2 = 100 * Math.sin((tickAngle * Math.PI) / 180);
              const tickX = 115 * Math.cos((tickAngle * Math.PI) / 180);
              const tickY = 115 * Math.sin((tickAngle * Math.PI) / 180);
              
            return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(16, 185, 129, 0.7)"
                    strokeWidth="2"
                  />
                <text
                    x={tickX}
                    y={tickY}
                  textAnchor="middle"
                    dominantBaseline="middle"
                  fill="#6b7280"
                    fontSize="10"
                >
                    {Math.round(tickValue)}
                </text>
              </g>
            );
          })}
            {/* Needle - points to exact position on arc for current temperature value */}
          <g 
            className={styles.monitoringPage__needleGroup}
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <line
                x1="0"
                y1="0"
                x2={needleLength}
                y2="0"
                stroke={color}
                strokeWidth="4"
              strokeLinecap="round"
                className={styles.monitoringPage__needle}
            />
          </g>
            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#d1fae5"
              stroke={color}
              strokeWidth="3"
            />
        </svg>
          {/* Value display */}
          <div className={styles.monitoringPage__gaugeValueDisplay}>
            <span className={styles.monitoringPage__gaugeValueNumber} style={{ color }}>
              {clampedValue.toFixed(1)}
            </span>
            <span className={styles.monitoringPage__gaugeValueUnit}>°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Widget d'humidité du sol avec barre de progression horizontale améliorée
function SoilHumidityWidget({ value, updatedAt, isActive = true, seuilMin, seuilMax }: { value: number; updatedAt: string; isActive?: boolean; seuilMin?: number; seuilMax?: number }) {
  const { t } = useTranslation();
  const min = 0;
  const max = 100;
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'soilHumidity');
  
  // Calculer la couleur basée sur les seuils pour synchronisation
  const color = calculateColorFromThresholds(value, seuilMin, seuilMax, 'soilHumidity');
  
  // Determine status based on humidity level avec seuils (synchronisé avec calculateColorFromThresholds)
  const getStatus = () => {
    const warningZone = 8; // Cohérent avec calculateColorFromThresholds
    
    if (value >= effectiveMin && value <= effectiveMax) {
      return { text: t('monitoring.status.optimal') };
    }
    // En dessous du seuil min
    if (value < effectiveMin) {
      if (value < effectiveMin - warningZone) {
        return { text: t('monitoring.status.low') }; // Très sec
      }
      return { text: t('monitoring.status.moderate') }; // Zone d'avertissement
    }
    // Au-dessus du seuil max
    if (value > effectiveMax) {
      if (value > effectiveMax + warningZone) {
        return { text: t('monitoring.status.high') }; // Trop humide
    }
      return { text: t('monitoring.status.moderate') }; // Zone d'avertissement
    }
    return { text: t('monitoring.status.moderate') };
  };
  const status = getStatus();
  
  // Générer les stops du gradient
  const gradientStops = generateSoilHumidityGradientStops(seuilMin, seuilMax, min, max);
  const gradientId = `humidityGradient-${seuilMin ?? 'default'}-${seuilMax ?? 'default'}`;
  
  // Convertir les stops SVG en gradient CSS linéaire
  const cssGradient = `linear-gradient(to right, ${gradientStops.map(stop => `${stop.color} ${stop.offset}`).join(', ')})`;

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
        {/* Value and status badge */}
        <div className={styles.monitoringPage__humidityHeader}>
          <span className={styles.monitoringPage__humidityValueLarge} style={{ color }}>
            <span>{value.toFixed(1)}</span>
            <span className={styles.monitoringPage__humidityValueUnit}>%</span>
          </span>
          <div
            className={styles.monitoringPage__humidityStatusBadge}
            style={{ backgroundColor: color }}
          >
          {status.text}
        </div>
        </div>
        
        {/* Progress bar with water drops pattern */}
        <div className={styles.monitoringPage__progressBarEnhanced}>
          {/* Gradient definition for humidity color variation basé sur les seuils */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                {gradientStops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity="1" />
                ))}
              </linearGradient>
            </defs>
          </svg>
          
          {/* Water drops background pattern */}
          <div className={styles.monitoringPage__waterDropsPattern}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Icon key={i} icon={FaTint} size={12} className={styles.monitoringPage__waterDropIcon} />
            ))}
          </div>
          
          {/* Progress bar track avec gradient sur toute la barre (0-100%) - masqué pour ne montrer que jusqu'à la valeur */}
          <div 
            className={styles.monitoringPage__progressBarTrackEnhanced}
            style={{ 
              background: cssGradient,
              clipPath: `inset(0 ${100 - value}% 0 0)`,
              transition: 'clip-path 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Progress bar fill - contient les bulles d'eau */}
            <div
              className={styles.monitoringPage__progressBarFillEnhanced}
              style={{ 
                width: '100%',
                height: '100%',
                background: 'transparent',
                position: 'relative'
              }}
            >
              {/* Water bubbles */}
              <div className={styles.monitoringPage__waterBubbles}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.monitoringPage__waterBubble}
                    style={{
                      width: `${10 + Math.random() * 10}px`,
                      height: `${10 + Math.random() * 10}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
            />
                ))}
          </div>
            </div>
            
            {/* Measurement markers */}
            <div className={styles.monitoringPage__progressBarMarkers}>
              {[0, 25, 50, 75, 100].map((mark) => (
                <div
                  key={mark}
                  className={styles.monitoringPage__progressBarMarker}
                  style={{ left: `${mark}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Labels */}
        <div className={styles.monitoringPage__progressBarLabelsEnhanced}>
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
        </div>
      </div>
    </div>
  );
}

// Widget de CO2 avec jauge semi-circulaire
function CO2Widget({ value, updatedAt, isActive = true, seuilMin, seuilMax }: { value: number; updatedAt: string; isActive?: boolean; seuilMin?: number; seuilMax?: number }) {
  const { t } = useTranslation();
  const min = 0;
  const max = 2500;
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'co2');
  
  // S'assurer que la valeur est strictement dans les limites [0, 2500]
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Calcul du pourcentage de progression (0 à 1) - comme la température
  const progress = (clampedValue - min) / (max - min);
  
  // Calculer la couleur basée sur les seuils
  const color = calculateColorFromThresholds(clampedValue, seuilMin, seuilMax, 'co2');
  
  // Générer les stops du gradient
  const gradientStops = generateCO2GradientStops(seuilMin, seuilMax, min, max);
  const gradientId = `co2Gradient-${seuilMin ?? 'default'}-${seuilMax ?? 'default'}`;
  
  // Calculate arc length for dasharray (π * r for semi-circle)
  // Using larger radius for bigger gauge (like temperature)
  const arcRadius = 100; // Same as temperature gauge
  const arcLength = Math.PI * arcRadius; // ~314.16
  
  // Needle rotation: -180° (left) to 0° (right) - 180° total, horizontal
  // For a horizontal arc oriented downward, the needle should point to the exact position on the arc
  const needleAngle = -180 + progress * 180; // Angle on the arc
  
  // Calculate the exact point on the arc (radius 100) where the needle should point
  const needleLength = 85; // Length of the needle (slightly less than radius)

  // Get status based on CO2 level avec seuils
  const getStatus = (co2Level: number) => {
    if (co2Level <= effectiveMin) return { label: t('monitoring.status.good'), color: '#22c55e' };
    if (co2Level <= effectiveMax) {
      const ratio = (co2Level - effectiveMin) / (effectiveMax - effectiveMin);
      if (ratio < 0.33) return { label: t('monitoring.status.moderate'), color: '#84cc16' };
      if (ratio < 0.66) return { label: t('monitoring.status.moderate'), color: '#eab308' };
      return { label: t('monitoring.status.critical'), color: '#f97316' };
    }
    return { label: t('monitoring.status.critical'), color: '#ef4444' };
  };

  const status = getStatus(clampedValue);

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
        <div className={styles.monitoringPage__gaugeWrapper}>
        <svg
          className={styles.monitoringPage__gauge}
            viewBox="-120 -120 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
            {/* Gradient definition for CO2 color variation basé sur les seuils */}
            <defs>
              <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="100" y2="0">
                {gradientStops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity="1" />
                ))}
              </linearGradient>
            </defs>
            
            {/* Background track - 180° horizontal arc from left to right (oriented downward) */}
          <path
              d="M -100 0 A 100 100 0 0 1 100 0"
            fill="none"
              strokeWidth="16"
              stroke="rgba(209, 250, 229, 0.3)"
              strokeLinecap="round"
          />
            
            {/* Colored progress arc with gradient - full arc with gradient, then use dasharray to show progress */}
          <path
              d="M -100 0 A 100 100 0 0 1 100 0"
            fill="none"
              strokeWidth="16"
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeDasharray={`${progress * arcLength} ${arcLength}`}
              strokeDashoffset="0"
          />
            
            {/* Tick marks - 6 marks for 0, 500, 1000, 1500, 2000, 2500 over 180° horizontal (left to right) */}
            {Array.from({ length: 6 }).map((_, i) => {
              const tickValue = min + (i * (max - min)) / 5; // 0, 500, 1000, 1500, 2000, 2500
              // Calculate angle for each tick: 0-2500 maps to -180° (left) to 0° (right) - 180° total, horizontal
              const tickProgress = (tickValue - min) / (max - min);
              const tickAngle = -180 + tickProgress * 180; // -180° (left) to 0° (right)
              const x1 = 85 * Math.cos((tickAngle * Math.PI) / 180);
              const y1 = 85 * Math.sin((tickAngle * Math.PI) / 180);
              const x2 = 100 * Math.cos((tickAngle * Math.PI) / 180);
              const y2 = 100 * Math.sin((tickAngle * Math.PI) / 180);
              
              // Adjust text position based on angle to ensure visibility
              // For the last tick (2500), position it further out and adjust anchor
              const isLastTick = i === 5;
              const textRadius = isLastTick ? 125 : 115; // Further out for 2500
              const tickX = textRadius * Math.cos((tickAngle * Math.PI) / 180);
              const tickY = textRadius * Math.sin((tickAngle * Math.PI) / 180);
              
            return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(16, 185, 129, 0.7)"
                    strokeWidth="2"
                  />
                <text
                    x={tickX}
                    y={tickY}
                    textAnchor={isLastTick ? "end" : "middle"}
                    dominantBaseline="middle"
                  fill="#6b7280"
                    fontSize="10"
                    fontWeight={isLastTick ? "600" : "400"}
                >
                    {Math.round(tickValue)}
                </text>
              </g>
            );
          })}
            
            {/* Needle - points to exact position on arc for current CO2 value */}
          <g 
            className={styles.monitoringPage__needleGroup}
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <line
                x1="0"
                y1="0"
                x2={needleLength}
                y2="0"
                stroke={color}
                strokeWidth="4"
              strokeLinecap="round"
                className={styles.monitoringPage__needle}
            />
          </g>
            
            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#d1fae5"
              stroke={color}
              strokeWidth="3"
            />
        </svg>
          
          {/* Value display */}
          <div className={styles.monitoringPage__gaugeValueDisplay}>
            <span className={styles.monitoringPage__gaugeValueNumber} style={{ color }}>
              {clampedValue.toFixed(0)}
            </span>
            <span className={styles.monitoringPage__gaugeValueUnit}>ppm</span>
        </div>
        </div>
        
        {/* Status display */}
        <div className={styles.monitoringPage__gaugeStatus} style={{ color: status.color }}>
          {status.label}
        </div>
      </div>
    </div>
  );
}

// Widget de luminosité avec effet de glow et rayons de soleil
function LuminosityWidget({ value, updatedAt, isActive = true, seuilMin, seuilMax }: { value: number; updatedAt: string; isActive?: boolean; seuilMin?: number; seuilMax?: number }) {
  const { t } = useTranslation();
  const maxValue = 100000; // Max value for lux
  const { min: effectiveMin, max: effectiveMax } = normalizeThresholds(seuilMin, seuilMax, 'luminosity');
  
  // Calculer si la valeur est dans la plage optimale
  const isInOptimalRange = value >= effectiveMin && value <= effectiveMax;
  
  // Calculer la couleur du glow directement depuis calculateColorFromThresholds pour cohérence
  const glowColorValue = calculateColorFromThresholds(value, seuilMin, seuilMax, 'luminosity');
  
  // Convertir HSL en RGB pour le glow avec opacité
  const hslToRgba = (hsl: string, opacity: number): string => {
    // Extraire les valeurs HSL de la chaîne "hsl(h, s%, l%)"
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return `rgba(107, 114, 128, ${opacity})`;
    
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    if (h < 1/6) { r = c; g = x; b = 0; }
    else if (h < 2/6) { r = x; g = c; b = 0; }
    else if (h < 3/6) { r = 0; g = c; b = x; }
    else if (h < 4/6) { r = 0; g = x; b = c; }
    else if (h < 5/6) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    return `rgba(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)}, ${opacity})`;
  };
  
  // Calculer les zones par rapport aux seuils pour des effets visuels adaptés
  // Utiliser une zone d'avertissement basée sur un pourcentage de la plage optimale
  const optimalRange = effectiveMax - effectiveMin;
  const warningZonePercent = 0.15; // 15% de la plage optimale pour la zone d'avertissement
  const warningZone = optimalRange * warningZonePercent;
  const minWarning = effectiveMin - warningZone;
  const maxWarning = effectiveMax + warningZone;
  
  const isCritical = value < minWarning || value > maxWarning;
  const isWarning = !isInOptimalRange && !isCritical;
  
  // Calculer les valeurs de glow et background basées sur la position relative par rapport aux seuils
  // Le glow est plus intense quand la valeur est dans la plage optimale
  let glowIntensity: number;
  let glowSize: number;
  let sunSize: number;
  let rayIntensity: number;
  let particleCount: number;
  
  if (isInOptimalRange) {
    // Zone optimale : glow intense et rayonnement fort
    // Ratio de 0 à 1 dans la plage optimale
    const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
    glowIntensity = 0.5 + ratio * 0.25; // 0.5 à 0.75 (plus intense)
    glowSize = 25 + ratio * 25; // 25px à 50px
    sunSize = 66 + ratio * 14; // 66px à 80px
    rayIntensity = 0.5 + ratio * 0.3; // 0.5 à 0.8
    particleCount = 14 + Math.floor(ratio * 8); // 14 à 22 particules
  } else if (isWarning) {
    // Zone d'avertissement : glow modéré
    if (value < effectiveMin) {
      // Entre minWarning et effectiveMin
      const ratio = Math.max(0, Math.min(1, (value - minWarning) / (effectiveMin - minWarning)));
      glowIntensity = 0.25 + ratio * 0.25; // 0.25 à 0.5
      glowSize = 12 + ratio * 13; // 12px à 25px
      sunSize = 58 + ratio * 8; // 58px à 66px
      rayIntensity = 0.25 + ratio * 0.25; // 0.25 à 0.5
      particleCount = 8 + Math.floor(ratio * 6); // 8 à 14 particules
    } else {
      // Entre effectiveMax et maxWarning
      const ratio = Math.max(0, Math.min(1, (value - effectiveMax) / (maxWarning - effectiveMax)));
      glowIntensity = 0.5 + ratio * 0.2; // 0.5 à 0.7
      glowSize = 25 + ratio * 20; // 25px à 45px
      sunSize = 66 + ratio * 10; // 66px à 76px
      rayIntensity = 0.5 + ratio * 0.25; // 0.5 à 0.75
      particleCount = 14 + Math.floor(ratio * 6); // 14 à 20 particules
    }
  } else {
    // Zone critique : glow faible ou très intense selon la direction
    if (value < minWarning) {
      // Très en dessous du seuil min
      const minCritical = Math.max(0, effectiveMin - warningZone * 2);
      const ratio = minCritical > 0 ? Math.max(0, Math.min(1, (value - 0) / (minWarning - 0))) : 0.5;
      glowIntensity = 0.1 + ratio * 0.15; // 0.1 à 0.25
      glowSize = 5 + ratio * 7; // 5px à 12px
      sunSize = 50 + ratio * 8; // 50px à 58px
      rayIntensity = 0.1 + ratio * 0.15; // 0.1 à 0.25
      particleCount = Math.floor(ratio * 8); // 0 à 8 particules
    } else {
      // Très au-dessus du seuil max
      const maxCritical = Math.min(maxValue, effectiveMax + warningZone * 2);
      const ratio = maxCritical < maxValue ? Math.max(0, Math.min(1, (value - maxWarning) / (maxCritical - maxWarning))) : 0.5;
      glowIntensity = 0.6 + ratio * 0.15; // 0.6 à 0.75 (très intense)
      glowSize = 35 + ratio * 15; // 35px à 50px
      sunSize = 76 + ratio * 4; // 76px à 80px
      rayIntensity = 0.7 + ratio * 0.1; // 0.7 à 0.8
      particleCount = 18 + Math.floor(ratio * 4); // 18 à 22 particules
    }
  }
  
  const glowOpacity = Math.min(0.85, Math.max(0.1, glowIntensity));
  const glowSizeFinal = Math.max(5, Math.min(60, glowSize));
  
  // Calculer la couleur du glow avec opacité
  const glowColor = hslToRgba(glowColorValue, glowOpacity);
  
  // Background s'adapte à la couleur calculée et à l'état
  // Utiliser la valeur relative par rapport aux seuils, pas la normalisation absolue
  const valueRelativeToOptimal = isInOptimalRange 
    ? (value - effectiveMin) / (effectiveMax - effectiveMin) // 0 à 1 dans la plage optimale
    : value < effectiveMin 
      ? (value - minWarning) / (effectiveMin - minWarning) // 0 à 1 dans la zone d'avertissement basse
      : (value - effectiveMax) / (maxWarning - effectiveMax); // 0 à 1 dans la zone d'avertissement haute
  
  const backgroundBaseOpacity = isInOptimalRange ? 0.5 : isWarning ? 0.4 : 0.3;
  const backgroundOpacity = backgroundBaseOpacity - (Math.abs(valueRelativeToOptimal) * 0.15);
  const backgroundColor = hslToRgba(glowColorValue, Math.max(0.1, Math.min(0.6, backgroundOpacity)));

  // Get text description based on light level (échelle lux standard)
  // < 50 lux : très sombre, 50-200 : sombre, 200-500 : normal, 500-1000 : fort, > 1000 : très lumineux
  // Soleil direct : 10 000 à 100 000 lux
  const getLightDescription = (level: number) => {
    if (level < 50) return t('monitoring.status.dim'); // Très sombre
    if (level < 200) return t('monitoring.status.dim'); // Sombre
    if (level < 500) return t('monitoring.status.normal'); // Normal
    if (level < 1000) return t('monitoring.status.bright'); // Fort
    if (level < 10000) return t('monitoring.status.bright'); // Très lumineux
    return t('monitoring.status.bright'); // Soleil direct (10k-100k lux)
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
      <div 
        className={styles.monitoringPage__luminosityContainer}
        style={{ backgroundColor }}
      >
        {/* Multiple glow layers for depth - taille adaptative selon les seuils */}
        <div
          className={styles.monitoringPage__luminosityGlow}
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 ${glowSizeFinal}px ${glowColor}, 0 0 ${glowSizeFinal * 1.5}px ${glowColor}`,
            background: glowColor,
            width: `${100 + glowSizeFinal * 0.5}px`,
            height: `${100 + glowSizeFinal * 0.5}px`,
          }}
        />
        <div
          className={styles.monitoringPage__luminosityGlowSecondary}
          style={{
            opacity: glowOpacity * 0.4,
            boxShadow: `0 0 ${glowSizeFinal * 2}px ${glowColor}, 0 0 ${glowSizeFinal * 3}px ${glowColor}`,
            background: glowColor,
            width: `${150 + glowSizeFinal * 0.3}px`,
            height: `${150 + glowSizeFinal * 0.3}px`,
          }}
        />
        
        {/* Light particles - nombre adaptatif selon les seuils */}
        {Array.from({ length: particleCount }).map((_, i) => {
          // Calculer l'opacité des particules basée sur la position relative aux seuils
          let particleOpacity: number;
          if (isInOptimalRange) {
            const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
            particleOpacity = 0.5 + ratio * 0.3; // 0.5 à 0.8
          } else if (isWarning) {
            if (value < effectiveMin) {
              const ratio = Math.max(0, Math.min(1, (value - minWarning) / (effectiveMin - minWarning)));
              particleOpacity = 0.3 + ratio * 0.2; // 0.3 à 0.5
            } else {
              const ratio = Math.max(0, Math.min(1, (value - effectiveMax) / (maxWarning - effectiveMax)));
              particleOpacity = 0.5 + ratio * 0.25; // 0.5 à 0.75
            }
          } else {
            if (value < minWarning) {
              const ratio = Math.max(0, Math.min(1, value / minWarning));
              particleOpacity = 0.1 + ratio * 0.2; // 0.1 à 0.3
            } else {
              particleOpacity = 0.6 + (value / maxValue) * 0.2; // 0.6 à 0.8
            }
          }
          
          // Taille du glow des particules basée sur l'intensité
          const particleGlowSize = glowIntensity * 8;
          
          return (
            <div
              key={i}
              className={styles.monitoringPage__luminosityParticle}
              style={{
                left: `${20 + (i * 7) % 60}%`,
                top: `${15 + (i * 11) % 70}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: Math.max(0, Math.min(1, particleOpacity)),
                backgroundColor: glowColorValue,
                boxShadow: `0 0 ${particleGlowSize}px ${glowColorValue}`,
              }}
            />
          );
        })}
        
        <div className={styles.monitoringPage__luminosityContent}>
          {/* Sun icon with animated rays */}
          <div className={styles.monitoringPage__luminosityIconWrapper}>
            <div
              className={styles.monitoringPage__luminosityIconContainer}
              style={{
                filter: `drop-shadow(0 0 ${glowSizeFinal * 0.3}px ${glowColorValue}) drop-shadow(0 0 ${glowSizeFinal * 0.6}px ${glowColorValue})`,
                transform: isInOptimalRange ? 'scale(1.05)' : isWarning ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Icon 
                icon={FaSun} 
                size={sunSize} 
                className={styles.monitoringPage__luminosityIconLarge}
                style={{
                  color: glowColorValue,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
        </div>
            {/* Animated rays - intensité adaptée aux seuils */}
            {Array.from({ length: 8 }).map((_, i) => {
              // Calculer la hauteur des rayons basée sur la position relative aux seuils
              let rayHeight: number;
              if (isInOptimalRange) {
                const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
                rayHeight = 18 + ratio * 17; // 18px à 35px
              } else if (isWarning) {
                if (value < effectiveMin) {
                  const ratio = Math.max(0, Math.min(1, (value - minWarning) / (effectiveMin - minWarning)));
                  rayHeight = 10 + ratio * 8; // 10px à 18px
                } else {
                  const ratio = Math.max(0, Math.min(1, (value - effectiveMax) / (maxWarning - effectiveMax)));
                  rayHeight = 18 + ratio * 12; // 18px à 30px
                }
              } else {
                if (value < minWarning) {
                  rayHeight = 5 + (value / minWarning) * 5; // 5px à 10px
                } else {
                  rayHeight = 30 + ((value - maxWarning) / (maxValue - maxWarning)) * 10; // 30px à 40px
                }
              }
              
              return (
                <div
                  key={i}
                  className={styles.monitoringPage__luminosityRay}
                  style={{
                    height: `${rayHeight}px`,
                    transform: `rotate(${i * 45}deg) translateY(-35px)`,
                    opacity: rayIntensity,
                    animationDelay: `${i * 0.1}s`,
                    background: `linear-gradient(to top, ${glowColorValue}, ${hslToRgba(glowColorValue, 0.3)})`,
                    boxShadow: `0 0 ${rayHeight * 0.3}px ${glowColorValue}`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              );
            })}
            {/* Outer rays - seulement si dans la plage optimale ou au-dessus */}
            {value >= effectiveMin && Array.from({ length: 16 }).map((_, i) => {
              // Calculer la hauteur et l'opacité des rayons extérieurs
              let outerRayHeight: number;
              let outerRayOpacity: number;
              
              if (isInOptimalRange) {
                const ratio = (value - effectiveMin) / (effectiveMax - effectiveMin);
                outerRayHeight = 10 + ratio * 10; // 10px à 20px
                outerRayOpacity = 0.35 + ratio * 0.2; // 0.35 à 0.55
              } else if (value > effectiveMax) {
                const ratio = Math.max(0, Math.min(1, (value - effectiveMax) / (maxWarning - effectiveMax)));
                outerRayHeight = 10 + ratio * 8; // 10px à 18px
                outerRayOpacity = 0.3 + ratio * 0.2; // 0.3 à 0.5
              } else {
                outerRayHeight = 10;
                outerRayOpacity = 0.25;
              }
              
              return (
                <div
                  key={`outer-${i}`}
                  className={styles.monitoringPage__luminosityRayOuter}
                  style={{
                    height: `${outerRayHeight}px`,
                    transform: `rotate(${i * 22.5}deg) translateY(-45px)`,
                    opacity: outerRayOpacity,
                    animationDelay: `${i * 0.05}s`,
                    background: `linear-gradient(to top, ${glowColorValue}, ${hslToRgba(glowColorValue, 0.2)})`,
                    boxShadow: `0 0 ${outerRayHeight * 0.2}px ${glowColorValue}`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              );
            })}
        </div>

          {/* Value display */}
          <div className={styles.monitoringPage__luminosityValueWrapper}>
            <span 
              className={styles.monitoringPage__luminosityValue}
              style={{
                color: glowColorValue,
                textShadow: `0 0 ${glowSizeFinal * 0.2}px ${glowColorValue}, 0 0 ${glowSizeFinal * 0.4}px ${glowColorValue}`,
                transform: isInOptimalRange ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {value.toLocaleString('fr-FR')}
            </span>
            <span 
              className={styles.monitoringPage__luminosityUnit}
              style={{
                color: glowColorValue,
                opacity: 0.8,
              }}
            >
              lux
            </span>
            <div 
              className={styles.monitoringPage__luminosityStatus}
              style={{
                color: glowColorValue,
                textShadow: `0 0 ${glowSizeFinal * 0.1}px ${glowColorValue}`,
                backgroundColor: hslToRgba(glowColorValue, 0.1),
                padding: '4px 12px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              {getLightDescription(value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Widget de niveau d'eau avec réservoir 3D
function WaterLevelWidget({ value, updatedAt, isActive = true, seuilMin, seuilMax }: { value: number; updatedAt: string; isActive?: boolean; seuilMin?: number; seuilMax?: number }) {
  const { t } = useTranslation();
  const effectiveMin = seuilMin ?? DEFAULT_THRESHOLDS.waterLevel.min;
  
  const getStatus = (level: number) => {
    if (level >= effectiveMin) {
      return { label: t('monitoring.status.good'), color: '#10B981' };
    }
    if (level >= effectiveMin - 10) {
      return { label: t('monitoring.status.moderate'), color: '#f59e0b' };
    }
    return { label: t('monitoring.status.low'), color: '#ef4444' };
  };
  
  const status = getStatus(value);
  const clampedValue = Math.max(0, Math.min(100, value));
  
  // Calculer la couleur basée sur les seuils
  const color = calculateColorFromThresholds(clampedValue, seuilMin, seuilMax, 'waterLevel');
  
  // Générer le gradient CSS basé sur les seuils
  const gradientStops = generateWaterLevelGradientStops(seuilMin, 0, 100);
  const cssGradient = `linear-gradient(to top, ${gradientStops.map(stop => `${stop.color} ${stop.offset}`).join(', ')})`;

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
        <div className={styles.monitoringPage__waterTankWrapper}>
          {/* Tank container */}
          <div className={styles.monitoringPage__waterTank}>
            {/* Background gradient covering the entire tank */}
            <div
              className={styles.monitoringPage__waterLevelGradient}
              style={{
                background: cssGradient
              }}
            />
            {/* Water level mask - only shows the filled portion from bottom */}
            <div
              className={styles.monitoringPage__waterLevel}
              style={{
                clipPath: `inset(${100 - clampedValue}% 0 0 0)`
              }}
            >
              {/* Surface water layer with multiple ripples */}
              <div className={styles.monitoringPage__waterLayerSurface}>
                <div className={styles.monitoringPage__waterRipple} />
                <div className={styles.monitoringPage__waterRipple2} />
                <div className={styles.monitoringPage__waterRipple3} />
              </div>
              
              {/* Water bubbles rising */}
              {clampedValue > 10 && Array.from({ length: Math.min(Math.floor(clampedValue / 15), 8) }).map((_, i) => (
                <div
                  key={i}
                  className={styles.monitoringPage__waterBubble}
                  style={{
                    left: `${10 + (i * 23) % 80}%`,
                    bottom: `${5 + (i * 17) % (clampedValue - 10)}%`,
                    animationDelay: `${i * 0.3}s`,
                    width: `${4 + (i % 3)}px`,
                    height: `${4 + (i % 3)}px`,
                  }}
            />
              ))}
              
              {/* Light reflection on water surface */}
              <div className={styles.monitoringPage__waterReflection} />
          </div>
            
            {/* Level markers - Right side */}
            <div className={styles.monitoringPage__waterMarkers}>
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reverse().map((mark) => {
                const isMajor = mark % 20 === 0;
                return (
                  <div key={`right-${mark}`} className={`${styles.monitoringPage__waterMarker} ${isMajor ? styles.monitoringPage__waterMarkerMajor : styles.monitoringPage__waterMarkerMinor}`}>
                    {isMajor && <span className={styles.monitoringPage__waterMarkerLabel}>{mark}%</span>}
                    <div className={`${styles.monitoringPage__waterMarkerLine} ${isMajor ? styles.monitoringPage__waterMarkerLineMajor : styles.monitoringPage__waterMarkerLineMinor}`} />
                  </div>
                );
              })}
            </div>
            
            {/* Level markers - Left side */}
            <div className={`${styles.monitoringPage__waterMarkers} ${styles.monitoringPage__waterMarkersLeft}`}>
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reverse().map((mark) => {
                const isMajor = mark % 20 === 0;
                return (
                  <div key={`left-${mark}`} className={`${styles.monitoringPage__waterMarker} ${isMajor ? styles.monitoringPage__waterMarkerMajor : styles.monitoringPage__waterMarkerMinor}`}>
                    <div className={`${styles.monitoringPage__waterMarkerLine} ${isMajor ? styles.monitoringPage__waterMarkerLineMajor : styles.monitoringPage__waterMarkerLineMinor}`} />
                    {isMajor && <span className={styles.monitoringPage__waterMarkerLabel}>{mark}%</span>}
                  </div>
                );
              })}
            </div>
          </div>
            
          {/* Tank cap with shine effect */}
          <div className={styles.monitoringPage__waterTankCap}>
            <div className={styles.monitoringPage__waterCapShine} />
          </div>
            
          {/* Glass reflection effect */}
          <div className={styles.monitoringPage__waterGlassReflection} />
        </div>
        
        {/* Pipe with water flow indicator */}
        <div className={styles.monitoringPage__waterPipe}>
          {clampedValue > effectiveMin && (
            <div className={styles.monitoringPage__waterFlow} />
          )}
        </div>
        
        {/* Value and status display */}
        <div className={styles.monitoringPage__waterLevelDisplay}>
          <span className={styles.monitoringPage__waterLevelValue}>
            {clampedValue.toFixed(1)}%
          </span>
          <span className={styles.monitoringPage__waterLevelStatus} style={{ color: color }}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}

// Widget de contrôle d'équipement
function EquipmentControlWidget({
  title,
  isOn,
  onToggle,
  disabled,
}: {
  title: string;
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.monitoringPage__equipmentCard}>
      <div className={styles.monitoringPage__equipmentIcon}>
        <Icon icon={FaCheckCircle} size={32} className={isOn ? styles.monitoringPage__equipmentIconActive : styles.monitoringPage__equipmentIconInactive} />
      </div>
      <h3 className={styles.monitoringPage__equipmentTitle}>
        {title}
      </h3>
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plantationId = searchParams.get('plantationId');
  const { refresh: refreshNotifications } = useNotificationContext();
  const user = useAuthStore((s) => s.user);
  const [showGaugeHelp, setShowGaugeHelp] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 0,
    soilHumidity: 0,
    co2: 0,
    luminosity: 0,
    waterLevel: 0,
  });
  // État pour les valeurs animées (pour l'animation de 0 à la valeur réelle)
  const [animatedSensorData, setAnimatedSensorData] = useState<SensorData>({
    temperature: 0,
    soilHumidity: 0,
    co2: 0,
    luminosity: 0,
    waterLevel: 0,
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Animation des valeurs de 0 à la valeur cible (seulement au premier chargement)
  useEffect(() => {
    // Ne pas animer si ce n'est pas le premier chargement
    if (!isFirstLoad) {
      // Pour les mises à jour en temps réel, mettre à jour directement sans animation
      setAnimatedSensorData(sensorData);
      return;
    }
    
    // Vérifier si on doit animer (si les valeurs cibles sont différentes des valeurs animées)
    const shouldAnimate = 
      Math.abs(sensorData.temperature - animatedSensorData.temperature) > 0.1 ||
      Math.abs(sensorData.soilHumidity - animatedSensorData.soilHumidity) > 0.1 ||
      Math.abs(sensorData.co2 - animatedSensorData.co2) > 1 ||
      Math.abs(sensorData.luminosity - animatedSensorData.luminosity) > 10 ||
      Math.abs(sensorData.waterLevel - animatedSensorData.waterLevel) > 0.1;
    
    if (!shouldAnimate) return;
    
    const duration = 1500; // 1.5 secondes
    const startTime = Date.now();
    const startValues = { ...animatedSensorData };
    const targetValues = { ...sensorData };
    let animationFrameId: number;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing cubic-bezier pour une animation fluide
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      setAnimatedSensorData({
        temperature: startValues.temperature + (targetValues.temperature - startValues.temperature) * easedProgress,
        soilHumidity: startValues.soilHumidity + (targetValues.soilHumidity - startValues.soilHumidity) * easedProgress,
        co2: startValues.co2 + (targetValues.co2 - startValues.co2) * easedProgress,
        luminosity: startValues.luminosity + (targetValues.luminosity - startValues.luminosity) * easedProgress,
        waterLevel: startValues.waterLevel + (targetValues.waterLevel - startValues.waterLevel) * easedProgress,
        co2Level: targetValues.co2Level,
      });
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // S'assurer que les valeurs finales sont exactes
        setAnimatedSensorData(targetValues);
        setIsFirstLoad(false); // Marquer que le premier chargement est terminé
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorData, isFirstLoad]);
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
  const [thresholdEdit, setThresholdEdit] = useState<{
    sensorId: string | null;
    type: string | null;
    seuilMin: string;
    seuilMax: string;
    loading: boolean;
    error: string | null;
  }>({
    sensorId: null,
    type: null,
    seuilMin: '',
    seuilMax: '',
    loading: false,
    error: null,
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
        // Pour les actionneurs, 'active' = allumé, 'inactive' = éteint (pas de notion de "hors ligne")
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
  // Initialiser le mode depuis la plantation si disponible, sinon par défaut automatique
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [updatedAt, setUpdatedAt] = useState('17:19:04');
  const { ref: sensorsRef, isVisible: isSensorsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: equipmentRef, isVisible: isEquipmentVisible } = useScrollAnimation({ threshold: 0.1 });

  // Réinitialiser l'animation quand on change de plantation
  useEffect(() => {
    setIsFirstLoad(true);
    setAnimatedSensorData({
      temperature: 0,
      soilHumidity: 0,
      co2: 0,
      luminosity: 0,
      waterLevel: 0,
    });
  }, [plantationId]);

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
        
        // Initialiser le mode depuis la plantation si disponible
        if (plantationData.mode) {
          setIsAutomaticMode(plantationData.mode === 'automatic');
        }
        
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
          // IMPORTANT: Inclure les capteurs inactifs s'ils ont une dernière lecture disponible
          const sensorMap = new Map<string, SensorReading>();
          
          // D'abord, utiliser latestReadings si disponible (format backend)
          // Prendre toutes les lectures disponibles, même pour les capteurs inactifs
          if ((plantationData as any).latestReadings && Array.isArray((plantationData as any).latestReadings)) {
            (plantationData as any).latestReadings.forEach((item: any) => {
              if (item.latestReading && item.sensorType) {
                sensorMap.set(item.sensorType, item.latestReading);
              }
            });
          }
          
          // Sinon, utiliser les lectures des capteurs individuels (actifs ou inactifs s'ils ont une lecture)
          plantationData.sensors.forEach((sensor: Sensor) => {
            // Ne pas filtrer par statut - utiliser la dernière lecture si disponible
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

          // Utiliser les valeurs disponibles même si le capteur est inactif
          // La jauge affichera la dernière valeur captée, qu'elle soit récente ou ancienne
          const newSensorData = {
            temperature: tempReading ? tempReading.value : 0,
            soilHumidity: soilReading ? soilReading.value : 0,
            co2: co2Reading ? co2Reading.value : 0,
            luminosity: lumReading ? lumReading.value : 0,
            waterLevel: waterReading ? waterReading.value : 0,
            co2Level: co2Reading ? co2Reading.value : undefined,
          };
          
          // Debug: afficher les nouvelles valeurs
          if (import.meta.env.DEV) {
            console.log('📊 Nouvelles valeurs capteurs:', newSensorData);
          }
          
          setSensorData(newSensorData);
          
          // Réinitialiser les valeurs animées à 0 pour déclencher l'animation au premier chargement
          setAnimatedSensorData({
            temperature: 0,
            soilHumidity: 0,
            co2: 0,
            luminosity: 0,
            waterLevel: 0,
          });
          setIsFirstLoad(true); // Réinitialiser le flag pour permettre l'animation

          // Déterminer quels capteurs sont disponibles (basé sur leur présence dans sensors, pas seulement sur les lectures)
          // Vérifier si un capteur de chaque type existe dans le tableau sensors
          const hasTemperatureSensor = plantationData.sensors.some((s: Sensor) => s.type === 'temperature');
          const hasSoilMoistureSensor = plantationData.sensors.some((s: Sensor) => s.type === 'soilMoisture');
          const hasCo2LevelSensor = plantationData.sensors.some((s: Sensor) => s.type === 'co2Level');
          const hasLuminositySensor = plantationData.sensors.some((s: Sensor) => s.type === 'luminosity');
          const hasWaterLevelSensor = plantationData.sensors.some((s: Sensor) => s.type === 'waterLevel');

          // Debug: afficher les données détectées
          console.log('📊 Capteurs détectés:', {
            sensors: plantationData.sensors.map((s: Sensor) => ({ 
              id: s.id,
              type: s.type, 
              status: s.status, 
              hasReading: !!sensorMap.get(s.type),
              latestReading: s.latestReading 
            })),
            hasTemperatureSensor,
            hasSoilMoistureSensor,
            hasCo2LevelSensor,
            hasLuminositySensor,
            hasWaterLevelSensor,
            tempReading: tempReading ? { value: tempReading.value, timestamp: tempReading.timestamp } : null,
            soilReading: soilReading ? { value: soilReading.value, timestamp: soilReading.timestamp } : null,
          });

          setAvailableSensors({
            temperature: hasTemperatureSensor,
            soilHumidity: hasSoilMoistureSensor,
            co2: hasCo2LevelSensor,
            luminosity: hasLuminositySensor,
            waterLevel: hasWaterLevelSensor,
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
    // Mapper le type de capteur au type dans l'API
    const typeMap: Record<string, string> = {
      'temperature': 'temperature',
      'soilHumidity': 'soilMoisture',
      'co2': 'co2Level',
      'luminosity': 'luminosity',
      'waterLevel': 'waterLevel',
    };
    const apiType = typeMap[sensorType];
    // Vérifier si au moins un capteur du type spécifié est actif
    return sensors.some(sensor => sensor.type === apiType && sensor.status === 'active');
  };

  const isFarmerOwner = useMemo(() => {
    if (!user) return false;
    const role = (user.role || '').toLowerCase();
    const isOwner = plantation?.ownerId ? plantation.ownerId === user.id : true;
    return role === 'farmer' && isOwner;
  }, [user, plantation?.ownerId]);

  const getSensorLabel = (sensorType: string) => {
    switch (sensorType) {
      case 'temperature':
        return t('monitoring.sensors.temperature');
      case 'soilHumidity':
      case 'soilMoisture':
        return t('monitoring.sensors.soilHumidity');
      case 'co2':
      case 'co2Level':
        return t('monitoring.sensors.co2');
      case 'luminosity':
        return t('monitoring.sensors.luminosity');
      case 'waterLevel':
        return t('monitoring.sensors.waterLevel');
      default:
        return sensorType;
    }
  };

  const handleOpenThresholdEdit = (sensor: Sensor) => {
    if (!isFarmerOwner) return;
    setThresholdEdit({
      sensorId: sensor.id,
      type: sensor.type,
      seuilMin: sensor.seuilMin !== undefined && sensor.seuilMin !== null ? String(sensor.seuilMin) : '',
      seuilMax: sensor.seuilMax !== undefined && sensor.seuilMax !== null ? String(sensor.seuilMax) : '',
      loading: false,
      error: null,
    });
  };

  const handleCloseThresholdEdit = () => {
    setThresholdEdit({
      sensorId: null,
      type: null,
      seuilMin: '',
      seuilMax: '',
      loading: false,
      error: null,
    });
  };

  const handleSubmitThresholdEdit = async () => {
    if (!plantationId || !thresholdEdit.sensorId) return;
    const seuilMin = Number(thresholdEdit.seuilMin);
    const seuilMax = Number(thresholdEdit.seuilMax);

    if (Number.isNaN(seuilMin) || Number.isNaN(seuilMax) || seuilMin < 0 || seuilMax < 0) {
      setThresholdEdit((prev) => ({ ...prev, error: t('monitoring.thresholds.invalidData') }));
      return;
    }
    if (seuilMax <= seuilMin) {
      setThresholdEdit((prev) => ({ ...prev, error: t('monitoring.thresholds.maxMustBeGreater') }));
      return;
    }

    try {
      setThresholdEdit((prev) => ({ ...prev, loading: true, error: null }));
      const updatedSensor = await plantationService.updateSensorThresholds(plantationId, thresholdEdit.sensorId, {
        seuilMin,
        seuilMax,
      });

      setSensors((prev) =>
        prev.map((sensor) =>
          sensor.id === updatedSensor.id ? { ...sensor, seuilMin: updatedSensor.seuilMin, seuilMax: updatedSensor.seuilMax } : sensor
        )
      );
      alert(t('monitoring.thresholds.updateSuccess'));
      handleCloseThresholdEdit();
    } catch (error: any) {
      console.error('❌ Erreur lors de la mise à jour des seuils:', error);
      const status = error?.response?.status;
      let message = t('monitoring.thresholds.updateError');
      if (status === 404) {
        message = t('monitoring.thresholds.notFound');
      } else if (status === 403) {
        message = t('monitoring.thresholds.forbidden');
      } else if (status === 400) {
        message = error?.response?.data?.message || t('monitoring.thresholds.invalidData');
      } else if (status === 401) {
        message = t('monitoring.thresholds.unauthorized');
      }
      setThresholdEdit((prev) => ({ ...prev, error: message, loading: false }));
    }
  };

  // Configuration de la navbar
  const monitoringNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    { label: t('nav.monitoring'), href: '/monitoring' },
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
            // Créer une map des capteurs actifs par type pour vérifier le statut
            // Extraire les dernières lectures de chaque type de capteur
            // IMPORTANT: Inclure les capteurs inactifs s'ils ont une dernière lecture disponible
            const sensorMap = new Map<string, SensorReading>();
            
            // D'abord, utiliser latestReadings si disponible (format backend)
            // Prendre toutes les lectures disponibles, même pour les capteurs inactifs
            if ((plantationData as any).latestReadings && Array.isArray((plantationData as any).latestReadings)) {
              (plantationData as any).latestReadings.forEach((item: any) => {
                if (item.latestReading && item.sensorType) {
                  sensorMap.set(item.sensorType, item.latestReading);
                }
              });
            }
            
            // Sinon, utiliser les lectures des capteurs individuels (actifs ou inactifs s'ils ont une lecture)
            plantationData.sensors.forEach((sensor: Sensor) => {
              // Ne pas filtrer par statut - utiliser la dernière lecture si disponible
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

            // Utiliser les valeurs disponibles même si le capteur est inactif
            // La jauge affichera la dernière valeur captée, qu'elle soit récente ou ancienne
            const newData = {
              temperature: availableSensors.temperature && tempReading ? tempReading.value : 0,
              soilHumidity: availableSensors.soilHumidity && soilReading ? soilReading.value : 0,
              co2: availableSensors.co2 && co2Reading ? co2Reading.value : 0,
              luminosity: availableSensors.luminosity && lumReading ? lumReading.value : 0,
              waterLevel: availableSensors.waterLevel && waterReading ? waterReading.value : 0,
              co2Level: co2Reading ? co2Reading.value : undefined,
            };
      setSensorData(newData);
      // L'animation sera gérée automatiquement par le useEffect
          }
        } catch (error) {
          console.error('Error refreshing sensor data:', error);
        }
      };
      refreshData();
    }, 60000); // Mise à jour toutes les 1 minute

    return () => clearInterval(interval);
  }, [plantationId, plantation?.hasSensors, availableSensors]);

  const handleEquipmentToggle = async (equipment: keyof EquipmentState) => {
    if (!plantationId) {
      console.error('❌ Impossible de mettre à jour l\'actionneur: plantationId manquant');
      return;
    }

    // Trouver l'actionneur correspondant à l'équipement
    let actuator: Actuator | undefined;
    
    actuator = actuators.find(a => {
      const actuatorType = (a.type || '').toLowerCase();
      const actuatorName = (a.name || '').toLowerCase();
      
      if (equipment === 'irrigationPump') {
        return actuatorType === 'pump' || 
               actuatorType.includes('pump') || 
               actuatorType.includes('irrigation') || 
               actuatorName.includes('pompe') ||
               actuatorName.includes('irrigation');
      } else if (equipment === 'fans') {
        return actuatorType === 'fan' || 
               actuatorType.includes('fan') || 
               actuatorName.includes('ventilat');
      } else if (equipment === 'lighting') {
        return actuatorType === 'light' || 
               actuatorType.includes('light') || 
               actuatorName.includes('lumiere') ||
               actuatorName.includes('eclairage');
      }
      return false;
    });

    if (!actuator) {
      console.error(`❌ Actionneur non trouvé pour l'équipement: ${equipment}`);
      return;
    }

    // Déterminer le nouveau statut (inverse du statut actuel)
    const currentStatus = actuator.status === 'active' || actuator.isOn === true;
    const newStatus: 'active' | 'inactive' = currentStatus ? 'inactive' : 'active';

    try {
      // Mettre à jour l'état local immédiatement pour un feedback visuel rapide
      setEquipmentState((prev) => ({
        ...prev,
        [equipment]: !prev[equipment],
      }));

      // Appeler l'API pour mettre à jour l'actionneur dans le backend
      // Cela déclenchera la création d'un événement et l'envoi de notifications
      const updatedActuator = await plantationService.updateActuator(
        plantationId,
        actuator.id,
        newStatus
      );

      // Mettre à jour la liste des actionneurs avec la réponse du backend
      setActuators((prev) =>
        prev.map((a) => (a.id === actuator!.id ? updatedActuator : a))
      );

      console.log(`✅ Actionneur ${actuator.name} mis à jour: ${newStatus}`);
      
      // Rafraîchir les notifications pour afficher la nouvelle notification générée
      // Attendre un peu pour laisser le temps au backend de créer l'événement et les notifications
      setTimeout(async () => {
        try {
          await refreshNotifications();
          
          // Vérifier si des notifications email ont été créées
          if (import.meta.env.DEV) {
            const { notificationService } = await import('@/services/notificationService');
            const allNotifications = await notificationService.getAll();
            const emailNotifications = allNotifications.filter((n: Notification) => n.canal === 'email');
            const recentEmailNotifs = emailNotifications.filter(
              (n: Notification) => new Date(n.dateEnvoi).getTime() > Date.now() - 5000 // Dernières 5 secondes
            );
            
            if (recentEmailNotifs.length > 0) {
              console.log(`📧 ${recentEmailNotifs.length} notification(s) email créée(s):`, recentEmailNotifs);
              recentEmailNotifs.forEach((notif: Notification) => {
                console.log(`   - Statut: ${notif.statut}, Type: ${notif.event?.type}`);
              });
            } else {
              console.warn('⚠️ Aucune notification email créée après l\'activation de l\'actionneur');
              console.log('   → Vérifiez que:');
              console.log('     1. Vous avez une adresse email dans votre profil');
              console.log('     2. Le backend crée bien des notifications email');
              console.log('     3. La configuration SMTP est correcte côté backend');
              console.log('   → Utilisez diagnoseEmailNotifications() dans la console pour plus de détails');
            }
          }
        } catch (refreshError) {
          // Ne pas bloquer l'utilisateur si le rafraîchissement échoue
          if (import.meta.env.DEV) {
            console.warn('⚠️ Erreur lors du rafraîchissement des notifications:', refreshError);
          }
        }
      }, 2000); // Attendre 2 secondes pour laisser le temps au backend
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour de l'actionneur ${actuator.name}:`, error);
      
      // Revenir à l'état précédent en cas d'erreur
      setEquipmentState((prev) => ({
        ...prev,
        [equipment]: !prev[equipment],
      }));

      // Optionnel: afficher un message d'erreur à l'utilisateur
      alert(t('monitoring.equipment.updateError') || `Erreur lors de la mise à jour de ${equipment}`);
    }
  };

  const handleModeChange = async (newMode: boolean) => {
    if (!plantationId) {
      console.error('❌ Impossible de mettre à jour le mode: plantationId manquant');
      return;
    }

    // Le backend attend 'automatic' ou 'manual' (minuscules) comme stockées en base de données
    const mode: 'automatic' | 'manual' = newMode ? 'automatic' : 'manual';
    const previousMode = isAutomaticMode;

    try {
      // Mettre à jour l'état local immédiatement pour un feedback visuel rapide
      setIsAutomaticMode(newMode);

      // Appeler l'API pour mettre à jour le mode dans le backend
      // Cela déclenchera la création d'un événement et l'envoi de notifications
      const updatedPlantation = await plantationService.updateControlMode(plantationId, mode);

      console.log(`✅ Mode de contrôle mis à jour: ${mode}`);
      
      // Mettre à jour l'état local avec la plantation mise à jour
      if (updatedPlantation.mode) {
        setIsAutomaticMode(updatedPlantation.mode === 'automatic');
      }
      
      // Rafraîchir les notifications pour afficher la nouvelle notification générée
      // Attendre un peu pour laisser le temps au backend de créer l'événement et les notifications
      setTimeout(async () => {
        try {
          await refreshNotifications();
        } catch (refreshError) {
          // Ne pas bloquer l'utilisateur si le rafraîchissement échoue
          if (import.meta.env.DEV) {
            console.warn('⚠️ Erreur lors du rafraîchissement des notifications:', refreshError);
          }
        }
      }, 1000); // Attendre 1 seconde pour laisser le temps au backend
    } catch (error) {
      console.error(`❌ Erreur lors de la mise à jour du mode de contrôle:`, error);
      
      // Revenir à l'état précédent en cas d'erreur
      setIsAutomaticMode(previousMode);

      // Afficher un message d'erreur à l'utilisateur
      alert(t('monitoring.mode.updateError') || `Erreur lors de la mise à jour du mode. Veuillez réessayer.`);
    }
  };

  return (
    <>
      <Background3D />
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
            <div className={styles.monitoringPage__sectionTitleContainer}>
            <h2 className={styles.monitoringPage__sectionTitle}>
              {t('monitoring.sensors.title')}
            </h2>
              <button
                className={styles.monitoringPage__helpButton}
                onClick={() => setShowGaugeHelp(true)}
                aria-label={t('monitoring.help.title')}
                title={t('monitoring.help.title')}
              >
                <Icon icon={FaInfoCircle} size={20} />
              </button>
            </div>
            <div
              ref={sensorsRef as React.RefObject<HTMLDivElement>}
              className={`${styles.monitoringPage__sensorsGrid} ${
                isSensorsVisible ? styles.monitoringPage__sensorsGridVisible : ''
              }`}
            >
              {availableSensors.temperature && (() => {
                const sensor = sensors.find(s => s.type === 'temperature');
                return (
                  <TemperatureWidget 
                    key={`temp-${sensorData.temperature}-${updatedAt}`}
                    value={animatedSensorData.temperature} 
                    updatedAt={updatedAt} 
                    isActive={getSensorStatus('temperature')}
                    seuilMin={sensor?.seuilMin}
                    seuilMax={sensor?.seuilMax}
                  />
                );
              })()}
              {availableSensors.soilHumidity && (() => {
                const sensor = sensors.find(s => s.type === 'soilMoisture');
                return (
                  <SoilHumidityWidget 
                    key={`soil-${sensorData.soilHumidity}-${updatedAt}`}
                    value={animatedSensorData.soilHumidity} 
                    updatedAt={updatedAt} 
                    isActive={getSensorStatus('soilHumidity')}
                    seuilMin={sensor?.seuilMin}
                    seuilMax={sensor?.seuilMax}
                  />
                );
              })()}
              {availableSensors.co2 && (() => {
                const sensor = sensors.find(s => s.type === 'co2Level');
                return (
                  <CO2Widget 
                    key={`co2-${sensorData.co2}-${updatedAt}`}
                    value={animatedSensorData.co2}
                    updatedAt={updatedAt} 
                    isActive={getSensorStatus('co2')}
                    seuilMin={sensor?.seuilMin}
                    seuilMax={sensor?.seuilMax}
                  />
                );
              })()}
              {availableSensors.luminosity && (() => {
                const sensor = sensors.find(s => s.type === 'luminosity');
                return (
                  <LuminosityWidget 
                    value={animatedSensorData.luminosity} 
                    updatedAt={updatedAt} 
                    isActive={getSensorStatus('luminosity')}
                    seuilMin={sensor?.seuilMin}
                    seuilMax={sensor?.seuilMax}
                  />
                );
              })()}
              {availableSensors.waterLevel && (() => {
                const sensor = sensors.find(s => s.type === 'waterLevel');
                return (
                  <WaterLevelWidget 
                    value={animatedSensorData.waterLevel} 
                    updatedAt={updatedAt} 
                    isActive={getSensorStatus('waterLevel')}
                    seuilMin={sensor?.seuilMin}
                    seuilMax={sensor?.seuilMax}
                  />
                );
              })()}
              {plantationId && 
               (!plantation?.hasSensors || 
                (!availableSensors.temperature && 
                 !availableSensors.soilHumidity && 
                 !availableSensors.co2 && 
                 !availableSensors.luminosity && 
                 !availableSensors.waterLevel)) && (
                <div className={styles.monitoringPage__noSensors}>
                  <p>{t('monitoring.noSensors')}</p>
                </div>
              )}
            </div>
          {/* Alerte pour les capteurs inactifs */}
          {sensors.length > 0 && sensors.some(s => s.status === 'inactive') && (
            <div className={styles.monitoringPage__inactiveAlert}>
              <Icon icon={FaTimesCircle} size={20} style={{ color: '#ef4444' }} />
              <div>
                <strong>{t('monitoring.inactiveSensors.title') || 'Capteurs inactifs détectés'}</strong>
                <p>
                  {sensors.filter(s => s.status === 'inactive').length} {t('monitoring.inactiveSensors.message') || 'capteur(s) n\'ont pas envoyé de données depuis plus d\'1 heure'}
                </p>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {sensors.filter(s => s.status === 'inactive').map(sensor => (
                    <li key={sensor.id}>
                      {sensor.type} - {sensor.latestReading?.timestamp 
                        ? getTimeSinceLastReading(sensor.latestReading.timestamp)
                        : 'Jamais de lecture'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {isFarmerOwner && sensors.length > 0 && (
            <div className={styles.monitoringPage__thresholdsCard}>
              <div className={styles.monitoringPage__thresholdsHeader}>
                <h3 className={styles.monitoringPage__thresholdsTitle}>{t('monitoring.thresholds.title')}</h3>
                <p className={styles.monitoringPage__thresholdsSubtitle}>{t('monitoring.thresholds.subtitle')}</p>
              </div>
              <div className={styles.monitoringPage__thresholdsList}>
                {sensors.map((sensor) => (
                  <div 
                    key={sensor.id} 
                    className={`${styles.monitoringPage__thresholdItem} ${
                      thresholdEdit.sensorId === sensor.id ? styles.monitoringPage__thresholdItemEditing : ''
                    }`}
                  >
                    <div className={styles.monitoringPage__thresholdInfo}>
                      <div className={styles.monitoringPage__thresholdLabel}>
                        <Icon icon={FaThermometerHalf} size={16} />
                        {getSensorLabel(sensor.type)}
                        <div 
                          className={styles.monitoringPage__thresholdStatus}
                          style={{ 
                            color: getSensorStatusColor(sensor.status),
                            marginLeft: '8px'
                          }}
                        >
                          {sensor.status === 'active' ? (
                            <Icon icon={FaCheckCircle} size={12} />
                          ) : (
                            <Icon icon={FaTimesCircle} size={12} />
                          )}
                        </div>
                      </div>
                      <div className={styles.monitoringPage__thresholdValues}>
                        <span>{t('monitoring.thresholds.min')}: <strong>{sensor.seuilMin ?? '—'}</strong></span>
                        <span>{t('monitoring.thresholds.max')}: <strong>{sensor.seuilMax ?? '—'}</strong></span>
                        {sensor.latestReading?.timestamp && (
                          <span style={{ fontSize: '0.85em', opacity: 0.7, marginLeft: '8px' }}>
                            {getTimeSinceLastReading(sensor.latestReading.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                    {thresholdEdit.sensorId === sensor.id ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCloseThresholdEdit}
                        disabled={thresholdEdit.loading}
                      >
                        <FaTimes /> {t('monitoring.thresholds.cancel')}
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenThresholdEdit(sensor)}
                      >
                        <FaEdit /> {t('monitoring.thresholds.edit')}
                      </Button>
                    )}
                    {thresholdEdit.sensorId === sensor.id && (
                      <div className={styles.monitoringPage__thresholdForm}>
                        <div className={styles.monitoringPage__thresholdFormHeader}>
                          <h4 className={styles.monitoringPage__thresholdFormTitle}>
                            {t('monitoring.thresholds.editingFor')} {getSensorLabel(sensor.type)}
                          </h4>
                          <p className={styles.monitoringPage__thresholdFormSubtitle}>
                            {t('monitoring.thresholds.editingSubtitle')}
                          </p>
                        </div>
                        <div className={styles.monitoringPage__thresholdInputs}>
                          <label>
                            <span className={styles.monitoringPage__thresholdInputLabel}>
                              {t('monitoring.thresholds.min')}
                            </span>
                            <input
                              type="number"
                              min={0}
                              step="0.1"
                              value={thresholdEdit.seuilMin}
                              onChange={(e) => setThresholdEdit((prev) => ({ ...prev, seuilMin: e.target.value }))}
                              placeholder={sensor.seuilMin !== undefined && sensor.seuilMin !== null ? String(sensor.seuilMin) : '0.0'}
                            />
                          </label>
                          <label>
                            <span className={styles.monitoringPage__thresholdInputLabel}>
                              {t('monitoring.thresholds.max')}
                            </span>
                            <input
                              type="number"
                              min={0}
                              step="0.1"
                              value={thresholdEdit.seuilMax}
                              onChange={(e) => setThresholdEdit((prev) => ({ ...prev, seuilMax: e.target.value }))}
                              placeholder={sensor.seuilMax !== undefined && sensor.seuilMax !== null ? String(sensor.seuilMax) : '0.0'}
                            />
                          </label>
                        </div>
                        {thresholdEdit.error && (
                          <div className={styles.monitoringPage__thresholdError}>
                            <FaTimesCircle /> {thresholdEdit.error}
                          </div>
                        )}
                        <div className={styles.monitoringPage__thresholdActions}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSubmitThresholdEdit}
                            disabled={thresholdEdit.loading}
                          >
                            {thresholdEdit.loading ? t('monitoring.thresholds.saving') : t('monitoring.thresholds.save')}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCloseThresholdEdit}
                            disabled={thresholdEdit.loading}
                          >
                            {t('monitoring.thresholds.cancel')}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
                  onClick={() => handleModeChange(true)}
                >
                  <Icon icon={FaRobot} size={18} />
                  <span>{t('monitoring.mode.automatic')}</span>
                </button>
                <button
                  className={`${styles.monitoringPage__modeButton} ${
                    !isAutomaticMode ? styles.monitoringPage__modeButtonActive : ''
                  }`}
                  onClick={() => handleModeChange(false)}
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
                isOn={equipmentState.irrigationPump}
                onToggle={() => handleEquipmentToggle('irrigationPump')}
                disabled={isAutomaticMode}
              />
                      )}
                      {fanActuator && (
              <EquipmentControlWidget
                title={t('monitoring.equipment.fans')}
                isOn={equipmentState.fans}
                onToggle={() => handleEquipmentToggle('fans')}
                disabled={isAutomaticMode}
              />
                      )}
                      {lightActuator && (
              <EquipmentControlWidget
                title={t('monitoring.equipment.lighting')}
                isOn={equipmentState.lighting}
                onToggle={() => handleEquipmentToggle('lighting')}
                disabled={isAutomaticMode}
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
      <GaugeHelpModal
        isOpen={showGaugeHelp}
        onClose={() => setShowGaugeHelp(false)}
      />
    </>
  );
}

// Composant modal d'aide pour expliquer les couleurs des jauges
function GaugeHelpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('monitoring.help.title')}
      size="lg"
    >
      <div className={styles.monitoringPage__gaugeHelpContent}>
        <p className={styles.monitoringPage__gaugeHelpIntro}>
          {t('monitoring.help.intro')}
        </p>

        {/* Légende des zones */}
        <div className={styles.monitoringPage__gaugeHelpZones}>
          <h3 className={styles.monitoringPage__gaugeHelpZonesTitle}>
            Zones de couleur
          </h3>
          <div className={styles.monitoringPage__gaugeHelpZonesList}>
            <div className={styles.monitoringPage__colorZoneContainer}>
              <div className={`${styles.monitoringPage__colorZone} ${styles['monitoringPage__colorZone--optimal']}`} />
              <span>{t('monitoring.help.zones.optimal')}</span>
            </div>
            <div className={styles.monitoringPage__colorZoneContainer}>
              <div className={`${styles.monitoringPage__colorZone} ${styles['monitoringPage__colorZone--warning']}`} />
              <span>{t('monitoring.help.zones.warning')}</span>
            </div>
            <div className={styles.monitoringPage__colorZoneContainer}>
              <div className={`${styles.monitoringPage__colorZone} ${styles['monitoringPage__colorZone--danger']}`} />
              <span>{t('monitoring.help.zones.danger')}</span>
            </div>
          </div>
        </div>

        {/* Sections par type de jauge */}
        <div className={styles.monitoringPage__gaugeHelpSections}>
          <div className={styles.monitoringPage__gaugeHelpSection}>
            <h3 className={styles.monitoringPage__gaugeHelpSectionTitle}>
              {t('monitoring.help.temperature.title')}
            </h3>
            <p className={styles.monitoringPage__gaugeHelpSectionDescription}>
              {t('monitoring.help.temperature.description')}
            </p>
          </div>

          <div className={styles.monitoringPage__gaugeHelpSection}>
            <h3 className={styles.monitoringPage__gaugeHelpSectionTitle}>
              {t('monitoring.help.soilHumidity.title')}
            </h3>
            <p className={styles.monitoringPage__gaugeHelpSectionDescription}>
              {t('monitoring.help.soilHumidity.description')}
            </p>
          </div>

          <div className={styles.monitoringPage__gaugeHelpSection}>
            <h3 className={styles.monitoringPage__gaugeHelpSectionTitle}>
              {t('monitoring.help.co2.title')}
            </h3>
            <p className={styles.monitoringPage__gaugeHelpSectionDescription}>
              {t('monitoring.help.co2.description')}
            </p>
          </div>

          <div className={styles.monitoringPage__gaugeHelpSection}>
            <h3 className={styles.monitoringPage__gaugeHelpSectionTitle}>
              {t('monitoring.help.luminosity.title')}
            </h3>
            <p className={styles.monitoringPage__gaugeHelpSectionDescription}>
              {t('monitoring.help.luminosity.description')}
            </p>
          </div>

          <div className={styles.monitoringPage__gaugeHelpSection}>
            <h3 className={styles.monitoringPage__gaugeHelpSectionTitle}>
              {t('monitoring.help.waterLevel.title')}
            </h3>
            <p className={styles.monitoringPage__gaugeHelpSectionDescription}>
              {t('monitoring.help.waterLevel.description')}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

