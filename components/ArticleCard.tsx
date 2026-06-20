import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Article } from "@/lib/data";

/** markdownを剥いてプレーンテキストを返す */
function stripMarkdown(md: string): string {
  return md
    .replace(/^#+\s+/gm, "")       // 見出し
    .replace(/\*\*(.+?)\*\*/g, "$1") // 太字
    .replace(/\*(.+?)\*/g, "$1")    // 斜体
    .replace(/`(.+?)`/g, "$1")      // コード
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // リンク
    .replace(/^[-*]\s+/gm, "")      // リスト
    .replace(/\n{2,}/g, " ")        // 改行まとめ
    .trim();
}

interface ArticleCardProps {
  article: Article;
  basePath?: string;
  compact?: boolean;
}

const headerBg: Record<string, string> = {
  guide: "bg-gradient-to-br from-blue-50 to-indigo-100",
  column: "bg-gradient-to-br from-amber-0 to-amber-0",
  recommendation: "bg-gradient-to-br from-green-50 to-emerald-100",
};

const categoryLabels: Record<string, string> = {
  guide: "ガイド",
  column: "コラム",
  recommendation: "おすすめ",
};

export default function ArticleCard({ article, basePath, compact }: ArticleCardProps) {
  let href = "";
  if (basePath) {
    href = `${basePath}/${article.slug}`;
  } else if (article.category === "guide") {
    href = `/guide/${article.slug}`;
  } else if (article.category === "column") {
    href = `/column/${article.slug}`;
  } else if (article.category === "recommendation") {
    if (article.relatedCity) {
      href = `/${article.relatedPrefecture}/${article.relatedCity}/${article.slug}`;
    } else if (article.relatedPrefecture) {
      href = `/${article.relatedPrefecture}/${article.slug}`;
    } else {
      href = `/recommendation`;
    }
  }

  const bg = headerBg[article.category] ?? headerBg.guide;
  const label = categoryLabels[article.category] ?? article.category;

  if (compact) {
    return (
      <Link
        href={href}
        className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      >
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-2">
          {label}
        </span>
        <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {article.excerpt}
        </p>
      </Link>
    );
  }

  return (
    <Link href={href} className="block h-full">
      <article className="flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ minHeight: "420px" }}>
        {/* Colored header: tag + title (60%) */}
        <div className={`${bg} px-5 pt-8 pb-8 flex flex-col justify-center`} style={{ flex: "6 0 0" }}>
          <p className="text-center text-xs text-slate-400 font-medium mb-4">
            # {label}
          </p>
          <h3 className="font-bold text-[1.0625rem] text-[#1a50a8] leading-snug line-clamp-4 text-center">
            {article.title}
          </h3>
        </div>

        {/* White content: excerpt + CTA (40%) */}
        <div className="flex flex-col px-5 py-5 border-t border-border/60" style={{ flex: "4 0 0" }}>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {stripMarkdown(article.content)}
          </p>
          <span className="mt-4 text-sm font-bold text-foreground inline-flex items-center justify-center gap-1">
            詳しくみる
            <ChevronRight className="w-4 h-4 text-primary" />
          </span>
        </div>
      </article>
    </Link>
  );
}
