import { PageMeta } from "@/lib/usePageMeta";
import ColumnList from "@/page-components/ColumnList";

export default function ColumnIndexPage() {
  return (
    <>
      <PageMeta
        title="ノウハウコラム一覧 | 税理士クラウド"
        description="税務に関するノウハウ記事の一覧です。あなたに合った税理士・会計事務所を税理士業界特化の紹介サービスを提供している税理士クラウドが解説します。"
      />
      <ColumnList />
    </>
  );
}
