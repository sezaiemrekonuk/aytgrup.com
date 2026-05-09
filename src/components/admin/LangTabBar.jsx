import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'tr', flag: '🇹🇷' },
  { code: 'en', flag: '🇬🇧' },
  { code: 'de', flag: '🇩🇪' },
];

/**
 * Shared language tab bar with an optional auto-translate button.
 *
 * Props
 *   activeLang   – 'tr' | 'en' | 'de'
 *   onLangChange – (code: string) => void
 *   onTranslate  – (fromLang: string) => void   (omit / undefined to hide button)
 *   translating  – boolean
 *   hasContent   – boolean  (disable translate when the active tab is empty)
 *   className    – extra wrapper classes
 */
export default function LangTabBar({
  activeLang,
  onLangChange,
  onTranslate,
  translating = false,
  hasContent  = true,
  className   = '',
}) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap items-center gap-3 mb-5 pb-4 border-b border-slate-100 ${className}`}>
      {/* Language tabs */}
      <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm font-medium">
        {LANGS.map(({ code, flag }) => (
          <button
            key={code}
            type="button"
            onClick={() => onLangChange(code)}
            className={`flex items-center gap-1.5 px-3.5 py-2 transition-colors select-none ${
              activeLang === code
                ? 'bg-[#1A2B3C] text-white'
                : 'text-slate-600 bg-white hover:bg-slate-50'
            }`}
          >
            <span aria-hidden="true">{flag}</span>
            <span>{t(`admin.multiLang.tabs.${code}`)}</span>
          </button>
        ))}
      </div>

      {/* Auto-translate */}
      {onTranslate && (
        <button
          type="button"
          onClick={() => onTranslate(activeLang)}
          disabled={translating || !hasContent}
          title={
            !hasContent
              ? t('admin.multiLang.noContent')
              : t('admin.multiLang.autoTranslate')
          }
          className="ml-auto flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {translating ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin shrink-0"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{t('admin.multiLang.translating')}</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{t('admin.multiLang.autoTranslate')}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
