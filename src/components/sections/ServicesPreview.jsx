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
    <section className="section-padding bg-white dark:bg-dark-card relative overflow-hidden">
      {/* Subtle blueprint lines */}
      <div className="absolute inset-0 bg-blueprint bg-grid-lg opacity-50" aria-hidden />

      <div className="container-site relative z-10">
        <SectionTitle
          eyebrow={t('services.title')}
          title={t('services.subtitle')}
          subtitle=""
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hizmetler" className="btn-outline">
            {t('services.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
