import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const title = "税務調査に強い税理士の無料紹介 | 税理士クラウド";
const description = "税務調査に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。";

export default function Introduction04Page() {
  return <><PageMeta title={title} description={description} /><IntroductionVariantPage heroHeadline="税務調査に強い税理士||をご紹介します" heroHighlight="税務調査に強い税理士" concernsHeading="税務調査について、こんなお悩みはありませんか？" concernsLead="急な通知でも、状況に合った税理士をご紹介します。" concerns={[
    { title: "通知が届き、対応方法がわからない", body: "税務調査にどう備えればよいか\nすぐに相談したい", tone: "blue", icon: "file" },
    { title: "追徴税額が不安", body: "どの程度の税額になるのか\n見通しを知りたい", tone: "orange", icon: "message" },
    { title: "顧問税理士に不安がある", body: "税務調査の対応を\n頼れる専門家に任せたい", tone: "teal", icon: "cloud" },
    { title: "日頃の処理を見直したい", body: "税務上の処理を\n適正に管理できているか確認したい", tone: "purple", icon: "file" },
  ]} documentTitle={title} documentDescription={description} /></>;
}
