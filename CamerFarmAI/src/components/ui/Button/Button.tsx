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
  ({ variant = 'primary', size = 'md', className, children, href, onClick, ...rest }, ref) => {
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (href) {
      // Extract HTML anchor attributes from rest
      const { type, ...anchorProps } = rest as any;
      return (
        <a
          href={href}
          className={classes}
          role="button"
          onClick={onClick as any}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref} type={buttonProps.type || 'button'} className={classes} {...buttonProps} onClick={onClick}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

