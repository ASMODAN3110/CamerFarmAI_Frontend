import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';
import styles from './ChatboxPage.module.css';

export function ChatboxPage() {
  const { t, language } = useTranslation();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async () => {
    if (!question.trim() || isLoading) return;
    
    setIsLoading(true);
    // Simuler une réponse IA (à remplacer par un appel API réel)
    setTimeout(() => {
      setAnswer(`(${language.toUpperCase()}) Réponse IA simulée pour : "${question}"`);
      setQuestion('');
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuestionSubmit();
    }
  };

  const navItems = useMemo(
    () => [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.plantations'), href: '/plantations' },
      { label: t('nav.ai'), href: '/ai' },
      { label: t('nav.support'), href: '/support' },
    ],
    [t]
  );

  return (
    <>
      <Background3D />
      <Header navItems={navItems} currentPath="/ai" showAuthIcons />
      <main className={styles.chatboxPage}>
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <div className={styles.iconWrapper}>
              <FaRobot className={styles.aiIcon} />
            </div>
            <h1 className={styles.title}>Assistance Intelligente (IA)</h1>
            <p className={styles.description}>
              Posez vos questions sur l'agriculture, les plantations, les capteurs et obtenez des réponses intelligentes.
            </p>
          </div>

          <section className={styles.chatSection}>
            <div className={styles.chatContainer}>
              {answer && (
                <div className={styles.answerContainer}>
                  <div className={styles.answerBubble}>
                    <FaRobot className={styles.answerIcon} />
                    <div className={styles.answerContent}>
                      <p className={styles.answerText}>{answer}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Posez votre question sur l'agriculture..."
                  className={styles.chatInput}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleQuestionSubmit}
                  disabled={!question.trim() || isLoading}
                  className={styles.sendButton}
                  variant="primary"
                >
                  <FaPaperPlane className={styles.sendIcon} />
                  {isLoading ? 'Envoi...' : 'Envoyer'}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingButton href="/support" position="bottom-right" aria-label={t('floatingButton.ariaLabel')} />
    </>
  );
}
