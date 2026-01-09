import React, { useState, useEffect } from "react";
import { Users, Wrench, PlusCircle, X, Loader2 } from "lucide-react";
import styles from "./AdministrationPage.module.css";
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { Button } from '@/components/ui/Button/Button';
import { adminService, type UserListItem } from '@/services/adminService';
import { useTranslation } from '@/hooks/useTranslation';

export function AdminPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create technician modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [newTechPhone, setNewTechPhone] = useState('');
  const [newTechPassword, setNewTechPassword] = useState('');
  const [newTechFirstName, setNewTechFirstName] = useState('');
  const [newTechLastName, setNewTechLastName] = useState('');
  const [newTechEmail, setNewTechEmail] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Charger les utilisateurs au montage
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('technician.errors.loadData'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(t('admin.delete.confirm').replace('{name}', userName))) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      await fetchUsers(); // Rafraîchir la liste
    } catch (err) {
      alert(err instanceof Error ? err.message : t('admin.delete.error'));
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await adminService.updateUserStatus(userId, !currentStatus);
      await fetchUsers(); // Rafraîchir la liste
    } catch (err) {
      alert(err instanceof Error ? err.message : t('admin.update.error'));
    }
  };

  const handleCreateTechnician = async () => {
    if (!newTechPhone.trim() || !newTechPassword.trim()) {
      setCreateError(t('admin.create.form.required'));
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      await adminService.createTechnician({
        phone: newTechPhone.trim(),
        password: newTechPassword,
        firstName: newTechFirstName.trim() || undefined,
        lastName: newTechLastName.trim() || undefined,
        email: newTechEmail.trim() || undefined,
      });

      // Réinitialiser le formulaire
      setNewTechPhone('');
      setNewTechPassword('');
      setNewTechFirstName('');
      setNewTechLastName('');
      setNewTechEmail('');
      setCreateOpen(false);

      // Rafraîchir la liste
      await fetchUsers();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : t('admin.create.error'));
    } finally {
      setCreating(false);
    }
  };

  // Séparer les utilisateurs par rôle
  const farmers = users.filter(u => u.role === 'farmer');
  const technicians = users.filter(u => u.role === 'technician');

  const getUserDisplayName = (user: UserListItem) => {
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    return user.phone;
  };

  return (
    <div className={styles.adminPage}>
      <Background3D />
      <Header currentPath="/admin" showAuthIcons />

      {/* CONTENU */}
      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 size={24} className={styles.spinner} />
            <span>{t('admin.loading')}</span>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <Button variant="primary" size="sm" onClick={fetchUsers}>
              {t('admin.retry')}
            </Button>
          </div>
        ) : (
          <>
            {/* Comptes Agriculteurs */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Users className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>{t('admin.farmers.title')}</h2>
                <span className={styles.sectionBadge}>{farmers.length}</span>
              </div>
              {farmers.length === 0 ? (
                <div className={styles.emptyMessage}>{t('admin.farmers.empty')}</div>
              ) : (
                <div className={styles.cardsList}>
                  {farmers.map((farmer) => (
                    <div key={farmer.id} className={styles.card}>
                      <div className={styles.cardContent}>
                        <div className={styles.cardInfo}>
                          <div className={styles.cardName}>{getUserDisplayName(farmer)}</div>
                          <div className={styles.cardDetails}>
                            <span className={styles.cardDetail}>{farmer.phone}</span>
                            {farmer.email && (
                              <span className={styles.cardDetail}>{farmer.email}</span>
                            )}
                            <span className={`${styles.cardStatus} ${farmer.isActive ? styles.statusActive : styles.statusInactive}`}>
                              {farmer.isActive ? t('admin.user.active') : t('admin.user.inactive')}
                            </span>
                          </div>
                          <div className={styles.cardDetails}>
                            <span className={styles.cardDetail}>
                              {farmer.plantationsCount} {farmer.plantationsCount > 1 ? t('admin.user.plantations') : t('admin.user.plantation')}
                            </span>
                          </div>
                        </div>
                        <div className={styles.cardActions}>
                          <label className={styles.toggleSwitch}>
                            <input
                              type="checkbox"
                              checked={farmer.isActive}
                              onChange={() => handleToggleUserStatus(farmer.id, farmer.isActive)}
                            />
                            <span className={styles.toggleSlider}></span>
                          </label>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteUser(farmer.id, getUserDisplayName(farmer))}
                            aria-label="Supprimer"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Comptes Techniciens */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Wrench className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>{t('admin.technicians.title')}</h2>
                <span className={styles.sectionBadge}>{technicians.length}</span>
              </div>
              {technicians.length === 0 ? (
                <div className={styles.emptyMessage}>{t('admin.technicians.empty')}</div>
              ) : (
                <div className={styles.cardsList}>
                  {technicians.map((technician) => (
                    <div key={technician.id} className={styles.card}>
                      <div className={styles.cardContent}>
                        <div className={styles.cardInfo}>
                          <div className={styles.cardName}>{getUserDisplayName(technician)}</div>
                          <div className={styles.cardDetails}>
                            <span className={styles.cardDetail}>{technician.phone}</span>
                            {technician.email && (
                              <span className={styles.cardDetail}>{technician.email}</span>
                            )}
                            <span className={`${styles.cardStatus} ${technician.isActive ? styles.statusActive : styles.statusInactive}`}>
                              {technician.isActive ? t('admin.user.active') : t('admin.user.inactive')}
                            </span>
                          </div>
                        </div>
                        <div className={styles.cardActions}>
                          <label className={styles.toggleSwitch}>
                            <input
                              type="checkbox"
                              checked={technician.isActive}
                              onChange={() => handleToggleUserStatus(technician.id, technician.isActive)}
                            />
                            <span className={styles.toggleSlider}></span>
                          </label>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteUser(technician.id, getUserDisplayName(technician))}
                            aria-label="Supprimer"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.buttonWrapper}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setCreateOpen(true);
                    setCreateError(null);
                  }}
                >
                  <PlusCircle size={18} />
                  {t('admin.create.title')}
                </Button>
              </div>
            </section>
          </>
        )}
      </main>

      {createOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={(e) => {
          if (e.target === e.currentTarget) setCreateOpen(false);
        }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{t('admin.create.title')}</h3>

            {createError && (
              <div className={styles.errorMessage}>{createError}</div>
            )}

            <div className={styles.formRow}>
              <label>{t('admin.create.form.phone')}</label>
              <input
                type="tel"
                value={newTechPhone}
                onChange={(e) => setNewTechPhone(e.target.value)}
                placeholder={t('admin.create.form.phonePlaceholder')}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label>{t('admin.create.form.password')}</label>
              <input
                type="password"
                value={newTechPassword}
                onChange={(e) => setNewTechPassword(e.target.value)}
                placeholder={t('admin.create.form.passwordPlaceholder')}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label>{t('admin.create.form.firstName')}</label>
              <input
                type="text"
                value={newTechFirstName}
                onChange={(e) => setNewTechFirstName(e.target.value)}
                placeholder={t('admin.create.form.optional')}
              />
            </div>

            <div className={styles.formRow}>
              <label>{t('admin.create.form.lastName')}</label>
              <input
                type="text"
                value={newTechLastName}
                onChange={(e) => setNewTechLastName(e.target.value)}
                placeholder={t('admin.create.form.optional')}
              />
            </div>

            <div className={styles.formRow}>
              <label>{t('admin.create.form.email')}</label>
              <input
                type="email"
                value={newTechEmail}
                onChange={(e) => setNewTechEmail(e.target.value)}
                placeholder={t('admin.create.form.optional')}
              />
            </div>

            <div className={styles.modalActions}>
              <Button
                variant="primary"
                size="md"
                onClick={handleCreateTechnician}
                disabled={creating || !newTechPhone.trim() || !newTechPassword.trim()}
              >
                {creating ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    {t('admin.create.creating')}
                  </>
                ) : (
                  t('admin.create.button')
                )}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setCreateOpen(false);
                  setCreateError(null);
                  setNewTechPhone('');
                  setNewTechPassword('');
                  setNewTechFirstName('');
                  setNewTechLastName('');
                  setNewTechEmail('');
                }}
                disabled={creating}
              >
                {t('admin.create.cancel')}
              </Button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
