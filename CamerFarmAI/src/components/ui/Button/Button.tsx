import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, href, onClick, isLoading = false, ...rest }, ref) => {
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      isLoading ? styles.loading : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = isLoading ? (
      <>
        <span className={styles.spinner} />
        <span style={{ opacity: 0 }}>{children}</span>
        <span className={styles.loadingText}>{children}</span>
      </>
    ) : (
      children
    );

    if (href && !isLoading) {
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
      <button
        ref={ref}
        type={buttonProps.type || 'button'}
        className={classes}
        {...buttonProps}
        onClick={onClick}
        disabled={isLoading || buttonProps.disabled}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

