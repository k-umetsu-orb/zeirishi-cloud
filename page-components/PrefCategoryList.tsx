/**
 * Area × Category listing page
 * /search/{pref}/{category}
 * /search/{pref}/{city}/{category}
 * /search/{pref}/{city}/{ward}/{category}
 * /search/{pref}/{city}/{station}/{category}
 * /search/{pref}/{city}/{ward}/{station}/{category}
 */
import { useState } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Link from "next/link"
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp, BookOpen, Users, ArrowRight } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import OfficeCard from "@/components/OfficeCard";
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import type { Prefecture, City, Ward, Station, Office, Article } from "@/lib/data";
import { type CategoryInfo, getCategoriesByType } from "@/lib/categorySlugMap";
import { useWouterSearch } from "@/lib/useWouterSearch";
import { ITEMS_PER_PAGE, getPageFromSearch, buildPageHref, hasExplicitFirstPage } from "@/lib/pagination";
import { useCanonicalLink } from "@/lib/useCanonicalLink";

function buildSearchUrl(prefSlug: string, citySlug?: string, wardSlug?: string, stationSlug?: string): string {
  let url = `/${prefSlug}`;
  if (citySlug) url += `/${citySlug}`;
  if (wardSlug) url += `/${wardSlug}`;
  if (stationSlug) url += `/${stationSlug}`;
  return url;
}

const CITIES_INITIAL_SHOW = 24;

interface PrefCategoryListProps {
  prefecture: Prefecture;
  category: CategoryInfo;
  city?: City;
  ward?: Ward;
  station?: Station;
  offices: Office[];
  cities: City[];
  stations: Station[];
  relatedArticles: Article[];
  availableAreaSlugs: string[];
}

