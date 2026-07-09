import { useState, useEffect, ReactNode } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowRight, Users, CalendarCheck, Shield, Globe, ChevronDown, CheckSquare, CircleCheck, Monitor, Phone } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import { getAllPrefectures, getCitiesByPrefecture } from "@/lib/data";
import heroImage from "@/images/hero-coordinator-30s.png";

const PHONE_NUMBER = "03-6403-3202";

function reportPhoneConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-18309633981/l7z9CMu21c0cEL2v25pE",
    value: 50000.0,
    currency: "JPY",
  });
}

function HeroTrustSignal({ className = "" }: { className?: string }) {
  return (
    <div className={`testlp-trust ${className}`}>
      <p className="testlp-trust__label">
        全国対応！
      </p>
      <div className="testlp-trust__line">
        <span className="testlp-trust__chevron">❮</span>
        <p className="testlp-trust__count">
          掲載数 <span>3,000件以上</span>
        </p>
        <span className="testlp-trust__chevron">❯</span>
      </div>
      <p className="testlp-trust__note">
        ※2026年7月時点
      </p>
    </div>
  );
}

function HeroPhoneCta() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      aria-label={`電話で相談する ${PHONE_NUMBER}`}
      className="testlp-phone-cta"
      onClick={reportPhoneConversion}
    >
      <div className="testlp-phone-cta__main">
        <div
          className="testlp-phone-cta__icon"
          style={{ background: "linear-gradient(135deg,#0b68b7 0%,#004b9f 100%)" }}
        >
          <Phone className="testlp-phone-cta__icon-svg" />
        </div>
        <div className="testlp-phone-cta__body">
          <p className="testlp-phone-cta__label">
            ＼ お電話でのご相談・お問い合わせ ／
          </p>
          <p className="testlp-phone-cta__number">
            {PHONE_NUMBER}
          </p>
        </div>
      </div>
      <div className="testlp-phone-cta__hours">
        <p>
          <CircleCheck className="testlp-phone-cta__check" />
          <span>受付時間：9時〜22時（平日）</span>
        </p>
      </div>
    </a>
  );
}

function HeroFormCta() {
  return (
    <a
      href="#form"
      className="testlp-form-cta group"
      style={{ background: "linear-gradient(135deg,#ff9f1c 0%,#f97316 48%,#fb4b1f 100%)" }}
    >
      <div className="testlp-form-cta__main">
        <div className="testlp-form-cta__free">
          無料
        </div>
        <div className="testlp-form-cta__body">
          <p className="testlp-form-cta__label">＼ カンタン30秒 ／</p>
          <p className="testlp-form-cta__title">
            無料で相談する
          </p>
        </div>
        <div className="testlp-form-cta__arrow">
          <ArrowRight className="testlp-form-cta__arrow-svg" />
        </div>
      </div>
      <div className="testlp-form-cta__sub">
        <Monitor className="testlp-form-cta__monitor" />
        <span>フォームからお気軽にご相談ください</span>
      </div>
    </a>
  );
}

function PcContactLead() {
  return (
    <section className="testlp-pc-contact" aria-label="無料相談・お問い合わせ">
      <div className="testlp-pc-contact__inner">
        <div className="testlp-pc-contact__heading">
          <h2>税理士選びで迷ったら、まずは無料でご相談ください</h2>
          <p>専門コーディネーターが状況を伺い、相性のよい税理士探しをサポートします。</p>
        </div>

        <div className="testlp-pc-contact__cards">
          <HeroPhoneCta />
          <HeroFormCta />
        </div>

        <div className="testlp-pc-contact__note">
          <Shield className="testlp-pc-contact__note-icon" />
          <p>ご相談・ご紹介はすべて無料です。無理な営業はいたしませんので、ご安心ください。</p>
        </div>
      </div>
    </section>
  );
}

