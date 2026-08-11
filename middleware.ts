import { NextResponse, type NextRequest } from "next/server";
import { ITEMS_PER_PAGE } from "@/lib/pagination";
import { resolveSlugRoute, type SlugRoute } from "@/lib/resolveSlugRoute";
import { filterOfficesByArea, filterOfficesByCategoryAndArea } from "@/lib/officeFilters";
import { getAllOffices } from "@/lib/offices-server";

const PAGE_SEGMENT_RE = /^page=([1-9]\d*)$/;

function getListingCount(route: Extract<SlugRoute, { kind: "area" | "category" | "prefCategory" }>): number {
  const allOffices = getAllOffices();
  if (route.kind === "area") {
    return filterOfficesByArea(allOffices, {
      prefecture: route.prefecture.slug,
      city: route.city?.slug,
      ward: route.ward?.slug,
      station: route.station?.slug,
    }).length;
  }
  if (route.kind === "category") {
    return filterOfficesByCategoryAndArea(allOffices, route.category, {}).length;
  }
  return filterOfficesByCategoryAndArea(allOffices, route.category, {
    prefecture: route.prefecture.slug,
    city: route.city?.slug,
    ward: route.ward?.slug,
    station: route.station?.slug,
  }).length;
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const slug = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  const isFiltered = searchParams.has("industry") || searchParams.has("service");

  // ── New canonical form: /…/page=N ──
  const lastSeg = slug[slug.length - 1];
  const pageSegMatch = lastSeg ? PAGE_SEGMENT_RE.exec(lastSeg) : null;
  if (pageSegMatch) {
    const page = parseInt(pageSegMatch[1], 10);
    const baseSlug = slug.slice(0, -1);
    const route = resolveSlugRoute(baseSlug);

    // Detail pages, or paths [...slug].tsx doesn't recognize, have no pagination.
    if (!route || route.kind === "office" || route.kind === "interview" || route.kind === "article") {
      return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
    }

    // /page=1 (or lower) is identical content to the base URL — fold it away.
    if (page <= 1) {
      const dest = new URL(`/${baseSlug.join("/")}`, req.url);
      searchParams.forEach((v, k) => dest.searchParams.append(k, v));
      return NextResponse.redirect(dest, 301);
    }

    // Filtered listings (industry/service) are already noindex'd regardless of
    // page validity, so the range check is scoped to the unfiltered case only.
    if (!isFiltered) {
      const totalPages = Math.max(1, Math.ceil(getListingCount(route) / ITEMS_PER_PAGE));
      if (page > totalPages) {
        return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
      }
    }

    return NextResponse.next();
  }

  // ── Legacy form: ?page=N — redirect into the canonical path form ──
  if (searchParams.has("page")) {
    const route = resolveSlugRoute(slug);
    if (route) {
      // Detail pages (office/interview/article) have no pagination at all —
      // any ?page= value means this exact URL doesn't exist.
      if (route.kind === "office" || route.kind === "interview" || route.kind === "article") {
        return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
      }

      const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
      const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
      if (page > 1) {
        const dest = new URL(`/${[...slug, `page=${page}`].join("/")}`, req.url);
        searchParams.forEach((v, k) => {
          if (k !== "page") dest.searchParams.append(k, v);
        });
        return NextResponse.redirect(dest, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
