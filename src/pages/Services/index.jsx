import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import SectionTitle from '../../components/ui/SectionTitle';
import ServiceCard from '../../components/ui/ServiceCard';
import CTABanner from '../../components/sections/CTABanner';
import { SERVICES } from '../../constants';

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        titleKey="seo.services.title"
        descriptionKey="seo.services.description"
        canonicalPath="/hizmetler"
      />

      {/* Header */}
      <section className="bg-primary dark:bg-dark-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
        <div className="container-site relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              {t('services.title')}
            </p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">
              {t('services.subtitle')}
            </h1>
            <p className="text-neutral-300 text-lg max-w-xl">
              Uçtan uca inşaat çözümleri ile projelerinizi hayata geçiriyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-neutral dark:bg-dark-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.key} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-site">
          <SectionTitle
            eyebrow="Nasıl Çalışıyoruz?"
            title="Proje Sürecimiz"
            subtitle="Her projede aynı disiplin ve titizlikle çalışıyor, müşteri memnuniyetini her şeyin önünde tutuyoruz."
          />

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-accent/20" aria-hidden />

            {[
              { num: '01', title: 'Görüşme & Analiz', desc: 'Projenizin ihtiyaçlarını, bütçesini ve zaman çizelgesini detaylı şekilde değerlendiriyoruz.' },
              { num: '02', title: 'Tasarım & Planlama', desc: 'Mimarlar ve mühendisler ile kapsamlı proje planı ve maliyet analizi hazırlanır.' },
              { num: '03', title: 'İnşaat & Uygulama', desc: 'Uzman ekibimiz en yüksek kalite standartlarında inşaatı gerçekleştirir.' },
              { num: '04', title: 'Teslim & Destek', desc: 'Zamanında teslimat sonrası satış sonrası destek ve garanti hizmetleri sunulur.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-primary dark:bg-dark-bg border-4 border-accent flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="font-heading font-black text-accent text-sm">{step.num}</span>
                </div>
                <h3 className="font-heading font-bold text-primary dark:text-neutral-100 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-dark-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