const merits = [
  { icon: <Shield className="w-8 h-8" />,       title: "完全無料",            desc: "ご相談から紹介まで一切費用はかかりません。成功報酬も不要です。" },
  { icon: <Users className="w-8 h-8" />,        title: "専門コーディネーター", desc: "税理士業界に精通した担当者が最適な税理士をご提案します。" },
  { icon: <CalendarCheck className="w-8 h-8" />, title: "最短翌営業日ご紹介",  desc: "お急ぎの場合でも迅速に対応。お問い合わせ後すぐにご連絡します。" },
  { icon: <Globe className="w-8 h-8" />,        title: "全国対応",            desc: "全国3,000件以上の事務所ネットワークから地域を問わずご紹介します。" },
];

const steps = [
  { title: "ご相談内容の入力",        desc: "フォームから業種・規模・依頼内容など希望条件をご入力ください。" },
  { title: "コーディネーターからご連絡", desc: "専門担当者が内容を確認し、1〜3営業日以内にご連絡いたします。" },
  { title: "税理士のご紹介",          desc: "ご要望に合った税理士を複数名ご紹介。特徴をお伝えし比較検討いただけます。" },
  { title: "面談・お打ち合わせ",      desc: "気になる税理士と無料で面談。相性や対応力を直接ご確認ください。" },
  { title: "ご契約",                 desc: "最適な税理士が見つかりましたら直接ご契約。その後もサポート継続。" },
];

const faqItems = [
  { question: "紹介サービスの利用に費用はかかりますか？",         answer: "いいえ、ご相談から紹介まですべて無料でご利用いただけます。成功報酬も一切かかりません。" },
  { question: "どのような税理士を紹介してもらえますか？",         answer: "法人税・所得税・相続税・事業承継など多様な分野に対応する税理士をご紹介します。地域・予算のご希望にも対応いたします。" },
  { question: "紹介された税理士と必ず契約しなければなりませんか？", answer: "いいえ、ご契約は任意です。面談後にお断りいただいても問題ありません。" },
  { question: "どのくらいの期間で紹介してもらえますか？",         answer: "通常、お問い合わせから1〜3営業日以内にご連絡し、1週間程度でご紹介いたします。" },
  { question: "法人でなくても利用できますか？",                  answer: "はい、個人事業主・確定申告・相続相談など個人のお客様もご利用いただけます。" },
];

