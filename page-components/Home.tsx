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
import ComingSoonNotice from "@/components/ComingSoonNotice";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";
import {
  getAllInterviews,
  getArticlesByCategory,
  getAllPrefectures,
  getCitiesByPrefecture,
} from "@/lib/data";
import japanMapImg from "@/images/japan map_ver2.png";
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
  { href: "/introduction-01", icon: Search,    label: "顧問税理士を見直したい" },
  { href: "/introduction-02", icon: RefreshCw, label: "確定申告・年末調整を任せたい" },
  { href: "/introduction-03", icon: FileText,  label: "相続税について相談したい" },
  { href: "/introduction-04", icon: Shield,    label: "税務調査に備えたい" },
  { href: "/introduction-05", icon: Building2, label: "事業承継を進めたい" },
  { href: "/introduction-06", icon: BookOpen,  label: "会社設立を支援してほしい" },
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

// ─── 月桂樹ベジェヘルパー ────────────────────────────────────────────────────────
type Pt = [number, number];
function bpt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const m = 1 - t;
  return [
    m*m*m*p0[0] + 3*m*m*t*p1[0] + 3*m*t*t*p2[0] + t*t*t*p3[0],
    m*m*m*p0[1] + 3*m*m*t*p1[1] + 3*m*t*t*p2[1] + t*t*t*p3[1],
  ];
}
function bang(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): number {
  const m = 1 - t;
  const dx = 3*m*m*(p1[0]-p0[0]) + 6*m*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0]);
  const dy = 3*m*m*(p1[1]-p0[1]) + 6*m*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1]);
  return Math.atan2(dy, dx) * 180 / Math.PI;
}
// 左ステム制御点（SVG 340×260、円中心(170,130) r=90）
const SL: [Pt,Pt,Pt,Pt] = [[150,224],[26,195],[62,69],[82,24]];
// 右ステム（x方向を340で反転）
const SR: [Pt,Pt,Pt,Pt] = [[190,224],[314,195],[278,69],[258,24]];

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
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d3a8c 0%, #1a50a8 55%, #1e5abf 100%)" }}
        >
          {/* 背景装飾：浮遊する書類 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {[
              { w: 56, h: 44, top: "8%",  left: "38%", rotate: "15deg",  op: 0.12 },
              { w: 44, h: 34, top: "18%", left: "52%", rotate: "-10deg", op: 0.10 },
              { w: 64, h: 50, top: "5%",  left: "62%", rotate: "25deg",  op: 0.09 },
              { w: 40, h: 30, top: "30%", left: "45%", rotate: "-18deg", op: 0.08 },
              { w: 52, h: 40, top: "55%", left: "58%", rotate: "8deg",   op: 0.07 },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute rounded-sm bg-white"
                style={{
                  width: d.w, height: d.h,
                  top: d.top, left: d.left,
                  transform: `rotate(${d.rotate})`,
                  opacity: d.op,
                }}
              />
            ))}
          </div>

          <div className="container py-12 md:py-16 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-10">

              {/* ── 左：テキスト + バッジ ── */}
              <div className="flex-1 min-w-0 pl-4 md:pl-16 lg:pl-12 pt-9">
                {/* キャッチコピー */}
                <h1 className="mb-6 leading-snug tracking-tight md:pl-12">
                  <span
                    className="block font-bold text-white mb-1"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.375rem)" }}
                  >
                    <span className="inline border-b-2 mr-1" style={{ borderColor: "#f0d060" }}>厳選した</span>
                    豊富な経験と実績のある
                  </span>
                  <span
                    className="block font-bold text-white mb-1"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                  >
                    税理士・会計事務所を
                  </span>
                  <span
                    className="block font-extrabold"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f0d060", letterSpacing: "-0.02em" }}
                  >
                    <span style={{ fontSize: "1.15em" }}>相談無料</span>
                    <span className="text-white font-bold" style={{ fontSize: "0.65em" }}>&nbsp;でご紹介</span>
                  </span>
                </h1>

                {/* ── バッジ × 2（月桂樹SVGベジェ生成） ── */}
                <div className="hidden md:flex mt-2 justify-start">
                  {([
                    { lines: [{ t: "全国対応！", fs: 14, fw: 600 }, { t: "3,000件以上", fs: 26, fw: 800 }, { t: "の事務所を掲載", fs: 13, fw: 600 }] },
                    { lines: [{ t: "安心の料金設計", fs: 12, fw: 600 }, { t: "相談無料", fs: 28, fw: 800 }, { t: "でご紹介可能！", fs: 13, fw: 600 }] },
                  ] as const).map((badge, bi) => (
                    <svg key={bi} viewBox="0 0 340 260" className="w-[160px] md:w-[340px]" style={{ height: "auto", marginLeft: bi > 0 ? "-60px" : "0" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <defs>
                        <radialGradient id={`gg${bi}`} cx="38%" cy="30%" r="65%">
                          <stop offset="0%"   stopColor="#f8e472" />
                          <stop offset="55%"  stopColor="#d4a020" />
                          <stop offset="100%" stopColor="#a87010" />
                        </radialGradient>
                      </defs>
                      <path d={`M${SL[0]} C${SL[1]} ${SL[2]} ${SL[3]}`} stroke="#c8a840" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d={`M${SR[0]} C${SR[1]} ${SR[2]} ${SR[3]}`} stroke="#c8a840" strokeWidth="2" fill="none" strokeLinecap="round" />
                      {([SL, SR] as const).map((stem, si) =>
                        Array.from({ length: 9 }, (_, ni) => {
                          const t = (ni + 0.5) / 9;
                          const [px, py] = bpt(stem[0], stem[1], stem[2], stem[3], t);
                          const a = bang(stem[0], stem[1], stem[2], stem[3], t);
                          const pr = (a + 90) * Math.PI / 180;
                          const d = 12;
                          const ox = px + d * Math.cos(pr), oy = py + d * Math.sin(pr);
                          const ix = px - d * Math.cos(pr), iy = py - d * Math.sin(pr);
                          return (
                            <g key={`${si}-${ni}`}>
                              <ellipse cx={ox} cy={oy} rx="13" ry="5" fill="#c8a840" transform={`rotate(${a + 42} ${ox} ${oy})`} />
                              <ellipse cx={ix} cy={iy} rx="13" ry="5" fill="#c8a840" transform={`rotate(${a - 42} ${ix} ${iy})`} />
                            </g>
                          );
                        })
                      )}
                      <circle cx="170" cy="130" r="90" fill={`url(#gg${bi})`} filter="drop-shadow(0 4px 14px rgba(0,0,0,0.45))" />
                      <text x="170" y="105" textAnchor="middle" dominantBaseline="middle" fontSize={badge.lines[0].fs} fontWeight={badge.lines[0].fw} fill="white">{badge.lines[0].t}</text>
                      <text x="170" y="133" textAnchor="middle" dominantBaseline="middle" fontSize={badge.lines[1].fs} fontWeight={badge.lines[1].fw} fill="white">{badge.lines[1].t}</text>
                      <text x="170" y="160" textAnchor="middle" dominantBaseline="middle" fontSize={badge.lines[2].fs} fontWeight={badge.lines[2].fw} fill="white">{badge.lines[2].t}</text>
                    </svg>
                  ))}
                </div>
              </div>

              {/* ── 右：6ボタンカード ── */}
              <div className="w-full lg:w-[730px] shrink-0 px-4 md:px-8 lg:px-0 lg:pr-24">
                <div className="relative rounded-2xl bg-white overflow-hidden shadow-xl mx-auto max-w-lg lg:max-w-none lg:mx-0">
                  {/* 完全無料リボン */}
                  <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden pointer-events-none">
                    <div
                      className="absolute text-white text-[11px] font-bold text-center leading-tight py-1"
                      style={{ width: "90px", top: "14px", left: "-22px", transform: "rotate(-45deg)", background: "linear-gradient(90deg,#f97316,#ef4444)" }}
                    >
                      完全無料
                    </div>
                  </div>

                  {/* ヘッダー */}
                  <div className="pt-6 pb-5 px-5 border-b border-border">
                    <div className="flex justify-center mb-1.5">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-0.5 rounded-full">
                        納得のいく税理士選びをサポート
                      </span>
                    </div>
                    <Link href="/introduction" className="flex items-center justify-center gap-3 group">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-bold text-lg md:text-xl text-foreground leading-tight">
                        自分に合う税理士を紹介してもらう
                      </h2>
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* 6ボタン */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-5">
                    {/* <Link
                      href="/introduction-01"
                      className="col-span-2 flex items-center gap-3 px-4 h-[64px] rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "linear-gradient(135deg,#0f2660,#1a50a8)" }}
                    >
                      <Users className="w-5 h-5 shrink-0" />
                      <span className="flex-1 leading-snug">顧問税理士を見直したい</span>
                      <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                    </Link> */}
                    {consultLinks.map(({ href, icon: Icon, label }, i) => (
                      <Link
                        key={href}
                        href={href}
                        className={`${i === 3 || i === 4 ? "hidden md:flex" : "flex"} items-center gap-3 px-4 h-[64px] rounded-xl text-white font-bold text-[13.5px] md:text-sm hover:opacity-90 transition-opacity`}
                        style={{ background: "linear-gradient(135deg,#0f2660,#1a50a8)" }}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="flex-1 leading-snug">{label}</span>
                        <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                      </Link>
                    ))}
                  </div>
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
              sub="全国の税理士・会計事務所が多数登録中"
            >
              登録税理士
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
        {(CONTENT_COMING_SOON || interviews.length > 0) && (
          <section className="py-12 md:py-16 bg-white border-b border-border">
            <div className="container">
              <SectionHeading
                sub="会計事務所の実際の声をご紹介します。"
                tag="Interview"
              >
                インタビュー
              </SectionHeading>

              {CONTENT_COMING_SOON ? (
                <ComingSoonNotice label="インタビュー" className="py-10" />
              ) : (
                <>
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
                </>
              )}

              <MoreLink href="/interview" label="すべてのインタビューを見る" />
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════
            6. 選び方ガイド
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-[#f4f7fb] border-b border-border">
          <div className="container">
            <SectionHeading sub="税務・会計に関する基礎知識をまとめています。" tag="Guide">
              選び方ガイド
            </SectionHeading>

            {CONTENT_COMING_SOON ? (
              <ComingSoonNotice label="選び方ガイド" className="py-10" />
            ) : (
              <>
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
              </>
            )}

            <MoreLink href="/guide" label="選び方ガイド一覧" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. コラム
        ═══════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-white border-b border-border">
          <div className="container">
            <SectionHeading sub="税理士選びや税務に役立つコラムをお届けします。" tag="Column">
              コラム
            </SectionHeading>

            {CONTENT_COMING_SOON ? (
              <ComingSoonNotice label="コラム" className="py-10" />
            ) : (
              <>
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
              </>
            )}

            <MoreLink href="/column" label="コラム一覧" />
          </div>
        </section>

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
