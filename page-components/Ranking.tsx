/**
 * Ranking page - /ranking
 * Design: zeiri4.com/ranking/ inspired — numbered list, filter tabs, clean cards.
 */
import { useState, useEffect } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Link from "next/link";
import { MapPin, Train, ChevronRight } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import type { Office } from "@/lib/data";
import { getRegions, getPrefecturesByRegion, buildOfficeUrl } from "@/lib/data";

// rank badge style
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-extrabold text-base"
        style={{ background: "linear-gradient(135deg,#f5c842,#d4960a)" }}>
        1
      </div>
    );
  if (rank === 2)
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-extrabold text-base"
        style={{ background: "linear-gradient(135deg,#c0c8d0,#8a9298)" }}>
        2
      </div>
    );
  if (rank === 3)
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-extrabold text-base"
        style={{ background: "linear-gradient(135deg,#e09060,#b05820)" }}>
        3
      </div>
    );
  return (
    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground font-bold text-sm">
      {rank}
    </div>
  );
}

export default function Ranking() {
  usePageTitle(
    "人気の税理士・会計事務所ランキング | 税理士クラウド",
    "全国の税理士・会計事務所のランキングです。各事務所の得意業種・業務内容をチェックしてください。お困りの方は紹介料無料の税理士紹介サービスをご利用ください。",
  );
  const [selectedPref, setSelectedPref] = useState<string | null>(null);
  const [showAllPrefs, setShowAllPrefs] = useState(false);
  const [sortedOffices, setSortedOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);

  const regions = getRegions();

  useEffect(() => {
    setLoading(true);
    const q = new URLSearchParams();
    if (selectedPref) q.set("prefecture", selectedPref);
    q.set("sort", "staffCount");
    q.set("limit", "50");
    fetch(`/api/offices?${q.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setSortedOffices(data.offices ?? []);
        setLoading(false);
      });
  }, [selectedPref]);

  const allPrefs = regions.flatMap((r) => getPrefecturesByRegion(r.name));
  const visiblePrefs = showAllPrefs ? allPrefs : allPrefs.slice(0, 20);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fa]">
      <GlobalHeader />

      <main className="flex-1">
        {/* ── Page header ── */}
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container py-10 md:py-14">
            <Breadcrumb items={[{ label: "税理士ランキング" }]} />
            <h1 className="font-bold text-2xl md:text-3xl text-foreground mb-3">
              会計事務所ランキング
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              全国の会計事務所をランキング形式で掲載しています。
            </p>
          </div>
        </section>

        <div className="container py-8 space-y-5">
          {/* ── Prefecture filter ── */}
          <div className="bg-white border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              エリアで絞り込む
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedPref(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  !selectedPref
                    ? "bg-primary text-white"
                    : "border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                全国
              </button>
              {visiblePrefs.map((pref) => (
                <button
                  key={pref.slug}
                  onClick={() => setSelectedPref(pref.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedPref === pref.slug
                      ? "bg-primary text-white"
                      : "border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {pref.name}
                </button>
              ))}
              {!showAllPrefs && allPrefs.length > 20 && (
                <button
                  onClick={() => setShowAllPrefs(true)}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-dashed border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  +{allPrefs.length - 20}件 すべて表示
                </button>
              )}
            </div>
          </div>

          {/* ── Result count ── */}
          <p className="text-sm text-muted-foreground px-1">
            <span className="font-bold text-foreground">{sortedOffices.length}</span> 件の事務所が見つかりました
            {selectedPref && (
              <button
                onClick={() => setSelectedPref(null)}
                className="ml-3 text-xs text-primary hover:underline"
              >
                絞り込みを解除
              </button>
            )}
          </p>

          {/* ── Ranked list ── */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">読み込み中…</div>
          ) : sortedOffices.length > 0 ? (
            <div className="space-y-3">
              {sortedOffices.map((office, index) => {
                const rank = index + 1;
                const url  = buildOfficeUrl(office);
                return (
                  <Link key={office.id} href={url} className="block group">
                    <article className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all duration-150 ${
                      rank <= 3 ? "border-primary/30 shadow-sm" : "border-border"
                    }`}>
                      {/* ── Header row ── */}
                      <div className={`flex items-center gap-3 px-5 py-3 border-b-2 ${
                        rank === 1 ? "border-amber-400"
                        : rank === 2 ? "border-slate-400"
                        : rank === 3 ? "border-orange-400"
                        : "border-primary/30"
                      }`}>
                        <RankBadge rank={rank} />
                        <span className="text-xs text-muted-foreground font-medium">位</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                        <h2 className="font-bold text-base md:text-lg text-foreground leading-snug group-hover:text-primary transition-colors flex-1 min-w-0 truncate">
                          {office.name}
                        </h2>
                        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary shrink-0">
                          {office.type}
                        </span>
                      </div>

                      {/* ── Body: photo + info ── */}
                      <div className="flex gap-5 p-5">
                        {/* Placeholder photo */}
                        <div className="w-32 md:w-40 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center aspect-[3/4]">
                          <svg viewBox="0 0 120 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <rect width="120" height="160" fill="#dde8f5" />
                            <circle cx="60" cy="58" r="28" fill="#a8c4e0" />
                            <path d="M10 160 Q10 105 60 105 Q110 105 110 160Z" fill="#a8c4e0" />
                          </svg>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="space-y-1.5 text-sm text-muted-foreground">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
                              <span>{office.address}</span>
                            </div>
                            {office.nearestStationNames.length > 0 && (
                              <div className="flex items-start gap-2">
                                <Train className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
                                <span>{office.nearestStationNames.join("・")}</span>
                              </div>
                            )}
                          </div>

                          {/* Services + industries box */}
                          <div className="border border-border rounded-lg p-3 space-y-2">
                            <div className="flex items-start gap-3">
                              <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">得意分野</span>
                              <div className="flex flex-wrap gap-1">
                                {office.services.slice(0, 4).map((s) => (
                                  <span key={s} className="inline-flex items-center px-2 py-0.5 rounded border border-border text-xs text-foreground">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {office.industries.length > 0 && (
                              <div className="flex items-start gap-3">
                                <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">得意業種</span>
                                <div className="flex flex-wrap gap-1">
                                  {office.industries.slice(0, 5).map((ind) => (
                                    <span key={ind} className="inline-flex items-center px-2 py-0.5 rounded border border-border text-xs text-foreground">
                                      {ind}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {office.staffCount > 0 && (
                            <p className="text-xs text-muted-foreground">
                              職員数 <span className="font-bold text-foreground">{office.staffCount}</span>名
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ── Footer link ── */}
                      <div className="border-t border-border px-5 py-3 text-center">
                        <span className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:underline">
                          この事務所の詳細を見る
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-border rounded-xl">
              <p className="text-muted-foreground">該当する事務所が見つかりませんでした。</p>
              <button onClick={() => setSelectedPref(null)} className="mt-3 text-sm text-primary hover:underline">
                絞り込みを解除する
              </button>
            </div>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
