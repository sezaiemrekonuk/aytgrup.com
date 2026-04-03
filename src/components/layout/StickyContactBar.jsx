import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND } from '../../constants';

/**
 * StickyContactBar — always visible on mobile at the bottom of the screen.
 * Provides instant access to phone call and quote form (3-click rule).
 */
export default function StickyContactBar() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-white dark:bg-dark-card border-t border-neutral-200 dark:border-dark-border shadow-nav no-print">
      <div className="grid grid-cols-2 h-14">
        <a
          href={`tel:${BRAND.phone}`}
          className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-light transition-colors"
        >
          <PhoneIcon /> {t('common.callNow')}
        </a>
        <Link
          to="/iletisim"
          className="flex items-center justify-center gap-2 bg-cta text-white text-sm font-heading font-semibold hover:bg-cta-hover transition-colors"
        >
          <QuoteIcon /> {t('common.getQuote')}
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function QuoteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
