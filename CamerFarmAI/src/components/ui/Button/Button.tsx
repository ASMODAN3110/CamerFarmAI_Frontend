import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, href, ...props }, ref) => {
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (href) {
      return (
        <a 
          href={href} 
          className={classes} 
          role="button" 
          aria-label={props['aria-label']}
          onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} type={props.type || 'button'} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

