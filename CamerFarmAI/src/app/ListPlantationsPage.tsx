import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Icon } from '@/components/ui/Icon/Icon';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { CreatePlantationModal } from '@/components/ui/CreatePlantationModal/CreatePlantationModal';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FaPlus, FaLeaf, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import styles from './ListPlantationsPage.module.css';

interface Plantation {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  area?: number;
  status?: 'active' | 'inactive';
}

export function ListPlantationsPage() {
  const { t } = useTranslation();
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: emptyStateRef, isVisible: isEmptyStateVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: listRef } = useScrollAnimation({ threshold: 0.1 });

  // Configuration de la navbar pour la page des plantations
  const plantationsNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.monitoring'), href: '/monitoring' },
    { label: t('nav.graphs'), href: '/graphs' },
    { label: t('nav.support'), href: '/support' },
    { label: t('nav.ai'), href: '/ai' },
  ];

  // Charger les plantations (simulation)
  useEffect(() => {
    const loadPlantations = async () => {
      setIsLoading(true);
      // TODO: Appeler le service pour récupérer les plantations
      // const data = await plantationService.getAll();
      
      // Charger depuis localStorage pour persister les plantations
      const savedPlantations = localStorage.getItem('plantations');
      if (savedPlantations) {
        try {
          const parsed = JSON.parse(savedPlantations);
          setPlantations(parsed);
        } catch (error) {
          console.error('Error parsing saved plantations:', error);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadPlantations();
  }, []);

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
  }) => {
    // TODO: Appeler le service pour créer la plantation
    // const newPlantation = await plantationService.create(data);
    
    // Simulation temporaire
    const newPlantation: Plantation = {
      id: Date.now().toString(),
      name: data.name,
      location: data.location,
      createdAt: new Date().toLocaleDateString(),
      area: parseFloat(data.area),
      status: 'active',
    };

    const updatedPlantations = [...plantations, newPlantation];
    setPlantations(updatedPlantations);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('plantations', JSON.stringify(updatedPlantations));
    
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
                        <span>{plantation.createdAt}</span>
                      </div>
                      {plantation.area && (
                        <div className={styles.listPlantationsPage__cardInfo}>
                          <span>{t('plantations.area')}: {plantation.area} ha</span>
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

