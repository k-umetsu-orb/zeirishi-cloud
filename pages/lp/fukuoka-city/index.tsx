import { PageMeta } from "@/lib/usePageMeta";
import LpVariantPage from "@/page-components/LpVariantPage";

const u = (s: string) => (
  <span className="relative inline-block">
    <span className="relative z-10">{s}</span>
    <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-400/40 -z-0" />
  </span>
);
const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>{hi("近くで相談できる")}税理士を探している</>,
  <>地元{hi("福岡の事情に詳しい")}税理士に依頼したい</>,
  <>{hi("来所しやすい")}事務所を地域で比較したい</>,
  <>どの事務所が良いか{hi("地域内で比較")}したい</>,
];

export default function LpFukuokaCityPage() {
  return (
    <>
      <PageMeta
        title="福岡市で税理士を無料紹介 | 税理士クラウド"
        description="福岡市エリアに対応する税理士を専門コーディネーターが複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。完全無料。"
        noindex
      />
      <LpVariantPage
        slug="fukuoka-city"
        badge="完全無料・福岡市対応"
        headline={<>福岡市で税理士をお探しの方へ<br />{u("無料で")}ご紹介します</>}
        subtext="福岡市エリアに対応する税理士を専門コーディネーターが複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        trustValue={<>福岡市対応の税理士<br className="md:hidden" /><span className="text-amber-400 md:before:content-['_']">多数掲載</span></>}
        empathyImageCaption="［画像：地元で相談相手を探す経営者］"
        empathyQuote={<>「福岡市内で、信頼できる<br />税理士に出会いたくて……」</>}
        empathyBody={
          <>
            <p>検索しても事務所の数が多く、通いやすさや得意分野まで一人で比較するのは時間がかかるものです。</p>
            <p>税理士クラウドでは、福岡市エリアの税理士の中から、ご要望に合う事務所を専門コーディネーターが厳選してご紹介します。</p>
          </>
        }
        painPoints={painPoints}
        defaultPrefectureSlug="fukuoka"
      />
    </>
  );
}
