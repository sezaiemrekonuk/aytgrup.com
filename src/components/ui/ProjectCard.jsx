import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { StatusBadge, CategoryBadge } from './Badge';

/**
 * ProjectCard — interactive card used in the project gallery.
 * On hover: reveals a dark overlay with location and status.
 */
export default function ProjectCard({ project, index = 0 }) {
  const { t, i18n } = useTranslation();
  const lang        = i18n.language;

  const title    = project.title?.[lang]    || project.title?.tr    || '';
  const location = project.location?.[lang] || project.location?.tr || '';
  const heroImg  = project.heroImage || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link
        to={`/projelerimiz/${project.slug || project.id}`}
        className="group block card-base overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
        aria-label={title}
      >
        {/* ── Image Container ── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 dark:bg-dark-card">
          <img
            src={heroImg}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div
            className={clsx(
              'absolute inset-0 bg-card-overlay',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              'flex flex-col justify-end p-4',
            )}
          >
            <p className="text-white text-sm font-body flex items-center gap-1">
              <LocationIcon />
              {location}
            </p>
          </div>

          {/* Status badge always visible */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* ── Card Body ── */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-heading font-bold text-base text-primary dark:text-neutral-100 leading-snug line-clamp-2 flex-1">
              {title}
            </h3>
            <CategoryBadge category={project.category} />
          </div>

          <p className="text-sm text-neutral-500 dark:text-dark-muted flex items-center gap-1 mb-4">
            <LocationIcon className="shrink-0" />
            {location}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-dark-muted border-t border-neutral-100 dark:border-dark-border pt-4">
            {project.sqm && (
              <span>
                <span className="font-semibold text-primary dark:text-neutral-300">
                  {project.sqm.toLocaleString()}
                </span>{' '}
                m²
              </span>
            )}
            {project.completionDate && (
              <span>
                <span className="font-semibold text-primary dark:text-neutral-300">
                  {project.completionDate}
                </span>
              </span>
            )}
            <span className="ml-auto font-heading font-semibold text-accent text-xs group-hover:gap-2 flex items-center gap-1 transition-all">
              {t('common.viewProject')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function LocationIcon({ className = '' }) {
  return (
    <svg className={clsx('w-3.5 h-3.5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/** Skeleton loader for a project card */
export function ProjectCardSkeleton() {
  return (
    <div className="card-base overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-4 w-full rounded" />
      </div>
    </div>
  );
}
