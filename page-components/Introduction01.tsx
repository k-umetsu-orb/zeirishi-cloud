/**
 * Introduction01 page - /introduction-01
 */
import { useState, useEffect } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowRight, Users, CalendarCheck, Shield, Globe, ChevronDown, CheckSquare } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import { getAllPrefectures, getCitiesByPrefecture } from "@/lib/data";
import womanImage from "@/images/女性1_crop.png";

// ─── Data ─────────────────────────────────────────────────────────────────────

const merits = [
  { icon: <Shield className="w-8 h-8" />,  title: "完全無料",         desc: "ご相談から紹介まで一切費用はかかりません。成功報酬も不要です。" },
  { icon: <Users className="w-8 h-8" />,   title: "専門コーディネーター", desc: "税理士業界に精通した担当者が最適な税理士をご提案します。" },
  { icon: <CalendarCheck className="w-8 h-8" />,     title: "最短翌営業日ご紹介", desc: "お急ぎの場合でも迅速に対応。お問い合わせ後すぐにご連絡します。" },
  { icon: <Globe className="w-8 h-8" />,   title: "全国対応",         desc: "全国3,000件以上の事務所ネットワークから地域を問わずご紹介します。" },
];

const steps = [
  { title: "ご相談内容の入力",        desc: "フォームから業種・規模・依頼内容など希望条件をご入力ください。" },
  { title: "コーディネーターからご連絡", desc: "専門担当者が内容を確認し、1〜3営業日以内にご連絡いたします。" },
  { title: "税理士のご紹介",          desc: "ご要望に合った税理士を複数名ご紹介。特徴をお伝えし比較検討いただけます。" },
  { title: "面談・お打ち合わせ",      desc: "気になる税理士と無料で面談。相性や対応力を直接ご確認ください。" },
  { title: "ご契約",                 desc: "最適な税理士が見つかりましたら直接ご契約。その後もサポート継続。" },
];

const CONSULT_TYPES = ["法人の決算・申告", "個人事業主の確定申告", "相続税・贈与税", "記帳代行", "起業・会社設立", "その他"];

const painPoints = [
  <>現在の税理士は<span className="text-amber-500 underline underline-offset-2">連絡が遅い</span>、質問への<span className="text-amber-500 underline underline-offset-2">返答がない</span>、月次や決算の<span className="text-amber-500 underline underline-offset-2">説明がない</span></>,
  <>顧問料に対して<span className="text-amber-500 underline underline-offset-2">サービスの質が合っていない</span>と感じている</>,
  <><span className="text-amber-500 underline underline-offset-2">もっと経営に寄り添ってくれる</span>税理士に変えたい</>,
  <>税理士を変えたいが、<span className="text-amber-500 underline underline-offset-2">どうやって変えればいいかわからない</span></>,
];

const faqItems = [
  { question: "紹介サービスの利用に費用はかかりますか？",     answer: "いいえ、ご相談から紹介まですべて無料でご利用いただけます。成功報酬も一切かかりません。" },
  { question: "どのような税理士を紹介してもらえますか？",     answer: "法人税・所得税・相続税・事業承継など多様な分野に対応する税理士をご紹介します。地域・予算のご希望にも対応いたします。" },
  { question: "紹介された税理士と必ず契約しなければなりませんか？", answer: "いいえ、ご契約は任意です。面談後にお断りいただいても問題ありません。" },
  { question: "どのくらいの期間で紹介してもらえますか？",     answer: "通常、お問い合わせから1〜3営業日以内にご連絡し、1週間程度でご紹介いたします。" },
  { question: "法人でなくても利用できますか？",              answer: "はい、個人事業主・確定申告・相続相談など個人のお客様もご利用いただけます。" },
];

// ─── Form component ────────────────────────────────────────────────────────────

