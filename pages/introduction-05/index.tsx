import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const title = "事業承継に強い税理士の無料紹介 | 税理士クラウド";
const description = "事業承継・会社売却に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。";

export default function Introduction05Page() {
  return <><PageMeta title={title} description={description} /><IntroductionVariantPage heroHeadline="事業承継に強い税理士||をご紹介します" heroHighlight="事業承継に強い税理士" concernsHeading="事業承継について、こんなお悩みはありませんか？" concernsLead="将来を見据えた承継を、経験豊富な専門家にご相談いただけます。" concerns={[
    { title: "何から始めればよいかわからない", body: "後継者への引き継ぎを\n計画的に進めたい", tone: "blue", icon: "message" },
    { title: "自社株式の評価が不安", body: "評価額や税務面を\n専門家に相談したい", tone: "orange", icon: "file" },
    { title: "M&Aも含めて検討したい", body: "自社に合う選択肢を\n比較しながら考えたい", tone: "teal", icon: "cloud" },
    { title: "承継に伴う税務を任せたい", body: "必要な手続きや税務処理を\nまとめて相談したい", tone: "purple", icon: "file" },
  ]} documentTitle={title} documentDescription={description} /></>;
}
