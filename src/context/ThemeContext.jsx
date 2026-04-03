import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../constants';

const ThemeContext = createContext(null);

/**
 * ThemeProvider — wraps the entire app and provides:
 *   isDark     : boolean
 *   toggleTheme: () => void
 *
 * The 'dark' class is toggled on <html> element, enabling Tailwind dark: variants.
 * Preference is persisted in localStorage.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== null) return stored === 'dark';
    // Default: respect OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
