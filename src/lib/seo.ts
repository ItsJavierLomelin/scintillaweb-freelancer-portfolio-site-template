import { SITE_URL, business } from './site';
import { city } from '../data/city';

type Json = Record<string, unknown>;

export function orgSchema(): Json {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: business.name,
    url: SITE_URL,
    telephone: business.phoneE164,
    description: city.site.orgDescription,
    areaServed: { '@type': 'City', name: business.citySt },
  };
}

export function serviceSchema(path: string, name: string, description: string): Json {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType: city.site.schemaServiceType,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'City', name: business.citySt },
  };
}

export function pageSchema(
  path: string,
  pageName: string,
  description: string,
  crumbs: { name: string; path: string }[],
  service = false
): Json {
  const pageUrl = `${SITE_URL}${path}`;
  const graph: Json[] = [
    orgSchema(),
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageName,
      description,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: business.name, url: SITE_URL },
      about: { '@id': `${SITE_URL}/#organization` },
    },
  ];
  if (service) graph.push(serviceSchema(path, pageName, description));
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.path}`,
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]*>/g, '') },
    })),
  };
}
