/**
 * Office List page - shared template for prefecture/city/ward/station listings.
 */
import { useState, useMemo, useEffect } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Link from "next/link"
import { useRouter } from "next/router";
import { ArrowRight, ChevronDown, ChevronUp, /* BarChart2, */ BookOpen, Users } from "lucide-react"; // BarChart2: ランキング復活時に戻す
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import OfficeCard from "@/components/OfficeCard";
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import type { Prefecture, City, Ward, Station, Office, Article } from "@/lib/data";
import { getCategoriesByType } from "@/lib/categorySlugMap";
import { useWouterSearch } from "@/lib/useWouterSearch";
import { getPageFromSearch, buildPageHref } from "@/lib/pagination";
import areaContentsData from "@/data/areaContents.json";

function buildSearchUrl(prefSlug: string, citySlug?: string, wardSlug?: string, stationSlug?: string): string {
  let url = `/${prefSlug}`;
  if (citySlug) url += `/${citySlug}`;
  if (wardSlug) url += `/${wardSlug}`;
  if (stationSlug) url += `/${stationSlug}`;
  return url;
}

const ITEMS_PER_PAGE = 12;
const CITIES_INITIAL_SHOW = 24;

interface OfficeListProps {
  prefecture: Prefecture;
  city?: City;
  ward?: Ward;
  station?: Station;
  cities: City[];
  stations: Station[];
  relatedArticles: Article[];
}

