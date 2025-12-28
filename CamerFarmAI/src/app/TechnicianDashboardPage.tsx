"use client"

import { useState, useEffect, useMemo } from "react"
import { FaSearch, FaUser, FaTractor, FaWifi, FaToggleOn, FaLeaf,FaPhoneAlt,     // ← Icône téléphone
  FaMapMarkerAlt } from "react-icons/fa"

import styles from "./TechnicianDashboardPage.module.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Background3D } from "@/components/ui/Background3D/Background3D"
// import { redirect } from 'next/navigation'
// import { getCurrentUser } from '@/lib/auth' // ta fonction pour récupérer l'utilisateur connecté

import {
  technicianService,
  type Farmer,
  type Field,
  type TechnicianStats,
  type FarmerDetails,
  type Sensor,
  type Actuator,
} from "@/services/technicianService"

// On définit un type Equipment générique qui accepte sensors et actuators
export type Equipment = Sensor | Actuator

export default function TechnicianDashboardPage() {

  const [farmersDetails, setFarmersDetails] = useState<FarmerDetails[]>([])
  const [filteredFarmers, setFilteredFarmers] = useState<FarmerDetails[]>([])
  const [stats, setStats] = useState<TechnicianStats | null>(null)

  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)

  const [fields, setFields] = useState<Field[]>([])
  const [equipments, setEquipments] = useState<Equipment[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  /* =======================
     CHARGEMENT INITIAL
  ======================= */
  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true)
      try {
        const [statsData, farmersDetailsData] = await Promise.all([
          technicianService.getStats(),
          technicianService.getFarmersWithDetails(),
        ])

        setFarmersDetails(farmersDetailsData)
        setFilteredFarmers(farmersDetailsData)
        setStats(statsData)

        // Sélectionne automatiquement le premier agriculteur s'il existe
        if (farmersDetailsData.length > 0) {
          setSelectedFarmerId(farmersDetailsData[0].id)
        }

        setFetchError(null)
      } catch (error) {
        console.error("Erreur dashboard technicien :", error)
        setFetchError("Impossible de charger les données")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  /* =======================
     FILTRAGE AGRICULTEURS
======================= */
useEffect(() => {
  if (!searchTerm.trim()) {
    setFilteredFarmers(farmersDetails)
    return
  }

  const term = searchTerm.toLowerCase()

  setFilteredFarmers(
    farmersDetails.filter((farmer) => {
      // Recherche dans le nom de l'agriculteur
      if (farmer.name.toLowerCase().includes(term)) return true

      // Recherche dans le téléphone
      if (farmer.phone && farmer.phone.includes(term)) return true

      // Recherche dans les localisations des champs
      return farmer.fields.some((field) =>
        field.location?.toLowerCase().includes(term)
      )
    })
  )
}, [searchTerm, farmersDetails])

  /* =======================
     MISE À JOUR DES CHAMPS QUAND ON CHANGE D'AGRICULTEUR
  ======================= */
  useEffect(() => {
    if (!selectedFarmerId) {
      setFields([])
      setSelectedFieldId(null)
      setEquipments([])
      return
    }

    const selectedFarmerDetails = farmersDetails.find(
      (f) => f.id === selectedFarmerId
    )

    if (selectedFarmerDetails) {
      setFields(selectedFarmerDetails.fields)

      // Pré-sélectionne le premier champ s'il existe
      if (
        selectedFarmerDetails.fields.length > 0 &&
        selectedFieldId === null
      ) {
        setSelectedFieldId(selectedFarmerDetails.fields[0].id)
      }
    } else {
      setFields([])
      setSelectedFieldId(null)
      setEquipments([])
    }
  }, [selectedFarmerId, farmersDetails])

  /* =======================
     MISE À JOUR DES ÉQUIPEMENTS QUAND ON CHANGE DE CHAMP
  ======================= */
  useEffect(() => {
    if (!selectedFieldId || fields.length === 0) {
      setEquipments([])
      return
    }

    const selectedField = fields.find((f) => f.id === selectedFieldId)
    if (selectedField) {
      const allEquipments: Equipment[] = [
        ...(selectedField.sensors || []),
        ...(selectedField.actuators || []),
      ]
      setEquipments(allEquipments)
    } else {
      setEquipments([])
    }
  }, [selectedFieldId, fields])

  const selectedFarmer = useMemo(
    () => farmersDetails.find((f) => f.id === selectedFarmerId) || null,
    [farmersDetails, selectedFarmerId]
  )

  if (isLoading) {
    return (
      <>
        <Background3D />
        <Header currentPath="/technicien" showAuthIcons />
        <main className={styles.page}>
          <div className={styles.loading}>Chargement des données…</div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Background3D />
      <Header currentPath="/technicien" showAuthIcons />

      <main className={styles.page}>
        {fetchError && <div className={styles.error}>{fetchError}</div>}

        {/* =======================
            STATISTIQUES
        ======================= */}
        {stats && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaUser />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>AGRICULTEURS</div>
                <div className={styles.statValue}>{stats.farmersCount}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaTractor />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>PLANTATION</div>
                <div className={styles.statValue}>{stats.fieldsCount}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaWifi />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>CAPTEURS ACTIFS</div>
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
                <div className={styles.statLabel}>ACTIONNEURS</div>
                <div className={styles.statValue}>{stats.actuatorsCount}</div>
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
            placeholder="Rechercher un agriculteur ou une région..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* =======================
            TABS
        ======================= */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            Vue Tableau de Bord
          </button>
        </div>

        {/* =======================
            CONTENU PRINCIPAL
        ======================= */}
        <div className={styles.mainContent}>
          {/* AGRICULTEURS */}
          <div className={styles.farmersSection}>
            <div className={styles.sectionHeader}>
              <FaUser className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Agriculteurs</h2>
              <span className={styles.sectionBadge}>{filteredFarmers.length}</span>
            </div>
            <div className={styles.farmersList}>
              {filteredFarmers.map((farmer) => (
                <div
                  key={farmer.id}
                  className={`${styles.farmerCard} ${
                    farmer.id === selectedFarmerId ? styles.farmerCardActive : ""
                  }`}
                  onClick={() => {
                    setSelectedFarmerId(farmer.id)
                    setSelectedFieldId(null) // Reset champ quand on change d'agriculteur
                  }}
                >
                  <div className={styles.farmerStatus}></div>
                  <div className={styles.farmerInfo}>
                    <div className={styles.farmerName}>{farmer.name}</div>
                    <div className={styles.farmerLocation}>
                       <FaMapMarkerAlt />Cameroun
                    </div>
                    <div className={styles.farmerPhone}><FaPhoneAlt /> {farmer.phone}</div>
  
  <div className={styles.farmerFields}>
    {farmer.fields.length} plantation{farmer.fields.length > 1 ? "s" : ""}
  </div>
                    {/* <div className={styles.farmerFields}>
                      {farmer.fields.length} champs
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHAMPS */}
          <div className={styles.fieldsSection}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>AGRICULTEUR</span>
              <h3 className={styles.panelSubtitle}>
                {selectedFarmer ? selectedFarmer.name : "Sélectionnez un agriculteur"}
              </h3>
            </div>
            <div className={styles.panelContent}>
              <div className={styles.fieldsHeader}>
                <FaLeaf className={styles.fieldsIcon} />
                <span className={styles.fieldsTitle}>Plantations</span>
                <span className={styles.fieldsBadge}>{fields.length}</span>
              </div>
              <div className={styles.fieldsList}>
                {selectedFarmer ? (
                  fields.length > 0 ? (
                    fields.map((field) => (
                      <div
                        key={field.id}
                        className={`${styles.fieldCard} ${
                          field.id === selectedFieldId ? styles.fieldCardActive : ""
                        }`}
                        onClick={() => setSelectedFieldId(field.id)}
                      >
                        <div className={styles.fieldIcon}>
                          <FaLeaf />
                        </div>
                        <div className={styles.fieldInfo}>
                          <div className={styles.fieldName}>{field.name}</div>
                          <div className={styles.fieldDetails}>
                            <div className={styles.fieldDetail}>
                              <span className={styles.fieldLabel}>Culture</span>
                              <span className={styles.fieldValue}>
                                {field.cropType || "N/A"}
                              </span>
                            </div>
                            <div className={styles.fieldDetail}>
                              <span className={styles.fieldLabel}>Superficie</span>
                              <span className={styles.fieldValue}>
                                {field.area || "N/A" }
                              </span>
                            </div>
                          </div>
                          <div className={styles.fieldEquipment}>
                            🔌 {field.totalDevices || "N/A"} équipements
                          </div>
                          <div className={styles.fieldDetail}>
    <span className={styles.fieldLabel}>Localisation</span>
    <span className={styles.fieldValue}>{field.location || "Non renseignée"}</span>
  </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.emptyMessage}>Aucun champ disponible</p>
                  )
                ) : (
                  <p className={styles.emptyMessage}>Sélectionnez un agriculteur</p>
                )}
              </div>
            </div>
          </div>

          {/* ÉQUIPEMENTS (placeholder pour la suite, tu pourras l'étendre) */}
          <div className={styles.equipmentSection}>
            {selectedFieldId ? (
              equipments.length > 0 ? (
               <div className={styles.equipmentSection}>
  <h3 className={styles.equipmentTitle}>Équipements du champ</h3>
  
  {equipments.length === 0 ? (
    <p className={styles.emptyMessage}>Aucun équipement sur ce champ</p>
  ) : (
    <div className={styles.equipmentList}>
      {equipments.map((eq) => {
        const isActive = eq.status === "active"
        const displayName = "name" in eq ? eq.name : eq.type

        return (
          <div key={eq.id} className={styles.equipmentItem}>
            <span className={styles.equipmentName}>{displayName}</span>
            <span
              className={`${styles.statusBadge} ${
                isActive ? styles.statusActive : styles.statusInactive
              }`}
            >
              • {isActive ? "active" : "inactive"}
            </span>
          </div>
        )
      })}
    </div>
  )}
</div>
              ) : (
                <div className={styles.placeholderText}>
                  Aucun équipement sur ce champ
                </div>
              )
            ) : (
              <div className={styles.placeholderText}>Sélectionnez un champ</div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}