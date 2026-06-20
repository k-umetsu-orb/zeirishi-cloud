import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>毎年の確定申告や年末調整が<>{hi("煩雑でミスが不安")}</>、何から手をつければいいか分からない</>,
  <>年末調整の処理が複雑で<>{hi("自分だけでは対応しきれない")}</>と感じている</>,
  <>適切な節税措置ができているか<>{hi("自信がない")}</></>,
  <>本業に集中するために<>{hi("記帳業務をまるごと任せたい")}</></>,
];

export default function Introduction02Page() {
  return (
    <>
      <PageMeta
        title="確定申告・年末調整に強い税理士の無料紹介 | 税理士クラウド"
        description="確定申告・年末調整に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        pageNumber="02"
        headline="確定申告・年末調整に||強い税理士を無料でご紹介します"
        subtext="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        painPoints={painPoints}
        documentTitle="確定申告・年末調整に強い税理士の無料紹介 | 税理士クラウド"
        documentDescription="確定申告・年末調整に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        breadcrumbLabel="確定申告・年末調整の税理士紹介"
      />
    </>
  );
}
