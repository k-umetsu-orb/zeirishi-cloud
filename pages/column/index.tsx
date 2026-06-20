import { PageMeta } from "@/lib/usePageMeta";
import ColumnList from "@/page-components/ColumnList";
import ComingSoonPage from "@/page-components/ComingSoonPage";
import { CONTENT_COMING_SOON } from "@/lib/contentVisibility";

export default function ColumnIndexPage() {
  return (
    <>
      <PageMeta
        title="ノウハウコラム一覧 | 税理士クラウド"
        description="税務に関するノウハウ記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      {CONTENT_COMING_SOON ? (
        <ComingSoonPage
          breadcrumbLabel="コラム"
          heading="コラム"
          lead="税務・会計に関する最新トピックスやお役立ち情報をお届けするコラム記事です。"
          metaTitle="ノウハウコラム一覧 | 税理士クラウド"
          metaDescription="税務に関するノウハウ記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
        />
      ) : (
        <ColumnList />
      )}
    </>
  );
}
