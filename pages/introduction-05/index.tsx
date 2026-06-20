import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>後継者への引き継ぎを考えているが<>{hi("どこから始めればいいか分からない")}</></>,
  <>自社株式の評価や<>{hi("税務面での評価額")}</>が不安</>,
  <><>{hi("M&Aを含めた選択肢")}</>を専門家と一緒に検討したい</>,
  <>事業承継に伴う<>{hi("税務処理を丸ごと任せたい")}</></>,
];

export default function Introduction05Page() {
  return (
    <>
      <PageMeta
        title="事業承継に強い税理士の無料紹介 | 税理士クラウド"
        description="事業承継・会社売却に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        pageNumber="05"
        headline="事業承継に強い税理士を無料でご紹介します"
        subtext="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        painPoints={painPoints}
        documentTitle="事業承継に強い税理士の無料紹介 | 税理士クラウド"
        documentDescription="事業承継・会社売却に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        breadcrumbLabel="事業承継の税理士紹介"
      />
    </>
  );
}
