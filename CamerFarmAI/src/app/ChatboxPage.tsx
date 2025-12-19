import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { FaRobot, FaPaperPlane, FaUser, FaLightbulb } from 'react-icons/fa';
import styles from './ChatboxPage.module.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ChatboxPage() {
  const { t, language } = useTranslation();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionSubmit = async () => {
    if (!question.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simuler une réponse IA (à remplacer par un appel API réel)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `(${language.toUpperCase()}) ${t('chatbox.aiResponse.prefix')} "${userMessage.content}"\n\n${t('chatbox.aiResponse.intro')}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion);
  };

  // Questions suggérées avec traductions
  const suggestedQuestions = useMemo(() => [
    t('chatbox.suggestedQuestions.question1'),
    t('chatbox.suggestedQuestions.question2'),
    t('chatbox.suggestedQuestions.question3'),
    t('chatbox.suggestedQuestions.question4'),
  ], [t]);


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
              <div className={styles.iconCircle}>
                <FaRobot className={styles.aiIcon} />
              </div>
            </div>
            <h1 className={styles.title}>{t('chatbox.title')}</h1>
            <p className={styles.description}>
              {t('chatbox.description')}
            </p>
          </div>

          <section className={styles.chatSection}>
            <div className={styles.chatContainer} ref={chatContainerRef}>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <FaRobot className={styles.emptyIcon} />
                  <h3 className={styles.emptyTitle}>{t('chatbox.emptyState.title')}</h3>
                  <p className={styles.emptyDescription}>
                    {t('chatbox.emptyState.description')}
                  </p>
                  
                  <div className={styles.suggestionsContainer}>
                    <div className={styles.suggestionsHeader}>
                      <FaLightbulb className={styles.suggestionsIcon} />
                      <span>{t('chatbox.suggestionsHeader')}</span>
                    </div>
                    <div className={styles.suggestionsGrid}>
                      {suggestedQuestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className={styles.suggestionCard}
                          onClick={() => handleSuggestedQuestion(suggestion)}
                          type="button"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.messagesContainer}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.messageWrapper} ${
                        message.type === 'user' ? styles.messageUser : styles.messageAI
                      }`}
                    >
                      <div className={styles.messageBubble}>
                        {message.type === 'ai' && (
                          <div className={styles.messageAvatar}>
                            <FaRobot className={styles.messageAvatarIcon} />
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className={styles.messageAvatar}>
                            <FaUser className={styles.messageAvatarIcon} />
                          </div>
                        )}
                        <div className={styles.messageContent}>
                          <p className={styles.messageText}>{message.content}</p>
                          <span className={styles.messageTime}>
                            {message.timestamp.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={`${styles.messageWrapper} ${styles.messageAI}`}>
                      <div className={styles.messageBubble}>
                        <div className={styles.messageAvatar}>
                          <FaRobot className={styles.messageAvatarIcon} />
                        </div>
                        <div className={styles.messageContent}>
                          <div className={styles.typingIndicator}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              <div className={styles.inputContainer}>
                <div className={styles.inputZone}>
                  <div className={styles.inputLabel}>
                    <FaUser className={styles.inputLabelIcon} />
                    <span>{t('chatbox.inputLabel')}</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <textarea
                      placeholder={t('chatbox.inputPlaceholder')}
                      className={styles.chatInput}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleQuestionSubmit();
                        }
                      }}
                      disabled={isLoading}
                      rows={3}
                    />
                    <Button
                      onClick={handleQuestionSubmit}
                      disabled={!question.trim() || isLoading}
                      className={styles.sendButton}
                      variant="primary"
                    >
                      <FaPaperPlane className={styles.sendIcon} />
                      {isLoading ? t('chatbox.sending') : t('chatbox.sendButton')}
                    </Button>
                  </div>
                  <div className={styles.inputFooter}>
                    <span className={styles.inputHint}>
                      {messages.length === 0 
                        ? t('chatbox.inputHint')
                        : `${question.length} ${question.length > 1 ? t('chatbox.characters') : t('chatbox.characterCount')}`
                      }
                    </span>
                  </div>
                </div>
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
