import { Icon } from '@/components/ui/Icon/Icon';
import type { IconComponent } from '@/components/ui/Icon/Icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './BenefitsBlock.module.css';

export type BenefitItem = {
  icon: IconComponent;
  title: string;
};

interface BenefitsBlockProps {
  benefits: BenefitItem[];
  className?: string;
}

export function BenefitsBlock({
  benefits,
  className,
}: BenefitsBlockProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.benefits} ${className || ''} ${isVisible ? styles.benefitsVisible : ''}`}
      role="region"
      aria-label="Bénéfices"
    >
      <div className={styles.benefits__container}>
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className={`${styles.benefits__item} ${isVisible ? styles.benefits__itemVisible : ''}`}
            style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
          >
            <div className={styles.benefits__iconWrapper}>
              <div className={styles.benefits__icon}>
                <Icon icon={benefit.icon} size={48} aria-label={benefit.title} />
              </div>
            </div>
            <p className={styles.benefits__text}>{benefit.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

