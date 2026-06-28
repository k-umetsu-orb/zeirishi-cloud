/**
 * Items: unchanged. Area search replaced with interactive Japan map.
 */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Search, ArrowRight, Users, Shield, Building2, MapPin, ChevronRight, ChevronDown, Mail, FileText, RefreshCw, BookOpen } from "lucide-react";
import { useState } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import FAQ from "@/components/FAQ";
import ArticleCard from "@/components/ArticleCard";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";
import {
  getAllInterviews,
  getArticlesByCategory,
  getAllPrefectures,
  getCitiesByPrefecture,
} from "@/lib/data";
import japanMapImg from "@/images/japan map_ver2.png";
import heroPhoto from "@/images/hero-coordinator-30s.png";
import accountantPhoto1 from "@/images/男性1.png";
import accountantPhoto2 from "@/images/男性2.png";
import accountantPhoto3 from "@/images/男性3.png";
import accountantPhoto4 from "@/images/男性4.png";
import accountantPhoto5 from "@/images/女性7.png";
import { OPTION_NAME_TO_SLUG } from "@/lib/categorySlugMap";

// ─── Japan region map data ─────────────────────────

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

// ─── 悩み別導線 ───────────────────────────────────────────────────────────────

const consultLinks = [
  { href: "/introduction-01", icon: Search,    label: "顧問税理士の見直し" },
  { href: "/introduction-02", icon: RefreshCw, label: "確定申告・年末調整" },
  { href: "/introduction-03", icon: FileText,  label: "相続税" },
  { href: "/introduction-04", icon: Shield,    label: "税務調査" },
  { href: "/introduction-05", icon: Building2, label: "事業承継" },
  { href: "/introduction-06", icon: BookOpen,  label: "会社設立" },
];

// ─── Static data ──────────────────────────────────────────────────────────────


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

const faqItems = [
  {
    question: "税理士クラウドの利用は無料ですか？",
    answer:
      "はい、当サイトの検索・閲覧機能はすべて無料でご利用いただけます。税理士・会計事務所の情報を比較・検討する際にお気軽にご活用ください。",
  },
  {
    question: "どのような会計事務所が掲載されていますか？",
    answer:
      "全国の税理士・会計事務所を幅広く掲載しています。法人税、所得税、相続税など、さまざまな分野に対応する事務所を検索できます。",
  },
  {
    question: "税理士紹介サービスとは何ですか？",
    answer:
      "お客様のニーズに合った税理士・会計事務所を、専門のコーディネーターがご紹介するサービスです。ご要望をお伺いした上で、最適なご提案をいたします。",
  },
  {
    question: "地域を絞って検索できますか？",
    answer:
      "はい、都道府県、市区町村、行政区、最寄り駅など、細かいエリア指定で検索が可能です。お近くの税理士・会計事務所を効率的にお探しいただけます。",
  },
  {
    question: "掲載情報はどのくらいの頻度で更新されますか？",
    answer:
      "掲載情報は定期的に更新しております。最新の情報を提供できるよう努めておりますが、詳細は各事務所に直接ご確認ください。",
  },
];

const steps = [
  {
    num: 1,
    title: "エリアを選ぶ",
    desc: "都道府県や市区町村、最寄り駅からエリアを選択します。",
    icon: MapPin,
  },
  {
    num: 2,
    title: "事務所を比較",
    desc: "一覧から事務所の特徴や得意分野を比較検討します。",
    icon: Building2,
  },
  {
    num: 3,
    title: "詳細を確認",
    desc: "気になる事務所の詳細情報を確認します。",
    icon: FileText,
  },
  {
    num: 4,
    title: "問い合わせ",
    desc: "事務所に直接または紹介サービスを通じてご連絡ください。",
    icon: Mail,
  },
];

const ACCOUNTANT_PHOTOS = [
  accountantPhoto1,
  accountantPhoto2,
  accountantPhoto3,
  accountantPhoto4,
  accountantPhoto5,
];

// 横幅の広いディスプレイでも途中で画像が切れないよう、十分な長さになるまで複製する
const MARQUEE_PHOTOS = Array.from({ length: 6 }, () => ACCOUNTANT_PHOTOS).flat();

