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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Button.tsx:15',message:'Button component entry',data:{hasHref:!!href,variant,size},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (href) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Button.tsx:28',message:'Rendering anchor tag',data:{href,hasAriaLabel:'aria-label' in rest,restKeys:Object.keys(rest)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // Extract HTML anchor attributes from rest
      const { type, ...anchorProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
      return (
        <a 
          href={href} 
          className={classes} 
          role="button" 
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
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

