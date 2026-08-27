/**
 * Introduction page - /introduction
 * Design: zeiri4.com/shoukai/ inspired.
 */
import { useState } from "react";
import { usePageTitle } from "@/lib/usePageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowRight, Building2, CalendarCheck, ChevronDown, CircleCheck, FilePenLine, Landmark, MousePointerClick, Phone, MessageCircle, Cloud, FileText, MapPin, Search, Calculator, Briefcase, Handshake, ClipboardList, ClipboardCheck, JapaneseYen, Mail, UserRound, Users } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllPrefectures, getCitiesByPrefecture } from "@/lib/data";
import heroWomanImage from "@/images/女性1_crop.png";
import japanMapImage from "@/images/japan map_ver2.png";
import customerSatisfactionImage from "@/images/customer-satisfaction-98.png";
import accountantPhoto1 from "@/images/男性1.png";
import accountantPhoto2 from "@/images/男性2.png";
import accountantPhoto3 from "@/images/男性3.png";
import accountantPhoto4 from "@/images/男性4.png";
import accountantPhoto5 from "@/images/女性7.png";
import accountantPhoto6 from "@/images/男性6.png";
import accountantPhoto7 from "@/images/男性7.png";
import accountantPhoto8 from "@/images/男性8.png";
import accountantPhoto9 from "@/images/男性9.png";

const PHONE_NUMBER = "03-6403-3202";
const ACCOUNTANT_PHOTOS = [
  { src: accountantPhoto1, crop: "native" },
  { src: accountantPhoto2, crop: "native" },
  { src: accountantPhoto3, crop: "native" },
  { src: accountantPhoto4, crop: "native" },
  { src: accountantPhoto5, crop: "native" },
  // 男性6〜9は元画像に白い上下余白があるため、表示時のみ拡大してトリミングする。
  { src: accountantPhoto6, crop: "zoomed" },
  { src: accountantPhoto7, crop: "framed" },
  { src: accountantPhoto8, crop: "framed" },
  { src: accountantPhoto9, crop: "framed" },
];
const MARQUEE_PHOTOS = Array.from({ length: 6 }, () => ACCOUNTANT_PHOTOS).flat();

function reportPhoneConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-18309633981/l7z9CMu21c0cEL2v25pE",
    value: 50000.0,
    currency: "JPY",
  });
}

