import { useState, useEffect } from 'react';
import { Notification } from '@/services/notificationService';
import { plantationService } from '@/services/plantationService';
import { useTranslation } from '@/hooks/useTranslation';
import { formatSensorNotification, isSensorStatusNotification } from '@/utils/notificationFormatters';

/**
 * Hook personnalisé pour enrichir les notifications avec les noms de plantations
 * Récupère les noms de plantations manquants (affichés comme "undefined" ou "la plantation")
 * en interrogeant l'API.
 */
export function useEnrichedNotifications(notifications: Notification[]) {
    const [enrichedNotifications, setEnrichedNotifications] = useState<Notification[]>(notifications);
    const [plantationNamesCache, setPlantationNamesCache] = useState<Map<string, string>>(new Map());
    const [allPlantationsCache, setAllPlantationsCache] = useState<Map<string, string>>(new Map());
    const [allPlantationsLoaded, setAllPlantationsLoaded] = useState(false);
    const { t } = useTranslation();

    // Fonction locale pour récupérer le nom d'une plantation
    const getPlantationName = async (plantationId: string): Promise<string> => {
        if (plantationNamesCache.has(plantationId)) {
            return plantationNamesCache.get(plantationId)!;
        }

        try {
            const plantation = await plantationService.getById(plantationId);
            const name = plantation.name || 'la plantation';
            setPlantationNamesCache(prev => new Map(prev).set(plantationId, name));
            return name;
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn(`⚠️ Impossible de récupérer le nom de la plantation ${plantationId}:`, error);
            }
            return 'la plantation';
        }
    };

    useEffect(() => {
        let isMounted = true;

        const enrichNotifications = async () => {
            // Map pour stocker les descriptions enrichies par ID de notification
            const descriptionMap = new Map<string, string>();
            let hasChanges = false;

            // Identifier les notifications qui ont besoin d'enrichissement
            const notificationsToEnrich = notifications.filter(notif =>
                notif.event?.description &&
                (notif.event.description.includes('undefined') ||
                    notif.event.description.includes('"la plantation"'))
            );

            // Si aucune notification ne nécessite d'enrichissement via API
            if (notificationsToEnrich.length === 0) {
                // On traite quand même les formatages synchrones (comme les capteurs)
                const newNotifications = notifications.map(notif => {
                    let description = notif.event?.description || '';

                    if (isSensorStatusNotification(notif)) {
                        description = formatSensorNotification(notif, t);
                    }

                    if (description !== notif.event?.description) {
                        return {
                            ...notif,
                            event: {
                                ...notif.event!,
                                description
                            }
                        };
                    }
                    return notif;
                });

                if (isMounted) setEnrichedNotifications(newNotifications);
                return;
            }

            // Charger toutes les plantations une seule fois si nécessaire
            // C'est utile quand on ne peut pas déduire l'ID de la plantation de l'événement
            if (!allPlantationsLoaded && notificationsToEnrich.some(n =>
                n.event &&
                !n.event.actuator?.plantationId &&
                !n.event.sensor?.plantationId &&
                !(n.event as any).plantationId
            )) {
                try {
                    const plantations = await plantationService.getAll();
                    const newCache = new Map<string, string>();
                    plantations.forEach(p => {
                        newCache.set(p.id, p.name);
                        setPlantationNamesCache(prev => new Map(prev).set(p.id, p.name));
                    });
                    if (isMounted) {
                        setAllPlantationsCache(newCache);
                        setAllPlantationsLoaded(true);
                    }
                } catch (error) {
                    if (import.meta.env.DEV) {
                        console.warn('⚠️ Erreur lors de la récupération des plantations:', error);
                    }
                }
            }

            // Enrichir chaque notification
            for (const notif of notifications) {
                if (!notif.event) continue;

                let newDescription = notif.event.description;

                // 1. Formatage synchrone (capteurs)
                if (isSensorStatusNotification(notif)) {
                    newDescription = formatSensorNotification(notif, t);
                }

                // 2. Formatage asynchrone (noms de plantations manquants)
                const needsEnrichment = newDescription.includes('undefined') ||
                    newDescription.includes('"la plantation"');

                if (needsEnrichment) {
                    // Essayer de trouver le plantationId depuis l'événement
                    let plantationId = notif.event.plantationId ||
                        (notif.event as any).plantationId ||
                        notif.event.actuator?.plantationId ||
                        notif.event.sensor?.plantationId ||
                        // Pour mode_changed, essayer aussi dans les données brutes de l'événement
                        (notif.event.type === 'mode_changed' && (notif.event as any).plantation?.id);

                    let plantationName: string | null = null;

                    if (plantationId) {
                        if (allPlantationsCache.has(plantationId)) {
                            plantationName = allPlantationsCache.get(plantationId)!;
                        } else {
                            plantationName = await getPlantationName(plantationId);
                            if (isMounted) setAllPlantationsCache(prev => new Map(prev).set(plantationId!, plantationName!));
                        }
                    } else if (notif.event.type === 'mode_changed') {
                        // Logique de fallback si pas d'ID
                        if (allPlantationsCache.size > 0) {
                            plantationName = Array.from(allPlantationsCache.values())[0];
                        } else {
                            // Tentative de chargement si cache vide (déjà fait plus haut mais au cas où)
                            try {
                                const plantations = await plantationService.getAll();
                                if (plantations.length > 0) {
                                    plantationName = plantations[0].name;
                                }
                            } catch (e) { /* ignore */ }
                        }
                    }

                    if (plantationName) {
                        newDescription = newDescription.replace(/undefined/g, plantationName);
                        newDescription = newDescription.replace(/"la plantation"/g, `"${plantationName}"`);
                    }
                }

                if (newDescription !== notif.event.description) {
                    hasChanges = true;
                    descriptionMap.set(notif.id, newDescription);
                }
            }

            if (isMounted) {
                if (hasChanges || isSensorStatusNotification(notifications[0])) { // Check basic formatting too
                    const enriched = notifications.map(n => {
                        if (descriptionMap.has(n.id)) {
                            return {
                                ...n,
                                event: {
                                    ...n.event!,
                                    description: descriptionMap.get(n.id)!
                                }
                            };
                        }
                        // Also handle the synch formatting if it wasn't caught in "hasChanges" check for undefined
                        if (isSensorStatusNotification(n)) {
                            const formatted = formatSensorNotification(n, t);
                            if (formatted !== n.event?.description) {
                                return {
                                    ...n,
                                    event: {
                                        ...n.event!,
                                        description: formatted
                                    }
                                };
                            }
                        }
                        return n;
                    });
                    setEnrichedNotifications(enriched);
                } else {
                    setEnrichedNotifications(notifications);
                }
            }
        };

        if (notifications.length > 0) {
            enrichNotifications();
        } else {
            setEnrichedNotifications([]);
        }

        return () => {
            isMounted = false;
        };
    }, [notifications, allPlantationsLoaded]); // Dependent on loaded state to retry if needed, but mostly on notifications

    return enrichedNotifications;
}
