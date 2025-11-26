import { useLanguage } from '@/hooks/useLanguage';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'ff' as const, label: 'Fulfulde', flag: '🇨🇲' },
];

export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: 'fr' | 'en' | 'ff') => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.languageSwitcher__button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
      >
        <FaGlobe className={styles.languageSwitcher__icon} />
        <span className={styles.languageSwitcher__current}>
          {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
        </span>
        <FaChevronDown 
          className={`${styles.languageSwitcher__chevron} ${isOpen ? styles.languageSwitcher__chevronOpen : ''}`}
        />
      </button>
      {isOpen && (
        <div className={styles.languageSwitcher__dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.languageSwitcher__option} ${
                lang.code === language ? styles.languageSwitcher__optionActive : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={styles.languageSwitcher__flag}>{lang.flag}</span>
              <span className={styles.languageSwitcher__label}>{lang.label}</span>
              {lang.code === language && (
                <span className={styles.languageSwitcher__check}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

