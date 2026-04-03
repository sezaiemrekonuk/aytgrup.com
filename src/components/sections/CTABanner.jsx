import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CTABanner() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden bg-primary dark:bg-dark-bg">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
      {/* Gold accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" aria-hidden />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent" aria-hidden />

      <div className="container-site relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-4 leading-tight">
            {t('ctaBanner.title')}
          </h2>
          <p className="text-neutral-300 text-lg mb-10 max-w-xl mx-auto">
            {t('ctaBanner.subtitle')}
          </p>
          <Link to="/iletisim" className="btn-cta text-base px-8 py-4">
            {t('ctaBanner.cta')}
            <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}
