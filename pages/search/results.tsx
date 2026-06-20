import { PageMeta } from "@/lib/usePageMeta";
import SearchResults from "@/page-components/SearchResults";

export default function SearchResultsPage() {
  return (
    <>
      <PageMeta
        title="検索結果 | 税理士クラウド"
        description="条件に合った税理士・会計事務所の一覧です。"
        noindex
      />
      <SearchResults />
    </>
  );
}
