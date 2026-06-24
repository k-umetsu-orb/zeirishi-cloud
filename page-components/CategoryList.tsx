/**
 * Category listing page — /search/:industrySlug or /search/:serviceSlug
 * Shows offices filtered by industry or service type.
 */
import { useState } from "react";
import Link from "next/link";
import { usePageTitle } from "@/lib/usePageTitle";
import { Tag, /* BarChart2, */ Users, ArrowRight } from "lucide-react"; // BarChart2: ランキング復活時に戻す
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import OfficeCard from "@/components/OfficeCard";
import Pagination from "@/components/Pagination";
import type { Office } from "@/lib/data";
import { type CategoryInfo, getCategoriesByType } from "@/lib/categorySlugMap";
import { useWouterSearch } from "@/lib/useWouterSearch";
import { getPageFromSearch, buildPageHref } from "@/lib/pagination";

const ITEMS_PER_PAGE = 12;

interface CategoryListProps {
  category: CategoryInfo;
  offices: Office[];
}

export default function CategoryList({ category, offices: filteredOffices }: CategoryListProps) {
  const search = useWouterSearch();
  const currentPage = getPageFromSearch(search);
  const basePath = `/${category.slug}`;
  const [showAllChips, setShowAllChips] = useState(false);

  const isIndustry = category.type === "industry";
  const typeLabel = isIndustry ? "業種" : "依頼内容";

  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: category.name },
  ];

  const totalPages = Math.ceil(filteredOffices.length / ITEMS_PER_PAGE);
  const paginatedOffices = filteredOffices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Related categories (same type)
  const relatedCategories = getCategoriesByType(category.type).filter(
    (c) => c.slug !== category.slug
  );

  const pageTitle = isIndustry
    ? `${category.name}業界に強い税理士・会計事務所`
    : `${category.name}に強い税理士・会計事務所`;

  const documentTitle = isIndustry
    ? `${category.name}業界に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`
    : `${category.name}に強い税理士・会計事務所の検索や相談なら【税理士クラウド】`;
  const documentDescription = isIndustry
    ? `${category.name}業界に強いの税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`
    : `${category.name}に強いの税理士・会計事務所の一覧です。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。`;
  usePageTitle(documentTitle, documentDescription, filteredOffices.length === 0 || currentPage > totalPages);

  const pageDesc = isIndustry
    ? `${category.name}業界に強い税理士・会計事務所を掲載しています。専門的な知識を持つ税理士がお客様のニーズに合わせてサポートします。`
    : `${category.name}に強い税理士・会計事務所を掲載しています。専門的な知識を持つ税理士がお客様のニーズに合わせてサポートします。`;

  const chipBase =
    "px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page header */}
          <div className="mt-1 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {typeLabel}
              </span>
            </div>
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

          {/* Related categories */}
          {relatedCategories.length > 0 && (
            <section className="bg-card border border-border rounded-xl p-6 mb-10">
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-5 h-5 text-primary shrink-0" />
                <h2 className="text-base font-bold text-foreground">
                  他の{typeLabel}から探す
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                別の{typeLabel}で会計事務所を絞り込む
              </p>
              {/* border(1px×2) + py-1.5(6px×2) + text-sm(20px) = 34px/行、gap-2(8px)×2 → 3行 = 118px */}
              <div
                className="flex flex-wrap gap-2 overflow-hidden"
                style={{ maxHeight: showAllChips ? "none" : "118px" }}
              >
                {relatedCategories.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className={chipBase}>
                    {c.name}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setShowAllChips((v) => !v)}
                className="mt-3 text-sm text-primary hover:underline"
              >
                {showAllChips ? "閉じる ▲" : "もっと見る ▼"}
              </button>
            </section>
          )}

          {/* Office list */}
          <section>
            <div className="flex items-baseline gap-2 mb-5">
              <h2 className="text-xl font-bold text-foreground">事務所一覧</h2>
              <span className="text-base text-muted-foreground font-normal">
                （{filteredOffices.length}件）
              </span>
            </div>

            {paginatedOffices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedOffices.map((office) => (
                  <OfficeCard key={office.id} office={office} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground">
                  該当する事務所が見つかりませんでした。
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  他の条件でお試しください。
                </p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={(page) => buildPageHref(basePath, search, page)}
              onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </section>

          {/* Other search methods */}
          <section className="mt-16 bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-bold text-foreground mb-1">
              その他の検索方法
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              別の切り口から会計事務所を探す
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/search"
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group"
              >
                <Tag className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">
                  エリアから探す
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
              </Link>
              {/* <Link
                href="/ranking"
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group"
              >
                <BarChart2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">
                  ランキングから探す
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
              </Link> */}
              <Link
                href="/introduction"
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group"
              >
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary flex-1">
                  税理士を紹介してもらう
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
