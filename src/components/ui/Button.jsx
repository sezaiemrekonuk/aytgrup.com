import React from 'react';
import clsx from 'clsx';

/**
 * Button — design-system aware button component.
 *
 * variants: 'primary' | 'accent' | 'cta' | 'outline' | 'ghost'
 * sizes:    'sm' | 'md' | 'lg'
 */
const sizeMap = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantMap = {
  primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark shadow-sm',
  accent:  'bg-accent text-primary hover:bg-accent-light active:bg-accent-dark shadow-accent',
  cta:     'bg-cta text-white hover:bg-cta-hover active:bg-cta-dark shadow-cta',
  outline: 'border-2 border-primary text-primary dark:border-neutral-300 dark:text-neutral-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white',
  ghost:   'text-primary dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-card',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'font-heading font-semibold tracking-wide rounded',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </Tag>
  );
}
