import { NextResponse, type NextRequest } from "next/server";
import { ITEMS_PER_PAGE } from "@/lib/pagination";
import { resolveSlugRoute } from "@/lib/resolveSlugRoute";
import { filterOfficesByArea, filterOfficesByCategoryAndArea } from "@/lib/officeFilters";
import { getAllOffices } from "@/lib/offices-server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (!searchParams.has("page")) return NextResponse.next();

  const slug = pathname.replace(/^\/+/, "").split("/").filter(Boolean);
  const route = resolveSlugRoute(slug);
  if (!route) return NextResponse.next();

  // Detail pages (office/interview/article) have no pagination at all —
  // any ?page= value means this exact URL doesn't exist.
  if (route.kind === "office" || route.kind === "interview" || route.kind === "article") {
    return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
  }

  // Listing page (area / category / prefCategory) from here on.
  // ?page=1 (or any value the client treats as page 1) is identical content to
  // the URL without the page param — never 404, the page itself self-canonicalizes.
  const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  if (page <= 1) return NextResponse.next();

  // Filtered listings (industry/service) are already noindex'd regardless of
  // page validity, so the range check is scoped to the unfiltered case only.
  if (searchParams.has("industry") || searchParams.has("service")) return NextResponse.next();

  const allOffices = getAllOffices();
  let count: number;
  if (route.kind === "area") {
    count = filterOfficesByArea(allOffices, {
      prefecture: route.prefecture.slug,
      city: route.city?.slug,
      ward: route.ward?.slug,
      station: route.station?.slug,
    }).length;
  } else if (route.kind === "category") {
    count = filterOfficesByCategoryAndArea(allOffices, route.category, {}).length;
  } else {
    count = filterOfficesByCategoryAndArea(allOffices, route.category, {
      prefecture: route.prefecture.slug,
      city: route.city?.slug,
      ward: route.ward?.slug,
      station: route.station?.slug,
    }).length;
  }

  const totalPages = Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));
  if (page > totalPages) {
    return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
