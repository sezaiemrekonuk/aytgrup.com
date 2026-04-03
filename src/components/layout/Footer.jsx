import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND, SOCIAL_LINKS, NAV_ITEMS } from '../../constants';

export default function Footer() {
  const { t } = useTranslation();
  const year  = new Date().getFullYear();

  const flatLinks = NAV_ITEMS.flatMap((item) =>
    item.children
      ? item.children.map((c) => ({ key: c.key, path: c.path }))
      : [{ key: item.key, path: item.path }],
  );

  return (
    <footer className="bg-primary dark:bg-dark-bg text-neutral-300 no-print">
      {/* Blueprint grid overlay */}
      <div className="bg-blueprint-grid-dark bg-grid-md">
        <div className="container-site py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* ── Brand column ── */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4" aria-label="AYT Group">
                <span className="font-heading font-black text-2xl text-white">
                  AYT<span className="text-accent">.</span>
                  <span className="font-light text-neutral-400">Group</span>
                </span>
              </Link>
              <p className="text-sm text-neutral-400 mb-6 max-w-xs leading-relaxed">
                {t('footer.tagline')}
              </p>

              {/* Contact info */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <PhoneIcon />
                  <a href={`tel:${BRAND.phone}`} className="hover:text-accent transition-colors">
                    {BRAND.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MailIcon />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-accent transition-colors">
                    {BRAND.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPinIcon />
                  <address className="not-italic text-neutral-400 text-xs leading-relaxed">
                    {BRAND.addressFull?.tr}
                  </address>
                </li>
              </ul>
            </div>

            {/* ── Quick links ── */}
            <div>
              <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4">
                {t('footer.links.title')}
              </h3>
              <ul className="space-y-2">
                {flatLinks.slice(0, 8).map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-400 hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-accent text-xs">›</span>
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Social & legal ── */}
            <div>
              <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4">
                {t('footer.social.title')}
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="w-9 h-9 rounded border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-accent hover:text-accent transition-all"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>

              <div className="space-y-1.5 text-xs">
                <Link to="/gizlilik" className="block text-neutral-500 hover:text-accent transition-colors">
                  {t('footer.links.privacy')}
                </Link>
                <Link to="/kullanim-kosullari" className="block text-neutral-500 hover:text-accent transition-colors">
                  {t('footer.links.terms')}
                </Link>
                <Link to="/kvkk" className="block text-neutral-500 hover:text-accent transition-colors">
                  {t('footer.links.kvkk')}
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-neutral-800">
          <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
            <p>{t('footer.rights', { year })}</p>
            <p>{t('footer.madeWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function SocialIcon({ platform }) {
  const icons = {
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-4a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  };
  return icons[platform] || null;
}