export default function PrefCategoryList({
  prefecture,
  category,
  city,
  ward,
  station,
  offices: filteredOffices,
  cities: rawCities,
  stations: rawStations,
  relatedArticles,
  availableAreaSlugs,
}: PrefCategoryListProps) {
  const [showAllCities, setShowAllCities] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const router = useRouter();
  const search = useWouterSearch();
  const currentPage = getPageFromSearch(search);

  const isIndustry = category.type === "industry";

  const categoryLabel = isIndustry ? `${category.name}業界` : category.name;

  const SUFFIX = "に強い税理士・会計事務所の検索や相談なら【税理士クラウド】";
  let documentTitle = `${prefecture.name}で${categoryLabel}${SUFFIX}`;
  if (station) documentTitle = `${station.name}(${prefecture.name})で${categoryLabel}${SUFFIX}`;
  else if (ward) documentTitle = `${city!.name}${ward.name}で${categoryLabel}${SUFFIX}`;
  else if (city) documentTitle = `${prefecture.name}${city.name}で${categoryLabel}${SUFFIX}`;
  // Pending sidebar filters — pre-check the current category
  const [pendingIndustries, setPendingIndustries] = useState<string[]>(
    isIndustry ? [category.name] : []
  );
  const [pendingServices, setPendingServices] = useState<string[]>(
    !isIndustry ? [category.name] : []
  );

  // ── Breadcrumb ───────────────────────────────────────────────
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: prefecture.name, href: `/${prefecture.slug}` },
  ];
  if (city) {
    breadcrumbItems.push({
      label: city.name,
      href: `/${prefecture.slug}/${city.slug}`,
    });
  }
  if (ward) {
    breadcrumbItems.push({
      label: ward.name,
      href: `/${prefecture.slug}/${city!.slug}/${ward.slug}`,
    });
  }
  if (station) {
    breadcrumbItems.push({
      label: station.name,
      href: buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, station.slug),
    });
  }
  breadcrumbItems.push({ label: category.name });

  // ── Page title ───────────────────────────────────────────────
  const areaLabel = station
    ? `${station.name}周辺`
    : ward
    ? `${city!.name}${ward.name}`
    : city
    ? city.name
    : prefecture.name;

  // h1・description用エリア表記（行政区は都道府県なし、市区町村+行政区）
  const descArea = station
    ? station.name
    : ward
    ? `${city!.name}${ward.name}`
    : city
    ? `${prefecture.name}${city.name}`
    : prefecture.name;

  // pageDesc用エリア表記（行政区も都道府県名を先頭に付ける）
  const areaDesc = station
    ? station.name
    : ward
    ? `${prefecture.name}${city!.name}${ward.name}`
    : city
    ? `${prefecture.name}${city.name}`
    : prefecture.name;

  const pageTitle = `${descArea}で${categoryLabel}に強い税理士・会計事務所`;

  const pageDesc = isIndustry
    ? `${areaDesc}で${categoryLabel}に強い税理士・会計事務所一覧です。業種に精通した税理士がお客様のニーズに合わせてサポートします。`
    : `${areaDesc}で${categoryLabel}に強い税理士・会計事務所一覧です。専門知識を持つ税理士がお客様のニーズに合わせてサポートします。`;

  const documentDescription = isIndustry
    ? `${descArea}で${category.name}業界に強いの税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`
    : `${descArea}で${category.name}に強いの税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`;

  const totalPages = Math.ceil(filteredOffices.length / ITEMS_PER_PAGE);
  const paginatedOffices = filteredOffices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  usePageTitle(documentTitle, documentDescription, filteredOffices.length === 0 || currentPage > totalPages);

  // ── Sub-navigation data ──────────────────────────────────────
  // 同カテゴリで事務所が0件（404化されている）の兄弟エリアへのリンクは出さない
  const availableAreaSlugSet = new Set(availableAreaSlugs);
  const cities = rawCities.filter((c) => availableAreaSlugSet.has(c.slug));
  const stations = rawStations.filter((s) => availableAreaSlugSet.has(s.slug));
  const visibleCities = showAllCities ? cities : cities.slice(0, CITIES_INITIAL_SHOW);
  const wards = (city?.wards || []).filter((w) => availableAreaSlugSet.has(w.slug));

  // Base URL for the current area (without category slug)
  const areaBase = station
    ? buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, station.slug)
    : ward ? `/${prefecture.slug}/${city!.slug}/${ward.slug}`
    : city ? `/${prefecture.slug}/${city.slug}`
    : `/${prefecture.slug}`;

  // This page's own URL (area + category slug, without query)
  const basePath = `${areaBase}/${category.slug}`;

  // ?page=1 is identical content to the URL without the page param — canonicalize to it.
  useCanonicalLink(hasExplicitFirstPage(search) ? buildPageHref(basePath, search, 1) : null);

  const allServiceCategories = getCategoriesByType("service");
  const allIndustryCategories = getCategoriesByType("industry");

  // Sidebar apply/reset
  function applyFilters() {
    const params = new URLSearchParams();
    pendingIndustries.forEach((i) => params.append("industry", i));
    pendingServices.forEach((s) => params.append("service", s));
    const qs = params.toString();
    router.push(qs ? `${areaBase}?${qs}` : areaBase);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetFilters() {
    setPendingIndustries(isIndustry ? [category.name] : []);
    setPendingServices(!isIndustry ? [category.name] : []);
  }

  const hasChangedFilters =
    JSON.stringify(pendingIndustries.slice().sort()) !== JSON.stringify((isIndustry ? [category.name] : []).slice().sort()) ||
    JSON.stringify(pendingServices.slice().sort()) !== JSON.stringify((!isIndustry ? [category.name] : []).slice().sort());

  const chipBase =
    "px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors";

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
              {pageDesc}
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {filteredOffices.length}件
              </span>
            </div>
          </div>

          {/* ─── Full-width: area tab only ─── */}
          <section className="bg-card border border-border rounded-xl overflow-hidden mb-6">
            <div className="flex border-b border-border">
              <div className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary bg-primary/5 text-center">
                {!city ? "市区町村" : !ward && wards.length > 0 ? "行政区" : "駅"}
              </div>
            </div>

            <div className="p-5">

              {/* ── SP版：高さ制限 + もっと見るボタン ── */}
              <div className="md:hidden">
                <div
                  className="overflow-hidden"
                  style={!showFull ? { maxHeight: "152px" } : undefined}
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    現在のエリア：
                    <span className="font-semibold text-foreground">{areaLabel}</span>
                    {city && (
                      <Link href={`/${prefecture.slug}`} className="ml-2 text-primary hover:underline text-xs">変更する</Link>
                    )}
                  </p>
                  {!city && cities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cities.map((c) => (
                        <Link key={c.slug} href={`/${prefecture.slug}/${c.slug}/${category.slug}`} className={chipBase}>{c.name}</Link>
                      ))}
                    </div>
                  )}
                  {city && wards.length > 0 && !ward && (
                    <div className="flex flex-wrap gap-2">
                      {wards.map((w) => (
                        <Link key={w.slug} href={`/${prefecture.slug}/${city.slug}/${w.slug}/${category.slug}`} className={chipBase}>{w.name}</Link>
                      ))}
                    </div>
                  )}
                  {stations.length > 0 && !(wards.length > 0 && !ward) && (
                    <div className="flex flex-wrap gap-2">
                      {stations.map((s) => (
                        <Link key={s.slug} href={`${buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, s.slug)}/${category.slug}`} className={chipBase}>{s.name}</Link>
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
                <p className="text-sm text-muted-foreground mb-4">
                  現在のエリア：
                  <span className="font-semibold text-foreground">{areaLabel}</span>
                  {city && (
                    <Link href={`/${prefecture.slug}`} className="ml-2 text-primary hover:underline text-xs">変更する</Link>
                  )}
                </p>
                {!city && cities.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {visibleCities.map((c) => (
                        <Link key={c.slug} href={`/${prefecture.slug}/${c.slug}/${category.slug}`} className={chipBase}>{c.name}</Link>
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
                        <Link key={w.slug} href={`/${prefecture.slug}/${city.slug}/${w.slug}/${category.slug}`} className={chipBase}>{w.name}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {stations.length > 0 && !(wards.length > 0 && !ward) && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {stations.map((s) => (
                        <Link key={s.slug} href={`${buildSearchUrl(prefecture.slug, city?.slug, ward?.slug, s.slug)}/${category.slug}`} className={chipBase}>{s.name}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* ─── Two-column: sidebar + main ──────────────────── */}
          <div className="flex gap-6 items-start">

            {/* ── Left sidebar ── */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-6">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#0067C0" }}>
                  <h2 className="text-white text-sm font-bold">絞り込み検索</h2>
                  {hasChangedFilters && (
                    <button onClick={resetFilters} className="text-white/80 hover:text-white text-xs underline">
                      リセット
                    </button>
                  )}
                </div>

                {/* 業種 */}
                <div className="border-b border-border">
                  <div className="px-4 py-2.5 bg-muted/60 border-b border-border">
                    <h3 className="text-xs font-bold text-foreground">業種</h3>
                  </div>
                  <ul className="px-4 py-3 space-y-2">
                    {allIndustryCategories.map((cat) => (
                      <li key={cat.slug}>
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={pendingIndustries.includes(cat.name)}
                            onChange={() => {
                              setPendingIndustries((prev) =>
                                prev.includes(cat.name) ? prev.filter((x) => x !== cat.name) : [...prev, cat.name]
                              );
                            }}
                            className="w-4 h-4 rounded border-border accent-primary shrink-0"
                          />
                          <span className={`text-xs leading-tight ${pendingIndustries.includes(cat.name) ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                            {cat.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 依頼内容 */}
                <div>
                  <div className="px-4 py-2.5 bg-muted/60 border-b border-border">
                    <h3 className="text-xs font-bold text-foreground">依頼内容</h3>
                  </div>
                  <ul className="px-4 py-3 space-y-2">
                    {allServiceCategories.map((cat) => (
                      <li key={cat.slug}>
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={pendingServices.includes(cat.name)}
                            onChange={() => {
                              setPendingServices((prev) =>
                                prev.includes(cat.name) ? prev.filter((x) => x !== cat.name) : [...prev, cat.name]
                              );
                            }}
                            className="w-4 h-4 rounded border-border accent-primary shrink-0"
                          />
                          <span className={`text-xs leading-tight ${pendingServices.includes(cat.name) ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                            {cat.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
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

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* Office list */}
              <div className="flex items-baseline gap-2 mb-5">
                <h2 className="text-xl font-bold text-foreground">事務所一覧</h2>
                <span className="text-base text-muted-foreground font-normal">
                  （{filteredOffices.length}件）
                </span>
              </div>

              {paginatedOffices.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {paginatedOffices.map((office) => (
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

              {/* Related articles（記事未公開のため一旦非表示） */}
              {false && relatedArticles.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-xl font-bold text-foreground mb-5">関連記事</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} compact />
                    ))}
                  </div>
                </section>
              )}

              {/* その他の検索方法 */}
              <section className="mt-10 bg-card border border-border rounded-xl p-6">
                <h2 className="text-base font-bold text-foreground mb-1">その他の検索方法</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  別の切り口から{areaLabel}の会計事務所を探す
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link href={areaBase} className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">{areaLabel}の全事務所</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
                  </Link>
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
            </div>
          </div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
