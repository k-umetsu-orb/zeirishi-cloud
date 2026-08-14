import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalFooter from "@/components/GlobalFooter";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  FileCheck2,
  Handshake,
  HeartHandshake,
  Cloud,
  FileText,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  MessageCircleMore,
  Monitor,
  ShieldCheck,
  Sparkles,
  Target,
  Headphones,
  Users,
} from "lucide-react";
import logoIcon from "@/images/税アイコン.png";
import logoText from "@/images/ロゴテキスト.png";
import heroImage from "@/images/hero-coordinator-30s.png";
import officeImage from "@/images/partner-office-building-v1.png";
import coordinatorIllustration from "@/images/partner-coordinator-illustration-v2.png";

const painPoints = [
  { icon: Handshake, text: <>新規に強い<br />顧客を増やしたい</> },
  { icon: Target, text: <>得意分野をもっと<br />わかりやすく紹介したい</> },
  { icon: MapPin, text: <>地域で探している<br />ユーザーに見つけてもらいたい</> },
  { icon: Monitor, text: <>事務所の強みを伝えて<br />信頼を高めたい</> },
];

const recommended = [
  { icon: Handshake, text: <>新規問い合わせを<br />安定的に増やしたい</> },
  { icon: Users, text: <>得意分野を<br />見てほしい、説明したい</> },
  { icon: Building2, text: <>活動量を、会社規模でなく<br />詳細情報でPRしたい</> },
  { icon: Sparkles, text: <>クラウド会計に強いことを<br />伝えたい</> },
];

const faqs = [
  ["掲載は費用がかかりますか？", "税理士クラウドは成果報酬型となっており、掲載料は無料です。具体的なプランについては、事務所の状況をお伺いしたうえでご案内します。まずは無料でお問い合わせください。"],
  ["どのような事務所が掲載できますか？", "税理士・会計事務所の皆さまにご掲載いただけます。詳しい掲載条件はお問い合わせ時にご案内します。"],
  ["掲載までにどのくらい時間がかかりますか？", "掲載内容の確認後、できるだけ速やかに公開できるよう進めます。詳しいスケジュールはヒアリング時にご説明します。"],
  ["対応エリアや得意分野の設定はできますか？", "はい。対応エリア、得意分野、対応業種など、事務所の特徴が伝わる情報を掲載できます。"],
  ["問い合わせの通知方法を教えてください。", "お問い合わせが発生した際のご連絡方法は、掲載開始前にご案内します。"],
];

function ContactButton({ className = "", children = "まずは掲載について詳細を聞いてみる" }: { className?: string; children?: string }) {
  return <a href="#contact" className={`partner-button ${className}`}>{children}<ArrowRight aria-hidden="true" /></a>;
}

