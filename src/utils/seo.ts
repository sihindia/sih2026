/**
 * Dynamic SEO, Open Graph, Twitter Cards, Canonical URLs & Schema.org JSON-LD Utility
 * Domain: https://sih2026.flugelsoft.com
 */

import { ProblemStatement } from '../types';

export interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  ps?: ProblemStatement;
  type?: 'website' | 'article' | 'product';
}

export const BASE_DEPLOYMENT_URL = 'https://sih2026.flugelsoft.com';

/**
 * Creates a clean, URL-safe slug from a title string
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-')  // replace spaces, underscores with single dash
    .replace(/^-+|-+$/g, '')   // trim leading/trailing dashes
    .slice(0, 65);             // keep reasonable length
};

/**
 * Returns the active base origin depending on local vs production environment
 */
export const getBaseDomain = (): string => {
  if (typeof window === 'undefined') return BASE_DEPLOYMENT_URL;
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return window.location.origin;
  }
  return BASE_DEPLOYMENT_URL;
};

/**
 * Generates a high-value search-friendly URL for a problem statement
 * e.g. https://sih2026.flugelsoft.com/ps/sih26028-dynamic-forecast-of-expected-time-of-arrival
 */
export const getSeoFriendlyAppUrl = (
  psOrId: ProblemStatement | string,
  absolute: boolean = true
): string => {
  const base = absolute ? getBaseDomain() : '';
  
  if (typeof psOrId === 'string') {
    const cleanId = psOrId.toLowerCase().trim();
    return `${base}/ps/${encodeURIComponent(cleanId)}`;
  }

  const psId = (psOrId.ps_number || `sih${psOrId.id}`).toLowerCase().trim();
  const slug = slugify(psOrId.title);
  const path = slug ? `/ps/${psId}-${slug}` : `/ps/${psId}`;
  
  return `${base}${path}`;
};

/**
 * Generates a concise search-friendly URL: e.g. /ps/sih26028
 */
export const getShortSeoUrl = (psId: string, absolute: boolean = true): string => {
  const base = absolute ? getBaseDomain() : '';
  const cleanId = psId.toLowerCase().trim();
  return `${base}/ps/${encodeURIComponent(cleanId)}`;
};

/**
 * Extracts a Problem Statement identifier from the current window path or search parameters
 */
export const parsePsIdFromLocation = (pathname: string, search: string): string | null => {
  // 1. Check query parameters e.g. ?app=SIH26028 or ?ps=SIH26028
  const params = new URLSearchParams(search);
  const queryApp = params.get('app') || params.get('ps');
  if (queryApp) {
    return queryApp.trim();
  }

  // 2. Check pathnames: /ps/sih26028-title, /problem-statement/sih26028, /app/sih26028
  const pathMatch = pathname.match(/\/(?:ps|problem-statement|problem|app)\/((?:sih)?\d{5}(?:-[a-z0-9-]+)?)/i);
  if (pathMatch) {
    const slugPart = pathMatch[1];
    // Extract the PS ID prefix e.g. sih26028 from sih26028-dynamic-forecast...
    const idMatch = slugPart.match(/^((?:sih)?\d{5})/i);
    if (idMatch) {
      return idMatch[1].toUpperCase();
    }
    return slugPart.split('-')[0].toUpperCase();
  }

  return null;
};

/**
 * Dynamically updates all HTML <head> meta tags, Open Graph, Twitter cards, and JSON-LD structured data
 */
