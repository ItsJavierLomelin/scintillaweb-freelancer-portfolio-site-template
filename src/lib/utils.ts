/** Prefix a root-relative path with the configured base path. */
export function u(path: string) {
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
