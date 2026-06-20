/**
 * Interview Detail page - displays interview content for a specific office.
 * Design: Warm Authority - editorial, trust-building content layout.
 */
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { usePageTitle } from "@/lib/usePageTitle";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import type { Prefecture, City, Ward, Station, Office, Interview } from "@/lib/data";
import { buildSearchUrl, buildOfficeUrl } from "@/lib/data";

interface InterviewDetailProps {
  prefecture: Prefecture;
  city: City;
  ward?: Ward;
  station?: Station;
  office: Office;
  interview: Interview;
}

export default function InterviewDetail({
  prefecture,
  city,
  ward,
  station,
  office,
  interview,
}: InterviewDetailProps) {
  usePageTitle(`${interview.title} | 税理士クラウド`, interview.excerpt);
  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: prefecture.name, href: `/${prefecture.slug}` },
    { label: city.name, href: `/${prefecture.slug}/${city.slug}` },
  ];
  if (ward) {
    breadcrumbItems.push({ label: ward.name, href: `/${prefecture.slug}/${city.slug}/${ward.slug}` });
  }
  if (station) {
    breadcrumbItems.push({
      label: station.name,
      href: buildSearchUrl(prefecture.slug, city.slug, ward?.slug, station.slug),
    });
  }
  breadcrumbItems.push({
    label: office.name,
    href: buildOfficeUrl(office, station?.slug),
  });
  breadcrumbItems.push({ label: "インタビュー" });

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={breadcrumbItems} />

          <article className="max-w-3xl">
            {/* Back link */}
            <Link
              href={buildOfficeUrl(office, station?.slug)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {office.name}に戻る
            </Link>

            {/* Badge */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-3">
              インタビュー
            </span>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              {interview.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(interview.date).toLocaleDateString("ja-JP")}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                インタビュアー: {interview.interviewer}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                回答者: {interview.interviewee}
              </span>
            </div>

            {/* Office info */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8">
              <p className="text-xs text-muted-foreground mb-1">取材先</p>
              <Link
                href={buildOfficeUrl(office, station?.slug)}
                className="font-serif font-bold text-base text-foreground hover:text-primary transition-colors"
              >
                {office.name}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">{office.address}</p>
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
              <Streamdown>{interview.content}</Streamdown>
            </div>

            {/* Back to office */}
            <div className="mt-10 pt-6 border-t border-border">
              <Link
                href={buildOfficeUrl(office, station?.slug)}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {office.name}の詳細ページに戻る
              </Link>
            </div>
          </article>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
