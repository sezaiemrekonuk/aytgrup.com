import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

// ─── Icon map — add new icons here as needed ──────────────────────────────────
const ICONS = {
  HardHat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a9 9 0 0 1 9 9v1H3v-1a9 9 0 0 1 9-9z" />
      <path d="M3 13h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" />
      <path d="M12 2v10" />
    </svg>
  ),
  City: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="18" rx="1" />
      <path d="M16 8h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H16" />
      <path d="M5 7h2M5 11h2M5 15h2M9 7h2M9 11h2M9 15h2" />
    </svg>
  ),
  Home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Office: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M8 3v18M16 3v18M2 9h20M2 15h20" />
    </svg>
  ),
  Factory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V9l6-4v4l6-4v4l6-4v15H2z" />
      <path d="M6 20v-6h4v6M14 20v-4h4v4" />
    </svg>
  ),
  Wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const accentColorMap = {
  accent:  'text-accent bg-accent/10 dark:bg-accent/15',
  primary: 'text-primary bg-primary/10 dark:bg-primary-light/20 dark:text-neutral-300',
  cta:     'text-cta bg-cta/10 dark:bg-cta/15',
};

/**
 * ServiceCard — displays a service offering.
 * Props: `serviceKey` (from SERVICES constant), `service` (the service object)
 */
export default function ServiceCard({ service, index = 0 }) {
  const { t } = useTranslation();
  const icon  = ICONS[service.icon] || ICONS.Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={clsx(
        'card-base p-6 group',
        'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          'w-12 h-12 rounded flex items-center justify-center mb-5',
          'transition-colors duration-300',
          accentColorMap[service.color] ?? accentColorMap.accent,
        )}
      >
        <div className="w-6 h-6">{icon}</div>
      </div>

      {/* Gold left accent on hover */}
      <div className="border-l-accent pl-4">
        <h3 className="font-heading font-bold text-lg text-primary dark:text-neutral-100 mb-2">
          {t(`services.${service.key}.title`)}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-dark-muted leading-relaxed">
          {t(`services.${service.key}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}
