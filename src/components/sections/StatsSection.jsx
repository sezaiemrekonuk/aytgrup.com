import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { COMPANY_STATS } from '../../constants';
import { useCountUp } from '../../hooks/useCountUp';

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary dark:bg-dark-bg py-16 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-sm opacity-40" aria-hidden />

      <div className="container-site relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10"
        >
          {t('stats.title')}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {COMPANY_STATS.map((stat, i) => (
            <StatCounter key={stat.key} stat={stat} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat, t, index }) {
  const { count, ref } = useCountUp(stat.value, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="font-heading font-black text-4xl md:text-5xl text-white">
        {count.toLocaleString()}
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm text-neutral-400 font-body">{t(`stats.${stat.key}`)}</p>
      {/* Thin gold divider */}
      <div className="mx-auto mt-3 h-px w-8 bg-accent/50" />
    </motion.div>
  );
}
