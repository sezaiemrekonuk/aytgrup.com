import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import i18n from '../../i18n';
import {
  getStoredAdminLanguage,
  PRE_ADMIN_LANG_SESSION_KEY,
} from '../../constants/adminLocale';

/**
 * Keeps admin UI in Turkish by default (or English if chosen), independent of
 * the public site language. Restores the previous i18n language when leaving /admin.
 */
export default function AdminI18nBoundary() {
  useEffect(() => {
    const previous = i18n.language;
    sessionStorage.setItem(PRE_ADMIN_LANG_SESSION_KEY, previous);
    i18n.changeLanguage(getStoredAdminLanguage());

    return () => {
      const restore = sessionStorage.getItem(PRE_ADMIN_LANG_SESSION_KEY);
      sessionStorage.removeItem(PRE_ADMIN_LANG_SESSION_KEY);
      if (restore) i18n.changeLanguage(restore);
    };
  }, []);

  return <Outlet />;
}
