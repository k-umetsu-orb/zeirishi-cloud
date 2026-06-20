/**
 * Interview List page - /interview
 * Design: Warm Authority - editorial, trust-building content listing.
 */
import Link from "next/link";
import { usePageTitle } from "@/lib/usePageTitle";
import { Calendar, ChevronRight } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllInterviews } from "@/lib/data";

interface InterviewListProps {
  interviewUrls: Record<string, string>;
}

export default function InterviewList({ interviewUrls }: InterviewListProps) {
  usePageTitle(
    "インタビュー一覧 | 税理士クラウド",
    "税理士・会計事務所の担当者へのインタビュー一覧です。気になる会計事務所があればインタビュー記事の内容をチェック！",
  );
  const interviews = getAllInterviews();

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container pt-6 pb-10 md:pb-14">
            <Breadcrumb items={[{ label: "インタビュー" }]} className="pt-3 pb-7 md:pb-11" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              税理士インタビュー
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              全国の会計事務所の代表者・スタッフへのインタビューをお届けします。
            </p>
          </div>
        </section>

        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {interviews.map((iv) => {
              const href = interviewUrls[iv.id] ?? "/interview";

              return (
                <Link key={iv.id} href={href} className="group block h-full">
                  <article className="bg-white border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all h-full flex flex-col">
                    {/* Photo */}
                    <div className="aspect-[16/7] overflow-hidden">
                      <img
                        src="/images/interview-placeholder.svg"
                        alt={iv.officeName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                          インタビュー
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(iv.date).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-primary mb-1">{iv.officeName}</p>
                      <div className="border-t border-border/60 my-2" />
                      <h2 className="font-bold text-[0.9375rem] text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
                        {iv.title}
                      </h2>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {iv.excerpt}
                      </p>
                      <span className="text-xs text-primary font-semibold inline-flex items-center gap-1">
                        続きを読む
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
