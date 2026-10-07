import type { APIRoute } from 'astro';
import { city } from '~/data/city';
import { business } from '~/lib/site';

export const GET: APIRoute = () =>
  new Response(`# ${business.name}\n\n${city.site.llmsSummary}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
