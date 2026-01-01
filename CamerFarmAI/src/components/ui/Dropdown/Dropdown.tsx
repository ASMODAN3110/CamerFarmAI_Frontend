import { useEffect, useRef, ReactNode } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

export function Dropdown({ isOpen, onClose, children, className, align = 'right' }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ajuster la position du dropdown pour éviter les débordements
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const adjustPosition = () => {
        const dropdown = dropdownRef.current;
        if (!dropdown) return;

        const parent = dropdown.parentElement;
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 16; // Espacement minimum depuis les bords
        const isMobile = viewportWidth <= 900;

        // Sur mobile, utiliser position fixed pour garantir la visibilité
        if (isMobile) {
          dropdown.style.position = 'fixed';
          
          // Calculer la position optimale
          const dropdownWidth = dropdownRect.width || 200;
          let left: number;
          let right: number | undefined;

          if (align === 'right') {
            // Essayer d'aligner à droite du parent
            right = viewportWidth - parentRect.right;
            left = undefined;
            
            // Si le dropdown déborde à gauche, aligner à gauche du viewport
            if (parentRect.right - dropdownWidth < padding) {
              left = padding;
              right = undefined;
            }
          } else {
            // Aligner à gauche du parent
            left = parentRect.left;
            right = undefined;
            
            // Si le dropdown déborde à droite, aligner à droite du viewport
            if (parentRect.left + dropdownWidth > viewportWidth - padding) {
              right = padding;
              left = undefined;
            }
          }

          // Position verticale : sous le parent
          const top = parentRect.bottom + 8; // margin-top équivalent
          dropdown.style.top = `${top}px`;
          
          if (left !== undefined) {
            dropdown.style.left = `${left}px`;
            dropdown.style.right = '';
          } else if (right !== undefined) {
            dropdown.style.right = `${right}px`;
            dropdown.style.left = '';
          }
        } else {
          // Sur desktop, utiliser position absolute normale mais ajuster si nécessaire
          dropdown.style.position = 'absolute';
          
          const rect = dropdown.getBoundingClientRect();
          let needsAdjustment = false;

          // Vérifier le débordement à gauche
          if (rect.left < padding) {
            needsAdjustment = true;
            dropdown.style.left = `${padding - parentRect.left}px`;
            dropdown.style.right = 'auto';
          }
          // Vérifier le débordement à droite
          else if (rect.right > viewportWidth - padding) {
            needsAdjustment = true;
            dropdown.style.right = `${viewportWidth - parentRect.right - padding}px`;
            dropdown.style.left = 'auto';
          } else {
            // Réinitialiser les styles si pas de débordement
            dropdown.style.left = '';
            dropdown.style.right = '';
            dropdown.style.top = '';
          }
        }
      };

      // Ajuster immédiatement et après un court délai pour s'assurer que le DOM est rendu
      adjustPosition();
      const timeoutId = setTimeout(adjustPosition, 0);
      
      // Réajuster lors du redimensionnement
      window.addEventListener('resize', adjustPosition);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', adjustPosition);
        // Réinitialiser les styles à la fermeture
        if (dropdownRef.current) {
          dropdownRef.current.style.position = '';
          dropdownRef.current.style.left = '';
          dropdownRef.current.style.right = '';
          dropdownRef.current.style.top = '';
        }
      };
    }
  }, [isOpen, align]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${styles[`dropdown--${align}`]} ${className || ''}`}
      role="menu"
    >
      {children}
    </div>
  );
}

