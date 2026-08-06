import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowRight, Building2, CheckCircle2, ClipboardList, FilePenLine, Landmark, LockKeyhole, MessageCircle, UserRound } from "lucide-react";
import GlobalFooter from "@/components/GlobalFooter";
import { getAllPrefectures, getCitiesByPrefecture } from "@/lib/data";
import logoIcon from "@/images/税アイコン.png";
import logoText from "@/images/ロゴテキスト.png";
import coordinatorImage from "@/images/女性1_crop.png";

const STARTERS = [
  { label: "法人", icon: Building2 },
  { label: "法人設立・法人化予定", icon: FilePenLine },
  { label: "個人事業主・フリーランス", icon: UserRound },
  { label: "相続税申告", icon: Landmark },
  { label: "確定申告・その他", icon: ClipboardList },
];

const REGION_GROUPS = [
  { label: "関東", prefectures: ["ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa"] },
  { label: "北海道・東北", prefectures: ["hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima"] },
  { label: "北陸・甲信越", prefectures: ["niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano"] },
  { label: "東海", prefectures: ["gifu", "shizuoka", "aichi", "mie"] },
  { label: "近畿", prefectures: ["shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama"] },
  { label: "中国・四国", prefectures: ["tottori", "shimane", "okayama", "hiroshima", "yamaguchi", "tokushima", "kagawa", "ehime", "kochi"] },
  { label: "九州・沖縄", prefectures: ["fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa"] },
  { label: "国外", prefectures: [] },
];

type ChoiceCardProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: typeof Building2;
  disabled?: boolean;
};

function ChoiceCard({ label, selected, onClick, icon: Icon, disabled = false }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`intro-questionnaire__choice ${selected ? "is-selected" : ""}`}
      aria-pressed={selected}
    >
      {Icon && <Icon />}
      <span>{label}</span>
      {selected && <CheckCircle2 aria-hidden="true" />}
    </button>
  );
}

function CoordinatorAvatar({ decorative = false }: { decorative?: boolean }) {
  return (
    <div className="intro-questionnaire__assistant-icon" aria-hidden={decorative || undefined}>
      <Image src={coordinatorImage} alt={decorative ? "" : "税理士クラウドのコーディネーター"} fill sizes="40px" />
    </div>
  );
}

function QuestionMessage({ children, showAvatar = true }: { children: ReactNode; showAvatar?: boolean }) {
  return (
    <div className={`intro-questionnaire__question-prompt ${showAvatar ? "" : "intro-questionnaire__question-prompt--without-avatar"}`}>
      {showAvatar && <CoordinatorAvatar decorative />}
      <div className="intro-questionnaire__question-message">{children}</div>
    </div>
  );
}

