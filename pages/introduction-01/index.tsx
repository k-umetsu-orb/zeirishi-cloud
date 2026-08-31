import { PageMeta } from "@/lib/usePageMeta";
import IntroductionVariantPage from "@/page-components/IntroductionVariantPage";

export default function Introduction01Page() {
  return (
    <>
      <PageMeta
        title="税理士変更の無料相談 | 税理士クラウド"
        description="今の税理士の変更をご検討なら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
      <IntroductionVariantPage
        concernsHeading="今の税理士について、こんなお悩みはありませんか？"
        concernsLead="税理士の変更についても、まずはお気軽にご相談ください。"
        concerns={[
          { title: "連絡や回答が遅くて困っている", body: "質問への返答が遅く\n必要なときに相談できない", tone: "blue" },
          { title: "顧問料に納得できない", body: "費用とサービス内容の\nバランスを見直したい", tone: "orange" },
          { title: "経営の相談もしたい", body: "税務申告だけでなく\n事業に寄り添う支援を受けたい", tone: "teal", icon: "cloud" },
          { title: "変更の進め方がわからない", body: "今の税理士への伝え方や\n切り替えの流れを知りたい", tone: "purple" },
        ]}
        documentTitle="税理士変更の無料相談 | 税理士クラウド"
        documentDescription="今の税理士の変更をご検討なら税理士クラウドへ。専門コーディネーターが無料で最適な税理士をご紹介します。"
      />
    </>
  );
}
