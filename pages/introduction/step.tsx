import { PageMeta } from "@/lib/usePageMeta";
import IntroductionQuestionnaire from "@/page-components/IntroductionQuestionnaire";

export default function IntroductionStepPage() {
  return (
    <>
      <PageMeta title="無料相談フォーム | 税理士クラウド" noindex />
      <IntroductionQuestionnaire />
    </>
  );
}
