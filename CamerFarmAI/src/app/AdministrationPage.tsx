import React, { useState, useEffect } from "react";
import { Users, Wrench, PlusCircle, X, Loader2 } from "lucide-react";
import styles from "./AdministrationPage.module.css";
import { Header } from '@/components/layout/Header';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { Button } from '@/components/ui/Button/Button';
import { adminService, type UserListItem } from '@/services/adminService';

export function AdminPage() {
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
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${userName} ? Cette action est irréversible.`)) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      await fetchUsers(); // Rafraîchir la liste
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await adminService.updateUserStatus(userId, !currentStatus);
      await fetchUsers(); // Rafraîchir la liste
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const handleCreateTechnician = async () => {
    if (!newTechPhone.trim() || !newTechPassword.trim()) {
      setCreateError('Le téléphone et le mot de passe sont requis');
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
      setCreateError(err instanceof Error ? err.message : 'Erreur lors de la création');
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
            <span>Chargement...</span>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <Button variant="primary" size="sm" onClick={fetchUsers}>
              Réessayer
            </Button>
          </div>
        ) : (
          <>
            {/* Comptes Agriculteurs */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Users className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>Comptes Agriculteurs</h2>
                <span className={styles.sectionBadge}>{farmers.length}</span>
              </div>
              {farmers.length === 0 ? (
                <div className={styles.emptyMessage}>Aucun agriculteur</div>
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
                              {farmer.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </div>
                          <div className={styles.cardDetails}>
                            <span className={styles.cardDetail}>
                              {farmer.plantationsCount} {farmer.plantationsCount > 1 ? 'plantations' : 'plantation'}
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
                <h2 className={styles.sectionTitle}>Comptes Techniciens</h2>
                <span className={styles.sectionBadge}>{technicians.length}</span>
              </div>
              {technicians.length === 0 ? (
                <div className={styles.emptyMessage}>Aucun technicien</div>
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
                              {technician.isActive ? 'Actif' : 'Inactif'}
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
                  Créer un technicien
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
            <h3>Créer un technicien</h3>

            {createError && (
              <div className={styles.errorMessage}>{createError}</div>
            )}

            <div className={styles.formRow}>
              <label>Téléphone *</label>
              <input
                type="tel"
                value={newTechPhone}
                onChange={(e) => setNewTechPhone(e.target.value)}
                placeholder="+237612345678"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label>Mot de passe *</label>
              <input
                type="password"
                value={newTechPassword}
                onChange={(e) => setNewTechPassword(e.target.value)}
                placeholder="Minimum 8 caractères, majuscule, minuscule, chiffre, spécial"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label>Prénom</label>
              <input
                type="text"
                value={newTechFirstName}
                onChange={(e) => setNewTechFirstName(e.target.value)}
                placeholder="Optionnel"
              />
            </div>

            <div className={styles.formRow}>
              <label>Nom</label>
              <input
                type="text"
                value={newTechLastName}
                onChange={(e) => setNewTechLastName(e.target.value)}
                placeholder="Optionnel"
              />
            </div>

            <div className={styles.formRow}>
              <label>Email</label>
              <input
                type="email"
                value={newTechEmail}
                onChange={(e) => setNewTechEmail(e.target.value)}
                placeholder="Optionnel"
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
                    Création...
                  </>
                ) : (
                  'Créer'
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
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
