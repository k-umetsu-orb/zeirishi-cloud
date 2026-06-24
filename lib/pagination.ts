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
