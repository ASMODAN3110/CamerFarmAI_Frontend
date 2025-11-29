import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Icon } from '@/components/ui/Icon/Icon';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { CreatePlantationModal } from '@/components/ui/CreatePlantationModal/CreatePlantationModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FaPlus, FaLeaf, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaSeedling } from 'react-icons/fa';
import { plantationService, type Plantation } from '@/services/plantationService';
import styles from './ListPlantationsPage.module.css';

export function ListPlantationsPage() {
  const { t } = useTranslation();
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: emptyStateRef, isVisible: isEmptyStateVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: listRef } = useScrollAnimation({ threshold: 0.1 });

  // Configuration de la navbar pour la page des plantations
  const plantationsNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.plantations'), href: '/plantations' },
    { label: t('nav.ai'), href: '/ai' },
    { label: t('nav.support'), href: '/support' },
  ];

  const formatDate = useMemo(
    () => (value: string) => {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
    },
    []
  );

  // Charger les plantations depuis l'API
  useEffect(() => {
    const loadPlantations = async () => {
      setIsLoading(true);
      try {
        const data = await plantationService.getAll();
        setPlantations(data);
        setFetchError(null);
        } catch (error) {
        console.error('Error fetching plantations:', error);
        setFetchError(t('plantations.errors.fetchFailed'));
        setPlantations([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlantations();
  }, [t]);

  const handleCreatePlantation = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (data: {
    name: string;
    area: string;
    location: string;
    cropType: string;
  }) => {
    const payload = {
      name: data.name.trim(),
      location: data.location.trim(),
      area: Number(data.area),
      cropType: data.cropType.trim() || undefined,
    };

    const newPlantation = await plantationService.create(payload);

    setPlantations((prev) => {
      return [...prev, newPlantation];
    });
    
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <Header 
          navItems={plantationsNavItems}
          currentPath="/plantations"
          showAuthIcons={true}
        />
        <main className={styles.listPlantationsPage}>
          <div className={styles.listPlantationsPage__loading}>
            <p>{t('plantations.loading')}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header 
        navItems={plantationsNavItems}
        currentPath="/plantations"
        showAuthIcons={true}
      />
      <main className={styles.listPlantationsPage}>
        <div className={styles.listPlantationsPage__container}>
          {fetchError && (
            <div className={styles.listPlantationsPage__error}>
              {fetchError}
            </div>
          )}
          {plantations.length === 0 ? (
            <div
              ref={emptyStateRef as React.RefObject<HTMLDivElement>}
              className={`${styles.listPlantationsPage__emptyState} ${isEmptyStateVisible ? styles.listPlantationsPage__emptyStateVisible : ''}`}
            >
              <div className={styles.listPlantationsPage__emptyIcon}>
                <Icon icon={FaLeaf} size={80} aria-label={t('plantations.empty.icon')} />
              </div>
              <h2 className={styles.listPlantationsPage__emptyTitle}>
                {t('plantations.empty.title')}
              </h2>
              <p className={styles.listPlantationsPage__emptyMessage}>
                {t('plantations.empty.message')}
              </p>
              <div className={styles.listPlantationsPage__emptyAction}>
                <span className={styles.listPlantationsPage__emptyActionText}>
                  {t('plantations.empty.action')}
                </span>
                <button
                  className={styles.listPlantationsPage__createButton}
                  onClick={handleCreatePlantation}
                  aria-label={t('plantations.create')}
                >
                  <FaPlus className={styles.listPlantationsPage__createIcon} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.listPlantationsPage__header}>
                <h1 className={styles.listPlantationsPage__title}>
                  {t('plantations.list.title')}
                </h1>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCreatePlantation}
                  className={styles.listPlantationsPage__addButton}
                >
                  <Icon icon={FaPlus} size={18} />
                  {t('plantations.create')}
                </Button>
              </div>

              <div
                ref={listRef as React.RefObject<HTMLDivElement>}
                className={`${styles.listPlantationsPage__grid} ${styles.listPlantationsPage__gridVisible}`}
              >
                {plantations.map((plantation) => (
                  <Card
                    key={plantation.id}
                    href={`/plantations/${plantation.id}`}
                    className={styles.listPlantationsPage__card}
                  >
                    <div className={styles.listPlantationsPage__cardHeader}>
                      <div className={styles.listPlantationsPage__cardIcon}>
                        <Icon icon={FaLeaf} size={32} />
                      </div>
                      <h3 className={styles.listPlantationsPage__cardTitle}>
                        {plantation.name}
                      </h3>
                    </div>
                    <div className={styles.listPlantationsPage__cardContent}>
                      <div className={styles.listPlantationsPage__cardInfo}>
                        <Icon icon={FaMapMarkerAlt} size={16} />
                        <span>{plantation.location}</span>
                      </div>
                      <div className={styles.listPlantationsPage__cardInfo}>
                        <Icon icon={FaCalendarAlt} size={16} />
                        <span>{formatDate(plantation.createdAt)}</span>
                      </div>
                      {plantation.area && (
                        <div className={styles.listPlantationsPage__cardInfo}>
                          <span>{t('plantations.area')}: {plantation.area} ha</span>
                        </div>
                      )}
                      {plantation.cropType && (
                        <div className={styles.listPlantationsPage__cardInfo}>
                          <Icon icon={FaSeedling} size={16} />
                          <span>{t('plantations.cropType')}: {plantation.cropType}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.listPlantationsPage__cardFooter}>
                      <span className={styles.listPlantationsPage__cardLink}>
                        {t('plantations.viewDetails')}
                        <Icon icon={FaChevronRight} size={14} />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className={styles.listPlantationsPage__slogan}>
            <p className={styles.listPlantationsPage__sloganLine}>
              {t('plantations.slogan.line1')}
            </p>
            <p className={styles.listPlantationsPage__sloganLine}>
              {t('plantations.slogan.line2')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButton
        onClick={handleCreatePlantation}
        position="bottom-right"
        aria-label={t('plantations.create')}
      >
        <FaPlus size={24} />
      </FloatingButton>
      <CreatePlantationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

