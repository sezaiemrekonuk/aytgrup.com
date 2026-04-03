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
  noIndex = false,
}) {
  const { t, i18n } = useTranslation();
  const lang        = i18n.language;

  const title       = rawTitle       ?? (titleKey       ? t(titleKey)       : SEO_DEFAULTS.siteName);
  const description = rawDesc        ?? (descriptionKey ? t(descriptionKey) : '');
  const canonical   = canonicalPath  ? `https://${BRAND.domain}${canonicalPath}` : undefined;
  const ogImg       = ogImage        ?? SEO_DEFAULTS.ogImageUrl;

  // hreflang alternate URLs
  const langs = ['tr', 'en', 'de'];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SEO_DEFAULTS.siteName} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={`https://${BRAND.domain}${ogImg}`} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SEO_DEFAULTS.twitterHandle} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={`https://${BRAND.domain}${ogImg}`} />

      {/* hreflang — multilingual SEO */}
      {canonical &&
        langs.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://${BRAND.domain}${canonicalPath}`}
          />
        ))}
    </Helmet>
  );
}
