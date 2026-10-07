// The ONE switch per site build.
// 1. Duplicate src/data/cities/_placeholder.json as src/data/cities/<site-slug>.json
// 2. Fill every {slot} with that site's unique copy (see README.md)
// 3. Set ACTIVE_CITY below to the new file's slug and build.
// The template repo itself keeps '_placeholder' so the preview shows the variable slots.
export const ACTIVE_CITY = '_placeholder';
