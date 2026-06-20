/**
 * Recommendation List page - /recommendation
 * Design: Warm Authority - organized by prefecture and city.
 */
import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { getRecommendationArticles, getPrefectureBySlug, getCityBySlug } from "@/lib/data";
import { usePageTitle } from "@/lib/usePageTitle";

export default function RecommendationList() {
  usePageTitle(
    "エリア別おすすめ税理士・会計事務所 | 税理士クラウド",
    "エリア別のおすすめ税理士・会計事務所の紹介記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。",
  );
  const articles = getRecommendationArticles();

  // Group by prefecture
  const prefGroups: Record<string, typeof articles> = {};
  const cityGroups: Record<string, typeof articles> = {};

  articles.forEach((a) => {
    if (a.relatedCity && a.relatedPrefecture) {
      const key = `${a.relatedPrefecture}/${a.relatedCity}`;
      if (!cityGroups[key]) cityGroups[key] = [];
      cityGroups[key].push(a);
    } else if (a.relatedPrefecture) {
      if (!prefGroups[a.relatedPrefecture]) prefGroups[a.relatedPrefecture] = [];
      prefGroups[a.relatedPrefecture].push(a);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container pt-6 pb-10 md:pb-14">
            <Breadcrumb items={[{ label: "おすすめ事務所" }]} className="pt-3 pb-7 md:pb-11" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              おすすめ会計事務所
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              地域別のおすすめ会計事務所をご紹介する記事一覧です。
            </p>
          </div>
        </section>

        <div className="container py-10">
          {/* Prefecture-level articles */}
          {Object.keys(prefGroups).length > 0 && (
            <section className="mb-10">
              <h2 className="section-heading font-serif text-xl font-bold text-foreground mb-5">
                都道府県別おすすめ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(prefGroups).map(([prefSlug, arts]) => {
                  const pref = getPrefectureBySlug(prefSlug);
                  return arts.map((a) => (
                    <Link
                      key={a.id}
                      href={`/${prefSlug}/${a.slug}`}
                      className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-2">
                        {pref?.name || prefSlug}
                      </span>
                      <h3 className="font-serif font-bold text-base text-foreground leading-snug line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {a.excerpt}
                      </p>
                    </Link>
                  ));
                })}
              </div>
            </section>
          )}

          {/* City-level articles */}
          {Object.keys(cityGroups).length > 0 && (
            <section>
              <h2 className="section-heading font-serif text-xl font-bold text-foreground mb-5">
                市区町村別おすすめ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(cityGroups).map(([key, arts]) => {
                  const [prefSlug, citySlug] = key.split("/");
                  const pref = getPrefectureBySlug(prefSlug);
                  const city = getCityBySlug(prefSlug, citySlug);
                  return arts.map((a) => (
                    <Link
                      key={a.id}
                      href={`/${prefSlug}/${citySlug}/${a.slug}`}
                      className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-2">
                        {pref?.name} {city?.name}
                      </span>
                      <h3 className="font-serif font-bold text-base text-foreground leading-snug line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {a.excerpt}
                      </p>
                    </Link>
                  ));
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
