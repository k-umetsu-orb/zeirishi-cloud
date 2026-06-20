import { PageMeta } from "@/lib/usePageMeta";
import SearchTop from "@/page-components/SearchTop";

export default function SearchPage() {
  return (
    <>
      <PageMeta
        title="税理士・会計事務所を探す | 税理士クラウド"
        description="エリア・駅・得意業種・依頼内容から全国の税理士・会計事務所を検索できます。"
      />
      <SearchTop />
    </>
  );
}
