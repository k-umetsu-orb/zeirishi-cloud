/**
 * Office Detail page - company overview + supplementary navigation.
 * No reviews, ratings, maps, photos, tabs, or large CTAs.
 */
import { useEffect } from "react";
import Link from "next/link";
import { usePageTitle } from "@/lib/usePageTitle";
import { ArrowRight, ChevronRight, ExternalLink, Phone, Printer, MapPin } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import type { Prefecture, City, Ward, Station, Office } from "@/lib/data";
import { toDisplayName } from "@/lib/categorySlugMap";
import {
  getCitiesByPrefecture,
  getStationsForCity,
  getInterviewsByOffice,
  buildSearchUrl,
  buildOfficeUrl,
} from "@/lib/data";

interface OfficeDetailProps {
  prefecture: Prefecture;
  city: City;
  ward?: Ward;
  station?: Station;
  office: Office;
  sameAreaOffices: Office[];
}

// ─── Company overview row types ─────────────────────────

type RowType = "text" | "tel" | "fax" | "url" | "chips" | "textarea" | "nullable" | "address";

interface OverviewRow {
  label: string;
  value: string | string[] | number | null | undefined;
  type: RowType;
  accent?: boolean;
}

function displayValue(value: string | string[] | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.length > 0 ? value.join("、") : "-";
  return value;
}

// ─── Row renderers ───────────────────────────────────────

function ChipsValue({ values, accent }: { values: string[]; accent?: boolean }) {
  if (!values || values.length === 0)
    return <span className="text-sm text-muted-foreground">-</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <span
          key={v}
          className={
            accent
              ? "inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary"
              : "inline-flex items-center px-2.5 py-1 rounded border border-border bg-muted/30 text-sm text-foreground"
          }
        >
          {v}
        </span>
      ))}
    </div>
  );
}

function OverviewRowItem({ row, id }: { row: OverviewRow; id?: string }) {
  const val = displayValue(row.value);

  let valueNode: React.ReactNode;

  switch (row.type) {
    case "chips":
      valueNode = (
        <ChipsValue
          values={Array.isArray(row.value) ? row.value : []}
          accent={row.accent}
        />
      );
      break;

    case "url":
      valueNode =
        val === "-" ? (
          <span className="text-sm text-muted-foreground">-</span>
        ) : (
          <a
            href={val}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline break-all"
          >
            {val}
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        );
      break;

    case "tel":
      valueNode =
        val === "-" ? (
          <span className="text-sm text-muted-foreground">-</span>
        ) : (
          <a
            href={`tel:${val}`}
            className="inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-primary"
          >
            <Phone className="w-4 h-4 text-primary shrink-0" />
            {val}
          </a>
        );
      break;

    case "fax":
      valueNode = (
        <span className="inline-flex items-center gap-2 text-sm text-foreground">
          <Printer className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {val}
        </span>
      );
      break;

    case "address":
      valueNode = (
        <div className="space-y-3">
          <span className="text-sm text-foreground leading-relaxed">{val}</span>
          {val !== "-" && (
            <div className="rounded-md overflow-hidden border border-border w-[400px] max-w-full">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(val)}&output=embed&hl=ja&z=15`}
                width="400"
                height="250"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${val}の地図`}
              />
            </div>
          )}
        </div>
      );
      break;

    case "textarea":
      valueNode = (
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{val}</p>
      );
      break;

    default:
      valueNode = (
        <span
          className={`text-sm leading-relaxed ${row.accent ? "text-primary" : "text-foreground"}`}
        >
          {val}
        </span>
      );
  }

  return (
    <div id={id} className="flex flex-col sm:flex-row border-b border-border last:border-b-0">
      <dt className="shrink-0 sm:w-[210px] px-5 py-4 bg-muted/40 text-sm font-medium text-foreground sm:border-r sm:border-border">
        {row.label}
      </dt>
      <dd className="flex-1 min-w-0 px-5 py-4">{valueNode}</dd>
    </div>
  );
}

// ─── Section heading ─────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold text-foreground flex items-center gap-2.5 mb-4">
      <span
        className="w-1 h-[1.1em] bg-primary rounded-full inline-block shrink-0"
        aria-hidden="true"
      />
      {children}
    </h2>
  );
}

// ─── Nearby office list item ─────────────────────────────

