/**
 * Column List page - /column
 * Design: Warm Authority - editorial listing of column articles.
 */
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/data";
import { usePageTitle } from "@/lib/usePageTitle";

export default function ColumnList() {
  usePageTitle(
    "ノウハウコラム一覧 | 税理士クラウド",
    "税務に関するノウハウ記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。",
  );
  const articles = getArticlesByCategory("column");

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container pt-6 pb-10 md:pb-14">
            <Breadcrumb items={[{ label: "コラム" }]} className="pt-3 pb-7 md:pb-11" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              コラム
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              税務・会計に関する最新トピックスやお役立ち情報をお届けするコラム記事です。
            </p>
          </div>
        </section>

        <div className="container py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
