import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../../constants';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../ui/ServiceCard';

export default function ServicesPreview() {
  const { t } = useTranslation();
  const featured = SERVICES.filter((s) => s.featured);

  return (
    <section className="section-padding relative overflow-hidden bg-[#0f1824]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero/services-preview-bg.jpg')" }}
        aria-hidden
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-[#0b1421]/70" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1421]/75 via-[#0b1421]/55 to-[#0b1421]/85" aria-hidden />
      <div className="absolute inset-0 bg-blueprint bg-grid-lg opacity-20" aria-hidden />

      <div className="container-site relative z-10">
        <SectionTitle
          eyebrow={t('services.title')}
          title={t('services.subtitle')}
          subtitle=""
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hizmetler" className="btn-outline border-neutral-200 text-white hover:border-white hover:bg-white/10 hover:text-white">
            {t('services.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
