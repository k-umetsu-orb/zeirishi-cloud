/**
 * Sitemap page - /sitemap
 * Design: Warm Authority - organized site structure display.
 */
import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { getRegions, getPrefecturesByRegion } from "@/lib/data";
import { usePageTitle } from "@/lib/usePageTitle";

export default function SitemapPage() {
  usePageTitle(
    "サイトマップ | 税理士クラウド",
    "税理士クラウドのサイトマップです。税理士・会計事務所をお探しなら税理士クラウド。",
  );
  const regions = getRegions();

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
                <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">検索トップ</Link></li>
                {/* <li><Link href="/ranking" className="text-sm text-muted-foreground hover:text-primary transition-colors">ランキング</Link></li> */}
                <li><Link href="/interview" className="text-sm text-muted-foreground hover:text-primary transition-colors">インタビュー</Link></li>
                <li><Link href="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">ガイド</Link></li>
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
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">利用規約</Link></li>
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
                    {prefs.map((pref) => (
                      <li key={pref.slug}>
                        <Link
                          href={`/${pref.slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {pref.name}の税理士
                        </Link>
                      </li>
                    ))}
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
