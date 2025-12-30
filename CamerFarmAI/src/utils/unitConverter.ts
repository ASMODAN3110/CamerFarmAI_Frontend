/**
 * Utilitaires de conversion d'unités de superficie
 * Le backend attend toujours les valeurs en m² (mètres carrés)
 */

export type AreaUnit = 'm²' | 'ha' | 'acre' | 'km²';

/**
 * Facteurs de conversion vers m²
 */
const CONVERSION_FACTORS: Record<AreaUnit, number> = {
  'm²': 1,
  'ha': 10000, // 1 hectare = 10 000 m²
  'acre': 4047, // 1 acre ≈ 4 047 m²
  'km²': 1000000, // 1 km² = 1 000 000 m²
};

/**
 * Convertit une valeur depuis une unité donnée vers m²
 * @param value - La valeur à convertir
 * @param unit - L'unité source
 * @returns La valeur en m²
 */
export function convertToM2(value: number, unit: AreaUnit): number {
  if (unit === 'm²') {
    return value;
  }
  return value * CONVERSION_FACTORS[unit];
}

/**
 * Convertit une valeur depuis m² vers une unité donnée
 * @param value - La valeur en m²
 * @param unit - L'unité cible
 * @returns La valeur convertie
 */
export function convertFromM2(value: number, unit: AreaUnit): number {
  if (unit === 'm²') {
    return value;
  }
  return value / CONVERSION_FACTORS[unit];
}

/**
 * Formate une valeur avec son unité pour l'affichage
 * @param value - La valeur à formater
 * @param unit - L'unité
 * @param decimals - Nombre de décimales (défaut: 2)
 * @returns La chaîne formatée
 */
export function formatArea(value: number, unit: AreaUnit, decimals: number = 2): string {
  return `${value.toFixed(decimals)} ${unit}`;
}

