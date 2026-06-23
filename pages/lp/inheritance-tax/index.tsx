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
  <>相続税がどれくらいかかるか{hi("心配で早めに準備したい")}</>,
  <>相続が起こったが{hi("専門家の見つけ方がわからない")}</>,
  <>相続税の{hi("節税対策として何をすればいいか")}知識がない</>,
  <>生前贈与があり{hi("早急に専門家に相談したい")}</>,
];

const requestDetailExamples = [
  "相続税の申告書作成を依頼したい",
  "相続税がいくらかかるか事前に相談したい",
];

export default function LpInheritanceTaxPage() {
  return (
    <>
      <PageMeta
        title="相続税に強い税理士の無料紹介 | 税理士クラウド"
        description="相続税・贈与税に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        noindex
      />
      <LpVariantPage
        slug="inheritance-tax"
        badge="完全無料・全国対応"
        headline={<>相続税に強い税理士を<br />{u("無料で")}ご紹介します</>}
        subtext="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        trustValue={<>掲載数<span className="text-amber-400"> 3,000件以上</span></>}
        empathyImageCaption="［画像：故人を思い悩むご遺族］"
        empathyQuote={<>「急に相続が必要になって、<br />頭が真っ白に...」</>}
        empathyBody={
          <>
            <p>相続税の申告には、財産の把握や評価、書類の準備など、慣れない作業が次々と発生します。申告手続きが複雑な上に期限も決まっているため、自分の力だけで対応するのは非常に大変です。</p>
            <p>税理士クラウドでは、相続税に詳しい税理士を厳選してご紹介。最初のご相談から申告完了まで、専門コーディネーターが寄り添ってサポートします。</p>
          </>
        }
        painPoints={painPoints}
        requestDetailExamples={requestDetailExamples}
      />
    </>
  );
}