// ─── Sub-components ───────────────────────────────────────────────────────────

/** 地域カード — 地域名 + 都道府県チップ */
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

/** 日本地図シルエット + 地域カード */
function AccordionArea() {
  const [openLabel, setOpenLabel] = React.useState<string | null>(null);
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
                  className="text-xs text-primary border border-primary/40 rounded-full py-1.5 hover:bg-primary hover:text-white transition-colors inline-flex items-center justify-center w-[4.5em]"
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
      {/* ── Desktop: absolute-positioned layout (980px centered) ── */}
      <div className="hidden xl:flex justify-center">
        <div className="relative" style={{ width: "980px", height: "620px" }}>

          {/* Japan map image — center */}
          <div className="absolute" style={{ left: "300px", top: "80px", width: "380px" }}>
            <Image
              src={japanMapImg}
              alt=""
              aria-hidden={true}
              style={{ width: "100%", height: "auto" }}
              draggable={false}
              priority
            />
          </div>

          {/* ── Left column ── */}
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

          {/* ── Top-center: 北陸・甲信越 ── */}
          <div className="absolute" style={{ left: "305px", top: "8px", width: "215px", height: "130px" }}>
            <RegionCard {...byId.hokuriku} />
          </div>

          {/* ── Bottom-center: 四国 + 東海 (right edge 680px, before right col at 700px) ── */}
          <div className="absolute" style={{ left: "300px", top: "370px", width: "175px", height: "130px" }}>
            <RegionCard {...byId.shikoku} />
          </div>
          <div className="absolute" style={{ left: "485px", top: "370px", width: "195px", height: "130px" }}>
            <RegionCard {...byId.tokai} />
          </div>

          {/* ── Right column (left=700px) ── */}
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

      {/* ── Mobile / Tablet: accordion ── */}
      <div className="xl:hidden">
        <AccordionArea />
      </div>
    </>
  );
}

