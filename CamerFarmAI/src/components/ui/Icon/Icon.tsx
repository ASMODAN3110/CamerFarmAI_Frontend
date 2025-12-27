import { type ComponentType, type CSSProperties } from 'react';
import styles from './Icon.module.css';

export interface IconBaseProps {
  size?: number | string;
  className?: string;
  'aria-label'?: string;
  role?: string;
  style?: CSSProperties;
}

export type IconComponent = ComponentType<IconBaseProps>;

interface IconProps {
  icon: IconComponent;
  size?: number | string;
  className?: string;
  'aria-label'?: string;
  style?: CSSProperties;
}

export function Icon({ icon: IconComponent, size = 24, className, 'aria-label': ariaLabel, style }: IconProps) {
  const classes = [styles.icon, className].filter(Boolean).join(' ');

  return (
    <IconComponent
      className={classes}
      size={size}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      style={style}
    />
  );
}

