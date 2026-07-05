import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>相続税がどれくらいかかるか<>{hi("心配で早めに準備したい")}</></>,
  <>相続が起こったが<>{hi("専門家の見つけ方がわからない")}</></>,
  <>相続税の<>{hi("節税対策として何をすればいいか")}</>知識がない</>,
  <>生前贈与があり<>{hi("早急に専門家に相談したい")}</></>,
];

const requestDetailExamples = [
  "相続税の申告書作成を依頼したい",
  "相続税がいくらかかるか事前に相談したい",
];

export default function Introduction03Page() {
  return (
    <>
      <PageMeta
        title="相続税に強い税理士の無料紹介 | 税理士クラウド"
        description="相続税・贈与税に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        pageNumber="03"
        headline="相続税に強い税理士を無料でご紹介します"
        subtext={<>
          専門コーディネーターが<br className="md:hidden" />
          ご要望に合った税理士を紹介<br />
          比較の上、最適な税理士を<br className="md:hidden" />
          お選びいただけます
        </>}
        painPoints={painPoints}
        requestDetailExamples={requestDetailExamples}
        documentTitle="相続税に強い税理士の無料紹介 | 税理士クラウド"
        documentDescription="相続税・贈与税に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        breadcrumbLabel="相続税の税理士紹介"
      />
    </>
  );
}
