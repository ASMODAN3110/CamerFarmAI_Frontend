"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { FaSearch, FaUser, FaTractor, FaWifi, FaToggleOn, FaLeaf, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa"

import styles from "./TechnicianDashboardPage.module.css"
import { Header } from "@/components/layout/Header"
import { Background3D } from "@/components/ui/Background3D/Background3D"
import { useTranslation } from "@/hooks/useTranslation"

import {
  technicianService,
  type TechnicianStats,
  type FarmerListItem,
  type PlantationListItem,
  type PlantationDetails,
} from "@/services/technicianService"
import { type Sensor } from "@/services/plantationService"

export default function TechnicianDashboardPage() {
  const { t, language } = useTranslation()
  // États pour les données principales
  const [stats, setStats] = useState<TechnicianStats | null>(null)
  const [farmers, setFarmers] = useState<FarmerListItem[]>([])
  const [plantations, setPlantations] = useState<PlantationListItem[]>([])
  const [plantationDetails, setPlantationDetails] = useState<PlantationDetails | null>(null)

  // États de sélection
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null)
  const [selectedPlantationId, setSelectedPlantationId] = useState<string | null>(null)

  // États de chargement
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [isLoadingFarmers, setIsLoadingFarmers] = useState(true)
  const [isLoadingPlantations, setIsLoadingPlantations] = useState(false)
  const [isLoadingPlantationDetails, setIsLoadingPlantationDetails] = useState(false)

  // États de recherche et erreurs
  const [searchTerm, setSearchTerm] = useState("")
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [error, setError] = useState<string | null>(null)

  // État pour le rafraîchissement automatique
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  /* =======================
     CHARGEMENT INITIAL (HYBRIDE)
  ======================= */
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingStats(true)
      setIsLoadingFarmers(true)
      setError(null)

      try {
        // Charger les stats et la liste des agriculteurs en parallèle
        const [statsData, farmersData] = await Promise.all([
          technicianService.getStats(),
          technicianService.getFarmers(),
        ])

        setStats(statsData)
        setFarmers(farmersData)
        setLastRefresh(new Date())

        // Sélectionner automatiquement le premier agriculteur s'il existe
        if (farmersData.length > 0) {
          setSelectedFarmerId(farmersData[0].id)
        }
      } catch (err: any) {
        console.error("Erreur lors du chargement initial:", err)
        setError(err?.response?.data?.message || t('technician.errors.loadData'))
      } finally {
        setIsLoadingStats(false)
        setIsLoadingFarmers(false)
      }
    }

    loadInitialData()
  }, [])

  /* =======================
     RECHERCHE D'AGRICULTEURS (BACKEND)
======================= */
  useEffect(() => {
    // Nettoyer le timer précédent
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer)
    }

    // Créer un nouveau timer pour le debounce
    const timer = setTimeout(async () => {
      setIsLoadingFarmers(true)
      setError(null)

      try {
        // Utiliser le terme de recherche complet (avec espaces) pour une recherche caractère par caractère
        const trimmedSearch = searchTerm.trim()
        const searchQuery = trimmedSearch.length > 0 ? trimmedSearch : undefined
        const farmersData = await technicianService.getFarmers(searchQuery)

        // Log pour vérifier les données reçues
        console.log('📋 Farmers data received:', farmersData.map(f => ({
          name: `${f.firstName} ${f.lastName}`,
          phone: f.phone,
          hasPhone: !!f.phone
        })))

        setFarmers(farmersData)
        setLastRefresh(new Date())

        // Si un agriculteur était sélectionné mais n'est plus dans les résultats, le désélectionner
        if (selectedFarmerId && !farmersData.find(f => f.id === selectedFarmerId)) {
          setSelectedFarmerId(null)
          setPlantations([])
          setSelectedPlantationId(null)
          setPlantationDetails(null)
        }
      } catch (err: any) {
        console.error("Erreur lors de la recherche:", err)
        setError(err?.response?.data?.message || t('technician.errors.search'))
      } finally {
        setIsLoadingFarmers(false)
      }
    }, 300) // Debounce de 300ms

    setSearchDebounceTimer(timer)

    // Cleanup
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [searchTerm])

  /* =======================
     CHARGEMENT DES PLANTATIONS (À LA DEMANDE)
  ======================= */
  useEffect(() => {
    if (!selectedFarmerId) {
      setPlantations([])
      setSelectedPlantationId(null)
      setPlantationDetails(null)
      return
    }

    const loadPlantations = async () => {
      setIsLoadingPlantations(true)
      setError(null)

      try {
        const plantationsData = await technicianService.getFarmerPlantations(selectedFarmerId)
        setPlantations(plantationsData)
        setLastRefresh(new Date())

        // Sélectionner automatiquement la première plantation s'il y en a
        if (plantationsData.length > 0 && !selectedPlantationId) {
          setSelectedPlantationId(plantationsData[0].id)
        } else if (plantationsData.length === 0) {
          setSelectedPlantationId(null)
          setPlantationDetails(null)
        }
      } catch (err: any) {
        console.error("Erreur lors du chargement des plantations:", err)
        setError(err?.response?.data?.message || t('technician.errors.loadPlantations'))
        setPlantations([])
      } finally {
        setIsLoadingPlantations(false)
      }
    }

    loadPlantations()
  }, [selectedFarmerId])

  /* =======================
     CHARGEMENT DES DÉTAILS D'UNE PLANTATION (À LA DEMANDE)
  ======================= */
  useEffect(() => {
    if (!selectedPlantationId) {
      setPlantationDetails(null)
      return
    }

    const loadPlantationDetails = async () => {
      setIsLoadingPlantationDetails(true)
      setError(null)

      try {
        const details = await technicianService.getPlantationDetails(selectedPlantationId)
        setPlantationDetails(details)
        setLastRefresh(new Date())
      } catch (err: any) {
        console.error("Erreur lors du chargement des détails:", err)
        setError(err?.response?.data?.message || t('technician.errors.loadDetails'))
        setPlantationDetails(null)
      } finally {
        setIsLoadingPlantationDetails(false)
      }
    }

    loadPlantationDetails()
  }, [selectedPlantationId])

  /* =======================
     RAFRAÎCHISSEMENT AUTOMATIQUE DES STATS
  ======================= */
  useEffect(() => {
    const refreshStats = async () => {
      try {
        const statsData = await technicianService.getStats()
        setStats(statsData)
        setLastRefresh(new Date())
      } catch (err) {
        console.error("Erreur lors du rafraîchissement des stats:", err)
      }
    }

    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(refreshStats, 30000)

    return () => clearInterval(interval)
  }, [])

  /* =======================
     CALCULS DÉRIVÉS
  ======================= */
  const selectedFarmer = useMemo(
    () => farmers.find(f => f.id === selectedFarmerId) || null,
    [farmers, selectedFarmerId]
  )

  // Calculer le pourcentage de capteurs actifs pour une plantation
  const getActiveSensorsPercentage = useCallback((sensors: Sensor[]) => {
    if (sensors.length === 0) return 0
    const activeCount = sensors.filter(s => s.status === 'active').length
    return Math.round((activeCount / sensors.length) * 100)
  }, [])

  // Vérifier si une plantation a beaucoup de capteurs inactifs (>50%)
  const hasManyInactiveSensors = useCallback((sensors: Sensor[]) => {
    if (sensors.length === 0) return false
    const activePercentage = getActiveSensorsPercentage(sensors)
    return activePercentage < 50
  }, [getActiveSensorsPercentage])

  // Afficher l'erreur si elle existe
  if (error && !isLoadingStats && !isLoadingFarmers) {
    return (
      <>
        <Background3D />
        <Header currentPath="/technicien" showAuthIcons />
        <main className={styles.page}>
          <div className={styles.error}>
            <FaExclamationTriangle />
            <span>{error}</span>
            <button onClick={() => window.location.reload()}>{t('technician.retry')}</button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Background3D />
      <Header currentPath="/technicien" showAuthIcons />

      <main className={styles.page}>
        {/* =======================
            STATISTIQUES
        ======================= */}
        {isLoadingStats ? (
          <div className={styles.loading}>{t('technician.loading.stats')}</div>
        ) : stats && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaUser />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('technician.stats.farmers')}</div>
                <div className={styles.statValue}>{stats.farmers}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaTractor />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('technician.stats.plantations')}</div>
                <div className={styles.statValue}>{stats.plantations}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaWifi />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('technician.stats.activeSensors')}</div>
                <div className={styles.statValue}>
                  {stats.activeSensors}/{stats.totalSensors}
                </div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaToggleOn />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{t('technician.stats.actuators')}</div>
                <div className={styles.statValue}>{stats.actuators}</div>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            RECHERCHE
        ======================= */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t('technician.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {isLoadingFarmers && <span className={styles.searchLoading}>{t('technician.search.loading')}</span>}
        </div>

        {/* =======================
            CONTENU PRINCIPAL
        ======================= */}
        <div className={styles.mainContent}>
          {/* AGRICULTEURS */}
          <div className={styles.farmersSection}>
            <div className={styles.sectionHeader}>
              <FaUser className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>{t('technician.section.farmers')}</h2>
              <span className={styles.sectionBadge}>{farmers.length}</span>
            </div>
            {isLoadingFarmers ? (
              <div className={styles.loading}>{t('technician.loading.farmers')}</div>
            ) : farmers.length === 0 ? (
              <div className={styles.emptyMessage}>
                {searchTerm ? t('technician.empty.noFarmersFound') : t('technician.empty.noFarmers')}
              </div>
            ) : (
              <div className={styles.farmersList}>
                {farmers.map((farmer) => (
                  <div
                    key={farmer.id}
                    className={`${styles.farmerCard} ${farmer.id === selectedFarmerId ? styles.farmerCardActive : ""
                      }`}
                    onClick={() => {
                      setSelectedFarmerId(farmer.id)
                      setSelectedPlantationId(null)
                    }}
                  >
                    <div className={styles.farmerStatus}></div>
                    <div className={styles.farmerInfo}>
                      <div className={styles.farmerName}>
                        {farmer.firstName} {farmer.lastName}
                      </div>
                      {farmer.phone && (
                        <div className={styles.farmerPhone}>
                          <FaPhoneAlt /> {farmer.phone}
                        </div>
                      )}

                      <div className={styles.farmerFields}>
                        {farmer.plantationsCount} {farmer.plantationsCount > 1 ? t('technician.plantation.plural') : t('technician.plantation.singular')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PLANTATIONS */}
          <div className={styles.fieldsSection}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>{t('technician.farmer.label')}</span>
              <h3 className={styles.panelSubtitle}>
                {selectedFarmer
                  ? `${selectedFarmer.firstName} ${selectedFarmer.lastName}`
                  : t('technician.empty.selectFarmer')}
              </h3>
            </div>
            <div className={styles.panelContent}>
              <div className={styles.fieldsHeader}>
                <FaLeaf className={styles.fieldsIcon} />
                <span className={styles.fieldsTitle}>{t('technician.section.plantations')}</span>
                <span className={styles.fieldsBadge}>{plantations.length}</span>
              </div>
              {isLoadingPlantations ? (
                <div className={styles.loading}>{t('technician.loading.plantations')}</div>
              ) : selectedFarmer ? (
                plantations.length > 0 ? (
                  <div className={styles.fieldsList}>
                    {plantations.map((plantation) => (
                      <div
                        key={plantation.id}
                        className={`${styles.fieldCard} ${plantation.id === selectedPlantationId ? styles.fieldCardActive : ""
                          }`}
                        onClick={() => setSelectedPlantationId(plantation.id)}
                      >
                        <div className={styles.fieldIcon}>
                          <FaLeaf />
                        </div>
                        <div className={styles.fieldInfo}>
                          <div className={styles.fieldName}>{plantation.name}</div>
                          <div className={styles.fieldDetails}>
                            <div className={styles.fieldDetail}>
                              <span className={styles.fieldLabel}>{t('technician.details.cropType')}</span>
                              <span className={styles.fieldValue}>
                                {plantation.cropType || t('technician.details.notAvailable')}
                              </span>
                            </div>
                            <div className={styles.fieldDetail}>
                              <span className={styles.fieldLabel}>{t('technician.details.area')}</span>
                              <span className={styles.fieldValue}>
                                {plantation.area ? `${plantation.area} m²` : t('technician.details.notAvailable')}
                              </span>
                            </div>
                          </div>
                          <div className={styles.fieldDetail}>
                            <span className={styles.fieldLabel}>{t('technician.details.location')}</span>
                            <span className={styles.fieldValue}>
                              {plantation.location || t('technician.details.locationNotSet')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyMessage}>{t('technician.details.noPlantationsAvailable')}</p>
                )
              ) : (
                <p className={styles.emptyMessage}>{t('technician.empty.selectFarmer')}</p>
              )}
            </div>
          </div>

          {/* DÉTAILS DE LA PLANTATION */}
          <div className={styles.equipmentSection}>
            {selectedPlantationId ? (
              isLoadingPlantationDetails ? (
                <div className={styles.loading}>{t('technician.loading.details')}</div>
              ) : plantationDetails ? (
                <div className={styles.plantationDetails}>
                  <div className={styles.detailsHeader}>
                    <h3 className={styles.detailsTitle}>{plantationDetails.name}</h3>
                    {plantationDetails.owner && (
                      <div className={styles.ownerInfo}>

                        {plantationDetails.owner.phone && (
                          <div className={styles.ownerPhone}>
                            <FaPhoneAlt /> {plantationDetails.owner.phone}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CAPTEURS */}
                  <div className={styles.sensorsSection}>
                    <h4 className={styles.sensorsTitle}>
                      {t('technician.details.sensors')} ({plantationDetails.sensors.length})
                    </h4>
                    {plantationDetails.sensors.length > 0 && (
                      <div className={styles.sensorsStats}>
                        <span>
                          {t('technician.details.activeCount')} {plantationDetails.sensors.filter(s => s.status === 'active').length} / {plantationDetails.sensors.length}
                        </span>
                        <span className={styles.percentage}>
                          ({getActiveSensorsPercentage(plantationDetails.sensors)}%)
                        </span>
                      </div>
                    )}
                    {hasManyInactiveSensors(plantationDetails.sensors) && (
                      <div className={styles.alert}>
                        <FaExclamationTriangle />
                        <span>{t('technician.details.manyInactiveSensors')}</span>
                      </div>
                    )}
                    {plantationDetails.sensors.length === 0 ? (
                      <p className={styles.emptyMessage}>{t('technician.details.noSensors')}</p>
                    ) : (
                      <div className={styles.sensorsList}>
                        {plantationDetails.sensors.map((sensor) => (
                          <div key={sensor.id} className={styles.sensorItem}>
                            <div className={styles.sensorInfo}>
                              <span className={styles.sensorName}>
                                {t(`plantations.detail.sensors.${sensor.type.charAt(0).toLowerCase() + sensor.type.slice(1)}` as any) === `plantations.detail.sensors.${sensor.type.charAt(0).toLowerCase() + sensor.type.slice(1)}`
                                  ? sensor.type
                                  : t(`plantations.detail.sensors.${sensor.type.charAt(0).toLowerCase() + sensor.type.slice(1)}` as any)}
                              </span>
                              {sensor.seuilMin !== undefined && sensor.seuilMax !== undefined && (
                                <span className={styles.sensorThresholds}>
                                  {t('technician.details.thresholds')} {sensor.seuilMin} - {sensor.seuilMax}
                                </span>
                              )}
                            </div>
                            <span
                              className={`${styles.statusBadge} ${sensor.status === 'active' ? styles.statusActive : styles.statusInactive
                                }`}
                            >
                              {sensor.status === 'active' ? `🟢 ${t('sensor.status.active')}` : `🔴 ${t('sensor.status.inactive')}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTIONNEURS */}
                  <div className={styles.actuatorsSection}>
                    <h4 className={styles.actuatorsTitle}>
                      {t('technician.details.actuators')} ({plantationDetails.actuators.length})
                    </h4>
                    {plantationDetails.actuators.length > 0 && (
                      <div className={styles.sensorsStats}>
                        <span>
                          {t('technician.details.activeCount')} {plantationDetails.actuators.filter(a => a.status === 'active').length} / {plantationDetails.actuators.length}
                        </span>
                        <span className={styles.percentage}>
                          ({Math.round((plantationDetails.actuators.filter(a => a.status === 'active').length / plantationDetails.actuators.length) * 100)}%)
                        </span>
                      </div>
                    )}
                    {plantationDetails.actuators.length === 0 ? (
                      <p className={styles.emptyMessage}>{t('technician.details.noActuators')}</p>
                    ) : (
                      <div className={styles.actuatorsList}>
                        {plantationDetails.actuators.map((actuator) => (
                          <div key={actuator.id} className={styles.actuatorItem}>
                            <div className={styles.actuatorInfo}>
                              <span className={styles.actuatorName}>
                                {(() => {
                                  // Map les noms connus vers les clés de traduction
                                  const nameKeyMap: Record<string, string> = {
                                    'Pompe principale': 'plantations.detail.actuators.names.mainPump',
                                    'Ventilateur nord': 'plantations.detail.actuators.names.northFan',
                                    'Éclairage LED': 'plantations.detail.actuators.names.ledLight'
                                  };

                                  const translationKey = nameKeyMap[actuator.name];
                                  if (translationKey) {
                                    return t(translationKey as any);
                                  }

                                  // Si pas de clé spécifique, utiliser le nom tel quel ou traduire le type
                                  return actuator.name ||
                                    (t(`plantations.detail.actuators.${actuator.type.toLowerCase()}` as any) === `plantations.detail.actuators.${actuator.type.toLowerCase()}`
                                      ? actuator.type
                                      : t(`plantations.detail.actuators.${actuator.type.toLowerCase()}` as any));
                                })()}
                              </span>
                              <span className={styles.actuatorType}>
                                {t(`plantations.detail.actuators.${actuator.type.toLowerCase()}` as any) === `plantations.detail.actuators.${actuator.type.toLowerCase()}`
                                  ? actuator.type
                                  : t(`plantations.detail.actuators.${actuator.type.toLowerCase()}` as any)}
                              </span>
                            </div>
                            <span
                              className={`${styles.statusBadge} ${actuator.status === 'active' ? styles.statusActive : styles.statusInactive
                                }`}
                            >
                              {actuator.status === 'active' ? `🟢 ${t('sensor.status.active')}` : `🔴 ${t('sensor.status.inactive')}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.placeholderText}>
                  {t('technician.errors.loadDetails')}
                </div>
              )
            ) : (
              <div className={styles.placeholderText}>{t('technician.details.selectPlantation')}</div>
            )}
          </div>
        </div>

        {/* Indicateur de dernière mise à jour */}
        {lastRefresh && (
          <div className={styles.lastRefresh}>
            {t('technician.details.lastUpdate')} {lastRefresh.toLocaleTimeString()}
          </div>
        )}
      </main>
    </>
  )
}

