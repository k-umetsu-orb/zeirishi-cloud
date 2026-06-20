/**
 * Search Top page - /search
 * Design: Warm Authority - clean search portal with region-based navigation.
 */
import Link from "next/link"
import { useRouter } from "next/router";
import { Search, MapPin, ArrowRight, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import OfficeCard from "@/components/OfficeCard";
import Pagination from "@/components/Pagination";
import { getAllPrefectures, getCitiesByPrefecture } from "@/lib/data";
import type { Office } from "@/lib/data";
import japanMapImg from "@/images/japan map_ver2.png";
import { OPTION_NAME_TO_SLUG } from "@/lib/categorySlugMap";

// wouter useSearch → Next.js query string
function useWouterSearch(): string {
  const router = useRouter();
  if (typeof window !== "undefined") {
    return window.location.search.replace(/^\?/, "");
  }
  const q = router.query;
  if (!q) return "";
  const params = new URLSearchParams();
  Object.entries(q).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach(val => params.append(k, val));
    else if (v) params.append(k, v);
  });
  return params.toString();
}

// ─── Region map data ────────────────────────────────────────────────────────

const ACCORDION_REGIONS = [
  { label: "北海道・東北", prefectures: [
    { name: "北海道", slug: "hokkaido" }, { name: "青森", slug: "aomori" },
    { name: "岩手", slug: "iwate" }, { name: "宮城", slug: "miyagi" },
    { name: "秋田", slug: "akita" }, { name: "山形", slug: "yamagata" },
    { name: "福島", slug: "fukushima" },
  ]},
  { label: "関東", prefectures: [
    { name: "茨城", slug: "ibaraki" }, { name: "栃木", slug: "tochigi" },
    { name: "群馬", slug: "gunma" }, { name: "埼玉", slug: "saitama" },
    { name: "千葉", slug: "chiba" }, { name: "東京", slug: "tokyo" },
    { name: "神奈川", slug: "kanagawa" },
  ]},
  { label: "北陸・甲信越", prefectures: [
    { name: "富山", slug: "toyama" }, { name: "石川", slug: "ishikawa" },
    { name: "福井", slug: "fukui" }, { name: "山梨", slug: "yamanashi" },
    { name: "長野", slug: "nagano" }, { name: "新潟", slug: "niigata" },
  ]},
  { label: "東海", prefectures: [
    { name: "岐阜", slug: "gifu" }, { name: "静岡", slug: "shizuoka" },
    { name: "愛知", slug: "aichi" }, { name: "三重", slug: "mie" },
  ]},
  { label: "関西", prefectures: [
    { name: "大阪", slug: "osaka" }, { name: "京都", slug: "kyoto" },
    { name: "兵庫", slug: "hyogo" }, { name: "奈良", slug: "nara" },
    { name: "滋賀", slug: "shiga" }, { name: "和歌山", slug: "wakayama" },
  ]},
  { label: "中国", prefectures: [
    { name: "鳥取", slug: "tottori" }, { name: "島根", slug: "shimane" },
    { name: "岡山", slug: "okayama" }, { name: "広島", slug: "hiroshima" },
    { name: "山口", slug: "yamaguchi" },
  ]},
  { label: "四国", prefectures: [
    { name: "徳島", slug: "tokushima" }, { name: "香川", slug: "kagawa" },
    { name: "愛媛", slug: "ehime" }, { name: "高知", slug: "kochi" },
  ]},
  { label: "九州・沖縄", prefectures: [
    { name: "福岡", slug: "fukuoka" }, { name: "佐賀", slug: "saga" },
    { name: "長崎", slug: "nagasaki" }, { name: "熊本", slug: "kumamoto" },
    { name: "大分", slug: "oita" }, { name: "宮崎", slug: "miyazaki" },
    { name: "鹿児島", slug: "kagoshima" }, { name: "沖縄", slug: "okinawa" },
  ]},
];

