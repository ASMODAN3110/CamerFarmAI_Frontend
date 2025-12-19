import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { FeatureGrid } from '@/components/blocks/FeatureGrid';
import type { FeatureItem } from '@/components/blocks/FeatureGrid';
import { IntelligentAgricultureBlock } from '@/components/blocks/IntelligentAgricultureBlock';
import { BenefitsBlock } from '@/components/blocks/BenefitsBlock';
import type { BenefitItem } from '@/components/blocks/BenefitsBlock';
import { CTABlock } from '@/components/blocks/CTABlock';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  FaBolt,
  FaStar,
  FaChartLine,
  FaArrowUp,
  FaLightbulb,
  FaTint
} from 'react-icons/fa';

export function HomePage() {
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      icon: FaBolt,
      title: t('features.automation.title'),
      description: t('features.automation.description'),
    },
    {
      icon: FaStar,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
    },
    {
      icon: FaChartLine,
      title: t('features.realtime.title'),
      description: t('features.realtime.description'),
    },
  ];

  const benefits: BenefitItem[] = [
    {
      icon: FaArrowUp,
      title: t('benefits.yield.title'),
    },
    {
      icon: FaLightbulb,
      title: t('benefits.energy.title'),
    },
    {
      icon: FaTint,
      title: t('benefits.water.title'),
    },
  ];

  return (
    <>
      <Background3D />
      <Header currentPath="/" />
      <main>
        <HeroBlock 
          heading={t('hero.heading')}
          backgroundImages={[
            'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80', // Agriculture africaine - champs et cultures
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80', // Plantations et agriculture au Cameroun
            'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80', // Agriculture moderne et serres
            'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80', // Agriculture technologique
          ]}
          autoSlideInterval={6000}
        />
        <FeatureGrid items={features} columns={3} />
        <IntelligentAgricultureBlock
          title={t('intelligent.title')}
          description={t('intelligent.description')}
        />
        <BenefitsBlock benefits={benefits} />
        <CTABlock
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          ctaLabel={t('cta.button')}
          ctaHref="/support"
        />
      </main>
      <Footer />
      <FloatingButton
        href="/support"
        position="bottom-right"
        aria-label={t('floatingButton.ariaLabel')}
      />
    </>
  );
}

