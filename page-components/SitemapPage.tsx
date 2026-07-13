/**
 * Sitemap page - /sitemap
 * Design: Warm Authority - organized site structure display.
 */
import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { getRegions, getPrefecturesByRegion, getCitiesByPrefecture } from "@/lib/data";
import { getCategoriesByType } from "@/lib/categorySlugMap";
import { usePageTitle } from "@/lib/usePageTitle";

interface SitemapPageProps {
  availableCategorySlugs: string[];
}

export default function SitemapPage({ availableCategorySlugs }: SitemapPageProps) {
  usePageTitle(
    "サイトマップ | 税理士クラウド",
    "税理士クラウドのサイトマップです。税理士・会計事務所をお探しなら税理士クラウド。",
  );
  const regions = getRegions();
  // 事務所が0件（404化されている）カテゴリへのリンクは出さない
  const availableCategorySlugSet = new Set(availableCategorySlugs);
  const industries = getCategoriesByType("industry").filter((c) => availableCategorySlugSet.has(c.slug));
  const services = getCategoriesByType("service").filter((c) => availableCategorySlugSet.has(c.slug));

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={[{ label: "サイトマップ" }]} />

          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
            サイトマップ
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main pages */}
            <div>
              <h2 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                メインページ
              </h2>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">トップページ</Link></li>
                <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">税理士検索</Link></li>
                {/* <li><Link href="/ranking" className="text-sm text-muted-foreground hover:text-primary transition-colors">ランキング</Link></li> */}
                <li><Link href="/interview" className="text-sm text-muted-foreground hover:text-primary transition-colors">インタビュー</Link></li>
                <li><Link href="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">選び方ガイド</Link></li>
                <li><Link href="/column" className="text-sm text-muted-foreground hover:text-primary transition-colors">コラム</Link></li>
                <li><Link href="/recommendation" className="text-sm text-muted-foreground hover:text-primary transition-colors">おすすめ事務所</Link></li>
                <li><Link href="/introduction" className="text-sm text-muted-foreground hover:text-primary transition-colors">税理士紹介サービス</Link></li>
              </ul>
            </div>

            {/* Info pages */}
            <div>
              <h2 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                サイト情報
              </h2>
              <ul className="space-y-2">
                <li><Link href="/company" className="text-sm text-muted-foreground hover:text-primary transition-colors">運営会社</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">利用規約</Link></li>
              </ul>
            </div>

            {/* Industry category pages */}
            <div>
              <h2 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                業界一覧
              </h2>
              <ul className="space-y-2">
                {industries.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {cat.name}に強い税理士
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service category pages */}
            <div>
              <h2 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                依頼内容一覧
              </h2>
              <ul className="space-y-2">
                {services.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {cat.name}に強い税理士
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Area pages */}
            {regions.map((region) => {
              const prefs = getPrefecturesByRegion(region.name);
              return (
                <div key={region.name}>
                  <h2 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                    {region.name}
                  </h2>
                  <ul className="space-y-2">
                    {prefs.map((pref) => {
                      const cities = getCitiesByPrefecture(pref.slug);
                      return (
                        <li key={pref.slug}>
                          <Link
                            href={`/${pref.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {pref.name}の税理士
                          </Link>
                          {cities.length > 0 && (
                            <details className="mt-1 ml-3">
                              <summary className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                市区町村一覧
                              </summary>
                              <ul className="mt-1 ml-2 space-y-1">
                                {cities.map((city) => (
                                  <li key={city.slug}>
                                    <Link
                                      href={`/${pref.slug}/${city.slug}`}
                                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {city.name}
                                    </Link>
                                    {city.wards && city.wards.length > 0 && (
                                      <ul className="ml-3 space-y-1">
                                        {city.wards.map((ward) => (
                                          <li key={ward.slug}>
                                            <Link
                                              href={`/${pref.slug}/${city.slug}/${ward.slug}`}
                                              className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                              {ward.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
