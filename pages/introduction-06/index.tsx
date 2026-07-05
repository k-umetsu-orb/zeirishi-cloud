import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>会社設立の手続きが複雑で<>{hi("何から始めればいいかわからない")}</></>,
  <>設立後の<>{hi("税務・経理体制をどう整えるか")}</>が不安</>,
  <>法人と個人<>{hi("どちらが税金面で有利か")}</>専門家に相談したい</>,
  <>起業と同時に<>{hi("記帳代行の依頼と相談をスタート")}</>させたい</>,
];

const requestDetailExamples = [
  "会社設立の手続きを依頼したい",
  "設立後の税務・経理体制を相談したい",
];

export default function Introduction06Page() {
  return (
    <>
      <PageMeta
        title="会社設立に強い税理士の無料紹介 | 税理士クラウド"
        description="会社設立・起業に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        pageNumber="06"
        headline="会社設立に強い税理士を無料でご紹介します"
        subtext={<>
          専門コーディネーターが<br className="md:hidden" />
          ご要望に合った税理士を紹介<br />
          比較の上、最適な税理士を<br className="md:hidden" />
          お選びいただけます
        </>}
        painPoints={painPoints}
        requestDetailExamples={requestDetailExamples}
        documentTitle="会社設立に強い税理士の無料紹介 | 税理士クラウド"
        documentDescription="会社設立・起業に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        breadcrumbLabel="会社設立の税理士紹介"
      />
    </>
  );
}