const MAP_CARD_REGIONS = [
  {
    id: "hokkaido",
    name: "北海道",
    prefectures: [{ name: "北海道", slug: "hokkaido" }],
  },
  {
    id: "tohoku",
    name: "東北",
    prefectures: [
      { name: "青森", slug: "aomori" },
      { name: "岩手", slug: "iwate" },
      { name: "秋田", slug: "akita" },
      { name: "宮城", slug: "miyagi" },
      { name: "山形", slug: "yamagata" },
      { name: "福島", slug: "fukushima" },
    ],
  },
  {
    id: "kanto",
    name: "関東",
    prefectures: [
      { name: "茨城", slug: "ibaraki" },
      { name: "栃木", slug: "tochigi" },
      { name: "群馬", slug: "gunma" },
      { name: "埼玉", slug: "saitama" },
      { name: "千葉", slug: "chiba" },
      { name: "東京", slug: "tokyo" },
      { name: "神奈川", slug: "kanagawa" },
    ],
  },
  {
    id: "tokai",
    name: "東海",
    prefectures: [
      { name: "岐阜", slug: "gifu" },
      { name: "静岡", slug: "shizuoka" },
      { name: "愛知", slug: "aichi" },
      { name: "三重", slug: "mie" },
    ],
  },
  {
    id: "hokuriku",
    name: "北陸・甲信越",
    prefectures: [
      { name: "富山", slug: "toyama" },
      { name: "石川", slug: "ishikawa" },
      { name: "福井", slug: "fukui" },
      { name: "山梨", slug: "yamanashi" },
      { name: "長野", slug: "nagano" },
      { name: "新潟", slug: "niigata" },
    ],
  },
  {
    id: "chugoku",
    name: "中国",
    prefectures: [
      { name: "鳥取", slug: "tottori" },
      { name: "島根", slug: "shimane" },
      { name: "岡山", slug: "okayama" },
      { name: "広島", slug: "hiroshima" },
      { name: "山口", slug: "yamaguchi" },
    ],
  },
  {
    id: "kinki",
    name: "関西",
    prefectures: [
      { name: "大阪", slug: "osaka" },
      { name: "京都", slug: "kyoto" },
      { name: "兵庫", slug: "hyogo" },
      { name: "奈良", slug: "nara" },
      { name: "滋賀", slug: "shiga" },
      { name: "和歌山", slug: "wakayama" },
    ],
  },
  {
    id: "shikoku",
    name: "四国",
    prefectures: [
      { name: "徳島", slug: "tokushima" },
      { name: "香川", slug: "kagawa" },
      { name: "愛媛", slug: "ehime" },
      { name: "高知", slug: "kochi" },
    ],
  },
  {
    id: "kyushu",
    name: "九州",
    prefectures: [
      { name: "福岡", slug: "fukuoka" },
      { name: "佐賀", slug: "saga" },
      { name: "長崎", slug: "nagasaki" },
      { name: "熊本", slug: "kumamoto" },
      { name: "大分", slug: "oita" },
      { name: "宮崎", slug: "miyazaki" },
      { name: "鹿児島", slug: "kagoshima" },
    ],
  },
  {
    id: "okinawa",
    name: "沖縄",
    prefectures: [{ name: "沖縄", slug: "okinawa" }],
  },
];

const popularConditions = [
  "法人決算・申告", "相続税・資産税対応", "個人確定申告", "記帳代行",
  "起業・会社設立支援", "経営支援", "事業承継・M&A支援", "節税対策",
];

const SERVICE_OPTIONS = [
  "法人決算・申告",
  "インボイス対応",
  "個人確定申告",
  "税務調査対応",
  "記帳代行",
  "経理代行",
  "給与計算代行",
  "年末調整対応",
  "労務・社保対応",
  "電子帳簿保存法対応",
  "会計ソフト導入支援",
  "法人税",
  "消費税",
  "所得税",
  "相続税・資産税対応",
  "節税対策",
  "起業・会社設立支援",
  "法人化支援",
  "資金計画支援",
  "資金調達・補助金支援",
  "経営支援",
  "事業承継・M&A支援",
  "IPO支援",
];