/** セクション見出し */
function SectionHeading({
  children,
  sub,
  center,
  tag,
}: {
  children: React.ReactNode;
  sub?: string;
  center?: boolean;
  tag?: string;
}) {
  return (
    <div className={`mb-8 md:mb-10 ${center ? "text-center" : ""}`}>
      {tag && (
        <p
          className={`text-xs font-semibold text-primary uppercase tracking-widest mb-2 ${center ? "text-center" : ""}`}
        >
          {tag}
        </p>
      )}
      <h2
        className={`text-xl md:text-2xl font-bold text-foreground tracking-tight ${center ? "flex flex-col items-center gap-1" : "flex items-center gap-3"}`}
      >
        {!center && (
          <span className="inline-block w-1 h-6 bg-primary rounded-full shrink-0" />
        )}
        <span>{children}</span>
        {center && (
          <span className="block w-10 h-[3px] bg-primary rounded-full mt-2" />
        )}
      </h2>
      {sub && (
        <p
          className={`mt-2.5 text-sm text-muted-foreground leading-relaxed ${center ? "" : "ml-4"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** セクション下部「もっと見る」リンク */
function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-7 text-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm text-primary font-medium border border-primary/30 rounded-full px-5 py-2 hover:bg-primary/5 transition-colors"
      >
        {label}
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home({ officeCount, interviewUrls }: { officeCount: number; interviewUrls: Record<string, string> }) {
  usePageTitle(
    "税理士・会計事務所への相談なら紹介料無料の【税理士クラウド】",
    "掲載事務所数3,000件以上！税理士クラウドは、全国の税理士・会計事務所をエリアや得意業種・依頼内容から検索できる、経営者・個人事業主のための税理士検索サイトです。",
  );
  const router = useRouter();
  const [activeSearchTab, setActiveSearchTab] = useState<"area" | "condition">("area");
  // 条件から探すフォーム
  const [condPref, setCondPref] = useState("");
  const [condCity, setCondCity] = useState("");
  const [condWard, setCondWard] = useState("");
  const [condServices, setCondServices] = useState<string[]>([]);
  const [condIndustries, setCondIndustries] = useState<string[]>([]);

  const [interviewIndex, setInterviewIndex] = useState(0);
  const INTERVIEW_VISIBLE = 3;

  const allPrefectures = getAllPrefectures();
  const condCityOptions = condPref ? getCitiesByPrefecture(condPref) : [];
  const condWardOptions = condCity
    ? (condCityOptions.find((c) => c.slug === condCity)?.wards ?? [])
    : [];

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

  const interviews = getAllInterviews().slice(0, 4);
  const guideArticles = getArticlesByCategory("guide").slice(0, 4);
  const columnArticles = getArticlesByCategory("column").slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GlobalHeader />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════════
            1. ヒーロー
        ═══════════════════════════════════════════════════════ */}
        <section
          className="relative isolate overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)" }}
        >
          {/* 背景装飾 */}
          <div
            className="absolute -top-[470px] left-[6%] h-[840px] w-[980px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(219,234,255,0.86) 0%, rgba(234,244,255,0.62) 48%, rgba(247,251,255,0) 72%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 hidden w-[48%] lg:block"
            style={{
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.58) 58%, rgba(255,255,255,0.88) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block" aria-hidden>
            <Image
              src={heroPhoto}
              alt=""
              fill
              priority
              sizes="58vw"
              className="object-cover object-right"
              style={{ filter: "contrast(1.06) saturate(1.04)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7fbff] via-[#f7fbff]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#eef6ff] to-transparent" />
          </div>
          <div
            className="absolute left-0 top-0 hidden h-52 w-52 md:block"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(26,80,168,0.18) 1.2px, transparent 1.3px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />
          <div
            className="absolute right-0 top-6 hidden h-72 w-48 md:block"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(26,80,168,0.16) 1.2px, transparent 1.3px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />

          {/* ── SP Hero ── */}
          <div className="relative z-10 px-4 pb-8 pt-4 md:hidden">
            <div
              className="absolute left-0 top-0 h-36 w-40"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(26,80,168,0.2) 1.2px, transparent 1.3px)",
                backgroundSize: "14px 14px",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-[420px] right-0 h-28 w-20"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(26,80,168,0.16) 1.2px, transparent 1.3px)",
                backgroundSize: "14px 14px",
              }}
              aria-hidden
            />

            <div className="relative min-h-[520px] overflow-hidden">
              <div className="absolute right-[-32px] top-[108px] w-[640px]" aria-hidden>
                <Image
                  src={heroPhoto}
                  alt=""
                  priority
                  sizes="640px"
                  className="h-auto w-full max-w-none"
                  style={{ filter: "contrast(1.06) saturate(1.04)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f7fbff] via-[#f7fbff]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#eef6ff] to-transparent" />
              </div>

              <div className="relative z-10 pt-7">
                <h1 className="text-[2rem] font-extrabold leading-[1.42] text-[#071b3f]">
                  <span className="text-[#1a50a8]">
                    クラウド会計に
                    <br />
                    強い税理士を中心に
                  </span>
                  <br />
                  あなたに合った
                  <br />
                  相談先を紹介
                </h1>
                <p className="mt-8 max-w-[250px] text-base font-semibold leading-[2.05] text-[#12325f]">
                  豊富な経験と実績のある
                  <br />
                  税理士・会計事務所を
                  <br />
                  相談無料でご紹介します。
                </p>
              </div>
            </div>

            <div className="relative z-10 -mt-8 grid grid-cols-3 divide-x divide-[#cfe0f5]">
              {[
                { icon: Users, label: "掲載税理士事務所数", value: "3,000", suffix: "件以上" },
                { icon: MapPin, label: "対応エリア", value: "全国", suffix: "対応" },
                { icon: Shield, label: "相談・紹介", value: "無料", suffix: "対応" },
              ].map((s) => (
                <div key={s.label} className="flex min-w-0 flex-col items-center px-2 text-center">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#bdd3f5] bg-white">
                    <s.icon className="h-5 w-5 text-[#1a50a8]" />
                  </span>
                  <p className="min-h-[2.6em] text-[11px] font-bold leading-snug text-[#12325f]">{s.label}</p>
                  <p className="mt-2 whitespace-nowrap text-[1.65rem] font-extrabold leading-none text-[#071b3f]">{s.value}</p>
                  <p className="mt-1 text-xs font-bold text-[#071b3f]">{s.suffix}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mx-auto mt-8 flex w-full max-w-[330px] flex-col gap-3">
              <Link
                href="/introduction"
                className="inline-flex h-14 items-center justify-center gap-4 rounded-lg bg-[#1a50a8] px-6 text-base font-bold text-white shadow-[0_14px_32px_rgba(26,80,168,0.24)] transition-colors hover:bg-[#0c3282]"
              >
                無料で紹介してもらう
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/search"
                className="inline-flex h-14 items-center justify-center gap-4 rounded-lg border border-[#1a50a8] bg-white/90 px-6 text-base font-bold text-[#1a50a8] transition-colors hover:bg-[#f1f5ff]"
              >
                条件から税理士を探す
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative z-10 mt-8 rounded-2xl border border-[#d8e4f5] bg-white/95 p-4 shadow-[0_16px_44px_rgba(7,27,63,0.08)]">
              <h2 className="mb-4 text-center text-xl font-extrabold text-[#071b3f]">相談内容から探す</h2>
              <div className="grid grid-cols-2 gap-2">
                {consultLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex h-12 min-w-0 items-center rounded-full border border-[#d8e4f5] bg-white px-2 text-[11px] font-bold leading-none text-[#071b3f] transition-colors hover:border-[#1a50a8] hover:text-[#1a50a8]"
                  >
                    <Icon className="mr-1 h-3.5 w-3.5 shrink-0 text-[#1a50a8]" />
                    <span className="min-w-0 flex-1 whitespace-nowrap">{label}</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5 shrink-0 text-[#071b3f]" />
                  </Link>
                ))}
              </div>
              <Link
                href="/introduction"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm font-bold text-[#1a50a8]"
              >
                自分に合う税理士を紹介してもらう
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="container relative z-10 hidden pt-12 pb-8 md:block md:pt-16 md:pb-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:min-h-[520px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.86fr)] lg:gap-8">

              {/* ── 左：キャッチコピー + CTA + 実績 ── */}
              <div className="min-w-0 text-left">
                <h1 className="mb-6 text-[2rem] font-extrabold leading-[1.4] text-[#071b3f] md:text-[2.35rem]">
                  <span className="block whitespace-nowrap">
                    <span className="text-[#1a50a8]">クラウド会計に強い</span>税理士を中心に
                  </span>
                  <span className="block whitespace-nowrap">あなたにぴったりの相談先を紹介</span>
                </h1>
                <p className="mb-9 max-w-2xl text-base font-semibold leading-[1.9] text-[#12325f] md:text-lg">
                  <span className="md:whitespace-nowrap">豊富な経験と実績のある厳選した税理士・会計事務所を</span>
                  <br />
                  相談無料でご紹介します。
                </p>

                <div className="mb-11 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/introduction"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#1a50a8] px-8 text-base font-bold text-white shadow-[0_14px_32px_rgba(26,80,168,0.24)] transition-colors hover:bg-[#0c3282]"
                  >
                    無料で紹介してもらう
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/search"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-[#1a50a8] bg-white/80 px-8 text-base font-bold text-[#1a50a8] transition-colors hover:bg-[#f1f5ff]"
                  >
                    条件から税理士を探す
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 安心ポイント */}
                <div className="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
                  {[
                    { icon: Users, label: "掲載税理士事務所数", value: "3,000", suffix: "件以上" },
                    { icon: MapPin, label: "対応エリア", value: "全国", suffix: "対応" },
                    { icon: Shield, label: "相談・紹介", value: "完全無料", suffix: "対応" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdd3f5] bg-white">
                        <s.icon className="h-5 w-5 text-[#1a50a8]" />
                      </span>
                      <div className="text-left">
                        <p className="mb-1 text-xs font-semibold text-[#12325f]">{s.label}</p>
                        <p className="text-3xl font-extrabold leading-none text-[#071b3f]">
                          {s.value}
                          <span className="ml-1 text-sm font-bold">{s.suffix}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 右：写真（SP/タブレット用） ── */}
              <div className="relative flex min-h-[260px] w-full items-end justify-center overflow-hidden rounded-[28px] bg-white/50 md:min-h-[340px] lg:hidden">
                <Image
                  src={heroPhoto}
                  alt=""
                  priority
                  className="absolute inset-0 h-full w-full object-cover object-right"
                  style={{ filter: "contrast(1.06) saturate(1.04)" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#eef6ff] to-transparent" />
              </div>

            </div>

            {/* ── 人気の相談内容から探す ── */}
            <div className="mt-8 rounded-2xl border border-[#e2ebf8] bg-white/95 p-5 shadow-[0_16px_44px_rgba(7,27,63,0.08)] md:mt-10 md:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                <h2 className="shrink-0 text-lg font-extrabold leading-snug text-[#071b3f] md:text-xl">
                  相談内容から探す
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  {consultLinks.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex h-12 w-[184px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d8e4f5] bg-white px-4 text-sm font-bold text-[#071b3f] transition-colors hover:border-[#1a50a8] hover:text-[#1a50a8]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#1a50a8]" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. まずはかんたん税理士検索（日本地図 + タブ）
        ═══════════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-white border-b border-border">
          <div className="container">
            <SectionHeading
              sub="エリアや条件を選んで、近くの税理士を検索できます。"
              center
            >
              エリア・条件から税理士を探す
            </SectionHeading>

            {/* 掲載件数バッジ */}
            <p className="text-center text-l text-muted-foreground mb-6">
              掲載会計事務所数{" "}
              <span className="text-[#F30100] font-extrabold text-3xl tracking-tight">
                {officeCount.toLocaleString()}
              </span>{" "}
              件
            </p>

            {/* タブ */}
            <div className="flex border-b border-border mb-8">
              <button
                onClick={() => setActiveSearchTab("area")}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeSearchTab === "area"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="w-4 h-4" />
                エリアから探す
              </button>
              <button
                onClick={() => setActiveSearchTab("condition")}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeSearchTab === "condition"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-4 h-4" />
                条件から探す
              </button>
            </div>

            {/* タブ内容：エリアから探す（日本地図） */}
            {activeSearchTab === "area" && <JapanMapArea />}

            {/* タブ内容：条件から探す */}
            {activeSearchTab === "condition" && (
              <div className="bg-white border border-border rounded-xl overflow-hidden">
                <p className="text-sm text-muted-foreground text-center py-4 border-b border-border">
                  条件を選択し、検索ボタンを押してください。
                </p>

                {/* 所在地 */}
                <div className="flex flex-col md:flex-row md:gap-6 px-6 py-5 border-b border-border">
                  <span className="text-sm font-bold text-foreground mb-3 md:mb-0 md:shrink-0 md:w-16 md:pt-2">所在地</span>
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-3 flex-1">
                    {/* 都道府県 */}
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
                    {/* 市区町村 */}
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
                    {/* 行政区 */}
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
            )}

            <MoreLink href="/search" label="すべてのエリアを見る" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. 当サービスの特徴
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-[#f4f7fb] border-b border-border">
          <div className="container">
            <SectionHeading
              sub="税理士を探すなら税理士クラウドをご利用ください。"
              center
              tag="Service Features"
            >
              当サービスの特徴
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Search,
                  title: "税理士を探す",
                  desc: "地域、依頼内容、対応業種、事務所の特徴など、様々な条件をもとに自分にぴったりな税理士・会計事務所を探すことができます。気になる税理士・会計事務所に対して、まとめて問い合わせが可能です。",
                  href: "/search",
                },
                {
                  icon: Users,
                  title: "税理士を紹介してもらう",
                  desc: "専門スタッフが、完全無料で豊富な経験と実績のある税理士・会計事務所を最短翌日にご紹介します。まずは気軽に、お申し込みフォームにご要望をご記載ください。",
                  href: "/introduction",
                },
                {
                  icon: Shield,
                  title: "選び方を調べる",
                  desc: "豊富な経験と実績のある税理士・会計事務所の選び方を、わかりやすく解説しています。はじめての方でも安心してご利用いただけるよう、ポイントをまとめています。",
                  href: "/guide",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-[#EEF4FB] rounded-2xl flex flex-col overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                        <f.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <h3 className="font-extrabold text-base leading-snug" style={{ color: "#0067C0" }}>
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  {/* Illustration area */}
                  <div className="flex-1 flex items-center justify-center py-6 px-6">
                    <div className="w-28 h-28 rounded-full bg-white/60 flex items-center justify-center">
                      <f.icon className="w-14 h-14 text-primary/40" />
                    </div>
                  </div>
                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Link
                      href={f.href}
                      className="flex items-center justify-center gap-2 w-full bg-[#1a2744] hover:bg-[#243560] text-white text-sm font-medium py-3 rounded-lg transition-colors"
                    >
                      もっと見る
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. ご利用の流れ
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-white border-b border-border">
          <div className="container">
            <SectionHeading center tag="How to Use">
              ご利用の流れ
            </SectionHeading>

            {/* SP: 2×2グリッド */}
            <div className="md:hidden grid grid-cols-2 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <span className="text-2xl font-bold mb-2" style={{ color: "#0067C0" }}>
                    {step.num}
                  </span>
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <step.icon className="w-12 h-12" style={{ color: "#0067C0" }} />
                  </div>
                  <p className="mt-3 text-sm font-bold text-center text-foreground leading-relaxed">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground text-center leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* PC: 横並び（変更なし） */}
            <div className="hidden md:flex items-start justify-center gap-2">
              {steps.map((step, i) => (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col items-center w-44">
                    <span className="text-2xl font-bold mb-2" style={{ color: "#0067C0" }}>
                      {step.num}
                    </span>
                    <div className="w-36 h-36 rounded-full bg-white shadow-md flex items-center justify-center">
                      <step.icon className="w-16 h-16" style={{ color: "#0067C0" }} />
                    </div>
                    <p className="mt-4 text-sm font-bold text-center text-foreground leading-relaxed">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground text-center leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex items-center justify-center flex-shrink-0 w-10"
                      style={{ marginTop: "calc(2rem + 72px)" }}
                    >
                      <span className="text-lg font-bold tracking-widest" style={{ color: "#0067C0" }}>···</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4.5. 登録税理士・会計事務所スライダー
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-[#f4f7fb] overflow-hidden">
          <div className="container">
            <SectionHeading
              center
              tag="Tax Accountant"
              // sub="全国の税理士・会計事務所が多数登録中"
            >
              全国の税理士・会計事務所が多数登録中
            </SectionHeading>
          </div>

          <div className="relative">
            {/* 左右フェードマスク */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#f4f7fb] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#f4f7fb] to-transparent z-10" />

            <div className="flex w-max animate-scroll-x">
              {[...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS].map((photo, i) => (
                <div key={i} className="shrink-0 mx-4 md:mx-7">
                  <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md border-4 border-white">
                    <Image
                      src={photo}
                      alt="登録税理士・会計事務所"
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5. インタビュー
        ═══════════════════════════════════════════════════════ */}
        {!CONTENT_COMING_SOON && interviews.length > 0 && (
          <section className="py-12 md:py-16 bg-white border-b border-border">
            <div className="container">
              <SectionHeading
                sub="会計事務所の実際の声をご紹介します。"
                tag="Interview"
              >
                インタビュー
              </SectionHeading>

              {/* SP: 横スクロール */}
              <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-4">
                  {interviews.map((iv) => {
                    return (
                      <Link
                        key={iv.id}
                        href={interviewUrls[iv.id] ?? "/interview"}
                        className="group block flex-shrink-0"
                        style={{ width: "78vw" }}
                      >
                        <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src="/images/interview-placeholder.svg"
                              alt={iv.officeName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold text-sm text-primary leading-snug line-clamp-2 mb-2 group-hover:underline">
                              {iv.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-auto">
                              {iv.officeName}
                            </p>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* PC: Carousel */}
              <div className="hidden md:block relative">
                {/* Left button */}
                <button
                  onClick={() => setInterviewIndex((i) => Math.max(0, i - 1))}
                  disabled={interviewIndex === 0}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>

                {/* Cards */}
                <div className="overflow-hidden mx-4">
                  <div
                    className="flex gap-4 transition-transform duration-300"
                    style={{ transform: `translateX(calc(-${interviewIndex} * (100% / ${INTERVIEW_VISIBLE} + 16px / ${INTERVIEW_VISIBLE})))` }}
                  >
                    {interviews.map((iv) => {
                      return (
                        <Link
                          key={iv.id}
                          href={interviewUrls[iv.id] ?? "/interview"}
                          className="group block flex-shrink-0"
                          style={{ width: `calc(100% / ${INTERVIEW_VISIBLE} - 16px * ${INTERVIEW_VISIBLE - 1} / ${INTERVIEW_VISIBLE})` }}
                        >
                          <article className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                            {/* Photo */}
                            <div className="aspect-video overflow-hidden">
                              <img
                                src="/images/interview-placeholder.svg"
                                alt={iv.officeName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                              <h3 className="font-bold text-sm text-primary leading-snug line-clamp-2 mb-2 group-hover:underline">
                                {iv.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-auto">
                                {iv.officeName}
                              </p>
                            </div>
                          </article>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right button */}
                <button
                  onClick={() => setInterviewIndex((i) => Math.min(interviews.length - INTERVIEW_VISIBLE, i + 1))}
                  disabled={interviewIndex >= interviews.length - INTERVIEW_VISIBLE}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>{/* end PC carousel */}

              <MoreLink href="/interview" label="すべてのインタビューを見る" />
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            6. 選び方ガイド
        ═══════════════════════════════════════════════════════ */}
        {!CONTENT_COMING_SOON && (
          <section className="py-12 md:py-16 bg-[#f4f7fb] border-b border-border">
            <div className="container">
              <SectionHeading sub="税務・会計に関する基礎知識をまとめています。" tag="Guide">
                選び方ガイド
              </SectionHeading>

              {/* SP: 横スクロール */}
              <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-4">
                  {guideArticles.map((article) => (
                    <div key={article.id} className="flex-shrink-0" style={{ width: "78vw" }}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PC: グリッド */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {guideArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              <MoreLink href="/guide" label="選び方ガイド一覧" />
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            7. コラム
        ═══════════════════════════════════════════════════════ */}
        {!CONTENT_COMING_SOON && (
          <section className="py-12 md:py-16 bg-white border-b border-border">
            <div className="container">
              <SectionHeading sub="税理士選びや税務に役立つコラムをお届けします。" tag="Column">
                コラム
              </SectionHeading>

              {/* SP: 横スクロール */}
              <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-4">
                  {columnArticles.map((article) => (
                    <div key={article.id} className="flex-shrink-0" style={{ width: "78vw" }}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PC: グリッド */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {columnArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              <MoreLink href="/column" label="コラム一覧" />
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            8. 紹介サービス CTA
        ═══════════════════════════════════════════════════════ */}
        <section
          className="py-14 md:py-20 border-b border-border"
          style={{
            background: "linear-gradient(135deg, #1a50a8 0%, #0c3282 100%)",
          }}
        >
          <div className="container max-w-3xl text-center">
            <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-4">
              Free Introduction Service
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
              税理士をお探しですか？
            </h2>
            <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
              ご要望に合った税理士を、専門のコーディネーターが無料でご紹介いたします。
              お気軽にご相談ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/introduction"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary rounded-lg text-sm font-bold hover:bg-white/90 transition-colors shadow-lg w-full sm:w-[250px]"
              >
                税理士を紹介してもらう
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-white rounded-lg text-sm font-bold border border-white/40 hover:bg-white/10 transition-colors w-full sm:w-[250px]"
              >
                エリアから探す
                <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            9. よくある質問
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-[#f4f7fb]">
          <div className="container max-w-3xl">
            <SectionHeading tag="FAQ">よくある質問</SectionHeading>
            <FAQ items={faqItems} />
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
