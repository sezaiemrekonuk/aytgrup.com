import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

/**
 * SectionTitle — consistent heading block used across all page sections.
 *
 * Props:
 *   eyebrow   : small text above the main heading
 *   title     : main heading (required)
 *   subtitle  : descriptive text below the heading
 *   align     : 'left' | 'center' (default: 'center')
 *   light     : render on a dark background (inverts colours)
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={clsx('mb-12', isCenter ? 'text-center' : 'text-left', className)}
    >
      {eyebrow && (
        <p
          className={clsx(
            'font-heading text-xs font-semibold tracking-[0.2em] uppercase mb-3',
            light ? 'text-accent-light' : 'text-accent',
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={clsx(
          'font-heading text-3xl md:text-4xl font-bold leading-tight',
          light ? 'text-white' : 'text-primary dark:text-neutral-100',
        )}
      >
        {title}
      </h2>

      {/* Gold divider */}
      <div
        className={clsx(
          'h-0.5 w-12 bg-accent mt-4',
          isCenter ? 'mx-auto' : 'ml-0',
        )}
      />

      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-base md:text-lg leading-relaxed max-w-2xl',
            isCenter ? 'mx-auto' : '',
            light ? 'text-neutral-300' : 'text-neutral-500 dark:text-dark-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
