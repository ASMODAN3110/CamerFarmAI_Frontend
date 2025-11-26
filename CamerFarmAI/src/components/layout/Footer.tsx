import { Icon } from '@/components/ui/Icon/Icon';
import type { IconComponent } from '@/components/ui/Icon/Icon';
import { useTranslation } from '@/hooks/useTranslation';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: IconComponent;
}

interface FooterProps {
  description?: string;
  resources?: FooterLink[];
  legal?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
}

// Les labels seront traduits dynamiquement dans le composant
const defaultResourcesConfig = [
  { key: 'footer.resources.documentation' as const, href: '/docs' },
  { key: 'footer.resources.guide' as const, href: '/guide' },
  { key: 'nav.support' as const, href: '/support' },
];

const defaultLegalConfig = [
  { key: 'footer.legal.privacy' as const, href: '/privacy' },
  { key: 'footer.legal.terms' as const, href: '/terms' },
  { key: 'footer.legal.cookies' as const, href: '/cookies' },
];

const defaultSocialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebook },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
  { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
];

export function Footer({
  description,
  resources,
  legal,
  socialLinks = defaultSocialLinks,
  copyright,
}: FooterProps) {
  const { t } = useTranslation();

  // Utiliser les traductions si les props ne sont pas fournies
  const footerDescription = description || t('footer.description');
  const footerCopyright = copyright || t('footer.copyright');

  // Créer les ressources avec traductions
  const footerResources = resources || defaultResourcesConfig.map(item => ({
    label: t(item.key),
    href: item.href,
  }));

  // Créer les liens légaux avec traductions
  const footerLegal = legal || defaultLegalConfig.map(item => ({
    label: t(item.key),
    href: item.href,
  }));

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__container}>
        <div className={styles.footer__column}>
          <h3 className={styles.footer__title}>CamerFarm AI</h3>
          <p className={styles.footer__description}>{footerDescription}</p>
        </div>

        <div className={styles.footer__column}>
          <h4 className={styles.footer__subtitle}>{t('footer.resources.title')}</h4>
          <ul className={styles.footer__list}>
            {footerResources.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.footer__link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h4 className={styles.footer__subtitle}>{t('footer.legal.title')}</h4>
          <ul className={styles.footer__list}>
            {footerLegal.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.footer__link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h4 className={styles.footer__subtitle}>{t('footer.social.title')}</h4>
          <div className={styles.footer__social}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={styles.footer__socialLink}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={social.icon} size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer__copyright}>
        <p>{footerCopyright}</p>
      </div>
    </footer>
  );
}

