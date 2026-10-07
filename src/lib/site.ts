import { city, services, guides, neighborhoods } from '../data/city';

export const SITE_URL = city.site.origin.replace(/\/$/, '');

export const business = {
  name: city.site.brand,
  description: city.site.businessDescription,
  phoneDisplay: city.site.phoneDisplay,
  phoneHref: `tel:${city.site.phoneHref}`,
  phoneE164: city.site.phoneHref,
  email: city.site.email,
  city: city.site.city,
  region: city.site.region,
  regionName: city.site.regionName,
  country: city.site.country,
  citySt: `${city.site.city}, ${city.site.region}`,
} as const;

export const serviceLinks = services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name }));
export const guideLinks = guides.map((g) => ({ href: `/guides/${g.slug}/`, label: g.name }));
export const hoodLinks = neighborhoods.map((n) => ({ href: `/neighborhood/${n.slug}/`, label: n.name }));

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services', children: serviceLinks },
  { href: '/neighborhood/', label: 'Neighborhoods', children: hoodLinks },
  { href: '/guides/', label: 'Guides', children: guideLinks },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
