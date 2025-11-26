import { Button } from '@/components/ui/Button/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './CTABlock.module.css';

interface CTABlockProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

export function CTABlock({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  className,
}: CTABlockProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.cta} ${className || ''} ${isVisible ? styles.ctaVisible : ''}`}
      role="region"
      aria-label="Appel à l'action"
    >
      <div className={styles.cta__container}>
        <h2 className={styles.cta__title}>{title}</h2>
        <p className={styles.cta__subtitle}>{subtitle}</p>
        <div className={styles.cta__buttonWrapper}>
          <Button variant="primary" size="lg" href={ctaHref} className={styles.cta__button}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

