import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { useScrolled } from '../../hooks/useScrollTop';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS, LANGUAGES, BRAND } from '../../constants';

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher({ scrolled }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          'flex items-center gap-1.5 px-2 py-1 rounded text-sm font-heading font-semibold hover:text-accent transition-colors',
          scrolled
            ? 'text-neutral-600 dark:text-neutral-300 dark:hover:text-accent'
            : 'text-neutral-200 hover:text-accent',
        )}
      >
        <span>{current.flag}</span>
        <span>{current.shortLabel}</span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="lang-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="nav-dropdown right-0 left-auto w-36"
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={i18n.language === lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                  className={clsx(
                    'w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors',
                    i18n.language === lang.code
                      ? 'text-accent font-semibold bg-accent/5'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-accent hover:bg-neutral-50 dark:hover:bg-dark-bg',
                  )}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle({ scrolled }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? t('common.lightMode') : t('common.darkMode')}
      className={clsx(
        'w-9 h-9 flex items-center justify-center rounded hover:text-accent transition-all',
        scrolled
          ? 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-card dark:hover:text-accent'
          : 'text-neutral-200 hover:bg-white/10',
      )}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

// ─── Desktop Dropdown Item ────────────────────────────────────────────────────
function NavDropdown({ item, t, scrolled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx('nav-link flex items-center gap-1', !scrolled && '!text-neutral-200')}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {t(`nav.${item.key}`)}
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="nav-dropdown"
          >
            {item.children.map((child) => (
              <NavLink
                key={child.key}
                to={child.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'block px-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'text-accent font-semibold bg-accent/5'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-accent hover:bg-neutral-50 dark:hover:bg-dark-bg',
                  )
                }
              >
                {t(`nav.${child.key}`)}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────
function MobileNav({ open, onClose, t }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-primary/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.nav
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-dark-card shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-dark-border">
              <LogoMark size="sm" />
              <button onClick={onClose} aria-label="Close menu" className="p-1 text-neutral-500 hover:text-primary dark:text-neutral-400">
                <CloseIcon />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <MobileDropdown key={item.key} item={item} onClose={onClose} t={t} />
                ) : (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      clsx(
                        'block px-4 py-3 rounded font-heading font-semibold text-sm transition-colors',
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-primary dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-dark-bg hover:text-accent',
                      )
                    }
                  >
                    {t(`nav.${item.key}`)}
                  </NavLink>
                ),
              )}
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-5 border-t border-neutral-100 dark:border-dark-border space-y-3">
              <a href={`mailto:${BRAND.email}`} className="btn-cta w-full justify-center">
                <MailIcon /> {BRAND.email}
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileDropdown({ item, onClose, t }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded font-heading font-semibold text-sm text-primary dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-dark-bg hover:text-accent transition-colors"
      >
        {t(`nav.${item.key}`)}
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4"
          >
            {item.children.map((child) => (
              <NavLink
                key={child.key}
                to={child.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'block px-4 py-2.5 text-sm rounded transition-colors',
                    isActive
                      ? 'text-accent font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-accent',
                  )
                }
              >
                {t(`nav.${child.key}`)}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark({ size = 'md', light = false }) {
  const sizes = { sm: 'h-9', md: 'h-10' };
  return (
    <Link to="/" aria-label="AYT Grup – Ana Sayfa">
      <img
        src="/AYT LOGO.png"
        alt="AYT Grup"
        className={clsx(sizes[size], 'w-auto', light ? 'drop-shadow-[0_0_8px_rgba(0,0,0,0.45)]' : '')}
        loading="eager"
      />
    </Link>
  );
}

// ─── Header (exported) ────────────────────────────────────────────────────────
export default function Header() {
  const { t } = useTranslation();
  const scrolled = useScrolled(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  const { pathname } = useLocation();
  useEffect(() => setMobileOpen(false), [pathname]);

  // Only the home page has the dark full-viewport hero — force light text
  // there when the header is still transparent (not scrolled).
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-30 transition-all duration-300 no-print',
          transparent
            ? 'bg-transparent'
            : 'bg-white/95 dark:bg-dark-card/95 backdrop-blur-md shadow-nav',
        )}
        style={{ height: 'var(--header-height)' }}
      >
        <div className="container-site h-full flex items-center justify-between">
          {/* Logo */}
          <LogoMark light={transparent} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <NavDropdown key={item.key} item={item} t={t} scrolled={!transparent} />
              ) : (
                <NavLink
                  key={item.key}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    clsx('nav-link', isActive && 'active', transparent && !isActive && '!text-neutral-200')
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ),
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle scrolled={!transparent} />
            <LanguageSwitcher scrolled={!transparent} />

            {/* CTA — desktop only */}
            <a
              href={`mailto:${BRAND.email}`}
              className="hidden md:inline-flex items-center gap-1.5 btn-cta py-2 px-4 text-xs"
            >
              <MailIcon /> {t('common.sendMessage')}
            </a>

            {/* Hamburger — mobile */}
            <button
              className={clsx(
                'lg:hidden p-2 rounded hover:text-accent transition-colors',
                transparent
                  ? 'text-neutral-200'
                  : 'text-neutral-600 dark:text-neutral-300',
              )}
              onClick={() => setMobileOpen(true)}
              aria-label={t('common.menu')}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide under the fixed header */}
      <div style={{ height: 'var(--header-height)' }} />

      {/* Mobile nav drawer */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} t={t} />
    </>
  );
}

// ─── Micro Icons ──────────────────────────────────────────────────────────────
function ChevronIcon({ open }) {
  return (
    <svg
      className={clsx('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
