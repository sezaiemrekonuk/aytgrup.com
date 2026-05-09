/**
 * AYT Grup – Design System & Application Constants
 *
 * This file is the single source of truth for all design tokens,
 * navigation structure, static company data, and configuration maps.
 * Change values here to update the whole site.
 */

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'AYT Grup',
  tagline: {
    tr: 'Geleceği İnşa Ediyoruz',
    en: 'Building the Future',
    de: 'Die Zukunft bauen',
  },
  domain: 'aytgrup.com',
  email: 'info@aytgrup.com',
  phone: '+90 312 000 00 00',
  whatsapp: '+905000000000',
  address: {
    tr: 'Aşağı Öveçler, Çankaya, Ankara, Türkiye',
    en: 'Asagi Ovecler, Cankaya, Ankara, Turkey',
    de: 'Asagi Ovecler, Cankaya, Ankara, Turkei',
  },
  addressFull: {
    tr: 'Aşağı Öveçler, 1328. Sk. No:10/6, 06460 Çankaya / Ankara',
    en: 'Asagi Ovecler, 1328 St. No:10/6, 06460 Cankaya / Ankara',
    de: 'Asagi Ovecler, 1328 Str. Nr.10/6, 06460 Cankaya / Ankara',
  },
  workingHours: {
    tr: 'Pazartesi – Cumartesi: 08:00 – 18:00',
    en: 'Monday – Saturday: 08:00 – 18:00',
    de: 'Montag – Samstag: 08:00 – 18:00',
  },
  // Google Maps embed URL — replace with your actual embed link
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.165931781368!2d32.82502037617677!3d39.892917071528686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345807a261a5d%3A0x813ea92dd78c5f0e!2sMige%20M%C3%BChendislik!5e0!3m2!1str!2str!4v1758633322211!5m2!1str!2str',
};

// ─── Social Media ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { platform: 'linkedin', url: 'https://linkedin.com/company/aytgrup', icon: 'linkedin' },
  { platform: 'instagram', url: 'https://instagram.com/aytgrup', icon: 'instagram' },
  { platform: 'twitter', url: 'https://twitter.com/aytgrup', icon: 'twitter' },
  { platform: 'facebook', url: 'https://facebook.com/aytgrup', icon: 'facebook' },
];

// ─── Navigation ───────────────────────────────────────────────────────────────
/**
 * Each nav item can have children (dropdown).
 * `key` is used for i18n: nav.<key>
 * `path` is the React Router path.
 */
export const NAV_ITEMS = [
  { key: 'home', path: '/' },
  {
    key: 'corporate',
    path: '/kurumsal',
    children: [
      { key: 'about', path: '/kurumsal/hakkimizda' },
      { key: 'mission', path: '/kurumsal/misyon-vizyon' },
      { key: 'certifications', path: '/kurumsal/belgelerimiz' },
    ],
  },
  {
    key: 'projects',
    path: '/projelerimiz',
    children: [
      { key: 'completed', path: '/projelerimiz?status=completed' },
      { key: 'ongoing', path: '/projelerimiz?status=ongoing' },
    ],
  },
  { key: 'services', path: '/hizmetler' },
  { key: 'contact', path: '/iletisim' },
];

// ─── Project Categories ───────────────────────────────────────────────────────
export const PROJECT_CATEGORIES = [
  { key: 'all', color: 'primary' },
  { key: 'residential', color: 'accent' },
  { key: 'commercial', color: 'primary' },
  { key: 'industrial', color: 'cta' },
];

// ─── Project Status Map ───────────────────────────────────────────────────────
export const PROJECT_STATUS = {
  completed: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  ongoing: { color: 'bg-cta/10 text-cta dark:bg-cta/20 dark:text-cta-light' },
};

// ─── Progress Stages (for ongoing projects) ───────────────────────────────────
export const PROGRESS_STAGES = ['foundation', 'structure', 'finishing'];

// ─── Company Stats ────────────────────────────────────────────────────────────
export const COMPANY_STATS = [
  { key: 'projects', value: 120, suffix: '+', icon: 'building' },
  { key: 'years', value: 25, suffix: '+', icon: 'calendar' },
  { key: 'sqm', value: 500, suffix: 'K+', icon: 'ruler' },
  { key: 'clients', value: 350, suffix: '+', icon: 'users' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
/**
 * Static service definitions. Extend `icon` with any Heroicon or custom SVG name.
 * The `key` maps to services.<key> in translations.
 */
export const SERVICES = [
  {
    key: 'contracting',
    icon: 'HardHat',
    color: 'accent',
    featured: true,
  },
  {
    key: 'urbanTransformation',
    icon: 'City',
    color: 'primary',
    featured: true,
  },
  {
    key: 'residential',
    icon: 'Home',
    color: 'cta',
    featured: true,
  },
  {
    key: 'commercial',
    icon: 'Office',
    color: 'accent',
    featured: false,
  },
  {
    key: 'industrial',
    icon: 'Factory',
    color: 'primary',
    featured: false,
  },
  {
    key: 'renovation',
    icon: 'Wrench',
    color: 'cta',
    featured: false,
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
  { key: 'iso9001', year: 2018, issuer: 'TÜV Rheinland' },
  { key: 'iso14001', year: 2019, issuer: 'TÜV Rheinland' },
  { key: 'ohsas18001', year: 2020, issuer: 'Bureau Veritas' },
  { key: 'tse', year: 2015, issuer: 'TSE' },
];

// ─── Seed Projects (optional dev-only) ─────────────────────────────────────────
/** Empty by default — add entries here temporarily if you need `seedProjects()`, or manage projects in Firestore / Admin. */
export const SEED_PROJECTS = [];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    nameKey: 'testimonial1Name',
    roleKey: 'testimonial1Role',
    contentKey: 'testimonial1',
    rating: 5,
    avatar: null,
  },
  {
    id: 2,
    nameKey: 'testimonial2Name',
    roleKey: 'testimonial2Role',
    contentKey: 'testimonial2',
    rating: 5,
    avatar: null,
  },
  {
    id: 3,
    nameKey: 'testimonial3Name',
    roleKey: 'testimonial3Role',
    contentKey: 'testimonial3',
    rating: 5,
    avatar: null,
  },
];

// ─── Language Configuration ───────────────────────────────────────────────────
export const LANGUAGES = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', shortLabel: 'TR' },
  { code: 'en', label: 'English', flag: '🇬🇧', shortLabel: 'EN' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', shortLabel: 'DE' },
];

export const DEFAULT_LANGUAGE = 'tr';

// ─── SEO Defaults ─────────────────────────────────────────────────────────────
export const SEO_DEFAULTS = {
  siteName: 'AYT Grup',
  separator: ' | ',
  twitterHandle: '@aytgrup',
  ogImageUrl: '/og-image.jpg', // place a 1200x630 image in /public
};

// ─── Theme ────────────────────────────────────────────────────────────────────
export const THEME_STORAGE_KEY = 'aytgrup-theme';
export const LANG_STORAGE_KEY = 'aytgrup-lang';

// ─── Firestore Collection Names ───────────────────────────────────────────────
export const COLLECTIONS = {
  PROJECTS: 'projects',
  SERVICES: 'services',
  CONTACTS: 'contacts',
  SETTINGS: 'settings',
  REVIEWS:  'reviews',
};

// ─── Pagination ───────────────────────────────────────────────────────────────
export const PROJECTS_PER_PAGE = 9;

// ─── Contact Form ─────────────────────────────────────────────────────────────
export const CONTACT_SUBJECTS = ['general', 'quote', 'project', 'career', 'other'];
