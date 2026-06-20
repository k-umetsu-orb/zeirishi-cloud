import { PageMeta } from "@/lib/usePageMeta";
import RecommendationList from "@/page-components/RecommendationList";
import ComingSoonPage from "@/page-components/ComingSoonPage";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";

export default function RecommendationIndexPage() {
  return (
    <>
      <PageMeta
        title="エリア別おすすめ税理士・会計事務所 | 税理士クラウド"
        description="エリア別のおすすめ税理士・会計事務所の紹介記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      {CONTENT_COMING_SOON ? (
        <ComingSoonPage
          breadcrumbLabel="おすすめ事務所"
          heading="おすすめ会計事務所"
          lead="地域別のおすすめ会計事務所をご紹介する記事一覧です。"
          metaTitle="エリア別おすすめ税理士・会計事務所 | 税理士クラウド"
          metaDescription="エリア別のおすすめ税理士・会計事務所の紹介記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
        />
      ) : (
        <RecommendationList />
      )}
    </>
  );
}
