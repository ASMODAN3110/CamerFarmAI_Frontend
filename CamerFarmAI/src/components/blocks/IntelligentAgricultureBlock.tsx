import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './IntelligentAgricultureBlock.module.css';

interface IntelligentAgricultureBlockProps {
  title: string;
  description: string;
  className?: string;
}

export function IntelligentAgricultureBlock({
  title,
  description,
  className,
}: IntelligentAgricultureBlockProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.intelligentAgriculture} ${className || ''} ${isVisible ? styles.intelligentAgricultureVisible : ''}`}
      role="region"
      aria-label="Agriculture intelligente"
    >
      <div className={styles.intelligentAgriculture__container}>
        <div className={styles.intelligentAgriculture__left}>
          <h2 className={styles.intelligentAgriculture__title}>{title}</h2>
          <p className={styles.intelligentAgriculture__description}>{description}</p>
        </div>
        
      </div>
    </section>
  );
}

