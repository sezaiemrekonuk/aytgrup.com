/**
 * i18next Configuration
 *
 * Supports: Turkish (tr) · English (en) · Deutsch (de)
 * Turkish is the default language.
 * Language preference is persisted in localStorage via i18next-browser-languagedetector.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr/translation.json';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en', 'de'],
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      // Keep Turkish as default for first-time visitors.
      // If user selected a language before, localStorage still wins.
      order: ['localStorage', 'htmlTag'],
      lookupLocalStorage: 'aytgrup-lang',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
