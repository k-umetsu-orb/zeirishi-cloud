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
  <>会社設立の手続きが複雑で{hi("何から始めればいいかわからない")}</>,
  <>設立後の{hi("税務・経理体制をどう整えるか")}が不安</>,
  <>法人と個人{hi("どちらが税金面で有利か")}相談したい</>,
  <>起業と同時に{hi("記帳代行の依頼と相談をスタート")}させたい</>,
];

export default function LpCompanyEstablishmentPage() {
  return (
    <>
      <PageMeta
        title="会社設立に強い税理士の無料紹介 | 税理士クラウド"
        description="会社設立・起業に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
        noindex
      />
      <LpVariantPage
        slug="company-establishment"
        badge="完全無料・全国対応"
        headline={<>会社設立に強い税理士を<br />{u("無料で")}ご紹介します</>}
        subtext="専門コーディネーターがご要望に合った税理士を複数名ご紹介。比較検討の上、最適な税理士をお選びいただけます。"
        trustValue={<>掲載数<span className="text-amber-400"> 3,000件以上</span></>}
        empathyImageCaption="［画像：起業準備中の若手経営者］"
        empathyQuote={<>「会社設立後の税金が、<br />まったく想像できなくて……」</>}
        empathyBody={
          <>
            <p>設立の手続きだけでなく、その後の税務・経理体制まで考えると、一人で判断するのは荷が重いものです。</p>
            <p>税理士クラウドでは、起業期のサポートに強い税理士を厳選し、設立準備の段階から専門コーディネーターがご紹介します。</p>
          </>
        }
        painPoints={painPoints}
        defaultConsultType="起業・会社設立"
      />
    </>
  );
}