export default function Partner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ officeName: "", name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/partner-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "送信に失敗しました");
      }
      window.location.assign("/partner/thanks");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "送信に失敗しました。時間をおいて再度お試しください。");
    }
  }

  return (
    <div className="partner-page">
      <header className="partner-header">
        <div className="partner-shell partner-header__inner">
          <Link href="/" className="partner-brand" aria-label="税理士クラウド トップへ">
            <Image src={logoIcon} alt="" width={33} height={33} priority />
            <Image src={logoText} alt="税理士クラウド" width={136} height={23} priority />
          </Link>
          <nav className="partner-nav" aria-label="ページ内ナビゲーション">
            <a href="#merits">掲載メリット</a>
            <a href="#flow">掲載方法</a>
            <a href="#faq">よくある質問</a>
            <ContactButton className="partner-nav__cta">無料で問い合わせる</ContactButton>
          </nav>
          <button className="partner-mobile-menu" type="button" aria-label="メニュー"><Menu aria-hidden="true" /></button>
        </div>
      </header>

      <main>
        <section className="partner-mobile-hero" aria-labelledby="partner-mobile-hero-title">
          <div className="partner-mobile-hero__content">
            <p className="partner-mobile-hero__badge"><ShieldCheck aria-hidden="true" />掲載のご相談は無料</p>
            <h1 id="partner-mobile-hero-title">税理士クラウドへの掲載を検討中の税理士・会計事務所さまへ</h1>
            <p className="partner-mobile-hero__lead">お悩みや強みが伝わる掲載をつくることで、<br />税理士を探している<span>見込み顧客と事務所の強みをしっかりつなぎます。</span></p>
            <div className="partner-mobile-hero__features">
              <article><span><Megaphone aria-hidden="true" /></span><p>強みを<br />伝えやすい</p></article>
              <article><span><Users aria-hidden="true" /></span><p>見込み顧客と<br />つながる</p></article>
              <article><span><Headphones aria-hidden="true" /></span><p>専属コーディネーターが<br />サポート</p></article>
            </div>
            <div className="partner-mobile-hero__actions">
              <ContactButton>無料で問い合わせる</ContactButton>
              <a className="partner-outline-button" href="#merits">掲載の仕組みを見る <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="partner-mobile-hero__connection" aria-label="税理士を探すユーザーと税理士・会計事務所をつなぐイメージ">
            <div className="partner-mobile-hero__node partner-mobile-hero__node--user"><Users aria-hidden="true" /><p>税理士を探す<br />ユーザー</p></div>
            <div className="partner-mobile-hero__node partner-mobile-hero__node--bridge"><Handshake aria-hidden="true" /><p>税理士を探すユーザーと<br />事務所の強みを<br /><span>つなぎます</span></p></div>
            <div className="partner-mobile-hero__node partner-mobile-hero__node--office"><Building2 aria-hidden="true" /><p>税理士・会計<br />事務所さま</p></div>
          </div>
        </section>
        <section className="partner-hero">
          <div className="partner-shell partner-hero__inner">
            <div className="partner-hero__copy">
              <h1>税理士クラウドへの掲載を<br className="partner-hero-title-break" />検討中の税理士・会計事務所さまへ</h1>
              <p>お悩みや強みが伝わる掲載で、税理士を探している<br className="partner-pc" />見込顧客と事務所の強みを届けませんか。</p>
              <div className="partner-hero__actions">
                <ContactButton>無料で問い合わせる</ContactButton>
                <a className="partner-outline-button" href="#merits">掲載の仕組みを見る <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
            <Image className="partner-hero__image" src={heroImage} alt="税理士クラウドの掲載について案内する担当者" priority sizes="(max-width: 760px) 100vw, 660px" />
          </div>
        </section>

        <section className="partner-section partner-concerns" aria-labelledby="concerns-heading">
          <div className="partner-shell">
            <h2 id="concerns-heading">こんなお悩みはありませんか？</h2>
            <div className="partner-concerns__grid">
              {painPoints.map(({ icon: Icon, text }) => <article key={String(text)} className="partner-concern"><Icon /><p>{text}</p></article>)}
            </div>
            <div className="partner-cta-band"><p>掲載のご相談は無料です</p><ContactButton /></div>
          </div>
        </section>

        <section id="merits" className="partner-section partner-merits" aria-labelledby="merits-heading">
          <div className="partner-merits__shell">
            <h2 id="merits-heading">税理士クラウドに<span className="partner-merits__title-break"><br /></span>掲載する<span>メリット</span></h2>
            <div className="partner-merits__grid">
              <article className="partner-merit partner-merit--finder">
                <h3><span>1</span>エリア別・相談内容別で<br />事務所を見つけてもらえる</h3>
                <div className="partner-merit__demo partner-search-demo" aria-label="エリアと相談内容から事務所を検索する画面イメージ">
                  <div className="partner-search-demo__item"><MapPin aria-hidden="true" /><span>エリアから探す</span><ChevronDown aria-hidden="true" /></div>
                  <div className="partner-search-demo__item"><MessageCircleMore aria-hidden="true" /><span>相談内容から探す</span><ChevronDown aria-hidden="true" /></div>
                  <div className="partner-search-demo__item"><Building2 aria-hidden="true" /><span>事務所の特徴から探す</span><ChevronDown aria-hidden="true" /></div>
                  <div className="partner-map-demo"><MapPin aria-hidden="true" /></div>
                </div>
              </article>

              <article className="partner-merit partner-merit--profile">
                <h3><span>2</span>事務所の得意分野・対応業務を整理して掲載できる</h3>
                <div className="partner-merit__demo partner-profile-demo" aria-label="事務所情報の掲載イメージ">
                  <strong>○○税理士事務所</strong>
                  <div className="partner-profile-demo__content">
                    <div>
                      <p>得意分野</p>
                      <ul><li>相続税</li><li>会社設立</li><li>クラウド会計</li></ul>
                      <p>対応業務</p>
                      <ul><li>税務顧問・申告</li><li>記帳代行</li><li>資金調達支援</li></ul>
                    </div>
                    <div className="partner-profile-demo__photo"><Image src={officeImage} alt="" fill sizes="(max-width: 680px) 120px, 190px" /></div>
                  </div>
                </div>
              </article>

              <article className="partner-merit partner-merit--features">
                <h3><span>3</span>検討中のユーザーに強みを<br />わかりやすく伝えられる</h3>
                <div className="partner-merit__demo partner-feature-demo" aria-label="強みや注力分野の掲載イメージ">
                  <p>強み・特長</p>
                  <div className="partner-feature-demo__chips"><span>クラウド会計に強い</span><span>相続税申告300件以上の実績</span><span>初回相談無料</span></div>
                  <p>注力分野</p>
                  <div className="partner-feature-demo__fields"><span><Cloud aria-hidden="true" />クラウド会計</span><span><Users aria-hidden="true" />相続・事業承継</span><span><Building2 aria-hidden="true" />会社設立</span></div>
                  <div className="partner-feature-demo__note"><Lightbulb aria-hidden="true" />比較検討に役立つ情報をひと目で確認できます</div>
                </div>
              </article>

              <article className="partner-merit partner-merit--contact">
                <h3><span>4</span>専属コーディネーターが最適なマッチングをサポート</h3>
                <div className="partner-merit__demo partner-coordinator-demo" aria-label="専属コーディネーターによるマッチングサポートのイメージ">
                  <div className="partner-coordinator-demo__person">
                    <div className="partner-coordinator-demo__portrait"><Image src={coordinatorIllustration} alt="専属コーディネーターのイラスト" fill sizes="180px" /></div>
                    <strong>専属<br />コーディネーター</strong>
                    <p>相談内容や事務所の強みをふまえて、相性の良い見込み顧客との接点づくりをサポート</p>
                  </div>
                  <ArrowRight className="partner-coordinator-demo__arrow" aria-hidden="true" />
                  <div className="partner-coordinator-demo__leads"><strong>条件に合う<br />見込み顧客をご紹介</strong><ul><li><Users aria-hidden="true" />会社設立の相談</li><li><Users aria-hidden="true" />相続税の相談</li><li><Users aria-hidden="true" />事業承継の相談</li></ul></div>
                  <div className="partner-coordinator-demo__benefits"><span><Target aria-hidden="true" />得意分野に合う相談とつながる</span><span><Handshake aria-hidden="true" />ミスマッチを減らせる</span><span><ArrowRight aria-hidden="true" />やり取りが<br />スムーズ</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="partner-section partner-recommended" aria-labelledby="recommended-heading">
          <div className="partner-shell">
            <h2 id="recommended-heading">こんな事務所におすすめです</h2>
            <div className="partner-recommended__grid">
              {recommended.map(({ icon: Icon, text }) => <article key={String(text)}><span><Icon /></span><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="partner-section partner-preview" aria-labelledby="preview-heading">
          <div className="partner-preview__layout">
            <div className="partner-preview__intro">
              <p className="partner-preview__label" id="preview-heading">掲載イメージ</p>
              <h2>事務所の強みをわかりやすく掲載できます</h2>
              <p>対応エリアや得意分野、サービス内容などを<br />整理して掲載できるため、<br />ユーザーに正確に情報を伝え、信頼獲得と<br />問い合わせにつなげます。</p>
              <ul>
                <li><Check aria-hidden="true" />事務所の基本情報を見やすく表示</li>
                <li><Check aria-hidden="true" />対応エリアや得意分野を明確にアピール</li>
                <li><Check aria-hidden="true" />得意なサービスをアイコンで分かりやすく紹介</li>
                <li><Check aria-hidden="true" />信頼につながる情報設計で問い合わせを促進</li>
              </ul>
            </div>
            <div className="partner-listing-preview__sample">
            <article className="partner-listing-preview" aria-label="税理士事務所の掲載ページイメージ">
              <div className="partner-listing-preview__top">
                <div className="partner-listing-preview__photo"><Image src={officeImage} alt="事務所紹介ページのイメージ" fill sizes="(max-width: 900px) 100vw, 360px" /></div>
                <div className="partner-listing-preview__copy"><h3>○○税理士事務所</h3><p className="partner-listing-preview__location"><MapPin aria-hidden="true" />東京都千代田区 ／ 丸の内 徒歩3分</p><p>中小企業の成長を支えるパートナーとして、<br />丁寧でスピーディーなサポートを提供します。</p></div>
                <div className="partner-listing-preview__actions" aria-hidden="true"><span className="partner-listing-preview__action partner-listing-preview__action--primary">○○税理士事務所の詳細を見る</span><span className="partner-listing-preview__action">税理士に関して相談する</span></div>
              </div>
              <div className="partner-listing-preview__tags"><span>相続税</span><span>会社設立</span><span>クラウド会計</span><span>事業承継</span></div>
              <div className="partner-listing-preview__divider" />
              <div className="partner-listing-preview__details">
                <section><h4>対応エリア</h4><p><b>東京都</b>千代田区、中央区、港区、渋谷区 など</p></section>
                <section><h4>得意分野</h4><p className="partner-listing-preview__icon-list"><span><Landmark aria-hidden="true" />相続税</span><span><Building2 aria-hidden="true" />会社設立</span><span><Cloud aria-hidden="true" />クラウド会計</span><span><Users aria-hidden="true" />事業承継</span></p></section>
              </div>
              <div className="partner-listing-preview__divider" />
              <div className="partner-listing-preview__bottom">
                <section><h4>対応業務</h4><p className="partner-listing-preview__icon-list"><span><FileText aria-hidden="true" />税務顧問・申告</span><span><ClipboardList aria-hidden="true" />記帳代行</span><span><Landmark aria-hidden="true" />相続税申告</span><span><HeartHandshake aria-hidden="true" />資金調達支援</span></p></section>
                <aside><h4><ShieldCheck aria-hidden="true" />安心のサポート体制</h4><p>初回相談は無料で対応しております。<br />お気軽にご相談ください。</p></aside>
              </div>
            </article>
            <p className="partner-listing-preview__note">※上記はイメージです。タイミングにより形式が異なる場合がございます。</p>
            </div>
          </div>
        </section>

        <section id="flow" className="partner-section partner-flow" aria-labelledby="flow-heading">
          <div className="partner-shell"><h2 id="flow-heading">掲載までの流れ</h2><div className="partner-flow__steps">
            <article><span>1</span><Mail /><div><h3>お問い合わせ</h3><p>フォームやメールからお気軽にご連絡ください。</p></div></article>
            <article><span>2</span><ClipboardList /><div><h3>掲載内容のヒアリング</h3><p>担当者よりご連絡し、掲載内容を丁寧に確認します。</p></div></article>
            <article><span>3</span><FileCheck2 /><div><h3>掲載開始・公開</h3><p>審査・確認後、専用ページを公開いたします。</p></div></article>
          </div><div className="partner-cta-band"><p>掲載のご相談は無料です</p><ContactButton /></div></div>
        </section>

        <section id="faq" className="partner-section partner-faq" aria-labelledby="faq-heading">
          <div className="partner-shell"><h2 id="faq-heading">よくある質問</h2><div className="partner-faq__grid">
            {faqs.map(([question, answer], index) => <article className={openFaq === index ? "is-open" : ""} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span><CircleHelp />{question}</span><ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</article>)}
          </div></div>
        </section>

        <section id="contact" className="partner-contact" aria-labelledby="contact-heading">
          <div className="partner-shell partner-contact__inner">
            <div className="partner-contact__copy"><p className="partner-eyebrow">CONTACT</p><h2 id="contact-heading">掲載をご希望の方は、<br />お気軽にお問い合わせください。</h2><p>担当者よりご連絡し、掲載のご案内や資料を<br className="partner-sp" />ご送付させていただきます。</p><small>※営業目的でのお問い合わせはご遠慮ください。</small></div>
            <form className="partner-contact__form" onSubmit={submit}>
              <label>事務所名<span className="partner-form__required">必須</span><input required value={form.officeName} onChange={(event) => setForm({ ...form, officeName: event.target.value })} placeholder="例）○○税理士事務所" /></label>
              <label>ご担当者名<span className="partner-form__required">必須</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="例）山田 太郎" /></label>
              <label>メールアドレス<span className="partner-form__required">必須</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="例）info@example.com" /></label>
              <label>電話番号<span className="partner-form__required">必須</span><input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="例）03-1234-5678" /></label>
              <label className="partner-contact__message">お問い合わせ内容<span className="partner-form__optional">任意</span><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="掲載について詳しく知りたい" rows={3} /></label>
              {error && <p className="partner-contact__error">{error}</p>}
              <button type="submit" className="partner-button" disabled={status === "sending"}>{status === "sending" ? "送信中..." : "無料で問い合わせる"}<ArrowRight /></button>
            </form>
          </div>
        </section>
      </main>
      <GlobalFooter showPartnerRecruitment={false} />

      <style jsx global>{`
        .partner-page { --blue: #075bc7; --ink: #10233f; --pale: #eef7ff; color: var(--ink); background: #fff; overflow: hidden; font-family: "Noto Sans JP", sans-serif; }
        .partner-sp { display:none; }
        .partner-shell { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
        .partner-header { height: 76px; background: rgba(255,255,255,.96); position: sticky; top: 0; z-index: 20; border-bottom: 1px solid #eaf0f8; box-shadow: 0 2px 12px rgba(15,53,101,.04); }
        .partner-header__inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
        .partner-brand { display:flex; align-items:center; gap:7px; }
        .partner-brand :global(img:first-child) { object-fit: contain; }
        .partner-nav { display:flex; align-items:center; gap:30px; font-size: 13px; font-weight: 700; }
        .partner-nav > a:not(.partner-button) { color: var(--ink); text-decoration:none; }
        .partner-nav > a:not(.partner-button):hover { color: var(--blue); }
        .partner-button, .partner-outline-button { min-height: 48px; padding: 0 26px; border-radius: 6px; display: inline-flex; align-items:center; justify-content:center; gap: 16px; border: 1px solid transparent; font-size: 14px; line-height: 1.3; font-weight: 700; text-decoration:none; transition: transform .2s, box-shadow .2s, background .2s; }
        .partner-button { color: #fff; background: linear-gradient(105deg,#0969d8,#064cad); box-shadow: 0 7px 14px rgba(2,73,166,.17); }
        .partner-button:hover { color:#fff; transform: translateY(-1px); box-shadow: 0 10px 18px rgba(2,73,166,.24); }
        .partner-button :global(svg), .partner-outline-button :global(svg) { width: 16px; height: 16px; }
        .partner-nav__cta { min-height: 40px; padding:0 17px; font-size: 12px; gap:0; }
        .partner-nav__cta :global(svg) { display:none; }
        .partner-hero { background: linear-gradient(105deg,#fff 0%,#fff 42%,#f0f8ff 100%); position: relative; min-height: 474px; }
        .partner-hero::before { content:""; position:absolute; width:780px; height:780px; left:calc(50% - 640px); top:-500px; border:1px solid rgba(8,102,212,.1); border-radius:50%; box-shadow: 0 0 0 60px rgba(103,181,255,.04), 0 0 0 135px rgba(103,181,255,.035); }
        .partner-hero__inner { min-height:474px; position:relative; display:flex; align-items:center; }
        .partner-hero__copy { position:relative; z-index:2; padding: 44px 0 54px; }
        .partner-eyebrow { color:var(--blue); font-size: 13px; font-weight: 700; letter-spacing:.08em; margin:0 0 11px; }
        .partner-hero h1 { font-family: inherit; font-size: clamp(28px,3vw,42px); line-height:1.42; letter-spacing:.04em; margin:0; font-weight: 800; }
        .partner-hero__copy > p:not(.partner-eyebrow) { font-weight:600; font-size:16px; line-height:2; margin:17px 0 28px; }
        .partner-hero__actions { display:flex; gap:14px; }
        .partner-outline-button { color:var(--blue); border-color:#1975de; background:rgba(255,255,255,.78); }
        .partner-outline-button:hover { color:var(--blue); background:#fff; }
        .partner-hero__image { position:absolute; z-index:1; right:-70px; bottom:0; height:100%; width:auto; max-width:68%; object-fit:cover; object-position:right center; mix-blend-mode:multiply; }
        .partner-section { padding: 66px 0; }
        .partner-section h2 { font-family:inherit; text-align:center; font-weight:800; letter-spacing:.06em; font-size:clamp(22px,2.3vw,30px); margin:0 0 34px; }
        .partner-section h2::after { content:""; display:block; width:34px; height:3px; border-radius:2px; background:#2184e9; margin:11px auto 0; }
        .partner-concerns { padding-top:55px; background:linear-gradient(174deg,#fff 0%,#fff 8%,#f7fbff 9%,#fff 100%); }
        .partner-concerns__grid, .partner-recommended__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:13px; }
        .partner-concern { min-height:166px; padding:22px 14px 17px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; background:#fff; border-radius:5px; box-shadow:0 5px 18px rgba(25,75,139,.09); }
        .partner-concern :global(svg) { color:#0874ed; width:52px; height:52px; stroke-width:1.6; margin-bottom:14px; }
        .partner-concern p, .partner-recommended p { margin:0; font-size:14px; line-height:1.65; font-weight:700; }
        .partner-cta-band { margin-top:25px; padding:12px 20px; min-height:66px; display:flex; align-items:center; justify-content:center; gap:55px; background:linear-gradient(100deg,#e2f1ff,#edf7ff); border-radius:6px; }
        .partner-cta-band p { margin:0; font-weight:700; font-size:14px; }
        .partner-cta-band .partner-button { min-width:370px; min-height:44px; font-size:13px; }
        .partner-merits { background:linear-gradient(180deg,#fff,#f8fbff 65%,#fff); }
        .partner-merits__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .partner-merit { min-height:300px; padding:15px 13px; border:1px solid #e6eef8; border-radius:6px; background:#fff; box-shadow:0 6px 20px rgba(25,75,139,.07); }
        .partner-merit__heading { display:grid; grid-template-columns:27px 21px 1fr; gap:7px; align-items:start; margin-bottom:14px; }
        .partner-merit__heading > span { background:#1166ca; color:#fff; width:23px; height:23px; border-radius:50%; display:grid; place-items:center; font-size:11px; font-weight:700; }
        .partner-merit__heading :global(svg) { color:#0b65ce; width:20px; height:20px; }
        .partner-merit h3 { white-space:pre-line; margin:0; font-size:12px; line-height:1.55; color:#075bc7; font-weight:800; }
        .partner-mini-search, .partner-mini-contact { display:flex; flex-direction:column; gap:5px; padding:7px; background:#f9fbfe; font-size:9px; }
        .partner-mini-search b { font-size:9px; }
        .partner-mini-search span, .partner-mini-contact span { background:#fff; border:1px solid #dfe9f5; border-radius:3px; padding:6px; color:#60718a; }
        .partner-mini-search button, .partner-mini-contact button { border:0; border-radius:3px; padding:7px; color:#fff; background:#0d63ca; font-weight:700; font-size:10px; }
        .partner-mini-profile { display:grid; grid-template-columns:74px 1fr; gap:8px; font-size:10px; line-height:1.5; }
        .partner-mini-profile__photo { height:90px; border-radius:3px; background:linear-gradient(140deg,#a4c6e7,#f7fafc 55%,#4f7aa5); }
        .partner-mini-profile strong { font-size:11px; display:block; margin-bottom:7px; }.partner-mini-profile small { color:#0c67cc; font-weight:700; }.partner-mini-profile p { margin:3px 0; }
        .partner-mini-contact { margin-top:10px; }.partner-mini-contact strong { color:#15213a; font-size:10px; }
        .partner-recommended { padding-top:45px; background:#fff; }.partner-recommended__grid article { min-height:144px; padding:15px; display:flex; flex-direction:column; align-items:center; text-align:center; background:#fff; box-shadow:0 5px 18px rgba(25,75,139,.08); border-radius:5px; }.partner-recommended__grid article > span { width:57px; height:57px; display:grid; place-items:center; border-radius:50%; background:#eff7ff; color:#1680eb; margin-bottom:10px; }.partner-recommended__grid :global(svg) { width:31px; height:31px; stroke-width:1.55; }
        .partner-preview { padding-top:38px; background:linear-gradient(180deg,#fff,#f9fcff); }.partner-preview > .partner-shell { display:grid; grid-template-columns:206px 1fr; gap:23px; align-items:start; }.partner-preview__intro h2 { text-align:left; font-size:25px; margin-bottom:12px; }.partner-preview__intro h2::after { margin-left:0; }.partner-preview__intro p { font-size:11px; line-height:1.8; }.partner-preview__intro ul { list-style:none; padding:0; margin:16px 0; font-size:11px; line-height:2; }.partner-preview__intro li::before { content:"✓"; color:#1680eb; font-weight:800; padding-right:7px; }
        .partner-flow { padding-top:54px; }.partner-flow__steps { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid #dbe9f8; border-radius:5px; overflow:hidden; }.partner-flow__steps article { min-height:132px; padding:22px 15px 16px; position:relative; display:flex; justify-content:center; gap:14px; border-right:1px solid #dbe9f8; }.partner-flow__steps article:last-child { border-right:0; }.partner-flow__steps article > span { position:absolute; top:-14px; left:50%; transform:translateX(-50%); width:28px; height:28px; border-radius:50%; display:grid; place-items:center; color:#fff; font-size:13px; font-weight:700; background:#0b66cf; }.partner-flow__steps :global(svg) { width:45px; height:45px; color:#0d76e7; stroke-width:1.35; flex:none; }.partner-flow__steps h3 { color:#0864ca; margin:1px 0 5px; font-size:13px; }.partner-flow__steps p { margin:0; font-size:11px; line-height:1.65; }
        .partner-faq { padding-top:44px; background:linear-gradient(180deg,#fff,#f8fbff); }.partner-faq__grid { display:grid; grid-template-columns:1fr 1fr; gap:7px 14px; }.partner-faq__grid article { border:1px solid #e3ebf5; border-radius:5px; background:#fff; overflow:hidden; }.partner-faq__grid button { border:0; background:none; width:100%; display:flex; align-items:center; justify-content:space-between; padding:13px 15px; color:#17243a; text-align:left; font-size:12px; font-weight:600; }.partner-faq__grid button span { display:flex; align-items:center; gap:9px; }.partner-faq__grid button :global(svg) { width:16px; color:#096bd5; flex:none; }.partner-faq__grid button > :global(svg) { transition:transform .2s; }.partner-faq__grid .is-open button > :global(svg) { transform:rotate(180deg); }.partner-faq__grid p { padding:0 15px 13px 40px; margin:0; color:#52647c; font-size:12px; line-height:1.7; }
        .partner-contact { padding:48px 0; background:linear-gradient(120deg,#e6f3ff,#f5faff); }.partner-contact__inner { display:grid; grid-template-columns:1.03fr 1fr; gap:38px; align-items:center; }.partner-contact__copy h2 { text-align:left; font-family:inherit; color:#095fc2; font-size:22px; line-height:1.65; letter-spacing:.04em; margin:0 0 15px; font-weight:800; }.partner-contact__copy h2::after { display:none; }.partner-contact__copy > p:not(.partner-eyebrow) { font-size:13px; line-height:1.9; margin:0 0 17px; font-weight:600; }.partner-contact__copy small { font-size:11px; }.partner-contact__form { padding:17px; display:grid; grid-template-columns:1fr 1fr; gap:10px; background:#fff; border-radius:6px; box-shadow:0 6px 20px rgba(29,86,155,.10); }.partner-contact__form label { font-size:10px; font-weight:700; }.partner-form__required,.partner-form__optional { display:inline-block; margin-left:7px; padding:1px 5px; border-radius:3px; vertical-align:1px; font-size:9px; font-weight:800; line-height:1.3; }.partner-form__required { color:#fff; background:#d92d20; }.partner-form__optional { color:#52647c; background:#e9eff6; }.partner-contact__form input, .partner-contact__form textarea { width:100%; display:block; box-sizing:border-box; margin-top:4px; padding:8px 9px; color:#19273d; border:1px solid #dce6f1; border-radius:3px; font:inherit; font-size:12px; outline-color:#1574de; background:#fff; }.partner-contact__form textarea { resize:vertical; }.partner-contact__message, .partner-contact__form .partner-button, .partner-contact__error { grid-column:span 2; }.partner-contact__form .partner-button { border:0; min-height:45px; }.partner-contact__form .partner-button:disabled { cursor:wait; opacity:.7; }.partner-contact__error { color:#d92d20; font-size:11px; margin:0; }
        @media (max-width: 900px) { .partner-hero__image { right:-160px; max-width:75%; opacity:.72; }.partner-merits__grid { grid-template-columns:repeat(2,1fr); }.partner-preview > .partner-shell { grid-template-columns:1fr; }.partner-preview__intro { text-align:center; }.partner-preview__intro h2 { text-align:center; }.partner-preview__intro h2::after { margin-left:auto; }.partner-preview__intro ul { display:inline-block; text-align:left; } }
        @media (max-width: 680px) { .partner-shell { width:min(100% - 30px, 540px); }.partner-header { height:62px; }.partner-brand :global(img:first-child) { width:27px; height:27px; }.partner-brand :global(img:last-child) { width:113px; height:auto; }.partner-nav { gap:0; }.partner-nav > a:not(.partner-button) { display:none; }.partner-nav__cta { min-height:34px; padding:0 10px; font-size:10px; }.partner-hero { min-height:545px; background:linear-gradient(154deg,#fff,#eff8ff); }.partner-hero__inner { min-height:545px; align-items:flex-start; }.partner-hero__copy { padding:43px 0 0; }.partner-eyebrow { font-size:11px; }.partner-hero h1 { font-size:27px; line-height:1.47; letter-spacing:.01em; }.partner-hero__copy > p:not(.partner-eyebrow) { font-size:14px; line-height:1.85; margin:13px 0 20px; }.partner-hero__image { right:-132px; bottom:0; height:53%; max-width:none; width:auto; opacity:.62; }.partner-hero__actions { flex-direction:column; width: min(100%, 280px); gap:8px; }.partner-button, .partner-outline-button { min-height:45px; font-size:13px; padding:0 18px; }.partner-section { padding:48px 0; }.partner-section h2 { margin-bottom:25px; font-size:21px; }.partner-concerns { padding-top:43px; }.partner-concerns__grid, .partner-recommended__grid { grid-template-columns:1fr 1fr; gap:9px; }.partner-concern { min-height:131px; padding:14px 8px; }.partner-concern :global(svg) { width:40px; height:40px; margin-bottom:9px; }.partner-concern p, .partner-recommended p { font-size:12px; }.partner-cta-band { margin-top:16px; padding:14px; flex-direction:column; gap:11px; }.partner-cta-band p { font-size:12px; }.partner-cta-band .partner-button { min-width:0; width:100%; }.partner-merits__grid { gap:9px; }.partner-merit { min-height:259px; padding:11px 9px; }.partner-merit__heading { grid-template-columns:22px 18px 1fr; gap:4px; }.partner-merit__heading > span { width:19px; height:19px; font-size:9px; }.partner-merit__heading :global(svg) { width:17px; height:17px; }.partner-merit h3 { font-size:10px; }.partner-mini-profile { grid-template-columns:52px 1fr; font-size:9px; }.partner-mini-profile__photo { height:72px; }.partner-mini-profile strong { font-size:9px; }.partner-recommended { padding-top:35px; }.partner-recommended__grid article { min-height:126px; padding:12px 5px; }.partner-recommended__grid article > span { width:45px; height:45px; }.partner-recommended__grid :global(svg) { width:25px; height:25px; }.partner-preview > .partner-shell { gap:5px; }.partner-preview__intro h2 { font-size:21px; }.partner-office-card { grid-template-columns:1fr; padding:14px; gap:12px; }.partner-office-card__photo { height:150px; }.partner-office-card__name { font-size:18px; }.partner-office-card__side { grid-column:auto; display:block; }.partner-office-card__side a { margin-bottom:12px; }.partner-office-card__side h3 { margin-top:12px; }.partner-flow__steps { grid-template-columns:1fr; }.partner-flow__steps article { min-height:105px; padding:22px 18px 13px; border-right:0; border-bottom:1px solid #dbe9f8; justify-content:flex-start; }.partner-flow__steps article:last-child { border-bottom:0; }.partner-flow__steps article > span { left:22px; transform:none; }.partner-faq__grid { grid-template-columns:1fr; gap:7px; }.partner-faq__grid button { font-size:11px; padding:12px; }.partner-faq__grid p { font-size:11px; padding-left:36px; }.partner-contact { padding:42px 0; }.partner-contact__inner { grid-template-columns:1fr; gap:23px; }.partner-contact__copy { text-align:center; }.partner-contact__copy h2 { text-align:center; font-size:19px; }.partner-contact__copy > p:not(.partner-eyebrow) { font-size:12px; }.partner-contact__form { gap:9px; padding:14px; }.partner-pc { display:none; } }
      `}</style>
      <style jsx global>{`
        /* Design reference alignment: one compact visual system from the hero through the inquiry form. */
        .partner-page { --blue:#075cc8; --navy:#101f38; --line:#dceafa; --pale:#f4f9ff; background:#fff; }
        .partner-shell { width:min(1160px, calc(100% - 48px)); }
        .partner-header { position:relative; height:64px; box-shadow:0 1px 10px rgba(24,80,145,.06); }
        .partner-brand { gap:6px; }.partner-brand :global(img:first-child) { width:31px; height:31px; }.partner-brand :global(img:last-child) { width:130px; height:auto; }
        .partner-nav { gap:31px; font-size:12px; }.partner-nav__cta { min-height:38px; padding:0 18px; font-size:11px; border-radius:5px; }
        .partner-hero { min-height:548px; background:#f7fbff; isolation:isolate; }
        .partner-hero::before { width:720px; height:720px; top:-500px; left:calc(50% - 650px); border-color:rgba(32,119,227,.14); box-shadow:0 0 0 75px rgba(129,197,255,.045),0 0 0 150px rgba(129,197,255,.035); }
        .partner-hero__inner { min-height:548px; }
        .partner-hero__copy { width:52%; min-width:0; padding:30px 0 38px; }
        .partner-hero h1 { font-size:clamp(30px,2.25vw,38px); line-height:1.47; letter-spacing:.035em; white-space:nowrap; }
        .partner-hero__copy > p:not(.partner-eyebrow) { font-size:15px; line-height:1.9; margin:17px 0 27px; }
        .partner-hero__actions { gap:12px; }.partner-button,.partner-outline-button { min-height:45px; padding:0 25px; border-radius:5px; font-size:13px; }.partner-button { background:linear-gradient(110deg,#096bd6,#0755bc); box-shadow:0 6px 14px rgba(2,84,189,.18); }.partner-outline-button { background:#fff; }
        .partner-hero__image { position:absolute; z-index:0; inset:auto -50px 0 auto; width:min(64vw, 980px); max-width:none; height:auto; object-fit:contain; object-position:right bottom; mix-blend-mode:normal; }
        .partner-hero::after { content:""; position:absolute; inset:0; z-index:1; background:linear-gradient(90deg,rgba(255,255,255,.92) 0%,rgba(255,255,255,.76) 40%,rgba(255,255,255,.08) 59%,rgba(255,255,255,0) 100%); pointer-events:none; }
        .partner-hero__copy { z-index:2; }
        .partner-section { padding:57px 0; }.partner-section h2 { font-size:25px; letter-spacing:.055em; margin-bottom:28px; }.partner-section h2::after { width:28px; height:2px; margin-top:9px; }
        .partner-concerns { padding-top:48px; background:linear-gradient(174deg,#fff 0,#fff 7%,#f7fbff 7.2%,#fff 100%); }.partner-concerns__grid,.partner-recommended__grid { gap:16px; }
        .partner-concern { min-height:151px; padding:17px 12px 15px; border:1px solid #edf3fa; border-radius:6px; box-shadow:0 6px 20px rgba(18,74,140,.095); }.partner-concern :global(svg) { width:47px; height:47px; margin-bottom:10px; stroke-width:1.55; }.partner-concern p,.partner-recommended p { font-size:13px; line-height:1.65; }
        .partner-cta-band { min-height:65px; margin-top:22px; gap:55px; padding:10px 22px; border-radius:5px; background:linear-gradient(90deg,#e5f2ff,#f0f8ff); }.partner-cta-band p { font-size:13px; }.partner-cta-band .partner-button { min-width:410px; min-height:43px; }
        .partner-merits { padding-top:47px; background:linear-gradient(180deg,#fff,#f8fbff 72%,#fff); }.partner-merits__grid { gap:16px; }.partner-merit { min-height:280px; padding:15px; border-color:#e4edf8; border-radius:6px; box-shadow:0 7px 19px rgba(18,74,140,.08); }.partner-merit__heading { grid-template-columns:25px 20px 1fr; gap:6px; margin-bottom:12px; }.partner-merit__heading > span { width:22px; height:22px; font-size:10px; }.partner-merit h3 { font-size:11px; line-height:1.55; }
        .partner-mini-search,.partner-mini-contact { gap:4px; padding:8px; font-size:9px; border:1px solid #eef3f8; border-radius:3px; }.partner-mini-search span,.partner-mini-contact span { padding:5px 6px; }.partner-mini-search button,.partner-mini-contact button { padding:6px; }.partner-mini-profile { grid-template-columns:76px 1fr; }.partner-mini-profile__photo { height:91px; background:linear-gradient(145deg,#b8d8ed 0%,#eaf5fb 45%,#477a9f 46%,#7eb0d3 100%); }.partner-mini-contact { margin-top:0; min-height:119px; }
        .partner-recommended { padding-top:42px; }.partner-recommended__grid article { min-height:142px; padding:15px 12px; border:1px solid #edf3fa; box-shadow:0 6px 18px rgba(18,74,140,.09); }.partner-recommended__grid article > span { width:58px; height:58px; margin-bottom:9px; }.partner-recommended__grid :global(svg) { width:32px; height:32px; }
        .partner-preview { padding:45px 0 55px; background:linear-gradient(180deg,#fff,#f9fcff); }.partner-preview > .partner-shell { grid-template-columns:220px 1fr; gap:27px; }.partner-preview__intro h2 { font-size:23px; }.partner-preview__intro p,.partner-preview__intro ul { font-size:11px; }
        .partner-flow { padding-top:49px; }.partner-flow__steps { overflow:visible; }.partner-flow__steps article { min-height:142px; padding:48px 17px 17px; }.partner-flow__steps article > span { top:-15px; }.partner-flow__steps :global(svg) { width:45px; height:45px; }.partner-flow__steps h3 { font-size:12px; }.partner-flow__steps p { font-size:10px; }
        .partner-flow__steps h3 { color:#075bc7; font-size:15px; font-weight:800; }.partner-flow__steps p { color:#20324b; font-size:12px; font-weight:600; line-height:1.75; }
        .partner-faq { padding-top:42px; }.partner-faq__grid { gap:8px 16px; }.partner-faq__grid button { min-height:43px; padding:11px 13px; font-size:11px; }
        .partner-contact { padding:66px 0 74px; background:linear-gradient(130deg,#e6f3ff,#f4f9ff); }.partner-contact__inner { display:block; max-width:1000px; }.partner-contact__copy { text-align:center; }.partner-contact__copy .partner-eyebrow { margin-bottom:8px; }.partner-contact__copy h2 { text-align:center; font-size:26px; line-height:1.55; margin-bottom:9px; }.partner-contact__copy > p:not(.partner-eyebrow) { font-size:15px; margin-bottom:12px; }.partner-contact__form { max-width:850px; margin:28px auto 0; padding:30px; gap:16px; border-radius:10px; box-shadow:0 18px 38px rgba(29,86,155,.15); }.partner-contact__form label { font-size:12px; }.partner-contact__form input,.partner-contact__form textarea { min-height:46px; padding:11px 13px; font-size:14px; }.partner-contact__form textarea { min-height:112px; }.partner-contact__form .partner-button { min-height:56px; font-size:16px; }
        .partner-button,.partner-outline-button { white-space:nowrap; flex-wrap:nowrap; }.partner-cta-band .partner-button { white-space:nowrap; }
        @media (max-width:900px) { .partner-hero__copy { width:57%; }.partner-hero__image { right:-115px; width:680px; } }
        @media (max-width:680px) { .partner-shell { width:min(100% - 30px, 540px); }.partner-header { height:59px; }.partner-brand :global(img:first-child) { width:27px; height:27px; }.partner-brand :global(img:last-child) { width:110px; }.partner-nav__cta { min-height:33px; padding:0 9px; font-size:10px; }.partner-hero { min-height:545px; }.partner-hero::before { width:430px; height:430px; top:-320px; left:-300px; }.partner-hero::after { background:linear-gradient(155deg,rgba(255,255,255,.96) 0%,rgba(255,255,255,.82) 51%,rgba(255,255,255,.12) 100%); }.partner-hero__inner { min-height:545px; align-items:flex-start; }.partner-hero__copy { width:100%; padding:41px 0 0; }.partner-hero h1 { max-width:305px; font-size:26px; line-height:1.48; white-space:normal; }.partner-hero__copy > p:not(.partner-eyebrow) { max-width:306px; font-size:13px; line-height:1.85; margin:14px 0 19px; }.partner-hero__image { inset:auto -175px 0 auto; width:610px; max-width:none; height:auto; aspect-ratio:1672/941; object-fit:contain; object-position:right bottom; opacity:1; }.partner-hero__actions { width:268px; }.partner-section { padding:45px 0; }.partner-section h2 { font-size:20px; margin-bottom:24px; }.partner-concerns { padding-top:39px; }.partner-concerns__grid,.partner-recommended__grid { gap:9px; }.partner-concern { min-height:127px; }.partner-concern :global(svg) { width:38px; height:38px; }.partner-concern p,.partner-recommended p { font-size:11px; }.partner-cta-band { gap:10px; }.partner-merits { padding-top:41px; }.partner-merits__grid { gap:9px; }.partner-merit { min-height:254px; padding:10px 8px; }.partner-mini-profile { grid-template-columns:48px 1fr; }.partner-mini-profile__photo { height:70px; }.partner-preview > .partner-shell { gap:8px; }.partner-contact { padding:47px 0; }.partner-contact__copy h2 { font-size:19px; }.partner-contact__copy > p:not(.partner-eyebrow) { font-size:12px; }.partner-contact__form { grid-template-columns:1fr; margin-top:21px; padding:18px; gap:11px; }.partner-contact__form input,.partner-contact__form textarea { min-height:42px; }.partner-contact__message,.partner-contact__form .partner-button,.partner-contact__error { grid-column:auto; } }
      `}</style>
      <style jsx global>{`
        /* Partner page reference layout: merits and listing preview */
        .partner-merits { padding:78px 0 84px; background:linear-gradient(180deg,#fff 0%,#f7fbff 72%,#fff 100%); }
        .partner-merits__shell { width:min(1160px, calc(100% - 48px)); margin:0 auto; }
        .partner-merits h2 { margin:0 0 39px; color:#10233f; font-size:clamp(29px,2.35vw,46px); line-height:1.24; letter-spacing:.045em; }
        .partner-merits h2 span { color:#075bc7; }
        .partner-merits h2::after { width:51px; height:4px; margin-top:22px; background:#075bc7; }
        .partner-merits__grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:24px; }
        .partner-merit { min-height:524px; box-sizing:border-box; padding:34px 27px 27px; border:0; border-radius:20px; background:#fff; box-shadow:0 7px 26px rgba(35,84,140,.13); }
        .partner-merit h3 { display:flex; align-items:flex-start; gap:16px; margin:0 0 28px; color:#075bc7; font-size:clamp(16px,1.3vw,25px); font-weight:800; line-height:1.52; letter-spacing:.025em; }
        .partner-merit h3 > span { display:grid; flex:0 0 auto; place-items:center; width:50px; height:50px; margin-top:0; border-radius:50%; color:#fff; background:linear-gradient(145deg,#126fd7,#0645a2); box-shadow:inset 0 1px 1px rgba(255,255,255,.34); font-size:24px; font-weight:800; line-height:1; }
        .partner-merit__demo { box-sizing:border-box; width:100%; min-height:348px; padding:25px; border:2px solid #d9e6f4; border-radius:10px; background:linear-gradient(145deg,#fff,#fbfdff); color:#172842; }
        .partner-select-demo,.partner-input-demo { display:flex; align-items:center; justify-content:space-between; box-sizing:border-box; min-height:49px; padding:0 15px; border:2px solid #d9e3ef; border-radius:8px; color:#27384e; background:#fff; font-size:16px; font-weight:600; }
        .partner-select-demo :global(svg) { width:22px; height:22px; color:#075bc7; stroke-width:3; }

        .partner-search-demo { padding:22px 24px 0; }
        .partner-search-demo > p,.partner-feature-demo > p,.partner-profile-demo__content p,.partner-inquiry-demo > p { margin:0 0 9px; color:#172842; font-size:16px; font-weight:800; line-height:1.35; }
        .partner-search-demo .partner-select-demo + p { margin-top:25px; }
        .partner-search-demo__footer { display:grid; grid-template-columns:minmax(0,1fr) 1.08fr; gap:19px; align-items:end; margin-top:27px; }
        .partner-search-demo__footer > span,.partner-inquiry-demo__button { display:grid; min-height:58px; place-items:center; border-radius:7px; color:#fff; background:linear-gradient(110deg,#075fce,#084aa8); box-shadow:0 6px 13px rgba(5,72,167,.16); font-size:18px; font-weight:800; }
        .partner-map-demo { position:relative; min-height:102px; overflow:hidden; border-radius:8px; background:linear-gradient(130deg,rgba(210,240,255,.8),rgba(244,249,236,.9)),repeating-linear-gradient(47deg,transparent 0 19px,rgba(77,151,205,.35) 20px 22px,transparent 23px 43px),repeating-linear-gradient(-33deg,transparent 0 24px,rgba(158,202,145,.42) 25px 27px,transparent 28px 54px); }
        .partner-map-demo::before { content:""; position:absolute; width:142%; height:16px; top:43px; left:-19%; transform:rotate(-22deg); background:rgba(255,255,255,.95); box-shadow:0 0 0 2px rgba(204,220,229,.55); }
        .partner-map-demo :global(svg) { position:absolute; z-index:1; top:21px; left:56%; width:48px; height:48px; color:#0765d6; fill:#d7ecff; stroke-width:1.75; filter:drop-shadow(0 4px 2px rgba(12,72,139,.2)); }

        .partner-profile-demo { padding:22px 22px 18px; }
        .partner-profile-demo > strong { display:block; margin:0 0 20px; font-size:22px; line-height:1.2; }
        .partner-profile-demo__content { display:grid; grid-template-columns:minmax(0,1fr) 1fr; gap:17px; }
        .partner-profile-demo__content p { margin-bottom:6px; font-size:15px; }
        .partner-profile-demo__content ul { margin:0 0 21px; padding:0; list-style:none; color:#27384e; font-size:15px; font-weight:600; line-height:1.7; }
        .partner-profile-demo__content li::before { content:"✓"; padding-right:9px; color:#0765d6; font-weight:900; }
        .partner-profile-demo__photo { position:relative; align-self:center; min-height:180px; overflow:hidden; border-radius:9px; }
        .partner-profile-demo__photo :global(img),.partner-listing-preview__photo :global(img) { object-fit:cover; }

        .partner-feature-demo { padding:21px 22px; }
        .partner-feature-demo__chips { display:flex; flex-wrap:wrap; gap:8px; margin:0 0 24px; }
        .partner-feature-demo__chips span { padding:8px 14px; border:2px solid #b8d4f8; border-radius:7px; color:#075bc7; background:#fff; font-size:14px; font-weight:800; line-height:1.1; }
        .partner-feature-demo__fields { display:grid; grid-template-columns:repeat(3,1fr); gap:9px; margin:0 0 17px; }
        .partner-feature-demo__fields span { display:flex; min-height:83px; flex-direction:column; align-items:center; justify-content:center; gap:8px; border:2px solid #c8ddf6; border-radius:8px; color:#1d4e94; text-align:center; font-size:14px; font-weight:800; line-height:1.2; }
        .partner-feature-demo__fields :global(svg) { width:33px; height:33px; color:#0969db; stroke-width:1.7; }
        .partner-feature-demo__note { display:flex; align-items:center; gap:9px; padding:12px 13px; border:2px solid #d4e6fb; border-radius:8px; color:#075bc7; background:#f1f8ff; font-size:14px; font-weight:800; line-height:1.25; }
        .partner-feature-demo__note :global(svg) { width:24px; height:24px; flex:none; color:#1f73df; }

        .partner-inquiry-demo { padding:25px 23px; }
        .partner-inquiry-demo > strong { display:block; margin:0 0 27px; font-size:20px; line-height:1.25; }
        .partner-inquiry-demo > p { margin:18px 0 8px; font-size:15px; }
        .partner-inquiry-demo__button { margin-top:24px; }

        .partner-preview { padding:102px 0 82px; background:linear-gradient(180deg,#fff 0%,#fbfdff 100%); }
        .partner-preview__layout { display:grid; grid-template-columns:minmax(300px,.72fr) minmax(0,1.7fr); gap:42px; align-items:center; width:min(1160px,calc(100% - 48px)); margin:0 auto; }
        .partner-preview__intro { color:#122644; }
        .partner-preview__label { display:inline-flex; align-items:center; min-height:51px; box-sizing:border-box; margin:0 0 35px; padding:0 25px; border-radius:7px; color:#fff; background:linear-gradient(110deg,#075fcd,#074cae); box-shadow:0 6px 12px rgba(2,83,181,.17); font-size:23px; font-weight:800; }
        .partner-preview__intro h2 { margin:0 0 31px; color:#10233f; text-align:left; font-size:clamp(28px,2.1vw,40px); font-weight:800; line-height:1.6; letter-spacing:.045em; }
        .partner-preview__intro h2::after { display:none; }
        .partner-preview__intro > p:not(.partner-preview__label) { margin:0; color:#1a2d4a; font-size:19px; font-weight:600; line-height:2.15; letter-spacing:.025em; }
        .partner-preview__intro ul { display:grid; gap:17px; margin:37px 0 0; padding:26px 25px; list-style:none; border-radius:12px; background:linear-gradient(140deg,#eef6ff,#f8fbff); color:#152b4b; font-size:16px; font-weight:600; line-height:1.35; }
        .partner-preview__intro li { display:flex; align-items:center; gap:13px; }
        .partner-preview__intro li :global(svg) { width:25px; height:25px; flex:none; padding:4px; box-sizing:border-box; border-radius:50%; color:#fff; background:#095bc5; stroke-width:4; }
        .partner-listing-preview { box-sizing:border-box; padding:38px; border:1px solid #e2e9f1; border-radius:19px; background:#fff; box-shadow:0 10px 27px rgba(30,77,132,.14); color:#172842; }
        .partner-listing-preview__top { display:grid; grid-template-columns:310px minmax(0,1fr) 345px; gap:37px; align-items:start; }
        .partner-listing-preview__photo { position:relative; min-height:189px; overflow:hidden; border-radius:10px; }
        .partner-listing-preview__copy h3 { margin:6px 0 16px; color:#090f1d; font-size:clamp(27px,2vw,42px); font-weight:800; line-height:1.2; }
        .partner-listing-preview__copy p { margin:0; font-size:17px; font-weight:600; line-height:1.9; }
        .partner-listing-preview__location { display:flex; align-items:center; gap:8px; margin-bottom:24px !important; color:#233650; }
        .partner-listing-preview__location :global(svg) { width:25px; height:25px; flex:none; color:#075bc7; stroke-width:2.6; }
        .partner-listing-preview__actions { display:grid; gap:14px; }
        .partner-listing-preview__action { display:grid; width:100%; min-height:62px; box-sizing:border-box; place-items:center; border:2px solid #85b0ed; border-radius:9px; color:#075bc7; background:#fff; font:inherit; font-size:18px; font-weight:800; text-decoration:none; }
        .partner-listing-preview__action--primary { border-color:#075bc7; color:#fff; background:linear-gradient(110deg,#075fce,#074cae); box-shadow:0 6px 12px rgba(2,83,181,.14); }
        .partner-listing-preview__tags { display:flex; flex-wrap:wrap; gap:14px; margin:31px 0 31px; }
        .partner-listing-preview__tags span { padding:9px 20px; border:2px solid #b5cff0; border-radius:8px; color:#075bc7; background:#fff; font-size:18px; font-weight:800; line-height:1.1; }
        .partner-listing-preview__divider { height:2px; background:#d7e1ec; }
        .partner-listing-preview__details { display:grid; grid-template-columns:.95fr 1.3fr; padding:24px 0; }
        .partner-listing-preview__details section { padding:0 25px; }
        .partner-listing-preview__details section:first-child { padding-left:0; border-right:2px solid #d7e1ec; }
        .partner-listing-preview h4 { display:flex; align-items:center; gap:10px; margin:0 0 18px; color:#152842; font-size:21px; font-weight:800; line-height:1.2; }
        .partner-listing-preview__details h4::before,.partner-listing-preview__bottom > section h4::before { content:""; width:4px; height:24px; flex:none; background:#075bc7; }
        .partner-listing-preview__details p,.partner-listing-preview__bottom p { margin:0; font-size:16px; font-weight:600; line-height:1.7; }
        .partner-listing-preview__details p > b { display:inline-block; margin-right:22px; padding:7px 19px; border-radius:9px; background:#eef4fc; font-size:16px; }
        .partner-listing-preview__icon-list { display:flex; flex-wrap:wrap; gap:14px 24px; }
        .partner-listing-preview__icon-list span { display:inline-flex; align-items:center; gap:8px; white-space:nowrap; }
        .partner-listing-preview__icon-list :global(svg) { width:28px; height:28px; color:#075bc7; stroke-width:1.9; }
        .partner-listing-preview__bottom { display:grid; grid-template-columns:minmax(0,1.85fr) minmax(300px,1fr); gap:27px; padding-top:24px; }
        .partner-listing-preview__bottom > section { padding-top:10px; }
        .partner-listing-preview__bottom aside { padding:21px 23px; border-radius:10px; background:linear-gradient(135deg,#eff6ff,#f9fbff); }
        .partner-listing-preview__bottom aside h4 { margin-bottom:10px; color:#075bc7; font-size:18px; }
        .partner-listing-preview__bottom aside h4 :global(svg) { width:30px; height:30px; stroke-width:1.8; }
        .partner-listing-preview__bottom aside p { font-size:15px; line-height:1.7; }

        /* Keep these two information-dense sections only slightly wider than the common 1160px shell. */
        .partner-merits__shell { width:min(1360px,calc(100% - 48px)); }
        .partner-merits h2 { font-size:38px; }.partner-merits h2::after { width:42px; height:3px; margin-top:16px; }
        .partner-merit { min-height:474px; padding:25px 20px 20px; border-radius:15px; }.partner-merit h3 { gap:12px; margin-bottom:20px; font-size:18px; }.partner-merit h3 > span { width:41px; height:41px; font-size:19px; }.partner-merit__demo { min-height:326px; padding:19px; border-radius:8px; }.partner-select-demo,.partner-input-demo { min-height:42px; padding:0 12px; border-width:1px; border-radius:6px; font-size:13px; }.partner-select-demo :global(svg) { width:18px; height:18px; }.partner-search-demo { padding:19px 20px 0; }.partner-search-demo > p,.partner-feature-demo > p,.partner-profile-demo__content p,.partner-inquiry-demo > p { font-size:13px; }.partner-search-demo .partner-select-demo + p { margin-top:19px; }.partner-search-demo__footer { gap:12px; margin-top:21px; }.partner-search-demo__footer > span,.partner-inquiry-demo__button { min-height:48px; font-size:15px; }.partner-map-demo { min-height:84px; }.partner-map-demo :global(svg) { top:17px; width:39px; height:39px; }.partner-profile-demo { padding:19px 18px 16px; }.partner-profile-demo > strong { margin-bottom:15px; font-size:18px; }.partner-profile-demo__content { gap:12px; }.partner-profile-demo__content p { margin-bottom:5px; }.partner-profile-demo__content ul { margin-bottom:14px; font-size:12px; }.partner-profile-demo__photo { min-height:143px; }.partner-feature-demo { padding:18px; }.partner-feature-demo__chips { gap:6px; margin-bottom:17px; }.partner-feature-demo__chips span { padding:6px 9px; border-width:1px; border-radius:5px; font-size:11px; }.partner-feature-demo__fields { gap:6px; margin-bottom:12px; }.partner-feature-demo__fields span { min-height:67px; gap:5px; border-width:1px; border-radius:6px; font-size:11px; }.partner-feature-demo__fields :global(svg) { width:26px; height:26px; }.partner-feature-demo__note { gap:6px; padding:9px; border-width:1px; border-radius:6px; font-size:10px; }.partner-feature-demo__note :global(svg) { width:19px; height:19px; }.partner-inquiry-demo { padding:20px; }.partner-inquiry-demo > strong { margin-bottom:19px; font-size:16px; }.partner-inquiry-demo > p { margin:14px 0 6px; }.partner-inquiry-demo__button { margin-top:17px; }
        .partner-preview__layout { width:min(1360px,calc(100% - 48px)); grid-template-columns:minmax(310px,.68fr) minmax(0,1.72fr); gap:48px; }.partner-preview__label { min-height:44px; margin-bottom:26px; padding:0 20px; font-size:19px; }.partner-preview__intro h2 { margin-bottom:24px; font-size:30px; }.partner-preview__intro > p:not(.partner-preview__label) { font-size:15px; line-height:2; }.partner-preview__intro ul { gap:13px; margin-top:27px; padding:20px; font-size:13px; }.partner-preview__intro li { gap:9px; }.partner-preview__intro li :global(svg) { width:21px; height:21px; }.partner-listing-preview { padding:27px; border-radius:14px; }.partner-listing-preview__top { grid-template-columns:220px minmax(0,1fr) 250px; gap:23px; }.partner-listing-preview__photo { min-height:146px; }.partner-listing-preview__copy h3 { margin:4px 0 11px; font-size:28px; }.partner-listing-preview__copy p { font-size:13px; }.partner-listing-preview__location { margin-bottom:16px !important; }.partner-listing-preview__location :global(svg) { width:19px; height:19px; }.partner-listing-preview__actions { gap:9px; }.partner-listing-preview__action { min-height:46px; border-width:1px; border-radius:6px; font-size:13px; }.partner-listing-preview__tags { gap:9px; margin:21px 0; }.partner-listing-preview__tags span { padding:7px 13px; border-width:1px; border-radius:6px; font-size:14px; }.partner-listing-preview__details { padding:17px 0; }.partner-listing-preview__details section { padding:0 17px; }.partner-listing-preview h4 { gap:7px; margin-bottom:11px; font-size:15px; }.partner-listing-preview__details h4::before,.partner-listing-preview__bottom > section h4::before { width:3px; height:18px; }.partner-listing-preview__details p,.partner-listing-preview__bottom p { font-size:12px; }.partner-listing-preview__details p > b { margin-right:12px; padding:5px 11px; border-radius:6px; font-size:12px; }.partner-listing-preview__icon-list { gap:9px 15px; }.partner-listing-preview__icon-list :global(svg) { width:20px; height:20px; }.partner-listing-preview__bottom { grid-template-columns:minmax(0,1.8fr) minmax(205px,1fr); gap:17px; padding-top:17px; }.partner-listing-preview__bottom > section { padding-top:5px; }.partner-listing-preview__bottom aside { padding:14px 16px; border-radius:8px; }.partner-listing-preview__bottom aside h4 { margin-bottom:6px; font-size:14px; }.partner-listing-preview__bottom aside h4 :global(svg) { width:22px; height:22px; }.partner-listing-preview__bottom aside p { font-size:11px; }

        /* Merit 1 and 4: detailed search and coordinator UI based on the supplied reference. */
        .partner-merits__title-break { display:none; }.partner-merits__grid { grid-template-columns:repeat(3,minmax(0,1fr)); }.partner-merit--contact { grid-column:1 / -1; min-height:0; padding:35px; }.partner-merit--contact h3 { margin-bottom:28px; font-size:29px; }.partner-merit--contact h3 > span { width:52px; height:52px; font-size:25px; }
        .partner-merit--finder .partner-search-demo { padding:0; overflow:hidden; background:#fff; }.partner-search-demo__item { display:grid; grid-template-columns:35px 1fr 18px; align-items:center; gap:13px; min-height:66px; padding:0 20px; border-bottom:1px solid #e6edf6; color:#183255; font-size:15px; font-weight:800; }.partner-search-demo__item > :global(svg:first-child) { width:29px; height:29px; color:#075bc7; stroke-width:2.1; }.partner-search-demo__item > :global(svg:last-child) { width:17px; height:17px; color:#17324f; transform:rotate(-90deg); stroke-width:3; }.partner-search-demo .partner-map-demo { min-height:110px; border-radius:0; }.partner-search-demo .partner-map-demo :global(svg) { top:25px; left:57%; }
        .partner-coordinator-demo { display:grid; grid-template-columns:minmax(0,1fr) 40px minmax(0,1.08fr) 40px minmax(0,1fr); gap:14px; align-items:center; min-height:0; padding:24px; }.partner-coordinator-demo__step { position:relative; min-height:295px; padding:38px 16px 15px; border:1px solid #e0e9f5; border-radius:14px; background:#fff; box-shadow:0 5px 17px rgba(32,77,130,.08); }.partner-coordinator-demo__step > b { position:absolute; top:13px; left:50%; display:grid; width:31px; height:31px; place-items:center; transform:translateX(-50%); border-radius:50%; color:#fff; background:linear-gradient(135deg,#0c6bdd,#0847a9); font-size:16px; }.partner-coordinator-demo__step > strong { display:block; min-height:46px; color:#0a3f9a; text-align:center; font-size:18px; font-weight:800; line-height:1.35; }.partner-coordinator-demo__step ul { display:grid; gap:10px; margin:14px 0 0; padding:0; list-style:none; }.partner-coordinator-demo__step li { display:flex; align-items:center; gap:10px; min-height:37px; padding:8px 10px; border:1px solid #deebf9; border-radius:8px; color:#153467; font-size:14px; font-weight:800; }.partner-coordinator-demo__step li :global(svg) { width:27px; height:27px; flex:none; color:#0964d4; stroke-width:1.8; }.partner-coordinator-demo__arrow { width:32px; height:32px; color:#075bc7; stroke-width:3.2; }.partner-coordinator-demo__person { overflow:hidden; text-align:center; }.partner-coordinator-demo__portrait { position:relative; width:142px; height:142px; margin:4px auto 9px; overflow:hidden; border-radius:50%; background:radial-gradient(circle,#eaf4ff 0 60%,#ddecfd 61%); }.partner-coordinator-demo__portrait :global(img) { object-fit:cover; object-position:center 15%; }.partner-coordinator-demo__person > p { margin:0; color:#173465; text-align:center; font-size:14px; font-weight:700; line-height:1.55; }.partner-coordinator-demo__offices li { display:grid; grid-template-columns:26px 1fr; gap:8px; align-items:center; min-height:43px; }.partner-coordinator-demo__offices small { grid-column:2; width:max-content; margin-top:-7px; padding:2px 7px; border-radius:4px; color:#204d99; background:#e7f0ff; font-size:10px; }.partner-coordinator-demo__benefits { grid-column:1 / -1; display:grid; grid-template-columns:repeat(3,1fr); margin-top:8px; padding:15px 12px; border:1px solid #d3e5fb; border-radius:12px; background:#f8fbff; }.partner-coordinator-demo__benefits span { display:flex; align-items:center; justify-content:center; gap:9px; min-height:32px; padding:0 13px; border-right:1px solid #bcd6f7; color:#143a78; font-size:14px; font-weight:800; }.partner-coordinator-demo__benefits span:last-child { border-right:0; }.partner-coordinator-demo__benefits :global(svg) { width:25px; height:25px; flex:none; color:#0964d4; }

        @media (max-width:1300px) {
          .partner-merits__shell { width:min(1360px,calc(100% - 48px)); }
          .partner-merit { min-height:458px; padding:22px 17px 18px; border-radius:13px; }.partner-merit h3 { gap:10px; margin-bottom:17px; font-size:15px; }.partner-merit h3 > span { width:36px; height:36px; font-size:17px; }.partner-merit__demo { min-height:316px; padding:17px; border-radius:7px; }.partner-search-demo > p,.partner-feature-demo > p,.partner-profile-demo__content p,.partner-inquiry-demo > p { font-size:12px; }.partner-select-demo,.partner-input-demo { min-height:37px; padding:0 10px; border-width:1px; border-radius:5px; font-size:12px; }.partner-select-demo :global(svg) { width:16px; height:16px; }.partner-search-demo .partner-select-demo + p { margin-top:16px; }.partner-search-demo__footer { gap:10px; margin-top:18px; }.partner-search-demo__footer > span,.partner-inquiry-demo__button { min-height:45px; font-size:14px; }.partner-map-demo { min-height:78px; }.partner-map-demo :global(svg) { width:37px; height:37px; top:16px; }.partner-profile-demo > strong { margin-bottom:13px; font-size:16px; }.partner-profile-demo__content { gap:10px; }.partner-profile-demo__content ul { margin-bottom:12px; font-size:11px; }.partner-profile-demo__photo { min-height:129px; }.partner-feature-demo__chips { gap:5px; margin-bottom:14px; }.partner-feature-demo__chips span { padding:6px 8px; border-width:1px; border-radius:5px; font-size:10px; }.partner-feature-demo__fields { gap:5px; margin-bottom:10px; }.partner-feature-demo__fields span { min-height:61px; gap:4px; border-width:1px; border-radius:5px; font-size:10px; }.partner-feature-demo__fields :global(svg) { width:24px; height:24px; }.partner-feature-demo__note { gap:5px; padding:8px; border-width:1px; border-radius:5px; font-size:9px; }.partner-feature-demo__note :global(svg) { width:18px; height:18px; }.partner-inquiry-demo > strong { margin-bottom:17px; font-size:15px; }.partner-inquiry-demo > p { margin:13px 0 6px; }.partner-inquiry-demo__button { margin-top:15px; }
          .partner-preview__layout { width:min(1360px,calc(100% - 48px)); grid-template-columns:minmax(300px,.72fr) minmax(0,1.7fr); gap:42px; }.partner-preview__label { min-height:42px; margin-bottom:24px; padding:0 19px; font-size:18px; }.partner-preview__intro h2 { margin-bottom:22px; font-size:27px; }.partner-preview__intro > p:not(.partner-preview__label) { font-size:14px; line-height:2; }.partner-preview__intro ul { gap:12px; margin-top:24px; padding:18px; font-size:12px; }.partner-preview__intro li { gap:8px; }.partner-preview__intro li :global(svg) { width:20px; height:20px; }.partner-listing-preview { padding:24px; border-radius:12px; }.partner-listing-preview__top { grid-template-columns:180px minmax(0,1fr) 220px; gap:21px; }.partner-listing-preview__photo { min-height:128px; }.partner-listing-preview__copy h3 { margin:4px 0 10px; font-size:25px; }.partner-listing-preview__copy p { font-size:12px; }.partner-listing-preview__location { margin-bottom:14px !important; }.partner-listing-preview__location :global(svg) { width:18px; height:18px; }.partner-listing-preview__actions { gap:8px; }.partner-listing-preview__action { min-height:42px; border-width:1px; border-radius:5px; font-size:12px; }.partner-listing-preview__tags { gap:8px; margin:19px 0; }.partner-listing-preview__tags span { padding:6px 12px; border-width:1px; border-radius:5px; font-size:13px; }.partner-listing-preview__details { padding:16px 0; }.partner-listing-preview__details section { padding:0 15px; }.partner-listing-preview h4 { gap:7px; margin-bottom:10px; font-size:14px; }.partner-listing-preview__details h4::before,.partner-listing-preview__bottom > section h4::before { width:3px; height:17px; }.partner-listing-preview__details p,.partner-listing-preview__bottom p { font-size:11px; }.partner-listing-preview__details p > b { margin-right:10px; padding:4px 10px; border-radius:5px; font-size:11px; }.partner-listing-preview__icon-list { gap:8px 13px; }.partner-listing-preview__icon-list :global(svg) { width:18px; height:18px; }.partner-listing-preview__bottom { grid-template-columns:minmax(0,1.8fr) minmax(190px,1fr); gap:15px; padding-top:16px; }.partner-listing-preview__bottom > section { padding-top:5px; }.partner-listing-preview__bottom aside { padding:13px 14px; border-radius:7px; }.partner-listing-preview__bottom aside h4 { margin-bottom:5px; font-size:13px; }.partner-listing-preview__bottom aside h4 :global(svg) { width:21px; height:21px; }.partner-listing-preview__bottom aside p { font-size:10px; }
        }
        @media (max-width:820px) {
          .partner-merits__grid { grid-template-columns:repeat(2,minmax(0,1fr)); }.partner-merit { min-height:434px; }
          .partner-preview__layout { grid-template-columns:1fr; gap:38px; }.partner-preview__intro { max-width:600px; margin:auto; text-align:center; }.partner-preview__intro h2 { text-align:center; }.partner-preview__intro ul { text-align:left; }
        }
        @media (max-width:680px) {
          .partner-sp { display:block; }
          .partner-merits { padding:52px 0 55px; }.partner-merits__shell { width:calc(100% - 30px); }.partner-merits h2 { margin-bottom:27px; font-size:23px; }.partner-merits h2::after { width:35px; height:3px; margin-top:13px; }.partner-merits__grid { grid-template-columns:1fr; gap:15px; }.partner-merit { min-height:0; padding:19px 16px 17px; border-radius:11px; }.partner-merit h3 { margin-bottom:14px; font-size:16px; }.partner-merit h3 > span { width:35px; height:35px; font-size:16px; }.partner-merit__demo { min-height:0; }.partner-profile-demo__photo { min-height:148px; }.partner-preview { padding:58px 0; }.partner-preview__layout { width:calc(100% - 30px); gap:30px; }.partner-preview__label { min-height:37px; margin-bottom:19px; padding:0 16px; font-size:15px; }.partner-preview__intro h2 { font-size:22px; line-height:1.55; }.partner-preview__intro > p:not(.partner-preview__label) { font-size:12px; line-height:1.9; }.partner-preview__intro ul { gap:10px; margin-top:19px; padding:16px 14px; font-size:11px; }.partner-listing-preview { padding:16px; }.partner-listing-preview__top { grid-template-columns:1fr; gap:16px; }.partner-listing-preview__photo { min-height:180px; }.partner-listing-preview__copy h3 { font-size:23px; }.partner-listing-preview__copy p { font-size:12px; }.partner-listing-preview__actions { grid-template-columns:1fr; }.partner-listing-preview__tags { gap:6px; margin:15px 0; }.partner-listing-preview__tags span { padding:6px 9px; font-size:11px; }.partner-listing-preview__details,.partner-listing-preview__bottom { grid-template-columns:1fr; gap:15px; }.partner-listing-preview__details section,.partner-listing-preview__details section:first-child { padding:0; border:0; }.partner-listing-preview__details section:first-child { padding-bottom:15px; border-bottom:1px solid #d7e1ec; }.partner-listing-preview__details p,.partner-listing-preview__bottom p { font-size:11px; }.partner-listing-preview__bottom > section { padding-top:0; }.partner-listing-preview__bottom aside { padding:13px; }
        }
        @media (max-width:680px) {
          /* Mobile-only layout reset: this block intentionally overrides the layered legacy SP rules above. */
          .partner-page { overflow-x:hidden; }.partner-shell { width:calc(100% - 32px); }.partner-header { height:60px; }.partner-brand { gap:5px; }.partner-brand :global(img:first-child) { width:26px; height:26px; }.partner-brand :global(img:last-child) { width:108px; height:auto; }.partner-nav__cta { min-height:35px; padding:0 11px; font-size:10px; }.partner-hero-title-break { display:none; }
          .partner-hero { min-height:620px; }.partner-hero__inner { min-height:620px; }.partner-hero__copy { width:100%; padding:35px 0 0; }.partner-hero h1 { max-width:360px; font-size:23px; line-height:1.5; letter-spacing:0; white-space:normal; }.partner-hero__copy > p:not(.partner-eyebrow) { max-width:310px; margin:14px 0 20px; font-size:13px; line-height:1.85; }.partner-hero__actions { width:min(100%,278px); gap:9px; }.partner-hero__actions .partner-button,.partner-hero__actions .partner-outline-button { width:100%; }.partner-hero__image { right:-28px; bottom:0; width:548px; max-width:none; height:auto; opacity:1; }.partner-hero::after { background:linear-gradient(158deg,rgba(255,255,255,.97) 0%,rgba(255,255,255,.87) 47%,rgba(255,255,255,.14) 76%,rgba(255,255,255,0) 100%); }
          .partner-section { padding:50px 0; }.partner-section h2 { margin-bottom:25px; font-size:21px; line-height:1.5; }.partner-section h2::after { margin-top:9px; }.partner-concerns { padding-top:42px; }.partner-concerns__grid,.partner-recommended__grid { gap:10px; }.partner-concern { min-height:136px; padding:15px 7px; }.partner-concern :global(svg) { width:39px; height:39px; margin-bottom:9px; }.partner-concern p,.partner-recommended p { font-size:11px; line-height:1.55; }.partner-cta-band { min-height:0; margin-top:17px; padding:15px; gap:11px; }.partner-cta-band p { font-size:12px; }.partner-cta-band .partner-button { width:100%; min-width:0; }
          .partner-merits { padding:53px 0; }.partner-merits__shell { width:calc(100% - 32px); }.partner-merits h2 { font-size:22px; }.partner-merits__grid { gap:16px; }.partner-merit { padding:18px 15px 16px; border-radius:11px; }.partner-merit h3 { gap:10px; margin-bottom:15px; font-size:16px; line-height:1.48; }.partner-merit h3 > span { width:35px; height:35px; font-size:16px; }.partner-merit__demo { padding:16px; }.partner-search-demo { padding:17px 17px 0; }.partner-search-demo > p,.partner-feature-demo > p,.partner-profile-demo__content p,.partner-inquiry-demo > p { font-size:12px; }.partner-select-demo,.partner-input-demo { min-height:40px; font-size:12px; }.partner-search-demo .partner-select-demo + p { margin-top:16px; }.partner-search-demo__footer { margin-top:17px; }.partner-search-demo__footer > span,.partner-inquiry-demo__button { min-height:44px; font-size:14px; }.partner-map-demo { min-height:76px; }.partner-profile-demo > strong { font-size:17px; }.partner-profile-demo__content { grid-template-columns:1fr 1fr; }.partner-profile-demo__photo { min-height:138px; }.partner-feature-demo__fields span { min-height:61px; font-size:10px; }.partner-feature-demo__note { font-size:9px; }.partner-inquiry-demo > strong { font-size:15px; }
          .partner-recommended { padding-top:45px; }.partner-recommended__grid article { min-height:130px; padding:13px 7px; }.partner-recommended__grid article > span { width:48px; height:48px; margin-bottom:8px; }.partner-recommended__grid :global(svg) { width:27px; height:27px; }
          .partner-preview { padding:55px 0; }.partner-preview__layout { width:calc(100% - 32px); gap:28px; }.partner-preview__intro { text-align:center; }.partner-preview__label { margin-bottom:17px; }.partner-preview__intro h2 { margin-bottom:17px; font-size:22px; line-height:1.5; text-align:center; }.partner-preview__intro > p:not(.partner-preview__label) { font-size:12px; line-height:1.85; }.partner-preview__intro ul { margin-top:20px; padding:16px; text-align:left; }.partner-listing-preview { padding:15px; border-radius:11px; }.partner-listing-preview__top { gap:15px; }.partner-listing-preview__photo { min-height:182px; }.partner-listing-preview__copy h3 { font-size:22px; }.partner-listing-preview__copy p { font-size:12px; line-height:1.75; }.partner-listing-preview__location { margin-bottom:10px !important; }.partner-listing-preview__actions { gap:8px; }.partner-listing-preview__action { min-height:43px; font-size:12px; }.partner-listing-preview__tags { margin:15px 0; }.partner-listing-preview__details { padding:15px 0; }.partner-listing-preview h4 { font-size:14px; }.partner-listing-preview__icon-list { gap:8px 11px; }.partner-listing-preview__bottom { gap:14px; padding-top:15px; }
          .partner-flow { padding-top:50px; }.partner-flow__steps { border-radius:7px; }.partner-flow__steps article { min-height:112px; padding:28px 16px 16px; gap:13px; }.partner-flow__steps article > span { top:10px; left:15px; width:25px; height:25px; font-size:11px; }.partner-flow__steps :global(svg) { width:39px; height:39px; margin-top:12px; }.partner-flow__steps h3 { margin:12px 0 5px; font-size:13px; }.partner-flow__steps p { font-size:11px; line-height:1.65; }
          .partner-faq { padding-top:44px; }.partner-faq__grid { gap:8px; }.partner-faq__grid button { min-height:48px; padding:12px; font-size:11px; line-height:1.5; }.partner-faq__grid button span { gap:7px; }.partner-faq__grid p { padding:0 12px 12px 35px; font-size:11px; }
          .partner-contact { padding:52px 0; }.partner-contact__inner { width:calc(100% - 32px); }.partner-contact__copy h2 { font-size:20px; line-height:1.55; }.partner-contact__copy > p:not(.partner-eyebrow) { font-size:12px; line-height:1.8; }.partner-contact__form { margin-top:22px; padding:17px; gap:12px; border-radius:10px; }.partner-contact__form label { font-size:12px; }.partner-contact__form input,.partner-contact__form textarea { min-height:43px; font-size:13px; }.partner-contact__form textarea { min-height:106px; }.partner-contact__form .partner-button { min-height:50px; font-size:14px; }
        }
        @media (min-width:681px) and (max-width:1300px) {
          .partner-merits__grid { grid-template-columns:repeat(3,minmax(0,1fr)); }.partner-merit--contact { grid-column:1 / -1; min-height:0; padding:26px; }.partner-merit--contact h3 { margin-bottom:20px; font-size:23px; }.partner-coordinator-demo { padding:18px; }.partner-coordinator-demo__step { min-height:250px; padding:34px 12px 12px; }.partner-coordinator-demo__step > strong { min-height:39px; font-size:15px; }.partner-coordinator-demo__step ul { gap:7px; margin-top:10px; }.partner-coordinator-demo__step li { min-height:32px; gap:7px; padding:6px 7px; font-size:11px; }.partner-coordinator-demo__step li :global(svg) { width:21px; height:21px; }.partner-coordinator-demo__portrait { width:113px; height:113px; }.partner-coordinator-demo__person > p { font-size:11px; }.partner-coordinator-demo__benefits { padding:11px 8px; }.partner-coordinator-demo__benefits span { gap:6px; padding:0 9px; font-size:12px; }.partner-coordinator-demo__benefits :global(svg) { width:20px; height:20px; }.partner-search-demo__item { grid-template-columns:27px 1fr 14px; gap:9px; min-height:53px; padding:0 13px; font-size:12px; }.partner-search-demo__item > :global(svg:first-child) { width:23px; height:23px; }.partner-search-demo .partner-map-demo { min-height:82px; }
        }
        @media (max-width:680px) {
          .partner-merits__title-break { display:inline; }.partner-merits h2 { font-size:23px; line-height:1.38; }.partner-merit--finder .partner-search-demo { padding:0; }.partner-search-demo__item { grid-template-columns:30px 1fr 16px; gap:10px; min-height:59px; padding:0 15px; font-size:13px; }.partner-search-demo__item > :global(svg:first-child) { width:25px; height:25px; }.partner-search-demo .partner-map-demo { min-height:92px; }.partner-search-demo .partner-map-demo :global(svg) { top:20px; }
          .partner-merit--contact { grid-column:auto; padding:19px 15px 16px; }.partner-merit--contact h3 { margin-bottom:16px; font-size:18px; }.partner-coordinator-demo { display:block; padding:14px; }.partner-coordinator-demo__step { min-height:0; padding:34px 13px 14px; }.partner-coordinator-demo__step > strong { min-height:0; font-size:16px; }.partner-coordinator-demo__step ul { gap:8px; margin-top:12px; }.partner-coordinator-demo__step li { min-height:34px; padding:7px 9px; font-size:12px; }.partner-coordinator-demo__arrow { display:block; width:26px; height:26px; margin:8px auto; transform:rotate(90deg); }.partner-coordinator-demo__portrait { width:124px; height:124px; }.partner-coordinator-demo__person > p { font-size:12px; }.partner-coordinator-demo__offices li { min-height:37px; }.partner-coordinator-demo__benefits { display:block; margin-top:13px; padding:5px 8px; }.partner-coordinator-demo__benefits span { justify-content:flex-start; min-height:36px; padding:7px 8px; border-right:0; border-bottom:1px solid #c7dcf8; font-size:12px; }.partner-coordinator-demo__benefits span:last-child { border-bottom:0; }
        }
        @media (min-width:681px) {
          /* Four merit cards must remain in one row on desktop. */
          .partner-merits__grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
          .partner-merit { min-height:514px; }
          .partner-merit--contact { grid-column:auto; min-height:514px; padding:25px 20px 20px; }
          .partner-merit--contact h3 { gap:12px; margin-bottom:20px; font-size:18px; }
          .partner-merit--contact h3 > span { width:41px; height:41px; font-size:19px; }
          .partner-coordinator-demo { display:flex; min-height:0; flex-direction:column; gap:6px; padding:10px; }
          .partner-coordinator-demo__step { width:100%; min-height:0; box-sizing:border-box; padding:28px 10px 10px; border-radius:8px; box-shadow:none; }
          .partner-coordinator-demo__step > b { top:7px; width:22px; height:22px; font-size:11px; }
          .partner-coordinator-demo__step > strong { min-height:0; font-size:12px; }
          .partner-coordinator-demo__step ul { grid-template-columns:repeat(2,minmax(0,1fr)); gap:5px; margin-top:8px; }
          .partner-coordinator-demo__step li { min-height:27px; gap:4px; padding:4px 5px; border-radius:5px; font-size:9px; line-height:1.2; }
          .partner-coordinator-demo__step li :global(svg) { width:16px; height:16px; }
          .partner-coordinator-demo__arrow { display:block; width:18px; height:18px; margin:0 auto; transform:rotate(90deg); }
          .partner-coordinator-demo__person { display:grid; grid-template-columns:72px 1fr; align-items:center; column-gap:8px; text-align:left; }
          .partner-coordinator-demo__person > strong { grid-column:1 / -1; margin-bottom:3px; }
          .partner-coordinator-demo__portrait { grid-column:1; width:68px; height:68px; margin:0; }
          .partner-coordinator-demo__person > p { margin:0; text-align:left; font-size:9px; line-height:1.45; }
          .partner-coordinator-demo__offices { grid-template-columns:1fr !important; gap:4px !important; }
          .partner-coordinator-demo__offices li { grid-template-columns:17px 1fr; min-height:24px; padding:3px 5px; font-size:9px; }.partner-coordinator-demo__offices small { margin-top:-4px; padding:1px 4px; font-size:8px; }
          .partner-coordinator-demo__benefits { display:flex; width:100%; box-sizing:border-box; margin-top:2px; padding:5px; border-radius:6px; }.partner-coordinator-demo__benefits span { min-height:24px; gap:3px; padding:0 4px; font-size:8px; line-height:1.2; text-align:center; }.partner-coordinator-demo__benefits :global(svg) { width:14px; height:14px; }
        }
        .partner-coordinator-demo__portrait :global(img) { object-fit:contain; object-position:center; }
        /* The three matching steps follow the supplied left-to-right flow at every viewport. */
        .partner-merit--contact .partner-coordinator-demo { display:grid; grid-template-columns:minmax(0,1fr) 17px minmax(0,1.08fr) 17px minmax(0,1fr); align-items:stretch; gap:4px; min-height:0; padding:8px; }
        .partner-merit--contact .partner-coordinator-demo__step { display:flex; width:auto; min-height:188px; box-sizing:border-box; flex-direction:column; justify-content:flex-start; padding:28px 6px 7px; border-radius:8px; }
        .partner-merit--contact .partner-coordinator-demo__step > b { top:7px; width:21px; height:21px; font-size:11px; }
        .partner-merit--contact .partner-coordinator-demo__step > strong { min-height:29px; font-size:10px; line-height:1.35; }
        .partner-merit--contact .partner-coordinator-demo__step ul { display:grid; grid-template-columns:1fr; gap:4px; margin-top:7px; }
        .partner-merit--contact .partner-coordinator-demo__step li { min-height:24px; gap:3px; padding:3px 4px; border-radius:4px; font-size:8px; line-height:1.18; }
        .partner-merit--contact .partner-coordinator-demo__step li :global(svg) { width:14px; height:14px; }
        .partner-merit--contact .partner-coordinator-demo__arrow { display:block; align-self:center; width:17px; height:17px; margin:0; transform:none; }
        .partner-merit--contact .partner-coordinator-demo__person { display:flex; align-items:center; text-align:center; }
        .partner-merit--contact .partner-coordinator-demo__person > strong { width:100%; margin:0 0 4px; }
        .partner-merit--contact .partner-coordinator-demo__portrait { width:clamp(42px, 11vw, 61px); height:clamp(42px, 11vw, 61px); margin:0 auto 5px; }
        .partner-merit--contact .partner-coordinator-demo__person > p { margin:0; text-align:center; font-size:8px; line-height:1.4; }
        .partner-merit--contact .partner-coordinator-demo__offices { gap:4px !important; }
        .partner-merit--contact .partner-coordinator-demo__offices li { display:grid; grid-template-columns:14px 1fr; min-height:30px; padding:3px 4px; font-size:8px; }
        .partner-merit--contact .partner-coordinator-demo__offices small { margin-top:-4px; padding:1px 3px; font-size:7px; }
        .partner-merit--contact .partner-coordinator-demo__benefits { grid-column:1 / -1; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); width:auto; margin-top:7px; padding:4px; border-radius:6px; }
        .partner-merit--contact .partner-coordinator-demo__benefits span { justify-content:center; min-height:27px; gap:3px; padding:2px 3px; border-right:1px solid #bcd6f7; border-bottom:0; font-size:8px; line-height:1.2; text-align:center; }
        .partner-merit--contact .partner-coordinator-demo__benefits span:last-child { border-right:0; }
        .partner-merit--contact .partner-coordinator-demo__benefits :global(svg) { width:13px; height:13px; }
        @media (min-width:681px) {
          .partner-merit--contact .partner-coordinator-demo { padding:9px; gap:5px; }
          .partner-merit--contact .partner-coordinator-demo__step { min-height:202px; padding:30px 7px 8px; }
          .partner-merit--contact .partner-coordinator-demo__step > strong { font-size:10px; }
          .partner-merit--contact .partner-coordinator-demo__step li { min-height:25px; font-size:8px; }
          .partner-merit--contact .partner-coordinator-demo__person > p { font-size:8px; }
          .partner-merit--contact .partner-coordinator-demo__benefits span { font-size:8px; }
        }
        /* Merit 4: dedicated coordinator → prospective client matching layout. */
        .partner-merit--contact .partner-coordinator-demo { display:grid; grid-template-columns:minmax(0,1fr) 20px minmax(0,1fr); grid-template-rows:auto auto; align-items:center; gap:11px 6px; min-height:348px; padding:12px 9px 8px; border:2px solid #d9e6f4; border-radius:10px; background:linear-gradient(145deg,#fff,#fbfdff); }
        .partner-merit--contact .partner-coordinator-demo__person { display:flex; min-height:190px; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        .partner-merit--contact .partner-coordinator-demo__portrait { position:relative; width:clamp(72px,7vw,104px); height:clamp(72px,7vw,104px); margin:0 0 8px; overflow:hidden; border-radius:50%; background:#edf6ff; }
        .partner-merit--contact .partner-coordinator-demo__person > strong { width:auto; margin:0 0 7px; color:#075bc7; font-size:13px; line-height:1.2; }
        .partner-merit--contact .partner-coordinator-demo__person > p { margin:0; color:#173465; text-align:center; font-size:8px; font-weight:700; line-height:1.55; }
        .partner-merit--contact .partner-coordinator-demo__arrow { display:block; align-self:center; width:19px; height:19px; margin:0; color:#075bc7; stroke-width:3; transform:none; }
        .partner-merit--contact .partner-coordinator-demo__leads { min-width:0; padding:0; }
        .partner-merit--contact .partner-coordinator-demo__leads > strong { display:block; margin:0 0 9px; color:#075bc7; text-align:center; font-size:12px; line-height:1.35; }
        .partner-merit--contact .partner-coordinator-demo__leads ul { display:grid; gap:7px; margin:0; padding:0; list-style:none; }
        .partner-merit--contact .partner-coordinator-demo__leads li { display:flex; min-height:29px; align-items:center; gap:5px; padding:4px 7px; border-radius:999px; color:#16356a; background:linear-gradient(90deg,#fff 0%,#eaf4ff 100%); font-size:9px; font-weight:800; line-height:1.2; }
        .partner-merit--contact .partner-coordinator-demo__leads li :global(svg) { width:17px; height:17px; flex:none; padding:3px; border-radius:50%; color:#075bc7; background:#fff; stroke-width:2.2; }
        .partner-merit--contact .partner-coordinator-demo__benefits { grid-column:1 / -1; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); width:100%; box-sizing:border-box; margin:0; padding:7px 3px; border:0; border-top:1px solid #a9caef; border-radius:0; background:transparent; }
        .partner-merit--contact .partner-coordinator-demo__benefits span { display:flex; min-height:35px; align-items:center; justify-content:center; gap:4px; padding:0 5px; border-right:1px solid #b9d2ef; border-bottom:0; color:#123773; font-size:8px; font-weight:800; line-height:1.35; text-align:left; }
        .partner-merit--contact .partner-coordinator-demo__benefits span:last-child { border-right:0; }
        .partner-merit--contact .partner-coordinator-demo__benefits :global(svg) { width:18px; height:18px; flex:none; color:#075bc7; stroke-width:2; }
        @media (min-width:681px) {
          .partner-merit--contact .partner-coordinator-demo { gap:12px 7px; min-height:326px; padding:19px; }
          .partner-merit--contact .partner-coordinator-demo__person { min-height:208px; }
          .partner-merit--contact .partner-coordinator-demo__person > strong { font-size:14px; }
          .partner-merit--contact .partner-coordinator-demo__person > p { font-size:8px; }
          .partner-merit--contact .partner-coordinator-demo__leads > strong { font-size:12px; }
          .partner-merit--contact .partner-coordinator-demo__leads li { min-height:31px; font-size:9px; }
        }
        @media (max-width:680px) {
          .partner-merit--contact .partner-coordinator-demo { grid-template-columns:minmax(0,1fr) 23px minmax(0,1fr); gap:14px 6px; min-height:0; padding:16px; border:2px solid #d9e6f4; border-radius:10px; }
          .partner-merit--contact .partner-coordinator-demo__person { min-height:220px; }
          .partner-merit--contact .partner-coordinator-demo__portrait { width:112px; height:112px; }
          .partner-merit--contact .partner-coordinator-demo__person > strong { font-size:15px; }
          .partner-merit--contact .partner-coordinator-demo__person > p { font-size:10px; }
          .partner-merit--contact .partner-coordinator-demo__leads > strong { font-size:14px; }
          .partner-merit--contact .partner-coordinator-demo__leads ul { gap:9px; }
          .partner-merit--contact .partner-coordinator-demo__leads li { min-height:39px; gap:7px; padding:6px 9px; font-size:11px; }
          .partner-merit--contact .partner-coordinator-demo__leads li :global(svg) { width:22px; height:22px; }
          .partner-merit--contact .partner-coordinator-demo__benefits { padding:10px 3px; }
          .partner-merit--contact .partner-coordinator-demo__benefits span { min-height:43px; gap:5px; padding:0 6px; font-size:10px; }
          .partner-merit--contact .partner-coordinator-demo__benefits :global(svg) { width:22px; height:22px; }
        }
        /* Give both consultation CTA bands sufficient height for comfortable scanning. */
        .partner-cta-band { min-height:90px; padding:14px 24px; }
        .partner-cta-band .partner-button { min-height:60px; }
        @media (max-width:680px) {
          .partner-cta-band { min-height:0; padding:18px 15px; }
          .partner-cta-band .partner-button { min-height:52px; }
        }
        /* Mobile-only hero: follows the supplied no-photo layout. */
        .partner-mobile-hero,.partner-mobile-menu { display:none; }
        @media (max-width:680px) {
          .partner-header { position:sticky; top:0; z-index:50; height:64px; box-shadow:none; }
          .partner-header__inner { width:calc(100% - 40px); }.partner-brand { gap:8px; }.partner-brand :global(img:first-child) { width:32px; height:32px; }.partner-brand :global(img:last-child) { width:144px; max-width:calc(100vw - 112px); height:24px; }
          .partner-nav { display:none; }.partner-mobile-menu { display:grid; width:36px; height:36px; padding:8px; border:0; place-content:center; border-radius:6px; color:#17243a; background:transparent; }.partner-mobile-menu :global(svg) { width:20px; height:20px; stroke-width:2; }
          .partner-hero { display:none; }
          .partner-mobile-hero { position:relative; display:block; overflow:hidden; padding:43px 0 0; background:linear-gradient(180deg,#fff 0%,#fff 64%,#eef8ff 100%); color:#10233f; }
          .partner-mobile-hero::before { content:""; position:absolute; z-index:0; width:420px; height:420px; top:170px; left:-270px; border:1px solid rgba(26,119,228,.14); border-radius:50%; box-shadow:0 0 0 55px rgba(136,202,255,.04); }
          .partner-mobile-hero__content { position:relative; z-index:1; width:calc(100% - 48px); max-width:640px; margin:0 auto; }
          .partner-mobile-hero__badge { display:inline-flex; min-height:38px; align-items:center; gap:9px; margin:0 0 29px; padding:0 17px; border:1px solid #c9e1ff; border-radius:999px; color:#0764cf; background:#f4f9ff; font-size:16px; font-weight:800; }.partner-mobile-hero__badge :global(svg) { width:24px; height:24px; fill:#0865d3; color:#fff; stroke-width:2; }
          .partner-mobile-hero h1 { margin:0; color:#10233f; font-size:clamp(31px,8.45vw,50px); font-weight:900; line-height:1.42; letter-spacing:.015em; }
          .partner-mobile-hero__lead { margin:25px 0 25px; color:#142947; font-size:16px; font-weight:700; line-height:1.82; letter-spacing:.015em; }.partner-mobile-hero__lead span { color:#0865d3; }
          .partner-mobile-hero__features { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:7px; margin-bottom:21px; }.partner-mobile-hero__features article { min-height:112px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:11px 6px; border:1px solid #d4e6fb; border-radius:9px; background:#fff; text-align:center; }.partner-mobile-hero__features article > span { display:grid; width:43px; height:43px; flex:none; place-items:center; border-radius:50%; color:#0865d3; background:#edf5ff; }.partner-mobile-hero__features :global(svg) { width:24px; height:24px; stroke-width:2.1; }.partner-mobile-hero__features p { margin:0; color:#10233f; font-size:12px; font-weight:800; line-height:1.45; }
          .partner-mobile-hero__actions { display:grid; gap:12px; }.partner-mobile-hero__actions .partner-button,.partner-mobile-hero__actions .partner-outline-button { width:100%; min-height:59px; box-sizing:border-box; justify-content:center; font-size:18px; font-weight:800; }.partner-mobile-hero__actions .partner-outline-button { display:flex; align-items:center; border-width:2px; background:#fff; }
          .partner-mobile-hero__connection { position:relative; z-index:1; height:250px; margin-top:0; background:radial-gradient(circle at 14% 52%,rgba(91,184,255,.22) 0 2px,transparent 3px) 0 0/18px 18px,radial-gradient(circle at 79% 74%,rgba(91,184,255,.2) 0 2px,transparent 3px) 0 0/19px 19px,linear-gradient(160deg,transparent 0 15%,rgba(177,222,255,.55) 15.2% 36%,rgba(222,242,255,.92) 36.3% 58%,rgba(183,224,255,.5) 58.3% 78%,transparent 78.3%),linear-gradient(20deg,#e6f5ff,#f8fcff); }.partner-mobile-hero__connection::before,.partner-mobile-hero__connection::after { content:""; position:absolute; z-index:-1; width:120%; height:88px; left:-10%; border-radius:50%; border-top:22px solid rgba(255,255,255,.86); }.partner-mobile-hero__connection::before { top:49px; transform:rotate(4deg); }.partner-mobile-hero__connection::after { top:112px; transform:rotate(-4deg); }
          .partner-mobile-hero__node { position:absolute; display:flex; flex-direction:column; align-items:center; justify-content:center; box-sizing:border-box; border-radius:50%; color:#10233f; background:#fff; box-shadow:0 4px 15px rgba(43,94,155,.08); text-align:center; }.partner-mobile-hero__node :global(svg) { color:#0865d3; stroke-width:1.8; }.partner-mobile-hero__node p { margin:6px 0 0; font-size:11px; font-weight:800; line-height:1.4; }.partner-mobile-hero__node--user,.partner-mobile-hero__node--office { bottom:52px; width:100px; height:100px; }.partner-mobile-hero__node--user { left:6px; }.partner-mobile-hero__node--office { right:6px; }.partner-mobile-hero__node--user :global(svg),.partner-mobile-hero__node--office :global(svg) { width:33px; height:33px; }.partner-mobile-hero__node--bridge { bottom:42px; left:50%; width:162px; height:162px; transform:translateX(-50%); }.partner-mobile-hero__node--bridge :global(svg) { width:48px; height:48px; }.partner-mobile-hero__node--bridge p { font-size:12px; line-height:1.45; }.partner-mobile-hero__node--bridge p span { color:#0865d3; font-size:18px; }
          .partner-faq__grid button { font-size:13px; }.partner-faq__grid p { font-size:12px; }
        }
        @media (max-width:360px) {
          .partner-mobile-hero__node--user,.partner-mobile-hero__node--office { width:96px; height:96px; }.partner-mobile-hero__node--user { left:4px; }.partner-mobile-hero__node--office { right:4px; }.partner-mobile-hero__node--bridge { width:154px; height:154px; }.partner-mobile-hero__node p { font-size:10px; }.partner-mobile-hero__node--bridge p { font-size:11px; }.partner-mobile-hero__node--bridge p span { font-size:17px; }
        }
        @media (min-width:681px) {
          .partner-merit--contact .partner-coordinator-demo__person > strong,
          .partner-merit--contact .partner-coordinator-demo__leads > strong { font-size:clamp(8px,.75vw,12px); letter-spacing:-.04em; white-space:nowrap; }
        }
        .partner-faq__grid button { font-size:14px; }.partner-faq__grid p { font-size:13px; }
        .partner-listing-preview__sample { min-width:0; }.partner-listing-preview__note { display:block; margin:10px 4px 0; color:#637692; font-size:11px; font-weight:600; line-height:1.65; } @media (min-width:681px) { .partner-listing-preview__note { margin-top:12px; font-size:12px; } }
      `}</style>
    </div>
  );
}
