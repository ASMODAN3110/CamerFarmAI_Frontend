

import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Bell, LogOut } from "lucide-react";
import styles from "./ChatboxPage.module.css";

export function ChatboxPage() {
  const [langue, setLangue] = useState<"FR" | "EN" | "Fulfulde">("FR");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    setAnswer(`(${langue}) Réponse IA simulée pour : "${question}"`);
    setQuestion("");
  };

  return (
    <div className={styles.chatboxPage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="CamerFarm AI" className={styles.logoImg} />
            <h1 className={styles.logoText}>CamerFarm AI</h1>
          </div>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Accueil</Link>
            <Link to="/plantation" className={styles.navLink}>Plantation</Link>
            <Link to="/ia" className={styles.navLinkActive}>IA</Link>
            <Link to="/support" className={styles.navLink}>Support</Link>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              onClick={() => {
                // ➤ Cycle entre FR → EN → Fulfulde → FR
                const nextLang =
                  langue === "FR" ? "EN" :
                  langue === "EN" ? "Fulfulde" :
                  "FR";
                setLangue(nextLang);
              }}
              className={styles.langButton}
            >
              <Globe className={styles.icon} />
              {langue === "FR"
                ? "🇫🇷 FR"
                : langue === "EN"
                ? "🇬🇧 EN"
                : "🇨🇲 Fulfulde"}
            </button>

            <button className={styles.notificationButton}>
              <Bell className={styles.icon} />
              <span className={styles.notificationCount}>2</span>
            </button>

            <button className={styles.logoutButton}>
              <LogOut className={styles.icon} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className={styles.main}>
        <h2 className={styles.title}>Assistance Intelligente (IA)</h2>

        <section className={styles.chatSection}>
          <h3 className={styles.subtitle}>Chat avec l’IA</h3>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              placeholder="Posez votre question..."
              className={styles.chatInput}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit} className={styles.chatButton}>
              Envoyer
            </button>
          </div>
          {answer && <p className={styles.chatAnswer}>{answer}</p>}
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>CamerFarm — Propulsé par l’intelligence agricole</p>
      </footer>
    </div>
  );
}
