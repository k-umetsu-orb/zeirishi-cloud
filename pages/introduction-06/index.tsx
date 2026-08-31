import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const title = "会社設立に強い税理士の無料紹介 | 税理士クラウド";
const description = "会社設立・起業に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。";

export default function Introduction06Page() {
  return <><PageMeta title={title} description={description} /><IntroductionVariantPage heroHeadline="会社設立に強い税理士||をご紹介します" heroHighlight="会社設立に強い税理士" concernsHeading="会社設立について、こんなお悩みはありませんか？" concernsLead="設立前後の不安も、相談先選びからサポートします。" concerns={[
    { title: "設立手続きが複雑で不安", body: "何から始めればよいか\n専門家に相談したい", tone: "blue", icon: "file" },
    { title: "設立後の経理体制が心配", body: "税務や経理をどう整えるか\n早めに準備したい", tone: "orange", icon: "message" },
    { title: "法人化の判断を相談したい", body: "法人と個人のどちらが有利か\n税金面から確認したい", tone: "teal", icon: "cloud" },
    { title: "記帳代行も依頼したい", body: "起業と同時に\n経理の相談を始めたい", tone: "purple", icon: "file" },
  ]} documentTitle={title} documentDescription={description} /></>;
}
