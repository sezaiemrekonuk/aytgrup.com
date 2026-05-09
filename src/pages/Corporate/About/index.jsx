import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../../components/SEO';
import SectionTitle from '../../../components/ui/SectionTitle';
import CTABanner from '../../../components/sections/CTABanner';

const VALUES = ['quality', 'trust', 'innovation', 'sustainability'];

const VALUE_ICONS = {
  quality:        '◈',
  trust:          '◇',
  innovation:     '◉',
  sustainability: '◎',
};

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="seo.about.title" descriptionKey="seo.about.description" canonicalPath="/kurumsal/hakkimizda" />

      {/* ── Page Header ── */}
      <section className="bg-primary dark:bg-dark-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
        <div className="container-site relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              Kurumsal
            </p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              {t('about.title')}
            </h1>
            <p className="text-neutral-300 text-lg max-w-xl">{t('about.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-padding bg-neutral dark:bg-dark-bg">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {t('about.content').split('\n\n').map((para, i) => (
                  <p key={i} className="text-neutral-600 dark:text-dark-muted leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { num: '120+', label: 'Tamamlanan Proje' },
                  { num: '500K+', label: 'm² İnşaat' },
                  { num: '350+', label: 'Memnun İş Ortağı' },
                  { num: '500+', label: 'Uzman Ekip' },
                ].map(({ num, label }) => (
                  <div key={label} className="border-l-accent pl-4">
                    <p className="font-heading font-black text-3xl text-primary dark:text-neutral-100">{num}</p>
                    <p className="text-sm text-neutral-500 dark:text-dark-muted mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-primary/5 dark:bg-dark-card rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75"
                  alt="AYT Grup Team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative gold frame */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-accent rounded -z-10" aria-hidden />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-site">
          <SectionTitle
            title={t('about.values.title')}
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-base p-6"
              >
                <span className="text-3xl text-accent mb-4 block">{VALUE_ICONS[value]}</span>
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

      <CTABanner />
    </>
  );
}
