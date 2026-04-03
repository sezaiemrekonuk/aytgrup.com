import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO title="404 – AYT Group" noIndex />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-neutral dark:bg-dark-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading font-black text-[120px] leading-none text-primary/10 dark:text-neutral-800 select-none">
            404
          </p>
          <h1 className="font-heading font-black text-3xl text-primary dark:text-neutral-100 -mt-8 mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-neutral-500 dark:text-dark-muted mb-8 max-w-sm">
            {t('notFound.subtitle')}
          </p>
          <Link to="/" className="btn-accent">
            {t('notFound.back')}
          </Link>
        </motion.div>
      </div>
    </>
  );
}
