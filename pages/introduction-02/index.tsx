import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const title = "確定申告・年末調整に強い税理士の無料紹介 | 税理士クラウド";
const description = "確定申告・年末調整に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。";

export default function Introduction02Page() {
  return <><PageMeta title={title} description={description} /><IntroductionVariantPage heroHeadline="確定申告に強い税理士||をご紹介します" heroHighlight="確定申告に強い税理士" concernsHeading="確定申告・年末調整でこんなお悩みはありませんか？" concernsLead="煩雑な手続きも、専門家への相談でスムーズに進められます。" concerns={[
    { title: "申告作業が煩雑でミスが不安", body: "毎年の確定申告や年末調整で\n何から手をつければよいかわからない", tone: "blue", icon: "file" },
    { title: "年末調整を任せたい", body: "自社だけでの対応が難しく\n正確に処理できるか不安", tone: "orange", icon: "file" },
    { title: "節税対策ができているか知りたい", body: "適切な節税ができているか\n税理士に確認したい", tone: "teal", icon: "cloud" },
    { title: "記帳業務を任せたい", body: "本業に集中するため\n日々の経理を任せたい", tone: "purple", icon: "file" },
  ]} documentTitle={title} documentDescription={description} /></>;
}
