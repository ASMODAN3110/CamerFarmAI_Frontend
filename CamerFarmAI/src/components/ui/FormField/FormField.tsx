import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const fieldId = id || `field-${props.name || 'input'}`;
    const hasError = !!error;

    return (
      <div className={styles.formField}>
        {label && (
          <label htmlFor={fieldId} className={styles.formField__label}>
            {label}
            {props.required && <span className={styles.formField__required}> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={fieldId}
          className={`${styles.formField__input} ${hasError ? styles.formField__inputError : ''} ${className || ''}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${fieldId}-error`} className={styles.formField__error} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${fieldId}-helper`} className={styles.formField__helper}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

