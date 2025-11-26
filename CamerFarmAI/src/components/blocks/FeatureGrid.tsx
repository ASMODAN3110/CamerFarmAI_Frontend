import { Icon } from '@/components/ui/Icon/Icon';
import type { IconComponent } from '@/components/ui/Icon/Icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './FeatureGrid.module.css';

export type FeatureItem = {
  icon: IconComponent;
  title: string;
  description: string;
};

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: number;
  className?: string;
}

export function FeatureGrid({
  items,
  columns = 3,
  className,
}: FeatureGridProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.featureGrid} ${className || ''} ${isVisible ? styles.featureGridVisible : ''}`}
      role="region"
      aria-label="Fonctionnalités"
    >
      <div
        className={styles.featureGrid__container}
        style={{ '--columns': columns } as React.CSSProperties}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.featureGrid__item} ${isVisible ? styles.featureGrid__itemVisible : ''}`}
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className={styles.featureGrid__iconWrapper}>
              <div className={styles.featureGrid__icon}>
                <Icon icon={item.icon} size={56} aria-label={item.title} />
              </div>
            </div>
            <h3 className={styles.featureGrid__title}>{item.title}</h3>
            <p className={styles.featureGrid__description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

