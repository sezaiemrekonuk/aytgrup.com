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
          href={`mailto:${BRAND.email}`}
          className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-light transition-colors"
        >
          <MailIcon /> {t('common.sendMessage')}
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

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
