import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SEO_DEFAULTS, BRAND } from '../constants';

/**
 * SEO — page-level meta tag manager.
 *
 * Usage:
 *   <SEO
 *     titleKey="seo.home.title"
 *     descriptionKey="seo.home.description"
 *     canonicalPath="/"
 *   />
 *
 * Or provide raw strings:
 *   <SEO title="Custom Title" description="Custom desc" />
 *
 * For project detail pages, pass extra keywords for local SEO:
 *   <SEO keywords="Ankara Çankaya Konut Projesi" ... />
 */
export default function SEO({
  titleKey,
  descriptionKey,
  title: rawTitle,
  description: rawDesc,
  canonicalPath,
  keywords,
  ogImage,
  ogImageAlt,
  ogType = 'website',
  structuredData = [],
  noIndex = false,
}) {
  const { t, i18n } = useTranslation();
  const normalizedLang = (i18n.language || 'tr').split('-')[0];
  const lang = ['tr', 'en', 'de'].includes(normalizedLang) ? normalizedLang : 'tr';

  const title = rawTitle ?? (titleKey ? t(titleKey) : SEO_DEFAULTS.siteName);
  const description = rawDesc ?? (descriptionKey ? t(descriptionKey) : '');
  const ogImg = ogImage ?? SEO_DEFAULTS.ogImageUrl;

  // hreflang alternate URLs
  const langs = ['tr', 'en', 'de'];
  const ogLocaleMap = { tr: 'tr_TR', en: 'en_US', de: 'de_DE' };
  const defaultKeywordsByLang = {
    tr: 'Ankara insaat firmasi, muteahhitlik, kentsel donusum, konut projeleri',
    en: 'Ankara construction company, contractor services, residential projects, commercial construction',
    de: 'Baufirma Ankara, Generalunternehmer, Wohnbauprojekte, Gewerbebau',
  };

  const buildLocalizedUrl = (path, locale) => {
    const base = `https://${BRAND.domain}${path}`;
    if (locale === 'tr') return base;
    return `${base}${path.includes('?') ? '&' : '?'}lang=${locale}`;
  };

  const canonical = canonicalPath ? buildLocalizedUrl(canonicalPath, lang) : undefined;
  const alternateLinks = canonicalPath
    ? langs.map((locale) => ({
        locale,
        href: buildLocalizedUrl(canonicalPath, locale),
      }))
    : [];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    email: BRAND.email,
    logo: `https://${BRAND.domain}/logo192.png`,
    sameAs: [
      'https://linkedin.com/company/aytgrup',
      'https://instagram.com/aytgrup',
      'https://twitter.com/aytgrup',
      'https://facebook.com/aytgrup',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.addressFull?.tr,
      addressLocality: 'Ankara',
      addressCountry: 'TR',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ConstructionCompany',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    email: BRAND.email,
    image: `https://${BRAND.domain}${ogImg}`,
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.addressFull?.tr,
      addressLocality: 'Ankara',
      addressCountry: 'TR',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    inLanguage: lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://${BRAND.domain}/projelerimiz?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const pageSchema = canonical
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
        inLanguage: lang,
      }
    : null;

  const schemas = [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    ...(pageSchema ? [pageSchema] : []),
    ...(Array.isArray(structuredData) ? structuredData : [structuredData]),
  ];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="language" content={lang} />
      <meta httpEquiv="content-language" content={lang} />
      <meta name="author" content={BRAND.name} />
      <meta name="publisher" content={BRAND.name} />
      <meta name="geo.region" content="TR-06" />
      <meta name="geo.placename" content="Ankara" />
      <meta name="keywords" content={keywords || defaultKeywordsByLang[lang]} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:locale"      content={ogLocaleMap[lang]} />
      <meta property="og:site_name"   content={SEO_DEFAULTS.siteName} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={`https://${BRAND.domain}${ogImg}`} />
      <meta property="og:image:alt"   content={ogImageAlt || title} />
      {canonical && <meta property="og:url" content={canonical} />}
      {langs
        .filter((l) => l !== lang)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={ogLocaleMap[l]} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SEO_DEFAULTS.twitterHandle} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={`https://${BRAND.domain}${ogImg}`} />

      {/* hreflang — multilingual SEO */}
      {alternateLinks.map(({ locale, href }) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={href}
          />
      ))}
      {canonicalPath && <link rel="alternate" hrefLang="x-default" href={buildLocalizedUrl(canonicalPath, 'tr')} />}

      {/* Structured data for semantic SEO */}
      {schemas.map((schema, idx) => (
        <script key={`schema-${idx}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