function HeroFeatureChips({ className = "" }: { className?: string }) {
  return (
    <ul className={`testlp-hero__features ${className}`} aria-label="税理士紹介サービスの特徴">
      <li className="testlp-hero__feature">
        <JapaneseYen className="testlp-hero__feature-icon" />
        <span>税理士のご紹介<br /><span className="testlp-hero__feature-emphasis">完全無料</span></span>
      </li>
      <li className="testlp-hero__feature">
        <Image src={japanMapImage} alt="" className="testlp-hero__feature-map" />
        <span>全国対応<br /><span className="testlp-hero__feature-emphasis">オンライン相談</span></span>
      </li>
      <li className="testlp-hero__feature">
        <Users className="testlp-hero__feature-icon" />
        <span>掲載税理士<br /><span className="testlp-hero__feature-emphasis">3,000件以上</span></span>
      </li>
    </ul>
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
            <span className="testlp-phone-cta__label--sp">電話でのお問い合わせ</span>
            <span className="testlp-phone-cta__label--pc">電話でのお問い合わせはこちら</span>
          </p>
          <p className="testlp-phone-cta__number">
            {PHONE_NUMBER}
          </p>
        </div>
        <div className="testlp-phone-cta__tap" aria-hidden="true">
          <MousePointerClick className="testlp-phone-cta__tap-icon" />
          <span>タップで発信</span>
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

function HeroFormCta({ title = "税理士を比較してみる" }: { title?: string }) {
  return (
    <a
      href="#form"
      className="testlp-form-cta group"
      style={{ background: "linear-gradient(135deg,#ff9f1c 0%,#f97316 48%,#fb4b1f 100%)" }}
    >
      <div className="testlp-form-cta__main">
        <div className="testlp-form-cta__free"><Mail /></div>
        <div className="testlp-form-cta__body">
          <p className="testlp-form-cta__label">あなたに合う</p>
          <p className="testlp-form-cta__title">
            {title}
          </p>
          <p className="testlp-form-cta__note">【最短1週間で完了！】</p>
        </div>
        <div className="testlp-form-cta__arrow">
          <ArrowRight className="testlp-form-cta__arrow-svg" />
        </div>
      </div>
    </a>
  );
}

const consultationStarters = [
  { label: "法人", icon: Building2 },
  { label: "法人設立・法人化予定", icon: FilePenLine },
  { label: "個人事業主・フリーランス", icon: UserRound },
  { label: "相続税申告", icon: Landmark },
  { label: "確定申告・その他", icon: ClipboardList },
];

function ConsultationStartForm({ variant = "section" }: { variant?: "hero" | "section" }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  function proceed() {
    if (!selected) return;
    void router.push({ pathname: "/introduction/step", query: { clientType: selected } });
  }

  return (
    <section className={`introduction-start-form introduction-start-form--${variant}`} aria-label="無料相談の開始フォーム">
      <div className="introduction-start-form__heading">
        <h2>
          {variant === "hero" ? <><span>まずはご相談者様について</span><span>教えてください</span></> : "まずはお気軽にお問い合わせください"}
        </h2>
        <p>
          {variant === "hero" ? <><span>ご紹介は無料です。</span><span>専門コーディネーターが丁寧にお伺いします。</span></> : "ご紹介は無料です。専門コーディネーターが丁寧にお伺いします。"}
        </p>
      </div>
      <div className="introduction-start-form__choices">
        {consultationStarters.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelected(label)}
            className={`introduction-start-form__choice ${selected === label ? "is-selected" : ""}`}
            aria-pressed={selected === label}
          >
            <Icon />
            <span>{label}</span>
            <ChevronDown className="introduction-start-form__choice-arrow" />
          </button>
        ))}
        <button type="button" onClick={proceed} disabled={!selected} className="introduction-start-form__next">
          次へ <ArrowRight />
        </button>
      </div>
      <p className="introduction-start-form__privacy"><CircleCheck /> 入力情報は公開されません</p>
    </section>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const merits = [
  { icon: <MapPin className="w-10 h-10" />, title: "地域から探せる", desc: "お住まいの地域やエリアから税理士を見つけられます。" },
  { icon: <ClipboardList className="w-10 h-10" />, title: "相談内容で探せる", desc: "税務・会計の相談内容に合う税理士を効率よく探せます。" },
  { icon: <Search className="w-10 h-10" />, title: "候補を比較できる", desc: "サービス内容、得意分野を一覧で比べて検討できます。", spDesc: ["サービス内容、得意分野を", "一覧で比べて検討できます。"] },
  { icon: <MessageCircle className="w-10 h-10" />, title: "無料で税理士を紹介", desc: "ご要望を伺ったうえで、無料でご紹介可能です。", spDesc: ["ご要望を伺ったうえで、", "無料でご紹介可能です。"] },
];

const steps = [
  { icon: <Mail className="w-10 h-10" />, title: "相談内容を送る", desc: "フォームから希望条件を送信" },
  { icon: <Users className="w-10 h-10" />, title: "希望をすり合わせる", desc: "コーディネーターがご要望を確認" },
  { icon: <FileText className="w-10 h-10" />, title: "候補をご提案", desc: "複数候補を比較しやすくご案内" },
  { icon: <CalendarCheck className="w-10 h-10" />, title: "必要に応じて面談する", desc: "相性や対応範囲を確認" },
  { icon: <Handshake className="w-10 h-10" />, title: "納得した上でご契約", desc: "比較した上で契約を判断" },
];

const CONSULT_TYPES = ["顧問税理士の見直し", "確定申告・年末調整", "相続・贈与", "事業継承", "起業・会社設立", "その他"];

const REQUEST_DETAIL_EXAMPLES = [
  "決算と確定申告をまとめて依頼したい",
  "会社設立の支援をしてほしい",
];

const faqItems = [
  { question: "紹介サービスの利用に費用はかかりますか？",     answer: "いいえ、ご紹介は無料です。成功報酬も一切かかりません。" },
  { question: "どのような税理士を紹介してもらえますか？",     answer: "法人税・所得税・相続税・事業承継など多様な分野に対応する税理士をご紹介します。地域・予算のご希望にも対応いたします。" },
  { question: "紹介された税理士と必ず契約しなければなりませんか？", answer: "いいえ、ご契約は任意です。面談後にお断りいただいても問題ありません。" },
  { question: "どのくらいの期間で紹介してもらえますか？",     answer: "通常、お問い合わせから1〜3営業日以内にご連絡し、1週間程度でご紹介いたします。" },
  { question: "法人でなくても利用できますか？",              answer: "はい、個人事業主・確定申告・相続相談など個人のお客様もご利用いただけます。" },
];

const concernItems = [
  { icon: <MessageCircle className="w-11 h-11" />, title: "会社設立後の疑問が不安", body: "会社を設立したけれど\n何から始めればいいかわからない", tone: "blue" },
  { icon: <MessageCircle className="w-11 h-11" />, title: "今の税理士と合わない", body: "コミュニケーションや\n対応に不満がある", tone: "orange" },
  { icon: <Cloud className="w-11 h-11" />, title: "クラウド会計を使いたい", body: "効率的に記帳や管理を\nしたいと考えている", tone: "teal" },
  { icon: <MessageCircle className="w-11 h-11" />, title: "申告や相続を相談したい", body: "確定申告や相続のことを\n専門家に相談したい", tone: "purple" },
];

const finderRows = [
  { icon: <Briefcase className="w-5 h-5" />, label: "対応業種の例", chips: ["建設", "不動産", "飲食", "医療", "美容", "IT・EC"], accent: "blue" },
  { icon: <Calculator className="w-5 h-5" />, label: "会計ソフトの例", chips: ["弥生会計", "freee", "マネーフォワード", "TKC", "JDL", "PCA"], accent: "teal" },
  { icon: <FileText className="w-5 h-5" />, label: "ご相談内容の例", chips: ["確定申告", "顧問契約", "記帳代行", "会社設立", "相続", "資金繰り"], accent: "orange" },
];

function ConcernsSection() {
  return (
    <section className="intro-concerns-section">
      <div className="container max-w-7xl intro-concerns">
        <h2 className="intro-section-heading">
          <span>税理士に関してこんな</span><br className="intro-concerns-title-break" />
          <span>お悩みはありませんか？</span>
        </h2>
        <p className="intro-section-lead">
          まだ依頼内容が固まっていなくても大丈夫です。
        </p>
        <div className="intro-concerns__grid">
          {concernItems.map((item) => (
            <article key={item.title} className={`intro-concern intro-concern--${item.tone}`}>
              <div className="intro-concern__icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
          <div className="intro-concerns__center" aria-hidden="true">
            <ClipboardCheck />
          </div>
        </div>
        <div className="intro-concerns__cta">
          <HeroFormCta />
          <HeroPhoneCta />
        </div>
      </div>
    </section>
  );
}

function ReassuranceBand() {
  return (
    <div className="intro-reassurance">
      <p className="intro-reassurance__heading">相談の前にご確認ください</p>
      <ul className="intro-reassurance__list">
        <li><CircleCheck /><span><strong>ご紹介は無料</strong><small>費用は一切かかりません。</small></span></li>
        <li><CircleCheck /><span><strong>候補を比べてから判断</strong><small>納得してから検討できます。</small></span></li>
        <li><CircleCheck /><span><strong>契約はご自身の意思で</strong><small>無理な営業はありません。</small></span></li>
      </ul>
    </div>
  );
}

function AccountantMarquee({ inHero = false }: { inHero?: boolean }) {
  return (
    <section className={`intro-accountant-marquee${inHero ? " intro-accountant-marquee--hero" : ""}`} aria-label="登録税理士・会計事務所">
      {!inHero && <h2>全国の税理士・会計事務所が多数登録中</h2>}
      <div className="intro-accountant-marquee__viewport">
        <div className="intro-accountant-marquee__fade intro-accountant-marquee__fade--left" />
        <div className="intro-accountant-marquee__fade intro-accountant-marquee__fade--right" />
        <div className="intro-accountant-marquee__track animate-scroll-x">
          {[...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS].map((photo, index) => (
            <div key={index} className="intro-accountant-marquee__item">
              <div className="intro-accountant-marquee__photo">
                <Image
                  src={photo.src}
                  alt="登録税理士・会計事務所"
                  fill
                  // 白余白をトリミングする画像は拡大表示するため、実表示サイズに合わせて高解像度を取得する。
                  sizes={photo.crop === "zoomed" ? "(max-width: 767px) 170px, 240px" : photo.crop === "framed" ? "(max-width: 767px) 120px, 180px" : "(max-width: 767px) 88px, 128px"}
                  quality={90}
                  className={`object-cover ${photo.crop === "zoomed" ? "intro-accountant-marquee__image--zoomed" : photo.crop === "framed" ? "intro-accountant-marquee__image--framed" : ""}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroductionStickyCta() {
  return (
    <aside className="intro-sticky-cta" aria-label="無料相談・電話相談">
      <div className="intro-sticky-cta__inner intro-concerns__cta">
        <HeroFormCta />
        <HeroPhoneCta />
      </div>
    </aside>
  );
}

function ConditionFinder() {
  return (
    <section className="intro-finder-section">
      <div className="container max-w-7xl">
        <h2 className="intro-section-heading">
          条件から相談先を見つける
        </h2>
        <div className="intro-finder__rows">
          {finderRows.map((row) => (
            <div key={row.label} className={`intro-finder intro-finder--${row.accent}`}>
              <div className="intro-finder__label">{row.icon}<span>{row.label}</span></div>
              <div className="intro-finder__chips">
                {row.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  const [requestDetail, setRequestDetail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const clientTypes = ["法人", "個人事業主・フリーランス", "その他（確定申告など）"];
  const allPrefectures = getAllPrefectures();
  const cityOptions = prefecture ? getCitiesByPrefecture(prefecture) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!consultType) newErrors.consultType = "ご相談項目を選択してください";
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
          sourcePage: "/introduction",
          clientType,
          consultType,
          prefectureName: allPrefectures.find((p) => p.slug === prefecture)?.name ?? prefecture,
          cityName: cityOptions.find((c) => c.slug === city)?.name ?? "",
          name,
          email,
          phone,
          requestDetail,
        }),
      });
      if (!res.ok) throw new Error();
      window.oaiq?.("measure", "lead_created", { type: "customer_action" });
      router.push("/introduction/thanks");
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

      {/* Consult type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          ご相談項目 <span className="text-red-500 text-xs ml-1">必須</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONSULT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setConsultType(t)}
              className={`px-1.5 py-2 rounded border text-xs sm:text-sm font-medium transition-colors text-left whitespace-nowrap ${
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

      {/* Request detail */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-1">
          税理士に依頼したい内容 <span className="text-muted-foreground text-xs ml-1">任意</span>
        </label>
        <textarea
          placeholder={`例\n${REQUEST_DETAIL_EXAMPLES.map((t) => `・${t}`).join("\n")}`}
          value={requestDetail}
          onChange={(e) => setRequestDetail(e.target.value)}
          rows={3}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
        />
        {errors.requestDetail && <p className="mt-1 text-xs text-red-500">{errors.requestDetail}</p>}
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Introduction() {
  usePageTitle(
    "税理士・会計事務所の無料紹介サービス | 税理士クラウド",
    "税理士・会計事務所をお探しながら税理士クラウドへご相談ください。税理士業界に特化した専門のコーディネーターがあなたにぴったりの税理士・会計事務所をご紹介します。",
  );
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1 introduction-main">

        {/* ── Hero ── */}
      <section className="testlp-hero">
          <div className="testlp-hero__wash" />
          <div className="testlp-hero__top-fade" />
          <div className="testlp-hero__ring testlp-hero__ring--top" />
          <div className="testlp-hero__ring testlp-hero__ring--bottom" />

        <div className="testlp-hero__inner">
          <div className="testlp-hero__mobile-breadcrumb block md:hidden relative -top-6">
            <Breadcrumb items={[{ label: "税理士紹介サービス" }]} />
          </div>
          <div className="testlp-hero__breadcrumb hidden md:block absolute left-8 right-8 top-6">
            <Breadcrumb items={[{ label: "税理士紹介サービス" }]} />
          </div>
          <Image
            src={heroWomanImage}
            alt="税理士クラウドの相談スタッフ"
            priority
            sizes="(max-width: 767px) 130vw, 520px"
            className="testlp-hero__image"
          />
            <div className="testlp-hero__copy">
              <span className="testlp-hero__badge">完全無料・全国対応</span>

              <div className="testlp-hero__mobile-only testlp-hero__mobile-satisfaction">
                <Image
                  src={customerSatisfactionImage}
                  alt="顧客満足度98パーセント"
                  sizes="(max-width: 767px) 364px, 0px"
                  className="testlp-hero__satisfaction-image"
                />
              </div>

              <h1 className="testlp-hero__title testlp-hero__title--consultation">
                <span className="testlp-hero__title-line">
                  <span className="testlp-hero__highlight"><span>あなたに合った</span></span>税理士を
                </span>
                <span className="testlp-hero__title-line">ご紹介します</span>
              </h1>

              <p className="testlp-hero__lead hidden md:block">
                専門コーディネーターがご要望を丁寧にヒアリングし、<br />
                最適な税理士・会計事務所をご紹介いたします。
              </p>

              <div className="testlp-hero__mobile-only">
                <AccountantMarquee inHero />
              </div>

              <HeroFeatureChips />
            </div>
            <div className="testlp-hero__start-panel">
              <ConsultationStartForm variant="hero" />
            </div>
          </div>
        </section>

        <AccountantMarquee />

        <ConcernsSection />

        {/* ── Service features ── */}
        <section className="intro-value-section">
          <div className="container max-w-7xl intro-value-section__inner">
            <h2 className="intro-section-heading">
              <span>税理士クラウドが</span><br className="intro-value-title-break" />
              <span>選ばれる理由</span>
            </h2>
            <div className="intro-merits">
              {merits.map((merit, i) => (
                <div key={i} className="intro-merit">
                  <p className="intro-merit__number" aria-hidden="true">{i + 1}</p>
                  <div className="intro-merit__icon">{merit.icon}</div>
                  <h3>{merit.title}</h3>
                  <p>{merit.spDesc ? <><span>{merit.spDesc[0]}</span><br className="intro-merit__sp-break" /><span>{merit.spDesc[1]}</span></> : merit.desc}</p>
                </div>
              ))}
            </div>
            <ReassuranceBand />
          </div>
        </section>

        <ConditionFinder />

        {/* ── Steps ── */}
        <section id="flow" className="intro-flow-section">
          <div className="container max-w-7xl intro-flow-section__inner">
            <h2 className="intro-section-heading">
              ご紹介の流れ
            </h2>
            <div className="intro-flow">
              {steps.map((step, i) => (
                <div key={i} className="intro-flow-card">
                  <span className="intro-flow-card__number">{String(i + 1).padStart(2, "0")}</span>
                  <div className="intro-flow-card__icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="intro-flow-highlight">
              <ClipboardCheck />
              <div>
                <h3><span className="intro-flow-highlight__marker">比較しながら</span>、<br className="intro-flow-highlight__sp-break" />納得できる相談先を</h3>
                <p>複数の税理士・会計事務所を比較し、自分に合った相談先を選べます。</p>
              </div>
            </div>
            <div className="intro-flow__cta intro-concerns__cta">
              <HeroFormCta />
              <HeroPhoneCta />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 bg-white">
          <div className="container max-w-7xl">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
              よくあるご質問
            </h2>
            <FAQ items={faqItems} />
          </div>
        </section>

        {/* ── Form ── */}
        <section
          id="form"
          className="py-16"
          style={{ background: "linear-gradient(180deg,#dce8f5 0%,#eef4fb 100%)" }}
        >
          <div className="container">
            <ConsultationStartForm />
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section
          className="py-14"
          style={{ background: "linear-gradient(135deg,#0f2660 0%,#1a50a8 100%)" }}
        >
          <div className="container text-center">
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
              まずはお気軽にお問い合わせください
            </h2>
            <p className="text-white/70 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              ご紹介は完全無料です。お気軽にお申し込みください。
            </p>
            <div className="intro-final-cta">
              <HeroFormCta />
            </div>
          </div>
        </section>

      </main>

      <GlobalFooter />
      <IntroductionStickyCta />
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
          top: 32vw;
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
          min-height: 152vw;
          margin: 0 auto;
          padding: 8.8vw 5.1vw 2vw;
        }

        .testlp-hero__copy {
          max-width: 74vw;
        }

        .testlp-hero__satisfaction {
          position: relative;
          width: min(100%, 720px);
          overflow: hidden;
          border: 2px solid #1656ad;
          border-radius: 18px;
          background: linear-gradient(135deg, #f7fbff 0%, #ffffff 72%, #edf5ff 100%);
          padding: 16px 24px 18px;
          color: #0b438e;
          box-shadow: 0 12px 28px rgba(18, 79, 166, 0.14);
        }

        .testlp-hero__satisfaction::after {
          position: absolute;
          right: -4px;
          bottom: -38px;
          width: 45%;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(47, 123, 218, 0.16) 0%, rgba(47, 123, 218, 0) 70%);
          content: "";
          pointer-events: none;
        }

        .testlp-hero__satisfaction-top {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 3px dotted #afccec;
          padding-bottom: 10px;
          font-weight: 700;
          line-height: 1.35;
        }

        .testlp-hero__satisfaction-icon {
          display: flex;
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #e7f0ff;
          color: #125fc2;
        }
        .testlp-hero__satisfaction-icon svg { width: 20px; height: 20px; }

        .testlp-hero__satisfaction-main {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          padding-top: 9px;
        }

        .testlp-hero__satisfaction-label {
          font-family: "Noto Serif JP", serif;
          font-size: clamp(1.7rem, 3.4vw, 3.45rem);
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }

        .testlp-hero__satisfaction strong {
          color: #125fc2;
          font-family: "Noto Serif JP", serif;
          font-size: clamp(3.7rem, 8vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.07em;
          line-height: 0.78;
        }

        .testlp-hero__satisfaction strong span {
          margin-left: 1px;
          font-size: 0.65em;
        }

        .testlp-hero__badge {
          display: none;
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
          margin: 0;
          color: #061d47;
          font-family: "Noto Serif JP", serif;
          font-size: clamp(1.58rem, 6.9vw, 1.9rem);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.52;
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

        .testlp-hero__features {
          display: grid;
          grid-template-columns: max-content;
          gap: 2vw;
          margin: 13.3vw 0 0;
          padding: 0;
          list-style: none;
        }

        .testlp-hero__feature {
          display: inline-flex;
          align-items: center;
          gap: 2.1vw;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          padding: 2vw 3.2vw 2vw 2.3vw;
          color: #10284d;
          font-size: clamp(0.7rem, 3.05vw, 0.88rem);
          font-weight: 800;
          line-height: 1.35;
          box-shadow: 0 4px 14px rgba(23, 69, 120, 0.08);
          box-sizing: border-box;
          white-space: nowrap;
        }

        .testlp-hero__feature-icon {
          width: 5.5vw;
          height: 5.5vw;
          flex: 0 0 auto;
          color: #1262c7;
        }

        .testlp-hero__feature-emphasis {
          color: #1262c7;
          font-weight: 900;
        }

        .testlp-hero__mobile-ctas {
          display: flex;
          flex-direction: column;
          gap: 2.7vw;
          width: min(89.8vw, 560px);
          margin-top: 5.6vw;
        }

        .testlp-phone-cta,
        .testlp-form-cta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
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
          display: grid;
          grid-template-columns: 9.9vw minmax(0, 1fr) auto;
          align-items: center;
          justify-content: center;
          gap: 2.4vw;
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

        .testlp-phone-cta__tap {
          display: flex;
          min-width: 12.5vw;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          flex-direction: column;
          gap: 0.7vw;
          padding-left: 1.4vw;
          color: #0b4b91;
          font-size: clamp(0.46rem, 2vw, 0.6rem);
          font-weight: 900;
          line-height: 1.3;
          white-space: nowrap;
        }

        @media (max-width: 767px) {
          .testlp-phone-cta__tap {
            transform: translateX(-5.5vw);
          }
        }

        .testlp-phone-cta__tap-icon {
          width: 5.8vw;
          height: 5.8vw;
          color: #1556b7;
        }

        .testlp-phone-cta__label {
          margin: 0 0 1.1vw;
          color: #0b4b91;
          font-size: clamp(0.64rem, 2.6vw, 0.78rem);
          font-weight: 900;
          line-height: 1.2;
          white-space: nowrap;
        }

        .testlp-phone-cta__number {
          margin: 0;
          color: #0b4b91;
          font-size: clamp(1.15rem, 5.8vw, 1.45rem);
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
          font-size: clamp(0.66rem, 3.05vw, 0.82rem);
          font-weight: 800;
          line-height: 1.25;
        }

        .testlp-form-cta__title {
          margin: 0;
          font-size: clamp(1.08rem, 5.35vw, 1.3rem);
          font-weight: 900;
          line-height: 1.18;
          white-space: nowrap;
        }

        .testlp-form-cta__note {
          margin: 0.5vw 0 0;
          font-size: clamp(0.5rem, 2.1vw, 0.66rem);
          font-weight: 800;
          line-height: 1.2;
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
        }

        @media (min-width: 768px) {
          .testlp-hero__features {
            display: none;
          }

          .testlp-phone-cta__main {
            display: flex;
          }

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
            color: #181818;
            font-size: 1.45rem;
            font-weight: 600;
            line-height: 1.75;
          }

          .testlp-hero__features {
            gap: 12px;
            margin-top: 40px;
          }

          .testlp-hero__feature {
            gap: 12px;
            padding: 12px 20px 12px 16px;
            font-size: 1.15rem;
          }

          .testlp-hero__feature-icon {
            width: 28px;
            height: 28px;
          }

          .testlp-hero__mobile-ctas {
            display: none;
          }

          .testlp-phone-cta__tap {
            display: none;
          }

          .testlp-hero__trust {
            position: absolute;
            left: 24px;
            bottom: 80px;
            width: 440px;
            margin-top: 0;
            text-align: center;
          }

          .testlp-trust__label {
            margin: 0 0 6px;
            color: #111827;
            font-size: 1.125rem;
            font-weight: 800;
            line-height: 1.35;
          }

          .testlp-trust__line {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 18px;
          }

          .testlp-trust__chevron {
            color: #1a50a8;
            font-size: 2.5rem;
            font-weight: 900;
            line-height: 1;
          }

          .testlp-trust__count {
            margin: 0;
            color: #050505;
            font-size: 2rem;
            font-weight: 900;
            line-height: 1;
            white-space: nowrap;
          }

          .testlp-trust__count span {
            color: #1a50a8;
          }

          .testlp-trust__note {
            margin: 6px 0 0;
            color: #8a8a8a;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.3;
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

        /* Introduction LP redesign */
        .testlp-hero__desktop-ctas {
          display: none;
        }

        .intro-concern {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          border: 1px solid #d8e5f5;
          border-radius: 18px;
          background: #fff;
          padding: 18px;
          box-shadow: 0 8px 22px rgba(21, 76, 143, 0.06);
        }

        .intro-concern__icon {
          display: flex;
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
        }

        .intro-concern--blue .intro-concern__icon { background: #e7f0ff; color: #1a50a8; }
        .intro-concern--orange .intro-concern__icon { background: #fff0df; color: #f97316; }
        .intro-concern--teal .intro-concern__icon { background: #e6f8f7; color: #0f9a98; }
        .intro-concern--purple .intro-concern__icon { background: #f0edff; color: #7158c7; }

        .intro-reassurance {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          align-items: center;
          border: 2px solid #1a50a8;
          border-radius: 14px;
          background: #fff;
          padding: 18px;
        }

        .intro-reassurance__heading {
          margin: 0;
          color: #0f3471;
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.35;
        }

        .intro-reassurance__list {
          display: grid;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .intro-reassurance__list li {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #173a70;
          font-size: 0.84rem;
          font-weight: 700;
        }

        .intro-reassurance__list svg { width: 18px; height: 18px; flex: 0 0 auto; color: #1a50a8; }

        .intro-reassurance__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 9px;
          background: linear-gradient(135deg, #ff9f1c, #f85618);
          padding: 13px 16px;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 800;
          text-decoration: none;
        }

        .intro-reassurance__cta svg { width: 18px; height: 18px; }

        .intro-finder {
          display: grid;
          gap: 12px;
          align-items: center;
          border: 1px solid #c9dced;
          border-radius: 10px;
          background: #fff;
          padding: 12px;
        }

        .intro-finder__label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0f3978;
          font-size: 0.88rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .intro-finder__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .intro-finder__chips span {
          min-width: 66px;
          border: 1px solid #dbe7f4;
          border-radius: 8px;
          background: #f9fcff;
          padding: 7px 10px;
          color: #153768;
          font-size: 0.78rem;
          font-weight: 700;
          text-align: center;
        }

        .intro-finder--teal { border-color: #a9dcd9; }
        .intro-finder--teal .intro-finder__label { color: #087d7b; }
        .intro-finder--teal .intro-finder__chips span { border-color: #c8e8e6; background: #f5fdfc; }
        .intro-finder--orange { border-color: #f7c58d; }
        .intro-finder--orange .intro-finder__label { color: #d85c0d; }
        .intro-finder--orange .intro-finder__chips span { border-color: #fde0c0; background: #fffaf5; color: #b94a06; }

        .intro-flow-card {
          position: relative;
          border: 1px solid #dce7f2;
          border-radius: 14px;
          background: #fff;
          padding: 20px 16px 16px;
          text-align: center;
          box-shadow: 0 6px 16px rgba(21, 76, 143, 0.05);
        }

        .intro-flow-card__number {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          width: 26px;
          height: 26px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #114b9e;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .intro-flow-card__icon {
          display: flex;
          justify-content: center;
          margin: 12px 0 10px;
          color: #1a50a8;
        }

        .intro-flow-card h3 { margin: 0; color: #12376f; font-size: 0.92rem; font-weight: 800; }
        .intro-flow-card p { margin: 8px 0 0; color: #58708f; font-size: 0.76rem; font-weight: 600; line-height: 1.55; }

        @media (min-width: 640px) {
          .intro-reassurance {
            grid-template-columns: 145px minmax(0, 1fr) auto;
            gap: 22px;
            padding: 14px 18px;
          }

          .intro-reassurance__list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .intro-reassurance__cta { white-space: nowrap; }

          .intro-finder {
            grid-template-columns: 138px minmax(0, 1fr);
            padding: 12px 16px;
          }
        }

        @media (min-width: 768px) {
          .testlp-hero__inner {
            min-height: 650px;
            padding-top: 96px;
            padding-bottom: 36px;
          }

          .testlp-hero__copy { max-width: 58%; }

          .testlp-hero__image {
            top: 38px;
            right: clamp(-42px, 2vw, 28px);
            bottom: auto;
            left: auto;
            width: auto;
            height: calc(100% - 38px);
            max-width: 48%;
            object-fit: contain;
            object-position: right bottom;
          }

          .testlp-hero__lead {
            max-width: none;
            margin-top: 22px;
            font-size: 1.1rem;
            line-height: 1.7;
          }

          .testlp-hero__features {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            width: min(100%, 540px);
            margin-top: 22px;
          }

          .testlp-hero__feature {
            justify-content: center;
            gap: 7px;
            border: 1px solid #d9e6f4;
            border-radius: 9px;
            padding: 9px 10px;
            font-size: 0.78rem;
            text-align: center;
            white-space: normal;
          }

          .testlp-hero__feature-icon { width: 20px; height: 20px; }

          .testlp-hero__desktop-ctas {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 14px;
            width: min(100%, 650px);
            margin-top: 22px;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta,
          .testlp-hero__desktop-ctas .testlp-form-cta {
            min-height: 108px;
            border-radius: 10px;
            padding: 14px 16px;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta__icon { width: 46px; height: 46px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__icon-svg { width: 25px; height: 25px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__label { margin-bottom: 4px; font-size: 0.68rem; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__number { font-size: 1.7rem; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours { margin-top: 8px; padding-top: 7px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours p { font-size: 0.66rem; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__check { width: 14px; height: 14px; }

          .testlp-hero__desktop-ctas .testlp-form-cta__main { grid-template-columns: 48px minmax(0, 1fr) 32px; gap: 8px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__free { width: 44px; height: 44px; border-width: 2px; font-size: 0.78rem; }
          .testlp-hero__desktop-ctas .testlp-form-cta__label { margin-bottom: 3px; font-size: 0.68rem; }
          .testlp-hero__desktop-ctas .testlp-form-cta__title { font-size: 1.45rem; }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow { width: 32px; height: 32px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow-svg { width: 17px; height: 17px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__sub { margin-top: 8px; border-radius: 5px; padding: 5px 7px; font-size: 0.58rem; }
          .testlp-hero__desktop-ctas .testlp-form-cta__monitor { width: 14px; height: 14px; }
        }

        @media (max-width: 767px) {
          .testlp-hero__image {
            top: 25vw;
            right: -17vw;
            width: 127vw;
            height: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }

          .testlp-hero__inner { min-height: 168vw; }
        }

        /* ── Refined LP design from approved section comps ── */
        .intro-section-heading {
          position: relative;
          margin: 0;
          padding-bottom: 20px;
          color: #082d70;
          font-size: clamp(1.75rem, 3.2vw, 3.35rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 1.25;
          text-align: center;
        }

        .intro-section-heading::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 54px;
          height: 4px;
          border-radius: 9999px;
          background: #1457c5;
          content: "";
          transform: translateX(-50%);
        }

        .intro-section-lead {
          margin: 16px 0 28px;
          color: #263958;
          font-size: clamp(0.94rem, 1.35vw, 1.22rem);
          font-weight: 600;
          text-align: center;
        }

        .intro-concerns-section,
        .intro-finder-section {
          background: radial-gradient(circle at 50% 0%, #fff 0%, #f7fbff 58%, #eaf4ff 100%);
          padding: clamp(38px, 5.5vw, 86px) 0;
        }

        .intro-concerns,
        .intro-value-section__inner,
        .intro-flow-section__inner {
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 32px rgba(21, 70, 142, 0.11);
        }

        .intro-concerns {
          padding: clamp(32px, 4.7vw, 70px) clamp(16px, 4vw, 78px);
        }

        .intro-concerns__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-areas:
            "one two"
            "three four";
          gap: 16px;
          max-width: 1480px;
          margin: 0 auto;
        }

        .intro-concern {
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 150px;
          border: 1.5px solid #9fc1fb;
          border-radius: 22px;
          background: #fff;
          padding: 20px 24px;
          box-shadow: 0 8px 18px rgba(38, 83, 151, 0.08);
        }

        .intro-concern:nth-child(1) { grid-area: one; }
        .intro-concern:nth-child(2) { grid-area: two; }
        .intro-concern:nth-child(3) { grid-area: three; }
        .intro-concern:nth-child(4) { grid-area: four; }

        .intro-concern__icon {
          display: flex;
          width: 78px;
          height: 78px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
        }

        .intro-concern h3 {
          margin: 0;
          color: #0749b3;
          font-size: clamp(1.02rem, 1.85vw, 1.65rem);
          font-weight: 900;
          line-height: 1.35;
        }

        .intro-concern p {
          margin: 10px 0 0;
          color: #102755;
          font-size: clamp(0.82rem, 1.25vw, 1.08rem);
          font-weight: 600;
          line-height: 1.65;
          white-space: pre-line;
        }

        .intro-concern--blue .intro-concern__icon { background: #edf5ff; color: #0750bd; }
        .intro-concern--orange { border-color: #ffad70; }
        .intro-concern--orange .intro-concern__icon { background: #fff2e7; color: #ff6900; }
        .intro-concern--orange h3 { color: #f15d00; }
        .intro-concern--teal { border-color: #80d2d5; }
        .intro-concern--teal .intro-concern__icon { background: #e8fafa; color: #009ca4; }
        .intro-concern--teal h3 { color: #008b92; }
        .intro-concern--purple { border-color: #c3b0f1; }
        .intro-concern--purple .intro-concern__icon { background: #f2efff; color: #6342c2; }
        .intro-concern--purple h3 { color: #6742bf; }

        .intro-concerns__center { display: none; }

        .intro-concerns__cta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          max-width: 1080px;
          margin: 28px auto 0;
          overflow: hidden;
          border: 1px solid #d3e1f4;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 8px 20px rgba(33, 78, 148, 0.1);
        }

        .intro-concerns__cta .testlp-phone-cta,
        .intro-concerns__cta .testlp-form-cta {
          min-height: 110px;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }

        .intro-concerns__cta .testlp-form-cta { border-right: 1px solid #dbe7f5; }
        .intro-concerns__cta .testlp-phone-cta__main { display: flex; gap: 14px; }
        .intro-concerns__cta .testlp-phone-cta__icon { width: 54px; height: 54px; }
        .intro-concerns__cta .testlp-phone-cta__icon-svg { width: 28px; height: 28px; }
        .intro-concerns__cta .testlp-phone-cta__label { margin-bottom: 4px; font-size: 0.78rem; }
        .intro-concerns__cta .testlp-phone-cta__number { font-size: clamp(1.35rem, 3vw, 2.25rem); }
        .intro-concerns__cta .testlp-phone-cta__hours { display: none; }
        .intro-concerns__cta .testlp-form-cta { padding: 15px 20px; }
        .intro-concerns__cta .testlp-form-cta__main { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .intro-concerns__cta .testlp-form-cta__free { width: 58px; height: 58px; flex: 0 0 auto; border-width: 0; font-size: 0; }
        .intro-concerns__cta .testlp-form-cta__free svg { width: 31px; height: 31px; }
        .intro-concerns__cta .testlp-form-cta__label { display: none; }
        .intro-concerns__cta .testlp-form-cta__body { flex: 0 1 auto; min-width: 0; }
        .intro-concerns__cta .testlp-form-cta__title { font-size: clamp(1.25rem, 2.25vw, 1.85rem); }
        .intro-concerns__cta .testlp-form-cta__arrow { position: static; width: 34px; height: 34px; flex: 0 0 auto; }
        .intro-concerns__cta .testlp-form-cta__arrow-svg { width: 20px; height: 20px; }
        .intro-concerns__cta .testlp-form-cta__sub { margin-top: 5px; background: transparent; padding: 0; color: #fff; font-size: 0.72rem; }
        .intro-concerns__cta .testlp-form-cta__monitor { display: none; }
        .intro-final-cta { width: min(100%, 460px); justify-content: center; }

        .intro-value-section {
          padding: clamp(38px, 5.5vw, 86px) 0;
          background: linear-gradient(150deg, #eff7ff, #fafdff 56%, #e8f3ff);
        }

        .intro-value-section__inner { padding: clamp(30px, 4.4vw, 68px) clamp(16px, 3vw, 62px) clamp(20px, 2.8vw, 44px); }

        .intro-merits {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .intro-merit {
          min-height: 290px;
          border: 1px solid #e2eaf4;
          border-radius: 18px;
          background: #fff;
          padding: 30px 20px;
          box-shadow: 0 8px 18px rgba(43, 79, 128, 0.09);
          text-align: center;
        }

        .intro-merit__number { display: none; }
        .intro-merit__icon {
          display: flex;
          width: 96px;
          height: 96px;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
          border-radius: 9999px;
          background: #f0f6ff;
          color: #0649b2;
        }

        .intro-merit h3 { margin: 0; color: #0c3d92; font-size: clamp(1rem, 1.55vw, 1.45rem); font-weight: 900; }
        .intro-merit p { margin: 16px 0 0; color: #102858; font-size: clamp(0.8rem, 1.1vw, 1rem); font-weight: 600; line-height: 1.65; }
        .intro-merit__sp-break { display: none; }

        .intro-reassurance {
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          margin-top: 30px;
          border: 2px solid #0c52c6;
          border-radius: 14px;
          background: #fff;
          padding: 22px 28px;
        }

        .intro-reassurance__heading { margin: 0; border-right: 1px solid #a6c5ed; color: #06439d; font-size: clamp(1rem, 1.45vw, 1.5rem); font-weight: 900; line-height: 1.35; white-space: nowrap; }
        .intro-reassurance__list { display: grid; grid-template-columns: repeat(3, max-content); justify-content: center; gap: 10px clamp(44px, 4vw, 76px); margin: 0; padding: 0; list-style: none; }
        .intro-reassurance__list li { display: flex; align-items: flex-start; gap: 10px; color: #0d3e92; }
        .intro-reassurance__list li > svg { width: 38px; height: 38px; flex: 0 0 auto; color: #0c52c6; }
        .intro-reassurance__list strong, .intro-reassurance__list small { display: block; }
        .intro-reassurance__list strong { font-size: clamp(0.8rem, 1.2vw, 1.08rem); font-weight: 900; line-height: 1.35; }
        .intro-reassurance__list small { margin-top: 5px; color: #18305a; font-size: 0.73rem; font-weight: 600; line-height: 1.45; }
        .intro-reassurance__cta { display: inline-flex; align-items: center; justify-content: center; min-width: 340px; gap: 10px; min-height: 72px; border-radius: 10px; background: linear-gradient(135deg, #ff8319, #ff5d07); padding: 0 22px; color: #fff; font-size: clamp(0.95rem, 1.45vw, 1.3rem); font-weight: 900; text-decoration: none; white-space: nowrap; box-shadow: 0 6px 14px rgba(240, 96, 10, 0.22); }
        .intro-reassurance__cta svg { width: 26px; height: 26px; }

        .intro-finder-section { padding-top: clamp(36px, 5vw, 76px); }
        .intro-finder__rows { display: grid; gap: 16px; max-width: 1680px; margin: 32px auto 0; }
        .intro-finder { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 20px; align-items: center; min-height: 112px; border: 1.5px solid #9bbcf0; border-radius: 12px; background: rgba(255,255,255,0.72); padding: 14px 32px; }
        .intro-finder__label { display: flex; align-items: center; gap: 16px; color: #1151ba; font-size: clamp(1.05rem, 1.8vw, 1.6rem); font-weight: 900; white-space: nowrap; }
        .intro-finder__label svg { width: 52px; height: 52px; border-radius: 9999px; background: #fff; padding: 14px; box-shadow: 0 5px 14px rgba(48, 92, 151, 0.12); }
        .intro-finder__chips { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
        .intro-finder__chips span { min-width: 0; border: 0; border-radius: 14px; background: #fff; padding: 17px 8px; color: #0a397d; font-size: clamp(0.86rem, 1.45vw, 1.34rem); font-weight: 900; box-shadow: 0 6px 14px rgba(47, 82, 132, 0.11); }
        .intro-finder--teal { border-color: #75c9cb; }
        .intro-finder--teal .intro-finder__label { color: #048d92; }
        .intro-finder--teal .intro-finder__chips span { border: 0; background: #fff; color: #07878b; }
        .intro-finder--orange { border-color: #ffb16c; }
        .intro-finder--orange .intro-finder__label { color: #f36805; }
        .intro-finder--orange .intro-finder__chips span { border: 0; background: #fff; color: #ec6505; }

        .intro-flow-section { padding: clamp(38px, 5.5vw, 84px) 0; background: linear-gradient(150deg, #edf6ff, #fbfdff 55%, #e8f4ff); }
        .intro-flow-section__inner { padding: clamp(30px, 4vw, 60px) clamp(16px, 3vw, 52px); }
        .intro-flow { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 42px; margin-top: 34px; }
        .intro-flow-card { position: relative; min-height: 245px; border: 1px solid #e0e9f4; border-radius: 18px; background: #fff; padding: 26px 14px 20px; box-shadow: 0 8px 18px rgba(32, 80, 151, 0.08); text-align: center; }
        .intro-flow-card:not(:last-child)::after { position: absolute; top: 42%; right: -39px; z-index: 2; color: #8ab9ff; content: "➜"; font-size: 2.75rem; font-weight: 900; line-height: 1; }
        .intro-flow-card__number { position: absolute; top: 18px; left: 18px; width: 42px; height: 42px; background: #0b4ab7; font-size: 0.95rem; }
        .intro-flow-card__icon { margin: 18px 0 16px; color: #0750c1; }
        .intro-flow-card h3 { color: #074298; font-size: clamp(0.9rem, 1.35vw, 1.2rem); font-weight: 900; line-height: 1.4; }
        .intro-flow-card p { color: #17315c; font-size: clamp(0.73rem, 1vw, 0.9rem); font-weight: 600; line-height: 1.55; }
        .intro-flow-highlight { display: flex; align-items: center; gap: 28px; margin-top: 34px; border: 2px solid #1457c5; border-radius: 20px; background: #f8fbff; padding: 24px 50px; }
        .intro-flow-highlight > svg { width: 108px; height: 108px; flex: 0 0 auto; color: #0c54c7; }
        .intro-flow-highlight h3 { margin: 0; color: #0648b2; font-size: clamp(1.25rem, 2.3vw, 2rem); font-weight: 900; line-height: 1.4; }
        .intro-flow-highlight__marker { background: none; }
        .intro-flow-highlight__sp-break { display: none; }
        .intro-flow-highlight h3::first-letter { text-decoration: underline 0.32em #ffde31; text-underline-offset: -0.14em; }
        .intro-flow-highlight p { margin: 12px 0 0; color: #1f3358; font-size: clamp(0.84rem, 1.25vw, 1.05rem); font-weight: 600; line-height: 1.65; }
        .intro-flow__cta { max-width: none; margin-top: 28px; }

        @media (min-width: 768px) {
          .intro-flow-highlight { position: relative; justify-content: center; }
          .intro-flow-highlight > svg { position: absolute; left: clamp(24px, 3vw, 50px); }
          .intro-flow-highlight > div { text-align: center; }
        }

        .testlp-hero { background: linear-gradient(105deg, #f8fbff 0%, #fff 55%, #e9f3ff 100%); }
        .testlp-hero__wash { background: linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 51%, rgba(255,255,255,0.18) 72%, rgba(255,255,255,0.02) 100%); }
        .testlp-hero__top-fade { display: none; }
        .testlp-hero__ring { display: none !important; }
        .testlp-hero__copy { position: relative; z-index: 2; }
        .testlp-hero__desktop-ctas { position: relative; z-index: 3; }

        @media (min-width: 768px) {
          .testlp-hero__inner { min-height: 780px; max-width: 1920px; padding: 64px clamp(42px, 5vw, 90px) 40px; }
          .testlp-hero__copy { max-width: 61%; }
          .testlp-hero__badge { padding: 13px 30px; font-size: 1.15rem; }
          .testlp-hero__title { margin-top: 26px; font-size: clamp(3.1rem, 4.4vw, 4.65rem); line-height: 1.33; }
          .testlp-hero__lead { margin-top: 20px; color: #14294d; font-size: clamp(1rem, 1.5vw, 1.32rem); line-height: 1.75; }
          .testlp-hero__image { top: 28px; right: clamp(20px, 6vw, 136px); width: auto; height: calc(100% - 28px); max-width: none; object-fit: contain; object-position: right bottom; }
          .testlp-hero__features { width: min(100%, 920px); margin-top: 28px; }
          .testlp-hero__feature { min-height: 100px; gap: 16px; padding: 14px 20px; font-size: clamp(0.8rem, 1.25vw, 1.14rem); }
          .testlp-hero__feature-icon { width: 50px; height: 50px; }
          .testlp-hero__feature-map { width: 62px; height: 50px; object-fit: contain; }
          .testlp-hero__desktop-ctas { width: min(100%, 1200px); margin-top: 34px; gap: 20px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta, .testlp-hero__desktop-ctas .testlp-form-cta { min-height: 170px; padding: 22px 28px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__icon { width: 88px; height: 88px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__icon-svg { width: 45px; height: 45px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__label { font-size: 1rem; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__number { font-size: clamp(1.55rem, 2.4vw, 3.45rem); }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours { display: block; margin-top: 14px; padding-top: 12px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours p { font-size: 0.9rem; }
          .testlp-hero__desktop-ctas .testlp-form-cta__main { grid-template-columns: 90px minmax(0, 1fr) 46px; gap: 18px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__free { width: 82px; height: 82px; border: 0; font-size: 0; }
          .testlp-hero__desktop-ctas .testlp-form-cta__free svg { width: 44px; height: 44px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__label { display: none; }
          .testlp-hero__desktop-ctas .testlp-form-cta__title { font-size: clamp(1.25rem, 2vw, 3rem); }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow { width: 46px; height: 46px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow-svg { width: 27px; height: 27px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__sub { margin-top: 16px; padding: 9px 12px; font-size: 0.82rem; }

          .intro-concerns__grid { grid-template-columns: minmax(0, 1fr) 340px minmax(0, 1fr); grid-template-areas: "one center two" "three center four"; gap: 28px 52px; }
          .intro-concerns__center { position: relative; display: flex; grid-area: center; align-items: center; justify-content: center; min-height: 320px; border-radius: 9999px; background: #f0f6ff; color: #0c54c7; }
          .intro-concerns__center::before, .intro-concerns__center::after { position: absolute; top: 50%; width: 58px; border-top: 5px dotted #75a8f2; content: ""; }
          .intro-concerns__center::before { right: calc(100% + 5px); }
          .intro-concerns__center::after { left: calc(100% + 5px); border-color: #ffad70; }
          .intro-concerns__center svg { width: 175px; height: 175px; stroke-width: 1.7; }
        }

        @media (max-width: 1199px) {
          .intro-merits { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .intro-reassurance { grid-template-columns: 180px minmax(0, 1fr); }
          .intro-reassurance__cta { grid-column: 1 / -1; }
          .intro-flow { gap: 18px; }
          .intro-flow-card:not(:last-child)::after { right: -22px; font-size: 1.9rem; }
        }

        @media (max-width: 767px) {
          .intro-concerns, .intro-value-section__inner, .intro-flow-section__inner { border-radius: 16px; }
          .intro-concern { min-height: 0; padding: 16px; }
          .intro-concern__icon { width: 56px; height: 56px; }
          .intro-concern__icon svg { width: 32px; height: 32px; }
          .intro-concerns__cta { grid-template-columns: 1fr; }
          .intro-concerns__cta .testlp-form-cta { border-right: 0; border-bottom: 1px solid #dbe7f5; }
          .intro-merits { grid-template-columns: 1fr; gap: 14px; }
          .intro-merit { min-height: 0; padding: 20px; }
          .intro-merit__icon { width: 68px; height: 68px; margin-bottom: 14px; }
          .intro-reassurance { grid-template-columns: 1fr; padding: 20px; }
          .intro-reassurance__heading { border-right: 0; border-bottom: 1px solid #a6c5ed; padding-bottom: 12px; }
          .intro-reassurance__list { grid-template-columns: 1fr; }
          .intro-finder { grid-template-columns: 1fr; padding: 16px; }
          .intro-finder__chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .intro-flow { grid-template-columns: 1fr; gap: 12px; }
          .intro-flow-card { min-height: 0; padding: 20px; }
          .intro-flow-card:not(:last-child)::after { display: none; }
          .intro-flow-highlight { align-items: flex-start; justify-content: flex-start; gap: 14px; padding: 20px; }
          .intro-flow-highlight > svg { position: static; width: 60px; height: 60px; }
          .intro-flow-highlight > div { text-align: left; }
          .testlp-hero__feature-map { width: 38px; height: 32px; object-fit: contain; }
        }

        /* 13インチ級ノートPCでも、1セクションを一画面で把握しやすい密度にする */
        @media (min-width: 768px) {
          .testlp-hero__inner {
            min-height: 650px;
            padding-top: 46px;
            padding-bottom: 26px;
          }

          .testlp-hero__title {
            margin-top: 18px;
            font-size: clamp(2.35rem, 3.45vw, 3.8rem);
          }

          .testlp-hero__lead {
            margin-top: 14px;
            font-size: clamp(0.92rem, 1.18vw, 1.1rem);
          }

          .testlp-hero__image {
            top: 20px;
            height: calc(100% - 20px);
          }

          .testlp-hero__features {
            margin-top: 18px;
            width: min(100%, 720px);
          }

          .testlp-hero__feature {
            min-height: 74px;
            gap: 10px;
            padding: 9px 12px;
            font-size: clamp(0.7rem, 0.95vw, 0.88rem);
          }

          .testlp-hero__feature-icon { width: 37px; height: 37px; }
          .testlp-hero__feature-map { width: 48px; height: 37px; }

          .testlp-hero__desktop-ctas {
            width: min(100%, 900px);
            margin-top: 18px;
            gap: 14px;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta,
          .testlp-hero__desktop-ctas .testlp-form-cta {
            min-height: 112px;
            padding: 13px 17px;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta__main {
            display: grid;
            grid-template-columns: 50px minmax(0, 1fr);
            gap: 10px;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta__body {
            min-width: 0;
            overflow: hidden;
          }

          .testlp-hero__desktop-ctas .testlp-phone-cta__icon { width: 50px; height: 50px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__icon-svg { width: 27px; height: 27px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__label { overflow: hidden; font-size: clamp(0.58rem, 0.76vw, 0.73rem); text-overflow: ellipsis; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__number { font-size: clamp(1.35rem, 2.05vw, 2.15rem); }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours { margin-top: 6px; padding-top: 6px; }
          .testlp-hero__desktop-ctas .testlp-phone-cta__hours p { font-size: 0.62rem; }

          .testlp-hero__desktop-ctas .testlp-form-cta__main { grid-template-columns: 52px minmax(0, 1fr) 32px; gap: 9px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__free { width: 50px; height: 50px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__free svg { width: 27px; height: 27px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__title { font-size: clamp(1.15rem, 1.7vw, 1.65rem); }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow { width: 32px; height: 32px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__arrow-svg { width: 18px; height: 18px; }
          .testlp-hero__desktop-ctas .testlp-form-cta__sub { margin-top: 6px; padding: 4px 6px; font-size: 0.56rem; }

          .intro-concerns-section,
          .intro-finder-section,
          .intro-value-section,
          .intro-flow-section { padding: 42px 0; }

          .intro-concerns { padding: 38px clamp(24px, 3vw, 48px); }
          .intro-section-heading { padding-bottom: 13px; font-size: clamp(1.55rem, 2.5vw, 2.65rem); }
          .intro-section-heading::after { width: 42px; height: 3px; }
          .intro-section-lead { margin: 11px 0 20px; font-size: 0.9rem; }
          .intro-concerns__grid { grid-template-columns: minmax(0, 1fr) 250px minmax(0, 1fr); gap: 18px 34px; }
          .intro-concerns__center { min-height: 238px; }
          .intro-concerns__center svg { width: 126px; height: 126px; }
          .intro-concerns__center::before, .intro-concerns__center::after { width: 38px; border-top-width: 4px; }
          .intro-concern { min-height: 110px; gap: 12px; border-radius: 16px; padding: 14px 16px; }
          .intro-concern__icon { width: 56px; height: 56px; }
          .intro-concern__icon svg { width: 33px; height: 33px; }
          .intro-concern h3 { font-size: clamp(0.92rem, 1.35vw, 1.18rem); }
          .intro-concern p { margin-top: 5px; font-size: clamp(0.7rem, 0.95vw, 0.84rem); line-height: 1.45; }
          .intro-concerns__cta { max-width: 840px; margin-top: 18px; }
          .intro-concerns__cta .testlp-phone-cta, .intro-concerns__cta .testlp-form-cta { min-height: 82px; padding: 10px 14px; }
          .intro-concerns__cta .testlp-phone-cta__icon { width: 42px; height: 42px; }
          .intro-concerns__cta .testlp-phone-cta__icon-svg { width: 23px; height: 23px; }
          .intro-concerns__cta .testlp-phone-cta__label { font-size: 0.61rem; }
          .intro-concerns__cta .testlp-phone-cta__number { font-size: 1.55rem; }
          .intro-concerns__cta .testlp-form-cta__main { display: flex; align-items: center; justify-content: center; gap: 10px; }
          .intro-concerns__cta .testlp-form-cta__free { width: 42px; height: 42px; }
          .intro-concerns__cta .testlp-form-cta__free svg { width: 24px; height: 24px; }
          .intro-concerns__cta .testlp-form-cta__body { flex: 0 1 auto; min-width: 0; }
          .intro-concerns__cta .testlp-form-cta__title { font-size: 1.3rem; }
          .intro-concerns__cta .testlp-form-cta__arrow { position: static; flex: 0 0 auto; }

          .intro-value-section__inner { padding: 34px clamp(24px, 3vw, 48px) 24px; }
          .intro-merits { gap: 15px; margin-top: 22px; }
          .intro-merit { min-height: 205px; border-radius: 13px; padding: 19px 13px; }
          .intro-merit__icon { width: 68px; height: 68px; margin-bottom: 13px; }
          .intro-merit__icon svg { width: 32px; height: 32px; }
          .intro-merit h3 { font-size: clamp(0.86rem, 1.2vw, 1.08rem); }
          .intro-merit p { margin-top: 9px; font-size: clamp(0.66rem, 0.86vw, 0.8rem); line-height: 1.48; }
          .intro-reassurance { grid-template-columns: 205px minmax(0, 1fr) auto; gap: 14px; margin-top: 18px; padding: 13px 16px; }
          .intro-reassurance__heading { font-size: 1rem; }
          .intro-reassurance__list { gap: 9px clamp(24px, 2.6vw, 40px); }
          .intro-reassurance__list li { gap: 5px; }
          .intro-reassurance__list li > svg { width: 26px; height: 26px; }
          .intro-reassurance__list strong { font-size: clamp(0.65rem, 0.87vw, 0.8rem); white-space: nowrap; }
          .intro-reassurance__list small { margin-top: 2px; font-size: 0.55rem; }
          .intro-reassurance__cta { min-height: 48px; gap: 6px; padding: 0 13px; font-size: 0.83rem; }
          .intro-reassurance__cta svg { width: 17px; height: 17px; }

          .intro-finder__rows { gap: 10px; margin-top: 20px; }
          .intro-finder { grid-template-columns: 220px minmax(0, 1fr); min-height: 72px; gap: 12px; border-radius: 9px; padding: 8px 14px; }
          .intro-finder__label { gap: 10px; font-size: clamp(0.86rem, 1.25vw, 1.12rem); }
          .intro-finder__label svg { width: 38px; height: 38px; padding: 9px; }
          .intro-finder__chips { gap: 8px; }
          .intro-finder__chips span { border-radius: 10px; padding: 9px 4px; font-size: clamp(0.68rem, 0.95vw, 0.88rem); }

          .intro-flow-section__inner { padding: 34px clamp(24px, 3vw, 48px); }
          .intro-flow { gap: 28px; margin-top: 22px; }
          .intro-flow-card { min-height: 168px; border-radius: 13px; padding: 16px 9px 12px; }
          .intro-flow-card:not(:last-child)::after { right: -27px; font-size: 2rem; }
          .intro-flow-card__number { top: 10px; left: 10px; width: 28px; height: 28px; font-size: 0.68rem; }
          .intro-flow-card__icon { margin: 12px 0 8px; }
          .intro-flow-card__icon svg { width: 30px; height: 30px; }
          .intro-flow-card h3 { font-size: clamp(0.72rem, 1vw, 0.92rem); }
          .intro-flow-card p { margin-top: 6px; font-size: clamp(0.59rem, 0.78vw, 0.7rem); line-height: 1.4; }
          .intro-flow-highlight { gap: 16px; margin-top: 20px; border-radius: 13px; padding: 15px 24px; }
          .intro-flow-highlight > svg { width: 70px; height: 70px; }
          .intro-flow-highlight h3 { font-size: clamp(1rem, 1.55vw, 1.4rem); }
          .intro-flow-highlight p { margin-top: 6px; font-size: clamp(0.7rem, 0.95vw, 0.85rem); line-height: 1.48; }
        }

        /* PC Hero: breadcrumb分の余白だけを確保し、CTA直下でHeroを終える */
        @media (min-width: 768px) {
          .testlp-hero__inner {
            min-height: 0;
            padding-top: 78px;
            padding-bottom: 0;
          }

          .testlp-hero__breadcrumb {
            left: clamp(32px, calc((100vw - 1440px) / 2 + 32px), 272px);
          }

          .testlp-hero__copy {
            max-width: 56%;
            transform: translateX(clamp(0px, calc((100vw - 1280px) / 2 - 76px), 244px));
          }

          .testlp-hero__desktop-ctas {
            margin-bottom: 0;
          }
        }

        @media (min-width: 1024px) {
          .testlp-hero__image {
            right: clamp(136px, 12.5vw, 236px);
          }

          .intro-value-title-break { display: none; }
          .intro-concerns-title-break { display: none; }

          .intro-reassurance__cta {
            min-height: 88px;
            gap: 12px;
            padding: 0 30px;
            font-size: clamp(1.05rem, 1.4vw, 1.28rem);
          }
          .intro-reassurance__cta svg { width: 28px; height: 28px; }
        }

        /* SP / tablet layout: the approved PC layout begins at 1024px. */
        @media (max-width: 1023px) {
          .testlp-hero {
            background: linear-gradient(160deg, #fff 0%, #f7fbff 68%, #eef6ff 100%);
          }

          .testlp-hero__inner {
            min-height: 0;
            padding: 12px 20px 28px;
          }

          .testlp-hero__mobile-breadcrumb { display: block !important; }
          .testlp-hero__breadcrumb { display: none !important; }
          .testlp-hero__desktop-ctas { display: none !important; }
          .testlp-hero__mobile-ctas { display: flex !important; }
          .testlp-hero__badge,
          .testlp-hero__lead { display: none !important; }

          .testlp-hero__mobile-breadcrumb {
            top: 0;
            margin: 0 0 20px;
          }

          .testlp-hero__copy {
            max-width: none;
            transform: none;
          }

          .testlp-hero__image {
            top: 120px;
            right: -20vw;
            bottom: auto;
            left: auto;
            width: 80vw;
            height: auto;
            max-width: none;
            opacity: 1;
            object-fit: contain;
            -webkit-mask-image: none;
            mask-image: none;
          }

          .testlp-hero__wash {
            display: none;
          }

          .testlp-hero__title {
            margin-top: 0;
            font-size: clamp(1.65rem, 6vw, 2.25rem);
            line-height: 1.38;
          }

          .testlp-hero__title-line { white-space: normal; }

          .testlp-hero__features {
            display: grid !important;
            gap: 12px;
            width: min(76vw, 300px);
            max-width: none;
            margin-top: 28px;
          }

          .testlp-hero__feature {
            width: 100%;
            gap: 10px;
            padding: 11px 14px;
            font-size: 0.86rem;
          }

          .testlp-hero__feature-icon { width: 26px; height: 26px; }
          .testlp-hero__feature-map { width: 31px; height: 26px; }

          .testlp-hero__mobile-ctas {
            width: 100%;
            margin-top: 26px;
            gap: 14px;
          }

          .testlp-phone-cta,
          .testlp-form-cta {
            height: auto;
            min-height: 112px;
            border-radius: 16px;
          }

          .testlp-phone-cta {
            padding: 16px 18px;
          }

          .testlp-phone-cta__main {
            display: grid !important;
            grid-template-columns: 60px minmax(0, 1fr);
            gap: 14px;
          }

          .testlp-phone-cta__tap { display: none !important; }
          .testlp-phone-cta__icon { width: 60px; height: 60px; }
          .testlp-phone-cta__icon-svg { width: 32px; height: 32px; }
          .testlp-phone-cta__label { margin-bottom: 4px; font-size: 0.82rem; }
          .testlp-phone-cta__number { font-size: clamp(1.55rem, 6.5vw, 2rem); }
          .testlp-phone-cta__hours { margin-top: 10px; padding-top: 9px; }
          .testlp-phone-cta__hours p { font-size: 0.78rem; }

          .testlp-form-cta { padding: 16px 18px; }
          .testlp-form-cta__main {
            grid-template-columns: 60px minmax(0, 1fr) 40px;
            gap: 10px;
          }
          .testlp-form-cta__free { width: 60px; height: 60px; }
          .testlp-form-cta__free svg { width: 32px; height: 32px; }
          .testlp-form-cta__title { font-size: clamp(1.4rem, 5.8vw, 1.8rem); }
          .testlp-form-cta__arrow { width: 40px; height: 40px; }
          .testlp-form-cta__arrow-svg { width: 22px; height: 22px; }
          .testlp-form-cta__sub { margin-top: 8px; font-size: 0.72rem; }

          .intro-concerns-section { padding: 32px 0; }
          .intro-concerns { padding: 30px 20px; }
          .intro-section-heading { font-size: 1.82rem; letter-spacing: 0.02em; }
          .intro-section-lead { margin: 14px 0 24px; font-size: 0.93rem; }

          .intro-concerns__grid {
            grid-template-columns: 1fr;
            grid-template-areas: "one" "two" "three" "four";
            gap: 14px;
          }

          .intro-concerns__center { display: none !important; }

          .intro-concern {
            min-height: 0;
            gap: 14px;
            border-radius: 16px;
            padding: 18px;
          }

          .intro-concern__icon { width: 60px; height: 60px; }
          .intro-concern__icon svg { width: 34px; height: 34px; }
          .intro-concern h3 { font-size: 1.12rem; }
          .intro-concern p { margin-top: 5px; font-size: 0.85rem; line-height: 1.55; }

          .intro-concerns__cta {
            grid-template-columns: 1fr;
            max-width: none;
            margin-top: 20px;
          }
          .intro-concerns__cta .testlp-phone-cta,
          .intro-concerns__cta .testlp-form-cta { min-height: 112px; }
          .intro-concerns__cta .testlp-form-cta {
            border-right: 0;
            border-bottom: 1px solid #dbe7f5;
          }
          .intro-concerns__cta .testlp-form-cta { padding: 15px 18px; }
          .intro-concerns__cta .testlp-form-cta__main { display: flex; align-items: center; justify-content: center; gap: 12px; }
          .intro-concerns__cta .testlp-form-cta__body { min-width: 0; flex: 0 1 auto; text-align: center; }
          .intro-concerns__cta .testlp-form-cta__title { font-size: clamp(1.05rem, 4.5vw, 1.3rem); }
          .intro-concerns__cta .testlp-form-cta__arrow { position: static; flex: 0 0 auto; }
          .intro-concerns__cta .testlp-form-cta__sub { margin-top: 7px; }

          .intro-reassurance {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 18px;
            padding: 24px 20px;
          }
          .intro-reassurance__heading {
            width: 100%;
            border-right: 0;
            border-bottom: 1px solid #a6c5ed;
            padding-bottom: 12px;
            text-align: center;
          }
          .intro-reassurance__list {
            grid-template-columns: max-content;
            justify-content: center;
            width: min(100%, 360px);
            gap: 18px;
          }
          .intro-reassurance__list li { justify-content: flex-start; }
          .intro-reassurance__cta {
            width: min(100%, 420px);
            min-width: 0;
            min-height: 84px;
            justify-self: center;
            gap: 12px;
            padding: 0 28px;
            font-size: 1.18rem;
          }
          .intro-reassurance__cta svg { width: 24px; height: 24px; }

          .intro-finder {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .intro-finder__label {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .intro-finder__chips { width: 100%; }

          .intro-merits {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 34px 18px;
            margin-top: 30px;
          }
          .intro-merit {
            min-height: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
          }
          .intro-merit__number { display: block; margin: 0 0 12px; color: #0875ca; font-size: 1.45rem; font-weight: 900; line-height: 1; }
          .intro-merit__icon { width: 94px; height: 94px; margin-bottom: 16px; background: #fff; color: #0875ca; box-shadow: 0 8px 18px rgba(43, 79, 128, 0.14); }
          .intro-merit__icon svg { width: 42px; height: 42px; }
          .intro-merit h3 { color: #1b2436; font-size: 1rem; line-height: 1.4; }
          .intro-merit p { margin-top: 9px; color: #607087; font-size: 0.78rem; line-height: 1.58; }
          .intro-merit__sp-break { display: initial; }

          .intro-flow-highlight__marker { background: linear-gradient(transparent 68%, #ffde31 68%); }
          .intro-flow-highlight__sp-break { display: block; }
          .intro-flow-highlight h3::first-letter { text-decoration: none; }

          .intro-flow-highlight {
            align-items: center;
            justify-content: flex-start;
          }
          .intro-flow-highlight > svg {
            position: static;
            align-self: center;
          }
        }

        .testlp-hero__start-panel { display: none; }

        .introduction-start-form {
          max-width: 780px;
          margin: 0 auto;
          border: 1px solid #dce8f7;
          border-radius: 12px;
          background: #fff;
          padding: 26px 32px 20px;
          box-shadow: 0 8px 24px rgba(20, 75, 150, 0.10);
        }

        .introduction-start-form__heading { text-align: center; }
        .introduction-start-form__heading h2 { margin: 0; color: #123c7d; font-size: 1.25rem; font-weight: 900; }
        .introduction-start-form__heading p { margin: 6px 0 18px; color: #58708f; font-size: 0.75rem; font-weight: 600; }
        .introduction-start-form__choices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 14px; }
        .introduction-start-form__choice,
        .introduction-start-form__next {
          display: flex;
          min-height: 40px;
          align-items: center;
          border-radius: 5px;
          font-size: 0.82rem;
          font-weight: 800;
          transition: 0.18s ease;
        }
        .introduction-start-form__choice {
          gap: 11px;
          border: 1.5px solid #72a3e2;
          background: linear-gradient(135deg, #fbfdff 0%, #eff7ff 100%);
          padding: 0 13px;
          color: #1353ad;
          text-align: left;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.82), 0 2px 5px rgba(24, 83, 157, 0.07);
        }
        .introduction-start-form__choice:hover,
        .introduction-start-form__choice.is-selected {
          border-color: #0767c5;
          background: linear-gradient(135deg, #dff2ff 0%, #cce8ff 100%);
          box-shadow: 0 4px 10px rgba(17, 102, 194, 0.17);
        }
        .introduction-start-form__choice > svg:first-child { width: 21px; height: 21px; flex: 0 0 auto; }
        .introduction-start-form__choice span { min-width: 0; flex: 1; }
        .introduction-start-form__choice-arrow { width: 16px; height: 16px; transform: rotate(-90deg); }
        .introduction-start-form__next {
          justify-content: center;
          gap: 12px;
          border: 0;
          background: linear-gradient(90deg, #8acbee, #6baeda);
          color: #fff;
        }
        .introduction-start-form__next:not(:disabled) {
          background: linear-gradient(90deg, #176fd2, #0758bb);
          box-shadow: 0 4px 10px rgba(7, 88, 187, 0.22);
        }
        .introduction-start-form__next:not(:disabled):hover { background: linear-gradient(90deg, #0f64c4, #064da7); }
        .introduction-start-form__next:disabled { cursor: not-allowed; opacity: 0.58; }
        .introduction-start-form__next svg { width: 18px; height: 18px; }
        .introduction-start-form__privacy { display: flex; align-items: center; justify-content: center; gap: 5px; margin: 15px 0 0; color: #2c4f7e; font-size: 0.7rem; font-weight: 700; }
        .introduction-start-form__privacy svg { width: 14px; height: 14px; }

        .introduction-start-form--section {
          max-width: 860px;
          padding: 44px 48px 38px;
        }
        .introduction-start-form--section .introduction-start-form__heading h2 { font-size: 1.7rem; }
        .introduction-start-form--section .introduction-start-form__heading p { margin: 10px 0 26px; font-size: 0.9rem; }
        .introduction-start-form--section .introduction-start-form__choices { grid-template-columns: 1fr; gap: 12px; }
        .introduction-start-form--section .introduction-start-form__choice,
        .introduction-start-form--section .introduction-start-form__next { min-height: 58px; font-size: 1rem; }
        .introduction-start-form--section .introduction-start-form__choice { padding: 0 20px; }
        .introduction-start-form--section .introduction-start-form__choice > svg:first-child { width: 26px; height: 26px; }
        .introduction-start-form--section .introduction-start-form__choice-arrow { width: 20px; height: 20px; }
        .introduction-start-form--section .introduction-start-form__privacy { margin-top: 22px; font-size: 0.82rem; }
        .introduction-start-form--section .introduction-start-form__privacy svg { width: 18px; height: 18px; }

        @media (min-width: 1024px) {
          .testlp-hero__inner {
            min-height: 520px;
            padding-bottom: 24px;
          }
          .testlp-hero__copy { top: 24px; }
          .testlp-hero__start-panel {
            display: block;
            position: absolute;
            top: calc(50% + 24px);
            right: clamp(32px, calc((100vw - 1280px) / 2), 320px);
            z-index: 5;
            width: min(36vw, 500px);
            transform: translateY(-50%);
          }
          .testlp-hero__start-panel .introduction-start-form { width: 100%; padding: 28px 28px 23px; }
          .testlp-hero__start-panel .introduction-start-form__heading h2 { font-size: 0.98rem; }
          .testlp-hero__start-panel .introduction-start-form__heading p { margin: 7px 0 16px; font-size: 0.61rem; }
          .testlp-hero__start-panel .introduction-start-form__choices { grid-template-columns: 1fr; gap: 9px; }
          .testlp-hero__start-panel .introduction-start-form__choice,
          .testlp-hero__start-panel .introduction-start-form__next { min-height: 43px; font-size: 0.7rem; }
          .testlp-hero__start-panel .introduction-start-form__choice { gap: 9px; padding: 0 11px; }
          .testlp-hero__start-panel .introduction-start-form__choice > svg:first-child { width: 18px; height: 18px; }
          .testlp-hero__start-panel .introduction-start-form__privacy { margin-top: 14px; font-size: 0.58rem; }
          .testlp-hero__image { display: none; }
        }

        @media (max-width: 639px) {
          .introduction-start-form { padding: 24px 18px 18px; }
          .introduction-start-form__heading h2 { font-size: 1.1rem; }
          .introduction-start-form__heading p { font-size: 0.68rem; line-height: 1.55; }
          .introduction-start-form__choices { grid-template-columns: 1fr; gap: 8px; }
          .introduction-start-form__choice,
          .introduction-start-form__next { min-height: 46px; font-size: 0.86rem; }
          .introduction-start-form--section { padding: 32px 20px 28px; }
          .introduction-start-form--section .introduction-start-form__heading h2 { font-size: 1.35rem; }
          .introduction-start-form--section .introduction-start-form__heading p { margin-bottom: 20px; font-size: 0.76rem; }
          .introduction-start-form--section .introduction-start-form__choice,
          .introduction-start-form--section .introduction-start-form__next { min-height: 54px; font-size: 0.9rem; }
        }

        @media (min-width: 1024px) {
          .testlp-hero__title--consultation { font-size: clamp(2.25rem, 3.3vw, 3.65rem); }
        }

        /* SP Hero and paired CTA: keep the person, copy and controls readable without horizontal clipping. */
        @media (max-width: 767px) {
          .testlp-hero__inner {
            min-height: 0;
            padding: 34px 20px 36px;
          }

          .testlp-hero__mobile-breadcrumb {
            display: block !important;
            top: 0;
            margin: 0 0 26px;
          }

          .testlp-hero__image { display: none !important; }

          .testlp-hero__badge {
            display: inline-flex !important;
            padding: 14px 30px;
            font-size: 1rem;
          }

          .testlp-hero__title {
            margin-top: 28px;
            font-size: clamp(1.62rem, 6.25vw, 1.92rem);
            line-height: 1.44;
          }

          .testlp-hero__lead {
            display: block !important;
            margin-top: 20px;
            color: #10284d;
            font-size: 0.86rem;
            font-weight: 700;
            line-height: 1.7;
          }

          .testlp-hero__features {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            width: 100%;
            margin-top: 24px;
            gap: 10px;
          }

          .testlp-hero__feature {
            width: auto;
            min-height: 150px;
            flex-direction: column;
            justify-content: center;
            gap: 13px;
            border: 1px solid #d9e6f7;
            border-radius: 16px;
            padding: 14px 6px;
            color: #0e2d63;
            font-size: clamp(0.73rem, 3.2vw, 0.92rem);
            line-height: 1.45;
            text-align: center;
            white-space: normal;
            box-shadow: 0 8px 20px rgba(38, 82, 144, 0.08);
          }

          .testlp-hero__feature-icon { width: 42px; height: 42px; }
          .testlp-hero__feature-map { width: 46px; height: 42px; }

          .testlp-hero__start-panel {
            display: block;
            position: static;
            width: 100%;
            margin-top: 24px;
            transform: none;
          }

          .testlp-hero__start-panel .introduction-start-form {
            width: 100%;
            max-width: none;
            border-radius: 18px;
            padding: 26px 20px 24px;
            box-shadow: 0 10px 24px rgba(31, 79, 150, 0.1);
          }

          .testlp-hero__start-panel .introduction-start-form__heading h2 { font-size: 1.2rem; }
          .testlp-hero__start-panel .introduction-start-form__heading p { margin: 8px 0 20px; font-size: 0.75rem; }
          .testlp-hero__start-panel .introduction-start-form__heading h2 span,
          .testlp-hero__start-panel .introduction-start-form__heading p span { display: block; }
          .testlp-hero__start-panel .introduction-start-form__choices { grid-template-columns: 1fr; gap: 10px; }
          .testlp-hero__start-panel .introduction-start-form__choice,
          .testlp-hero__start-panel .introduction-start-form__next { min-height: 54px; font-size: 0.94rem; }
          .testlp-hero__start-panel .introduction-start-form__choice { padding: 0 16px; }
          .testlp-hero__start-panel .introduction-start-form__choice > svg:first-child { width: 26px; height: 26px; }
          .testlp-hero__start-panel .introduction-start-form__choice-arrow { width: 20px; height: 20px; }
          .testlp-hero__start-panel .introduction-start-form__privacy { margin-top: 18px; font-size: 0.78rem; }
          .testlp-hero__start-panel .introduction-start-form__privacy svg { width: 18px; height: 18px; }

          .intro-concerns__cta {
            width: calc(100% - 32px);
            max-width: 540px;
            margin-top: 22px;
          }

          .intro-concerns__cta .testlp-form-cta,
          .intro-concerns__cta .testlp-phone-cta {
            min-height: 132px;
            padding: 16px 12px;
          }

          .intro-concerns__cta .testlp-form-cta__main {
            display: grid !important;
            grid-template-columns: 50px minmax(0, 1fr) 36px;
            gap: 6px;
          }

          .intro-concerns__cta .testlp-form-cta__free {
            width: 50px;
            height: 50px;
          }

          .intro-concerns__cta .testlp-form-cta__free svg { width: 27px; height: 27px; }
          .intro-concerns__cta .testlp-form-cta__body { width: 100%; }
          .intro-concerns__cta .testlp-form-cta__title {
            font-size: clamp(0.82rem, 3.65vw, 1.1rem);
            letter-spacing: -0.035em;
            white-space: nowrap;
          }

          .intro-concerns__cta .testlp-form-cta__arrow {
            width: 36px;
            height: 36px;
          }

          .intro-concerns__cta .testlp-form-cta__arrow-svg { width: 20px; height: 20px; }
          .intro-concerns__cta .testlp-form-cta__sub { margin-top: 10px; font-size: 0.72rem; }

          .intro-concerns__cta .testlp-phone-cta__main {
            display: grid !important;
            grid-template-columns: 54px minmax(0, 1fr);
            gap: 14px;
          }

          .intro-concerns__cta .testlp-phone-cta__icon { width: 54px; height: 54px; }
          .intro-concerns__cta .testlp-phone-cta__icon-svg { width: 29px; height: 29px; }
          .intro-concerns__cta .testlp-phone-cta__label { font-size: clamp(0.68rem, 3vw, 0.85rem); }
          .intro-concerns__cta .testlp-phone-cta__number { font-size: clamp(1.38rem, 6.4vw, 2rem); }
        }

        .introduction-main { padding-bottom: 142px; }

        .intro-accountant-marquee {
          overflow: hidden;
          border-bottom: 1px solid #dce8f6;
          background: #f4f7fb;
          padding: 42px 0 36px;
        }

        .intro-accountant-marquee h2 {
          margin: 0 0 26px;
          color: #082d70;
          font-family: "Noto Serif JP", serif;
          font-size: clamp(1.3rem, 2.2vw, 2rem);
          font-weight: 800;
          text-align: center;
        }

        .intro-accountant-marquee__viewport { position: relative; }
        .intro-accountant-marquee__track {
          display: flex;
          width: max-content;
          /* 5枚→9枚への追加後も、以前と同じ移動速度を保つ。 */
          animation-duration: 153s;
        }
        .intro-accountant-marquee__item { flex: 0 0 auto; margin: 0 18px; }
        .intro-accountant-marquee__photo {
          position: relative;
          width: 128px;
          height: 128px;
          overflow: hidden;
          border: 4px solid #fff;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(32, 72, 126, 0.16);
        }

        .intro-accountant-marquee__image--framed {
          /* 16:9の白い外枠を丸枠の外へ逃がし、他の人物画像と同じ見え方に揃える。 */
          transform: scale(1.3);
        }

        .intro-accountant-marquee__image--zoomed {
          /* 男性6は被写体が遠いため、顔と上半身が見える倍率へ個別に調整する。 */
          transform: scale(2.2);
        }

        .intro-accountant-marquee__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: clamp(36px, 8vw, 120px);
          pointer-events: none;
        }
        .intro-accountant-marquee__fade--left { left: 0; background: linear-gradient(90deg, #f4f7fb, transparent); }
        .intro-accountant-marquee__fade--right { right: 0; background: linear-gradient(270deg, #f4f7fb, transparent); }

        .intro-accountant-marquee--hero {
          width: min(100%, 720px);
          border: 0;
          background: transparent;
          padding: 16px 0 0;
        }
        .intro-accountant-marquee--hero .intro-accountant-marquee__item { margin: 0 8px; }
        .intro-accountant-marquee--hero .intro-accountant-marquee__photo {
          width: 94px;
          height: 94px;
          border-width: 3px;
          box-shadow: 0 4px 12px rgba(32, 72, 126, 0.14);
        }
        .intro-accountant-marquee--hero .intro-accountant-marquee__fade { width: 42px; }
        .intro-accountant-marquee--hero .intro-accountant-marquee__fade--left { background: linear-gradient(90deg, #f8fbff, transparent); }
        .intro-accountant-marquee--hero .intro-accountant-marquee__fade--right { background: linear-gradient(270deg, #f8fbff, transparent); }

        .intro-sticky-cta {
          position: fixed;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 60;
          border-top: 1px solid #d8e5f5;
          background: rgba(255, 255, 255, 0.96);
          padding: 12px 0 calc(12px + env(safe-area-inset-bottom));
          box-shadow: 0 -8px 28px rgba(15, 59, 124, 0.12);
          backdrop-filter: blur(12px);
        }

        .intro-sticky-cta__inner {
          width: min(calc(100% - 64px), 1280px);
          max-width: none;
          margin: 0 auto;
        }

        .intro-sticky-cta__inner .testlp-phone-cta,
        .intro-sticky-cta__inner .testlp-form-cta { min-height: 104px; }

        .intro-concerns__cta .testlp-form-cta__body { text-align: center; }
        .intro-concerns__cta .testlp-form-cta__label {
          display: block;
          margin: 0 0 3px;
          font-size: clamp(0.72rem, 1vw, 0.9rem);
          letter-spacing: 0.04em;
        }
        .intro-concerns__cta .testlp-form-cta__title {
          font-size: clamp(1.1rem, 2vw, 1.72rem);
          letter-spacing: -0.025em;
        }
        .intro-concerns__cta .testlp-form-cta__note {
          margin-top: 4px;
          font-size: clamp(0.66rem, 0.92vw, 0.84rem);
        }

        .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__title {
          font-size: clamp(1rem, 1.72vw, 1.5rem);
        }

        .intro-final-cta {
          width: min(100%, 620px);
          margin: 0 auto;
        }

        .intro-final-cta .testlp-form-cta {
          min-height: 108px;
          border-radius: 20px;
          padding: 14px 26px;
        }

        .intro-final-cta .testlp-form-cta__main {
          grid-template-columns: 62px minmax(0, 1fr) 42px;
          gap: 14px;
        }

        .intro-final-cta .testlp-form-cta__free { width: 62px; height: 62px; border-width: 0; }
        .intro-final-cta .testlp-form-cta__free svg { width: 33px; height: 33px; }
        .intro-final-cta .testlp-form-cta__label { margin-bottom: 3px; font-size: 0.9rem; }
        .intro-final-cta .testlp-form-cta__title { font-size: clamp(1.15rem, 2vw, 1.55rem); }
        .intro-final-cta .testlp-form-cta__note { margin-top: 4px; font-size: 0.84rem; }
        .intro-final-cta .testlp-form-cta__arrow { width: 42px; height: 42px; }
        .intro-final-cta .testlp-form-cta__arrow-svg { width: 22px; height: 22px; }

        @media (min-width: 768px) {
          .intro-sticky-cta__inner { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .intro-sticky-cta__inner .testlp-phone-cta__icon { width: 64px; height: 64px; }
          .intro-sticky-cta__inner .testlp-phone-cta__icon-svg { width: 33px; height: 33px; }
          .intro-sticky-cta__inner .testlp-phone-cta__label { font-size: clamp(0.82rem, 1.1vw, 1rem); }
          .intro-sticky-cta__inner .testlp-phone-cta__number { font-size: clamp(1.7rem, 3.1vw, 2.65rem); }
          .intro-sticky-cta__inner .testlp-form-cta__label { font-size: clamp(0.72rem, 1vw, 0.9rem); }
          .intro-sticky-cta__inner .testlp-form-cta__title { font-size: clamp(1rem, 1.72vw, 1.5rem); }
          .intro-sticky-cta__inner .testlp-form-cta__note { font-size: clamp(0.66rem, 0.92vw, 0.84rem); }
        }

        @media (max-width: 767px) {
          .introduction-main { padding-bottom: 102px; }
          .intro-accountant-marquee { padding: 30px 0 26px; }
          .intro-accountant-marquee h2 { margin-bottom: 20px; font-size: 1.2rem; }
          .intro-accountant-marquee__item { margin: 0 10px; }
          .intro-accountant-marquee__photo { width: 88px; height: 88px; border-width: 3px; }
          .intro-accountant-marquee--hero { width: 100%; padding-top: 16px; }
          .intro-accountant-marquee--hero .intro-accountant-marquee__item { margin: 0 7px; }
          .intro-accountant-marquee--hero .intro-accountant-marquee__photo { width: 58px; height: 58px; }

          .intro-sticky-cta { padding: 5px 0 calc(5px + env(safe-area-inset-bottom)); }
          .intro-sticky-cta__inner {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: calc(100% - 24px);
            margin-top: 0;
          }
          .intro-sticky-cta__inner .testlp-form-cta,
          .intro-sticky-cta__inner .testlp-phone-cta {
            min-height: 80px;
            padding: 7px 8px;
          }
          .intro-sticky-cta__inner .testlp-form-cta {
            border-right: 1px solid #dbe7f5;
            border-bottom: 0;
          }
          .intro-sticky-cta__inner .testlp-form-cta__main {
            display: grid;
            grid-template-columns: 28px minmax(0, 1fr) 22px;
            gap: 4px;
          }
          .intro-sticky-cta__inner .testlp-form-cta__free { width: 28px; height: 28px; }
          .intro-sticky-cta__inner .testlp-form-cta__free svg { width: 16px; height: 16px; }
          .intro-sticky-cta__inner .testlp-form-cta__label {
            display: block;
            margin-bottom: 1px;
            font-size: clamp(0.42rem, 2.1vw, 0.5rem);
            line-height: 1;
          }
          .intro-sticky-cta__inner .testlp-form-cta__title {
            font-size: clamp(0.48rem, 2.8vw, 0.66rem);
            letter-spacing: -0.075em;
            line-height: 1;
            white-space: nowrap;
          }
          .intro-sticky-cta__inner .testlp-form-cta__note {
            display: block;
            margin-top: 1px;
            font-size: clamp(0.38rem, 1.9vw, 0.46rem);
            letter-spacing: -0.06em;
            line-height: 1;
            white-space: nowrap;
          }
          .intro-sticky-cta__inner .testlp-form-cta__arrow { width: 22px; height: 22px; }
          .intro-sticky-cta__inner .testlp-form-cta__arrow-svg { width: 13px; height: 13px; }
          .intro-sticky-cta__inner .testlp-phone-cta__hours { display: none; }
          .intro-sticky-cta__inner .testlp-phone-cta__main {
            grid-template-columns: 28px minmax(0, 1fr);
            align-items: center;
            gap: 5px;
          }
          .intro-sticky-cta__inner .testlp-phone-cta__icon { width: 28px; height: 28px; }
          .intro-sticky-cta__inner .testlp-phone-cta__icon-svg { width: 16px; height: 16px; }
          .intro-sticky-cta__inner .testlp-phone-cta__tap { display: none; }
          .intro-sticky-cta__inner .testlp-phone-cta__label {
            display: block;
            margin-bottom: 2px;
            font-size: clamp(0.48rem, 2.3vw, 0.56rem);
            letter-spacing: -0.06em;
            line-height: 1.12;
            white-space: normal;
          }
          .intro-sticky-cta__inner .testlp-phone-cta__label span { display: block; }
          .intro-sticky-cta__inner .testlp-phone-cta__body { text-align: center; }
          .intro-sticky-cta__inner .testlp-phone-cta__number {
            font-size: clamp(0.68rem, 3.3vw, 0.8rem);
            letter-spacing: -0.055em;
            line-height: 1;
          }
          .intro-concerns__cta .testlp-form-cta__label { display: block; margin-bottom: 2px; font-size: 0.66rem; }
          .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__label { font-size: 0.76rem; }
          .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__title { font-size: clamp(1.08rem, 4.7vw, 1.3rem); }
          .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__note { margin-top: 4px; font-size: 0.68rem; }

          .intro-final-cta { width: min(calc(100% - 32px), 520px); }
          .intro-final-cta .testlp-form-cta { min-height: 118px; padding: 14px 18px; }
          .intro-final-cta .testlp-form-cta__main { grid-template-columns: 56px minmax(0, 1fr) 38px; gap: 10px; }
          .intro-final-cta .testlp-form-cta__free { width: 56px; height: 56px; }
          .intro-final-cta .testlp-form-cta__free svg { width: 30px; height: 30px; }
          .intro-final-cta .testlp-form-cta__label { font-size: 0.76rem; }
          .intro-final-cta .testlp-form-cta__title {
            font-size: clamp(0.98rem, 4.25vw, 1.1rem);
            line-height: 1.16;
            white-space: normal;
          }
          .intro-final-cta .testlp-form-cta__note { font-size: 0.68rem; }
          .intro-final-cta .testlp-form-cta__arrow { width: 38px; height: 38px; }
          .intro-final-cta .testlp-form-cta__arrow-svg { width: 20px; height: 20px; }

          .intro-concern h3 { font-size: 1.2rem; }
          .intro-concern p { font-size: 0.86rem; }
          .intro-flow-highlight { justify-content: center; }
          .intro-flow-highlight > div { text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-accountant-marquee__track { animation: none; }
        }

        .testlp-phone-cta__label--pc { display: none !important; }
        .testlp-phone-cta__label--sp { display: inline !important; font-size: 1.05rem !important; white-space: nowrap !important; }

        @media (min-width: 768px) {
          .testlp-phone-cta__label--sp { display: none !important; }
          .testlp-phone-cta__label--pc { display: inline !important; }
        }

        .testlp-hero__mobile-only { display: none; }

        @media (max-width: 767px) {
          .testlp-hero__inner { padding-top: 28px; }
          .testlp-hero__mobile-breadcrumb,
          .testlp-hero__badge { display: none !important; }
          .testlp-hero__mobile-only { display: block; margin-top: 12px; }
          .testlp-hero__mobile-satisfaction { width: 100%; margin: 0 auto; }
          .testlp-hero__satisfaction-image { display: block; width: 100%; height: auto; }
          .testlp-hero__title { margin-top: 20px; }
          .intro-accountant-marquee:not(.intro-accountant-marquee--hero) { display: none; }
          .intro-accountant-marquee--hero { margin-top: 0; padding-top: 0; }
          .intro-accountant-marquee--hero .intro-accountant-marquee__photo { width: 88px; height: 88px; }
          .testlp-hero__features { margin-top: 4px; }
          .intro-accountant-marquee--hero .intro-accountant-marquee__fade--left { background: linear-gradient(90deg, #f8fbff, transparent); }
          .intro-accountant-marquee--hero .intro-accountant-marquee__fade--right { background: linear-gradient(270deg, #f8fbff, transparent); }
        }

        .intro-sticky-cta__inner .testlp-phone-cta__label--sp {
          font-size: 0.72rem !important;
          letter-spacing: -0.02em !important;
        }
      `}</style>
    </div>
  );
}
