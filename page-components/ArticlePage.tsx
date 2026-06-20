/**
 * Article page - for guide, column, and recommendation articles.
 * Design: Warm Authority - editorial layout with TOC, FAQ, related articles.
 */
import Link from "next/link";
import { Calendar, User, BookOpen, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import { Streamdown } from "streamdown";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import ArticleCard from "@/components/ArticleCard";
import type { Article, Prefecture, City } from "@/lib/data";
import { getArticlesByCategory, getPrefectureBySlug, getCityBySlug } from "@/lib/data";

interface ArticlePageProps {
  article: Article;
  prefecture?: Prefecture;
  city?: City;
}

export default function ArticlePage({ article, prefecture, city }: ArticlePageProps) {
  let documentTitle = `${article.title} | 税理士クラウド`;
  let documentDescription = article.excerpt;
  if (article.category === "recommendation") {
    const area = [prefecture?.name, city?.name].filter(Boolean).join("");
    documentTitle = `${area}のおすすめ税理士・会計事務所を紹介 | 税理士クラウド`;
    documentDescription = `${area}でおすすめの税理士・会計事務所をご紹介。${area}の税理士・会計事務所の選び方や費用相場などを詳しく解説します。`;
  }
  usePageTitle(documentTitle, documentDescription);

  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [];

  if (article.category === "guide") {
    breadcrumbItems.push({ label: "ガイド", href: "/guide" });
  } else if (article.category === "column") {
    breadcrumbItems.push({ label: "コラム", href: "/column" });
  } else if (article.category === "recommendation") {
    breadcrumbItems.push();
    if (prefecture) {
      breadcrumbItems.push({ label: prefecture.name, href: `/${prefecture.slug}` });
    }
    if (city) {
      breadcrumbItems.push({ label: city.name, href: `/${prefecture!.slug}/${city.slug}` });
    }
  }
  breadcrumbItems.push({ label: article.title });

  // Extract headings for TOC
  const toc = useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: { level: number; text: string; id: string }[] = [];
    let match;
    while ((match = headingRegex.exec(article.content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.replace(/\s+/g, "-").toLowerCase();
      items.push({ level, text, id });
    }
    return items;
  }, [article.content]);

  // Related articles
  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  // FAQ items from content (simple extraction)
  const faqItems = useMemo(() => {
    // Generate generic FAQ based on category
    if (article.category === "guide") {
      return [
        { question: "この記事の内容は最新ですか？", answer: "定期的に内容を見直し、最新の税制改正に対応した情報を提供しています。" },
        { question: "税理士に相談する際のポイントは？", answer: "まずは自分のニーズを明確にし、複数の事務所を比較検討することをおすすめします。" },
      ];
    }
    if (article.category === "recommendation") {
      return [
        { question: "おすすめ事務所はどのように選定していますか？", answer: "事務所の実績、対応分野、地域での評判などを総合的に考慮して選定しています。" },
        { question: "掲載されている事務所に直接連絡できますか？", answer: "各事務所の詳細ページから連絡先を確認いただけます。また、紹介サービスもご利用いただけます。" },
      ];
    }
    return [
      { question: "この記事に関するご質問は？", answer: "お問い合わせフォームからお気軽にご連絡ください。" },
    ];
  }, [article.category]);

  const categoryLabels: Record<string, string> = {
    guide: "ガイド",
    column: "コラム",
    recommendation: "おすすめ",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex gap-10">
            {/* Main content */}
            <article className="flex-1 max-w-3xl">
              {/* Badge */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-3">
                {categoryLabels[article.category] || article.category}
              </span>

              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  著者: {article.author}
                </span>
                {article.supervisor && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    監修: {article.supervisor}
                  </span>
                )}
              </div>

              {/* TOC */}
              {toc.length > 0 && (
                <nav className="bg-secondary/50 border border-border rounded-lg p-5 mb-8">
                  <h2 className="font-sans font-semibold text-sm text-foreground mb-3">目次</h2>
                  <ul className="space-y-1.5">
                    {toc.map((item, index) => (
                      <li
                        key={index}
                        className={item.level === 3 ? "pl-4" : ""}
                      >
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Excerpt */}
              <p className="text-base text-muted-foreground leading-relaxed mb-8 pb-6 border-b border-border">
                {article.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed mb-10">
                <Streamdown>{article.content}</Streamdown>
              </div>

              {/* Author / Supervisor */}
              <div className="bg-secondary/50 border border-border rounded-lg p-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">著者</p>
                    <p className="font-medium text-sm text-foreground">{article.author}</p>
                    {article.supervisor && (
                      <>
                        <p className="text-xs text-muted-foreground mt-3 mb-1">監修</p>
                        <p className="font-medium text-sm text-foreground">{article.supervisor}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mb-10">
                <FAQ items={faqItems} />
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <section className="mb-10">
                  <h2 className="section-heading font-serif text-xl font-bold text-foreground mb-5">
                    関連記事
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((a) => {
                      if (article.category === "recommendation") {
                        const relPref = a.relatedPrefecture ? getPrefectureBySlug(a.relatedPrefecture) : undefined;
                        const relCity = (a.relatedPrefecture && a.relatedCity) ? getCityBySlug(a.relatedPrefecture, a.relatedCity) : undefined;
                        const href = relCity
                          ? `/${a.relatedPrefecture}/${a.relatedCity}/${a.slug}`
                          : relPref
                          ? `/${a.relatedPrefecture}/${a.slug}`
                          : `/recommendation`;
                        const badgeLabel = relCity
                          ? `${relPref?.name} ${relCity.name}`
                          : relPref?.name || "おすすめ";
                        return (
                          <Link
                            key={a.id}
                            href={href}
                            className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-2">
                              {badgeLabel}
                            </span>
                            <h3 className="font-serif font-bold text-base text-foreground leading-snug line-clamp-2">
                              {a.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {a.excerpt}
                            </p>
                          </Link>
                        );
                      }
                      return <ArticleCard key={a.id} article={a} />;
                    })}
                  </div>
                </section>
              )}

              {/* Internal links */}
              <section className="mb-10">
                <h2 className="section-heading font-serif text-lg font-bold text-foreground mb-4">
                  関連リンク
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/search"
                    className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    会計事務所を探す
                  </Link>
                  {/* <Link
                    href="/ranking"
                    className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    ランキング
                  </Link> */}
                  <Link
                    href="/introduction"
                    className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    紹介サービス
                  </Link>
                  {prefecture && (
                    <Link
                      href={`/${prefecture.slug}`}
                      className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      {prefecture.name}の税理士
                    </Link>
                  )}
                </div>
              </section>
            </article>

            {/* Sidebar - visible on large screens */}
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-20 space-y-6">
                {/* Search CTA */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-2">
                    税理士を探す
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    全国の会計事務所をエリアから検索できます。
                  </p>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                  >
                    検索ページへ
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Category links */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-2">
                    カテゴリ
                  </h3>
                  <ul className="space-y-1.5">
                    <li>
                      <Link href="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ガイド
                      </Link>
                    </li>
                    <li>
                      <Link href="/column" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        コラム
                      </Link>
                    </li>
                    <li>
                      <Link href="/recommendation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        おすすめ事務所
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
