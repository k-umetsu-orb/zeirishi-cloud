import Introduction, { type IntroductionPageContent } from "@/page-components/Introduction";

type IntroductionVariantPageProps = IntroductionPageContent;

/**
 * /introduction-02〜06 共通LP。
 * 見た目・導線は /introduction の実装をそのまま再利用し、
 * 各LP固有のファーストビューとお悩み訴求だけを差し替える。
 */
export default function IntroductionVariantPage(content: IntroductionVariantPageProps) {
  return <Introduction content={content} />;
}