export const updateSeoMeta = (options: SeoOptions) => {
  if (typeof document === 'undefined') return;

  const defaultTitle = 'SIH 2026 Problem Statements Explorer & Full-Stack Applications | Flugelsoft Labs';
  const defaultDesc = 'Explore, filter, and launch live working prototypes for all 175 Software Category Problem Statements in Smart India Hackathon (SIH) 2026. Built with a 100% free-tier stack by Flugelsoft Labs.';
  const defaultKeywords = 'Smart India Hackathon, SIH 2026, SIH problem statements, SIH software projects, hackathon solutions, Flugelsoft Labs, GovTech, Indian Railways hackathon, NAFED onion grading, Coal India hackathon, DILRMP land records, free tier tech stack';
  const defaultUrl = `${BASE_DEPLOYMENT_URL}/`;
  const defaultImage = `${BASE_DEPLOYMENT_URL}/favicon.svg`;

  let title = defaultTitle;
  let description = options.description || defaultDesc;
  let url = options.url || defaultUrl;
  let image = options.image || defaultImage;
  let keywords = options.keywords || defaultKeywords;
  const ogType = options.type || (options.ps ? 'article' : 'website');

  if (options.ps) {
    const ps = options.ps;
    const psCode = ps.ps_number || `SIH${ps.id}`;
    title = `${psCode}: ${ps.title} | ${ps.organization} | SIH 2026 Flugelsoft Labs`;
    description = `${ps.title} — ${ps.organization} (${ps.category} / ${ps.theme}). Detailed problem analysis, interactive prototype, tech stack architecture & starter code by Flugelsoft Labs.`;
    url = getSeoFriendlyAppUrl(ps);
    keywords = `${psCode}, ${ps.title}, ${ps.organization}, ${ps.theme}, ${ps.category}, SIH 2026, Smart India Hackathon, ${defaultKeywords}`;
  } else if (options.title) {
    title = `${options.title} | SIH 2026 Flugelsoft Labs`;
  }

  // 1. Update Document Title
  document.title = title;

  // Helper to update or create meta tags
  const setMeta = (nameOrProperty: string, isProp: boolean, content: string) => {
    const attr = isProp ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}='${nameOrProperty}']`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard Meta Tags
  setMeta('description', false, description);
  setMeta('title', false, title);
  setMeta('keywords', false, keywords);
  setMeta('author', false, 'Flugelsoft Labs (sih2026@flugelsoft.com)');
  setMeta('robots', false, 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 3. Open Graph Tags
  setMeta('og:type', true, ogType);
  setMeta('og:site_name', true, 'SIH 2026 Explorer - Flugelsoft Labs');
  setMeta('og:title', true, title);
  setMeta('og:description', true, description);
  setMeta('og:url', true, url);
  setMeta('og:image', true, image);
  setMeta('og:locale', true, 'en_IN');

  // 4. Twitter Cards
  setMeta('twitter:card', false, 'summary_large_image');
  setMeta('twitter:site', false, '@flugelsoft');
  setMeta('twitter:creator', false, '@flugelsoft');
  setMeta('twitter:title', false, title);
  setMeta('twitter:description', false, description);
  setMeta('twitter:url', false, url);
  setMeta('twitter:image', false, image);

  // 5. Canonical Link
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // 6. Schema.org JSON-LD Structured Data
  let jsonLdScript = document.getElementById('seo-dynamic-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'seo-dynamic-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData: any = options.ps ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': `${options.ps.ps_number || `SIH${options.ps.id}`}: ${options.ps.title}`,
    'description': options.ps.description,
    'url': url,
    'inLanguage': 'en',
    'author': {
      '@type': 'Organization',
      'name': 'Flugelsoft Labs',
      'url': 'https://sih2026.flugelsoft.com',
      'email': 'sih2026@flugelsoft.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Flugelsoft Labs',
      'url': 'https://sih2026.flugelsoft.com',
      'logo': {
        '@type': 'ImageObject',
        'url': defaultImage
      }
    },
    'about': {
      '@type': 'GovernmentOrganization',
      'name': options.ps.organization
    },
    'genre': options.ps.theme,
    'keywords': keywords
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'SIH 2026 Problem Statements Explorer',
    'url': BASE_DEPLOYMENT_URL,
    'description': defaultDesc,
    'publisher': {
      '@type': 'Organization',
      'name': 'Flugelsoft Labs',
      'url': 'https://sih2026.flugelsoft.com',
      'email': 'sih2026@flugelsoft.com'
    }
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
};
