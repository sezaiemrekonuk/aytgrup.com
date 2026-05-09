import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BRAND } from '../../constants'; // eslint-disable-line no-unused-vars

/**
 * HeroSection — full-viewport hero with blueprint-grid background,
 * animated headings, stats bar, and dual CTAs.
 *
 * To use an actual video:
 *   1. Place your video file in /public/hero.mp4
 *   2. Uncomment the <video> element below and remove the gradient bg div.
 */
export default function HeroSection() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = ['/hero/slide-1.jpg', '/hero/slide-2.jpg', '/hero/slide-3.jpg'];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden -mt-[var(--header-height)]">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-primary" aria-hidden />
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide})` }}
          aria-hidden
        />
      ))}
      <div className="absolute inset-0 bg-primary/78" aria-hidden />
      <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-lg opacity-12" aria-hidden />

      {/* Soft edge line for structure */}
      <div className="absolute top-0 left-0 w-px h-full bg-white/20" aria-hidden />

      {/* ── Content ── */}
      <div className="container-site relative z-10 pt-[var(--header-height)] pb-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/40" />
            {t('hero.tagline')}
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-black text-5xl md:text-7xl text-white leading-[1.05] mb-6 whitespace-pre-line"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/projelerimiz" className="btn-accent shadow-none hover:shadow-none">
              {t('hero.cta.primary')}
              <ArrowRight />
            </Link>
            <Link to="/iletisim" className="btn-outline border-neutral-400 text-neutral-200 hover:border-white hover:bg-white/10 hover:text-white">
              {t('hero.cta.secondary')}
            </Link>
          </motion.div>
        </div>

        {/* ── Quick stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-xl"
        >
          <StatItem value="120+" label={t('hero.stats.completedProjects')} />
          <StatItem value="500K+" label={t('hero.stats.sqmBuilt')} />
          <StatItem value="350+" label={t('hero.stats.satisfiedClients')} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
      >
        <span className="text-xs font-heading tracking-widest uppercase">{t('common.scrollDown')}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/65 to-transparent" />
      </motion.div>
    </section>
  );
}

function StatItem({ value, label }) {
  return (
    <div>
      <p className="font-heading font-black text-3xl text-white">{value}</p>
      <p className="text-xs text-neutral-400 mt-1">{label}</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}
