import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { FaRocket, FaBook, FaBolt, FaHeadset } from 'react-icons/fa';
import styles from './SupportPage.module.css';

export function SupportPage() {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Header currentPath="/support" />

            <main>
                <div className={styles.hero}>
                    <h1 className={styles.title}>{t('support.hero.title')}</h1>
                    <p className={styles.subtitle}>{t('support.hero.subtitle')}</p>
                </div>

                <div className={styles.mainContent}>
                    <h2 className={styles.sectionTitle}>{t('support.section.help.title')}</h2>

                    <div className={styles.cardGrid}>
                        <Link to="/guide" className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <FaRocket />
                            </div>
                            <h3 className={styles.cardTitle}>{t('support.cards.quickStart.title')}</h3>
                            <p className={styles.cardDescription}>{t('support.cards.quickStart.description')}</p>
                        </Link>

                        <Link to="/docs" className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <FaBook />
                            </div>
                            <h3 className={styles.cardTitle}>{t('support.cards.docs.title')}</h3>
                            <p className={styles.cardDescription}>{t('support.cards.docs.description')}</p>
                        </Link>

                        <Link to="/#features" className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <FaBolt />
                            </div>
                            <h3 className={styles.cardTitle}>{t('support.cards.features.title')}</h3>
                            <p className={styles.cardDescription}>{t('support.cards.features.description')}</p>
                        </Link>
                    </div>

                    <h2 className={styles.sectionTitle}>{t('support.section.contact.title')}</h2>
                    <div className={styles.cardGrid}>
                        <Link to="/ai" className={`${styles.card} ${styles.contactCard}`}>
                            <div className={styles.iconWrapper}>
                                <FaHeadset />
                            </div>
                            <h3 className={styles.cardTitle}>{t('support.cards.contact.title')}</h3>
                            <p className={styles.cardDescription}>{t('support.cards.contact.description')}</p>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
