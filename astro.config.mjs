// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import { ACTIVE_CITY } from './city.config.mjs';

const city = JSON.parse(readFileSync(new URL(`./src/data/cities/${ACTIVE_CITY}.json`, import.meta.url), 'utf8'));

// The real domain comes from the site data file. The GitHub Pages workflow
// sets BASE=/<repo> so the preview works under its project path.
export default defineConfig({
  site: city.site.origin,
  base: process.env.BASE ?? '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [
    // Privacy and terms stay out of the sitemap, matching the other templates.
    sitemap({ filter: (page) => !/\/(privacy|terms)\/$/.test(new URL(page).pathname) }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