const INDUSTRY_OPTIONS = [
  "IT・通信",
  "建設",
  "製造",
  "流通・小売",
  "卸売",
  "飲食",
  "宿泊",
  "不動産",
  "金融",
  "美容",
  "教育",
  "サービス",
  "農林水産",
  "医療・福祉",
  "各種法人",
  "その他",
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function RegionCard({
  name,
  prefectures,
}: {
  name: string;
  prefectures: { name: string; slug: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-full">
      <h3 className="font-bold text-sm text-foreground mb-3">{name}</h3>
      <div className="flex flex-wrap gap-1.5">
        {prefectures.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="text-xs text-primary border border-primary/40 rounded px-2 py-1 hover:bg-primary hover:text-white hover:border-primary transition-colors whitespace-nowrap inline-flex items-center justify-center w-[3.5em]"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function AccordionArea() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  return (
    <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-white">
      {ACCORDION_REGIONS.map((region) => (
        <div key={region.label}>
          <button
            className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-foreground hover:bg-gray-50 transition-colors"
            onClick={() => setOpenLabel(openLabel === region.label ? null : region.label)}
          >
            <span>{region.label}</span>
            <ChevronDown
              className={`w-4 h-4 text-primary transition-transform duration-200 ${openLabel === region.label ? "rotate-180" : ""}`}
            />
          </button>
          {openLabel === region.label && (
            <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2 bg-gray-50">
              {region.prefectures.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="text-xs text-primary border border-primary/40 rounded-full px-3 py-1.5 hover:bg-primary hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function JapanMapArea() {
  const byId = Object.fromEntries(MAP_CARD_REGIONS.map((r) => [r.id, r]));

  return (
    <>
      {/* Desktop */}
      <div className="hidden xl:flex justify-center">
        <div className="relative" style={{ width: "980px", height: "690px" }}>
          <div className="absolute" style={{ left: "300px", top: "80px", width: "380px" }}>
            <img src={typeof japanMapImg === "string" ? japanMapImg : (japanMapImg as { src: string }).src} alt="" aria-hidden="true" className="w-full" draggable={false} />
          </div>

          {/* Left column */}
          <div className="absolute" style={{ left: 0, top: "50px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.kinki} />
          </div>
          <div className="absolute" style={{ left: 0, top: "210px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.chugoku} />
          </div>
          <div className="absolute" style={{ left: 0, top: "370px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.kyushu} />
          </div>
          <div className="absolute" style={{ left: 0, top: "530px", width: "200px", height: "130px" }}>
            <RegionCard {...byId.okinawa} />
          </div>

          {/* Top-center */}
          <div className="absolute" style={{ left: "305px", top: "8px", width: "215px", height: "130px" }}>
            <RegionCard {...byId.hokuriku} />
          </div>

          {/* Bottom-center */}
          <div className="absolute" style={{ left: "300px", top: "370px", width: "175px", height: "130px" }}>
            <RegionCard {...byId.shikoku} />
          </div>
          <div className="absolute" style={{ left: "485px", top: "370px", width: "195px", height: "130px" }}>
            <RegionCard {...byId.tokai} />
          </div>

          {/* Right column */}
          <div className="absolute" style={{ left: "700px", top: "15px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.hokkaido} />
          </div>
          <div className="absolute" style={{ left: "700px", top: "185px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.tohoku} />
          </div>
          <div className="absolute" style={{ left: "700px", top: "370px", width: "280px", height: "130px" }}>
            <RegionCard {...byId.kanto} />
          </div>
        </div>
      </div>

      {/* Mobile / Tablet: accordion */}
      <div className="xl:hidden">
        <AccordionArea />
      </div>
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

export default function SearchTop() {
  usePageTitle(
    "税理士・会計事務所検索TOP | 税理士クラウド",
    "税理士検索では、3,000件を超える全国の税理士・会計事務所の中から、エリア・駅・得意業種・依頼内容などの条件を絞って検索することができます。",
  );
  const router = useRouter();
  const search = useWouterSearch();
  const [resultPage, setResultPage] = useState(1);
  const [filterResults, setFilterResults] = useState<Office[]>([]);
  const [filterTotal, setFilterTotal] = useState(0);
  const [filterLoading, setFilterLoading] = useState(false);

  // ハッシュ付きURLでのスクロール対応
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, []);

  const [condPref, setCondPref] = useState("");
  const [condCity, setCondCity] = useState("");
  const [condWard, setCondWard] = useState("");
  const [condServices, setCondServices] = useState<string[]>([]);
  const [condIndustries, setCondIndustries] = useState<string[]>([]);

  const allPrefectures = getAllPrefectures();
  const condCityOptions = condPref ? getCitiesByPrefecture(condPref) : [];
  const condWardOptions = condCity
    ? (condCityOptions.find((c) => c.slug === condCity)?.wards ?? [])
    : [];

  // URL パラメーターからフィルター条件を読み取る
  const filterParams = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      industries: params.getAll("industry"),
      services: params.getAll("service"),
    };
  }, [search]);

  const hasFilter = filterParams.industries.length > 0 || filterParams.services.length > 0;

  useEffect(() => {
    if (!hasFilter) {
      setFilterResults([]);
      setFilterTotal(0);
      return;
    }
    setFilterLoading(true);
    setResultPage(1);
    const q = new URLSearchParams();
    filterParams.industries.forEach((i) => q.append("industry", i));
    filterParams.services.forEach((s) => q.append("service", s));
    q.set("page", "1");
    q.set("limit", String(ITEMS_PER_PAGE));
    fetch(`/api/offices?${q.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setFilterResults(data.offices ?? []);
        setFilterTotal(data.total ?? 0);
        setFilterLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (resultPage === 1 || !hasFilter) return;
    const q = new URLSearchParams();
    filterParams.industries.forEach((i) => q.append("industry", i));
    filterParams.services.forEach((s) => q.append("service", s));
    q.set("page", String(resultPage));
    q.set("limit", String(ITEMS_PER_PAGE));
    fetch(`/api/offices?${q.toString()}`)
      .then((r) => r.json())
      .then((data) => { setFilterResults(data.offices ?? []); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultPage]);

  const totalResultPages = Math.ceil(filterTotal / ITEMS_PER_PAGE);

  function toggleItem(list: string[], item: string, set: (v: string[]) => void) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  function handleConditionSearch() {
    const params = new URLSearchParams();
    condIndustries.forEach((i) => params.append("industry", i));
    condServices.forEach((s) => params.append("service", s));

    if (!condPref) {
      // 全国 → 専用結果ページへ
      router.push(params.toString() ? `/search/results?${params.toString()}` : "/search");
      return;
    }

    // 都道府県あり → エリアページへ
    let basePath = `/${condPref}`;
    if (condCity) basePath += `/${condCity}`;
    if (condWard) basePath += `/${condWard}`;
    router.push(params.toString() ? `${basePath}?${params.toString()}` : basePath);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container pt-6 pb-10 md:pb-14">
            <Breadcrumb items={[{ label: "検索" }]} className="pt-3 pb-7 md:pb-11" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              税理士・会計事務所を探す
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              全国の税理士を、エリア・駅・得意分野から検索できます。
            </p>

          </div>
        </section>

        {/* 絞り込み検索結果 */}
        {hasFilter && (
          <section className="py-10 bg-muted/30">
            <div className="container">
              <div className="flex items-baseline gap-2 mb-4">
                <h2 className="text-xl font-bold text-foreground">検索結果</h2>
                <span className="text-base text-muted-foreground font-normal">
                  （{filterLoading ? "…" : `${filterTotal}件`}）
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {filterParams.industries.map((i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    業種：{i}
                  </span>
                ))}
                {filterParams.services.map((s) => (
                  <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                    依頼内容：{s}
                  </span>
                ))}
              </div>
              {filterLoading ? (
                <div className="text-center py-16 text-muted-foreground">読み込み中…</div>
              ) : filterResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterResults.map((o) => (
                    <OfficeCard key={o.id} office={o} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <p className="text-muted-foreground">該当する事務所が見つかりませんでした。</p>
                  <p className="text-sm text-muted-foreground mt-1">条件を変更してお試しください。</p>
                </div>
              )}
              <Pagination
                currentPage={resultPage}
                totalPages={totalResultPages}
                onPageChange={(page) => {
                  setResultPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </section>
        )}

        {/* 人気の条件 */}
        <section className="py-10">
          <div className="container">
            <h2 className="font-serif text-xl font-bold text-foreground mb-5">
              人気の条件
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularConditions.map((cond) => (
                <Link
                  key={cond}
                  href={OPTION_NAME_TO_SLUG[cond] ? `/${OPTION_NAME_TO_SLUG[cond]}` : "/search"}
                  className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  {cond}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* エリアから探す */}
        <section className="py-10 md:py-14 bg-white border-b border-border">
          <div className="container">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-foreground tracking-tight mb-8">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              エリアから探す
            </h2>
            <JapanMapArea />
          </div>
        </section>

        {/* 条件から探す */}
        <section id="requirements" className="py-10 md:py-14 bg-secondary/50 border-b border-border">
          <div className="container">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-foreground tracking-tight mb-8">
              <Search className="w-5 h-5 text-primary shrink-0" />
              条件から探す
            </h2>

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <p className="text-sm text-muted-foreground text-center py-4 border-b border-border">
                条件を選択し、検索ボタンを押してください。
              </p>

              {/* 所在地 */}
              <div className="flex flex-col md:flex-row md:gap-6 px-6 py-5 border-b border-border">
                <span className="text-sm font-bold text-foreground mb-3 md:mb-0 md:shrink-0 md:w-16 md:pt-2">所在地</span>
                <div className="flex flex-col md:flex-row md:flex-wrap gap-3 flex-1">
                  <div className="relative">
                    <select
                      value={condPref}
                      onChange={(e) => { setCondPref(e.target.value); setCondCity(""); setCondWard(""); }}
                      className="w-full md:w-auto appearance-none border border-border rounded-full md:rounded-lg pl-4 md:pl-3 pr-14 md:pr-8 py-3 md:py-2 text-sm bg-white focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="">全国</option>
                      {allPrefectures.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center pointer-events-none md:hidden" style={{ background: "#1a3a6b" }}>
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none hidden md:block" />
                  </div>
                  <div className="relative">
                    <select
                      value={condCity}
                      onChange={(e) => { setCondCity(e.target.value); setCondWard(""); }}
                      disabled={!condPref}
                      className="w-full md:w-auto appearance-none border border-border rounded-full md:rounded-lg pl-4 md:pl-3 pr-14 md:pr-8 py-3 md:py-2 text-sm bg-white focus:outline-none focus:border-primary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <option value="">市区町村</option>
                      {condCityOptions.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center pointer-events-none md:hidden">
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none hidden md:block" />
                  </div>
                  <div className="relative">
                    <select
                      value={condWard}
                      onChange={(e) => setCondWard(e.target.value)}
                      disabled={!condWardOptions.length}
                      className="w-full md:w-auto appearance-none border border-border rounded-full md:rounded-lg pl-4 md:pl-3 pr-14 md:pr-8 py-3 md:py-2 text-sm bg-white focus:outline-none focus:border-primary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <option value="">行政区</option>
                      {condWardOptions.map((w) => (
                        <option key={w.slug} value={w.slug}>{w.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center pointer-events-none md:hidden">
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none hidden md:block" />
                  </div>
                </div>
              </div>

              {/* 依頼内容 */}
              <div className="flex flex-col md:flex-row md:gap-6 px-6 py-5 border-b border-border">
                <span className="text-sm font-bold text-foreground mb-3 md:mb-0 md:shrink-0 md:w-16 md:pt-1">依頼内容</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 flex-1">
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s} className="flex items-start md:items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={condServices.includes(s)}
                        onChange={() => toggleItem(condServices, s, setCondServices)}
                        className="w-4 h-4 rounded border-border accent-primary shrink-0 mt-0.5 md:mt-0"
                      />
                      {OPTION_NAME_TO_SLUG[s] ? (
                        <Link href={`/${OPTION_NAME_TO_SLUG[s]}`} className="text-sm text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                          {s}
                        </Link>
                      ) : (
                        <span className="text-sm text-foreground">{s}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* 業種 */}
              <div className="flex flex-col md:flex-row md:gap-6 px-6 py-5 border-b border-border">
                <span className="text-sm font-bold text-foreground mb-3 md:mb-0 md:shrink-0 md:w-16 md:pt-1">業種</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 flex-1">
                  {INDUSTRY_OPTIONS.map((s) => (
                    <label key={s} className="flex items-start md:items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={condIndustries.includes(s)}
                        onChange={() => toggleItem(condIndustries, s, setCondIndustries)}
                        className="w-4 h-4 rounded border-border accent-primary shrink-0 mt-0.5 md:mt-0"
                      />
                      {OPTION_NAME_TO_SLUG[s] ? (
                        <Link href={`/${OPTION_NAME_TO_SLUG[s]}`} className="text-sm text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                          {s}
                        </Link>
                      ) : (
                        <span className="text-sm text-foreground">{s}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* 検索ボタン */}
              <div className="flex justify-center py-6">
                <button
                  onClick={handleConditionSearch}
                  className="inline-flex items-center gap-2 bg-[#1a3a6b] hover:bg-[#142e56] text-white font-bold text-sm px-10 py-3 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                  検索する
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* その他の探し方 */}
        <section className="py-10">
          <div className="container">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-foreground tracking-tight mb-6">
              <ArrowRight className="w-5 h-5 text-primary shrink-0" />
              その他の探し方
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* <Link href="/ranking" className="bg-card rounded-lg border border-border p-5 hover:shadow-sm transition-all">
                <h3 className="font-sans font-semibold text-sm text-foreground mb-1">ランキングから探す</h3>
                <p className="text-xs text-muted-foreground">注目の会計事務所をランキング形式でご紹介</p>
              </Link> */}
              <Link href="/recommendation" className="bg-card rounded-lg border border-border p-5 hover:shadow-sm transition-all">
                <h3 className="font-sans font-semibold text-sm text-foreground mb-1">おすすめ記事から探す</h3>
                <p className="text-xs text-muted-foreground">エリア別のおすすめ事務所をご紹介</p>
              </Link>
              <Link href="/introduction" className="bg-card rounded-lg border border-border p-5 hover:shadow-sm transition-all">
                <h3 className="font-sans font-semibold text-sm text-foreground mb-1">税理士を紹介してもらう</h3>
                <p className="text-xs text-muted-foreground">専門コーディネーターが最適な税理士をご紹介</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
