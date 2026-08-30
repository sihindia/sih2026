/**
 * Dynamic SEO and Open Graph Meta Tag Utility for https://sih2026.flugelsoft.com
 */

export interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
}

export const BASE_DEPLOYMENT_URL = 'https://sih2026.flugelsoft.com';

export const getBaseDomain = (): string => {
  if (typeof window === 'undefined') return BASE_DEPLOYMENT_URL;
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return window.location.origin;
  }
  return BASE_DEPLOYMENT_URL;
};

export const getSeoFriendlyAppUrl = (psId: string): string => {
  const domain = getBaseDomain();
  return `${domain}/?app=${encodeURIComponent(psId)}`;
};

export const updateSeoMeta = (options: SeoOptions) => {
  if (typeof document === 'undefined') return;

  const defaultTitle = 'SIH 2026 Problem Statements Explorer & Full-Stack Applications | Flugelsoft Labs';
  const defaultDesc = 'Explore, filter, and launch live working prototypes for all 175 Software Category Problem Statements in Smart India Hackathon (SIH) 2026. Built with a 100% free-tier stack by Flugelsoft Labs.';
  const defaultUrl = `${BASE_DEPLOYMENT_URL}/`;
  const defaultImage = `${BASE_DEPLOYMENT_URL}/favicon.svg`;

  const title = options.title ? `${options.title} | SIH 2026 Flugelsoft Labs` : defaultTitle;
  const description = options.description || defaultDesc;
  const url = options.url || defaultUrl;
  const image = options.image || defaultImage;

  // Document Title
  document.title = title;

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

  // Standard Meta
  setMeta('description', false, description);
  setMeta('title', false, title);
  if (options.keywords) {
    setMeta('keywords', false, options.keywords);
  }

  // Open Graph
  setMeta('og:title', true, title);
  setMeta('og:description', true, description);
  setMeta('og:url', true, url);
  setMeta('og:image', true, image);

  // Twitter Cards
  setMeta('twitter:title', false, title);
  setMeta('twitter:description', false, description);
  setMeta('twitter:url', false, url);
  setMeta('twitter:image', false, image);

  // Canonical Link
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};
