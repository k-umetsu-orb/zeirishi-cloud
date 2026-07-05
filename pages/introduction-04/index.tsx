import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>税務調査の通知が届き<>{hi("どう対応すればよいか不安")}</></>,
  <>税務調査での<>{hi("税額がどのくらいになるか")}</>わからず不安</>,
  <>顧問税理士が<>{hi("税務調査の対応に頼りにならない")}</>と感じている</>,
  <>日頃から<>{hi("税務上の処理を適正に管理できているか")}</>確認したい</>,
];

const requestDetailExamples = [
  "税務調査の事前対応について相談したい",
  "税務調査当日の立会いを依頼したい",
];

export default function Introduction04Page() {
  return (
    <>
      <PageMeta
        title="税務調査に強い税理士の無料紹介 | 税理士クラウド"
        description="税務調査に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        pageNumber="04"
        headline="税務調査に強い税理士を無料でご紹介します"
        subtext={<>
          専門コーディネーターが<br className="md:hidden" />
          ご要望に合った税理士を紹介<br />
          比較の上、最適な税理士を<br className="md:hidden" />
          お選びいただけます
        </>}
        painPoints={painPoints}
        requestDetailExamples={requestDetailExamples}
        documentTitle="税務調査に強い税理士の無料紹介 | 税理士クラウド"
        documentDescription="税務調査に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        breadcrumbLabel="税務調査の税理士紹介"
      />
    </>
  );
}
