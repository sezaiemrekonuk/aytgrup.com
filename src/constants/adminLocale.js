/** Persisted preference for admin UI language (Turkish default, English optional). */
export const ADMIN_LANG_STORAGE_KEY = 'aytgroup-admin-lang';

/** Session-only: public-site language to restore when leaving /admin. */
export const PRE_ADMIN_LANG_SESSION_KEY = 'ayt-i18n-pre-admin';

/** @returns {'tr' | 'en'} */
export function getStoredAdminLanguage() {
  return localStorage.getItem(ADMIN_LANG_STORAGE_KEY) === 'en' ? 'en' : 'tr';
}

/** @param {'tr' | 'en'} lang */
export function persistAdminLanguage(lang) {
  const code = lang === 'en' ? 'en' : 'tr';
  localStorage.setItem(ADMIN_LANG_STORAGE_KEY, code);
  return code;
}