function IntroductionForm() {
  const router = useRouter();
  const [clientType, setClientType] = useState<string>("法人");
  const [consultType, setConsultType] = useState<string>("");
  const [prefecture, setPrefecture] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const clientTypes = ["法人", "個人事業主", "個人（確定申告等）"];
  const allPrefectures = getAllPrefectures();
  const cityOptions = prefecture ? getCitiesByPrefecture(prefecture) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!consultType) newErrors.consultType = "ご相談の内容を選択してください";
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
          sourcePage: "/introduction-01",
          clientType,
          consultType,
          prefectureName: allPrefectures.find((p) => p.slug === prefecture)?.name ?? prefecture,
          cityName: cityOptions.find((c) => c.slug === city)?.name ?? "",
          name,
          email,
          phone,
        }),
      });
      if (!res.ok) throw new Error();
      router.push("/introduction-01/thanks");
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

      {/* Consult type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          ご相談の内容 <span className="text-red-500 text-xs ml-1">必須</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONSULT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setConsultType(t)}
              className={`px-3 py-2 rounded border text-sm font-medium transition-colors text-left ${
                consultType === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.consultType && <p className="mt-1.5 text-xs text-red-500">{errors.consultType}</p>}
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

      {/* Name + email */}
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

      {/* Privacy policy consent */}
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
            <Link href="/privacy" className="text-primary hover:underline">
              プライバシーポリシー
            </Link>
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Introduction01() {
  usePageTitle(
    "税理士・会計事務所の無料紹介サービス | 税理士クラウド",
    "税理士・会計事務所をお探しながら税理士クラウドへご相談ください。税理士業界に特化した専門のコーディネーターがあなたにぴったりの税理士・会計事務所をご紹介します。",
  );
  useEffect(() => {
    const el = document.createElement("link");
    el.rel = "canonical";
    el.href = "/introduction";
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0f2660 0%,#1a50a8 60%,#1d4ed8 100%)" }}
        >
          <div className="container relative pt-10 md:pt-24">
            <div className="block md:hidden relative -top-6">
              <Breadcrumb items={[{ label: "税理士紹介サービス" }]} variant="light" />
            </div>

            <div className="grid grid-cols-[1.1fr_1fr] md:grid-cols-[1.2fr_0.8fr] gap-3 md:gap-6 items-start md:items-end text-left">
              <div className="pb-6 md:pb-[72px] min-w-0">
                <div className="hidden md:block relative md:-top-10">
                  <Breadcrumb items={[{ label: "税理士紹介サービス" }]} variant="light" />
                </div>

                <div className="w-fit ml-auto">
                  {/* Badge */}
                  <div className="flex justify-start mb-2 md:mt-4 md:mb-6">
                    <span
                      className="inline-flex items-center px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-white"
                      style={{ background: "linear-gradient(90deg,#f97316,#ef4444)" }}
                    >
                      完全無料・全国対応
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-bold text-base md:text-5xl lg:text-[3.25rem] text-white leading-tight mb-2 md:mb-6 tracking-tight">
                    あなたに合った税理士を<br />
                    <span className="relative inline-block">
                      <span className="relative z-10">無料でご紹介</span>
                      <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-400/40 -z-0" />
                    </span>
                    します
                  </h1>

                  {/* Subtext */}
                  <p className="text-white/80 text-[11px] md:text-lg leading-relaxed md:max-w-xl mb-3 md:mb-10">
                    専門コーディネーターがご要望に合った税理士を複数名ご紹介。<br className="hidden sm:block" />
                    比較検討の上、最適な税理士をお選びいただけます。
                  </p>

                  {/* CTA button */}
                  <a
                    href="#form"
                    className="inline-flex items-center gap-1.5 px-3 py-2 md:px-10 md:py-4 rounded-lg md:rounded-xl font-bold text-xs md:text-lg text-white transition-opacity hover:opacity-90 shadow-lg"
                    style={{ background: "linear-gradient(90deg,#f97316,#ef4444)" }}
                  >
                    無料で相談する
                    <ArrowRight className="w-3 h-3 md:w-5 md:h-5" />
                  </a>

                  {/* Trust signal */}
                  <div className="mt-3 md:mt-10 flex justify-start items-center gap-1.5 md:gap-4">
                    <div className="text-amber-400 text-base md:text-3xl leading-none">❮</div>
                    <div className="text-center">
                      <p className="text-white/60 text-[9px] md:text-xs mb-0.5">全国対応！</p>
                      <p className="text-white font-extrabold text-sm md:text-2xl leading-none">
                        掲載数<span className="text-amber-400"> 3,000件以上</span>
                      </p>
                      <p className="text-white/40 text-[8px] md:text-[10px] mt-1">※2026年3月時点</p>
                    </div>
                    <div className="text-amber-400 text-base md:text-3xl leading-none">❯</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start self-end md:items-end md:h-full">
                <Image
                  src={womanImage}
                  alt="コーディネーター"
                  className="w-full max-w-[155px] md:max-w-none md:w-[310px] h-auto"
                  priority
                />
              </div>
            </div>
          </div>

        </section>

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

        {/* ── Form (hero直後) ── */}
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
            <IntroductionForm />
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
                  {/* Timeline */}
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
                  {/* Content */}
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

        {/* ── Form ── */}
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
    </div>
  );
}
