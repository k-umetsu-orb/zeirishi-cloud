export const ITEMS_PER_PAGE = 12;

export function getPageFromSearch(search: string): number {
  const raw = new URLSearchParams(search).get("page");
  const page = parseInt(raw ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function buildPageHref(basePath: string, search: string, page: number): string {
  const params = new URLSearchParams(search);
  params.delete("page");
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/**
 * Same idea as buildPageHref, but for the area/category listing pages under
 * pages/[...slug].tsx, which encode the page number as a path segment
 * (/tokyo/page=2) rather than a query param so it can be self-canonicalized
 * at build/request time. Other query params (industry/service filters) are
 * preserved as-is.
 */
export function buildAreaPageHref(basePath: string, search: string, page: number): string {
  const params = new URLSearchParams(search);
  params.delete("page");
  const path = page > 1 ? `${basePath}/page=${page}` : basePath;
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** True when `?page=1` (or an equivalent value the client treats as page 1) is explicitly in the URL. */
export function hasExplicitFirstPage(search: string): boolean {
  const raw = new URLSearchParams(search).get("page");
  if (raw === null) return false;
  return getPageFromSearch(search) === 1;
}
