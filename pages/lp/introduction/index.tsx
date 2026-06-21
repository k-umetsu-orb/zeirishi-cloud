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
  <>今の税理士に{hi("対応や料金で不満")}があり見直したい</>,
  <>税理士の{hi("探し方・選び方がわからない")}</>,
  <>自社に合う税理士に{hi("出会えるか不安")}</>,
  <>複数の税理士を{hi("比較して納得して選びたい")}</>,
];

export default function LpIntroductionPage() {
  return (
    <>
      <PageMeta
        title="あなたに合った税理士を無料でご紹介 | 税理士クラウド"
        description="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。完全無料・全国対応。"
        noindex
      />
      <LpVariantPage
        slug="introduction"
        badge="完全無料・全国対応"
        headline={<>あなたに合った税理士を<br />{u("無料で")}ご紹介します</>}
        subtext="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        trustValue={<>掲載数<span className="text-amber-400"> 3,000件以上</span></>}
        empathyImageCaption="［画像：税理士選びに悩む経営者］"
        empathyQuote={<>「税理士を選ぶ基準が、<br />正直よく分からなくて……」</>}
        empathyBody={
          <>
            <p>税理士選びは、料金や得意分野、相性など見るべき点が多く、自分一人で比較しきるのは簡単ではありません。</p>
            <p>税理士クラウドでは、専門コーディネーターがご要望をヒアリングし、数ある事務所の中からあなたに合う税理士を厳選してご紹介します。</p>
          </>
        }
        painPoints={painPoints}
      />
    </>
  );
}
