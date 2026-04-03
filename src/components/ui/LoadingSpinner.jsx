import React from 'react';
import clsx from 'clsx';

/** Full-page loading overlay */
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral dark:bg-dark-bg">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <span className="font-heading text-sm text-neutral-400 dark:text-dark-muted tracking-widest uppercase">
          AYT Group
        </span>
      </div>
    </div>
  );
}

/** Inline spinner */
export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <svg
      className={clsx('animate-spin text-accent', sizeMap[size], className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default Spinner;
