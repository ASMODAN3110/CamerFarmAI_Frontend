import React, { useState } from "react";
import { Bell, User, Users, Wrench, PlusCircle, X, LogOut } from "lucide-react";
import styles from "./AdministrationPage.module.css";
import { useAuthStore } from '@/services/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '@/contexts/NotificationContext';

interface Farmer {
  name: string;
  status: "Actif" | "Inactif";
}

interface Technician {
  name: string;
  domain: string;
  status: "Actif" | "Inactif";
  actions?: string[];
}

export function AdminPage() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>([
    { name: "Abdoul", status: "Actif" },
    { name: "Pauline", status: "Actif" },
    { name: "Jean Pierre", status: "Inactif" },
  ]);

  const [technicians, setTechnicians] = useState<Technician[]>([
    { name: "Mr Fouda", domain: "IoT", status: "Inactif", actions: ['Voir'] },
  ]);

  // Create technician modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [newTechName, setNewTechName] = useState('');
  const [newTechDomain, setNewTechDomain] = useState('');
  const [newTechStatus, setNewTechStatus] = useState<Technician['status']>('Actif');
  const [newTechActions, setNewTechActions] = useState<string[]>(['Voir']);

  const handleDeleteFarmer = (index: number) => {
    setFarmers(farmers.filter((_, i) => i !== index));
  };

  const handleDeleteTechnician = (index: number) => {
    setTechnicians(technicians.filter((_, i) => i !== index));
  };

  const { notifications, isLoading: isLoadingNotifications, markAsRead, deleteNotification } = useNotificationContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={styles.adminPage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/logo.png" alt="CamerFarm AI" className={styles.logo} />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.iconButtonWrapper}>
            <button
              className={styles.iconButton}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
            >
              <Bell className={styles.icon} />
              {unreadCount > 0 && (
                <span className={styles.notificationBadge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
              )}
            </button>
            {notificationsOpen && (
              <div className={styles.notificationsDropdown}>
                <div className={styles.notificationsHeader}>
                  <strong>Notifications</strong>
                  <button className={styles.closeButton} onClick={() => setNotificationsOpen(false)}>×</button>
                </div>
                <div className={styles.notificationsList}>
                  {isLoadingNotifications ? (
                    <div className={styles.notificationEmpty}>Chargement...</div>
                  ) : notifications.length === 0 ? (
                    <div className={styles.notificationEmpty}>Aucune notification</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={styles.notificationItem}>
                        <div className={styles.notificationMessage}>{notif.event?.description || 'Notification'}</div>
                        <div className={styles.notificationActions}>
                          {!notif.isRead && (
                            <button onClick={() => markAsRead(notif.id)} className={styles.markReadButton}>Marquer lu</button>
                          )}
                          <button onClick={() => deleteNotification(notif.id)} className={styles.deleteButtonSmall}>Supprimer</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <User className={styles.icon} />
          <button
            className={styles.logoutButton}
            onClick={async () => {
              try {
                await logout();
                // authService.logout redirects, but ensure navigation as fallback
                navigate('/login');
              } catch (err) {
                console.error('Erreur lors de la déconnexion', err);
                navigate('/login');
              }
            }}
            aria-label="Déconnexion"
          >
            <LogOut size={18} />
            <span className={styles.logoutLabel}>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* CONTENU */}
      <main className={styles.main}>
        {/* Comptes Agriculteurs */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Users className={styles.sectionIcon} />
            <h2>Comptes Agriculteurs</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Noms</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((f, i) => (
                <tr key={i}>
                  <td>{f.name}</td>
                  <td
                    className={
                      f.status === "Actif" ? styles.statusActive : styles.statusInactive
                    }
                  >
                    {f.status}
                  </td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteFarmer(i)}
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Comptes Techniciens */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Wrench className={styles.sectionIcon} />
            <h2>Comptes Techniciens</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Noms</th>
                <th>Domaine</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>{t.domain}</td>
                  <td
                    className={
                      t.status === "Actif" ? styles.statusActive : styles.statusInactive
                    }
                  >
                    {t.status}
                  </td>
                  <td>
                    {t.actions && t.actions.length > 0 ? (
                      <div className={styles.actionsCell}>
                        {t.actions.map((a) => (
                          <span key={a} className={styles.actionBadge}>{a}</span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.actionBadge}>Aucune</span>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteTechnician(i)}
                      style={{ marginLeft: 12 }}
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styles.createButton} onClick={() => setCreateOpen(true)}>
            <PlusCircle size={18} />
            Créer un technicien
          </button>
        </section>
      </main>

      {createOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <h3>Créer un technicien</h3>

            <div className={styles.formRow}>
              <label>Nom</label>
              <input value={newTechName} onChange={(e) => setNewTechName(e.target.value)} />
            </div>

            <div className={styles.formRow}>
              <label>Domaine</label>
              <input value={newTechDomain} onChange={(e) => setNewTechDomain(e.target.value)} />
            </div>

            <div className={styles.formRow}>
              <label>Statut</label>
              <select value={newTechStatus} onChange={(e) => setNewTechStatus(e.target.value as Technician['status'])}>
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <label>Actions</label>
              <div className={styles.actionsCheckboxes}>
                {['Voir', 'Modifier', 'Supprimer'].map((action) => (
                  <label key={action} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={newTechActions.includes(action)}
                      onChange={(e) => {
                        if (e.target.checked) setNewTechActions(prev => [...prev, action]);
                        else setNewTechActions(prev => prev.filter(a => a !== action));
                      }}
                    />
                    <span>{action}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.createButton}
                onClick={() => {
                  if (!newTechName.trim() || !newTechDomain.trim()) return;
                  setTechnicians(prev => [...prev, { name: newTechName.trim(), domain: newTechDomain.trim(), status: newTechStatus, actions: newTechActions }]);
                  setNewTechName(''); setNewTechDomain(''); setNewTechStatus('Actif'); setNewTechActions(['Voir']); setCreateOpen(false);
                }}
              >Créer</button>
              <button className={styles.deleteButton} onClick={() => setCreateOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>Suivez Nous</p>
        <div className={styles.socials}>
          <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" /></a>
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="/icons/youtube.svg" alt="YouTube" /></a>
        </div>
        <p>© 2025 CamerFarm AI. Tous Droits Réservés.</p>
      </footer>
    </div>
  );
}
