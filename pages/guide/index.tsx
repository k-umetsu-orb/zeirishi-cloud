import { PageMeta } from "@/lib/usePageMeta";
import GuideTop from "@/page-components/GuideTop";
import ComingSoonPage from "@/page-components/ComingSoonPage";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";

export default function GuideIndexPage() {
  return (
    <>
      <PageMeta
        title="税理士の選び方ガイド | 税理士クラウド"
        description="税理士・会計事務所の選び方ガイド記事の一覧です。あなたに合った税理士・会計事務所の選び方を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      {CONTENT_COMING_SOON ? (
        <ComingSoonPage
          breadcrumbLabel="選び方ガイド"
          heading="選び方ガイド"
          lead="税理士選びや税務に関する基礎知識をわかりやすく解説するガイド記事です。"
          metaTitle="税理士の選び方ガイド | 税理士クラウド"
          metaDescription="税理士・会計事務所の選び方ガイド記事の一覧です。あなたに合った税理士・会計事務所の選び方を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
        />
      ) : (
        <GuideTop />
      )}
    </>
  );
}
