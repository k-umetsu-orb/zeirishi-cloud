import { PageMeta } from "@/lib/usePageMeta";
import RecommendationList from "@/page-components/RecommendationList";

export default function RecommendationIndexPage() {
  return (
    <>
      <PageMeta
        title="エリア別おすすめ税理士・会計事務所 | 税理士クラウド"
        description="エリア別のおすすめ税理士・会計事務所の紹介記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      <RecommendationList />
    </>
  );
}
