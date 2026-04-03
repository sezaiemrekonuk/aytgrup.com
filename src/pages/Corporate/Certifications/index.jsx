import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../../components/SEO';
import { CERTIFICATIONS } from '../../../constants';

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Belgelerimiz – AYT Group"
        description="AYT Group kalite ve çevre sertifikaları: ISO 9001, ISO 14001, OHSAS 18001, TSE."
        canonicalPath="/kurumsal/belgelerimiz"
      />

      {/* Header */}
      <section className="bg-primary dark:bg-dark-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
        <div className="container-site relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Kurumsal</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              {t('certifications.title')}
            </h1>
            <p className="text-neutral-300 text-lg max-w-xl">{t('certifications.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Certificates grid */}
      <section className="section-padding bg-neutral dark:bg-dark-bg">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-base p-8 flex gap-6 items-start"
              >
                {/* Badge */}
                <div className="shrink-0 w-14 h-14 rounded bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <CertIcon />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-primary dark:text-neutral-100">
                      {t(`certifications.${cert.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-xs text-accent font-semibold mb-2">
                    {cert.issuer} · {cert.year}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-dark-muted leading-relaxed">
                    {t(`certifications.${cert.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <p className="mt-8 text-center text-xs text-neutral-400 dark:text-dark-muted">
            * Sertifikaların güncel kopyaları için lütfen{' '}
            <a href="/iletisim" className="text-accent hover:underline">bizimle iletişime geçin</a>.
          </p>
        </div>
      </section>
    </>
  );
}

function CertIcon() {
  return (
    <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
