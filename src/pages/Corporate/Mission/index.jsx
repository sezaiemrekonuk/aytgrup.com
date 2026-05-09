import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../../components/SEO';
import SectionTitle from '../../../components/ui/SectionTitle';

const VALUES = ['quality', 'trust', 'innovation', 'sustainability'];

export default function Mission() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Misyon & Vizyon – AYT Grup"
        description="AYT Grup misyon ve vizyon ifadeleri ile temel değerleri."
        canonicalPath="/kurumsal/misyon-vizyon"
      />

      {/* Header */}
      <section className="bg-primary dark:bg-dark-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
        <div className="container-site relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Kurumsal</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white">{t('mission.title')}</h1>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding bg-neutral dark:bg-dark-bg">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-base p-8 border-l-4 border-l-accent"
            >
              <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mb-6">
                <TargetIcon />
              </div>
              <h2 className="font-heading font-black text-2xl text-primary dark:text-neutral-100 mb-4">
                {t('mission.missionTitle')}
              </h2>
              <p className="text-neutral-600 dark:text-dark-muted leading-relaxed">
                {t('mission.missionContent')}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-base p-8 border-l-4 border-l-primary dark:border-l-accent-dark"
            >
              <div className="w-12 h-12 rounded bg-primary/10 dark:bg-accent/10 flex items-center justify-center mb-6">
                <TelescopeIcon />
              </div>
              <h2 className="font-heading font-black text-2xl text-primary dark:text-neutral-100 mb-4">
                {t('mission.visionTitle')}
              </h2>
              <p className="text-neutral-600 dark:text-dark-muted leading-relaxed">
                {t('mission.visionContent')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-site">
          <SectionTitle title={t('mission.valuesTitle')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-base p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-black text-xl text-accent">{i + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-primary dark:text-neutral-100 mb-2">
                  {t(`about.values.${value}.title`)}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-dark-muted leading-relaxed">
                  {t(`about.values.${value}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TargetIcon() {
  return (
    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function TelescopeIcon() {
  return (
    <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
