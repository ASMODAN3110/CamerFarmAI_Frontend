import { useState, useEffect } from 'react';
import styles from './HeroBlock.module.css';

interface HeroBlockProps {
  heading: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  className?: string;
  autoSlideInterval?: number;
}

export function HeroBlock({
  heading,
  backgroundImage,
  backgroundImages,
  className,
  autoSlideInterval = 5000,
}: HeroBlockProps) {
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  return (
    <section
      className={`${styles.hero} ${className || ''}`}
      role="region"
      aria-label="Section principale"
    >
      <div className={styles.hero__images}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.hero__image} ${
              index === currentIndex ? styles.hero__imageActive : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>
      <div className={styles.hero__overlay} />
      <div className={styles.hero__content}>
        <h1 className={styles.hero__heading} dangerouslySetInnerHTML={{ __html: heading }} />
      </div>
      {images.length > 1 && (
        <div className={styles.hero__indicators}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.hero__indicator} ${
                index === currentIndex ? styles.hero__indicatorActive : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

