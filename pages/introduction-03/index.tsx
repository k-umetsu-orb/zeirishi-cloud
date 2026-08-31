import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

const title = "相続税に強い税理士の無料紹介 | 税理士クラウド";
const description = "相続税・贈与税に強い税理士をお探しなら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。";

export default function Introduction03Page() {
  return <><PageMeta title={title} description={description} /><IntroductionVariantPage heroHeadline="相続税に強い税理士||をご紹介します" heroHighlight="相続税に強い税理士" concernsHeading="相続税について、こんなお悩みはありませんか？" concernsLead="ご家族の状況に合った専門家探しをお手伝いします。" concerns={[
    { title: "相続税がどれくらいかかるか心配", body: "早めに準備したいけれど\n何から確認すればよいかわからない", tone: "blue", icon: "landmark" },
    { title: "相談できる専門家が見つからない", body: "相続が起きたあと\n誰に相談すればよいかわからない", tone: "orange", icon: "message" },
    { title: "節税対策を相談したい", body: "生前贈与や相続税対策を\n専門家に確認したい", tone: "teal", icon: "landmark" },
    { title: "申告を急いで進めたい", body: "期限に間に合うよう\n早急に専門家へ依頼したい", tone: "purple", icon: "file" },
  ]} documentTitle={title} documentDescription={description} /></>;
}
