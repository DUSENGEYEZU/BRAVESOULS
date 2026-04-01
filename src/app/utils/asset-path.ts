/**
 * Join APP_BASE_HREF (e.g. `/` or `/BRAVESOULS/`) with an asset path so the browser
 * requests `/BRAVESOULS/assets/...` on GitHub Pages and `/assets/...` locally.
 */
export function assetPathFromBase(baseHref: string, relativePath: string): string {
  const base = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
  const path = relativePath.replace(/^\//, '');
  return `${base}${path}`;
}
