import { PageMeta } from "@/lib/usePageMeta";
import GuideTop from "@/page-components/GuideTop";

export default function GuideIndexPage() {
  return (
    <>
      <PageMeta
        title="税理士の選び方ガイド | 税理士クラウド"
        description="税理士・会計事務所の選び方ガイド記事の一覧です。あなたに合った税理士・会計事務所の選び方を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      <GuideTop />
    </>
  );
}
