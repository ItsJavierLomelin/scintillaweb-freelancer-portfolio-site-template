import { ACTIVE_CITY } from '../../city.config.mjs';

export type Block = { h: string; ps: string[] };
export type Faq = { q: string; a: string };
export type PageContent = {
  h1: string; intro: string; sections: Block[]; faqs: Faq[];
  title: string; desc: string; blurb?: string;
};
export type IndexPage = { title: string; desc: string; h1: string; intro: string };
export type Neighborhood = {
  slug: string; name: string; h1: string; title: string; description: string;
  intro: string; hero: string;
  body: { h: string; ps?: string[] }[];
  servicesTitle: string; servicesLead: string;
  mapIntro: string; mapLabel: string; mapSrc: string;
  faqs: Faq[]; cta: string; ctaP: string;
};
export type CityData = {
  site: {
    city: string; region: string; regionName: string; country: string;
    niche: string; brand: string; origin: string;
    phoneDisplay: string; phoneHref: string; email: string;
    ga4MeasurementId: string; airchattyTrackingId: string; pageCode: string;
    businessDescription: string; orgDescription: string; llmsSummary: string;
    schemaServiceType: string; logoHeader: string; logoFooter: string; ogImage: string;
  };
  theme: { accent: string; accentDeep: string; ink: string; mist: string };
  ui: { heroEyebrow: string; calloutTitle: string; calloutText: string; successNiche: string; formNote: string };
  home: {
    h1: string; intro: string; title: string; desc: string;
    servicesTitle: string; servicesLead: string;
    aboutTitle: string; aboutLead: string;
    stepsTitle: string; steps: { t: string; d: string }[];
    faqHeading: string; faqs: Faq[];
    coverageTitle: string; coverageLead: string;
    calloutTitle: string; calloutText: string; footerLinksHtml: string;
  };
  services: { slug: string; name: string; shortName: string; note: string }[];
  guides: { slug: string; name: string }[];
  indexPages: { services: IndexPage; guides: IndexPage; neighborhoods: IndexPage; contact: IndexPage; about: IndexPage };
  pages: Record<string, PageContent>;
  neighborhoods: Neighborhood[];
};

const cities = import.meta.glob<CityData>('./cities/*.json', { eager: true, import: 'default' });
const active = cities[`./cities/${ACTIVE_CITY}.json`];
if (!active) throw new Error(`No site data file for ACTIVE_CITY="${ACTIVE_CITY}" in city.config.mjs`);

/** True only while the repo builds its token preview. Real sites index normally. */
export const isPlaceholder = ACTIVE_CITY === '_placeholder';

export const city = active;
export const C = city.pages;
export const services = city.services.map((s) => ({ ...s, blurb: C[s.slug]?.blurb ?? C[s.slug]?.intro ?? '' }));
export const guides = city.guides.map((g) => ({ ...g, blurb: C[g.slug]?.blurb ?? C[g.slug]?.intro ?? '' }));
export const neighborhoods = city.neighborhoods;