function IntroductionForm({
  thanksPath,
  sourcePage,
  requestDetailExamples,
}: {
  thanksPath: string;
  sourcePage: string;
  requestDetailExamples: string[];
}) {
  const router = useRouter();
  const [clientType, setClientType] = useState<string>("法人");
  const [prefecture, setPrefecture] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [requestDetail, setRequestDetail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const clientTypes = ["法人", "個人事業主・フリーランスの方", "その他（確定申告など）"];
  const allPrefectures = getAllPrefectures();
  const cityOptions = prefecture ? getCitiesByPrefecture(prefecture) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!prefecture)  newErrors.prefecture  = "都道府県を選択してください";
    if (!name.trim()) newErrors.name        = "お名前を入力してください";
    if (!email.trim()) newErrors.email      = "メールアドレスを入力してください";
    if (!phone.trim()) newErrors.phone      = "電話番号を入力してください";
    if (!agreed)      newErrors.agreed      = "プライバシーポリシーへの同意が必要です";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage,
          clientType,
          prefectureName: allPrefectures.find((p) => p.slug === prefecture)?.name ?? prefecture,
          cityName: cityOptions.find((c) => c.slug === city)?.name ?? "",
          name,
          email,
          phone,
          requestDetail,
        }),
      });
      if (!res.ok) throw new Error();
      router.push(thanksPath);
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold text-lg text-foreground mb-6 text-center">
        無料相談フォーム
      </h3>

      {/* Client type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          ご相談者の区分 <span className="text-red-500 text-xs ml-1">必須</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {clientTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setClientType(t)}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                clientType === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Prefecture + City */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          お探しのエリア <span className="text-red-500 text-xs ml-1">必須</span>
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <select
              value={prefecture}
              onChange={(e) => { setPrefecture(e.target.value); setCity(""); }}
              className="w-full appearance-none border border-border rounded-lg pl-3 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="">都道府県</option>
              {allPrefectures.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!prefecture}
              className="w-full appearance-none border border-border rounded-lg pl-3 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">市区町村</option>
              {cityOptions.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        {errors.prefecture && <p className="mt-1.5 text-xs text-red-500">{errors.prefecture}</p>}
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            お名前 <span className="text-red-500 text-xs ml-1">必須</span>
          </label>
          <input
            type="text"
            placeholder="山田 太郎"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">
            メールアドレス <span className="text-red-500 text-xs ml-1">必須</span>
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-1">
          電話番号 <span className="text-red-500 text-xs ml-1">必須</span>
        </label>
        <input
          type="tel"
          placeholder="090-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Request detail */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-1">
          税理士に依頼したい内容 <span className="text-muted-foreground text-xs ml-1">任意</span>
        </label>
        <textarea
          placeholder={`例\n${requestDetailExamples.map((t) => `・${t}`).join("\n")}`}
          value={requestDetail}
          onChange={(e) => setRequestDetail(e.target.value)}
          rows={3}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
        />
        {errors.requestDetail && <p className="mt-1 text-xs text-red-500">{errors.requestDetail}</p>}
      </div>

      {/* Privacy policy */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-3">
          当社のプライバシーポリシーに同意の上、送信してください。
        </p>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-border accent-primary shrink-0"
          />
          <span className="text-sm text-foreground leading-snug">
            当社規定の「
            <a href="https://orb-inc.co.jp/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              プライバシーポリシー
            </a>
            」の内容に同意する
          </span>
        </label>
        {errors.agreed && <p className="mt-1.5 text-xs text-red-500">{errors.agreed}</p>}
      </div>

      {submitError && <p className="mb-3 text-center text-xs text-red-500">{submitError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(90deg,#1a50a8,#2563eb)" }}
      >
        {isSubmitting ? "送信中..." : "無料で相談する"}
        <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-center text-xs text-muted-foreground mt-3">
        送信後、担当者より1〜3営業日以内にご連絡いたします。
      </p>
    </form>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface IntroductionVariantPageProps {
  pageNumber: string;
  headline: string;
  subtext: ReactNode;
  painPoints: React.ReactNode[];
  documentTitle: string;
  documentDescription: string;
  breadcrumbLabel: string;
  requestDetailExamples: string[];
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function IntroductionVariantPage({
  pageNumber,
  headline,
  subtext,
  painPoints,
  documentTitle,
  documentDescription,
  breadcrumbLabel,
  requestDetailExamples,
}: IntroductionVariantPageProps) {
  usePageTitle(documentTitle, documentDescription);
  useEffect(() => {
    const el = document.createElement("link");
    el.rel = "canonical";
    el.href = "/introduction";
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  const thanksPath = `/introduction-${pageNumber}/thanks`;
  const headlineLines = headline.split("||");
  const lastHeadlineLine = headlineLines[headlineLines.length - 1];
  const [headlineBefore, headlineAfter] = lastHeadlineLine.split("無料で");
  const longestLine = Math.max(
    ...headlineLines.slice(0, -1).map((line) => line.length),
    headlineBefore.length,
  );
  const isLongHeadline = longestLine > 12;

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="testlp-hero">
          <div className="testlp-hero__wash" />
          <div className="testlp-hero__top-fade" />
          <div className="testlp-hero__ring testlp-hero__ring--top" />
          <div className="testlp-hero__ring testlp-hero__ring--bottom" />

          <div className="testlp-hero__inner">
            <div className="block md:hidden relative -top-6">
              <Breadcrumb items={[{ label: breadcrumbLabel }]} />
            </div>
            <div className="hidden md:block absolute left-8 right-8 top-6">
              <Breadcrumb items={[{ label: breadcrumbLabel }]} />
            </div>

            <Image
              src={heroImage}
              alt=""
              priority
              sizes="(max-width: 767px) 240vw, 100vw"
              className="testlp-hero__image"
            />
            <div className="testlp-hero__copy">
              <span className="testlp-hero__badge">
                完全無料・全国対応
              </span>

              <h1 className={`testlp-hero__title ${isLongHeadline ? "testlp-hero__title--compact" : ""}`}>
                {headlineLines.slice(0, -1).map((line, i) => (
                  <span className="testlp-hero__title-line" key={i}>{line}</span>
                ))}
                {headlineAfter !== undefined ? (
                  <>
                    <span className="testlp-hero__title-line">{headlineBefore}</span>
                    <span className="testlp-hero__title-line">
                      <span className="testlp-hero__highlight">
                        <span>無料で</span>
                      </span>
                      {headlineAfter}
                    </span>
                  </>
                ) : (
                  <span className="testlp-hero__title-line">{lastHeadlineLine}</span>
                )}
              </h1>

              <p className="testlp-hero__lead">
                {subtext}
              </p>

              <div className="testlp-hero__mobile-ctas">
                <HeroPhoneCta />
                <HeroFormCta />
              </div>
            </div>

            <HeroTrustSignal className="testlp-hero__trust" />
          </div>
        </section>

        <PcContactLead />

        {/* ── Pain Points ── */}
        <section className="py-14 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-4">
              こんなお悩みはありませんか？
            </h2>
            <div className="h-px bg-primary mb-10" />
            <ul className="space-y-6 mb-12 px-2">
              {painPoints.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckSquare className="w-7 h-7 text-primary shrink-0 mt-0.5" />
                  <span className="text-base text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div
              className="rounded-2xl px-8 py-10 text-center"
              style={{ background: "linear-gradient(135deg,#0f2660,#1a50a8)" }}
            >
              <p className="text-white/80 text-sm mb-4">このようなお悩みを抱えている方</p>
              <div className="inline-block border-2 border-white rounded-full px-10 py-3">
                <p className="text-white font-bold text-xl md:text-2xl">税理士クラウドで解決しませんか？</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Form ── */}
        <section
          id="form"
          className="py-14"
          style={{ background: "linear-gradient(180deg,#dce8f5 0%,#eef4fb 100%)" }}
        >
          <div className="container">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-2">
              無料相談のお申し込み
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-8">
              入力後、担当コーディネーターよりご連絡いたします
            </p>
            <IntroductionForm
              thanksPath={thanksPath}
              sourcePage={`/introduction-${pageNumber}`}
              requestDetailExamples={requestDetailExamples}
            />
          </div>
        </section>

        {/* ── Merits ── */}
        <section className="py-14 bg-[#f0f4fa]">
          <div className="container">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-2">
              サービスの特徴
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-10">
              税理士クラウドの紹介サービスが選ばれる4つの理由
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {merits.map((merit, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                    style={{ background: "linear-gradient(135deg,#1a50a8,#2563eb)" }}
                  >
                    {merit.icon}
                  </div>
                  <h3 className="font-bold text-base text-foreground mb-2">{merit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{merit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Steps ── */}
        <section id="flow" className="py-14 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-2">
              ご利用の流れ
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-10">
              お問い合わせから税理士紹介まで最短1週間
            </p>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 text-white font-bold text-base"
                      style={{ background: i < 3 ? "linear-gradient(135deg,#1a50a8,#2563eb)" : "linear-gradient(135deg,#0f2660,#1a50a8)" }}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-primary/20 my-1 min-h-[32px]" />
                    )}
                  </div>
                  <div className="pb-8 pt-2 flex-1">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-widest">STEP {i + 1}</span>
                    <h3 className="font-bold text-lg text-foreground mt-0.5 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
              よくあるご質問
            </h2>
            <FAQ items={faqItems} />
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section
          className="py-14"
          style={{ background: "linear-gradient(135deg,#0f2660 0%,#1a50a8 100%)" }}
        >
          <div className="container text-center">
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
              まずはお気軽にご相談ください
            </h2>
            <p className="text-white/70 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              ご相談・紹介は完全無料です。お気軽にお申し込みください。
            </p>
            <a
              href="#form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#f97316,#ef4444)" }}
            >
              無料で相談する
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

      </main>

      <GlobalFooter />
      <style jsx global>{`
        .testlp-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: #eef6fd;
        }

        .testlp-hero__image {
          position: absolute;
          z-index: -30;
          top: 42vw;
          right: -20vw;
          width: 223vw;
          height: auto;
          max-width: none;
          -webkit-mask-image: linear-gradient(180deg, transparent 0, rgba(0, 0, 0, 0.86) 6vw, #000 13vw);
          mask-image: linear-gradient(180deg, transparent 0, rgba(0, 0, 0, 0.86) 6vw, #000 13vw);
          pointer-events: none;
        }

        .testlp-hero__wash,
        .testlp-hero__top-fade,
        .testlp-hero__ring {
          position: absolute;
          pointer-events: none;
        }

        .testlp-hero__wash {
          inset: 0;
          z-index: -20;
          background: linear-gradient(90deg, rgba(244, 250, 255, 0.98) 0%, rgba(244, 250, 255, 0.92) 43%, rgba(244, 250, 255, 0.2) 67%, rgba(244, 250, 255, 0.02) 100%);
        }

        .testlp-hero__top-fade {
          inset: 0 0 auto;
          z-index: -10;
          height: 260px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 100%);
        }

        .testlp-hero__ring {
          display: none;
          z-index: -10;
          border: 1px solid rgba(255, 255, 255, 0.78);
          border-radius: 9999px;
        }

        .testlp-hero__ring--top {
          top: -120px;
          right: -170px;
          width: 410px;
          height: 410px;
        }

        .testlp-hero__ring--bottom {
          display: none;
        }

        .testlp-hero__inner {
          position: relative;
          max-width: 1440px;
          min-height: 170vw;
          margin: 0 auto;
          padding: 12vw 5.1vw 2vw;
        }

        .testlp-hero__copy {
          max-width: 74vw;
        }

        .testlp-hero__badge {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          background: #1556b7;
          padding: 3.2vw 5.8vw;
          color: #fff;
          font-size: clamp(0.84rem, 3.65vw, 1rem);
          font-weight: 800;
          line-height: 1;
          box-shadow: 0 8px 22px rgba(21, 86, 183, 0.22);
        }

        .testlp-hero__title {
          margin: 5.4vw 0 0;
          color: #061d47;
          font-family: "Noto Serif JP", serif;
          font-size: clamp(1.58rem, 6.9vw, 1.9rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.52;
        }

        .testlp-hero__title--compact {
          font-size: clamp(1.05rem, 4.75vw, 1.3rem);
        }

        .testlp-hero__title-line {
          display: block;
          white-space: nowrap;
        }

        .testlp-hero__highlight {
          position: relative;
          display: inline-block;
        }

        .testlp-hero__highlight span {
          position: relative;
          z-index: 1;
        }

        .testlp-hero__highlight::after {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.22em;
          z-index: 0;
          height: 0.28em;
          background: rgba(241, 220, 130, 0.78);
          content: "";
        }

        .testlp-hero__lead {
          max-width: 70vw;
          margin: 5.8vw 0 0;
          color: #181818;
          font-size: clamp(0.84rem, 3.65vw, 0.98rem);
          font-weight: 600;
          line-height: 1.88;
        }

        .testlp-hero__mobile-ctas {
          display: flex;
          flex-direction: column;
          gap: 2.7vw;
          margin-top: 5.6vw;
        }

        .testlp-trust {
          margin-top: 10vw;
          text-align: center;
        }

        .testlp-trust__label {
          margin: 0 0 4px;
          color: #111827;
          font-size: 0.95rem;
          font-weight: 800;
          line-height: 1.35;
        }

        .testlp-trust__line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .testlp-trust__chevron {
          color: #1a50a8;
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1;
        }

        .testlp-trust__count {
          margin: 0;
          color: #050505;
          font-size: 1.35rem;
          font-weight: 900;
          line-height: 1;
          white-space: nowrap;
        }

        .testlp-trust__count span {
          color: #1a50a8;
        }

        .testlp-trust__note {
          margin: 8px 0 0;
          color: #8a8a8a;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.3;
        }

        .testlp-phone-cta,
        .testlp-form-cta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: min(61vw, 252px);
          min-height: min(27.5vw, 108px);
          max-width: none;
          box-sizing: border-box;
          border-radius: 2.1vw;
          text-decoration: none;
        }

        .testlp-phone-cta {
          border: 2px solid #1a50a8;
          background: rgba(255, 255, 255, 0.97);
          padding: 2.5vw 3vw;
          box-shadow: 0 12px 28px rgba(26, 80, 168, 0.12);
        }

        .testlp-phone-cta__main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2vw;
        }

        .testlp-phone-cta__icon {
          display: flex;
          width: 9.9vw;
          height: 9.9vw;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: #fff;
          box-shadow: 0 8px 18px rgba(26, 80, 168, 0.20);
        }

        .testlp-phone-cta__icon-svg {
          width: 5.3vw;
          height: 5.3vw;
        }

        .testlp-phone-cta__body {
          min-width: 0;
          text-align: center;
        }

        .testlp-phone-cta__label {
          margin: 0 0 1.1vw;
          color: #0b4b91;
          font-size: clamp(0.46rem, 2.05vw, 0.58rem);
          font-weight: 900;
          line-height: 1.2;
          white-space: nowrap;
        }

        .testlp-phone-cta__number {
          margin: 0;
          color: #0b4b91;
          font-size: clamp(1rem, 5.1vw, 1.25rem);
          font-weight: 900;
          line-height: 1;
          white-space: nowrap;
        }

        .testlp-phone-cta__hours {
          margin-top: 2vw;
          border-top: 1px dashed #b7d1ec;
          padding-top: 2vw;
        }

        .testlp-phone-cta__hours p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.6vw;
          margin: 0;
          color: #1f3f68;
          font-size: clamp(0.62rem, 2.9vw, 0.78rem);
          font-weight: 800;
          line-height: 1.4;
        }

        .testlp-phone-cta__check {
          width: 4vw;
          height: 4vw;
          flex: 0 0 auto;
          color: #1a50a8;
        }

        .testlp-form-cta {
          padding: 2.5vw 3vw;
          color: #fff;
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.20);
          transition: transform 0.18s ease;
        }

        .testlp-form-cta:hover {
          transform: translateY(-2px);
        }

        .testlp-form-cta__main {
          display: grid;
          grid-template-columns: 9.3vw minmax(0, 1fr) 7.5vw;
          align-items: center;
          gap: 1vw;
        }

        .testlp-form-cta__free {
          display: flex;
          width: 9.3vw;
          height: 9.3vw;
          align-items: center;
          justify-content: center;
          border: 3px solid rgba(255, 255, 255, 0.62);
          border-radius: 9999px;
          background: #fff;
          color: #f97316;
          font-size: clamp(0.64rem, 2.85vw, 0.82rem);
          font-weight: 900;
          line-height: 1;
        }

        .testlp-form-cta__body {
          min-width: 0;
          text-align: center;
        }

        .testlp-form-cta__label {
          margin: 0 0 0.8vw;
          font-size: clamp(0.52rem, 2.35vw, 0.66rem);
          font-weight: 800;
          line-height: 1.25;
        }

        .testlp-form-cta__title {
          margin: 0;
          font-size: clamp(0.92rem, 4.25vw, 1.08rem);
          font-weight: 900;
          line-height: 1.18;
          white-space: nowrap;
        }

        .testlp-form-cta__arrow {
          display: flex;
          width: 7.5vw;
          height: 7.5vw;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #fff;
          color: #f97316;
          transition: transform 0.18s ease;
        }

        .testlp-form-cta:hover .testlp-form-cta__arrow {
          transform: translateX(4px);
        }

        .testlp-form-cta__arrow-svg {
          width: 4vw;
          height: 4vw;
        }

        .testlp-form-cta__sub {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5vw;
          margin-top: 1.7vw;
          border-radius: 1.4vw;
          background: rgba(255, 255, 255, 0.94);
          padding: 1.45vw 1.6vw;
          color: #f97316;
          font-size: clamp(0.5rem, 2.15vw, 0.62rem);
          font-weight: 800;
          line-height: 1.4;
          white-space: nowrap;
        }

        .testlp-form-cta__monitor {
          width: 3.5vw;
          height: 3.5vw;
          flex: 0 0 auto;
        }

        .testlp-pc-contact {
          display: none;
        }

        @media (min-width: 640px) {
          .testlp-hero__title {
            font-size: 2.35rem;
          }

          .testlp-hero__title--compact {
            font-size: 1.65rem;
          }
        }

        @media (min-width: 768px) {
          .testlp-hero__image {
            top: 0;
            bottom: 0;
            left: 0;
            width: calc(100% + max(0px, (100vw - 100%) / 2));
            max-width: none;
            height: 100%;
            transform: none;
            object-fit: cover;
            object-position: center top;
            -webkit-mask-image: none;
            mask-image: none;
          }

          .testlp-hero__wash {
            background: linear-gradient(90deg, rgba(244, 250, 255, 0.92) 0%, rgba(244, 250, 255, 0.62) 42%, rgba(244, 250, 255, 0.12) 68%, rgba(244, 250, 255, 0.02) 100%);
          }

          .testlp-hero__top-fade {
            height: 280px;
          }

          .testlp-hero__ring {
            display: block;
          }

          .testlp-hero__ring--top {
            display: none;
            top: -208px;
            right: auto;
            left: 44%;
            width: 544px;
            height: 544px;
          }

          .testlp-hero__ring--bottom {
            display: block;
            left: -120px;
            bottom: -145px;
            width: 440px;
            height: 440px;
          }

          .testlp-hero__inner {
            min-height: 746px;
            padding: 116px 24px 40px;
          }

          .testlp-hero__copy {
            max-width: 800px;
          }

          .testlp-hero__badge {
            display: inline-flex;
            padding: 14px 36px;
            font-size: 1.25rem;
          }

          .testlp-hero__title {
            margin-top: 48px;
            font-size: 3.35rem;
            line-height: 1.34;
          }

          .testlp-hero__lead {
            max-width: 700px;
            margin-top: 40px;
            font-size: 1.45rem;
            line-height: 1.75;
          }

          .testlp-hero__mobile-ctas {
            display: none;
          }

          .testlp-hero__trust {
            position: absolute;
            left: 24px;
            bottom: 80px;
            width: 440px;
            margin-top: 0;
          }

          .testlp-trust__label {
            margin-bottom: 6px;
            font-size: 1.125rem;
          }

          .testlp-trust__line {
            gap: 18px;
          }

          .testlp-trust__chevron {
            font-size: 2.5rem;
          }

          .testlp-trust__count {
            font-size: 2rem;
          }

          .testlp-trust__note {
            margin-top: 6px;
            font-size: 0.875rem;
          }

          .testlp-pc-contact {
            display: block;
            background: linear-gradient(180deg, #eaf4ff 0%, #deebf7 100%);
            padding: 46px 24px 38px;
          }

          .testlp-pc-contact__inner {
            max-width: 1280px;
            margin: 0 auto;
          }

          .testlp-pc-contact__heading {
            margin-bottom: 32px;
            text-align: center;
          }

          .testlp-pc-contact__heading h2 {
            margin: 0;
            color: #1a50a8;
            font-family: "Noto Serif JP", serif;
            font-size: 2.15rem;
            font-weight: 800;
            line-height: 1.35;
            letter-spacing: 0;
          }

          .testlp-pc-contact__heading p {
            margin: 16px 0 0;
            color: #1f3f68;
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1.5;
          }

          .testlp-pc-contact__cards {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 24px;
          }

          .testlp-pc-contact .testlp-phone-cta,
          .testlp-pc-contact .testlp-form-cta {
            width: 100%;
            height: auto;
            max-width: none;
            min-height: 190px;
            border-radius: 10px;
            padding: 26px 30px;
          }

          .testlp-pc-contact .testlp-phone-cta {
            border-width: 3px;
          }

          .testlp-pc-contact .testlp-phone-cta__main {
            gap: 22px;
          }

          .testlp-pc-contact .testlp-phone-cta__icon {
            width: 84px;
            height: 84px;
          }

          .testlp-pc-contact .testlp-phone-cta__icon-svg {
            width: 42px;
            height: 42px;
          }

          .testlp-pc-contact .testlp-phone-cta__label {
            margin-bottom: 10px;
            font-size: 1.25rem;
          }

          .testlp-pc-contact .testlp-phone-cta__number {
            font-size: 3.2rem;
          }

          .testlp-pc-contact .testlp-phone-cta__hours {
            margin-top: 22px;
            padding-top: 18px;
          }

          .testlp-pc-contact .testlp-phone-cta__hours p {
            font-size: 1.2rem;
          }

          .testlp-pc-contact .testlp-phone-cta__check {
            width: 22px;
            height: 22px;
          }

          .testlp-pc-contact .testlp-form-cta__main {
            grid-template-columns: 112px minmax(0, 1fr) 56px;
            gap: 18px;
          }

          .testlp-pc-contact .testlp-form-cta__free {
            width: 90px;
            height: 90px;
            font-size: 1.75rem;
          }

          .testlp-pc-contact .testlp-form-cta__label {
            margin-bottom: 10px;
            font-size: 1.25rem;
          }

          .testlp-pc-contact .testlp-form-cta__title {
            font-size: clamp(2.15rem, 3.35vw, 3rem);
          }

          .testlp-pc-contact .testlp-form-cta__arrow {
            width: 54px;
            height: 54px;
          }

          .testlp-pc-contact .testlp-form-cta__arrow-svg {
            width: 28px;
            height: 28px;
          }

          .testlp-pc-contact .testlp-form-cta__sub {
            margin-top: 24px;
            border-radius: 8px;
            padding: 14px 18px;
            font-size: 1.1rem;
          }

          .testlp-pc-contact .testlp-form-cta__monitor {
            width: 24px;
            height: 24px;
          }

          .testlp-pc-contact__note {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 34px;
            border-top: 1px solid #c5d5e7;
            padding-top: 26px;
            color: #1d334f;
          }

          .testlp-pc-contact__note p {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 800;
            line-height: 1.45;
          }

          .testlp-pc-contact__note-icon {
            width: 24px;
            height: 24px;
            flex: 0 0 auto;
            color: #1a50a8;
          }
        }

        @media (min-width: 1024px) {
          .testlp-hero__title {
            font-size: 3.75rem;
          }
        }

        @media (min-width: 2200px) {
          .testlp-hero__inner {
            max-width: 1800px;
          }

          .testlp-pc-contact__inner {
            max-width: 1500px;
          }
        }
      `}</style>
    </div>
  );
}