function NearbyOfficeCard({ office }: { office: Office }) {
  const url = buildOfficeUrl(office);
  return (
    <Link
      href={url}
      className="group block h-full bg-white border border-border rounded-xl px-4 py-8 text-left hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-4">
        {office.name}
      </h3>
      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-primary/60" />
        <span className="line-clamp-3">{office.address}</span>
      </div>
    </Link>
  );
}

// ─── Main component ──────────────────────────────────────

export default function OfficeDetail({
  prefecture,
  city,
  ward,
  station,
  office,
  sameAreaOffices,
}: OfficeDetailProps) {
  usePageTitle(
    `${office.name} | 税理士クラウド`,
    `${office.name}は${prefecture.name}${city.name}の税理士・会計事務所です。${office.name}の得意な業種や業務内容をご覧いただけます。`,
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  // Breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: prefecture.name, href: `/${prefecture.slug}` },
    { label: city.name, href: `/${prefecture.slug}/${city.slug}` },
  ];
  if (ward) {
    breadcrumbItems.push({
      label: ward.name,
      href: `/${prefecture.slug}/${city.slug}/${ward.slug}`,
    });
  }
  if (station) {
    breadcrumbItems.push({
      label: station.name,
      href: buildSearchUrl(prefecture.slug, city.slug, ward?.slug, station.slug),
    });
  }
  breadcrumbItems.push({ label: office.name });

  // Related data (sameAreaOffices passed as prop from getStaticProps)

  const nearbyCities = getCitiesByPrefecture(prefecture.slug)
    .filter((c) => c.slug !== city.slug)
    .slice(0, 10);

  const nearbyStations = getStationsForCity(prefecture.slug, city.slug, ward?.slug)
    .filter((s) => !station || s.slug !== station.slug)
    .slice(0, 10);

  const officeInterviews = getInterviewsByOffice(office.id);

  // Area label for section headings
  const areaLabel = ward ? `${city.name}${ward.name}` : city.name;

  // Company overview rows
  const accessText = office.nearestStationNames.length > 0
    ? office.nearestStationNames.join(" / ")
    : null;

  const overviewRows: OverviewRow[] = [
    { label: "事務所名", value: office.name, type: "text" },
    // { label: "事業所区分", value: office.type, type: "text" },
    { label: "主要な取り扱い業種", value: office.industries.map(toDisplayName), type: "chips", accent: true },
    { label: "主な業務", value: office.services.map(toDisplayName), type: "chips", accent: true },
    // { label: "詳しい事業内容", value: office.description, type: "textarea" },
    { label: "職員数", value: office.staffCount != null ? `${office.staffCount}人` : null, type: "text" },
    { label: "有資格者の職員構成", value: office.qualifiedStaff, type: "text" },
    // { label: "取り扱っている会計ソフト", value: office.accountingSoftware, type: "chips", accent: true },
    // { label: "資本金・売上実績", value: office.capital, type: "nullable" },
    // { label: "TEL", value: office.tel, type: "tel" },
    // { label: "FAX", value: office.fax, type: "fax" },
    { label: "設立", value: office.establishedYear != null ? `${office.establishedYear}年` : null, type: "text" },
    { label: "ホームページURL", value: office.websiteUrl, type: "url" },
    { label: "住所", value: office.address, type: "address" },
    { label: "アクセス", value: accessText, type: "nullable" },
    // { label: "グループ会社名", value: office.groupCompany, type: "nullable" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8]">
      <GlobalHeader />

      <main className="pb-4">
        <div className="container py-6">
          <Breadcrumb items={breadcrumbItems} />

          {/* ─── Office header ───────────────────────────── */}
          <div className="mt-4 mb-8 pb-7 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">{office.type}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {office.name}
            </h1>
          </div>

          {/* ─── Company overview ─────────────────────────── */}
          <section className="mb-10">
            <SectionHeading>事務所概要</SectionHeading>
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <dl>
                {overviewRows.map((row, i) => (
                  <OverviewRowItem key={i} row={row} id={row.type === "address" ? "map" : undefined} />
                ))}
              </dl>
            </div>
          </section>

          {/* ─── Interviews ───────────────────────────────── */}
          {officeInterviews.length > 0 && (
            <section className="mb-10">
              <SectionHeading>インタビュー</SectionHeading>
              <div className="space-y-3">
                {officeInterviews.map((iv) => (
                  <Link
                    key={iv.id}
                    href={`${buildOfficeUrl(office, station?.slug)}/${iv.id}`}
                    className="block bg-white border border-border rounded-lg p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium mb-2.5">
                      インタビュー
                    </span>
                    <h3 className="font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                      {iv.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                      {iv.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ─── Introduction service CTA ─────────────────── */}
          <section className="mb-10">
            <div className="overflow-hidden rounded-xl border border-blue-100">
              {/* 上部帯 */}
              <div className="px-5 py-3.5 text-center text-sm font-semibold text-white" style={{ background: "#0067C0" }}>
                税理士選びにお困りの方へ
              </div>

              {/* 本体 */}
              <div className="px-6 py-8" style={{ background: "linear-gradient(160deg, #e8f3fc 0%, #f0f7ff 100%)" }}>
                <p className="font-bold text-xl md:text-2xl text-gray-800 leading-snug mb-3">
                  希望の条件を伝えるだけで、<br className="sm:hidden" />
                  <span style={{ color: "#0067C0" }}>ぴったりの税理士</span>をご紹介します
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-7">
                  専任のコーディネーターがご要望をお伺いし、複数の事務所を無料でご提案。じっくり比較・検討していただけます。
                </p>

                {/* CTA ボタン */}
                <Link
                  href="/introduction"
                  className="inline-flex items-center gap-3 rounded-lg px-5 py-4 text-base font-bold shadow-sm hover:opacity-90 transition-opacity w-full"
                  style={{ background: "#fff", border: "1.5px solid #0067C0", color: "#0067C0" }}
                >
                  <span
                    className="shrink-0 rounded px-2 py-0.5 text-sm font-extrabold text-white"
                    style={{ background: "#f5a623" }}
                  >
                    無料
                  </span>
                  税理士紹介サービスを利用する
                  <ChevronRight className="w-5 h-5 ml-auto shrink-0" />
                </Link>
              </div>
            </div>
          </section>

          {/* ─── Same area offices ────────────────────────── */}
          {sameAreaOffices.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2.5">
                  <span
                    className="w-1 h-[1.1em] bg-primary rounded-full inline-block shrink-0"
                    aria-hidden="true"
                  />
                  {areaLabel}の他の会計事務所
                </h2>
                <Link
                  href={buildSearchUrl(prefecture.slug, city.slug, ward?.slug)}
                  className="shrink-0 ml-4 text-sm text-primary hover:underline font-medium flex items-center gap-1"
                >
                  一覧を見る
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* SP: 横スクロールカルーセル */}
              <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-3">
                  {sameAreaOffices.map((o) => (
                    <div key={o.id} className="flex-shrink-0" style={{ width: "72vw" }}>
                      <NearbyOfficeCard office={o} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PC: グリッド（変更なし） */}
              <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-3">
                {sameAreaOffices.map((o) => (
                  <NearbyOfficeCard key={o.id} office={o} />
                ))}
              </div>
            </section>
          )}

          {/* ─── Nearby areas ─────────────────────────────── */}
          {nearbyCities.length > 0 && (
            <section className="mb-10">
              <SectionHeading>周辺の地域で探す</SectionHeading>
              <div className="bg-white border border-border rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/${prefecture.slug}`}
                    className="px-3 py-1.5 rounded border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {prefecture.name}
                  </Link>
                  {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${prefecture.slug}/${c.slug}`}
                      className="px-3 py-1.5 rounded border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ─── Nearby stations ──────────────────────────── */}
          {nearbyStations.length > 0 && (
            <section className="mb-10">
              <SectionHeading>周辺の駅で探す</SectionHeading>
              <div className="bg-white border border-border rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {nearbyStations.map((s) => (
                    <Link
                      key={s.slug}
                      href={buildSearchUrl(prefecture.slug, city.slug, ward?.slug, s.slug)}
                      className="px-3 py-1.5 rounded border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="-mt-12">
        <GlobalFooter />
      </div>

      {/* ─── Sticky bottom CTA ────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div
          className="px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          <Link
            href="/introduction"
            className="flex items-center justify-center gap-3 w-full max-w-lg mx-auto rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #e8622a 0%, #f5a023 100%)" }}
          >
            無料で相談する
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
