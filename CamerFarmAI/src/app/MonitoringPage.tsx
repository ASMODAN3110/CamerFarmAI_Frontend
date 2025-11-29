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
  const min = 0;
  const max = 50;
  
  // S'assurer que la valeur est dans les limites
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Calculate progress (0 to 1)
  const progress = (clampedValue - min) / (max - min);
  
  // Calculate arc length for dasharray (π * r for semi-circle)
  // Using larger radius for bigger gauge (like CO2)
  const arcRadius = 100; // Increased from 80 to 100 for larger gauge
  const arcLength = Math.PI * arcRadius; // ~314.16
  
  // Needle rotation: -180° (left) to 0° (right) - 180° total, horizontal
  // For a horizontal arc oriented downward, the needle should point to the exact position on the arc
  const needleAngle = -180 + progress * 180; // Angle on the arc
  const needleAngleRad = (needleAngle * Math.PI) / 180;
  
  // Calculate the exact point on the arc (radius 100) where the needle should point
  const needleLength = 85; // Length of the needle (slightly less than radius)
  const needleEndX = arcRadius * Math.cos(needleAngleRad);
  const needleEndY = arcRadius * Math.sin(needleAngleRad);
  
  // Scale the needle to be slightly shorter than the arc radius
  const scaledNeedleX = (needleLength / arcRadius) * needleEndX;
  const scaledNeedleY = (needleLength / arcRadius) * needleEndY;

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
            {/* Gradient definition for temperature color variation: green (0°C) -> yellow (25°C) -> red (50°C) */}
            <defs>
              <linearGradient id="temperatureGradient" gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="hsl(120, 80%, 60%)" stopOpacity="1" /> {/* Green at 0°C */}
                <stop offset="50%" stopColor="hsl(60, 90%, 55%)" stopOpacity="1" /> {/* Yellow at 25°C */}
                <stop offset="100%" stopColor="hsl(0, 90%, 55%)" stopOpacity="1" /> {/* Red at 50°C */}
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
              stroke="url(#temperatureGradient)"
              strokeLinecap="round"
              strokeDasharray={`${progress * arcLength} ${arcLength}`}
              strokeDashoffset="0"
            />
            {/* Tick marks - 6 marks for 0, 10, 20, 30, 40, 50 over 180° horizontal (left to right) */}
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
            <line
              x1="0"
              y1="0"
              x2={scaledNeedleX}
              y2={scaledNeedleY}
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              className={styles.monitoringPage__needle}
            />
            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="3"
            />
          </svg>
          {/* Value display */}
          <div className={styles.monitoringPage__gaugeValueDisplay}>
            <span className={styles.monitoringPage__gaugeValueNumber}>
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
function SoilHumidityWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  
  // Determine status based on humidity level (inspired by reference component)
  const getStatus = () => {
    if (value < 30) return { text: t('monitoring.status.low'), color: '#eab308', bgColor: '#eab308' };
    if (value < 60) return { text: t('monitoring.status.optimal'), color: '#22c55e', bgColor: '#22c55e' };
    return { text: t('monitoring.status.high'), color: '#3b82f6', bgColor: '#3b82f6' };
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
        {/* Value and status badge */}
        <div className={styles.monitoringPage__humidityHeader}>
          <span className={styles.monitoringPage__humidityValueLarge}>
            <span>{Math.round(value)}</span>
            <span className={styles.monitoringPage__humidityValueUnit}>%</span>
          </span>
          <div
            className={styles.monitoringPage__humidityStatusBadge}
            style={{ backgroundColor: status.bgColor }}
          >
            {status.text}
          </div>
        </div>
        
        {/* Progress bar with water drops pattern */}
        <div className={styles.monitoringPage__progressBarEnhanced}>
          {/* Gradient definition for humidity color variation: green (0%) -> yellow (50%) -> red (100%) */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(0, 90%, 55%)" stopOpacity="1" /> {/* Red at 0% (dry) */}
                <stop offset="50%" stopColor="hsl(60, 90%, 55%)" stopOpacity="1" /> {/* Yellow at 50% */}
                <stop offset="100%" stopColor="hsl(120, 80%, 60%)" stopOpacity="1" /> {/* Green at 100% (wet) */}
              </linearGradient>
            </defs>
          </svg>
          
          {/* Water drops background pattern */}
          <div className={styles.monitoringPage__waterDropsPattern}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Icon key={i} icon={FaTint} size={12} className={styles.monitoringPage__waterDropIcon} />
            ))}
          </div>
          
          {/* Progress bar track */}
          <div className={styles.monitoringPage__progressBarTrackEnhanced}>
            {/* Progress bar fill with gradient */}
            <div
              className={styles.monitoringPage__progressBarFillEnhanced}
              style={{ 
                width: `${value}%`,
                background: 'linear-gradient(to right, hsl(0, 90%, 55%), hsl(60, 90%, 55%), hsl(120, 80%, 60%))'
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
function CO2Widget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const min = 0;
  const max = 2500;
  
  // CO2 levels thresholds (in ppm) - inspired by reference component
  const thresholds = {
    good: 800,
    moderate: 1200,
    poor: 1500,
    dangerous: 2000,
  };
  
  // S'assurer que la valeur est strictement dans les limites [0, 2500]
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Calcul du pourcentage de progression (0 à 1) - comme la température
  const progress = (clampedValue - min) / (max - min);
  
  // Calculate arc length for dasharray (π * r for semi-circle)
  // Using larger radius for bigger gauge (like temperature)
  const arcRadius = 100; // Same as temperature gauge
  const arcLength = Math.PI * arcRadius; // ~314.16
  
  // Needle rotation: -180° (left) to 0° (right) - 180° total, horizontal
  // For a horizontal arc oriented downward, the needle should point to the exact position on the arc
  const needleAngle = -180 + progress * 180; // Angle on the arc
  const needleAngleRad = (needleAngle * Math.PI) / 180;
  
  // Calculate the exact point on the arc (radius 100) where the needle should point
  const needleLength = 85; // Length of the needle (slightly less than radius)
  const needleEndX = arcRadius * Math.cos(needleAngleRad);
  const needleEndY = arcRadius * Math.sin(needleAngleRad);
  
  // Scale the needle to be slightly shorter than the arc radius
  const scaledNeedleX = (needleLength / arcRadius) * needleEndX;
  const scaledNeedleY = (needleLength / arcRadius) * needleEndY;

  // Color based on CO2 level
  const getColor = (co2Level: number) => {
    if (co2Level <= thresholds.good) return '#22c55e'; // Green
    if (co2Level <= thresholds.moderate) return '#84cc16'; // Lime
    if (co2Level <= thresholds.poor) return '#eab308'; // Yellow
    if (co2Level <= thresholds.dangerous) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  // Get status based on CO2 level
  const getStatus = (co2Level: number) => {
    if (co2Level <= thresholds.good) return { label: t('monitoring.status.good'), color: '#22c55e' };
    if (co2Level <= thresholds.moderate) return { label: t('monitoring.status.moderate'), color: '#84cc16' };
    if (co2Level <= thresholds.poor) return { label: t('monitoring.status.moderate'), color: '#eab308' };
    if (co2Level <= thresholds.dangerous) return { label: t('monitoring.status.critical'), color: '#f97316' };
    return { label: t('monitoring.status.critical'), color: '#ef4444' };
  };

  const color = getColor(clampedValue);
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
            {/* Gradient definition for CO2 color variation: green -> lime -> yellow -> orange -> red */}
            <defs>
              <linearGradient id="co2Gradient" gradientUnits="userSpaceOnUse" x1="-100" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="1" /> {/* Green at 0 ppm */}
                <stop offset="30%" stopColor="#84cc16" stopOpacity="1" /> {/* Lime */}
                <stop offset="50%" stopColor="#eab308" stopOpacity="1" /> {/* Yellow */}
                <stop offset="70%" stopColor="#f97316" stopOpacity="1" /> {/* Orange */}
                <stop offset="100%" stopColor="#ef4444" stopOpacity="1" /> {/* Red at 2500 ppm */}
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
              stroke="url(#co2Gradient)"
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
            <line
              x1="0"
              y1="0"
              x2={scaledNeedleX}
              y2={scaledNeedleY}
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              className={styles.monitoringPage__needle}
            />
            
            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="3"
            />
          </svg>
          
          {/* Value display */}
          <div className={styles.monitoringPage__gaugeValueDisplay}>
            <span className={styles.monitoringPage__gaugeValueNumber} style={{ color }}>
              {Math.round(clampedValue)}
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
function LuminosityWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  const maxValue = 100000; // Max value for lux
  
  // Normalize value (0-100%)
  const normalizedValue = (value / maxValue) * 100;
  
  // Static values for glow and background based on normalized value
  const glowOpacity = normalizedValue < 50 ? 0.1 + (normalizedValue / 50) * 0.2 : 0.3 + ((normalizedValue - 50) / 50) * 0.2;
  const glowSize = normalizedValue < 50 ? (normalizedValue / 50) * 20 : 20 + ((normalizedValue - 50) / 50) * 20;
  const glowColor = normalizedValue < 50 
    ? `rgba(16, 185, 129, ${0.3 + (normalizedValue / 50) * 0.3})` 
    : `rgba(16, 185, 129, ${0.6 + ((normalizedValue - 50) / 50) * 0.3})`;
  const backgroundOpacity = 0.8 - (normalizedValue / 100) * 0.4;
  const backgroundColor = `rgba(209, 250, 229, ${backgroundOpacity})`; // Green-tinted light background

  // Get text description based on light level
  const getLightDescription = (level: number) => {
    const normalized = (level / maxValue) * 100;
    if (normalized < 20) return t('monitoring.status.dim');
    if (normalized < 40) return t('monitoring.status.dim');
    if (normalized < 60) return t('monitoring.status.normal');
    if (normalized < 80) return t('monitoring.status.bright');
    return t('monitoring.status.bright');
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
        {/* Multiple glow layers for depth */}
        <div
          className={styles.monitoringPage__luminosityGlow}
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 ${glowSize}px ${glowColor}`,
            background: glowColor,
          }}
        />
        <div
          className={styles.monitoringPage__luminosityGlowSecondary}
          style={{
            opacity: glowOpacity * 0.5,
            boxShadow: `0 0 ${glowSize * 1.5}px ${glowColor}`,
            background: glowColor,
          }}
        />
        
        {/* Light particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={styles.monitoringPage__luminosityParticle}
            style={{
              left: `${20 + (i * 7) % 60}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: normalizedValue > 30 ? 0.3 + (normalizedValue / 100) * 0.4 : 0,
            }}
          />
        ))}
        
        <div className={styles.monitoringPage__luminosityContent}>
          {/* Sun icon with animated rays */}
          <div className={styles.monitoringPage__luminosityIconWrapper}>
            <div
              className={styles.monitoringPage__luminosityIconContainer}
              style={{
                filter: `drop-shadow(0 0 ${8 + (normalizedValue / 100) * 12}px ${glowColor})`,
              }}
            >
              <Icon 
                icon={FaSun} 
                size={64} 
                className={styles.monitoringPage__luminosityIconLarge}
              />
            </div>
            {/* Animated rays */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={styles.monitoringPage__luminosityRay}
                style={{
                  height: `${15 + (normalizedValue / 100) * 15}px`,
                  transform: `rotate(${i * 45}deg) translateY(-35px)`,
                  opacity: 0.2 + (normalizedValue / 100) * 0.5,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
            {/* Outer rays for high luminosity */}
            {normalizedValue > 60 && Array.from({ length: 16 }).map((_, i) => (
              <div
                key={`outer-${i}`}
                className={styles.monitoringPage__luminosityRayOuter}
                style={{
                  height: `${8 + ((normalizedValue - 60) / 40) * 8}px`,
                  transform: `rotate(${i * 22.5}deg) translateY(-45px)`,
                  opacity: ((normalizedValue - 60) / 40) * 0.3,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Value display */}
          <div className={styles.monitoringPage__luminosityValueWrapper}>
            <span 
              className={styles.monitoringPage__luminosityValue}
              style={{
                textShadow: `0 0 ${8 + (normalizedValue / 100) * 12}px ${glowColor}`,
              }}
            >
              {value.toLocaleString('fr-FR')}
            </span>
            <span className={styles.monitoringPage__luminosityUnit}>lux</span>
            <div 
              className={styles.monitoringPage__luminosityStatus}
              style={{
                color: normalizedValue > 60 ? '#047857' : normalizedValue > 30 ? '#059669' : '#6b7280',
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
function WaterLevelWidget({ value, updatedAt, isActive = true }: { value: number; updatedAt: string; isActive?: boolean }) {
  const { t } = useTranslation();
  
  const getStatus = (level: number) => {
    if (level < 20) return { label: t('monitoring.status.low'), color: '#ef4444' };
    if (level < 40) return { label: t('monitoring.status.moderate'), color: '#f59e0b' };
    return { label: t('monitoring.status.good'), color: '#10B981' };
  };
  
  const status = getStatus(value);
  const clampedValue = Math.max(0, Math.min(100, value));

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
            {/* Water level with gradient: red (0%) -> yellow (50%) -> green (100%) */}
            <div
              className={styles.monitoringPage__waterLevel}
              style={{ 
                height: `${clampedValue}%`,
                background: 'linear-gradient(to top, hsl(0, 90%, 55%), hsl(60, 90%, 55%), hsl(120, 80%, 60%))'
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
            
            {/* Level markers */}
            <div className={styles.monitoringPage__waterMarkers}>
              {[0, 20, 40, 60, 80, 100].reverse().map((mark) => (
                <div key={mark} className={styles.monitoringPage__waterMarker}>
                  <span className={styles.monitoringPage__waterMarkerLabel}>{mark}%</span>
                  <div className={styles.monitoringPage__waterMarkerLine} />
                </div>
              ))}
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
            {clampedValue > 20 && (
              <div className={styles.monitoringPage__waterFlow} />
            )}
          </div>
        </div>
        
        {/* Value and status display */}
        <div className={styles.monitoringPage__waterLevelDisplay}>
          <span className={styles.monitoringPage__waterLevelValue}>
            {Math.round(clampedValue)}%
          </span>
          <span className={styles.monitoringPage__waterLevelStatus} style={{ color: status.color }}>
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

          const newSensorData = {
            temperature: tempReading?.value ?? 25.1,
            soilHumidity: soilReading?.value ?? 58,
            co2: co2Reading?.value ?? 531,
            luminosity: lumReading?.value ?? 70290,
            waterLevel: waterReading?.value ?? 79,
            co2Level: co2Reading?.value,
          };
          
          // Debug: afficher les nouvelles valeurs
          if (import.meta.env.DEV) {
            console.log('📊 Nouvelles valeurs capteurs:', newSensorData);
          }
          
          setSensorData(newSensorData);

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
    // Vérifier si au moins un capteur est actif
    return sensors.some(sensor => sensor.status === 'active');
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
                  key={`temp-${sensorData.temperature}-${updatedAt}`}
                  value={sensorData.temperature} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('temperature')}
                />
              )}
              {availableSensors.soilHumidity && (
                <SoilHumidityWidget 
                  key={`soil-${sensorData.soilHumidity}-${updatedAt}`}
                  value={sensorData.soilHumidity} 
                  updatedAt={updatedAt} 
                  isActive={getSensorStatus('soilHumidity')}
                />
              )}
              {availableSensors.co2 && (
                <CO2Widget 
                  key={`co2-${sensorData.co2}-${updatedAt}`}
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

