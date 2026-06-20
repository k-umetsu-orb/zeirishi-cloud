import { PageMeta } from "@/lib/usePageMeta";
import Introduction from "@/page-components/Introduction";

export default function IntroductionPage() {
  return (
    <>
      <PageMeta
        title="税理士紹介サービス | 税理士クラウド"
        description="税理士クラウドの税理士紹介サービスのご案内です。完全無料・最短翌営業日でご要望に合った税理士をご紹介します。"
      />
      <Introduction />
    </>
  );
}