export default function IntroductionQuestionnaire() {
  const router = useRouter();
  const allPrefectures = useMemo(() => getAllPrefectures(), []);
  const [step, setStep] = useState(0);
  const [clientType, setClientType] = useState("");
  const [region, setRegion] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [requestDetail, setRequestDetail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const initial = router.query.clientType;
    if (typeof initial === "string" && STARTERS.some(({ label }) => label === initial)) {
      setClientType(initial);
      setStep(1);
    }
  }, [router.query.clientType]);

  useEffect(() => {
    if (step === 0) return;

    const timer = window.setTimeout(() => {
      document.querySelector<HTMLElement>(`[data-question-step="${step}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [step]);

  const cities = useMemo(() => (prefecture ? getCitiesByPrefecture(prefecture) : []), [prefecture]);
  const selectedPrefecture = allPrefectures.find((item) => item.slug === prefecture);
  const visiblePrefectures = useMemo(
    () => allPrefectures.filter((item) => !region || REGION_GROUPS.find(({ label }) => label === region)?.prefectures.includes(item.slug)),
    [allPrefectures, region],
  );
  const progressStep = step === 0 ? 0 : step <= 3 ? 1 : step === 4 ? 2 : 3;
  const hasRequestDetail = Boolean(requestDetail.trim());

  function next() {
    if (!canContinue) return;
    if (step < 5) {
      setStep((current) => current + 1);
      return;
    }
    void submit();
  }

  async function submit() {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePage: "/introduction/step",
          clientType,
          consultType: clientType,
          prefectureName: selectedPrefecture?.name || (prefecture === "overseas" ? "海外" : "未選択"),
          cityName: cities.find((item) => item.slug === city)?.name || "",
          name,
          email,
          phone,
          requestDetail: requestDetail.trim() || "ご希望内容は担当者からのヒアリングを希望",
        }),
      });

      if (!response.ok) throw new Error("送信に失敗しました");
      window.oaiq?.("measure", "lead_created", { type: "customer_action" });
      await router.push("/introduction/thanks");
    } catch {
      setSubmitError("送信に失敗しました。時間をおいてもう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canContinue = [
    Boolean(clientType),
    Boolean(region),
    Boolean(prefecture),
    true,
    true,
    Boolean(name.trim() && email.trim() && phone.trim() && agreed),
  ][step];

  return (
    <div className="min-h-screen bg-[#e5f4fd] text-[#153e79]">
      <main className="intro-questionnaire">
        <div className="intro-questionnaire__progress-wrap">
          <Link href="/introduction" className="intro-questionnaire__brand" aria-label="税理士クラウド紹介サービスへ戻る">
            <Image src={logoIcon} alt="" width={32} height={32} priority />
            <Image src={logoText} alt="税理士クラウド" width={144} height={24} priority />
          </Link>
          <div className="intro-questionnaire__progress" aria-label={`ステップ ${progressStep + 1} / 5`}>
            <span>STEP</span>
            {Array.from({ length: 5 }, (_, index) => (
              <i key={index} className={index <= progressStep ? "is-active" : ""}>{index + 1}</i>
            ))}
            <strong>入力は30秒で完了</strong>
          </div>
        </div>

        <div className="intro-questionnaire__content">
          <div className="intro-questionnaire__assistant">
            <CoordinatorAvatar />
            <p>税理士クラウドのコーディネーターです。<b>あなたに合った税理士をご紹介します！</b></p>
          </div>

          {step >= 0 && <section className="intro-questionnaire__question" data-question-step="0">
            <QuestionMessage showAvatar={false}>まずはご相談者様について教えてください</QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__options intro-questionnaire__options--stack">
                {STARTERS.map(({ label, icon }) => <ChoiceCard key={label} label={label} icon={icon} selected={clientType === label} onClick={() => { setClientType(label); setStep(1); }} />)}
              </div>
            </div>
          </section>}

          {step >= 1 && <section className="intro-questionnaire__question" data-question-step="1">
            <QuestionMessage>お探しの地域を教えてください</QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__options intro-questionnaire__options--two">
                {REGION_GROUPS.map(({ label }) => <ChoiceCard key={label} label={label} selected={region === label} onClick={() => { setRegion(label); setPrefecture(""); setCity(""); setStep(2); }} />)}
              </div>
            </div>
          </section>}

          {step >= 2 && <section className="intro-questionnaire__question" data-question-step="2">
            <QuestionMessage>都道府県を教えてください</QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__options intro-questionnaire__options--two">
                {region === "国外" ? <ChoiceCard label="海外" selected={prefecture === "overseas"} onClick={() => { setPrefecture("overseas"); setCity(""); setStep(3); }} /> : visiblePrefectures.map((item) => <ChoiceCard key={item.slug} label={item.name} selected={prefecture === item.slug} onClick={() => { setPrefecture(item.slug); setCity(""); setStep(3); }} />)}
              </div>
            </div>
          </section>}

          {step >= 3 && <section className="intro-questionnaire__question" data-question-step="3">
            <QuestionMessage>市区町村を教えてください <small>任意</small></QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__select-wrap">
                <label htmlFor="city">市区町村（任意）</label>
                <select id="city" value={city} onChange={(event) => setCity(event.target.value)} disabled={!prefecture}>
                  <option value="">選択してください</option>
                  {cities.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
              </div>
              {step === 3 && <div className="intro-questionnaire__actions"><button type="button" onClick={() => setStep(4)} className="intro-questionnaire__back">スキップ</button><button type="button" onClick={next} className="intro-questionnaire__next">次へ<ArrowRight /></button></div>}
            </div>
          </section>}

          {step >= 4 && <section className="intro-questionnaire__question" data-question-step="4">
            <QuestionMessage>税理士に依頼したい内容を教えてください <small>任意</small></QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__textarea-wrap">
                <label htmlFor="requestDetail">依頼したい内容（任意）</label>
                <textarea id="requestDetail" value={requestDetail} onChange={(event) => setRequestDetail(event.target.value)} rows={6} placeholder={"例\n・法人化とその後の顧問契約\n・初年度決算申告（IT関連業）\n・新規法人設立"} />
              </div>
              {step === 4 && <div className="intro-questionnaire__actions"><button type="button" onClick={() => setStep(5)} className={`intro-questionnaire__back ${hasRequestDetail ? "" : "is-primary"}`}>スキップ</button><button type="button" disabled={!hasRequestDetail} onClick={next} className={`intro-questionnaire__next ${hasRequestDetail ? "" : "is-muted"}`}>次へ<ArrowRight /></button></div>}
            </div>
          </section>}

          {step >= 5 && <section className="intro-questionnaire__question" data-question-step="5">
            <QuestionMessage>税理士情報を受け取るための連絡先情報を教えてください</QuestionMessage>
            <div className="intro-questionnaire__card">
              <div className="intro-questionnaire__contact-fields">
                <div className="intro-questionnaire__privacy-note"><LockKeyhole /> 入力情報は個人情報保護方針に基づき、許可なく第三者に共有されることはありません。</div>
                <label>お名前<input value={name} onChange={(event) => setName(event.target.value)} placeholder="例：山田 太郎" /></label>
                <label>メールアドレス<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="例：zeiri4@zeiri4.com" /></label>
                <label>電話番号<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="例：0312345678" /></label>
                <label className="intro-questionnaire__agreement"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} /><span><a href="https://orb-inc.co.jp/privacy-policy" target="_blank" rel="noreferrer">プライバシーポリシー</a>に同意する</span></label>
              </div>
              {submitError && <p className="intro-questionnaire__error">{submitError}</p>}
              <div className="intro-questionnaire__actions"><span /><button type="button" disabled={!canContinue || isSubmitting} onClick={next} className="intro-questionnaire__next">{isSubmitting ? "送信中..." : "送信する"}<ArrowRight /></button></div>
            </div>
          </section>}

          <div className="intro-questionnaire__support"><MessageCircle /> 途中で迷った場合も、担当者がご希望を丁寧にお伺いします。</div>
        </div>
      </main>
      <GlobalFooter />
      <style jsx global>{`
        .intro-questionnaire { min-height: calc(100vh - 80px); background: linear-gradient(180deg, #d9effb 0%, #edf8fe 100%); padding-bottom: 72px; }
        .intro-questionnaire__progress-wrap { background: #fff; box-shadow: 0 1px 0 rgba(31, 89, 151, .12); }
        .intro-questionnaire__brand { display: flex; width: fit-content; align-items: center; gap: 8px; margin: 0 auto; padding: 10px 20px 8px; text-decoration: none; }
        .intro-questionnaire__brand img:first-child { width: 32px; height: 32px; object-fit: contain; }
        .intro-questionnaire__brand img:last-child { width: 144px; height: 24px; object-fit: contain; }
        .intro-questionnaire__progress { display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 36px; padding: 8px 16px; background: #07519a; color: #fff; font-size: .66rem; font-weight: 800; }
        .intro-questionnaire__progress i { display: grid; width: 17px; height: 17px; place-items: center; border: 1px solid #b7dcf7; border-radius: 999px; color: #cde7fb; font-size: .56rem; font-style: normal; }
        .intro-questionnaire__progress i.is-active { border-color: #fff; background: #fff; color: #07519a; }
        .intro-questionnaire__progress strong { margin-left: 10px; color: #cfeafb; font-size: .59rem; }
        .intro-questionnaire__content { width: min(100% - 32px, 640px); margin: 0 auto; padding-top: 42px; }
        .intro-questionnaire__assistant { display: flex; align-items: center; gap: 10px; margin: 0 0 16px; }
        .intro-questionnaire__assistant-icon { position: relative; width: 40px; height: 40px; flex: 0 0 40px; overflow: hidden; border: 2px solid #0d70bf; border-radius: 50%; background: #fff; }
        .intro-questionnaire__assistant-icon img { object-fit: cover; object-position: 55% top; transform: translateX(2px) scale(1.08); transform-origin: 55% top; }
        .intro-questionnaire__assistant p { margin: 0; padding: 10px 14px; border-radius: 9px; background: #fff; color: #385675; font-size: .78rem; line-height: 1.5; }
        .intro-questionnaire__assistant b { color: #0757ac; }
        .intro-questionnaire__question { margin-top: 34px; scroll-margin-top: 18px; }
        .intro-questionnaire__question:first-of-type { margin-top: 0; }
        .intro-questionnaire__question-prompt { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
        .intro-questionnaire__question-prompt--without-avatar { margin-left: 50px; }
        .intro-questionnaire__question-prompt--without-avatar .intro-questionnaire__question-message { max-width: 100%; }
        .intro-questionnaire__question-message { width: fit-content; max-width: calc(100% - 50px); border-radius: 2px 11px 11px 11px; background: #fff; padding: 10px 14px; box-shadow: 0 4px 12px rgba(43, 91, 139, .1); color: #385675; font-size: .8rem; font-weight: 800; line-height: 1.55; }
        .intro-questionnaire__question-message small { display: inline-block; margin-left: 4px; color: #5f7c9b; font-size: .68rem; }
        .intro-questionnaire__card { border-radius: 9px; background: #fff; padding: 30px; box-shadow: 0 10px 24px rgba(43, 91, 139, .12); }
        .intro-questionnaire__heading { margin-bottom: 24px; text-align: center; }
        .intro-questionnaire__heading > span { color: #0b76c6; font-size: .68rem; font-weight: 900; letter-spacing: .12em; }
        .intro-questionnaire__heading h1 { margin: 5px 0 8px; color: #17467e; font-size: 1.22rem; font-weight: 900; line-height: 1.5; }
        .intro-questionnaire__heading p { margin: 0; color: #607996; font-size: .72rem; line-height: 1.65; }
        .intro-questionnaire__options { display: grid; gap: 10px; }
        .intro-questionnaire__options--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .intro-questionnaire__choice { display: flex; min-height: 45px; align-items: center; justify-content: center; gap: 9px; border: 1.5px solid #70a5da; border-radius: 4px; background: #fff; padding: 9px 14px; color: #16579d; font-size: .83rem; font-weight: 800; text-align: center; transition: .18s ease; }
        .intro-questionnaire__choice:not(:disabled):hover, .intro-questionnaire__choice.is-selected { border-color: #0a70c1; background: #e9f4fd; box-shadow: inset 0 0 0 1px #0a70c1; }
        .intro-questionnaire__choice:disabled { cursor: default; opacity: 1; }
        .intro-questionnaire__choice > svg { width: 19px; height: 19px; flex: 0 0 auto; }
        .intro-questionnaire__choice > svg:last-child { color: #0a70c1; }
        .intro-questionnaire__select-wrap, .intro-questionnaire__textarea-wrap { display: grid; gap: 8px; }
        .intro-questionnaire__select-wrap label, .intro-questionnaire__textarea-wrap label, .intro-questionnaire__contact-fields > label { color: #1b5698; font-size: .76rem; font-weight: 800; }
        .intro-questionnaire__select-wrap select, .intro-questionnaire__textarea-wrap textarea, .intro-questionnaire__contact-fields input:not([type=checkbox]) { width: 100%; border: 1px solid #82b2e2; border-radius: 4px; background: #fff; padding: 12px; color: #153e79; font: inherit; font-size: .86rem; outline: none; }
        .intro-questionnaire__select-wrap select:focus, .intro-questionnaire__textarea-wrap textarea:focus, .intro-questionnaire__contact-fields input:focus { border-color: #0875c9; box-shadow: 0 0 0 3px rgba(8, 117, 201, .13); }
        .intro-questionnaire__textarea-wrap textarea { resize: vertical; line-height: 1.65; }
        .intro-questionnaire__contact-fields { display: grid; gap: 14px; }
        .intro-questionnaire__contact-fields > label { display: grid; gap: 6px; }
        .intro-questionnaire__privacy-note { display: flex; align-items: flex-start; gap: 7px; border-radius: 5px; background: #eaf4fc; padding: 10px; color: #39618c; font-size: .7rem; font-weight: 700; line-height: 1.55; }
        .intro-questionnaire__privacy-note svg { width: 15px; height: 15px; flex: 0 0 auto; }
        .intro-questionnaire__agreement { display: flex !important; align-items: center; gap: 8px; }
        .intro-questionnaire__agreement input { width: 16px; height: 16px; accent-color: #0875c9; }
        .intro-questionnaire__agreement a { color: #0765b6; text-decoration: underline; }
        .intro-questionnaire__actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 24px; }
        .intro-questionnaire__back, .intro-questionnaire__next { display: inline-flex; min-height: 43px; align-items: center; justify-content: center; gap: 7px; border-radius: 4px; padding: 0 24px; font-size: .82rem; font-weight: 900; }
        .intro-questionnaire__back { border: 0; background: #93c9eb; color: #fff; }
        .intro-questionnaire__back.is-primary { background: #079ddd; }
        .intro-questionnaire__next { min-width: 55%; border: 0; background: #079ddd; color: #fff; }
        .intro-questionnaire__next:disabled { opacity: .52; cursor: not-allowed; }
        .intro-questionnaire__next.is-muted { background: #93c9eb; opacity: 1; }
        .intro-questionnaire__back svg, .intro-questionnaire__next svg { width: 17px; height: 17px; }
        .intro-questionnaire__error { margin: 16px 0 0; color: #c52d2d; font-size: .78rem; font-weight: 700; text-align: center; }
        .intro-questionnaire__support { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 20px auto 0; color: #477191; font-size: .72rem; font-weight: 700; text-align: center; }
        .intro-questionnaire__support svg { width: 18px; height: 18px; }
        @media (max-width: 640px) { .intro-questionnaire__content { width: min(100% - 24px, 640px); padding-top: 28px; } .intro-questionnaire__question { margin-top: 28px; } .intro-questionnaire__question-prompt { gap: 8px; } .intro-questionnaire__question-prompt--without-avatar { margin-left: 48px; } .intro-questionnaire__question-message { max-width: calc(100% - 38px); font-size: .76rem; } .intro-questionnaire__card { padding: 24px 18px; } .intro-questionnaire__progress { gap: 5px; padding-inline: 8px; } .intro-questionnaire__progress strong { display: none; } .intro-questionnaire__assistant p { font-size: .7rem; } .intro-questionnaire__options--two { grid-template-columns: 1fr; } .intro-questionnaire__choice { min-height: 48px; font-size: .84rem; } .intro-questionnaire__actions { flex-direction: column-reverse; } .intro-questionnaire__back, .intro-questionnaire__next { width: 100%; } }
      `}</style>
    </div>
  );
}
