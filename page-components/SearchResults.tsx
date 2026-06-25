/**
 * SearchResults page - /search/results?industry=...&service=...
 * Shows all-Japan office listing filtered by industry and/or service query params.
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link"
import { ArrowRight } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import OfficeCard from "@/components/OfficeCard";
import Pagination from "@/components/Pagination";
import type { Office } from "@/lib/data";
import { usePageTitle } from "@/lib/usePageTitle";
import { useWouterSearch } from "@/lib/useWouterSearch";
import { ITEMS_PER_PAGE, getPageFromSearch, buildPageHref, hasExplicitFirstPage } from "@/lib/pagination";
import { useCanonicalLink } from "@/lib/useCanonicalLink";

const BASE_PATH = "/search/results";

export default function SearchResults() {
  const search = useWouterSearch();
  const currentPage = getPageFromSearch(search);
  useCanonicalLink(hasExplicitFirstPage(search) ? buildPageHref(BASE_PATH, search, 1) : null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const industries = params.getAll("industry");
  const services = params.getAll("service");

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    industries.forEach((i) => query.append("industry", i));
    services.forEach((s) => query.append("service", s));
    query.set("page", String(currentPage));
    query.set("limit", String(ITEMS_PER_PAGE));
    fetch(`/api/offices?${query.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setOffices(data.offices ?? []);
        setTotal(data.total ?? 0);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "検索結果" },
  ];

  // Page title from selected conditions
  let pageTitle: string;
  if (industries.length > 0 && services.length > 0) {
    pageTitle = `${industries[0]}業界の${services[0]}に強い税理士・会計事務所`;
  } else if (industries.length > 0) {
    pageTitle = `${industries[0]}に強い税理士・会計事務所`;
  } else if (services.length > 0) {
    pageTitle = `${services[0]}に強い税理士・会計事務所`;
  } else {
    pageTitle = "税理士・会計事務所 検索結果";
  }
  const noindex =
    industries.length > 0 ||
    services.length > 0 ||
    total === 0 ||
    (!loading && totalPages > 0 && currentPage > totalPages);
  usePageTitle(`${pageTitle} | 税理士検索ナビ`, undefined, noindex);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={breadcrumbItems} />

          {/* Header */}
          <div className="mt-1 mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {industries.map((i) => (
                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  業種：{i}
                </span>
              ))}
              {services.map((s) => (
                <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                  依頼内容：{s}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
              {pageTitle}
            </h1>
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {loading ? "…" : `${total}件`}
              </span>
            </div>
          </div>

          {/* Office list */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">読み込み中…</div>
          ) : offices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offices.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">該当する事務所が見つかりませんでした。</p>
              <p className="text-sm text-muted-foreground mt-1">条件を変更してお試しください。</p>
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline font-medium"
              >
                検索トップに戻る
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={(page) => buildPageHref(BASE_PATH, search, page)}
            onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
