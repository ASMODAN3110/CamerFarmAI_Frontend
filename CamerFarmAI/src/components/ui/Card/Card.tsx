import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Card({ children, className, onClick, href }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}