export default function OfficeList({ prefecture, city, ward, station, cities, stations, relatedArticles }: OfficeListProps) {
  const [offices, setOffices] = useState<Office[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // Pending filters (what user has checked but not yet submitted)
  const [pendingIndustries, setPendingIndustries] = useState<string[]>([]);
  const [pendingServices, setPendingServices] = useState<string[]>([]);
  const [showAllCities, setShowAllCities] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<"area" | "service" | "industry">("area");
  const [showFull, setShowFull] = useState(false);

  const search = useWouterSearch();
  const router = useRouter();
  const currentPage = getPageFromSearch(search);

  // Area-navigation links (city/ward/station chips) should carry filters but not the current page
  const filterSearch = useMemo(() => {
    const params = new URLSearchParams(search);
    params.delete("page");
    return params.toString();
  }, [search]);
  const qs = filterSearch ? `?${filterSearch}` : "";

  // Derive applied filters from URL (source of truth)
  const selectedIndustries = useMemo(() => new URLSearchParams(search).getAll("industry"), [search]);
  const selectedServices = useMemo(() => new URLSearchParams(search).getAll("service"), [search]);

  // Sync pending state when URL changes (e.g. back/forward navigation)
  useEffect(() => {
    const params = new URLSearchParams(search);
    setPendingIndustries(params.getAll("industry"));
    setPendingServices(params.getAll("service"));
  }, [search]);

  // Base URL for the current area level (without query params)
  const basePath = station
    ? buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, station.slug)
    : ward ? `/${prefecture.slug}/${city!.slug}/${ward.slug}`
    : city ? `/${prefecture.slug}/${city.slug}`
    : `/${prefecture.slug}`;

  function applyFilters() {
    const params = new URLSearchParams();
    pendingIndustries.forEach((i) => params.append("industry", i));
    pendingServices.forEach((s) => params.append("service", s));
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetFilters() {
    setPendingIndustries([]);
    setPendingServices([]);
    router.push(basePath);
  }

  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: prefecture.name, href: `/${prefecture.slug}` },
  ];
  if (city) breadcrumbItems.push({ label: city.name, href: `/${prefecture.slug}/${city.slug}` });
  if (ward) breadcrumbItems.push({ label: ward.name, href: `/${prefecture.slug}/${city!.slug}/${ward.slug}` });
  if (station) breadcrumbItems.push({ label: station.name });

  // API fetch: エリア + フィルター + ページが変わるたびに再取得
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("prefecture", prefecture.slug);
    if (city) params.set("city", city.slug);
    if (ward) params.set("ward", ward.slug);
    if (station) params.set("station", station.slug);
    selectedIndustries.forEach((i) => params.append("industry", i));
    selectedServices.forEach((s) => params.append("service", s));
    params.set("page", String(currentPage));
    params.set("limit", String(ITEMS_PER_PAGE));

    fetch(`/api/offices?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setOffices(data.offices ?? []);
        setTotal(data.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [prefecture.slug, city?.slug, ward?.slug, station?.slug, selectedIndustries.join(","), selectedServices.join(","), currentPage]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Sub-nav data
  const wards = city?.wards || [];

  // Sidebar filter options — all categories (not area-filtered)
  const allIndustries = getCategoriesByType("industry").map((c) => c.name);
  const allServices = getCategoriesByType("service").map((c) => c.name);

  const activeFilterCount = selectedIndustries.length + selectedServices.length;

  // Page title
  let pageTitle = `${prefecture.name}の税理士・会計事務所`;
  if (city) pageTitle = `${prefecture.name}${city.name}の税理士・会計事務所`;
  if (ward) pageTitle = `${city!.name}${ward.name}の税理士・会計事務所`;
  if (station) pageTitle = `${station.name}周辺の税理士・会計事務所`;

  const SUFFIX = "の税理士・会計事務所の検索や相談なら【税理士クラウド】";
  let documentTitle = `${prefecture.name}${SUFFIX}`;
  if (station) documentTitle = `${station.name}(${prefecture.name})${SUFFIX}`;
  else if (ward) documentTitle = `${city!.name}${ward.name}${SUFFIX}`;
  else if (city) documentTitle = `${prefecture.name}${city.name}${SUFFIX}`;

  const AREA_DESC_SUFFIX = "の税理士・会計事務所の一覧です。得意な業種や業務内容から税理士・会計事務所を探すことができます。無料の紹介サービスもご利用ください。";
  let documentDescription: string;
  if (station) documentDescription = `${station.name}${AREA_DESC_SUFFIX}`;
  else if (ward) documentDescription = `${city!.name}${ward.name}${AREA_DESC_SUFFIX}`;
  else if (city) documentDescription = `${prefecture.name}${city.name}${AREA_DESC_SUFFIX}`;
  else documentDescription = `${prefecture.name}${AREA_DESC_SUFFIX}`;

  const noindex =
    selectedIndustries.length > 0 ||
    selectedServices.length > 0 ||
    (!loading && total === 0) ||
    (!loading && totalPages > 0 && currentPage > totalPages);
  usePageTitle(documentTitle, documentDescription, noindex);

  const currentAreaLabel = [
    prefecture.name, city?.name, ward?.name,
    station ? `${station.name}周辺` : undefined,
  ].filter(Boolean).join(" › ");

  const visibleCities = showAllCities ? cities : cities.slice(0, CITIES_INITIAL_SHOW);

  // Category page base URL
  const categoryBase = station
    ? buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, station.slug)
    : ward ? `/${prefecture.slug}/${city!.slug}/${ward.slug}`
    : city ? `/${prefecture.slug}/${city.slug}`
    : `/${prefecture.slug}`;

  const allServiceCategories = getCategoriesByType("service");
  const allIndustryCategories = getCategoriesByType("industry");

  // Tab labels
  const navTabs = [
    { id: "area" as const, label: !city ? "市区町村" : !ward && wards.length > 0 ? "行政区" : "駅" },
    { id: "service" as const, label: "依頼内容" },
    { id: "industry" as const, label: "業種" },
  ];

  const chipBase = "px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">

          <Breadcrumb items={breadcrumbItems} />

          {/* Page header */}
          <div className="mt-1 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              {pageTitle}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {station
                ? `${station.name}の税理士・会計事務所一覧です。条件に合った税理士・会計事務所をお探しください。`
                : ward
                ? `${city!.name}${ward.name}の税理士・会計事務所一覧です。条件に合った税理士・会計事務所をお探しください。`
                : city
                ? `${city.name}の税理士・会計事務所一覧です。条件に合った税理士・会計事務所をお探しください。`
                : `${prefecture.name}の税理士・会計事務所一覧です。条件に合った税理士・会計事務所をお探しください。`}
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {loading ? "…" : `${total}件`}
              </span>
            </div>
          </div>

          {/* ─── Full-width: area / service / industry tabs ─── */}
          <section className="bg-card border border-border rounded-xl overflow-hidden mb-6">
            <div className="flex border-b border-border">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveNavTab(tab.id); setShowFull(false); }}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeNavTab === tab.id
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">

              {/* ── SP版：高さ制限 + もっと見るボタン ── */}
              <div className="md:hidden">
                <div
                  className="overflow-hidden"
                  style={!showFull ? { maxHeight: activeNavTab === "area" ? "152px" : "120px" } : undefined}
                >
                  {activeNavTab === "area" && (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        現在のエリア：
                        <span className="font-semibold text-foreground">{currentAreaLabel}</span>
                        {city && (
                          <Link href={`/${prefecture.slug}`} className="ml-2 text-primary hover:underline text-xs">変更する</Link>
                        )}
                      </p>
                      {!city && cities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {cities.map((c) => (
                            <Link key={c.slug} href={`/${prefecture.slug}/${c.slug}${qs}`} className={chipBase}>{c.name}</Link>
                          ))}
                        </div>
                      )}
                      {city && wards.length > 0 && !ward && (
                        <div className="flex flex-wrap gap-2">
                          {wards.map((w) => (
                            <Link key={w.slug} href={`/${prefecture.slug}/${city.slug}/${w.slug}${qs}`} className={chipBase}>{w.name}</Link>
                          ))}
                        </div>
                      )}
                      {stations.length > 0 && !(wards.length > 0 && !ward) && (
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {stations.map((s) => (
                              <Link key={s.slug} href={buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, s.slug) + qs} className={chipBase}>{s.name}</Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {activeNavTab === "service" && (
                    <div className="flex flex-wrap gap-2">
                      {allServiceCategories.map((cat) => (
                        <Link key={cat.slug} href={`${categoryBase}/${cat.slug}`} className={chipBase}>{cat.name}</Link>
                      ))}
                    </div>
                  )}
                  {activeNavTab === "industry" && (
                    <div className="flex flex-wrap gap-2">
                      {allIndustryCategories.map((cat) => (
                        <Link key={cat.slug} href={`${categoryBase}/${cat.slug}`} className={chipBase}>{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="mt-3 flex items-center gap-1 text-sm text-primary font-medium"
                  onClick={() => setShowFull(!showFull)}
                >
                  {showFull
                    ? <><ChevronUp className="w-4 h-4" />閉じる</>
                    : <><ChevronDown className="w-4 h-4" />もっと見る</>
                  }
                </button>
              </div>

              {/* ── PC版：既存レイアウト（変更なし） ── */}
              <div className="hidden md:block">
                {activeNavTab === "area" && (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      現在のエリア：
                      <span className="font-semibold text-foreground">{currentAreaLabel}</span>
                      {city && (
                        <Link href={`/${prefecture.slug}`} className="ml-2 text-primary hover:underline text-xs">変更する</Link>
                      )}
                    </p>
                    {!city && cities.length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {visibleCities.map((c) => (
                            <Link key={c.slug} href={`/${prefecture.slug}/${c.slug}${qs}`} className={chipBase}>{c.name}</Link>
                          ))}
                        </div>
                        {cities.length > CITIES_INITIAL_SHOW && (
                          <button
                            onClick={() => setShowAllCities(!showAllCities)}
                            className="mt-3 flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium"
                          >
                            {showAllCities
                              ? <><ChevronUp className="w-4 h-4" />閉じる</>
                              : <><ChevronDown className="w-4 h-4" />すべての市区町村を見る（{cities.length}件）</>
                            }
                          </button>
                        )}
                      </div>
                    )}
                    {city && wards.length > 0 && !ward && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {wards.map((w) => (
                            <Link key={w.slug} href={`/${prefecture.slug}/${city.slug}/${w.slug}${qs}`} className={chipBase}>{w.name}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {stations.length > 0 && !(wards.length > 0 && !ward) && (
                      <div className={city && wards.length > 0 && !ward ? "border-t border-border pt-4 mt-1" : ""}>
                        <div className="flex flex-wrap gap-2">
                          {stations.map((s) => (
                            <Link key={s.slug} href={buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, s.slug) + qs} className={chipBase}>{s.name}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {activeNavTab === "service" && (
                  <div className="flex flex-wrap gap-2">
                    {allServiceCategories.map((cat) => (
                      <Link key={cat.slug} href={`${categoryBase}/${cat.slug}`} className={chipBase}>{cat.name}</Link>
                    ))}
                  </div>
                )}
                {activeNavTab === "industry" && (
                  <div className="flex flex-wrap gap-2">
                    {allIndustryCategories.map((cat) => (
                      <Link key={cat.slug} href={`${categoryBase}/${cat.slug}`} className={chipBase}>{cat.name}</Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* ─── Two-column: sidebar + main ──────────────────── */}
          <div className="flex gap-6 items-start">

            {/* ── Left sidebar ── */}
            {(allIndustries.length > 0 || allServices.length > 0) && (
              <aside className="hidden lg:block w-56 shrink-0 sticky top-6">
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#0067C0" }}>
                    <h2 className="text-white text-sm font-bold">絞り込み検索</h2>
                    {(pendingIndustries.length > 0 || pendingServices.length > 0) && (
                      <button onClick={resetFilters} className="text-white/80 hover:text-white text-xs underline">
                        リセット
                      </button>
                    )}
                  </div>

                  {/* 業種 */}
                  {allIndustries.length > 0 && (
                    <div className="border-b border-border">
                      <div className="px-4 py-2.5 bg-muted/60 border-b border-border">
                        <h3 className="text-xs font-bold text-foreground">業種</h3>
                      </div>
                      <ul className="px-4 py-3 space-y-2">
                        {allIndustries.map((ind) => (
                          <li key={ind}>
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={pendingIndustries.includes(ind)}
                                onChange={() => {
                                  setPendingIndustries((prev) =>
                                    prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind]
                                  );
                                }}
                                className="w-4 h-4 rounded border-border accent-primary shrink-0"
                              />
                              <span className={`text-xs leading-tight ${pendingIndustries.includes(ind) ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                                {ind}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 依頼内容 */}
                  {allServices.length > 0 && (
                    <div>
                      <div className="px-4 py-2.5 bg-muted/60 border-b border-border">
                        <h3 className="text-xs font-bold text-foreground">依頼内容</h3>
                      </div>
                      <ul className="px-4 py-3 space-y-2">
                        {allServices.map((svc) => (
                          <li key={svc}>
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={pendingServices.includes(svc)}
                                onChange={() => {
                                  setPendingServices((prev) =>
                                    prev.includes(svc) ? prev.filter((x) => x !== svc) : [...prev, svc]
                                  );
                                }}
                                className="w-4 h-4 rounded border-border accent-primary shrink-0"
                              />
                              <span className={`text-xs leading-tight ${pendingServices.includes(svc) ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                                {svc}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 検索ボタン */}
                <button
                  onClick={applyFilters}
                  className="w-full mt-3 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
                  style={{ backgroundColor: "#0067C0" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#005aa8")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0067C0")}
                >
                  検索する
                </button>
              </aside>
            )}

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* Mobile: inline filter summary */}
              {activeFilterCount > 0 && (
                <div className="lg:hidden flex items-center gap-2 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-sm text-primary font-medium">絞り込み中：{activeFilterCount}件の条件</span>
                  <button
                    onClick={resetFilters}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    リセット
                  </button>
                </div>
              )}

              {/* Office list */}
              <div className="flex items-baseline gap-2 mb-5">
                <h2 className="text-xl font-bold text-foreground">事務所一覧</h2>
                <span className="text-base text-muted-foreground font-normal">
                  （{loading ? "…" : `${total}件`}）
                </span>
              </div>

              {loading ? (
                <div className="text-center py-16 text-muted-foreground">読み込み中…</div>
              ) : offices.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {offices.map((office) => (
                    <OfficeCard key={office.id} office={office} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <p className="text-muted-foreground">該当する事務所が見つかりませんでした。</p>
                  <p className="text-sm text-muted-foreground mt-1">条件を変更してお試しください。</p>
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                buildHref={(page) => buildPageHref(basePath, search, page)}
                onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-xl font-bold text-foreground mb-5">関連記事</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} compact />
                    ))}
                  </div>
                </section>
              )}

              {/* Nearby areas */}
              {city && (
                <section className="mt-16">
                  <h2 className="text-xl font-bold text-foreground mb-5">近隣エリア</h2>
                  <div className="flex flex-wrap gap-2">
                    {cities
                      .filter((c) => c.slug !== city.slug)
                      .slice(0, 10)
                      .map((c) => (
                        <Link
                          key={c.slug}
                          href={`/${prefecture.slug}/${c.slug}${qs}`}
                          className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                  </div>
                </section>
              )}

              {/* その他の検索方法 */}
              <section className="mt-10 bg-card border border-border rounded-xl p-6">
                <h2 className="text-base font-bold text-foreground mb-1">その他の検索方法</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  別の切り口から{prefecture.name}の会計事務所を探す
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* <Link href="/ranking" className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                    <BarChart2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">ランキングから探す</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
                  </Link> */}
                  <Link href="/recommendation" className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">おすすめ記事から探す</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
                  </Link>
                  <Link href="/introduction" className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">税理士を紹介してもらう</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
                  </Link>
                </div>
              </section>

              {/* エリア特徴テキスト */}
              {(() => {
                const contentKey = city ? `${prefecture.slug}/${city.slug}` : prefecture.slug;
                const areaContent = (areaContentsData as Record<string, string>)[contentKey];
                const areaLabel = city ? city.name : prefecture.name;
                if (!areaContent) return null;
                return (
                  <section className="mt-10">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {areaLabel}の税理士・会計事務所の特徴
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{areaContent}</p>
                  </section>
                );
              })()}
            </div>
          </div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
