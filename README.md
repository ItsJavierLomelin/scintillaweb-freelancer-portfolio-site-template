# Scintillaweb Freelancer Portfolio Site Template

A home-service lead-gen site template built on the design of the
[SWP Freelancer Portfolio](https://github.com/Scintillaweb/swp-freelancer-portfolio)
Astro theme by Scintillaweb (MIT licensed, see `LICENSE`). The layout,
typography, components and motion come from that theme; the structure,
content model and lead handling are reworked for single-city home-service
sites.

## How it works

All copy, contact details, tracking ids and theme colors for a site live in
ONE data file per site: `src/data/cities/<site-slug>.json`.

1. Duplicate `src/data/cities/_placeholder.json` as
   `src/data/cities/<site-slug>.json`.
2. Fill every `{slot}` with that site's unique copy. The placeholder file
   shows the variable names ({Biz Name}, {Main Service}, {City, ST},
   {Service One}..{Service Three}, {Location One}..{Location Three}, {Phone},
   {Phone Href}, {Email}, {tracker id}, {Page Code}) plus a short instruction
   for every slot.
3. Set `ACTIVE_CITY` in `city.config.mjs` to the new slug.
4. `npm install && npm run build`. The static site lands in `dist/`.

The template repo keeps `ACTIVE_CITY = '_placeholder'`, so its preview shows
the raw slots. While the placeholder is active the build is `noindex`; a real
site data file gets canonical URLs and normal indexing automatically.

## Pages

- Home (form in the hero, services, neighborhoods, about + steps, FAQs, call band)
- Services hub + one page per service (`services[].slug` in the data file)
- Neighborhoods hub + one page per neighborhood (`neighborhoods[]`), each with
  a services section, local sections, optional map embed and FAQs
- Guides hub + one page per guide (`guides[]`)
- About, Contact, Privacy, Terms, 404
- JSON-LD on every page (Organization, WebPage, BreadcrumbList, Service on
  service pages, FAQPage where FAQs exist), robots.txt, sitemap, llms.txt

## Forms and tracking

Every content page carries the same one-column request form in its hero. The
form posts through the AirChatty tracker script loaded in
`src/layouts/BaseLayout.astro` (`data-tracking-id` comes from
`site.airchattyTrackingId` in the data file). `src/scripts/lead-form.js`
validates the phone, hides the form on confirmed receipt and shows the
"Request received" state. Field names (`full_name`, `phone`, `email`,
`page_details`, `page_site`, `page_location`, `page_code`, `website` honeypot)
match the other sites, so the same tracking setup works unchanged.

## Theming

`src/styles/tokens.css` holds the design defaults. A site can override the
accent, ink and mist colors from its data file (`theme` object); values left
as `{tokens}` are ignored so the preview keeps its look. Header and footer
logos are `public/logo.svg` and `public/logo-footer.svg`; swap the files or
point `site.logoHeader` / `site.logoFooter` at new ones. The favicon is
`public/favicon.svg` and should be re-branded per site.

## Copy rules baked in

- No cost or price content anywhere; no invented stats, years, counts or guarantees.
- Outbound links sit inline inside sentences in the section paragraphs
  (`<a href="...">` inside the `ps` strings), never "See X" link lists.
- Permit FAQs only where research shows the service requires a permit in that city.
- No em dashes. Plain H1s: homepage is `{Main Service} in {City}, {ST}`, every
  other page gets its own headline.

## Deploy

`.github/workflows/pages.yml` builds the repo to GitHub Pages with
`BASE=/scintillaweb-freelancer-portfolio-site-template` on every push. For a
real site on its own domain, build with `BASE=/` (the default) and set
`site.origin` in the site data file to the real domain.

## License

MIT, same terms as the upstream theme. Keep `LICENSE` in any copy.
